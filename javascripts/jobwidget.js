(function(URI, OutputBuffer) {
  'use strict';

  /**
   * Class to handle the job widget form
   * @constructor
   */
  function JobWidgetForm() {
    this.search = '';
    this.place = '';
    this.radius = '';
    this.recruiter = '';
    this.nrOfJobs = '';
    this.width = '';
  };

  /**
   * Method to load the instance from the url parameters
   */
  JobWidgetForm.prototype.loadFromUrl = function() {
    var params = URI.parseQuery(location.search);
    this.search = params.s || '';
    this.place = params.p || '';
    this.radius = params.rad || '';
    this.recruiter = params.r || '';
    this.nrOfJobs = params.l || '';
    this.width = params.w || '';
  };

  /**
   * Method to fill the form with the data in this instance
   */
  JobWidgetForm.prototype.fillTheForm = function() {
    document.getElementById('s').value = this.search;
    document.getElementById('p').value = this.place;
    document.getElementById('r').value = this.recruiter;
    document.getElementById('l').value = this.nrOfJobs;
    document.getElementById('w').value = this.width;

    // Update radius selector
    var radiusValue = this.radius ? this.radius + 'km' : 'Alles';
    jQuery('.radius-selector .btn .distance').text(radiusValue);
  };

  /**
   * Method that shows the code that is required to use the job widget
   */
  JobWidgetForm.prototype.showTheCode = function() {
    // Show the code
    var script = '<script src="' + this._getScriptUrl() + '"></script>';
    document.getElementById('code-body').value = script;

    // Show the code
    var container = document.getElementById('code');
    removeClass('hidden', container);
  };

  /**
   * Method that shows the example, where the job widget is demonstrated
   */
  JobWidgetForm.prototype.showTheExample = function() {
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
      removeClass('hidden', container);
    };

    // Append the script, which starts the async loading
    document.getElementById('example-body').appendChild(script);
  };

  /**
   * Method to build the script url from the form data
   * @returns {String} The url of the job widget script
   */
  JobWidgetForm.prototype._getScriptUrl = function() {
    return 'http://www.uitzendbureau.nl/tools/vacaturewidget?s=' + this.search + '&p=' + this.place + '&rad=' + this.radius +
      '&r=' + this.recruiter + '&l=' + this.nrOfJobs + '&w=' + this.width + '';
  };

  /**
   * Helper function to easily remove a class name from an object
   * @param {String} className The class name that should be removed
   * @param {DOMElement} element The DOM element that should have the class removed
   */
  function removeClass(className, element) {
    if('className' in element) {
      element.className = element.className.replace(className, '');
    }
  }

  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    var form = new JobWidgetForm();
    form.loadFromUrl();
    form.fillTheForm();
    form.showTheCode();
    form.showTheExample();
  }
})(URI, OutputBuffer);
