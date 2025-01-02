class Communicator {
  constructor() {
    this.subscriptionList = {};
  }
  subscribe(eventName, callback) {
    if(typeof callback !== 'function') {
      throw new Error('Invalid function argument!!');
    }
    else {
      if(this.subscriptionList[eventName] !== undefined) {
        this.subscriptionList[eventName].push(callback);
      }
      else {
        this.subscriptionList[eventName] = [callback]
      }
    }
  }
  unsubscribe(eventName, callback) {
    if(typeof callback !== 'function') {
      throw new Error('Invalid function argument!!');
    }
    else {
      if(this.subscriptionList[eventName]) {
        this.subscriptionList[eventName] = this.subscriptionList[eventName].filter(callbackName => {
          return callbackName !== callback;
        });
      }
    }
  }
  publish(eventName, data) {
    this.subscriptionList[eventName].forEach(element => {
      element(data);
    });
  }
}
const communicator = new Communicator();
export {communicator};