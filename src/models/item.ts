import { ServiceType } from '../constants';

export interface Item {
  readonly service_type: ServiceType;
  readonly item_id: string;
  readonly item_name: string;
  readonly item_repr_id?: string;
  readonly item_repr_name?: string;
  readonly item_category: number;
  readonly item_genre?: string;
  readonly price?: number;
  readonly quantity?: number;
}
