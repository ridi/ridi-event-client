import { DeviceType, LoginMethod } from './constants';
import { loadTagManager } from './utils/externalServices';
import { Item, PurchaseInfo } from './models';
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

  public setUId(uId: number): void {
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
    this.sendEvent('AddPaymentInfo', { ...purchaseInfo }, ts);
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

  private pushDataLayer(data: Record<string, any>): void {
    if (!this.tagCalled) {
      console.warn('[@ridi/ridi-event-client] GTM is not initialized.');
    }
    this.dataLayer.push(data);
  }
}
