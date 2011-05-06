sc_require('debug/resource');

Fictum.ResourceType = SC.Object.extend({
  init: function() {
    this.set('resources', []);
  },

  ofType: function(type) {
    return this.get('type') === type;
  },

  all: function() {
    return this.get('resources');
  },

  addResource: function(attributes) {
    var newResource = this._attributeHashFor(attributes);
    this.get('resources').push(newResource);
    return newResource;
  },

  _attributeHashFor: function(attributes) {
    var defaultAttributes = this.get('defaultAttributes');
    for( var key in attributes) {
      defaultAttributes[key] = attributes[key];
    }
    return defaultAttributes;
  }
});
