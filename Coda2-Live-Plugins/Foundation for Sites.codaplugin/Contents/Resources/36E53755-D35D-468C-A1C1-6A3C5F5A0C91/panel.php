#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if ( !$heading ) {
		$heading = '  <h5>'.$line.'</h5>'."\n";
	}
	else {
		$output .= '  '.$line."\n";
	}
}

$output = $heading . $output;
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<div class="panel">
<?php print($output); ?>
</div>

<?php else: ?>
    <!-- Optional Classes: [callout radius] -->
<div class="panel">
  <h5>This is a callout panel.</h5>
  <p>It's a little ostentatious, but useful for important content.</p>
</div>

<?php endif; ?>
