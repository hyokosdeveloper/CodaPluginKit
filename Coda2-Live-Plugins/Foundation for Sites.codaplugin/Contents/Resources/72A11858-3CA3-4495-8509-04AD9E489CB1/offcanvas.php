#!/usr/bin/php

<?php
$fp = fopen('php://stdin', 'r');
$found_label = false;
$i = 0;
$right_facing = true;
$left_facing = true;

while ( $line = fgets($fp, 4096) ) {
	$line_content = trim($line);

	if ( $i == 0 ) {
		if ( strtolower($line_content) == 'left' ) {
			$right_facing = false;
		}
		if ( strtolower($line_content) == 'right' ) {
			$left_facing = false;
		}
	}

	if ( $i > 0 ) {
	// Links
		if ( substr($line,0,1) == "\t" || substr($line,0,1) == ' ' ) {
			$found_label = true;
			if (
				substr($line_content,0,1) == '[' &&
				strpos($line_content,'](')
			) {
				$line_content = explode('](',$line_content);
				$output_with_labels .= '        <li><a href="'.substr($line_content[1],0,-1).'">'.substr($line_content[0],1).'</a></li>'."\n";
				$output_sans_labels .= '        <li><a href="'.substr($line_content[1],0,-1).'">'.substr($line_content[0],1).'</a></li>'."\n";
			}
			elseif ( strlen($line_content) > 0 ) {
				$output_with_labels .= '        <li><a href="#">'.$line_content.'</a></li>'."\n";
				$output_sans_labels .= '        <li><a href="#">'.$line_content.'</a></li>'."\n";
			}
		}
		// Labels or non-indented links
		elseif ( strlen($line_content) > 0 ) {
			if (
				substr($line_content,0,1) == '[' &&
				strpos($line_content,'](')
			) {
				$line_content = explode('](',$line_content);
				$output_with_labels .= '        <li><label>'.substr($line_content[0],1).'</label></li>'."\n";
				$output_sans_labels .= '        <li><a href="'.substr($line_content[1],0,-1).'">'.substr($line_content[0],1).'</a></li>'."\n";
			}
			elseif ( strlen($line_content) > 0 ) {
				$output_with_labels .= '        <li><label>'.$line_content.'</label></li>'."\n";
				$output_sans_labels .= '        <li><a href="#">'.$line_content.'</a></li>'."\n";
			}
		}
	}
	$i++;
}
fclose($fp);

if ( $output_with_labels || $output_sans_labels ) : ?>
<div class="off-canvas-wrap">
  <div class="inner-wrap">
    <nav class="tab-bar">
<?php if ( $left_facing == true ) : ?>
      <section class="left-small">
        <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
      </section>

      <section class="left tab-bar-section">
        <h1 class="title">Foundation</h1>
      </section>
<?php endif; ?><?php if ( $right_facing == true ) : ?>
      <section class="right-small">
        <a class="right-off-canvas-toggle menu-icon" ><span></span></a>
      </section>

      <section class="right tab-bar-section">
        <h1 class="title">Foundation</h1>
      </section>
<?php endif; ?>
   </nav>

    <!-- Off Canvas Menu -->
    <?php if ( $left_facing == true ) : ?><aside class="left-off-canvas-menu">
<?php endif; ?>
    <?php if ( $right_facing == true ) : ?><aside class="right-off-canvas-menu">
<?php endif; ?>
    <ul class="off-canvas-list">
<?php
if ( $found_label == true ) {
	print($output_with_labels.'bbb');
}
else {
	print($output_sans_labels.'ccc');
}
?>
      </ul>
    </aside>

    <section class="main-section">
      <!-- content goes in here -->
    </section>

  <!-- close the off-canvas menu -->
  <a class="exit-off-canvas"></a>

  </div>
</div>
<?php else: ?>
<div class="off-canvas-wrap">
  <div class="inner-wrap">
    <nav class="tab-bar">

      <section class="left-small">
        <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
      </section>

      <section class="right tab-bar-section">
        <h1 class="title">Foundation</h1>
      </section>

    </nav>

    <!-- Off Canvas Menu -->
    <aside class="left-off-canvas-menu">
      <ul class="off-canvas-list">
        <li><label>Foundation</label></li>
        <li><a href="#">The Psychohistorians</a></li>
        ...
      </ul>
    </aside>

    <section class="main-section">
      <!-- content goes in here -->
    </section>

  <!-- close the off-canvas menu -->
  <a class="exit-off-canvas"></a>

  </div>
</div>

<?php endif; ?>
