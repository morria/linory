<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" itemscope itemtype="http://schema.org/image"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>linory</title>
  <meta name="description" content="draw and share sketches">

  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="css/style.css">

  <meta property="og:title" content="linory" />
  <meta property="og:description" content="draw and share sketches">
  <meta property="og:img" content="thumbnail" />
  <meta itemprop="name" content="linory">
  <meta itemprop="description" content="draw and share sketches">

  <script src="js/libs/modernizr-2.5.3.min.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Reenie+Beanie' rel='stylesheet' type='text/css' />
  <link rel="stylesheet/less" href="css/style.less" type="text/css" />
  <script type="text/javascript" src="js/libs/less-1.3.0.min.js"></script>
  <script type="text/javascript">
    // less.env = "development";
    // less.watch();
  </script>
</head>
<body>
<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
<div role="main">
  <div id="tools">
    <div id="tools-left">
      <span id="pen-button" class="button pen active"><span class="hotkey">P</span>en</span>
      <span id="eraser-button" class="button eraser"><span class="hotkey">E</span>raser</span>
    </div>
    <div id="tools-right">
      <span id="new-button" class="button new"><span class="hotkey">N</span>ew</span>
      <span id="save-button" class="button save"><span class="hotkey">S</span>ave</span>
    </div>
  </div>
  <div id="linory"></div>
  <div id="share" class="section">
    <h2>Share</h2>
    <ul>
      <li><a href="https://twitter.com/share?count=0" class="twitter-share-button" data-lang="en" data-hashtag="#linory">Tweet</a></li>
      <li><div class="fb-like" data-send="true" data-width="100" data-show-faces="false" data-action="recommend" data-font="arial"></div></li>
      <li contenteditable="true">Link</li>
      <li<g:plusone size="small" annotation="inline"></g:plusone></li>
    </ul>
  </div>
  <div id="preview" class="section">
    <h2>Drag to Save</h2>
    <a href="">
      <img id="thumbnail" src="img/bg.png" alt="Drag me to save" />
    </a>
  </div>
</div>
<footer>
  <div id="by">linory, by asm</div>
  <div id="about">
    <a href="https://twitter.com/#!/search/%23linory">See sketches on Twitter</a>. <a href="http://github.com/morria/linory">See the code on GitHub</a>.
  </div>
</footer>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script src="js/script.js"></script>

<script type="text/javascript" src="js/libs/keymaster.min.js"></script>
<script type="text/javascript" src="js/pad.js"></script>
<script type="text/javascript" src="js/draw.js"></script>
<script type="text/javascript" src="js/linory.js"></script>

  <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=171005193026735";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

  <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-31656327-1']);
    _gaq.push(['_trackPageview']);
    (function() {
       var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
       ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
     })();
  </script>
  <script type="text/javascript">
  (function() {
          var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
              po.src = 'https://apis.google.com/js/plusone.js';
              var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
                })();
  </script>
</body>
</html>
