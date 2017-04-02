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
		$output .= '  <dd><a href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a></dd>'."\n";
	}
	else {
		$output .= '  <dd><a href="#">'.$line.'</a></d>'."\n";
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<dl class="sub-nav">
  <dt>Filter:</dt>
<?php print($output); ?>
</dl>
<?php else: ?>
<dl class="sub-nav">
  <dt>Filter:</dt>
  <dd class="active"><a href="#">All</a></dd>
  <dd><a href="#">Active</a></dd>
  <dd><a href="#">Pending</a></dd>
  <dd><a href="#">Suspended</a></dd>
</dl>

<?php endif; ?>
