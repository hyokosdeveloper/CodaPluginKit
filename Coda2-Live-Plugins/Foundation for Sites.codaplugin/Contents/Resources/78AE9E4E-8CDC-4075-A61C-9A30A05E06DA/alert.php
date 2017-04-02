#!/usr/bin/php
<?php
$fp = fopen('php://stdin', 'r');
while ( $line = fgets($fp, 4096) ) {
	$output .= '  '.$line."\n";
}

fclose($fp);


if ( $output && strlen ( $output ) > 0 ) : ?>
<div data-alert class="alert-box">
<?php print ( $output ); ?>
  <a href="#" class="close">&times;</a>
</div>

<?php else: ?>
<!-- Optional classes: [success alert secondary] [radius round] -->
<div data-alert class="alert-box">
Message goes here
  <a href="#" class="close">&times;</a>
</div>

<?php endif; ?>