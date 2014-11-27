/**
 * To keep our file sizes small, we only use the required parts of the famous URI.js library (https://github.com/medialize/URI.js)
 * @type type
 */
var URI = {};
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

/**
 * Custom method which checks if the current URL has a search query
 * @returns {Boolean} Whether a query exists
 */
URI.hasQuery = function() {
  return location.search.length > 0;
};
