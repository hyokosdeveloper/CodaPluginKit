#!/usr/bin/php
<?php

// This plugin translates [Foundation “Morse Code”](http://zurb.com/playground) into a Foundation 5 grid.
// e.g. sg01mg02lg03 into <div class="small-1 medium-2 large-3 columns">…</div>
// Version 1.0, October 2014
// [email](ben@zurb.com)

// Read the selected text.
$fp = fopen('php://stdin', 'r');
while ( $line = fgets($fp, 4096) ) {
	$string .= trim($line)."\n";
}

fclose($fp);

// A little required preformatting.
if ( $string ) {

	// No extra spaces.
	$string = trim($string);

	// Break Sublime-plugins-friendly pipes into new lines for easy parsing later.
	// I think.
	$string = str_replace('|', "\n", $string);

	// I said no extra spaces!
	$string = str_replace(' ', '', $string);

	// Break it into an array to loop through.
	$string_set = explode("\n",$string);
}

//echo '<pre>$string_set|';print_r($string_set);echo '|</pre>';

// Loop through the whole thing.

if ( $string_set ) {
	foreach ( $string_set as $key => $val ) {
		$output .= handle_row($val);
	}
}

// Back to Coda with you.
print($output);


// This function interprets Morse Code. We use <cell> and <row> until final output
// for easy debugging.
function handle_row($string){

	// Parens represent rows.
	$string = str_replace('(', 'columns"><row><cell class="', $string);
	$string = str_replace(')', 'columns">…</cell></row></cell><cell class="', $string);
	$string = str_replace(',', 'columns">…</cell><cell class="', $string);

	// Translate column widths.
	$string = preg_replace('<sg(\d\d)>', 'small-\1 ', $string);
	$string = preg_replace('<mg(\d\d)>', 'medium-\1 ', $string);
	$string = preg_replace('<lg(\d\d)>', 'large-\1 ', $string);
	$string = preg_replace('<xg(\d\d)>', 'xlarge-\1 ', $string);

	// Translate pulls — “pushes” with negative values — e.g. sp-01.
	$string = preg_replace('<sp-(\d\d)>', 'small-pull-\1 ', $string);
	$string = preg_replace('<mp-(\d\d)>', 'medium-pull-\1 ', $string);
	$string = preg_replace('<lp-(\d\d)>', 'large-pull-\1 ', $string);
	$string = preg_replace('<xp-(\d\d)>', 'xlarge-pull-\1 ', $string);

	// Translate pushes.
	$string = preg_replace('<sp(\d\d)>', 'small-push-\1 ', $string);
	$string = preg_replace('<mp(\d\d)>', 'medium-push-\1 ', $string);
	$string = preg_replace('<lp(\d\d)>', 'large-push-\1 ', $string);
	$string = preg_replace('<xp(\d\d)>', 'xlarge-push-\1 ', $string);

	// Translate offsets.
	$string = preg_replace('<so(\d\d)>', 'small-offset-\1 ', $string);
	$string = preg_replace('<mo(\d\d)>', 'medium-offset-\1 ', $string);
	$string = preg_replace('<lo(\d\d)>', 'large-offset-\1 ', $string);
	$string = preg_replace('<xo(\d\d)>', 'xlarge-offset-\1 ', $string);

	// Translate centered columns.
	$string = preg_replace('<sc(\d\d)>', 'small-centered-\1 ', $string);
	$string = preg_replace('<mc(\d\d)>', 'medium-centered-\1 ', $string);
	$string = preg_replace('<lc(\d\d)>', 'large-centered-\1 ', $string);
	$string = preg_replace('<xc(\d\d)>', 'xlarge-centered-\1 ', $string);

	// Translate
	$string = '<row><cell class="'.$string.'columns"></row>';
	$string = str_replace('<cell class="columns"></row>', '</cell></row>', $string);
	$string = str_replace('columns"></row>', 'columns">…</cell></row>', $string);
	$string = str_replace('</cell></cell>', '</cell>', $string);

	// Remove placeholding zeroes from everything.
	$string = preg_replace('#-0(\d)#', '-\1', $string);

	// Put rows onto their own lines.
	$string = str_replace('<row>', "<row>", $string);
	$string = str_replace('</row>', "</row>", $string);

	// Put cells onto their own lines.
	$string = str_replace('</cell><cell>', "</cell>\n\t<cell>", $string);

	// Turn <cell>s and <row>s into proper <div> elements. Yeah, yeah, divitis, but
	// I have no way of knowing how semantic to make the HTML.
	$string = str_replace('<cell', '<div', $string);
	$string = str_replace('<row', '<div class="row"', $string);
	$string = str_replace('</cell>', "</div>", $string);
	$string = str_replace('</row>', "</div>\n", $string);
	$string = str_replace('<div class="columns">…</div>', '', $string);

	$string = str_replace('>', ">\n", $string);
	$string = str_replace("\n…", "…", $string);
	$string = str_replace("\n\n", "\n", $string);

	return $string."\n";
}

/*
$string = preg_replace('#<row#', ' columns"><row', $string);
$string = preg_replace('#<cell>#', '<div class="', $string);
$string = preg_replace('#</cell>#', ' columns">', $string);
*/



?>