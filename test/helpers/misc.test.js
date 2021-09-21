import { isNull, hasData, getStrokeStyle, isInfinity } from '~/helpers';

describe('Testing misc functions', () => {
  test('null is null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('Test if an object should have data', () => {
    expect(hasData({ type: 'chrt' })).toBe(true);
  });

  test('Test if an object should not have data', () => {
    expect(hasData({ type: 'custom-no-data' })).toBe(false);
  });

  test('Test if finite number is not infinite', () => {
    expect(isInfinity(10)).toBe(false);
  });

  test('Test if an object should not have data', () => {
    expect(getStrokeStyle('dashed', 5)).toBe('20 20');
  });

  test('Test if an object should not have data', () => {
    expect(getStrokeStyle('dotted', 5)).toBe('5 5');
  });

  test('Test if an object should not have data', () => {
    expect(getStrokeStyle('solid')).toBeNull();
  });
});
