(function(UitzendbureauNLAPI, URI) {
    'use strict';

    /**
     * Class to handle the validation form
     * @param {object} form The form element
     * @constructor
     */
    var JobsXMLSignUp = function(form) {
        this._form = form;

        this._loadFromUrl();

        this._apiClient = new UitzendbureauNLAPI();
    };

    /**
     * Fill the form with GET-parameters.
     */
    JobsXMLSignUp.prototype._loadFromUrl = function() {
        var params = URI.parseQuery(location.search);
        this._form.recruiterName.value = params.recruiterName || '';
        this._form.email.value = params.email || '';
        this._form.phone.value = params.phone || '';
        this._form.url.value = params.url || 'http://';
        this._form.auth.value = params.auth || '';
    };

    /**
     * Signs up for the jobs xml through the api
     */
    JobsXMLSignUp.prototype.submit = function() {
        // Hide current error messages.
        this._showElement('sign-up-error', false);
        this._showElement('sign-up-validation-error', false);

        var that = this;

        var recruiterName = this._form.recruiterName.value;
        var email = this._form.email.value;
        var phone = this._form.phone.value;
        var url = this._form.url.value;
        var auth = this._form.auth.value;

        this._apiClient.signUpJobsXML(recruiterName, email, phone, url, auth, function(data, status) {
            // Make sure that the status code was 200
            if(status === 200 && data.success) {
                // Show success message
                that._showSuccess();
            } else if(status === 406) {
                // Validation failed
                that._showValidationError();
            } else {
                // Show default error message
                that._showError();
            }
        });
    };

    /**
     * Displays a message that tells the user that the sign up succeeded.
     */
    JobsXMLSignUp.prototype._showSuccess = function() {
        this._showElement('sign-up-form', false);
        this._showElement('sign-up-error', false);
        this._showElement('sign-up-validation-error', false);
        this._showElement('sign-up-success');
    };

    /**
     * Display the validation error message.
     */
    JobsXMLSignUp.prototype._showValidationError = function() {
        this._showElement('sign-up-error', false);
        this._showElement('sign-up-validation-error');
        this._showElement('sign-up-success', false);
    };

    /**
     * Display the general error message.
     */
    JobsXMLSignUp.prototype._showError = function() {
        this._showElement('sign-up-error');
        this._showElement('sign-up-validation-error', false);
        this._showElement('sign-up-success', false);
    };

    /**
     * Either show or hide an element.
     * @param {string} elementId The id of the element to show or hide. The element may not contain other classes than 'hidden'.
     * @param {boolean} show True to show, false to hide. Defaults to true.
     */
    JobsXMLSignUp.prototype._showElement = function(elementId, show) {
        show = show !== false;

        var el = document.getElementById(elementId);
        if(!show && el.className !== 'hidden') {
            // Hide the element.
            el.className = 'hidden';
        } else if(show) {
            // Show the element.
            el.className = '';
        }
    };

    // Send the sign up request when the form has been submitted.
    var signUpForm = document.getElementById('sign-up-form');
    var signUp = new JobsXMLSignUp(signUpForm);
    signUpForm.onsubmit = function() {
        // Sign up.
        signUp.submit();

        // Stop default behaviour
        return false;
    };

})(UitzendbureauNLAPI, URI);
