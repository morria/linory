<?php
  require_once('lib/Storage.php');
  $storage = new Storage(); 
  $data = $storage->getData($_GET['id']);
  $imageData = $data->pad->bitMap;
  $raw = base64_decode(substr($imageData, 22));
  $im = imagecreatefromstring($raw);
  if ($im !== false) {
      header('Content-Type: image/png');
      imagepng($im);
      imagedestroy($im);
  }
