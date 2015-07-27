/**
 * Class to handle the search widget form
 * @param {object} URI The URI object.
 * @constructor
 */
function SearchWidgetForm(URI) {
  this.URI = URI;
  this.orientation = '';
};

/**
 * Method to load the instance from the url parameters
 */
SearchWidgetForm.prototype.loadFromUrl = function() {
  var params = this.URI.parseQuery(location.search);
  this.orientation = params.orientation || '';
};

/**
 * Method to fill the form with the data in this instance
 */
SearchWidgetForm.prototype.fillTheForm = function() {
  document.querySelector('input[value=' + this.orientation + ']').checked = true;
};

/**
 * Method that shows the code that is required to use the search widget
 */
SearchWidgetForm.prototype.showTheCode = function() {
  // Show the code
  var script = '<script src="' + this._getScriptUrl() + '"></script>';
  document.getElementById('code-body').value = script;

  // Show the code
  var container = document.getElementById('code');
  this.removeClass('hidden', container);
};

/**
 * Helper function to easily remove a class name from an object
 * @param {String} className The class name that should be removed
 * @param {DOMElement} element The DOM element that should have the class removed
 */
SearchWidgetForm.prototype.removeClass = function(className, element) {
  if('className' in element) {
    element.className = element.className.replace(className, '');
  }
};

/**
 * Method that shows the example, where the search widget is demonstrated
 */
SearchWidgetForm.prototype.showTheExample = function() {
  var self = this;
  var script = document.createElement('script');
  script.src = this._getScriptUrl();

  // Since this data is loaded async, we use an OutputBuffer to prevent usage of the native document.write function
  var ob = new OutputBuffer();
  ob.start();
  script.onload = function() {
    // When the script is finally loaded, we stop the output buffering and insert the buffers content as html in the example
    ob.stop();
    document.getElementById('example-body').innerHTML = ob.getContents();

    // Show the example
    var container = document.getElementById('example');
    self.removeClass('hidden', container);
  };

  // Append the script, which starts the async loading
  document.getElementById('example-body').appendChild(script);
};

/**
 * Method to build the script url from the form data
 * @returns {String} The url of the search widget script
 */
SearchWidgetForm.prototype._getScriptUrl = function() {
  return 'http://www.uitzendbureau.nl/tools/zoekwidget?' + URI.buildQueryParameter('orientation', this.orientation);
};
