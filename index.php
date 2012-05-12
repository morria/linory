<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>linory</title>
  <meta name="description" content="draw and share sketches">

  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="css/style.css">

  <script src="js/libs/modernizr-2.5.3.min.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie' rel='stylesheet' type='text/css' />
  <link rel="stylesheet/less" href="css/style.less" type="text/css" />
  <script type="text/javascript" src="js/less-1.0.35.min.js"></script>
  <script type="text/javascript">
    // less.env = "development";
    // less.watch();
  </script>
</head>
<body>
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <header>
    <h1>linory</h1>
    <button id="save">save</button>
  </header>
  <div role="main">
    <article class="linory" title="linory"></article>
  </div>
  <footer>

  </footer>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
  <script src="js/plugins.js"></script>
  <script src="js/script.js"></script>

  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/pad.js"></script>
  <script type="text/javascript" src="js/draw.js"></script>
  <script type="text/javascript" src="js/linory.js"></script>
  <script type="text/javascript">
    var id = 'l<?php print $id; ?>';
    id = 'l' === id ? 'l' + btoa(Math.random()*100000).slice(0, 5) : id;

    var padWidth = $('.linory').css('width').replace('px', '');
    var padHeight = $('.linory').css('height').replace('px', '');

    $(function() { $('.linory').linory({
        padWidth: padWidth,
        padHeight:
        padHeight,
        id: id }); });
  </script>


</body>
</html>
