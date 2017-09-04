describe('spec/javascripts/job-module', function() {
  var jobModuleForm, URI, testDiv;
  var recruiterId = '515';

  beforeEach(function() {
    URI = createURI();
    testDiv = createDOMElement('div', {});
    document.body.appendChild(testDiv);
    jobModuleForm = new JobModuleForm(URI);
    spyOn(jobModuleForm, 'changeLocation');
  });

  afterEach(function() {
    document.body.removeChild(testDiv);
  });

  it('should call prepareStepOne', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-een.html';
    spyOn(jobModuleForm, 'prepareStepOne');
    jobModuleForm.prepare();
    expect(jobModuleForm.prepareStepOne).toHaveBeenCalled();
  });

  it('should call prepareStepTwo', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-twee.html';
    spyOn(jobModuleForm, 'prepareStepTwo');
    jobModuleForm.prepare();
    expect(jobModuleForm.prepareStepTwo).toHaveBeenCalled();
  });

  it('should call prepareStepThree', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-drie.html';
    spyOn(jobModuleForm, 'prepareStepThree');
    jobModuleForm.prepare();
    expect(jobModuleForm.prepareStepThree).toHaveBeenCalled();
  });

  it('should get the recruiter out of the url', function() {
    jobModuleForm.loadFromUrl();
    expect(jobModuleForm.recruiter).toEqual(recruiterId);
  });

  it('should get an empty variabele recruiter when the recruiterId is not given in the url', function() {
    URI.parseQuery = function() {
      return {otherparameter: 'test'};
    };
    jobModuleForm.loadFromUrl();
    expect(jobModuleForm.recruiter).toEqual('');
  });

  it('should call vacaturemodule-stap-een.html when r is not filled', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-twee.html';
    URI.parseQuery = function() {
      return {otherparameter: 'test'};
    };
    jobModuleForm.loadFromUrl();
    expect(jobModuleForm.changeLocation).toHaveBeenCalledWith('vacaturemodule-stap-een.html');
  });

  it('should fill the form of step one with the recruiter', function() {
    var select = createDOMElement('select', {id: 'r'});
    testDiv.appendChild(select);
    var option = createDOMElement('option', {value: recruiterId});
    select.appendChild(option);
    jobModuleForm.loadFromUrl();
    jobModuleForm.fillTheFormStepOne();
    expect(select.value).toEqual(recruiterId);
  });

  it('should show the code for the job module', function() {
    var div = createDOMElement('code', {id: 'code', className: 'hidden'});
    testDiv.appendChild(div);
    var textarea = createDOMElement('textarea', {id: 'code-body', value: ''});
    div.appendChild(textarea);
    jobModuleForm.showTheCode();
    expect(textarea.value).toEqual(jobModuleForm._getTheCode());
  });

  it('should show the example for the job module', function() {
    var div = createDOMElement('div', {id: 'example', className: 'hidden'});
    testDiv.appendChild(div);
    var examplebody = createDOMElement('div', {'id': 'example-body', value: ''});
    div.appendChild(examplebody);
    jobModuleForm.showTheExample();
    expect(examplebody.innerHTML).not.toEqual('');
  });

  it('should get the design in code format', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-twee.html';
    jobModuleForm.loadFromUrl();
    var design = '';
    var tempDesign = '';
    for(var elementId in jobModuleForm.defaultValues) {
      tempDesign = jobModuleForm.defaultValues[elementId];
      if(elementId.indexOf('color') > -1 && jobModuleForm.defaultValues[elementId].indexOf('#') === -1) {
        tempDesign = '#' + jobModuleForm.defaultValues[elementId];
      }
      design += 'data-' + elementId + '="' + tempDesign + '" ';
    }
    expect(design).toEqual(jobModuleForm.getDesignChoices());
  });

  it('should disable the checkboxes and the button', function() {
    var testInformationForm = createInformationForm();
    jobModuleForm.disableEnableFields(true);
    expect(testInformationForm.button.disabled).toEqual(true);
    for(var i = 0; i < testInformationForm.checkboxes.length; i++) {
      expect(testInformationForm.checkboxes[i].disabled).toEqual(true);
    }
  });

  it('should enable the checkboxes and the button', function() {
    var testInformationForm = createInformationForm();
    jobModuleForm.disableEnableFields(false);
    expect(testInformationForm.button.disabled).toEqual(false);
    for(var i = 0; i < testInformationForm.checkboxes.length; i++) {
      expect(testInformationForm.checkboxes[i].disabled).toEqual(false);
    }
  });

  it('should say that the design choice is default', function() {
    createDesignChoiceForm();
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(true);
  });

  it('should say that the design choice is not default when checkbox has changed', function() {
    var testDesign = createDesignChoiceForm();
    testDesign.searchform.checked = true;
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should say that the design choice is not default when radiobutton has changed', function() {
    var testDesign = createDesignChoiceForm();
    testDesign.buttontextcolorblack.checked = true;
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should say that the design choice is not default when textbox has changed', function() {
    var testDesign = createDesignChoiceForm();
    testDesign.bgcolor.value = 'FF0000';
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should say that the design choice is not default when all three have changed', function() {
    var testDesign = createDesignChoiceForm();
    testDesign.hidedescription.checked = false;
    testDesign.pagebuttontextcolorblack.checked = true;
    testDesign.fonttype.value = 'Arial';
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(false);
  });

  it('should show the design form', function() {
    var form = createDOMElement('form', {className: 'hidden', name: 'designform'});
    testDiv.appendChild(form);
    createDesignChoiceForm();
    jobModuleForm.showDesignChoices();
    expect(form.className).not.toContain('hidden');
  });

  it('should submit the checkboxes', function() {
    jobModuleForm.loadFromUrl();
    createInformationForm();
    jobModuleForm.submitCheckBoxes();
    expect(jobModuleForm.changeLocation).toHaveBeenCalledWith('vacaturemodule-stap-twee.html?r=' + recruiterId +
           '&description=false&placetime=false&searchform=false');
  });

  it('should set the design to default', function() {
    var form = createDOMElement('form', {className: 'hidden', name: 'designform'});
    spyOn(form, 'submit');
    createInformationForm();
    testDiv.appendChild(form);
    var testDesign = createDesignChoiceForm();
    jobModuleForm.makeFilter();

    testDesign.hidedescription.checked = false;
    testDesign.pagebuttontextcolorblack.checked = true;
    testDesign.fonttype.value = 'Arial';
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(false);
    jobModuleForm.setToDefault();
    expect(jobModuleForm.isDesignChoiceDefault()).toEqual(true);
    expect(form.submit).toHaveBeenCalled();
  });

  it('should show the advanced options when "Geavanceerde instellingen" is clicked and they are not yet unfolded', function() {
    var container = createDOMElement('div', {id: 'advancedOptions', className: 'hidden'});
    var link = createDOMElement('a', {id: 'advancedOptionsLink'});
    testDiv.appendChild(container);
    testDiv.appendChild(link);
    jobModuleForm.advancedOptions();
    expect(container.className).not.toContain('hidden');
    expect(link.innerHTML).toEqual('- Geavanceerde instellingen');
  });

  it('should show the advanced options when an advanced option is changed', function() {
    jobModuleForm.location = '/vacaturemodule/vacaturemodule-stap-twee.html';
    jobModuleForm.loadFromUrl();
    var container = createDOMElement('div', {id: 'advancedOptions', className: 'hidden'});
    var link = createDOMElement('a', {id: 'advancedOptionsLink', innerHTML: '+ Geavanceerde instellingen'});
    testDiv.appendChild(container);
    testDiv.appendChild(link);
    jobModuleForm.showAdvancedForm();
    expect(container.className).toContain('hidden');
    expect(link.innerHTML).toEqual('+ Geavanceerde instellingen');
  });

  it('should hide the advanced options when "Geavanceerde instellingen" is clicked and they are unfolded', function() {
    var container = createDOMElement('div', {id: 'advancedOptions'});
    var link = createDOMElement('a', {id: 'advancedOptionsLink'});
    testDiv.appendChild(container);
    testDiv.appendChild(link);
    jobModuleForm.advancedOptions();
    expect(container.className).toContain('hidden');
    expect(link.innerHTML).toEqual('+ Geavanceerde instellingen');
  });

  it('should change the submit action and go to step three', function() {
    var designform = createDOMElement('form', {name: 'designform'});
    testDiv.appendChild(designform);
    jobModuleForm.goToStepThree();
    expect(designform.action).toContain('vacaturemodule-stap-drie.html');
  });

  /**
   * Function for creating URI
   * @returns {Object} URI object
   */
  function createURI() {
    var URIMock = {};
    URIMock.parseQuery = function() {
      return {r: recruiterId};
    };
    URIMock.buildQuery = function(search) {
      var string = '';
      for(var element in search) {
        string += '&' + element + '=' + search[element];
      }
      return string.substring(1);
    };
    return URIMock;
  }

  /**
   * Function for creating the InformationForm.
   * @returns {object} testInformationForm with all the elements of the InformationForm.
   */
  function createInformationForm() {
    var testInformationForm = {};
    testInformationForm.checkboxes = [];
    testInformationForm.button = createDOMElement('input', {id: 'default-design-button', type: 'button'});
    testDiv.appendChild(testInformationForm.button);
    for(var i = 0; i < jobModuleForm.checkBoxes.length; i++) {
      testInformationForm.checkboxes[i] = createDOMElement('input', {id: 'informationform-' + jobModuleForm.checkBoxes[i], type: 'checkbox'});
      testDiv.appendChild(testInformationForm.checkboxes[i]);
    }
    return testInformationForm;
  }

  /**
   * Function for creating the DesignForm with default values.
   * @returns {Object} testDesignForm with all elements of the DesignForm.
   */
  function createDesignChoiceForm() {
    var testDesignForm = {};
    for(var elementId in jobModuleForm.defaultValues) {
      if(jobModuleForm.checkBoxes.indexOf(elementId) > -1) {
        testDesignForm[elementId] = createDOMElement('input', {id: elementId, type: 'checkbox', checked: elementId === 'searchform' ? false : true});
        testDiv.appendChild(testDesignForm[elementId]);
      } else if(jobModuleForm.radioButtons.indexOf(elementId) > -1) {
        testDesignForm[elementId + 'white'] = createDOMElement('input', {id: elementId + 'white', type: 'radio', value: 'FFFFFF', checked: true, name:
          elementId});
        testDesignForm[elementId + 'black'] = createDOMElement('input', {id: elementId + 'black', type: 'radio', value: '000000', checked: false, name:
          elementId});
        testDiv.appendChild(testDesignForm[elementId + 'black']);
        testDiv.appendChild(testDesignForm[elementId + 'white']);
      } else {
        testDesignForm[elementId] = createDOMElement('input', {id: elementId, type: 'text', value: jobModuleForm.defaultValues[elementId]});
        testDiv.appendChild(testDesignForm[elementId]);
      }
    }

    // Add the filter selectors to the form
    testDiv.appendChild(createDOMElement('select', {id: 'agencyfilter'}));
    testDiv.appendChild(createDOMElement('select', {id: 'userfilter'}));

    return testDesignForm;
  }
});
