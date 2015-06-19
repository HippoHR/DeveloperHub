(function(URI, SearchForm) {
  'use strict';

  var searchForm = new SearchForm(URI);
  searchForm.prepareForm();

  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    if(searchForm.validateInput()) {
      searchForm.setMinHeightExample();
      searchForm.showTheCode();
      searchForm.showTheExample();
    } else {
      searchForm.removeClass('hidden', 'url-validation-error');
    }
  }
})(URI, SearchForm);
