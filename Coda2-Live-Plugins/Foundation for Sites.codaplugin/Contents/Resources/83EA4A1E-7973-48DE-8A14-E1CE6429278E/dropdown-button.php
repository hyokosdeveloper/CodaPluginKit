#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if ( !$first ) {
		if (
			substr($line,0,1) == '[' &&
			strpos($line,'](')
		) {
			$line = explode('](',$line);
			$first = '<a href="#" data-dropdown="drop" class="button dropdown">'.substr($line[0],1).'</a><br>'."\n";
		}
		else {
			$first = '<a href="#" data-dropdown="drop" class="button dropdown">'.$line.'</a><br>'."\n";
		}
	}
	else {
		if (
			substr($line,0,1) == '[' &&
			strpos($line,'](')
		) {
			$line = explode('](',$line);
			$others .= '  <li><a href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a></li>'."\n";
		}
		elseif ( strlen($line) > 0 ) {
			$others .= '  <li><a href="#">'.$line.'</a></li>'."\n";
		}
	}
}
fclose($fp);

if ( $others && strlen ( $others ) > 0 ) : ?>
<?php print($first); ?>
<ul id="drop" data-dropdown-content class="f-dropdown">
<?php print($others); ?>
</ul>
<?php else: ?>
<!-- Size Classes: [tiny small medium large] -->
<!-- Color Classes: [secondary alert success] -->
<!-- Radius Classes: [radius round] -->
<a href="#" data-dropdown="drop" class="button dropdown">Dropdown Button</a><br>
<ul id="drop" data-dropdown-content class="f-dropdown">
  <li><a href="#">This is a link</a></li>
  <li><a href="#">This is another</a></li>
  <li><a href="#">Yet another</a></li>
</ul>

<?php endif; ?>
