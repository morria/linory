(function($) {

  // plugin options
  var opts;

  $.fn.pad = function(options)
    {
      opts = $.extend({}, $.fn.pad.defaults, options);

      return this.each(function()
      {
         var pad = this;

         // Restore any previous data stored on this pad
          if(undefined != opts.pageData) {
              restoreData(pad, opts.pageData);
          }
          else {
              initializeEmptyPad(pad);
          }

         // Swap layers on double click
         $(this).find('.bitmapLayer').dblclick(function() { swapLayers(pad); });
         $(this).find('.textLayer').dblclick(function() { swapLayers(pad); });

          // Hook up the close button
          $(this).find('button').click(function() { $(pad).remove(); } );

     });
   };

    /**
      *
      */
    $.fn.padData = function()
    {
        var padData = null;

        this.each(function()
        {
            var pad = this;
            if($(pad).find('canvas').attr('data-nonempty') ||
               $(pad).find('.textLayer').html()) {
              padData = {
                bitMap: $(pad).find('canvas').get(0).toDataURL()
                // text: $(pad).find('.textLayer').html()
              };
            }
        });

        return padData;
    };

    /**
      *
      */
    function swapLayers(pad)
    {
        var z1 = $(pad).find('.bitmapLayer').css('z-index');
        var z2 = $(pad).find('.textLayer').css('z-index');
        $(pad).find('.bitmapLayer').css('z-index',z2);
        $(pad).find('.textLayer').css('z-index',z1);
    };

    /**
      *
      */
    function restoreData(pad, pageData)
    {
        // $(pad).find('.textLayer').html(pageData.text);
        $(pad).find('canvas').draw({image: pageData.bitMap,
                                    width: opts.padWidth,
                                    height: opts.padHeight,
                                    color: 'rgba(0,0,0,0.55)',
                                    eraseColor: 'rgba(255,255,255,1.0)' });
    };

    function initializeEmptyPad(pad)
    {
        $(pad).find('canvas').draw({width: opts.padWidth,
                                     height: opts.padHeight,
                                     color: 'rgba(0,0,0,0.55)',
                                     eraseColor: 'rgba(255,255,255,1.0)' });

    };

 })(jQuery);


$.fn.pad.defaults =
{
    padWidth: 450,
    padHeight: 550,
    pageData: undefined,
};
