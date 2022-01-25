const {
  Property
} = require('gateway-addon');

class ExemploProperty extends Property {
  
    constructor(device, name, descr, value) {
        super(device, name, descr);
        this.setCachedValue(value);
    }
  
    setValue(value) {
        switch (this.name) {
            case 'doSomething':
                this.device.doSomething();
                break;

            case 'printHelloWorld':
                this.device.printHelloWorld();
                break;
            default:
        }

        return Promise.resolve(this.value);
    }
}

module.exports = ExemploProperty;
