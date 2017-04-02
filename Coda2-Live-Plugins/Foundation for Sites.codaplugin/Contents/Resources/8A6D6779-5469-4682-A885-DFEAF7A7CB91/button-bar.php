#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);

	// Got content? Use it in a button.
	if ( $line && strlen ( $line ) > 0 ) {
		if (
			substr($line,0,1) == '[' &&
			strpos($line,'](')
		) {
			$line = explode('](',$line);
			$output .= '    <li><a class="button" href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a></li>'."\n";
		}
		else {
			$output .= '    <li><a class="button" href="#">'.$line.'</a></li>'."\n";
		}
	}
	else {
		// No content? Assume it’s a divider.
		$output .=   '  </ul>'."\n\n".'  <ul class="button-group">'."\n";
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?><div class="button-bar">

  <ul class="button-group">
<?php print($output); ?>
  </ul>

</div>
<?php else: ?><div class="button-bar">
  <ul class="button-group">
    <li><a class="button href="#"">Button 1</a></li>
    <li><a class="button href="#"">Button 2</a></li>
    <li><a class="button href="#"">Button 3</a></li>
  </ul>
  <ul class="button-group">
    <li><a class="button href="#"">Button 1</a></li>
    <li><a class="button href="#"">Button 2</a></li>
    <li><a class="button href="#"">Button 3</a></li>
  </ul>
</div>

<?php endif; ?>
