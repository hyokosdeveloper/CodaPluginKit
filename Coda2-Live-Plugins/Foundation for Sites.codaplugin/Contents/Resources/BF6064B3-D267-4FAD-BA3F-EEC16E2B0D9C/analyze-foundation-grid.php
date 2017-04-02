#!/usr/bin/php
<?php

// This plugin translates [Foundation 5 grids](http://foundation.zurb.com) into a [grid Morse Code syntax](http://zurb.com/playground).
// e.g. <div class="small-1 medium-2 large-3 columns">…</div> into sg01mg02lg03
// Version 1.0, October 2014
// [email](ben@zurb.com)

$fp = fopen('php://stdin', 'r');
while ( $line = fgets($fp, 4096) ) {
	$string .= trim($line)."\n";
}

fclose($fp);


/*
// Test data
$string = <<<EOL
<div class="row">
	<div class="small-1 large-push-9 columns">
		<div class="row">
			<div class="small-2 columns">
				asd as fsdf sdfsdf asf sdf 
			</div>
			<div class="small-3 columns">
			</div>
			<div class="small-4 columns">
			</div>
		</div>
		<div class="small-5 columns">
		</div>
	</div>
</div>

EOL;
*/

// We’ll parse the HTML as if it was XML — loooove PHP’s [SimpleXML functions](http://php.net/manual/en/book.simplexml.php).
// A little error checking. HTML isn’t XML, “strictly” speaking.
if ( $string && strlen($string) > 0 ) {
	$string = '<root>'.$string.'</root>';

	// These HTML elements don’t require trailing slashes like <br/>
	// They did in XHTML, but we live in a HTML5 world.
	$string = str_replace('<area>', '', $string);
	$string = str_replace('<base>', '', $string);
	$string = str_replace('<br>', '', $string);
	$string = str_replace('<col>', '', $string);
	$string = str_replace('<embed>', '', $string);
	$string = str_replace('<hr>', '', $string);
	$string = str_replace('<img>', '', $string);
	$string = str_replace('<input>', '', $string);
	$string = str_replace('<keygen>', '', $string);
	$string = str_replace('<link>', '', $string);
	$string = str_replace('<menuitem>', '', $string);
	$string = str_replace('<meta>', '', $string);
	$string = str_replace('<param>', '', $string);
	$string = str_replace('<source>', '', $string);
	$string = str_replace('<track>', '', $string);
	$string = str_replace('<wbr>', '', $string);

	// No stray ampersands.
	$string = str_replace('&', '', $string);

	// In rare cases I kept 
	$string = preg_replace('<br class=".+?">', ' ', $string);

	// No data attributes. They’re all weird in XML.
	$string = preg_replace('#data-\w+ #', ' ', $string);
	$string = preg_replace('#data-.+?>#', '>', $string);
	$string = preg_replace('#<img(.+?)>#', '', $string);
	$string = preg_replace('#<!doctype.+#', '', $string);
	$string = preg_replace('#<link.+#', '', $string);
	$string = preg_replace('#<meta.+#', '', $string);
	$string = preg_replace('#<input(.+?)>#', '', $string);

//echo '<pre>$string|';print_r($string);echo '|</pre>';

	// Translate it to object-oriented voodoo.
	// The at-mark means “got an error? Stop everything!”
	@$xml = simplexml_load_string($string);
	//echo '<pre>$xml|';print_r($xml);echo '|</pre>';
}

// Go west, young man.
if ( $xml ) {
	$final = interpret_item($xml);
}

// Cleanup.
if ( $final ) {
	$final = str_replace(')(', "|", $final);
	$final = str_replace(',)', ')', $final);
	$final = str_replace(',(', '(', $final);
	$final = str_replace(',,', ',', $final);
	$final = substr($final, 1,-1);
}

// Display.
print($final);


