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
   * @param {Function} done Callback for when the request is finished. Receives the recruiters as first argument
   */
  UitzendbureauNLAPI.prototype.getRecruiters = function(done) {
    this.connector.get('/recruiters', done);
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
    this.rootUrl = 'http://uzb.claassen.uzbdev.nl/api';
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
          self.performRequest.apply(self, args);//(method, url, options, done);
        });
      });
    } else {
      this.performRequest.apply(this, args);//(method, url, options, done)
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
   * @param {Function} done Callback for when the request is finished. First parameter will receive the response
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

    xhr.onload = function() {
      done(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function() {
      // There was an error! What should we do!?
    };

    xhr.send(URI.buildQuery(options));
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

var hex_sha1 = (function(){
  var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
  function hex_sha1(s) { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }

  /*
   * Calculate the SHA1 of a raw string
   */
  function rstr_sha1(s)
  {
    return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
  }

  /*
   * Convert a raw string to a hex string
   */
  function rstr2hex(input)
  {
    try { hexcase } catch(e) { hexcase=0; }
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
    var output = '';
    var x;
    for(var i = 0; i < input.length; i++)
    {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F)
             +  hex_tab.charAt( x        & 0x0F);
    }
    return output;
  }

  /*
   * Convert an array of big-endian words to a string
   */
  function binb2rstr(input)
  {
    var output = '';
    for(var i = 0; i < input.length * 32; i += 8)
      output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
    return output;
  }

  /*
   * Encode a string as utf-8.
   * For efficiency, this assumes the input is valid utf-16.
   */
  function str2rstr_utf8(input)
  {
    var output = '';
    var i = -1;
    var x, y;

    while(++i < input.length)
    {
      /* Decode utf-16 surrogate pairs */
      x = input.charCodeAt(i);
      y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
      if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
      {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i++;
      }

      /* Encode output as utf-8 */
      if(x <= 0x7F)
        output += String.fromCharCode(x);
      else if(x <= 0x7FF)
        output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                      0x80 | ( x         & 0x3F));
      else if(x <= 0xFFFF)
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                      0x80 | ((x >>> 6 ) & 0x3F),
                                      0x80 | ( x         & 0x3F));
      else if(x <= 0x1FFFFF)
        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                      0x80 | ((x >>> 12) & 0x3F),
                                      0x80 | ((x >>> 6 ) & 0x3F),
                                      0x80 | ( x         & 0x3F));
    }
    return output;
  }

  /*
   * Calculate the SHA-1 of an array of big-endian words, and a bit length
   */
  function binb_sha1(x, len)
  {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;
    var e = -1009589776;

    for(var i = 0; i < x.length; i += 16)
    {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      var olde = e;

      for(var j = 0; j < 80; j++)
      {
        if(j < 16) w[j] = x[i + j];
        else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
        var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                         safe_add(safe_add(e, w[j]), sha1_kt(j)));
        e = d;
        d = c;
        c = bit_rol(b, 30);
        b = a;
        a = t;
      }

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
      e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

  }

  /*
   * Convert a raw string to an array of big-endian words
   * Characters >255 have their high-byte silently ignored.
   */
  function rstr2binb(input)
  {
    var output = Array(input.length >> 2);
    for(var i = 0; i < output.length; i++)
      output[i] = 0;
    for(var i = 0; i < input.length * 8; i += 8)
      output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return output;
  }

  /*
   * Determine the appropriate additive constant for the current iteration
   */
  function sha1_kt(t)
  {
    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
           (t < 60) ? -1894007588 : -899497514;
  }

  /*
   * Perform the appropriate triplet combination function for the current
   * iteration
   */
  function sha1_ft(t, b, c, d)
  {
    if(t < 20) return (b & c) | ((~b) & d);
    if(t < 40) return b ^ c ^ d;
    if(t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
  }

  /*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
  function safe_add(x, y)
  {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /*
   * Bitwise rotate a 32-bit number to the left.
   */
  function bit_rol(num, cnt)
  {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  return hex_sha1;
})();
