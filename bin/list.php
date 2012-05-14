<?php

  require_once('web/lib/Storage.php');

  $amazonS3 = new AmazonS3();
  $amazonS3->disable_ssl_verification(false);

  $objects =
      $amazonS3->get_object_list('sketches.linory.com');

  foreach($objects as $i => $object) {
      $name =
          preg_replace('/\//', '', $object);
      $name =
          preg_replace('/\.json/', '', $name);

      $url = 'http://linory.com/'.$name;

      print $url . "\n";
  }
