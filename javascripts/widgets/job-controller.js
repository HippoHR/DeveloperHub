(function(URI, JobWidgetForm) {
  'use strict';

  var form = new JobWidgetForm(URI);
  form.prepare();

  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    form.loadFromUrl();
    form.fillTheForm();
    form.showTheCode();
    form.showTheExample();
  }
})(URI, JobWidgetForm);
