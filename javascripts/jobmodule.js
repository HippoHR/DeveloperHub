(function(URI, Recruiter) {
  'use strict';

  /**
   * Class to handle the job widget form
   * @constructor
   */
  function JobModuleForm() {
    this.recruiter = '';
  };

  /**
   * Prepare the form
   */
  JobModuleForm.prototype.prepare = function() {
    this.prepareRecruiters();
  };

  /**
   * Prepare the recruiter part of the form. Loads a list of recruiters to show them
   */
  JobModuleForm.prototype.prepareRecruiters = function() {
    var self = this;
    Recruiter.getAll(function(recruiters) {
      self.showRecruiterList(recruiters);
    });
  };

  /**
   * Show the list of recruiters that users can choose for the form
   * @param {Array} recruiters List of objects describing recruiters in the form of {name:'',id:1}
   */
  JobModuleForm.prototype.showRecruiterList = function(recruiters) {
    // Create the select box to show the recruiters in
    var select = document.createElement('select');
    select.name = 'r';
    select.id = 'r';
    select.className = 'form-control';
    // Now create options for all recruiters
    for(var i = 0; i < recruiters.length; i++) {
      var option = document.createElement('option');
      option.value = recruiters[i].id;
      option.appendChild(document.createTextNode(recruiters[i].name));

      // Make sure the selected recruiter will be shown as selected in the form
      if(this.recruiter && recruiters[i].id === this.recruiter) {
        option.selected = true;
      }

      // Add the option to the select box
      select.appendChild(option);
    }

    // Find the destination for our new select box. Replace the destination with this select box
    var destination = document.getElementById('recruiter-list-loader');
    destination.parentNode.replaceChild(select, destination);
  };

  /**
   * Method to load the instance from the url parameters
   */
  JobModuleForm.prototype.loadFromUrl = function() {
    var params = URI.parseQuery(location.search);
    this.recruiter = params.r || '';
  };

  /**
   * Method to fill the form with the data in this instance
   */
  JobModuleForm.prototype.fillTheForm = function() {
    var r = document.getElementById('r');
    if(r) {
      r.value = this.recruiter;
    }
  };

  /**
   * Method that shows the code that is required to use the job widget
   */
  JobModuleForm.prototype.showTheCode = function() {
    // Show the code
    var code = this._getTheCode();
    document.getElementById('code-body').value = code;

    // Show the code
    var container = document.getElementById('code');
    removeClass('hidden', container);
  };

  /**
   * Method that shows the example, where the job widget is demonstrated
   */
  JobModuleForm.prototype.showTheExample = function() {
    var code = this._getTheCode();

    // Parse the code
    var div = code.substring(code.indexOf('<div'), code.indexOf('</div>')+6);
    var scriptSrc = code.substring(code.indexOf('<script>')+8, code.indexOf('</script>'));

    // Attach the target div
    document.getElementById('example-body').innerHTML = div;

    // Execute the required javascript
    var scriptTag = document.createElement('script');
    scriptTag.text = scriptSrc;
    document.body.appendChild(scriptTag);

    // Show the container
    var container = document.getElementById('example');
    removeClass('hidden', container);
  };

  /**
   * Method to build the script url from the form data
   * @returns {String} The url of the job widget script
   */
  JobModuleForm.prototype._getTheCode = function() {
    var recruiterId = this.recruiter;
    var code = '<div class="helios-jobframe" data-source="uzbnl" data-recruiter="' + recruiterId + '" data-language="nl-NL"></div>' + "\n" +
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
   * Helper function to easily remove a class name from an object
   * @param {String} className The class name that should be removed
   * @param {DOMElement} element The DOM element that should have the class removed
   */
  function removeClass(className, element) {
    if('className' in element) {
      element.className = element.className.replace(className, '');
    }
  }

  var form = new JobModuleForm();
  form.prepare();

  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    form.loadFromUrl();
    form.fillTheForm();
    form.showTheCode();
    form.showTheExample();
  }
})(URI, Recruiter);
