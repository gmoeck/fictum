sc_require('debug/base');
sc_require('debug/utils/json');

Fictum.DynamicResponse = SC.Object.extend({
  value: function(store, options) {
    return JSON.stringify(this.get('response')(store, options));
  }
});
