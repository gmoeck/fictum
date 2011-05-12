sc_require('debug/resource_type');

Fictum.ResourceStore = SC.Object.extend({
  init: function() {
    this.set('resourceTypes', []);
  },

  addResourceType: function(type, defaultAttributes) {
    this.get('resourceTypes').push(Fictum.ResourceType.create({ type: type, defaultAttributes: defaultAttributes }));
  },

  addResource: function(type, attributes) {
    var resourceType = this._resourceTypeFor(type);
    if(resourceType == null)
      throw new Error('ERROR: You requested to add a resource of type "' + type + '", but that type has not been registered in the resource store');
    resourceType.addResource(attributes);
  },

  allOfType: function(type) {
    var resourceType = this._resourceTypeFor(type);
    if(! resourceType)
      throw new Error('ERROR: You requested all resources of type "' + type + '", but that type has not been registered in the resource store');
    return this._resourceTypeFor(type).all();
  },

  empty: function() {
    this.set('resourceTypes', []);
  },

  _resourceTypeFor: function(type) {
    return this.get('resourceTypes').find(function(resourceType) { return resourceType.ofType(type) })
  }
});
