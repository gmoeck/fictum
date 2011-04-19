sc_require('debug/fake_server/url_types/base');

Fictum.RegularExpressionUrl = Fictum.Url.extend({
  matches: function(url) {
    return url.match(this.get('url')) !== null;
  }
});