// This function is the core of the plugin. It figures out what’s a row, what’s a column,
// and what to do with them.
function interpret_item($obj){
	foreach ( $obj as $key => $val ) {
		$class_set = fetch_atts($val);

		// Is this a row? Then wrap its children into (parentheses).
		if ( $class_set && in_array('row', $class_set) ) {
			$output .= '(';
			$output .= interpret_item($val);
			$output .= ')';
		}

		// Is it a column? Then determine its grid settings, e.g. large-# small-#.
		if ( $class_set && ( in_array('column', $class_set) || in_array('columns', $class_set) ) ) {
			$this_col_set = array(); // reset
			foreach ( $class_set as $values ) {

				// What’s all this, then?
				$result = figure_columns($values);

				if ( $result ) {

					// Get the first two characters, e.g. the “sg” in “sg01”.
					$result_top = substr($result,0,2);

					// Add this to a short list for this column.
					// I used $result_top as the key to catch duplicates, e.g. <div class="small-1 small-2 columns">…</div>
					$this_col_set[$result_top] = $result;
				}
			}

			// String them all together. That is, ('sg01','sg02') to “sg01mg02”.
			if ( count($this_col_set) > 0 ) {
				$output .= implode('',$this_col_set).',';
			}

			// On to this column’s children, if any.
			// To do: make this work with any element regardless of attributes, like <div>.
			$try_this = interpret_item($val);
			if ( $try_this && strlen($try_this) > 0 ) {
				$output .= $try_this.',';
			}
		}
	}
	// Catch extra commas. Yeah, yeah, a little sloppy.
	if ( substr($output,-1,1) == ',' ) {
		$output = substr($output, 0,-1);
	}
	return $output;
}

// This function turns an element’s array into an array for easy parsing.
// As a bonus, this works with any XML element, not just <div>s.
function fetch_atts($obj){
	$attributes = $obj-> attributes();
	$class = (string)$attributes-> class;
	if ( $class ) {
		$class_set = explode(' ',$class);
	}
	return $class_set;
}

// This function is the “translation” part of this plugin.
function figure_columns($this_class){

	// We expect something like "small-6". But it could be anything.

	// Assume it’s a hyphen-separated string.
	$this_class_set = explode('-',$this_class);
	$number = end($this_class_set);

	// Add placeholding zeroes, if necessary.
	if ( $number && is_numeric($number) ) {
		$number < 10 ? $number = '0'.$number : null;
	}

	// Pesky push & pull both start with “pu”.
	$first_bit = substr($this_class,0,5);
	$longer_bit = substr($this_class,0,10);

	// Filter the class value. If it’s not part of the Foundation grid, then ignore it.
	switch ( $longer_bit ) {
		case 'large-push':
			$output = 'lp'.$number;
			break;
		case 'medium-pus':
			$output = 'mp'.$number;
			break;
		case 'small-push':
			$output = 'sp'.$number;
			break;
		case 'xlarge-pus':
			$output = 'xp'.$number;
			break;

		case 'large-pull':
			$output = 'lp'.$number;
			break;
		case 'medium-pul':
			$output = 'mp'.$number;
			break;
		case 'small-pull':
			$output = 'sp'.$number;
			break;
		case 'xlarge-pus':
			$output = 'xp'.$number;
			break;

		case 'small-offs':
			$output = 'so'.$number;
			break;
		case 'medium-off':
			$output = 'mo'.$number;
			break;
		case 'large-offs':
			$output = 'lo'.$number;
			break;
		case 'xlarge-off':
			$output = 'xo'.$number;
			break;

		case 'small-cent':
			$output = 'sc'.$number;
			break;
		case 'medium-cen':
			$output = 'mc'.$number;
			break;
		case 'large-cent':
			$output = 'lc'.$number;
			break;
		case 'xlarge-cen':
			$output = 'xc'.$number;
			break;
	}
	// Assume everything else is part of the grid because we’ve accounted 
	// for everything else.
	if ( !$output ) {
		switch ( $first_bit ) {
			case 'large':
				$output = 'lg'.$number;
				break;
			case 'mediu':
				$output = 'mg'.$number;
				break;
			case 'small':
				$output = 'sg'.$number;
				$col = true;
				break;
			case 'xlarg':
				$output = 'xg'.$number;
				$col = true;
				break;
		}
	}
	return $output;
}

/* The Grid. A digital frontier. 
 * I tried to picture clusters of information as they moved through the computer. What did they look like? Ships? 
 * Motorcycles? Were the circuits like freeways? I kept dreaming of a world I thought I'd never see. 
 * And then, one day... I got in.
 
 */

?>