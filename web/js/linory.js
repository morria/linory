(function($) {

  Linory = (function() {

    var BUTTON_PEN = $('#pen-button');
    var BUTTON_ERASER = $('#eraser-button');
    var BUTTON_NEW = $('#new-button');
    var BUTTON_SAVE = $('#save-button');
    var BUTTON_HOWTO = $('#howto-button');
    var PAD = $('#linory');
    var CANVAS = null;
    var BOX_SAVED = $('#saved-box');
    var THUMBNAIL = $('#thumbnail');

    _initialize();

    function _initialize() {
      _setupListeners();
      _setupPad();
    };

    function _setupListeners() {
        BUTTON_PEN.click(_onButtonPenClick);
        BUTTON_ERASER.click(_onButtonEraserClick);
        BUTTON_NEW.click(_onButtonNewClick);
        BUTTON_SAVE.click(_onButtonSaveClick);
        BUTTON_HOWTO.click(_onButtonHowtoClick);
        BOX_SAVED.click(_onBoxSavedClick);

        key('ctrl+p', _onButtonPenClick);
        key('ctrl+e', _onButtonEraserClick);
        key('ctrl+n', _onButtonNewClick);
        key('ctrl+s', _onButtonSaveClick);

        window.onpopstate = _onPopState;
    };

    function _onButtonHowtoClick(event) {
        _savePadData(function(event) {
            history.pushState(null, 'linory', '/howto');
            _setupPad();
        });
    };

    function _onBoxSavedClick(event) {
        BOX_SAVED.addClass('hidden');
        localStorage.setItem('inhibit_box_saved', true);
    };

    function _onPopState(event) {
        _setupPad();
    };

    function _onButtonPenClick(event) {
        BUTTON_PEN.addClass('active');
        BUTTON_ERASER.removeClass('active');
        CANVAS.setTool('pen');
    };

    function _onButtonEraserClick(event) {
        BUTTON_PEN.removeClass('active');
        BUTTON_ERASER.addClass('active');
        CANVAS.setTool('eraser');
    };

    function _onButtonNewClick(event) {
        _savePadData(function(event) {
            history.pushState(null, 'linory', '/');
            _setupPad();
        });
    };

    function _onButtonSaveClick(event) {
        if(CANVAS.attr('data-nonempty')) {
            BUTTON_SAVE.addClass('throb');
            _savePadData(function(event) {
            BUTTON_SAVE.removeClass('throb'); 
            if(!localStorage.getItem('inhibit_box_saved')) {
                BOX_SAVED.removeClass('hidden');
            }
            });
        }
    };

    function _getPadId() {
        return location.pathname.substring(1);
    }

    function _generatePadId() {
        return '0' + btoa(Math.random()*10000000).slice(0, 7);
    }

    function _savePadData(onSuccess) {
        var padData = {
          id: _generatePadId(),
          pad: PAD.find('.pad').padData()
        };

        _savePadDataRemote(padData, function(data) {

          history.pushState(null, padData.id, padData.id);
          if('undefined' !== typeof onSuccess) {
            onSuccess(data);
          }

          if(_getPadId()) {
              var path = location.href + '.png';
              _updateThumbnail(path);
          }
          $('#og_image').attr('content', path);
        });
    };

    function _onCanvasChange(event) {
        var pad= PAD.find('.pad').padData()
        if(pad && pad.bitMap) {
          _updateThumbnail(pad.bitMap);
        }
    };

    function _updateThumbnail(bitMap) {
        THUMBNAIL.attr('src', bitMap);
        THUMBNAIL.parent().attr('href', bitMap);
    };

    function _savePadDataRemote(padData, onSuccess) {
        $.ajax('/storage/put/' + padData.id, {
          data: JSON.stringify(padData),
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          error: _onSavePadDataRemoteError,
          success: onSuccess 
        });
    };

    function _onSavePadDataRemoteError(event) {
        console.log(event);
    };

    function _setupPad() {
        var padWidth = PAD.css('width').replace('px', '');
        var padHeight = PAD.css('height').replace('px', '');
        if(_getPadId()) {
            _getPadDataRemote(_getPadId(), function(data) {
              if(data && data.pad) {
                _initializePad(padWidth, padHeight, data.pad);
              }
            });
        }
        else {
          _initializePad(padWidth, padHeight, null);
        }
    };

    function _getPadDataRemote(padId, onSuccess) {
        $.ajax('/storage/get/' + _getPadId(), {
          dataType: 'json',
          type: 'GET',
          cache: true,
          error: _onGetPadDataRemoteError,
          success: onSuccess
        });
    };

    function _onGetPadDataRemoteError(event) {
        console.log(event);
    };

    function _initializePad(padWidth, padHeight, padData) {
      var section = $('<section />').addClass('pad');

      var bitMapLayer = CANVAS =
        $('<canvas/>').addClass('bitmapLayer')
                      .attr('id', 'drawing')
                      .attr('width', padWidth)
                      .attr('height', padHeight);
      section.append(bitMapLayer);

      CANVAS.bind('change', _onCanvasChange);
      _onCanvasChange(null);

      /*
      var textLayer =
        $('<div />').addClass('textLayer')
                    .attr('contentEditable', 'true');
      section.append(textLayer);
      */

      section.pad({
        padWidth: padWidth,
        padHeight: padHeight,
        pageData: padData
      });

      CANVAS.setTool('pen');
      PAD.empty().append(section);
    };
  })();
})(jQuery);
