(function($) {

  // plugin options
  var opts;

  $.fn.designPad = function(options)
    {
      opts = $.extend({}, $.fn.designPad.defaults, options);

      return this.each(function()
      {
         var designPad = this;

         // Restore any previous data stored on this pad
          if(undefined != opts.pageData)
              restoreData(designPad, opts.pageData);
          else
              initializeEmptyDesignPad(designPad);

         // Swap layers on double click
         $(this).find('.bitmapLayer').dblclick(function() { swapLayers(designPad); });
         $(this).find('.textLayer').dblclick(function() { swapLayers(designPad); });

          // Hook up the close button
          $(this).find('button').click(function() { $(designPad).remove(); } );

     });
   };

    /**
      *
      */
    $.fn.designPadData = function()
    {
        var designPadData = new Array();

        this.each(function()
        {
            var designPad = this;

            if($(designPad).find('canvas').attr('data-nonempty') ||
               $(designPad).find('.textLayer').html())
                designPadData.push(
                    {
                        bitMap: $(designPad).find('canvas').get(0).toDataURL(),
                        text: $(designPad).find('.textLayer').html()
                    });
        });

        return designPadData;
    };

    /**
      *
      */
    function swapLayers(designPad)
    {
        var z1 = $(designPad).find('.bitmapLayer').css('z-index');
        var z2 = $(designPad).find('.textLayer').css('z-index');
        $(designPad).find('.bitmapLayer').css('z-index',z2);
        $(designPad).find('.textLayer').css('z-index',z1);
    };

    /**
      *
      */
    function restoreData(designPad, pageData)
    {
        $(designPad).find('.textLayer').html(pageData.text);

        $(designPad).find('canvas').sketch({image: pageData.bitMap, 
                                            width: opts.padWidth,
                                            height: opts.padHeight,
                                            color: 'rgba(0,0,0,0.55)',
                                            eraseColor: 'rgba(255,255,255,1.0)' });
    };

    function initializeEmptyDesignPad(designPad)
    {
        $(designPad).find('canvas').sketch({width: opts.padWidth,
                                            height: opts.padHeight,
                                            color: 'rgba(0,0,0,0.55)',
                                            eraseColor: 'rgba(255,255,255,1.0)' });

    };

 })(jQuery);


$.fn.designPad.defaults =
{
    padWidth: 450,
    padHeight: 550,
    pageData: undefined,
};