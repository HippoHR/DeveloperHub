(function(URI, SearchForm) {
  'use strict';

  // Check if the form has been submitted
  if(URI.hasQuery()) {
    // Handle the submitted form
    var searchForm = new SearchForm(URI);
    searchForm.loadFromUrl();
    searchForm.fillTheForm();
    if(searchForm.orientation && searchForm.validateInput()) {
      searchForm.showTheCode();
      searchForm.showTheExample();
    }
    if(!searchForm.validateInput()) {
      searchForm.removeClass('hidden', 'url-validation-error');
    }
  }
})(URI, SearchForm);
