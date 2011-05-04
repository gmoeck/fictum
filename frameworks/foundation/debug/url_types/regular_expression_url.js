sc_require('debug/url_types/base');

Fictum.RegularExpressionUrl = Fictum.Url.extend({
  matches: function(url) {
    return url.match(this.get('url')) !== null;
  }
});
