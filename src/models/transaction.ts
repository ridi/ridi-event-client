import { Item } from './item';
import { Currency } from '../constants';

export interface PurchaseInfo {
  readonly coupon_name: string;
  readonly coupon: number;
  readonly cash: number;
  readonly point: number;
  readonly currency: Currency;
  readonly value: number;
  readonly items: Item[];
}
