export interface MyObserver{
  next: (value: any) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface MySubscription{
  unsubscribe: () => void;
}

export class MyObservable {
  private readonly _subscribe: (observer: MyObserver) => MySubscription | void;

  constructor(subscribe: (observer: MyObserver) => MySubscription | void) {
    this._subscribe = subscribe;
  }

  subscribe(observer: MyObserver) {
    return this._subscribe(observer);
  }

  static of(...args: any[]) {
    return new MyObservable((observer: MyObserver) => {
      args.forEach(arg => observer.next(arg));
      observer.complete && observer.complete();
    });
  }

  static tick() {
    return new MyObservable(observer => {
      let i = 0;
      const intervalId = setInterval(() => {
        observer.next(i++);
      }, 1000);
      return {
        unsubscribe: () => {
          console.log('Unsubscribing from tick');
          clearInterval(intervalId);
        }
      }
    });
  }
}
