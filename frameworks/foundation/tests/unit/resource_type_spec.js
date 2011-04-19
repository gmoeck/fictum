describe('Fictum.ResourceType', function() {
  var type;

  describe('#ofType', function() {
    beforeEach(function() {
      resourceType = 'Something';
      type = Fictum.ResourceType.create({type: resourceType});
    });

    it('is true when it is of the same type', function() {
      expect(type.ofType(resourceType)).toBe(true);
    });

    it('is false when it is not of the same type', function() {
      expect(type.ofType('OtherType')).toBe(false);
    });
  });

  describe('#all', function() {
    var resource;
    beforeEach(function() {
      type = Fictum.ResourceType.create({type: 'something', defaultAttribtues: {}});
    });

    context('when no resources have been added to the type', function() {
      it('returns an empty array', function() {
        expect(type.all()).toEqual([]);
      });
    });

    context('when resources have been added to the type', function() {
      beforeEach(function() {
        resource = type.addResource({})
      });

      it('includes all of them', function() {
        expect(type.all()).toContain(resource);
      });
    });
  });

  describe('#addResource', function() {
    var defaultAttributes,addedResource;
    beforeEach(function() {
      defaultAttributes = {defaultAttribute: 'default'};
      type = Fictum.ResourceType.create({type: 'something', defaultAttributes: defaultAttributes});
    });

    context('when there are no passed in attributes', function() {
      beforeEach(function() {
        addedResource = type.addResource();
      });

      it('adds a resource with the default attributes of the type', function() {
        expect(addedResource).toBe(defaultAttributes);
      });
    });

    context('when the passed in attributes has an attribute not a part of the default attributes', function() {
      var addedValue;
      beforeEach(function() {
        addedValue = 'added';
        addedResource = type.addResource({addedValue: addedValue});
      });

      it('adds a resource that still has the default attributes', function() {
        expect(addedResource.defaultAttribute).toBe(defaultAttributes.defaultAttribute);
      });

      it('adds a resource that has the added attribute as well', function() {
        expect(addedResource.addedValue).toBe(addedValue);
      });
    });

    context('when the passed in attributes overwrite an attribute of the default attributes', function() {
      beforeEach(function() {
        overwrittenValue = 'newValue';
        addedResource = type.addResource({defaultAttribute: overwrittenValue});
      });

      it('adds a resource that has the default attributes, but with the passed in attribute overwriting', function() {
        expect(addedResource.defaultAttribute).toBe(overwrittenValue);
      });
    });
  });
});
