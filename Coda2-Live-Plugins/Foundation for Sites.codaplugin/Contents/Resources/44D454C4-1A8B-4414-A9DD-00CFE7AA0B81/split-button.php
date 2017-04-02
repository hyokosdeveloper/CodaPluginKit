#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if (
		substr($line,0,1) == '[' &&
		strpos($line,'](')
	) {
		$line = explode('](',$line);
		$output .= '  <li><a href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a></li>'."\n";
	}
	else {
		$output .= '  <li><a href="#">'.$line.'</a></li>'."\n";
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<a href="#" class="button split">Split Button <span data-dropdown="drop"></span></a><br>
<ul id="drop" class="f-dropdown" data-dropdown-content>
<?php print($output); ?>
</ul>
<?php else: ?>
    <!-- Size Classes: [tiny small medium large] -->
    <!-- Color Classes: [secondary alert success] -->
    <!-- Radius Classes: [radius round] -->
<a href="#" class="button split">Split Button <span data-dropdown="drop"></span></a><br>
<ul id="drop" class="f-dropdown" data-dropdown-content>
  <li><a href="#">This is a link</a></li>
  <li><a href="#">This is another</a></li>
  <li><a href="#">Yet another</a></li>
</ul>

<?php endif; ?>
