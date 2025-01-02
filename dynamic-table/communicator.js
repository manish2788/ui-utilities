function communicatorClass () {
  const subscriptionList = {};
  const subscribe = (eventName, callback) => {
    if(!subscriptionList[eventName]) {
      subscriptionList[eventName] = [];
    }
    subscriptionList[eventName].push(callback);
  };
  const publish = (eventName, value) => {
    const callbacks = subscriptionList[eventName];
    callbacks.forEach(callback => {
      callback(value);
    });
  }

  return {
    subscribe : subscribe,
    publish : publish
  }
}

const communicator =  communicatorClass();
export default communicator;