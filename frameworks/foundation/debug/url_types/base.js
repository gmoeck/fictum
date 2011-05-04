sc_require('debug/base');

Fictum.Url = SC.Object.extend({
  matches: function(url) {
    throw new Error('ERROR: Did not implement matches');
  }
});

