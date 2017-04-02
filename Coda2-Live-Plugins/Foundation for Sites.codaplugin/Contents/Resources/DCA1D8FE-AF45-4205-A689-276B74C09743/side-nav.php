#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if ( strlen ( $line ) == 0 ) {
		$output .= '  <li class="divider"></li>'."\n";
	}
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
<ul class="side-nav">
<?php print($output); ?>
</ul>
<?php else: ?>
<ul class="side-nav">
  <li class="active"><a href="#">Link 1</a></li>
  <li><a href="#">Link 2</a></li>
  <li class="divider"></li>
  <li><a href="#">Link 3</a></li>
  <li><a href="#">Link 4</a></li>
</ul>

<?php endif; ?>
