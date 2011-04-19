describe('Scenario: Registering a regular expression URL', function() {
  describe('Given a Fictum', function() {
    beforeEach(function() {
      Fictum.setup();
    });

    afterEach(function() {
      Fictum.teardown();
    });

    describe('Given a URL regular expression that I want to stub', function() {
      var url;
      beforeEach(function() {
        url = /somewebsite\.com.*/;
      });

      describe('And a text response that I want to receive', function() {
        var expectedResponse;
        beforeEach(function() {
          expectedResponse = 'RETURN THIS';
        });

        describe('When I register that URL and response', function() {
          beforeEach(function() {
            Fictum.registerUrl(url, expectedResponse);
          });

          describe('And I make a request to a url that matches the registered URL regular expression', function() {
            var request, response;
            beforeEach(function() {
              request = SC.Request.getUrl('somewebsite.com/something');
              response = request.send();
              waitsFor(function() {
                return response.get('status') !== -100;
              });
            });

            it('Then I should receive the registered response', function() {
              expect(response.get('body')).toBe(expectedResponse);
            });
          });
        });
      });
    });
  });
});
