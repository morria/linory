<?php
   $id = $_GET['id'];
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="description" content="UI experiments" />
    <meta name="keywords" content="UI UX" />
    <meta name="language" content="en/US" />
    <title>linory</title>
    <link rel="stylesheet" type="text/css" href="js/reset-fonts-grids.css" /> 
    <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie' rel='stylesheet' type='text/css' />
    <link rel="stylesheet/less" href="css/style.less" type="text/css" />
    <script type="text/javascript" src="js/less-1.0.35.min.js"></script>
    <script type="text/javascript">
      // less.env = "development";
      // less.watch();
    </script>
  </head>
  <body>
    <header>
      <h1>linory</h1>
      <button id="save">save</button>
    </header>
    <article class="linory" title="linory"></article>

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
