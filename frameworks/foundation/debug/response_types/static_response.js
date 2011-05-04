sc_require('debug/base');

Fictum.StaticResponse = SC.Object.extend({
  value: function() {
    return this.get('response');
  }
});
