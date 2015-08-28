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

/**
 * To check the removeClass functionality we will check if removeClass will remove
 * only the hidden class when placed at several spots. Also we will check if classes with a similar
 * name will still be there.
 * Placed this in helpers because more then one widget uses the same test.
 * @param {String} nameOfWidget The name of the widget to test, used for the describe
 * @param {Object} widgetToTest The widget to run the tests on.
 */
function testRemoveClassName(nameOfWidget, widgetToTest) {
  var containerTestDiv = createDOMElement('div', {id: 'testDiv'});

  describe('RemoveClass hidden' + nameOfWidget, function() {
    beforeEach(function() {
      containerTestDiv = createDOMElement('div', {id: 'testDiv'});
    });

    it('should remove only the hidden class when its the first class', function() {
      var div = createDivWithClassNamesAndRemoveHidden('hidden testclass', containerTestDiv, widgetToTest);

      // Check if the correct class is removed
      expect(div.className).not.toContain('hidden');
      expect(div.className).toContain('testclass');
    });

    it('should remove only the hidden class when its the middle class', function() {
      var div = createDivWithClassNamesAndRemoveHidden('testclass hidden another-class', containerTestDiv, widgetToTest);

      // Check if the correct class is removed
      expect(div.className).not.toContain('hidden');
      expect(div.className).toContain('testclass');
      expect(div.className).toContain('another-class');
    });

    it('should remove only the hidden class when its the last class', function() {
      var div = createDivWithClassNamesAndRemoveHidden('testclass hidden', containerTestDiv, widgetToTest);

      // Check if the correct class is removed
      expect(div.className).not.toContain('hidden');
      expect(div.className).toContain('testclass');
    });

    it('should not remove classes that have a similar name', function() {
      var div = createDivWithClassNamesAndRemoveHidden('hidden hiddenn ahidden hidden-class hidden_class', containerTestDiv, widgetToTest);

      // Check if the correct class is removed
      expect(div.className).toContain('hiddenn ahidden hidden-class hidden_class');
      expect($(div).hasClass('hidden')).toEqual(false);
    });
  });
}

/**
 * This function will create a div with the given classnames.
 * Then it will add this div to the test container.
 * @param {String} classNames The classnames the div should have
 * @param {Object} containerTestDiv The test container
 * @param {Object} widgetToTest The widget to run the tests on
 * @returns {Object} The created div
 */
function createDivWithClassNamesAndRemoveHidden(classNames, containerTestDiv, widgetToTest) {
  var div = createDOMElement('div', {id: 'testId', className: classNames});
  containerTestDiv.appendChild(div);
  widgetToTest.removeClass('hidden', div);

  return div;
}

/**
 * Helper function to create an URI mock object
 * @param {Object} uriParameters the parameters for the URI. If no parameter given URI without params is used
 * @returns {Object} uriMock The URI mock object
 */
function createUri(uriParameters) {
  var uriMock = {};
  uriMock.parseQuery = function() {
    return uriParameters || {};
  };
  return uriMock;
}
