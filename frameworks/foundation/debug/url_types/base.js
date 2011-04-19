sc_require('debug/fake_server/base');

Fictum.Url = SC.Object.extend({
  matches: function(url) {
    throw new Error('ERROR: Did not implement matches');
  }
});

