sc_require('debug/fake_server/base');
sc_require('debug/utils/json');

Fictum.DynamicResponse = SC.Object.extend({
  value: function(store) {
    return JSON.stringify(this.get('response')(store));
  }
});
