describe('Fictum.StringUrl', function() {
  describe('#matches', function() {
    var url = 'something.html', stringUrl;

    context('when the passed in string is identical to the url', function() {
      beforeEach(function() {
        stringUrl = Fictum.StringUrl.create({url: url});
      });

      it('is true', function() {
        expect(stringUrl.matches(url)).toBe(true);
      });
    });

    context('when the passed in string is not identical to the url', function() {
      beforeEach(function() {
        stringUrl = Fictum.StringUrl.create({url: 'something_else.html'});
      });

      it('is false', function() {
        expect(stringUrl.matches(url)).toBe(false);
      });
    });
  });
});
