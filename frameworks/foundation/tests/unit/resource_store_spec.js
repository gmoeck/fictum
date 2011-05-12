describe('Fictum.ResourceStore', function() {
  var store, resourceTypeObject;

  describe('#allOfType', function() {
    beforeEach(function() {
      store = Fictum.ResourceStore.create();
      resourceTypeObject = { 
        all: function() {}, 
        ofType: function() {}, 
        addResource: function() {}
      };
    });

    context('when the passed in type does not match a type in the store', function() {
      it('throws an error alerting the developer that they have not registered that type', function() {
        expect(function() {
          store.allOfType('unknownType');
        }).toThrow('ERROR: You requested all resources of type "unknownType", but that type has not been registered in the resource store');
      });
    });

    context('when the passed in type matches a type in the store', function() {
      var resourceType, allResources;
      beforeEach(function() {
        resourceType = 'someType';
        allResources = [];
        spyOn(resourceTypeObject, 'all').andReturn(allResources);
        spyOn(resourceTypeObject, 'ofType').andReturn(true);
        spyOn(Fictum.ResourceType, 'create').andReturn(resourceTypeObject);
        store.addResourceType(resourceType, {});
      });

      it('returns all the items of that type', function() {
        expect(store.allOfType(resourceType)).toBe(allResources);
      });
    });
  });

  describe('#addResource', function() {
    context('when the passed in type does not match a type in the store', function() {
      it('throws an error alerting the developer that they have not registered that type', function() {
        expect(function() {
          store.addResource('unknownType');
        }).toThrow('ERROR: You requested to add a resource of type "unknownType", but that type has not been registered in the resource store');
      });
    });

    context('when the passed in type matches a type in the store', function() {
      var attributes, resourceType, addResourceSpy, resource, returnedValue;
      beforeEach(function() {
        resourceType = 'SomeType', attributes = {key: 'value'}, resource = {};
        spyOn(resourceTypeObject, 'ofType').andReturn(true);
        addResourceSpy = spyOn(resourceTypeObject, 'addResource').andReturn(resource);
        spyOn(Fictum.ResourceType, 'create').andReturn(resourceTypeObject);
        returnedValue = store.addResource(resourceType, attributes);
      });

      it('adds a resource with the passed in attributes', function() {

        expect(addResourceSpy).toHaveBeenCalledWith(attributes);
      });

      it('returns the created attributes', function() {
        expect(returnedValue).toBe(resource);
      });
    });
  });
});
