describe('Fictum.Server', function() {
  var server;

  describe('#isARegisteredUrl', function() {
    beforeEach(function() {
      server = Fictum.Server.create();
    });

    it('delegates to it\'s url collection to know if the url is registered', function() {
      var url = 'someUrl';
      urlStubsSpy = spyOn(server.get('urlStubs'), 'hasUrl');
      server.isARegisteredUrl(url);

      expect(urlStubsSpy).toHaveBeenCalledWith(url);
    });

    context('when then given url has been registered', function() {
      beforeEach(function() {
        spyOn(server.get('urlStubs'), 'hasUrl').andReturn(true);
      });

      it('returns true', function() {
        expect(server.isARegisteredUrl('someUrl'));
      });
    });

    context('when the given url has not been registered', function() {
      beforeEach(function() {
        spyOn(server.get('urlStubs'), 'hasUrl').andReturn(false);
      });

      it('returns false', function() {
        expect(server.isARegisteredUrl('someUrl'));
      });
    });
  });

  describe('#registerUrl', function() {
    var addUrlSpy, url, stub, defaultOptions;
    beforeEach(function() {
      server = Fictum.Server.create();
      addUrlSpy = spyOn(server.get('urlStubs'), 'addUrl');
      url = 'someUrl';
      stub = 'something';
      defaultOptions = {status: 200};
    });

    context('when no options are passed', function() {
      beforeEach(function() {
        server.registerUrl(url, stub);
      });

      it('registers the url with the default options', function() {
        expect(addUrlSpy).toHaveBeenCalledWith(url, stub, defaultOptions);
      });
    });

    context('when options are passed in', function() {
      var options;
      beforeEach(function() {
        options = {status: 400};
        server.registerUrl(url, stub, options);
      });

      it('registers the url with the passed in options', function() {
        expect(addUrlSpy).toHaveBeenCalledWith(url, stub, options);
      });
    });
  });

  describe('#responseFor', function() {
    var url = 'something.html', expectedResponse = 'something', responseForSpy, actualResponse, resourceStore, options;

    beforeEach(function() {
      resourceStore = {};
      options = {something: 'something'};
      spyOn(Fictum.ResourceStore, 'create').andReturn(resourceStore);
      server = Fictum.Server.create();
      responseForSpy = spyOn(server.get('urlStubs'), 'responseFor').andReturn(expectedResponse);
      actualResponse = server.responseFor(url, options);
    });

    it('asks it\'s url collection for the given url', function() {
      expect(responseForSpy).toHaveBeenCalledWith(url, resourceStore, options);
    });

    it('returns that response', function() {
      expect(actualResponse).toBe(expectedResponse);
    });
  });

  describe('#addResourceType', function() {
    var type = 'Item', defaultAttributes = {};

    beforeEach(function() {
      server = Fictum.Server.create();
      addResourceTypeSpy = spyOn(server.get('resourceStore'), 'addResourceType');
    });

    it('delegates to it\'s resource store to register the resource type', function() {
      server.addResourceType(type, defaultAttributes);

      expect(addResourceTypeSpy).toHaveBeenCalledWith(type, defaultAttributes);
    });
  });

  describe('#addResource', function() {
    it('delegates to it\'s resource store to register the resource type', function() {
      var type = 'Item', attributes = {key: 'value'};
      server = Fictum.Server.create();
      var addResourceSpy = spyOn(server.get('resourceStore'), 'addResource');
      server.addResource(type, attributes);

      expect(addResourceSpy).toHaveBeenCalledWith(type, attributes);
    });
  });
});
