describe('Scenario: Registering a dynamic reponse URL', function() {
  describe('Given I have setup Fictum', function() {
    beforeEach(function() {
      Fictum.setup();
    });

    afterEach(function() {
      Fictum.teardown();
    });

    describe('And a URL that I want to stub', function() {
      var url;
      beforeEach(function() {
        url = '/something';
      });

      describe('And an existing resource that I want to access', function() {
        var type, title;
        beforeEach(function() {
          type = 'typeA', title = 'something';
          Fictum.addResourceType('Item', { type: type });
          Fictum.addResource('Item', {title: title });
        });

        describe('And a dynamic response using that resource that I want to receive', function() {
          var dynamicResponse;
          beforeEach(function() {
            dynamicResponse = function(resourceStore) {
              var items = resourceStore.allOfType('Item');
              var response = {
                items: items
              }
              return response;
            };
          });

          describe('When I register that URL and response', function() {
            beforeEach(function() {
              Fictum.registerUrl(url, dynamicResponse);
            });

            describe('And I make a request to a url that matches the registered URL regular expression', function() {
              var request, response;
              beforeEach(function() {
                request = SC.Request.getUrl('/something');
                response = request.send();
                waitsFor(function() {
                  return response.get('status') !== -100;
                });
              });

              it('Then I should receive the registered response', function() {
                var expectedResponse = '{"items": [ {"type": "' + type + '", "title": "' + title + '"} ] }';

                expect(jQuery.parseJSON(response.get('body'))).toEqual(jQuery.parseJSON(expectedResponse));
              });
            });
          });
        });
      });
    });
  });
});

