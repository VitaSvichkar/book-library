import { Book } from './book';

export type InitValuesBooks = {
  books: Book[];
  readonly maxResult: number;
  readonly startIndex: number;
  buffer: Book[];
};
