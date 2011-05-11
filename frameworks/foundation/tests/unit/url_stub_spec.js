describe('Fictum.UrlStub', function() {
  var urlStub;

  describe('.create', function() {
    context('when a string is given for the url', function() {
      var createStringUrlSpy, url, expectedResponse;
      beforeEach(function() {
        expectedResponse = {};
        createStringUrlSpy = spyOn(Fictum.StringUrl, 'create').andReturn(expectedResponse);
        url = 'somewhere.html';
        urlStub = Fictum.UrlStub.create({url: url});
      });

      it('creates a string url', function() {
        expect(createStringUrlSpy).toHaveBeenCalledWith({url: url});
      });

      it('assigns the string url to url', function() {
        expect(urlStub.get('url')).toBe(expectedResponse);
      });
    });

    context('when a regular expression is given for the url', function() {
      var createStringUrlSpy, url, expectedResponse;
      beforeEach(function() {
        expectedResponse = {};
        createRegularExpressionUrlSpy = spyOn(Fictum.RegularExpressionUrl, 'create').andReturn(expectedResponse);
        url = /somewhere.html.*/;
        urlStub = Fictum.UrlStub.create({url: url});
      });

      it('creates a regular expression url', function() {
        expect(createRegularExpressionUrlSpy).toHaveBeenCalledWith({url: url});
      });

      it('assigns regular expression url to url', function() {
        expect(urlStub.get('url')).toBe(expectedResponse);
      });
    });

    context('when a string is given for the response', function() {
      var createStaticResponseSpy, response;
      beforeEach(function() {
        expectedResponse = {};
        createStaticResponseSpy = spyOn(Fictum.StaticResponse, 'create').andReturn(expectedResponse);
        response = 'something';
        urlStub = Fictum.UrlStub.create({response: response});
      });

      it('creates static response', function() {
        expect(createStaticResponseSpy).toHaveBeenCalledWith({response: response});
      });

      it('assigns the static response to response', function() {
        expect(urlStub.get('response')).toBe(expectedResponse);
      });
    });

    context('when a function is given for the response', function() {
      var createDynamicResponseSpy, response;
      beforeEach(function() {
        expectedResponse = {};
        createDynamicResponseSpy = spyOn(Fictum.DynamicResponse, 'create').andReturn(expectedResponse);
        response = function() {};
        urlStub = Fictum.UrlStub.create({response: response});
      });

      it('creates a dynamic response', function() {
        expect(createDynamicResponseSpy).toHaveBeenCalledWith({response: response});
      });

      it('assigns the dynamic response to response', function() {
        expect(urlStub.get('response')).toBe(expectedResponse);
      });
    });
  });

  describe('#matchesUrl', function() {
    var url, matchesSpy, returnValue;
    beforeEach(function() {
      url = 'something.html';
      urlStub = Fictum.UrlStub.create({url: url});
      matchesSpy = spyOn(urlStub.get('url'), 'matches').andReturn(true);
      returnValue = urlStub.matchesUrl(url);
    });

    it('asks it\'s url if the passed in url is it\'s own', function() {
      expect(matchesSpy).toHaveBeenCalledWith(url);
    });

    it('returns if it is', function() {
      expect(returnValue).toBe(true);
    });
  });

  describe('#getResponse', function() {
    var value = 'response value', createSCResponseSpy, expectedResponse, actualResponse, resourceStore, status;

    beforeEach(function() {
      status = 200;
      urlStub = Fictum.UrlStub.create({url: 'something', options: {status: status}});
      expectedResponse = 'something';
      parsedResponse = {};
      spyOn(urlStub.get('response'), 'value').andReturn(value);
      spyOn(jQuery, 'parseJSON').andReturn(parsedResponse);
      createSCResponseSpy = spyOn(SC.Response, 'create').andReturn(expectedResponse);
      resourceStore = {};
    });

    context('when the json option has not been set', function() {
      beforeEach(function() {
        actualResponse = urlStub.getResponse(resourceStore);
      });

      it('wraps it\'s response\'s raw value in a SC.Request', function() {
        expect(createSCResponseSpy).toHaveBeenCalledWith({body: value, status: status});
      });

      it('gives that response', function() {
        expect(actualResponse).toBe(expectedResponse);
      });
    });

    context('when the json option has been set', function() {
      beforeEach(function() {
        var options = {json: true};
        actualResponse = urlStub.getResponse(resourceStore, options);
      });

      it('wraps it\'s response\'s json value in a SC.Request', function() {
        expect(createSCResponseSpy).toHaveBeenCalledWith({body: parsedResponse, status: status});
      });
    });
  });
});
