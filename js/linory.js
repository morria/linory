(function($) {

  Linory = (function() {

    var BUTTON_PEN = $('#pen-button');
    var BUTTON_ERASER = $('#eraser-button');
    var BUTTON_NEW = $('#new-button');
    var BUTTON_SAVE = $('#save-button');
    var PAD = $('#linory');
    var CANVAS = null;

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

        window.onpopstate = _onPopState;
    };

    function _onPopState(event) {
        console.log(event);
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
        _savePadData();
        history.pushState(null, 'linory', '/');
        _setupPad();
    };

    function _onButtonSaveClick(event) {
        // setup spinner
        _savePadData();
        // save the pad
        // push state
        // stop the spinner
    };

    function _getPadId() {
        return location.pathname.substring(1);
    }

    function _generatePadId() {
        return '0' + btoa(Math.random()*10000000).slice(0, 7);
    }

    function _savePadData() {
        var padData = {
          id: _getPadId() ? _getPadId() : _generatePadId(),
          page: PAD.find('.pad').padData()
        };

        var jsonPadData = JSON.stringify(padData);

        _savePadDataRemote(function(event) {
          history.pushState(null, padData.id, padData.id);
        });
    };

    function _savePadDataRemote(onSuccess) {
        var padData = {
          id: _getPadId() ? _getPadId() : _generatePadId(),
          page: PAD.find('.pad').padData()
        };

        var jsonPadData = JSON.stringify(padData);

        $.ajax('/storage/put/' + padData.id, {
          data: jsonPadData,
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
              if(data && data.page && data.page[0]) {
                _initializePad(padWidth, padHeight, data.page[0]);
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

      PAD.empty().append(section);
    };
  })();
})(jQuery);

