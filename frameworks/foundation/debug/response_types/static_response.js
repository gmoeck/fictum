sc_require('debug/fake_server/base');

Fictum.StaticResponse = SC.Object.extend({
  value: function() {
    return this.get('response');
  }
});
