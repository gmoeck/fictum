sc_require('debug/fake_server/url_types/base');

Fictum.StringUrl = Fictum.Url.extend({
  matches: function(url) {
    return this.get('url') == url;
  }
});
