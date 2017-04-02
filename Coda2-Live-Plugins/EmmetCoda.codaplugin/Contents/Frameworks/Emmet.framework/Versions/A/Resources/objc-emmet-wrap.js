var objcEmmetEditor = (function() {
	var ctx;

	function rangeToObj(range) {
		return  {
			start: range.location,
			end: range.location + range.length
		};
	}

	var autoHandleIndent = true;

	return {
		/**
		 * Setup underlying editor context. You should call this method
		 * <code>before</code> using any Emmet action.
		 * @memberOf IEmmetEditor
		 * @param {Object} context
		 */
		setContext: function(context) {
			ctx = context;
		},

		getContext: function() {
			return ctx;
		},

		setAutoHandleIndent: function(val) {
			autoHandleIndent = val;
		},

		/**
		 * Returns character indexes of selected text: object with <code>start</code>
		 * and <code>end</code> properties. If there's no selection, should return
		 * object with <code>start</code> and <code>end</code> properties referring
		 * to current caret position
		 * @return {Object}
		 * @example
		 * var selection = editor.getSelectionRange();
		 * alert(selection.start + ', ' + selection.end);
		 */
		getSelectionRange: function() {
			return rangeToObj(ctx.selectionRange);
		},

		/**
		 * Creates selection from <code>start</code> to <code>end</code> character
		 * indexes. If <code>end</code> is ommited, this method should place caret
		 * and <code>start</code> index
		 * @param {Number} start
		 * @param {Number} [end]
		 * @example
		 * editor.createSelection(10, 40);
		 *
		 * //move caret to 15th character
		 * editor.createSelection(15);
		 */
		createSelection: function(start, end) {
			var range = NSMakeRange(start, end - start);
			ctx.selectionRange = range;
		},

		/**
		 * Returns current line's start and end indexes as object with <code>start</code>
		 * and <code>end</code> properties
		 * @return {Object}
		 * @example
		 * var range = editor.getCurrentLineRange();
		 * alert(range.start + ', ' + range.end);
		 */
		getCurrentLineRange: function() {
			return rangeToObj(ctx.currentLineRange);
		},

		/**
		 * Returns current caret position
		 * @return {Number}
		 */
		getCaretPos: function() {
			return ctx.caretPos;
		},

		/**
		 * Set new caret position
		 * @param {Number} pos Caret position
		 */
		setCaretPos: function(pos) {
			ctx.caretPos = pos;
		},

		/**
		 * Returns content of current line
		 * @return {String}
		 */
		getCurrentLine: function() {
			return ctx.currentLine;
		},

		/**
		 * Replace editor's content or it's part (from <code>start</code> to
		 * <code>end</code> index). If <code>value</code> contains
		 * <code>caret_placeholder</code>, the editor will put caret into
		 * this position. If you skip <code>start</code> and <code>end</code>
		 * arguments, the whole target's content will be replaced with
		 * <code>value</code>.
		 *
		 * If you pass <code>start</code> argument only,
		 * the <code>value</code> will be placed at <code>start</code> string
		 * index of current content.
		 *
		 * If you pass <code>start</code> and <code>end</code> arguments,
		 * the corresponding substring of current target's content will be
		 * replaced with <code>value</code>.
		 * @param {String} value Content you want to paste
		 * @param {Number} [start] Start index of editor's content
		 * @param {Number} [end] End index of editor's content
		 * @param {Boolean} [noIndent] Do not auto indent <code>value</code>
		 */
		replaceContent: function(value, start, end, noIndent) {
			var content = this.getContent();
			var caretPos = this.getCaretPos();

			if (end == null)
				end = start == null ? content.length : start;
			if (start == null) start = 0;

			if (!noIndent && autoHandleIndent) {
				var utils = emmet.utils.common;
				var lineRange = utils.findNewlineBounds(String(content), start);
				value = utils.padString(value, utils.getLinePadding(lineRange.substring(content)));
			}

			ctx.replaceContentWithValueFromToWithoutIndentation(value, start, end, !!noIndent);
		},

		/**
		 * Returns editor's content
		 * @return {String}
		 */
		getContent: function() {
			return ctx.content;
		},

		/**
		 * Returns current editor's syntax mode
		 * @return {String}
		 */
		getSyntax: function() {
			var scope = ctx.syntax;
			if (scope && ~scope.indexOf('.')) {
				if (~scope.indexOf('xsl')) {
					return 'xsl';
				}

				var syntax = 'html';

				if (!/\bstring\b/.test(scope) && /\bsource\.([\w\-]+)/.test(scope) && emmet.resources.hasSyntax(RegExp.$1)) {
					syntax = RegExp.$1;
				} else if (/\b(less|scss|sass|css|stylus)\b/.test(scope)) {
					// detect CSS-like syntaxes independently,
					// since it may cause collisions with some highlighters
					syntax = RegExp.$1;
				} else if (/\b(html|xml|haml)\b/.test(scope)) {
					syntax = RegExp.$1;
				}

				return syntax;
			}

			return scope;
		},

		/**
		 * Returns current output profile name (@see emmet#setupProfile)
		 * @return {String}
		 */
		getProfileName: function() {
			return ctx.profileName || null;
		},

		/**
		 * Ask user to enter something
		 * @param {String} title Dialog title
		 * @return {String} Entered data
		 * @since 0.65
		 */
		prompt: function(title) {
			return ctx.prompt(title);
		},

		/**
		 * Returns current selection
		 * @return {String}
		 * @since 0.65
		 */
		getSelection: function() {
			return ctx.selection;
		},

		/**
		 * Returns current editor's file path
		 * @return {String}
		 * @since 0.65
		 */
		getFilePath: function() {
			return ctx.filePath;
		}
	};
})();

