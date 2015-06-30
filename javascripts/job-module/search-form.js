/**
 * Class to handle the search form
 * @param {Object} URI is an object of the class URI
 * @constructor
 */
var SearchForm = function(URI) {
  this.orientation = '';
  this.URI = URI;
  this.url = '';
  this.radioButtons = [
    'buttontextcolor',
    'orientation',
    'placeholder'
  ];
  this.defaultValues = {
    buttoncolor: '5CB85C',
    buttontextcolor: 'FFFFFF',
    fontsize: '14',
    fonttype: 'Helvetica',
    placeholder: 'false',
    orientation: 'horizontal'
  };
  this.design = {};
};

/**
 * Method to load the instance from the url parameters.
 */
SearchForm.prototype.loadFromUrl = function() {
  var params = this.URI.parseQuery(location.search);
  this.url = params.url || '';
  for(var value in this.defaultValues) {
    this.design[value] = params[value] || this.defaultValues[value];
  }
};

/**
 * Method for preparing the form.
 */
SearchForm.prototype.prepareForm = function() {
  this.loadFromUrl();
  var self = this;
  // Attach event when the link "Terug naar standaardinstellingen" gets clicked.
  this.attachEventToElement('default', function(e) {
    self.setToDefault(e);
  }, 'click');
  this.fillTheForm();
};

/**
 * Method to fill the form with the data in this instance
 */
SearchForm.prototype.fillTheForm = function() {
  if(this.url) {
    document.getElementById('heliosUrl').value = this.url;
  }
  for(var element in this.design) {
    if(this.radioButtons.indexOf(element) > -1) {
      var isFirstRadioDesignValue = document.getElementById(element + 'OptionOne').value === this.design[element];
      document.getElementById(element + (isFirstRadioDesignValue ? 'OptionOne' : 'OptionTwo')).checked = true;
      continue;
    }
    document.getElementById(element).value = this.design[element];
  }
};

/**
 * Function for adding an event to an element.
 * @param {String} id Id of the element.
 * @param {String} method Method that should be called when the event occurs.
 * @param {String} event A string representing the event type to listen for.
 */
