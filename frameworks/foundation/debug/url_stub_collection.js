sc_require('debug/fake_server/url_stub');

Fictum.UrlStubCollection = SC.Object.extend({
  urls: [],

  hasUrl: function(url) {
    return this._findUrlStubByUrl(url) !== null; 
  },

  addUrl: function(url, stubValue) {
    this.get('urls').push(Fictum.UrlStub.create({url: url, response: stubValue}));
  },

  responseFor: function(url, resourceStore) {
    var urlStub = this._findUrlStubByUrl(url);
    return urlStub === null ? undefined : urlStub.getResponse(resourceStore);
  },

  empty: function() {
    this.set('urls', []);
  },

  _findUrlStubByUrl: function(url) {
    return this.get('urls').find(function(stub) { return stub.matchesUrl(url) })
  },
});
