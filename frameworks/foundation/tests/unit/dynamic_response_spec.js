describe('Fictum.DynamicResponse', function() {
  describe('#value', function() {
    var resourceStore, expectedResponse, actualResponse;
    beforeEach(function() {
      var fakeObject = { responseFunction: function(store) {} };
      resourceStore = {};
      expectedResponse = {some: "json"};
      responseSpy = spyOn(fakeObject, 'responseFunction').andReturn(expectedResponse);
      response = Fictum.DynamicResponse.create({ response: fakeObject.responseFunction})
      actualResponse = response.value(resourceStore);
    });

    it('evaluates the response with the store passed in', function() {
      expect(responseSpy).toHaveBeenCalledWith(resourceStore);
    });

    it('returns that response', function() {
      expect(actualResponse).toBe(JSON.stringify(expectedResponse));
    });
  });
});
