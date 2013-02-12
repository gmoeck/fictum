sc_require('debug/url_stub_collection');
sc_require('debug/resource_store');

Fictum.Server = SC.Object.extend({
  defaultOptions: {status: 200},
  init: function() {
    sc_super();
    this.set('urlStubs', Fictum.UrlStubCollection.create());
    this.set('resourceStore', Fictum.ResourceStore.create());
    return this;
  },

  isARegisteredUrl: function(url) {
    return this.get('urlStubs').hasUrl(url);
  },

  registerUrl: function(url, stubValue, options) {
    options = options ? options : this.get('defaultOptions');
    this.get('urlStubs').addUrl(url, stubValue, options);
  },

  responseFor: function(url, options) {
    return this.get('urlStubs').responseFor(url, this.get('resourceStore'), options);
  },

  addResource: function(type, attributes) {
    return this.get('resourceStore').addResource(type, attributes);
  },

  addResourceType: function(type, defaultAttributes) {
    this.get('resourceStore').addResourceType(type, defaultAttributes);
  },

  removeResource: function(type, key, value) {
    return this.get('resourceStore').removeResource(type, attributes);
  }
});
