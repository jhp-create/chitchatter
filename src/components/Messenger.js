
class Messenger {
  constructor() {
    this.subscribers = []
  }

  dispatch(message, bgcolor) {
    this.subscribers.forEach(subscriber => subscriber(message, bgcolor))
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter( sub => sub !== subscriber)
  }
}

export const toasterMessenger = new Messenger()
