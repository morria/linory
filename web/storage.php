<?php
  require_once('lib/Storage.php');

  $storage = new Storage(); 
  switch($_GET['action']) {
  case 'put':
      $storage->put($_GET['id']);
      break;
  case 'get':
      $storage->get($_GET['id']);
      break;
  }

  ?>
