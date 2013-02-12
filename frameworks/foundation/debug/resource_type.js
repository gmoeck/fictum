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

  removeResource: function(key, value) {
    var resourceIndex = this._resourceIndexFor(key, value);
    if (resourceIndex > -1) { this.get('resources').removeAt(resourceIndex); }
    return resourceIndex > -1;
  },

  _attributeHashFor: function(attributes) {
    var defaultAttributes = this.get('defaultAttributes');
    for( var key in defaultAttributes) {
      if (attributes[key] === undefined) { attributes[key] = defaultAttributes[key]; }
    }
    return attributes;
  },

  _resourceIndexFor: function(key, value) {
    var resources = this.get('resources'),
        len = resources.get('length') || 0,
        idx;

    for (idx = 0; idx < len; idx++) {
      if (resources[idx] && resources[idx][key] === value) {
        return idx;
      }
    }

    return -1;
  }
});
