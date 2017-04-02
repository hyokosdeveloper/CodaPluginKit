#!/usr/bin/php
<?php

$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	$output .= <<<EOL
  <dd>
    <a href="#panel$i">Accordion $i</a>
    <div id="panel$i" class="content">
      $line
    </div>
  </dd>

EOL;
	$i++;
}
fclose($fp);

if ( $output && strlen ( $output ) > 0 ) : ?>
<dl class="accordion" data-accordion>
<?php print($output); ?>
</dl>

<?php else: ?>
<dl class="accordion" data-accordion>
  <dd>
    <a href="#panel1">Accordion 1</a>
    <div id="panel1" class="content active">
      Panel 1 Content
    </div>
  </dd>
  <dd>
    <a href="#panel2">Accordion 2</a>
    <div id="panel2" class="content">
      Panel 2 Content
    </div>
  </dd>
  <dd>
    <a href="#panel3">Accordion 3</a>
    <div id="panel3" class="content">
      Panel 3 Content
    </div>
  </dd>
</dl>

<?php endif; ?>