SearchForm.prototype.attachEventToElement = function(id, method, event) {
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
 * Method that shows the code that is required to use the search form
 */
SearchForm.prototype.showTheCode = function() {
  document.getElementById('code-body').value = '<script>' + this.setScriptVariables() + '</script>\n<script src="' + this.getScriptUrl() + '"></script>';
  this.removeClass('hidden', 'code');
};

/**
 * Method that shows the example, where the search form is demonstrated
 */
SearchForm.prototype.showTheExample = function() {
  var self = this;
  var scriptVariables = document.createElement('script');
  scriptVariables.innerHTML = this.setScriptVariables();

  var script = document.createElement('script');
  script.src = this.getScriptUrl();

  var exampleBody = document.getElementById('example-body');
  var ob = new OutputBuffer();
  ob.start();
  script.onload = function() {
    ob.stop();
    exampleBody.innerHTML = ob.getContents();
    self.removeClass('hidden', 'example');
  };

  exampleBody.appendChild(scriptVariables);
  exampleBody.appendChild(script);
};

/**
 * Method that sets minimum height for the example and code. This prevents the page from jumping when submit button is pressed.
 */
SearchForm.prototype.setMinHeightExample = function() {
  document.getElementById('example-code').style.minHeight = '400px';
};

/**
 * Method for setting the script variables in the code.
 * @returns {String} The variables for the search form
 */
SearchForm.prototype.setScriptVariables = function() {
  var variables = 'var hSearchFormDesign = {';
  for(var element in this.design) {
    if(element === 'orientation') {
      continue;
    }
    if(element.indexOf('color') > -1) {
      variables += element + ': \'#' + this.design[element] + '\', ';
      continue;
    }
    if(element === 'placeholder' || element === 'fontsize') {
      variables += element + ': ' + this.design[element] + ', ';
      continue;
    }
    variables += element + ': \'' + this.design[element] + '\', ';
  }
  variables += ' buttonbordercolor: \'' + this.lightenDarkenColor('#' + this.design.buttoncolor, -10) + '\',';
  variables += ' buttonhovercolor: \'' + this.lightenDarkenColor('#' + this.design.buttoncolor, -20) + '\'};';
  return variables + '\n' + 'var heliosParentUrl = \''+ this.url +'\'; var heliosFormOrientation = \''+ this.design.orientation +'\';' ;
};

/**
 * Method to return the script url
 * @returns {String} The url of the search form script
 */
SearchForm.prototype.getScriptUrl = function() {
  return 'http://helios.uitzendbureau.nl/public/search-form/search-form.js';
};

/**
 * Method to check if the design is default.
 * @returns {boolean} upToDate Is true when design is default.
 */
SearchForm.prototype.isDesignChoiceDefault = function() {
  var upToDate = true;
  for(var elementId in this.defaultValues) {
    if(this.radioButtons.indexOf(elementId) > -1) {
      var isFirstRadioDefault = document.getElementById(elementId + 'OptionOne').value === this.defaultValues[elementId];
      var isFirstRadioChecked = document.getElementById(elementId + 'OptionOne').checked;
      if((isFirstRadioDefault && !isFirstRadioChecked) || (!isFirstRadioDefault && isFirstRadioChecked)) {
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
 * Function for filling the fields with their default value.
 */
SearchForm.prototype.setToDefault = function(e) {
  if(e) {
    e.preventDefault();
  }
  if(!this.isDesignChoiceDefault()) {
    for(var elementId in this.defaultValues) {
      if(this.radioButtons.indexOf(elementId) > -1) {
        var isFirstRadioDefault = document.getElementById(elementId + 'OptionOne').value === this.defaultValues[elementId];
        document.getElementById(elementId + (isFirstRadioDefault ? 'OptionOne' : 'OptionTwo')).checked = true;
        continue;
      }
      if(document.getElementById(elementId).color) {
        document.getElementById(elementId).color.fromString(this.defaultValues[elementId]);
        continue;
      }
      document.getElementById(elementId).value = this.defaultValues[elementId];
    }
    document.searchwidgetform.action = '#orientation';
    document.searchwidgetform.submit();
  }
};

/**
 * Method to check if the url is valid
 * @returns {Boolean} Returns true if url is valid
 */
SearchForm.prototype.validateInput = function() {
  var regexp = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?([-a-zA-Z0-9@%_&/]*)?(#|(#!))?([-a-zA-Z0-9_/.]*)?$/;
  return regexp.test(this.url);
};

/**
 * Helper function to easily remove a class name from an object
 * @param {String} className The class name that should be removed
 * @param {String} id The id of the DOM element that should have the class removed
 */
SearchForm.prototype.removeClass = function(className, id) {
  var element = document.getElementById(id);
  if(element && ('className' in element)) {
    element.className = element.className.replace(className, '');
  }
};

/**
 * Function for making a color lighter of darker.
 * @param {String} hextext is a color
 * @param {Integer} delta indicates how much lighter/darker you want the color
 * @returns {String} new color.
 */
SearchForm.prototype.lightenDarkenColor = function(hextext, delta) {
  if(!hextext) {
    return null;
  }
  if(!delta || delta === 0) {
    return hextext;
  }
  var temp;
  var txt = '';
  var colors = {};
  colors.r = parseInt(hextext.substr(1, 2), 16);
  colors.g = parseInt(hextext.substr(3, 2), 16);
  colors.b = parseInt(hextext.substr(5, 2), 16);
  colors.r += delta;
  colors.g += delta;
  colors.b += delta;

  for(var color in colors) {
    if(colors.hasOwnProperty(color)) {
      if(colors[color] > 255) {
        colors[color] = 255;
      }
      if(colors[color] < 0) {
        colors[color] = 0;
      }
      temp = colors[color].toString(16);
      if(temp.length < 2) {
        temp = '0' + temp;
      }
      txt = txt + temp;
    }
  }
  return '#' + txt;
};
