describe('Fictum', function() {
  describe('.startInterceptingRequests', function() {
    beforeEach(function() {
      Fictum.startInterceptingRequests()
    });

    afterEach(function() {
      Fictum.stopInterceptingRequests();
    });

    context('when it is not already intercepting requests', function() {
      it('starts intercepting all ajax requets', function() {
        var request = SC.Request.create();
        var sendRequestStub = spyOn(Fictum, 'isARegisteredUrl').andReturn(false);
        spyOn(SC.Request.manager, 'sendRequest').andReturn(null);
        request.send();

        expect(sendRequestStub).toHaveBeenCalled();
      });
    });

    context('when it is already intercepting requests', function() {
      it('throws an error saying that it is already intercepting requests', function() {
        expect(function() {
          Fictum.startInterceptingRequests();
        }).toThrow('ERROR: Already intercepting requests');
      });
    });
  });

  describe('.stopInterceptingRequests', function() {
    beforeEach(function() {
      Fictum.startInterceptingRequests();
      Fictum.stopInterceptingRequests();
    });

    context('when it is currently intercepting requests', function() {
      it('stops intercepting ajax requests', function() {
        var request = SC.Request.create();
        var sendRequestStub = spyOn(Fictum, 'isARegisteredUrl').andReturn(false);
        spyOn(SC.Request.manager, 'sendRequest').andReturn(null);
        request.send();

        expect(sendRequestStub).not.toHaveBeenCalled();
      });
    });

    context('when it is not currently intercepting requests', function() {
      it('throws an error saying that is is not intercepting requests', function() {
        expect(function() {
          Fictum.stopInterceptingRequests();
        }).toThrow('ERROR: Not currently intercepting requests');
      });
    });
  });

  describe('.isARegisteredUrl', function() {
    var url = 'something.html';

    context('when it has a server', function() {
      beforeEach(function() {
        Fictum.setup();
      });

      afterEach(function() {
        Fictum.teardown();
      });

      it('asks the server if it has registerd the url', function() {
        var isARegisteredUrlSpy = spyOn(Fictum.server, 'isARegisteredUrl');
        Fictum.isARegisteredUrl(url);

        expect(isARegisteredUrlSpy).toHaveBeenCalledWith(url);
      });

      context('and the server has registered the url', function() {
        beforeEach(function() {
          spyOn(Fictum.server, 'isARegisteredUrl').andReturn(true);
        });

        it('is true', function() {
          expect(Fictum.isARegisteredUrl(url)).toBe(true);
        });
      });

      context('and the server has not registered the url', function() {
        beforeEach(function() {
          spyOn(Fictum.server, 'isARegisteredUrl').andReturn(false);
        });

        it('is true', function() {
          expect(Fictum.isARegisteredUrl(url)).toBe(false);
        });
      });
    });

    context('when the fake server has not been setup yet', function() {
      beforeEach(function() {
        Fictum.server = undefined;
      });

      it('thows an error saying that the server has not yet been setup', function() {
        expect(function() {
          Fictum.isARegisteredUrl(url);
        }).toThrow('ERROR: Server has not yet been setup');
      });
    });
  });

  describe('.registerUrl', function() {
    var url ='something.html';
    var response = 'something';

    context('when the fake server has not been setup yet', function() {

      it('thows an error saying that the server has not yet been setup', function() {
        expect(function() {
          Fictum.registerUrl(url, response);
        }).toThrow('ERROR: Server has not yet been setup');
      });
    });

    context('when the fake server has been setup', function() {
      beforeEach(function() {
        Fictum.setup();
      });

      afterEach(function() {
        Fictum.teardown();
      });

      it('tells the server to register the url with the passed in response', function() {
        var registerUrlSpy = spyOn(Fictum.server, 'registerUrl');
        var options = {};
        Fictum.registerUrl(url, response, options);

        expect(registerUrlSpy).toHaveBeenCalledWith(url, response, options);
      });
    });
  });

  describe('.responseFor', function() {
    var url= 'some_url.html', expectedResponse = 'something';

    context('when the fake server has been setup', function() {
      var responseForSpy, rtnVal, options;
      beforeEach(function() {
        Fictum.setup();
        options = {};
        responseForSpy = spyOn(Fictum.server, 'responseFor').andReturn(expectedResponse);
        actualResponse = Fictum.responseFor(url, options);
      });

      afterEach(function() {
        Fictum.teardown();
      });

      it('asks the server for it\'s response', function() {
        expect(responseForSpy).toHaveBeenCalledWith(url, options);
      });

      it('returns the response from the server', function() {
        expect(actualResponse).toBe(expectedResponse);
      });
    });

    context('when the fake server has not been setup yet', function() {
      it('thows an error saying that the server has not yet been setup', function() {
        expect(function() {
          Fictum.responseFor(url);
        }).toThrow('ERROR: Server has not yet been setup');
      });
    });
  });

  describe('.addResourceType', function() {
    var addResourceTypeSpy, type = 'something', defaultAttributes = { };

    context('when the fake server has been setup', function() {
      beforeEach(function() {
        Fictum.setup();
      });

      afterEach(function() {
        Fictum.teardown();
      });

      it('adds that resource type to the server', function() {
        addResourceTypeSpy = spyOn(Fictum.server, 'addResourceType');
        Fictum.addResourceType(type, defaultAttributes);


        expect(addResourceTypeSpy).toHaveBeenCalledWith(type, defaultAttributes);
      });
    });

    context('when the fake server has not been setup yet', function() {
      it('thows an error saying that the server has not yet been setup', function() {
        expect(function() {
          Fictum.addResourceType(type, defaultAttributes);
        }).toThrow('ERROR: Server has not yet been setup');
      });
    });
  });

  describe('.addResource', function() {
    var addResourceSpy, attributes = { title: 'something' }, type = 'Something', resource, returnedValue;

    context('when the fake server has been setup', function() {
      beforeEach(function() {
        Fictum.setup();
        resource = {};
        addResourceSpy = spyOn(Fictum.server, 'addResource').andReturn(resource);
        returnedValue = Fictum.addResource(type, attributes);
      });

      afterEach(function() {
        Fictum.teardown();
      });

      it('adds that resource to the server', function() {
        expect(addResourceSpy).toHaveBeenCalledWith(type, attributes);
      });

      it('returns the created resource', function() {
        expect(returnedValue).toBe(resource);
      });
    });

    context('when the fake server has not been setup yet', function() {
      it('thows an error saying that the server has not yet been setup', function() {
        expect(function() {
          Fictum.addResource(attributes);
        }).toThrow('ERROR: Server has not yet been setup');
      });
    });
  });
});
