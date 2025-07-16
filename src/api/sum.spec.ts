import { sum } from './sum';
import { expect, test } from 'vitest';

test('2 + 2 = 42', () => expect(sum(2, 2)).toBe(4));
