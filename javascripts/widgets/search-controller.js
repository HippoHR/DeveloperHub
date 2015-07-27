(function(URI, SearchWidgetForm) {
  'use strict';
  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    var form = new SearchWidgetForm(URI);
    form.loadFromUrl();
    form.fillTheForm();
    form.showTheCode();
    form.showTheExample();
  }
})(URI, SearchWidgetForm);
