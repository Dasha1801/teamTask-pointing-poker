import { TCardScoreSpecialValue } from '../../../redux/types/card';

export const deck = {
  fib: [
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55,
    89,
    TCardScoreSpecialValue.unknown,
    TCardScoreSpecialValue.break,
  ],
  powersOfTwo: [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    TCardScoreSpecialValue.unknown,
    TCardScoreSpecialValue.break,
  ],
  custom: [],
};
