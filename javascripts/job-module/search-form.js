/**
 * Class to handle the search form
 * @param {Object} URI is an object of the class URI
 * @constructor
 */
function SearchForm(URI) {
  this.orientation = '';
  this.url = '';
  this.URI = URI;
};

/**
 * Method to load the instance from the url parameters
 */
SearchForm.prototype.loadFromUrl = function() {
  var params = this.URI.parseQuery(location.search);
  this.orientation = params.orientation || '';
  this.url = params.url || '';
};

/**
 * Method to fill the form with the data in this instance
 */
SearchForm.prototype.fillTheForm = function() {
  if(this.orientation) {
    document.querySelector('input[value=' + this.orientation + ']').checked = true;
  }
  if(this.url) {
    document.getElementById('heliosUrl').value = this.url;
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
 * Method for setting the script variables in the code.
 * @returns {String} The variables for the search form
 */
SearchForm.prototype.setScriptVariables = function() {
  return 'var heliosParentUrl=\'' + this.url + '\'; var heliosFormOrientation=\'' + this.orientation + '\';';
};

/**
 * Method to return the script url
 * @returns {String} The url of the search form script
 */
SearchForm.prototype.getScriptUrl = function() {
  return 'http://helios.uitzendbureau.nl/public/search-form/search-form.js';
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
  if('className' in element) {
    element.className = element.className.replace(className, '');
  }
};
