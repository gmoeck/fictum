sc_require('debug/fake_server/base');
sc_require('debug/fake_server/url_stub_collection');
sc_require('debug/fake_server/resource_store');

Fictum.Server = SC.Object.extend({
  init: function() {
    sc_super();
    this.set('urlStubs', Fictum.UrlStubCollection.create());
    this.set('resourceStore', Fictum.ResourceStore.create());
    return this;
  },

  isARegisteredUrl: function(url) {
    return this.get('urlStubs').hasUrl(url);
  },

  registerUrl: function(url, stubValue) {
    this.get('urlStubs').addUrl(url, stubValue);
  },

  responseFor: function(url) {
    return this.get('urlStubs').responseFor(url, this.get('resourceStore'));
  },

  addResource: function(type, attributes) {
    this.get('resourceStore').addResource(type, attributes);
  },

  addResourceType: function(type, defaultAttributes) {
    this.get('resourceStore').addResourceType(type, defaultAttributes);
  }
});
