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
		$output .= '  <dd><a href="#'.substr($line[1],0,-1).'">Tab '.$i.'</a></dd>'."\n";
		$output_panels .= '  <div class="content" id="'.substr($line[1],0,-1).'">'."\n";
		$output_panels .= '    <p>'.substr($line[0],1).'</p>'."\n";
		$output_panels .= '  </div>'."\n";
	}
	elseif ( $line != '' ) {
		$output .= '  <li><a href="#panel'.$i.'a">Tab '.$i.'</a></li>'."\n";
		$output_panels .= '  <div class="content" id="panel'.$i.'a">'."\n";
		$output_panels .= '    <p>'.$line.'</p>'."\n";
		$output_panels .= '  </div>'."\n";
		$i++;
	}
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<dl class="tabs vertical" data-tab>
<?php print($output); ?>
</dl>
<div class="tabs-content vertical">
<?php print($output_panels); ?>
</dl>
<?php else: ?>
<dl class="tabs vertical" data-tab>
  <dd class="active"><a href="#panel1a">Tab 1</a></dd>
  <dd><a href="#panel2a">Tab 2</a></dd>
  <dd><a href="#panel3a">Tab 3</a></dd>
  <dd><a href="#panel4a">Tab 4</a></dd>
</dl>
<div class="tabs-content vertical">
  <div class="content active" id="panel1a">
    <p>Panel 1.</p>
  </div>
  <div class="content" id="panel2a">
    <p>Panel 2.</p>
  </div>
  <div class="content" id="panel3a">
    <p>Panel 3.</p>
  </div>
  <div class="content" id="panel4a">
    <p>Panel 4.</p>
  </div>
</div>

<?php endif; ?>
