import { ServiceType } from '../constants';

export interface Item {
  readonly service_type: ServiceType;
  readonly item_id: string;
  readonly item_name: string;
  readonly item_episode_name?: string;
  readonly item_episode_id?: string;
  readonly item_category: number;
  readonly item_genre?: string;
  /**
   * Original price of item that does not apply any discount
   * @remarks price should be provided when event is AddPaymentInfo, Purchase
   * @see {@link EventClient#sendPurchase}, {@link EventClient#sendAddPaymentInfo}
   */
  readonly price?: number;
  readonly quantity: number;
}
