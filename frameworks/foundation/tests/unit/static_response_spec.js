describe('Fictum.StaticResponse', function() {
  describe('#value', function() {
    it('just returns the setup response', function() {
      var response = 'something';
      var staticResponse = Fictum.StaticResponse.create({response: response});

      expect(staticResponse.value()).toBe(response);
    });
  });
});
