import Cookies from 'js-cookie';
import { DeviceType, LoginMethod } from './constants';
import { loadTagManager } from './utils/externalServices';
import { Item, PurchaseInfo, UserAttribute } from './models';
import { convertKeyToSnakeCase } from './utils/util';

export interface ClientOptions {
  trackingId: string;
  debug?: boolean;
  uId?: number;
  autoPageView?: boolean;
  deviceType: DeviceType;
}

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export class EventClient {
  private readonly tagCalled: boolean = false;

  constructor(private options: ClientOptions) {
    if (this.options.autoPageView === undefined) {
      this.options.autoPageView = true;
    }

    loadTagManager(this.options.trackingId);

    this.tagCalled = true;

    this.pushDataLayer({ event: 'Init', ...options });
  }

  private get dataLayer() {
    if (!this.tagCalled) {
      window.dataLayer = window.dataLayer || [];
    }

    return window.dataLayer;
  }

  // TODO: Generate Ruid if not exists
  public get ruid(): string | undefined {
    const ruid = Cookies.get('ruid') || undefined;
    return ruid;
  }

  public get uId(): number | undefined {
    return this.options.uId;
  }

  public setUId(uId?: number | null): void {
    this.options.uId = uId;

    this.pushDataLayer({ event: 'UIdChanged', ...this.options });
  }

  public sendEvent(
    name: string,
    data: Record<string, any> = {},
    ts?: Date,
  ): void {
    data = convertKeyToSnakeCase(data);
    if (!ts) {
      ts = new Date();
    }

    const dataLayerValues = {
      event: name,
      event_params: { ...data, uId: this.options.uId },
      ts: ts.getTime(),
    };

    if (this.options.debug) {
      console.group(`[@ridi/ridi-event-client] Sending '${name}' event`);
      Object.entries(dataLayerValues).forEach(([key, value]) => {
        console.log(`${key}\t ${JSON.stringify(value)}`);
      });
      console.groupEnd();
    }

    this.pushDataLayer(dataLayerValues);
  }

  public isInitialized(): boolean {
    return this.tagCalled;
  }

  public sendPageView(ts?: Date): void {
    if (this.options.autoPageView) {
      throw new Error(
        '[@ridi/ridi-event-client] autoPageView option enabled. Do not call this method manually',
      );
    }
    this.sendEvent('PageView', {}, ts);
  }

  public sendScreenView(
    screenClass: string,
    screenName: string,
    previousScreenName?: string,
    ts?: Date,
  ): void {
    this.sendEvent(
      'ScreenView',
      { screenName, screenClass, previousScreenName },
      ts,
    );
  }

  public sendSignUp(ts?: Date): void {
    this.sendEvent('SignUp', { method: LoginMethod.WEB }, ts);
  }

  public sendLogin(ts?: Date): void {
    this.sendEvent('Login', { method: LoginMethod.WEB }, ts);
  }

  public sendBeginCheckout(items: Item[], ts?: Date): void {
    this.sendEvent('BeginCheckout', { items }, ts);
  }

  public sendAddPaymentInfo(purchaseInfo: PurchaseInfo, ts?: Date): void {
    this.sendEvent('AddPaymentInfo', purchaseInfo, ts);
  }

  public sendEnrollPreference(items: Item[], ts?: Date): void {
    this.sendEvent('EnrollPreference', { items }, ts);
  }

  public sendUnenrollPreference(items: Item[], ts?: Date): void {
    this.sendEvent('UnenrollPreference', { items }, ts);
  }

  public sendEnrollNewBookNotification(items: Item[], ts?: Date): void {
    this.sendEvent('EnrollNewBookNotification', { items }, ts);
  }

  public sendUnenrollNewBookNotification(items: Item[], ts?: Date): void {
    this.sendEvent('UnenrollNewBookNotification', { items }, ts);
  }

  public sendViewItem(items: Item[], ts?: Date): void {
    this.sendEvent('ViewItem', { items }, ts);
  }

  public sendViewContent(item: Item, ts?: Date): void {
    this.sendEvent('ViewContent', { ...item }, ts);
  }

  public sendPurchase(
    transactionId: string,
    purchaseInfo: PurchaseInfo,
    ts?: Date,
  ): void {
    this.sendEvent('Purchase', { transactionId, ...purchaseInfo }, ts);
  }

  public sendUserAttribute(key: string, attr: UserAttribute, ts?: Date): void {
    this.sendEvent('UserAttribute', { key, attr }, ts);
  }

  public sendCustomEvent(eventName: string, params: any, ts?: Date): void {
    this.sendEvent('CustomEvent', { eventName, ...params }, ts);
  }

  public sendAddToCart(items: Item[], ts?: Date): void {
    this.sendEvent('AddToCart', { items }, ts);
  }

  public sendRemoveFromCart(items: Item[], ts?: Date): void {
    this.sendEvent('RemoveFromCart', { items }, ts);
  }

  public sendAddToWish(items: Item[], ts?: Date): void {
    this.sendEvent('AddToWish', { items }, ts);
  }

  public sendRemoveFromWish(items: Item[], ts?: Date): void {
    this.sendEvent('RemoveFromWish', { items }, ts);
  }

  public sendCartToWishlist(items: Item[], ts?: Date): void {
    this.sendEvent('CartToWishlist', { items }, ts);
  }

  public sendWishlistToCart(items: Item[], ts?: Date): void {
    this.sendEvent('WishlistToCart', { items }, ts);
  }

  public sendAddRidiPayCard(previousScreenName: string, ts?: Date): void {
    this.sendEvent('AddRidiPayCard', { previousScreenName }, ts);
  }

  public sendCheckoutRidiPay(
    ridiPayType:
      | string
      | 'ridipay_auto_charge_with_cash'
      | 'ridipay_auto_charge'
      | 'ridipay_charge'
      | 'ridipay_cash'
      | 'ridipay_direct',
    ts?: Date,
  ): void {
    this.sendEvent('CheckoutRidiPay', { ridiPayType }, ts);
  }

  private pushDataLayer(data: Record<string, any>): void {
    if (!this.tagCalled) {
      console.warn('[@ridi/ridi-event-client] GTM is not initialized.');
    }
    this.dataLayer.push(data);
  }
}