function objcFileInterface(context) {
	return {
		read: function(path, size, callback) {
			var params = this._parseParams(arguments);
			var content = context.readOfSize(params.path, 0);
			params.callback(content ? null : 'ObjC error', content);
		},

		readText: function(path, size, callback) {
			var params = this._parseParams(arguments);
			var content = context.readText(params.path);
			params.callback(content ? null : 'ObjC error', String(content || ''));
		},

		locateFile: function(baseFile, fileName) {
			return fileName ? context.locateFileRelativeTo(fileName, baseFile) : null;
		},

		createPath: function(basePath, fileName) {
			return context.createPathRelativeTo(fileName, basePath);
		},

		save: function(file, content) {
			return context.saveAtPath(content, file);
		}
	};
};

function objcRunAction(name, editor) {
	objcEmmetEditor.setContext(editor);
	return emmet.actions.run(name, objcEmmetEditor);
}

function objcLoadSystemSnippets(data) {
	emmet.loadSystemSnippets(data);
}

function objcLoadCIU(data) {
	emmet.loadCIU(data);
}

function objcLoadUserData(data) {
	emmet.loadUserData(data);
}

function objcLoadExtensions(fileList) {
	emmet.loadExtensions(fileList);
}

function objcSetFileContext(ctx) {
	emmet.file(objcFileInterface(ctx));
}

function objcResetUserData() {
	emmet.resetUserData();
}

function objcGetMenu() {
	return emmet.actions.getMenu();
}

function objcGetActions() {
	var noMenuActions = [
		'expand_abbreviation_with_tab',
		'insert_formatted_line_break_only',
		'insert_formatted_line_break'
	];

	return emmet.actions.getList()
	.filter(function(action) {
		return noMenuActions.indexOf(action.name) === -1;
	})
	.map(function(action) {
		return {
			title: action.options ? action.options.label.split('/').pop() : action.name,
			id: action.name
		};
	});
}

function objcExpandAbbreviation(abbr, syntax, profile) {
	return emmet.expandAbbreviation(abbr, syntax, profile);
}

function objcGetActionNameForMenuTitle(title) {
	var found = [];
	var find = function(items) {
		items.forEach(function(item) {
			if (item.label === title || item.name === title) {
				found.push(item);
			}
			if (item.items) {
				find(item.items);
			}
		});
	};

	find(emmet.actions.getMenu());

	var action = found[found.length - 1];
	return action ? action.name : null;
}

function objcHasSyntax(syntax) {
	return emmet.resources.hasSyntax(syntax);
}

/**
 * Returns profile data for given syntaxes
 * @param  {Array<String>} syntaxes Array of syntax names
 * @return {Object} Hash with syntax profile settings
 */
function objcGetProfiles(syntaxes) {
	if (!Array.isArray(syntaxes)) {
		syntaxes = Array.prototype.slice.call(arguments, 0);
	}

	var keys = ['tag_case', 'attr_case', 'attr_quotes', 'tag_nl', 'indent',
		'inline_break', 'compact_bool', 'self_closing_tag', 'extraFilters'];
	var filterKeys = function(obj) {
		return Object.keys(obj || {}).reduce(function(out, key) {
			if (keys.indexOf(key) !== -1) {
				out[key] = obj[key];
			}
			return out;
		}, {});
	};

	return syntaxes.reduce(function(out, syntax) {
		out[syntax] = filterKeys(emmet.profile.get(null, syntax));
		return out;
	}, {});
}

function objcGetManagedPreferences() {
	var globalPrefs = [
		'caniuse.enabled', 'caniuse.era', 'css.alignVendor',
		'css.autoInsertVendorPrefixes', 'less.autoInsertVendorPrefixes',
		'sass.autoInsertVendorPrefixes', 'scss.autoInsertVendorPrefixes',
		'stylus.autoInsertVendorPrefixes'
	];

	return {
		syntaxProfiles: objcGetProfiles(['html', 'xml', 'xsl']),
		globals: globalPrefs.reduce(function(out, key) {
			out[key] = emmet.preferences.get(key);
			return out;
		}, {})
	};
}

function objcUpdateManagedPreferences(data) {
	emmet.loadUserData({
		syntaxProfiles: data.syntaxProfiles,
		preferences: Object.keys(data.globals || {}).reduce(function(out, key) {
			out[key.replace(/_/g, '.')] = data.globals[key];
			return out;
		}, {})
	});
}

/**
 * Normalizes given text: replaces default indentaions with ones defined in user
 * preferences
 */
function objcNormalizeText(text) {
	return emmet.utils.editor.normalize(text);
}

/////////////////////////////////


function objcToJSON(data) {
	// do non-strict parsing of JSON data
	try {
		return (new Function('return ' + String(data)))();
	} catch(e) {
		return {};
	}
}

function objcLoadUserSnippets(settingsData, userDefaults) {
	settingsData = objcToJSON(settingsData);
	userDefaults = objcToJSON(userDefaults);
	var utils = emmet.utils.common;
	var data = utils.deepMerge({}, settingsData, userDefaults);
	emmet.resources.setVocabulary(data, 'user');
}

function objcLoadUserPreferences(data) {
	if (data) {
		emmet.preferences.load(objcToJSON(data));
	}
}

function objcExtractTabstopsOnInsert(text) {
	return emmet.tabStops.extract(text, {
		escape: function(ch) {
			return ch;
		}
	});
}

function objcSetPreference(name, value) {
	emmet.preferences.set(name, value + '');
}

function objcSetIndentation(value) {
	emmet.resources.setVariable('indentation', value);
}

emmet.log = function(message) {
	NSLog(message);
};

NSLog('Loaded JS core')
