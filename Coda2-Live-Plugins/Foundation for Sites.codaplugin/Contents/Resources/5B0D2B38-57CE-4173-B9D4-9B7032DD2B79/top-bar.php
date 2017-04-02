#!/usr/bin/php
<nav class="top-bar" data-topbar>
  <ul class="title-area">
    <li class="name">
      <h1><a href="#">My Site</a></h1>
    </li>
  </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li class="active"><a href="#">Right Nav Button Active</a></li>
      <li class="has-dropdown">
        <a href="#">Right Button with Dropdown</a>
        <ul class="dropdown">
          <li><a href="#">First link in dropdown</a></li>
        </ul>
      </li>
    </ul>

    <!-- Left Nav Section -->
    <ul class="left">
      <li><a href="#">Left Nav Button</a></li>
    </ul>
  </section>
</nav><?php

$fp = fopen('php://stdin', 'r');
$current_level = 0;
while ( $line = fgets($fp, 4096) ) {
	$line_content = trim($line);
	$spacer = ''; //reset

	// How many levels deep are we?
	$line_level = substr_count($line,'	');

	// Indent each line as appropriate
	for ( $i=0; $i<$current_level; $i++ ) {
		$spacer .= "	";
	}

	if ( $line_level > $current_level ) {
		$output .= $spacer . '<ul>'."\n";
		$output .= $spacer . '	<li>'.$line_content.'</li>'."\n";
		$spacer .= '	';
	}
	elseif ( $line_level < $current_level ) {
		$output .= $spacer . '	<li>'.$line_content.'</li>'."\n";
		$output .= $spacer . '</ul>'."\n";
	}
	else {
		$output .= $spacer . '<li>'.$line_content.'</li>'."\n";
	}
	$current_level = $line_level;





}
echo $output;
fclose($fp);

?>





