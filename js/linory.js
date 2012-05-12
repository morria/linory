(function($) {

  // plugin options
  var opts;

  $.fn.linory = function(options)
    {
      opts = $.extend({}, $.fn.linory.defaults, options);

      return this.each(function()
       {
           var journal = this;

           // Get a title for the Journal
           var journalId = opts.id;

           // Save the data upon leaving the page
           $(window).unload(function() { saveJournal(journal, journalId); });
           $('#save').click(function() { saveJournal(journal, journalId); });

           // Restore or create the Journal
           var journalData;
           if(undefined != (journalData = getJournalData(journalId)))
               restoreJournal(journal, JSON.parse(journalData));
           else
               initializeJournal(journal);
      });
   };

    /**
      *
      */
    function initializeJournal(journal)
    {
        for(var i=0;i < opts.minPageCount; i++)
            appendPage(journal, i);
    }


    /**
      *
      */
    function restoreJournal(journal, journalData)
    {
        // Set the title, etc.
        $(journal).attr('id', journalData.id);
        $(journal).attr('title', journalData.title);

        // Restore each individual page
        for(var i=0;i<journalData.pages.length;i++)
            appendPage(journal, i, journalData.pages[i]);

        // If we don't have the full number of pages,
        // append a few extra blanks
        for(; i < (opts.minPageCount - 1); i++)
            appendPage(journal, i);

        // Always have at least one spare page
        appendPage(journal, ++i);
    };

    /**
      *
      */
    function appendPage(journal, pageId, journalPageData)
    {
        var section =
            $('<section />').attr('id', pageId)
                                     .addClass('pad');

        // section.append('<button alt="delete page">X</button>');

        var bitMapLayer =
            $('<canvas/>').addClass('bitmapLayer')
                                   .attr('width', opts.padWidth)
                                   .attr('height', opts.padHeight);

        section.append(bitMapLayer);

        var textLayer =
            $('<div />').addClass('textLayer')
                              .attr('contentEditable', 'true');

        section.append(textLayer);


        if(undefined != journalPageData)
            section.pad({padWidth: opts.padWidth,
                               padHeight: opts.padHeight,
                               pageData: journalPageData});
        else
            section.pad({padWidth: opts.padWidth,
                        padHeight: opts.padHeight});

        $(journal).append(section);
    };

    /**
      *
      */
    function getJournalData(journalId)
    {
        var journalData = localStorage.getItem(journalId);
        return journalData;
    };

    /**
     *
     */
    function saveJournal(journal, journalId)
    {
        // Store journal meta-data
        var journalData =
            {
                id: journalId,
                title: $(journal).attr('title'),
                pages: new Array()
            };

        // Fetch the data for each page
        journalData.pages =
            $(journal).find('.pad').padData();

        var jsonImageData = JSON.stringify(journalData);

        // Shove it in a local store
        localStorage.setItem(journalData.id, jsonImageData);

        history.pushState(journalData, journalId, journalId);
    };

 })(jQuery);


$.fn.linory.defaults =
{
    minPageCount: 1,
    padWidth: 681,
    padHeight: 600,
};
