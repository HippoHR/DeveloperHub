/**
 * Class that can be used to prevent any document.write output
 * @type OutputBuffer
 */
var OutputBuffer = (function(){
  var oldFn, buffer = '';

  /**
   * The OutputBuffer class
   * @constructor
   * @returns {OutputBuffer}
   */
  function OutputBuffer() {}

  /**
   * Method to start the buffering of the document.write output
   */
  OutputBuffer.prototype.start = function() {
    // Make sure the buffer is empty
    buffer = '';
    oldFn = document.write;
    document.write = writeToBuffer;
  };

  /**
   * Private function that replaces document.write to fetch the output
   * @param {string} content The output that is being buffered
   */
  function writeToBuffer(content) {
    buffer += content;
  }

  /**
   * Method to stop the buffering, and to return document.write to its original state
   */
  OutputBuffer.prototype.stop = function() {
    document.write = oldFn;
  };

  /**
   * Get the content of the buffer
   * @returns {String} The buffer
   */
  OutputBuffer.prototype.getContents = function() {
    return buffer;
  };

  return OutputBuffer;
})();
