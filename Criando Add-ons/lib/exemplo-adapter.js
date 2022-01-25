'use strict';

const ExemploDevice = require('./exemplo-device');
const {Adapter, Database} = require('gateway-addon');
const manifest = require('../manifest.json');

class ExemploAdapter extends Adapter {

    constructor(addonManager){
        super(addonManager, manifest.id, manifest.id);
        addonManager.addAdapter(this);

        this.startPairing();
    }
    
    startPairing(){
        // Código para encontrar o seu dispositivo
    
        // Criando o dispositivo (defina o construtor)
        const dev = new ExemploDevice(this, "CFA Exemplo");
        this.handleDeviceAdded(dev);
    }
}

module.exports = ExemploAdapter;
