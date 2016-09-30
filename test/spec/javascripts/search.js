describe('spec/javascripts/search', function() {
  var searchWidget;

  // Object containing all parameters for the url
  var params = {};
  params.url = 'https://www.uitzendbureau.nl/tools/zoekwidget';
  params.orientation = 'horizontal';

  var uriWithParams = createUri(params);
  searchWidget = new SearchWidgetForm(uriWithParams);

  // Create an empty test container for each test
  beforeEach(function() {
    this.containerTestDiv = createDOMElement('div', {id: 'testDiv'});
    document.body.appendChild(this.containerTestDiv);
  });

  afterEach(function() {
    document.body.removeChild(this.containerTestDiv);
  });

  describe('loadFromUrl', function() {
    it('should get the variables out of the url', function() {
      searchWidget.loadFromUrl();
      expect(searchWidget.orientation).toEqual(params.orientation);
    });

    it('should use empty string when no orientation is given', function() {
      var UriWithoutParams = createUri();
      var searchWidgetWithoutParams = new SearchWidgetForm(UriWithoutParams);
      searchWidgetWithoutParams.loadFromUrl();
      expect(searchWidgetWithoutParams.orientation).toEqual('');
    });
  });

  describe('fillTheForm', function() {
    beforeEach(function() {
      searchWidget.orientation = params.orientation;

      // Prepare the DOM
      this.form = createDOMElement('form', {id: 'form'});
      this.inputVertical = createDOMElement('input', {value: 'vertical', type: 'radio', id: 'vertical'});
      this.inputHorizontal = createDOMElement('input', {value: 'horizontal', type: 'radio', id: 'horizontal'});
      this.containerTestDiv.appendChild(this.form);
      this.form.appendChild(this.inputVertical);
      this.form.appendChild(this.inputHorizontal);
    });

    it('should fill the form with the correct orientation', function() {
     // This should make horizontal checked
     searchWidget.fillTheForm();
     expect(this.inputHorizontal.checked).toEqual(true);
     expect(this.inputVertical.checked).toEqual(false);
    });
  });

  describe('showTheCode', function() {
    beforeEach(function() {
      this.div = createDOMElement('code', {id: 'code', className: 'hidden'});
      this.containerTestDiv.appendChild(this.div);
      this.textarea = createDOMElement('textarea', {id: 'code-body'});
      this.div.appendChild(this.textarea);
    });

    it('should start with a hidden textarea', function() {
      expect(this.textarea.value).toEqual('');
      expect(this.div.className).toContain('hidden');
    });

    it('should unhide the textarea and fill it with code', function() {
      searchWidget.showTheCode();
      expect(this.textarea.value).not.toEqual('');
      expect(this.div.className).not.toContain('hidden');
    });
  });

  describe('getScriptUrl', function() {
    it('should be able to get the correct script URL', function() {
      searchWidget.orientation = params.orientation;
      var script = searchWidget._getScriptUrl();
      expect(script).toEqual('https://www.uitzendbureau.nl/tools/zoekwidget?orientation=horizontal');
    });
  });

  // These tests are located in the helper file, since more widgets use them.
  testRemoveClassName('searchwidget', searchWidget);
});
