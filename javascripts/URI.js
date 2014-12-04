/**
 * To keep our file sizes small, we only use the required parts of the famous URI.js library (https://github.com/medialize/URI.js)
 * @type type
 */
var URI = {};
function escapeForDumbFirefox36(value) {
  // https://github.com/medialize/URI.js/issues/91
  return escape(value);
}
// encoding / decoding according to RFC3986
function strictEncodeURIComponent(string) {
  // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
  return encodeURIComponent(string)
    .replace(/[!'()*]/g, escapeForDumbFirefox36)
    .replace(/\*/g, '%2A');
}
URI.encode = strictEncodeURIComponent;
URI.decode = decodeURIComponent;
URI.parseQuery = function(string, escapeQuerySpace) {
  if (!string) {
    return {};
  }

  // throw out the funky business - "?"[name"="value"&"]+
  string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

  if (!string) {
    return {};
  }

  var items = {};
  var splits = string.split('&');
  var length = splits.length;
  var v, name, value;

  for (var i = 0; i < length; i++) {
    v = splits[i].split('=');
    name = URI.decodeQuery(v.shift(), escapeQuerySpace);
    // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
    value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

    if (Object.prototype.hasOwnProperty.call(items, name)) {
      if (typeof items[name] === 'string') {
        items[name] = [items[name]];
      }

      items[name].push(value);
    } else {
      items[name] = value;
    }
  }

  return items;
};
URI.decodeQuery = function(string, escapeQuerySpace) {
  string += '';
  if (escapeQuerySpace === undefined) {
    escapeQuerySpace = URI.escapeQuerySpace;
  }

  try {
    return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
  } catch(e) {
    // we're not going to mess with weird encodings,
    // give up and return the undecoded original string
    // see https://github.com/medialize/URI.js/issues/87
    // see https://github.com/medialize/URI.js/issues/92
    return string;
  }
};
URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
  // URI.js treats the query string as being application/x-www-form-urlencoded
  // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

  var t = '';
  var unique, key, i, length;
  for (key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key) && key) {
      if (isArray(data[key])) {
        unique = {};
        for (i = 0, length = data[key].length; i < length; i++) {
          if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
            t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
            if (duplicateQueryParameters !== true) {
              unique[data[key][i] + ''] = true;
            }
          }
        }
      } else if (data[key] !== undefined) {
        t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
      }
    }
  }

  return t.substring(1);
};
URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
  // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
  // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
  return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
};
URI.encodeQuery = function(string, escapeQuerySpace) {
  var escaped = URI.encode(string + '');
  if (escapeQuerySpace === undefined) {
    escapeQuerySpace = URI.escapeQuerySpace;
  }

  return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
};
function isArray(obj) {
  return getType(obj) === 'Array';
}
function getType(value) {
  // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
  if (value === undefined) {
    return 'Undefined';
  }

  return String(Object.prototype.toString.call(value)).slice(8, -1);
}

/**
 * Custom method which checks if the current URL has a search query
 * @returns {Boolean} Whether a query exists
 */
URI.hasQuery = function() {
  return location.search.length > 0;
};
