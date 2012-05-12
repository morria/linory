(function($) {

var opts;

var cp =
        { 'x1': null,
          'y1': null,
          'x2': null,
          'y2':null};

var tool = 'pen';

$.fn.draw = function(options)
{
  opts = $.extend({}, $.fn.draw.defaults, options);

  return this.each(function()
    {
      $(this).addClass('draw');
      setTool(this, 'pen');

      // Load any image passed in
      if(null != opts.image)
      {
        $(this).attr('data-nonempty',true);
        var ctx = this.getContext('2d');
        var image = new Image();
        image.onload = function() { ctx.drawImage(image,0,0,opts.width,opts.height); };
        image.src = opts.image;
      }

      // Hook up event listeners
      $(this).mousedown(mouseDownListener);
      $(this).mouseup(mouseUpListener);
      $(this).mouseleave(mouseLeaveListener);
      $(this).mouseenter(mouseEnterListener);

      if(isIPhone())
        $(this).bind('touchend', mouseUpListener);

        $(this).bind('touchstart', function(event) 
                     {
                       mouseDownListener(event);
                       return (false);
              });
    });
};

$.fn.setTool = function(tool) {
    return this.each(function() {
      setTool(this, tool);
    });
}

function isIPhone()
{
  return (new RegExp( "iPhone", "i" )).test(navigator.userAgent);
};


function unsetTool(canvas)
{
    tool = null;
}

function setTool(canvas,toolType)
{
    var ctx = canvas.getContext('2d');

    unsetTool(canvas);
    tool = toolType;

    switch(toolType)
    {
    case 'pen':
        $(canvas).removeClass('drawEraser');
        $(canvas).addClass('drawPen');
        ctx.strokeStyle = opts.color;
        ctx.lineWidth = 2.2;
        break;
    case 'eraser':
        $(canvas).removeClass('drawPen');
        $(canvas).addClass('drawEraser');
        ctx.strokeStyle = opts.eraseColor;
        ctx.lineWidth = 15.0;
        break;
    }
}

function mouseMoveUnDrawListener(event)
{
    cp.x1 = cp.y1 = cp.x2 = cp.y2 = null;
}

function mouseMoveDrawBListener(event)
{
    var canvas = event.currentTarget;
    var ctx = canvas.getContext('2d');

    if(null == cp.x1)
    {
        cp.x1 = event.offsetX;
        cp.y1 = event.offsetY;
    }
    else if(null == cp.x2)
    {
        if(Math.abs(event.offsetX - cp.x1) < 4 &&
           Math.abs(event.offsetY - cp.y1) < 4)
            return;

        cp.x2 = event.offsetX;
        cp.y2 = event.offsetY;
    }
    else
    {
        ctx.beginPath();
        ctx.moveTo(cp.x1, cp.y1);
        ctx.bezierCurveTo(cp.x1,cp.y1,
                          cp.x2,cp.y2,
                          event.offsetX,event.offsetY);
        cp.x1 = event.offsetX;
        cp.y1 = event.offsetY;
        cp.x2 = null;
        cp.y2 = null;

        ctx.stroke();
    }
}

function mouseMoveDrawListener(event)
{
  var canvas = event.currentTarget;
  var ctx = canvas.getContext('2d');

  var c = getRelativeCoordinates(event,canvas);

  var cx = c.x;
  var cy = c.y;

  if(null != cp.x1 && null != cp.y1)
  {
    ctx.beginPath();
    ctx.moveTo(cp.x1, cp.y1);
    ctx.quadraticCurveTo(cp.x1,cp.y1, cx, cy);
    ctx.stroke();
    $(canvas).attr('data-nonempty',true);
  }
  cp.x1 = cx;
  cp.y1 = cy;
};

function mouseDownListener(event)
{
    $(event.currentTarget).select();
    $(event.currentTarget).unbind('mousemove');
    $(event.currentTarget).mousemove(mouseMoveDrawListener);

    if(isIPhone())
      $(event.currentTarget).bind('touchmove', mouseMoveDrawListener);

    return false;

};

function mouseUpListener(event)
{
    cp.x1 = cp.y1 = cp.x2 = cp.y2 = null;
    $(event.currentTarget).unbind('mousemove');
    $(event.currentTarget).unbind('touchmove');
    $(event.currentTarget).mousemove(mouseMoveUnDrawListener);
    $(event.currentTarget).trigger('change');
};

function mouseLeaveListener(event)
{
    cp.x1 = cp.y1 = cp.x2 = cp.y2 = null;
};


function mouseEnterListener(event)
{
    cp.x1 = cp.y1 = null;
};

function getRelativeCoordinates(event, reference) {
    var x, y;
    event = event || window.event;
    var el = event.target || event.srcElement;

    if(isIPhone())
    {
      event = window.event.targetTouches[ 0 ];
      var position = getAbsolutePosition(reference);
      return {x: (event.pageX - position.x),
              y: (event.pageY - position.y)};
    }

    if (!window.opera && typeof event.offsetX != 'undefined') {
      // Use offset coordinates and find common offsetParent
      var pos = { x: event.offsetX, y: event.offsetY };

      // Send the coordinates upwards through the offsetParent chain.
      var e = el;
      while (e) {
        e.mouseX = pos.x;
        e.mouseY = pos.y;
        pos.x += e.offsetLeft;
        pos.y += e.offsetTop;
        e = e.offsetParent;
      }

      // Look for the coordinates starting from the reference element.
      var e = reference;
      var offset = { x: 0, y: 0 }
      while (e) {
        if (typeof e.mouseX != 'undefined') {
          x = e.mouseX - offset.x;
          y = e.mouseY - offset.y;
          break;
        }
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
        e = e.offsetParent;
      }

      // Reset stored coordinates
      e = el;
      while (e) {
        e.mouseX = undefined;
        e.mouseY = undefined;
        e = e.offsetParent;
      }
    }
    else {
      // Use absolute coordinates
      var pos = getAbsolutePosition(reference);
      x = event.pageX  - pos.x;
      y = event.pageY - pos.y;
    }
    // Subtract distance to middle
    return { x: x, y: y };
  }

    /**
    * Retrieve the absolute coordinates of an element.
    *
    * @param element
    *   A DOM element.
    * @return
    *   A hash containing keys 'x' and 'y'.
    */
    function getAbsolutePosition(element) {
    var r = { x: element.offsetLeft, y: element.offsetTop };
    if (element.offsetParent) {
        var tmp = getAbsolutePosition(element.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
    }
    return r;
    };


 })(jQuery);

$.fn.draw.defaults =
{
  name: 'defaultName',
  width: '381',
  height: '600',
  color: 'rgba(255,255,255,1.0)',
  eraseColor: 'rgba(0,0,0,1.0)',
  image: null
};
