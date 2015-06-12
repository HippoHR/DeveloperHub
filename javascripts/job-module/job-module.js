(function(URI, Recruiter) {
  'use strict';

  /**
   * Class to handle the job widget form.
   * @constructor
   */
  function JobModuleForm() {
    this.recruiter = '';
    this.checkBoxes = [
      'hidedescription',
      'hideplacetime',
      'searchform'
    ];
    this.radioButtons = [
      'buttontextcolor',
      'pagebuttontextcolor'
    ];
    this.defaultValues = {
      titlecolor: '428BCA',
      textcolor: '333333',
      footercolor: '3A9615',
      fontsize: '14',
      fonttype: 'Helvetica',
      hidedescription: 'true',
      hideplacetime: 'true',
      searchform: 'false',
      buttoncolor: '5CB85C',
      buttontextcolor: 'FFFFFF',
      bgcolor: 'FFFFFF',
      hovercolor: 'F4F4FF',
      pagebuttoncolor: '428BCA',
      pagebuttontextcolor: 'FFFFFF',
      loadingcolor: '11BAF2',
      loadingcolorbackground: 'B5E9F7'
    };
    this.advancedValues = {
      bgcolor: 'FFFFFF',
      hovercolor: 'F4F4FF',
      pagebuttoncolor: '428BCA',
      pagebuttontextcolor: 'FFFFFF',
      loadingcolor: '11BAF2',
      loadingcolorbackground: 'B5E9F7'
    };
    this.design = {};
    this.formSubmitted = false;
  };

  /**
   * Preparing the forms.
   */
  JobModuleForm.prototype.prepare = function() {
    this.loadFromUrl();
    if(document.location.pathname === '/vacaturemodule/vacaturemodule-stap-een.html') {
      this.prepareStepOne();
    } else if(document.location.pathname === '/vacaturemodule/vacaturemodule-stap-twee.html') {
      this.prepareStepTwo();
    } else if(document.location.pathname === '/vacaturemodule/vacaturemodule-stap-drie.html') {
      this.prepareStepThree();
    }
  };

  /**
   * Function for preparing step one of the job-module.
   */
  JobModuleForm.prototype.prepareStepOne = function() {
    this.prepareRecruiters();
    this.fillTheFormStepOne();
  };

  /**
   * Function for preparing step two of the job-module.
   */
  JobModuleForm.prototype.prepareStepTwo = function() {
    var self = this;
    // Attach event to all the informationform checkboxes for when they get clicked.
    for(var i = 0; i < this.checkBoxes.length; i++) {
      this.attachEventToElement('informationform-' + this.checkBoxes[i], function() {
        self.submitCheckBoxes();
      }, 'click');
    }
    // Attach event when the button "Opmaak kiezen" gets clicked.
    this.attachEventToElement('chooseDesign', function(e) {
      self.showDesignChoices(e);
    }, 'click');
    // Attach event when the link "Terug naar standaardinstellingen" gets clicked.
    this.attachEventToElement('default', function(e) {
      self.setToDefault(e);
    }, 'click');
    // Attach event when the link "Geavanceerde instellingen" gets clicked.
    this.attachEventToElement('advancedOptionsLink', this.advancedOptions, 'click');
    // Attach event when the button "Ga naar volgende stap" gets clicked.
    this.attachEventToElement('buttonDone', this.goToStepThree, 'click');
    this.fillTheFormStepTwo();
    this.showAdvancedForm();
    this.showTheExample();
  };

  /**
   * Function for preparing step three of the job-module.
   */
  JobModuleForm.prototype.prepareStepThree = function() {
    this.showTheCode();
  };

  /**
   * Function for adding an event to an element.
   * @param {String} id Id of the element.
   * @param {String} method Method that should be called when the event occurs.
   * @param {String} event A string representing the event type to listen for.
   */
  JobModuleForm.prototype.attachEventToElement = function(id, method, event) {
    var element = document.getElementById(id);
    if(element) {
      if(element.addEventListener) {
        element.addEventListener(event, method, false);
      } else if(element.attachEvent) {
        element.attachEvent('on' + event, method);
      }
    }
  };

  /**
   * Function for showing the advanced tab. This tab will be shown when an advanced value has been changed.
   */
  JobModuleForm.prototype.showAdvancedForm = function() {
    for(var value in this.advancedValues) {
      if(this.advancedValues[value] !== this.design[value]) {
        this.advancedOptions();
        break;
      }
    }
  };

  /**
   * Method to load the values from the url parameters.
   */
  JobModuleForm.prototype.loadFromUrl = function() {
    var params = URI.parseQuery(location.search);
    this.recruiter = params.r || '';
    if(document.location.pathname !== '/vacaturemodule/vacaturemodule-stap-een.html') {
      // When recruiter is empty the page will redirect to vacaturemodule-stap-een.html.
      if(this.recruiter === '') {
        document.location = 'vacaturemodule-stap-een.html';
      }
      for(var value in this.defaultValues) {
        // When all the parameters are in the url we assume that the form has been submitted.
        if(params[value] && this.checkBoxes.indexOf(value) < 0 && document.location.pathname === '/vacaturemodule/vacaturemodule-stap-twee.html') {
          this.formSubmitted = true;
        }
        // Filling design with parameter out of url. When parameter is empty design will be filled with defaultvalue.
        this.design[value] = params[value] || this.defaultValues[value];
      }
      // When checkboxes are not checked they will not be send on form.submit(). So when they are not in the url we assume that they are false.
      this.design.hidedescription = params.description || 'false';
      this.design.hideplacetime = params.placetime || 'false';
      this.design.searchform = params.searchform || 'false';
    }
  };

  /**
   * Prepare the recruiter part of the form. Loads a list of recruiters to show them.
   */
  JobModuleForm.prototype.prepareRecruiters = function() {
    var self = this;
    Recruiter.getAll(function(recruiters) {
      self.showRecruiterList(recruiters);
    });
  };

  /**
   * Method to fill the form with the data in this instance.
   */
  JobModuleForm.prototype.fillTheFormStepOne = function() {
    var r = document.getElementById('r');
    if(r && this.recruiter !== '') {
      r.value = this.recruiter;
    }
  };

  /**
   * Show the list of recruiters that users can choose for the form.
   * @param {Array} recruiters List of objects describing recruiters in the form of {name:'',id:1}.
   */
  JobModuleForm.prototype.showRecruiterList = function(recruiters) {
    // Create the select box to show the recruiters in.
    var select = document.createElement('select');
    select.name = 'r';
    select.id = 'r';
    select.required = true;
    select.className = 'form-control';
    // Now create options for all recruiters.
    for(var i = 0; i < recruiters.length; i++) {
      var option = document.createElement('option');
      option.value = recruiters[i].id;
      option.appendChild(document.createTextNode(recruiters[i].name));

      // Make sure the selected recruiter will be shown as selected in the form.
      if(this.recruiter && recruiters[i].id === this.recruiter) {
        option.selected = true;
      }

      // Add the option to the select box.
      select.appendChild(option);
    }

    // Find the destination for our new select box. Replace the destination with this select box.
    var destination = document.getElementById('recruiter-list-loader');
    destination.parentNode.replaceChild(select, destination);
  };

  /**
   * Fill the form of step two.
   */
  JobModuleForm.prototype.fillTheFormStepTwo = function() {
    // Setting the fields of the information form.
    document.getElementById('informationform-recruiterId').value = this.recruiter;
    for(var i = 0; i < this.checkBoxes.length; i++) {
      document.getElementById('informationform-' + this.checkBoxes[i]).checked = JSON.parse(this.design[this.checkBoxes[i]]);
    }

    // Setting the fields of the design form.
    document.getElementById('recruiterId').value = this.recruiter;
    for(var element in this.design) {
      if(this.checkBoxes.indexOf(element) >= 0) {
        document.getElementById(element).checked = JSON.parse(this.design[element]);
      } else if(this.radioButtons.indexOf(element) >= 0) {
        var color = this.design[element] === '000000' ? 'black' : 'white';
        document.getElementById(element + color).checked = true;
      } else {
        document.getElementById(element).value = this.design[element];
      }
    }
    // When designform has been submitted once we keep showing the design form.
    if(this.formSubmitted) {
      this.showDesignChoices();
    }
  };

  /**
   * Method that shows the code that is required to use the job widget.
   */
  JobModuleForm.prototype.showTheCode = function() {
    var code = this._getTheCode();
    document.getElementById('code-body').value = code;
  };

  /**
   * Method that shows the example, where the job widget is demonstrated.
   */
  JobModuleForm.prototype.showTheExample = function() {
    var code = this._getTheCode();

    // Parse the code.
    var div = code.substring(code.indexOf('<div'), code.indexOf('</div>') + 6);
    var scriptSrc = code.substring(code.indexOf('<script>') + 8, code.indexOf('</script>'));

    // Attach the target div.
    document.getElementById('example-body').innerHTML = div;

    // Execute the required javascript.
    var scriptTag = document.createElement('script');
    scriptTag.text = scriptSrc;
    document.body.appendChild(scriptTag);
  };

  /**
   * Method to build the script url from the form data.
   * @returns {String} The url of the job widget script.
   */
  JobModuleForm.prototype._getTheCode = function() {
    var code =  '<div class="helios-jobframe" data-source="uzbnl" data-recruiter=' + this.recruiter + ' data-language="nl-NL" '+ this.getDesignChoices() +'>' +
                '</div>' + "\n" +
    "\n" +
    '<script>' + "\n" +
    '  (function(d, s, id) {' + "\n" +
    '    var js, fjs = d.getElementsByTagName(s)[0];' + "\n" +
    '    if (d.getElementById(id)) return;' + "\n" +
    '    js = d.createElement(s); js.id = id;' + "\n" +
    '    js.src = "//helios.uitzendbureau.nl/public/build/js/ext.min.js";' + "\n" +
    '    fjs.parentNode.insertBefore(js, fjs);' + "\n" +
    '  }(document, \'script\', \'helios-joboverview\'));' + "\n" +
    '</script>';
    return code;
  };

  /**
   * Function for creating a string with all the design choices.
   * @returns {String} with the design choices.
   */
  JobModuleForm.prototype.getDesignChoices = function() {
    var design = '';
    var tempDesign;
    for(var elementId in this.design) {
      tempDesign = this.design[elementId];
      if(elementId === 'hideplacetime' || elementId === 'hidedescription') {
        tempDesign = !JSON.parse(this.design[elementId]);
      }
      if(elementId.indexOf('color') > -1 && this.design[elementId].indexOf('#') === -1) {
        tempDesign = '#' + this.design[elementId];
      }
      design += 'data-' + elementId + '="' + tempDesign + '" ';
    }
    return design;
  };

  /**
   * Function for showing/hiding the advanced options.
   */
  JobModuleForm.prototype.advancedOptions = function() {
    var container = document.getElementById('advancedOptions');
    var link = document.getElementById('advancedOptionsLink');
    if(container.className.indexOf('hidden') === -1) {
      container.className += container.className ? ' hidden' : 'hidden';
      link.innerHTML = '+ Geavanceerde instellingen';
    } else {
      link.innerHTML = '- Geavanceerde instellingen';
      container.className = container.className.replace('hidden', '');
    }
  };

  /**
   * Function for filling the fields with their default value. Function gets called when "Terug naar standaardinstellingen" is clicked.
   * @param {Object} e is a MouseEvent.
   */
  JobModuleForm.prototype.setToDefault = function(e) {
    // prevent default href because submit will refresh the page.
    e.preventDefault();
    if(!this.isDesignChoiceDefault()) {
      for(var elementId in this.defaultValues) {
        // Set the checkboxes to their default.
        if(this.checkBoxes.indexOf(elementId) > -1) {
          document.getElementById(elementId).checked = JSON.parse(this.defaultValues[elementId]);
          continue;
        }
        // Pagebuttontextcolor and buttontextcolor set to white.
        if(this.radioButtons.indexOf(elementId) > -1) {
          document.getElementById(elementId + 'white').checked = true;
          continue;
        }
        document.getElementById(elementId).value = this.defaultValues[elementId];
      }
      var designform = document.getElementsByName('designform')[0];
      designform.action = '#designform';
      designform.submit();
    }
    this.disableEnableFields(false);
  };

  /**
   * Function for checking if the design is already default.
   * @returns {Boolean} upToDate Is true when design is default.
   */
  JobModuleForm.prototype.isDesignChoiceDefault = function() {
    var upToDate = true;
    for(var elementId in this.defaultValues) {
      if(this.checkBoxes.indexOf(elementId) > -1) {
        if(JSON.parse(this.defaultValues[elementId]) !== document.getElementById(elementId).checked) {
          upToDate = false;
        }
      } else if(this.radioButtons.indexOf(elementId) > -1) {
        var color = document.getElementById(elementId + 'white').checked ? 'FFFFFF' : '000000';
        if(this.defaultValues[elementId] !== color) {
          upToDate = false;
        }
      } else {
        if(this.defaultValues[elementId] !== document.getElementById(elementId).value) {
          upToDate = false;
        }
      }
    }
    return upToDate;
  };

  /**
   * Function for showing the design form.
   * @param {object} e is a MouseEvent.
   */
  JobModuleForm.prototype.showDesignChoices = function(e) {
    // e is filled when "opmaak kiezen" is clicked.
    if(e) {
      e.target.blur();
    }
    var designform = document.getElementsByName('designform')[0];
    designform.className = designform.className.replace('hidden', '');
    if(!this.isDesignChoiceDefault() || e) {
      form.disableEnableFields(true);
    }
  };

  /**
   * Function for changing the page location to step 3.
   */
  JobModuleForm.prototype.goToStepThree = function() {
    var designform = document.getElementsByName('designform')[0];
    designform.action = 'vacaturemodule-stap-drie.html';
  };

  /**
   * Function for disabling/enabling the checkboxes and defaultDesignButton.
   * @param {Boolean} disable if true the fields will be disabled. if false the fields will be enabled.
   */
  JobModuleForm.prototype.disableEnableFields = function(disable) {
    var defaultDesignButton = document.getElementById('default-design-button');
    defaultDesignButton.disabled = disable;
    for(var i =0; i < this.checkBoxes.length; i++) {
      document.getElementById('informationform-' + this.checkBoxes[i]).disabled = disable;
    }
  };

  /**
   * Function for updating the url after an checkbox has been pressed.
   * @param {Boolean} disable if true the fields will be disabled. if false the fields will be enabled.
   */
  JobModuleForm.prototype.submitCheckBoxes = function() {
    var defaultDesignButton = document.getElementById('default-design-button');
    if(!defaultDesignButton.disabled) {
      var search = {};
      search.r = this.recruiter;
      for(var i =0; i < this.checkBoxes.length; i++) {
        if(this.checkBoxes[i].indexOf('hide') === 0) {
          search[this.checkBoxes[i].substring(4)] = document.getElementById('informationform-' + this.checkBoxes[i]).checked;
        } else {
          search[this.checkBoxes[i]] = document.getElementById('informationform-' + this.checkBoxes[i]).checked;
        }
      }
      document.location = 'vacaturemodule-stap-twee.html?' + URI.buildQuery(search);
    }
  };

  var form = new JobModuleForm();
  form.prepare();
})(URI, Recruiter);
