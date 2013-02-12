sc_require('debug/url_types/base');

Fictum.RegularExpressionUrl = Fictum.Url.extend({
  matches: function(url) {
    var match = url.match(this.get('url'));
    return match || false;
  }
});
