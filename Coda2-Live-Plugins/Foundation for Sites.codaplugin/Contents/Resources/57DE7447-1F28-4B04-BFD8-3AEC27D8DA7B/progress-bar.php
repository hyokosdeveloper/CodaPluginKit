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


if ( $number && strlen ( $number ) > 0 ) : ?>
<div class="progress">
  <span class="meter" style="width: <?php print($number); ?>%"></span>
</div>
<?php else: ?>
<div class="progress">
  <span class="meter" style="width: 100%"></span>
</div>

<?php endif; ?>
