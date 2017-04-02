#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$i = 1;

while ( $line = fgets($fp, 4096) ) {
	$line = trim($line);
	if ( substr($line,0,2) == '# ' ) {
		$title .= '  <li class="title">'.substr($line,2).'</li>'."\n";
	}
	elseif ( substr($line,0,1) == '$' ) {
		$price .= '  <li class="price">'.$line.'</li>'."\n";
	}
	elseif ( substr($line,0,2) == '- ' ) {
		$bullets .= '  <li class="bullet-item">'.substr($line,2).'</li>'."\n";
	}
	elseif ( substr($line,0,1) == '[' && strpos($line,'](')
	) {
		$line = explode('](',$line);
		$cta .= '  <li class="cta-button"><a href="'.substr($line[1],0,-1).'">'.substr($line[0],1).'</a></li>'."\n";
	}
	else {
		$description .= '  <li class="description">'.$line.'</li>'."\n";
	}
}
fclose($fp);

$output = $title . $price . $description . $bullets . $cta;

if ( $output && strlen ( $output ) > 0 ) : ?>
<ul class="pricing-table">
<?php print($output); ?>
</ul>
<?php else: ?>
<ul class="pricing-table">
  <li class="title">Standard</li>
  <li class="price">$99.99</li>
  <li class="description">An awesome description</li>
  <li class="bullet-item">1 Database</li>
  <li class="bullet-item">5GB Storage</li>
  <li class="bullet-item">20 Users</li>
  <li class="cta-button"><a class="button" href="#">Buy Now</a></li>
</ul>

<?php endif; ?>
