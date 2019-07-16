import { TestScheduler } from 'rxjs/testing';
import { assert } from 'chai';

import { waitBetween } from '../src';

describe('wait-between operator', () => {

  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    // e.g. using chai.
    assert.deepEqual(actual, expected);
  });

  it('should emit source values with pauses (intervals)', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 =  cold('--abcd---------|');
      const subs =     '^--------------!';
      const expected = '--a--b--c--d---|';
  
      expectObservable(e1.pipe(waitBetween(3, testScheduler))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  })
})