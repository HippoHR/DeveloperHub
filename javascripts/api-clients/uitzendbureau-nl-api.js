(function(URI) {
  /**
   * Library to communicate with the API of UitzendbureauNLAPI.nl
   * @param {string} authKey Authentication key to use
   * @constructor
   */
  var UitzendbureauNLAPI = function(authKey) {
    this.connector = new UitzendbureauNLAPIConnector(authKey || 'iFz5FHhBQ9dunG5gZ7osRb0DZrf3KhLlDVBxS5D5ybbLB4zI1S0noCkguhzc7awp');
  };

  /**
   * Method to retrieve recruiters from the API
   * @param {Function} done Callback for when the request is finished. Receives the recruiters as first parameter
   */
  UitzendbureauNLAPI.prototype.getRecruiters = function(done) {
    this.connector.get('/recruiters', done);
  };

  /**
   * Validates the jobs xml through the api
   * @param {string} url The url that contains the XML-feed to validate
   * @param {string} auth The optional authorization header that should be used to access the XML-feed
   * @param {function} done Callback for when the request is finished. Receives the validation result as first parameter, second parameter is the status code
   */
  UitzendbureauNLAPI.prototype.validateJobsXML = function(url, auth, done) {
    this.connector.post('/xml/validate/jobs', {
      url: url,
      auth: auth
    }, done);
  };

  /**
   * Validates the jobs xml through the api
   * @param {string} recruiterName The name of the recruiter
   * @param {string} email The contact email address
   * @param {string} phone The contact phone number
   * @param {string} url The url that contains the XML-feed to validate
   * @param {string} auth The optional authorization header that should be used to access the XML-feed
   * @param {function} done Callback for when the request is finished. Receives the validation result as first parameter, second parameter is the status code
   */
  UitzendbureauNLAPI.prototype.signUpJobsXML = function(recruiterName, email, phone, url, auth, done) {
    this.connector.post('/xml/signup/jobs', {
      recruiterName: recruiterName,
      email: email,
      phone: phone,
      url: url,
      auth: auth
    }, done);
  };

  /**
   * The connector that actually connects to the API
   * @param {string} authKey Authentication key to use
   * @constructor
   */
  var UitzendbureauNLAPIConnector = function(authKey) {
    this.authKey = authKey;
    this.sessionId;
    this.sessionExpireDate;
    this.rootUrl = 'http://www.uitzendbureau.nl/api';
  };

  // 20 minutes
  UitzendbureauNLAPIConnector.SESSION_DURATION = 20 * 60 * 1000;
  // 19 minutes
  UitzendbureauNLAPIConnector.SESSION_SAFE_LIFESPAN = 19 * 60 * 1000;

  /**
   * Method that authenticates to the API
   * @param {string} response The response that should be sent to the server
   * @param {Function} done Callback for when the authentication is finished and successful.
   */
  UitzendbureauNLAPIConnector.prototype.authenticate = function(response, done) {
    this.post('/authentication/authenticate', {response: response}, function(success) {
      if(success.authenticationSucceeded) {
        done();
      }
    });
  };

  /**
   * Perform a HTTP GET request
   */
  UitzendbureauNLAPIConnector.prototype.get = function() {
    var params = ['GET'];
    // Add the other arguments to params
    Array.prototype.push.apply(params, arguments);
    this.request.apply(this, params);
  };

  /**
   * Perform a HTTP POST request
   */
  UitzendbureauNLAPIConnector.prototype.post = function() {
    var params = ['POST'];
    // Add the other arguments to params
    Array.prototype.push.apply(params, arguments);
    this.request.apply(this, params);
  };

  /**
   * Perform a HTTP request. Will try to (re)connect when there is no session, or when the session is expired
   */
  UitzendbureauNLAPIConnector.prototype.request = function() {
    var args = arguments;
    // If the current session is not usable, we need to authenticate first
    if(!this.hasUsableSession()) {
      var self = this;
      // Call performRequest immediately, to prevent an infinite loop
      this.performRequest('GET', '/authentication/request-challenge', function(challenge) {
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + UitzendbureauNLAPIConnector.SESSION_DURATION);
        self.sessionExpireDate = expireDate;
        self.sessionId = challenge.sessionId;

        var response = hex_sha1(challenge.challenge + self.authKey).toLowerCase();
        self.authenticate(response, function() {
          self.performRequest.apply(self, args);//method, url, options, done
        });
      });
    } else {
      this.performRequest.apply(this, args);//method, url, options, done
    }
  };

  /**
   * Method to check if the current session can still be used
   * @returns {Boolean}
   */
  UitzendbureauNLAPIConnector.prototype.hasUsableSession = function() {
    // If there is no session id, or the session has extended its lifespan, there is no usable session
    return !!this.sessionId && !this.isSessionOverLifespan();
  };

  /**
   * Method to check if the current session has passed its lifespan
   * @returns {Boolean}
   */
  UitzendbureauNLAPIConnector.prototype.isSessionOverLifespan = function() {
    var nowTimestamp = +new Date();
    var sessionEndTimestamp = +this.sessionExpireDate + UitzendbureauNLAPIConnector.SESSION_SAFE_LIFESPAN;
    return sessionEndTimestamp < nowTimestamp;
  };

  /**
   * Perform a HTTP request
   * @param {string} method The HTTP method to use
   * @param {string} url The path of the API that should be requested
   * @param {Object} options Parameters that should be send with the request
   * @param {Function} done Callback for when the request is finished. First parameter will receive the response, second parameter is the status code
   */
  UitzendbureauNLAPIConnector.prototype.performRequest = function(method, url, options, done) {
    if(typeof done === 'undefined' && typeof options === 'function') {
      done = options;
      options = {};
    }

    // Add the session id to the request
    if(this.sessionId) {
      if(method === 'GET') {
        var query = url.indexOf('?') >= 0 ? url.substring(url.indexOf('?')) : '';
        if(!('sessionId' in URI.parseQuery(query))) {
          url += ( url.indexOf('?') >= 0 ? '&' : '?' ) + 'sessionId=' + this.sessionId;
        }
      } else {
        if(!('sessionId' in options)) {
          options.sessionId = this.sessionId;
        }
      }
    }

    var xhr = new XHRCORS();
    xhr.open(method, this.rootUrl + url);

    if('setRequestHeader' in xhr) {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    var self = this;
    xhr.onload = function() {
      var data = null;
      if(self._isValidJSON(xhr.responseText)) {
        data = JSON.parse(xhr.responseText);
      }

      done(data, xhr.status);
    };
    xhr.onerror = function() {
      // There was an error! What should we do!?
    };

    xhr.send(URI.buildQuery(options));
  };

  /**
   * Check if the given string is valid JSON.
   * @param {string} str The string to check
   * @return {boolean} True when the string is valid JSON, false otherwise.
   */
  UitzendbureauNLAPIConnector.prototype._isValidJSON = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

  window.UitzendbureauNLAPI = UitzendbureauNLAPI;
})(URI);


var XHRCORS = (function() {
  if ('withCredentials' in new XMLHttpRequest()) {
    return XMLHttpRequest;
  } else if (typeof XDomainRequest !== 'undefined') {
    return XDomainRequest;
  }
})();
