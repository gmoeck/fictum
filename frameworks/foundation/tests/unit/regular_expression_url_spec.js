describe('Fictum.RegularExpressionUrl', function() {
  describe('#matches', function() {
    var url = /something.html.*/, stringUrl;

    context('when the passed in url matches the url', function() {
      beforeEach(function() {
        stringUrl = Fictum.RegularExpressionUrl.create({url: url});
      });

      it('is true', function() {
        expect(stringUrl.matches('something.html?something=somethingelse')).toBe(true);
      });
    });

    context('when the passed in url does not match the url', function() {
      beforeEach(function() {
        stringUrl = Fictum.RegularExpressionUrl.create({url: url});
      });

      it('is false', function() {
        expect(stringUrl.matches('something_else.html')).toBe(false);
      });
    });
  });
});
