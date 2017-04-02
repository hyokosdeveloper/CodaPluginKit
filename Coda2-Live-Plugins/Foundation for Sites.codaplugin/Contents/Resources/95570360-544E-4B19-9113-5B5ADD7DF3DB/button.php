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
		$output .= '<a href="'.substr($line[1],0,-1).'" class="button">'.substr($line[0],1).'</a>'."\n";
	}
	elseif ( strlen ($line) > 0 ) {
		$output .= '<a href="#" class="button">'.$line.'</a>'."\n";
	}
	else {
		$output .= "\n";
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?><?php print($output); ?><?php else: ?>
<!-- Size Classes: [tiny small large] -->
<!-- Radius Classes: [radius round] -->
<!-- Color Classes: [secondary success alert] -->
<!-- Disabled Class: disabled -->
<a href="#" class="button">Default Button</a>
<?php endif; ?>