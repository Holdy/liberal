const expect = require('chai').expect;
const LiberalMap = require('../../lib/LiberalMap');

describe('Liberal Map', function() {

    describe('Literal handling', function() {

        it('Should get and set null', function(done) {
            let map = new LiberalMap();

            map.set('test', null);
            expect(map.get('test')).to.equal(null);
            done();
        });

        it('Should get and set 0', function(done) {
            let map = new LiberalMap();

            map.set('test', 0);
            expect(map.get('test')).to.equal(0);
            done();
        });

        it('Should get and set false', function(done) {
            let map = new LiberalMap();

            map.set('test', false);
            expect(map.get('test')).to.equal(false);
            done();
        });

    });

    describe('Liberal handling', function () {

        it('Should handle different case', function(done) {
            let map = new LiberalMap();
            map.set('abc', 123);

            expect(map.get('ABC')).to.equal(123);
            done();
        });

        it('Should keep track of items that differ simply', function(done) {
            let map = new LiberalMap();
            map.set('abc', 123);
            map.set('ABC', 456);

            expect(map.get('abc')).to.equal(123);
            expect(map.get('ABC')).to.equal(456);
            done();
        });

        it('Should error for ambiguous keys', function(done) {
            let map = new LiberalMap();
            map.set('abc', 123);
            map.set('ABC', 456);

            let result = map.get('aBc');
            expect(result).to.be.undefined;
            let errors = map.getErrors();
            expect(errors.length).to.equal(1);
            expect(errors[0].error).to.equal('AMBIGUOUS-KEY');
            expect(errors[0].key).to.equal('aBc');
            expect(errors[0].keyList.length).to.equal(2);

            done();
        });




    });

});
