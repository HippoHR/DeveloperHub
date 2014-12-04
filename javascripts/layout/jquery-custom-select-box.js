'use strict';

// Attach an event listener to the document to catch every 'change' event on a
// radius selector. Attaching this to the document makes it easy to add new radius
// selectors to the page without having to attach the event handlers again
jQuery(document).on('click', '.radius-selector ul a', function(e) {
  e.preventDefault();

  var value, displayValue;

  var $this = jQuery(this);
  var $parent = $this.parents('.radius-selector:first');

  // If the element has a data-attribute called 'value', we use that value as radius-value
  if(typeof $this.data('value') !== 'undefined') {
    value = $this.data('value');
    displayValue = $this.text();

    $parent.find('.distance').html(displayValue);
    $parent.find('.radius-value').val(value).trigger('change');
  }
});
