describe('Fictum.UrlStubCollection', function() {
  var collection, urlStub;
  beforeEach(function() {
    urlStub = {getResponse: function() {}, matchesUrl: function() {}};
    spyOn(Fictum.UrlStub, 'create').andReturn(urlStub);
  });

  describe('#hasUrl', function() {
    var url;
    beforeEach(function() {
      collection = Fictum.UrlStubCollection.create();
    });

    context('when the passed in url matches a url in the collection', function() {
      beforeEach(function() {
        spyOn(urlStub, 'matchesUrl').andReturn(true);
        collection.addUrl('known.html', 'something');
      });

      afterEach(function() {
        collection.empty();
      });

      it('is true', function() {
        expect(collection.hasUrl(url)).toBe(true);
      });
    });

    context('when the passed in url has not been registred', function() {
      it('is false', function() {
        expect(collection.hasUrl('unknown.html')).toBe(false);
      });
    });

    context('when the passed in url does not match a url in the collection', function() {
      beforeEach(function() {
        spyOn(urlStub, 'matchesUrl').andReturn(false);
        collection.addUrl('known.html', 'something');
      });

      it('is false', function() {
        expect(collection.hasUrl('known_but_not_passed_in.html')).toBe(false);
      });
    });
  });

  describe('.responseFor', function() {
    var url, response;
    beforeEach(function() {
      collection = Fictum.UrlStubCollection.create();
    });

    context('when the passed in url matches a url in the collection', function() {
      var urlObject;
      beforeEach(function() {
        url = 'someurl.html', response = 'something';
        spyOn(urlStub, 'matchesUrl').andReturn(true);
        spyOn(urlStub, 'getResponse').andReturn(response);

        collection.addUrl(url, response);
      });

      it('gives the stubbed response', function() {
        expect(collection.responseFor(url)).toBe(response);
      });
    });

    context('when the url has not been registered', function() {
      it('returns undefined', function() {
        expect(collection.responseFor('unknown.html')).toBe(undefined);
      });
    });

    context('when the passed in url does not match a url in the collection', function() {
      beforeEach(function() {
        spyOn(urlStub, 'matchesUrl').andReturn(false);
        collection.addUrl('known.html', 'something');
      });

      it('is false', function() {
        expect(collection.responseFor('unknown.html')).toBe(undefined);
      });
    });
  });

  describe('#empty', function() {
    context('when the collection has a stub in it', function() {
      beforeEach(function() {
        spyOn(urlStub, 'matchesUrl').andReturn(true);
        collection.addUrl('known.html', 'something');
      });

      it('empties the collection', function() {
        collection.empty();

        expect(collection.hasUrl('known.html')).toBe(false);
      });
    });
  });
});
