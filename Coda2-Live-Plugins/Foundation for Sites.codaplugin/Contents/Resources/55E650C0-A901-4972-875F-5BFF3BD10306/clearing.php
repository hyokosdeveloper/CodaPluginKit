#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if (
		substr($line,0,2) == '![' &&
		strpos($line,'](')
	) {
		$line = explode('](',$line);
		$output .= '  <li><a href="'.substr($line[1],0,-1).'"><img src="'.substr($line[0],2).'" alt=""/></a></li>'."\n";
	}
	elseif (
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
<ul class="clearing-thumbs" data-clearing>
<?php print($output); ?>
</ul>
<?php else: ?>
<ul class="clearing-thumbs" data-clearing>
  <li><a href="path/to/your/img"><img src="path/to/your/img-th"></a></li>
  <li><a href="path/to/your/img"><img src="path/to/your/img-th"></a></li>
  <li><a href="path/to/your/img"><img src="path/to/your/img-th"></a></li>
</ul>

<?php endif; ?>

