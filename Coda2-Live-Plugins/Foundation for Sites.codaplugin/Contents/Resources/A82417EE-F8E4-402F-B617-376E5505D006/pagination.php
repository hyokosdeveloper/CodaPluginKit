#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if (strlen($line) > 0 ) {
		$number = $line;
	}
}
fclose($fp);


if (is_numeric($number * 1)) {
	for ( $i=1; $i<=$number; $i++ ) {
		$output .= '<li><a href="#">'.$i.'</a></li>'."\n";
	}
}

if ( $output && strlen ( $output ) > 0 ) : ?>
<ul class="pagination">
<?php print($output); ?>
</ul>
<?php else: ?>
<ul class="pagination">
  <li class="arrow unavailable"><a href="">&laquo;</a></li>
  <li class="current"><a href="">1</a></li>
  <li><a href="">2</a></li>
  <li><a href="">3</a></li>
  <li><a href="">4</a></li>
  <li class="unavailable"><a href="">&hellip;</a></li>
  <li><a href="">12</a></li>
  <li><a href="">13</a></li>
  <li class="arrow"><a href="">&raquo;</a></li>
</ul>

<?php endif; ?>
