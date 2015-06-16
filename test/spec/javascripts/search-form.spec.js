describe('search-form', function() {

  var searchForm, URI;

  beforeEach(function() {
    URI = createURI();
    searchForm = new SearchForm(URI);
  });

  it('should fill the textarea with code', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    document.body.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body'});
    div.appendChild(textarea);
    expect(textarea.value).toEqual('');
    searchForm.showTheCode();
    expect(textarea.value).not.toEqual('');
    document.body.removeChild(div);
  });

  it('should show textarea with code', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    document.body.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body'});
    div.appendChild(textarea);
    expect(textarea.value).toEqual('');
    expect(div.className).toContain('hidden');
    searchForm.showTheCode();
    expect(textarea.value).not.toEqual('');
    expect(div.className).not.toContain('hidden');
    document.body.removeChild(div);
  });

  it('should fill the example body with javascript variables and the source of the search widget', function() {
    var example = createDOMElement('div', {id: 'example', className: 'hidden'});
    document.body.appendChild(example);
    var exampleBody = createDOMElement('div', {id: 'example-body', className: 'hidden'});
    example.appendChild(exampleBody);
    searchForm.showTheExample();
    expect(exampleBody.childNodes[0].innerHTML).toEqual(searchForm.setScriptVariables());
    expect(exampleBody.childNodes[1].src).toEqual(searchForm.getScriptUrl());
    document.body.removeChild(example);
  });

  it('should return false when the url is not valid', function() {
    searchForm.url = 'Ditisgeenurl';
    expect(searchForm.validateInput()).toBe(false);
  });

  it('should return false when the url is empty', function() {
    searchForm.url = '';
    expect(searchForm.validateInput()).toBe(false);
  });

  it('should return true when the url is valid', function() {
    searchForm.url = 'http://www.vacaturesite.nl/vacatures';
    expect(searchForm.validateInput()).toBe(true);
  });

  it('should get the variables out of the url', function() {
    searchForm.loadFromUrl();
    expect(searchForm.url).toEqual('http://www.vacatures.nl');
    expect(searchForm.orientation).toEqual('horizontal');
  });

  it('should get empty variables when the variables are not in the url', function() {
    URI.parseQuery = function() {
      return {testparameter: 'test'};
    };
    searchForm.loadFromUrl();
    expect(searchForm.url).toEqual('');
    expect(searchForm.orientation).toEqual('');
  });

  it('should remove only the given class from an element when the given class is at the end of the classname', function() {
    var div = createDOMElement('div', {id: 'testId', className: 'testclass hidden'});
    document.body.appendChild(div);
    searchForm.removeClass('hidden', 'testId');
    expect(div.className).not.toContain('hidden');
    expect(div.className).toContain('testclass');
    document.body.removeChild(div);
  });

  it('should remove only the given class from an element when the given class is in the middle of the classname', function() {
    var div = createDOMElement('div', {id: 'testId', className: 'testclass hidden another-class'});
    document.body.appendChild(div);
    searchForm.removeClass('hidden', 'testId');
    expect(div.className).not.toContain('hidden');
    expect(div.className).toContain('testclass');
    expect(div.className).toContain('another-class');
    document.body.removeChild(div);
  });

  function createURI() {
    var URI = {};
    URI.parseQuery = function() {
      return {orientation: 'horizontal', url: 'http://www.vacatures.nl'};
    };
    return URI;
  }
});
