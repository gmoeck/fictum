sc_require('debug/url_types/base');

Fictum.StringUrl = Fictum.Url.extend({
  matches: function(url) {
    return this.get('url') == url;
  }
});
