const expect = require('chai').expect;
const Simplifier = require('../../lib/Simplifier');

describe('Simplifier', function() {

    it('should handle different cases', function(done) {
        expect(Simplifier.simplifyText('aBc')).to.equal('abc');
        done();
    });

    it('should remove whitespace, hypens and underscores', function(done) {
        expect(Simplifier.simplifyText(' A \t _ B \n - C ')).to.equal('abc');
        done();
    });

});
