(function(UitzendbureauNLAPI, URI) {
    'use strict';

    /**
     * Class to handle the validation form
     * @param {object} form The form element
     * @constructor
     */
    var JobsXMLValidator = function(form) {
        this._form = form;

        this._loadFromUrl();

        this._apiClient = new UitzendbureauNLAPI();
    };

    /**
     * Fill the form with GET-parameters.
     */
    JobsXMLValidator.prototype._loadFromUrl = function() {
        var params = URI.parseQuery(location.search);
        this._form.url.value = params.url || 'http://';
        this._form.auth.value = params.auth || '';
    };

    /**
     * Validates the jobs xml through the api and displays the success or error messages
     */
    JobsXMLValidator.prototype.validate = function() {
        // Hide the error message, if it is currently displayed
        this._showValidationErrorsContainer(false);

        var that = this;
        this._apiClient.validateJobsXML(this._form.url.value, this._form.auth.value, function(data, status) {
            // Make sure that the status code was 200
            if(status === 200) {
                if(data.success) {
                    // Show success message
                    that._showSuccess();
                } else {
                    // Show error message
                    that._showErrors(data.errorType, data.errors);
                }
            } else {
                // Show message for unknown error
                that._showErrors('UNKNOWN_ERROR');
            }
        });
    };

    /**
     * Displays a message that tells the user that the validation succeeded.
     */
    JobsXMLValidator.prototype._showSuccess = function() {
        // Set the correct link to the signup form, so url and auth are prefilled.
        var url = '/jobs-xml/doc/sign-up.html?' + URI.buildQuery({
            url: this._form.url.value,
            auth: this._form.auth.value
        });
        document.getElementById('validation-success-signup-link').href = url;

        // Show the success message.
        document.getElementById('validation-success').className = '';
    };

    /**
     * Displays the error list returned by the API.
     * @param {string} errorType The type of the error, as returned by the API.
     * @param {array} errors Optional error list to display.
     */
    JobsXMLValidator.prototype._showErrors = function(errorType, errors) {
        errors = errors || [];

        // Set the correct heading and description.
        this._setErrorHeadingAndDescription(errorType);

        var validationErrors = document.getElementById('validation-errors');

        // Remove all current children from the DOM.
        this._removeChildren(validationErrors);

        // Build the error list.
        for(var i = 0; i < errors.length; i++) {
            var error = errors[i];

            // And add the error element to the list.
            validationErrors.appendChild(this._createErrorElement(error.line, error.column, error.source, error.message));
        }

        // Actually display the errors.
        this._showValidationErrorsContainer();
    };

    /**
     * Sets the heading and description of the error list, depending on the given errorType.
     * @param {string} errorType The type of the error, as returned by the API.
     */
     JobsXMLValidator.prototype._setErrorHeadingAndDescription = function(errorType) {
        var header = document.getElementById('validation-errors-header');
        var description = document.getElementById('validation-errors-description');

        // <IE9 compatibility
        var textContent = header.textContent ? 'textContent' : 'innerText';

        switch(errorType) {
            case 'XML_DOC_LOAD_FAILED':
                header[textContent] = 'XML-document kon niet worden geladen';
                description[textContent] = 'Er zit waarschijnlijk een fout in je XML-document.';
                break;
            case 'XML_URL_LOAD_FAILED':
                header[textContent] = 'XML-document kon niet worden geladen';
                description[textContent] = 'Je hebt een ongeldige URL ingevoerd, de authenticatie is incorrect, of er zit een fout in je XML-document.';
                break;
            case 'XML_VERSION_DETECT_FAILED':
                header[textContent] = 'Versie kon niet worden bepaald';
                description[textContent] = 'Controleer of je een versienummer ingevoerd hebt.';
                break;
            case 'XML_INVALID_VERSION':
                header[textContent] = 'Ongeldige versie';
                description[textContent] = 'Het gebruikte versienummer is (nog) niet in gebruik.';
                break;
            case 'XML_VALIDATION_FAILED':
                header[textContent] = 'Er zijn nog enkele validatiefouten gevonden...';
                description[textContent] = 'Repareer onderstaande fouten en probeer het opnieuw.';
                break;
            default:
                header[textContent] = 'Onbekende fout';
                description[textContent] = 'Er is een onbekende fout opgetreden. Probeer het nog een keer.';
                break;
        }
    };

    /**
     * Removes all children from a DOM element.
     * @param {object} parent The element to remove the children of
     */
    JobsXMLValidator.prototype._removeChildren = function(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    /**
     * Either show or hide the validation errors container.
     * @param {boolean} show True to show, false to hide. Defaults to true.
     */
    JobsXMLValidator.prototype._showValidationErrorsContainer = function(show) {
        show = show !== false;

        var validationErrorsContainer = document.getElementById('validation-errors-container');
        if(!show && validationErrorsContainer.className.indexOf('hidden') < 0) {
            // Hide the element.
            validationErrorsContainer.className = 'hidden';
        } else if(show) {
            // Show the element.
            validationErrorsContainer.className = '';
        }
    };

    /**
     * Creates an element that contains a single error.
     * @param {int} line The line in the XML-feed that the error was found on
     * @param {int} column The column (character index) on the line in the XML-feed that the error was found on
     * @param {string} message The actual error message
     * @return {object} The created element
     */
    JobsXMLValidator.prototype._createErrorElement = function(line, column, source, message) {
        // Create main elements
        var errorElement = document.createElement('div'),
            headerElement = document.createElement('h3'),
            contentElement = document.createElement('code');

        // <IE9 compatibility
        var textContent = headerElement.textContent ? 'textContent' : 'innerText';

        // Add header
        headerElement[textContent] = 'Regel ' + line + ', karakter ' + column;
        errorElement.className = 'validation-error';
        errorElement.appendChild(headerElement);

        // Add error message
        contentElement[textContent] = message;
        errorElement.appendChild(contentElement);

        // Can we display the source?
        if(source) {
            var sourceElement = document.createElement('pre');
            sourceElement[textContent] = source;
            errorElement.appendChild(sourceElement);
        }

        return errorElement;
    };

    // Make sure to validate the form when the form has been submitted.
    var form = document.getElementById('validation-form');
    var validator = new JobsXMLValidator(form);
    form.onsubmit = function() {
        // Validate.
        validator.validate();

        // Stop default behaviour
        return false;
    };

})(UitzendbureauNLAPI, URI);
