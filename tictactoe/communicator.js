class Communicator {
  constructor() {
    this.subscriptionList = {};
  }
  publish(eventName, data) {
    Object.keys(this.subscriptionList).forEach(subscription => {
      if(subscription === eventName) {
        this.subscriptionList[subscription].forEach(callback => {
          callback(data);
        });
      }
    })
  }
  subscribe(eventName, callback) {
    if(this.subscriptionList[eventName] === undefined) {
      this.subscriptionList[eventName] = [];
    }
    this.subscriptionList[eventName].push(callback)
  }
  unsubscribe(eventName, callback) {
    Object(this.subscriptionList).entries((item) => {
      if(item === eventName) {
        this.subscriptionList[item] = this.subscriptionList[item].filter(fn => {
          return fn !== callback;
        });
      }
    });
  }
}

const communicator = new Communicator(); 
export default communicator;