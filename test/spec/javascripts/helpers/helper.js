/**
 * Function for creating elements.
 * @param {String} type is the type of an element.
 * @param {Object} attributes filled with attributes for element (examples: className, id).
 * @returns {DOMElement}
 */
function createDOMElement(type, attributes) {
  var el = document.createElement(type);
  for(var attribute in attributes) {
    if(attributes.hasOwnProperty(attribute)) {
      el[attribute] = attributes[attribute];
    }
  }
  return el;
}
