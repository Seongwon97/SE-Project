const assert = require('assert');
const math = require('./math');

describe('math.js', () => {
  describe('add()', () => {
    it('1 add 2 should return 3', () => {
      assert(math.add(1, 2) === 3);
    });
  });
});
