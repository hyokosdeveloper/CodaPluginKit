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
		$output .= '  <a href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a>'."\n";
	}
	else {
		$output .= '  '.$line."\n";
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<div id="myModal" class="reveal-modal" data-reveal>
<?php print($output); ?>
</div>
<?php else: ?>
<div id="myModal" class="reveal-modal" data-reveal>
  <h2>Awesome. I have it.</h2>
  <p class="lead">Your couch.  It is mine.</p>
  <p>Im a cool paragraph that lives inside of an even cooler modal. Wins</p>
  <a class="close-reveal-modal">&#215;</a>
</div>

<?php endif; ?>
