import { Moment } from 'moment';

export interface ITODO {
  id?: number;
  name?: string;
  number?: number;
  date?: string;
}

export const defaultValue: Readonly<ITODO> = {};
