import { Item } from './item';
import { Currency } from '../constants';

export interface PurchaseInfo {
  readonly currency: Currency;
  readonly value: number;
  readonly items: Item[];
  readonly lowerLimitAutoCharge: boolean;
}
