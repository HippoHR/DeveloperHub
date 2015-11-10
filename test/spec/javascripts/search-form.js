describe('spec/javascripts/search-form', function() {
  var searchForm, URI, testDiv, color, changedColor, expectedColor;
  var designChoices = {
    orientation: 'horizontal',
    url: 'http://www.vacatures.nl',
    buttoncolor: 'FFF000',
    buttontextcolor: '000000',
    fontsize: '20',
    fonttype: 'Arial',
    placeholder: 'true'
  };

  beforeEach(function() {
    URI = createURI();
    searchForm = new SearchForm(URI);
    testDiv = createDOMElement('div', {});
    document.body.appendChild(testDiv);
  });

  afterEach(function() {
    document.body.removeChild(testDiv);
  });

  it('should get the variables out of the url', function() {
    searchForm.loadFromUrl();
    expect(searchForm.url).toEqual(designChoices.url);
    expect(searchForm.design.orientation).toEqual(designChoices.orientation);
    expect(searchForm.design.buttoncolor).toEqual(designChoices.buttoncolor);
    expect(searchForm.design.buttontextcolor).toEqual(designChoices.buttontextcolor);
    expect(searchForm.design.fontsize).toEqual(designChoices.fontsize);
    expect(searchForm.design.fonttype).toEqual(designChoices.fonttype);
    expect(searchForm.design.placeholder).toEqual(designChoices.placeholder);
  });

  it('should get an empty url variable and default design variables when the url has no parameters', function() {
    URI.parseQuery = function() {
      return {};
    };
    searchForm.loadFromUrl();
    expect(searchForm.url).toEqual('');
    expect(searchForm.design.orientation).toEqual(searchForm.defaultValues.orientation);
    expect(searchForm.design.buttoncolor).toEqual(searchForm.defaultValues.buttoncolor);
    expect(searchForm.design.buttontextcolor).toEqual(searchForm.defaultValues.buttontextcolor);
    expect(searchForm.design.fontsize).toEqual(searchForm.defaultValues.fontsize);
    expect(searchForm.design.fonttype).toEqual(searchForm.defaultValues.fonttype);
    expect(searchForm.design.placeholder).toEqual(searchForm.defaultValues.placeholder);
  });

  it('should fill the form', function() {
    var designform = createForm();
    searchForm.prepareForm();
    expect(designform.url.value).toEqual('http://www.vacatures.nl');
    expect(designform.orientationOptionOne.checked).toEqual(true);
    expect(designform.placeholderOptionOne.checked).toEqual(true);
    expect(designform.buttontextcolorOptionOne.checked).toEqual(false);
    expect(designform.buttoncolor.value).toEqual(designChoices.buttoncolor);
    expect(designform.fonttype.value).toEqual(designChoices.fonttype);
    expect(designform.fontsize.value).toEqual(designChoices.fontsize);
  });

  it('should fill the textarea with code', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    testDiv.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body'});
    div.appendChild(textarea);
    expect(textarea.value).toEqual('');
    searchForm.showTheCode();
    expect(textarea.value).not.toEqual('');
  });

  it('should show textarea with code', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    testDiv.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body'});
    div.appendChild(textarea);
    expect(textarea.value).toEqual('');
    expect(div.className).toContain('hidden');
    searchForm.showTheCode();
    expect(textarea.value).not.toEqual('');
    expect(div.className).not.toContain('hidden');
  });

  it('should fill the example body with javascript variables and the source of the search widget', function() {
    var example = createDOMElement('div', {id: 'example', className: 'hidden'});
    testDiv.appendChild(example);
    var exampleBody = createDOMElement('div', {id: 'example-body', className: 'hidden'});
    example.appendChild(exampleBody);
    searchForm.showTheExample();
    expect(exampleBody.childNodes[0].innerHTML).toEqual(searchForm.setScriptVariables());
    expect(exampleBody.childNodes[1].src).toEqual(searchForm.getScriptUrl());
  });

  it('should set the minHeight of the example and code', function() {
    var exampleCode = createDOMElement('div', {id: 'example-code'});
    testDiv.appendChild(exampleCode);
    searchForm.setMinHeightExample();
    var minHeight = JSON.parse(exampleCode.style.minHeight.substring(0, exampleCode.style.minHeight.length - 2));
    expect(minHeight >= 350).toEqual(true);
  });

  it('should return the script variables', function() {
    createForm();
    searchForm.prepareForm();
    var scriptVariables = searchForm.setScriptVariables();
    expect(scriptVariables).toContain('var hSearchFormDesign = {');
    expect(scriptVariables).toContain('buttoncolor: \'#' + designChoices.buttoncolor + '\'');
    expect(scriptVariables).toContain('buttontextcolor: \'#' + designChoices.buttontextcolor + '\'');
    expect(scriptVariables).toContain('buttonhovercolor');
    expect(scriptVariables).toContain('buttonbordercolor');
    expect(scriptVariables).toContain('fontsize: ' + designChoices.fontsize + '');
    expect(scriptVariables).toContain('placeholder: ' + designChoices.placeholder + '');
    expect(scriptVariables).toContain('fonttype: \'' + designChoices.fonttype + '\'');
    expect(scriptVariables).toContain('var heliosParentUrl = \'' + designChoices.url + '\';');
    expect(scriptVariables).toContain('var heliosFormOrientation = \'' + designChoices.orientation + '\';');
  });

  it('should return the script url', function() {
    expect(searchForm.getScriptUrl()).toEqual('http://helios.uitzendbureau.nl/public/search-form/search-form.js');
  });

  it('should say that the design is default', function() {
    createForm();
    expect(searchForm.isDesignChoiceDefault()).toEqual(true);
  });

  it('should say that the design is not default when an radio button has changed', function() {
    var form = createForm();
    form.orientationOptionTwo.checked = true;
    expect(searchForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should say that the design is not default when an input field has changed', function() {
    var form = createForm();
    form.buttoncolor.value = '#FF0000';
    expect(searchForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should say that the design is not default when all sort of fields have changed', function() {
    var form = createForm();
    form.fontsize.value = '10';
    form.placeholderOptionOne.checked = true;
    expect(searchForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should set the design to default', function() {
    var form = createForm();
    spyOn(form.formElement, 'submit');
    form.buttoncolor.value = '#FF0000';
    form.fontsize.value = '10';
    form.orientationOptionTwo.checked = true;
    form.placeholderOptionOne.checked = true;
    searchForm.setToDefault();
    expect(searchForm.isDesignChoiceDefault()).toEqual(true);
    expect(form.formElement.submit).toHaveBeenCalled();
  });

  it('should not change the color when there is no delta', function() {
    color = '#ff0000';
    changedColor = searchForm.lightenDarkenColor(color);
    expect(color).toEqual(changedColor);
  });

  it('should not change the color when delta is 0', function() {
    color = '#ff0000';
    changedColor = searchForm.lightenDarkenColor(color, 0);
    expect(color).toEqual(changedColor);
  });

  it('should not change the color when the color can\'t get darker', function() {
    color = '#000000';
    changedColor = searchForm.lightenDarkenColor(color, -10);
    expect(color).toEqual(changedColor);
  });

  it('should not change the color when the color can\'t get lighter', function() {
    color = '#ffffff';
    changedColor = searchForm.lightenDarkenColor(color, 10);
    expect(color).toEqual(changedColor);
  });

  it('should lighten the given color', function() {
    color = '#000000';
    changedColor = searchForm.lightenDarkenColor(color, 10);
    expectedColor = '#0a0a0a';
    expect(expectedColor).toEqual(changedColor);
  });

  it('should darken the given color', function() {
    color = '#ffffff';
    changedColor = searchForm.lightenDarkenColor(color, -10);
    expectedColor = '#f5f5f5';
    expect(expectedColor).toEqual(changedColor);
  });

  it('should only darken the parts that can be darker', function() {
    color = '#ff0000';
    changedColor = searchForm.lightenDarkenColor(color, -10);
    expectedColor = '#f50000';
    expect(expectedColor).toEqual(changedColor);
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

  it('should remove only the given class from an element when the given class is at the end of the classname', function() {
    var div = createDOMElement('div', {id: 'testId', className: 'testclass hidden'});
    testDiv.appendChild(div);
    searchForm.removeClass('hidden', 'testId');
    expect(div.className).not.toContain('hidden');
    expect(div.className).toContain('testclass');
  });

 it('should remove only the given class from an element when the given class is in the middle of the classname', function() {
    var div = createDOMElement('div', {id: 'testId', className: 'testclass hidden another-class'});
    testDiv.appendChild(div);
    searchForm.removeClass('hidden', 'testId');
    expect(div.className).not.toContain('hidden');
    expect(div.className).toContain('testclass');
    expect(div.className).toContain('another-class');
  });

  function createURI() {
    var URIMock = {};
    URIMock.parseQuery = function() {
      return designChoices;
    };
    return URIMock;
  }

  function createForm() {
    var designform = {};
    designform.formElement = createDOMElement('form', {name: 'searchwidgetform', action: '#'});
    designform.url = createDOMElement('input', {id: 'heliosUrl', type: 'text', value: 'http://'});
    for(var element in searchForm.defaultValues) {
      if(searchForm.radioButtons.indexOf(element) > -1) {
        var firstValue = element === 'orientation' ? 'horizontal' : element === 'placeholder' ? 'true' : 'FFFFFF';
        var secondValue = element === 'orientation' ? 'vertical' : element === 'placeholder' ? 'false' : '000000';
        designform[element + 'OptionOne'] = createDOMElement('input', {id: element + 'OptionOne', type: 'radio', value: firstValue, checked: firstValue ===
          searchForm.defaultValues[element], name: element});
        designform[element + 'OptionTwo'] = createDOMElement('input', {id: element + 'OptionTwo', type: 'radio', value: secondValue, checked: secondValue ===
          searchForm.defaultValues[element], name: element});
        continue;
      }
      designform[element] = createDOMElement('input', {id: element, type: 'text', value: searchForm.defaultValues[element]});
    }
    for(var element in designform) {
      testDiv.appendChild(designform[element]);
    }
    return designform;
  }
});
