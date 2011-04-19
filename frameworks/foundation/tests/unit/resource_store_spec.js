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
        }).toThrow('ERROR: The type requested is not registered in the resource store');
      });
    });

    context('when the passed in type matches a type in the store', function() {
      var resourceType, allResources;
      beforeEach(function() {
        resourceType = 'someType';
        allResources = [];
        resourceTypeObject.all = function() { return allResources };
        resourceTypeObject.ofType = function() { return true; }
        spyOn(Fictum.ResourceType, 'create').andReturn(resourceTypeObject);
        store.addResourceType(resourceType, {});
      });

      afterEach(function() {
        resourceTypeObject.all = function() {};
        resourceTypeObject.ofType = function() {};
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
        }).toThrow('ERROR: The type requested is not registered in the resource store');
      });
    });

    context('when the passed in type matches a type in the store', function() {
      var attributes, resourceType, addResourceSpy;
      beforeEach(function() {
        resourceType = 'SomeType', attributes = {key: 'value'};
        resourceTypeObject.ofType = function() { return true; };
        addResourceSpy = spyOn(resourceTypeObject, 'addResource');
        spyOn(Fictum.ResourceType, 'create').andReturn(resourceTypeObject);
        store.addResourceType(resourceType, {});
      });

      afterEach(function() {
        resourceType.ofType = function () {};
      });

      it('tells that type to add a resource with the passed in attributes', function() {
        store.addResource(resourceType, attributes);

        expect(addResourceSpy).toHaveBeenCalledWith(attributes);
      });
    });
  });
});
