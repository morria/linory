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
    <title>linory.com</title>
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
      <h1>linory.com</h1>
    </header>
    <button id="save">save</button>
    <article class="adroitJournal" title="linory.com" id="asm_592">
    </article>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.validate.js"></script>
    <script type="text/javascript" src="js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="js/jquery.metadata.js"></script>
    <script type="text/javascript" src="js/jquery.adroitJournal.js"></script>
    <script type="text/javascript" src="js/jquery.designpad.js"></script>
    <script type="text/javascript" src="js/jquery.sketch.js"></script>
    <script type="text/javascript">
      var id = 'l<?php print $id; ?>';
      id = 'l' === id ? 'l' + btoa(Math.random()*100000).slice(0, 5) : id;
      $(function() { $('.adroitJournal').adroitJournal({ id: id }); });
    </script>
 </body>
</html>
