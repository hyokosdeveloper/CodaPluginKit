#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);

	$tab_output .= '  <dd><a href="#panel'.$i.'">Tab '.$i.'</a></dd>'."\n";

	$output .= '  <div class="content" id="panel'.$i.'">'."\n";
	$output .= '    '.$line."\n";
	$output .= '  </div>'."\n";
	$i++;
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<dl class="tabs" data-tab>
<?php print($tab_output); ?>
</dl>
<div class="tabs-content">
<?php print($output); ?>
</div>

<?php else: ?>
<dl class="tabs" data-tab>
  <dd class="active"><a href="#panel1">Tab 1</a></dd>
  <dd><a href="#panel2">Tab 2</a></dd>
  <dd><a href="#panel3">Tab 3</a></dd>
  <dd><a href="#panel4">Tab 4</a></dd>
</dl>
<div class="tabs-content">
  <div class="content active" id="panel1">
    <p>This is the first panel of the basic tab example. This is the first panel of the basic tab example.</p>
  </div>
  <div class="content" id="panel2">
    <p>This is the second panel of the basic tab example. This is the second panel of the basic tab example.</p>
  </div>
  <div class="content" id="panel3">
    <p>This is the third panel of the basic tab example. This is the third panel of the basic tab example.</p>
  </div>
  <div class="content" id="panel4">
    <p>This is the fourth panel of the basic tab example. This is the fourth panel of the basic tab example.</p>
  </div>
</div>

<?php endif; ?>
