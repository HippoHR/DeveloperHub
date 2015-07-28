'use strict';
/**
 * Class to handle the job widget form
 * @param {Object} URI The URI you want to create the object with.
 * @constructor
 */
function JobWidgetForm(URI) {
  this.URI = URI;
  this.search = '';
  this.place = '';
  this.radius = '';
  this.recruiter = '';
  this.nrOfJobs = '';
  this.width = '';
};

/**
 * Prepare the form
 */
JobWidgetForm.prototype.prepare = function() {
  this.prepareRecruiters();
};

/**
 * Prepare the recruiter part of the form. Loads a list of recruiters to show them
 */
JobWidgetForm.prototype.prepareRecruiters = function() {
  var self = this;
  Recruiter.getAll(function(recruiters) {
    self.showRecruiterList(recruiters);
  });
};

/**
 * Show the list of recruiters that users can choose for the form
 * @param {Array} recruiters List of objects describing recruiters in the form of {name:'',nameUrl:''}
 */
JobWidgetForm.prototype.showRecruiterList = function(recruiters) {
 // Create the select box to show the recruiters in
 var select = document.createElement('select');
 select.name = 'r';
 select.id = 'r';
 select.className = 'form-control';

 // Add empty recruiter to give the user the abillity to view jobs from all recruiters.
 this.addRecruiter('', 'Alle uitzendbureaus', select);

 // Now create options for each recruiter
 for(var i = 0; i < recruiters.length; i++) {
   this.addRecruiter(recruiters[i].nameUrl, recruiters[i].name, select);
 }

 // Find the destination for our new select box. Replace the destination with this select box
 var destination = document.getElementById('recruiter-list-loader');
 destination.parentNode.replaceChild(select, destination);

 // Fill the recruiter select box with the correct value
 document.getElementById('r').value = this.recruiter;
};

/**
 * Method that adds a recruiter to the given select box.
 * @param recruiterNameUrl The name of the recruiter as shown in URL
 * @param recruiterName The name of the recruiter as shown for end user
 * @param select The select box you want to add the recruiter to
 */
JobWidgetForm.prototype.addRecruiter = function(recruiterNameUrl, recruiterName, select) {
 var option = document.createElement('option');
 option.value = recruiterNameUrl;
 option.appendChild(document.createTextNode(recruiterName));

 // Make sure the selected recruiter will be shown as selected in the form
 if(this.recruiter && recruiterNameUrl === this.recruiter) {
   option.selected = true;
 }

 // Add the option to the select box
 select.appendChild(option);
};

/**
 * Method to load the instance from the url parameters
 */
JobWidgetForm.prototype.loadFromUrl = function() {
  var params = this.URI.parseQuery(location.search);
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
  document.getElementById('l').value = this.nrOfJobs;
  document.getElementById('w').value = this.width;
  // Filling the recruiter is also done after loading the recruiterlist for first load.
  // If the element exists update it (This is needed to update form when changes in url occur after first load).
  var recruiterList = document.getElementById('r');
  if(recruiterList) {
    recruiterList.value = this.recruiter;
  }

  // Update radius selector
  var radiusValue = this.radius ? this.radius + 'km' : 'Alles';
  jQuery('.radius-selector .btn .distance').text(radiusValue);

  // Update the radius value. Needed to correctly generate widget from URL
  $('#rad').val(this.radius);
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
  this.removeClass('hidden', container);
};

/**
 * Method that shows the example, where the job widget is demonstrated
 */
JobWidgetForm.prototype.showTheExample = function() {
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
 * Helper function to easily remove a class name from an object
 * @param {String} className The class name that should be removed
 * @param {DOMElement} element The DOM element that should have the class removed
 */
JobWidgetForm.prototype.removeClass = function(className, element) {
  if('className' in element) {
    element.className = element.className.replace(className, '');
  }
};

/**
 * Method to build the script url from the form data
 * @returns {String} The url of the job widget script
 */
JobWidgetForm.prototype._getScriptUrl = function() {
  // Create an object containing all key value pairs for the URL.
  var params = {
    s: this.search,
    p: this.place,
    rad: this.radius,
    r: this.recruiter,
    l: this.nrOfJobs,
    w: this.width
  };

  return 'http://www.uitzendbureau.nl/tools/vacaturewidget?' + this.URI.buildQuery(params);
};
