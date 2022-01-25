'use strict';

const ExemploProperty = require('./exemplo-property');
const {
    Device
} = require('gateway-addon');


class ExemploDevice extends Device {
    
    constructor(adapter, nome) {
        super(adapter, nome);
        
        this.adapter = adapter;
        this.nome = nome;  
        
        this.properties.set(
            'doSomething',
            new ExemploProperty(
                this,
                'doSomething', {
                    title: 'doSomething',
                    type: 'integer',
                },
                false
            )
        ); 
        
        this.properties.set(
            'printHelloWorld',
            new ExemploProperty(
                this,
                'printHelloWorld', {
                    title: 'printHelloWorld',
                    type: 'boolean',
                },
                false
            )
        );
    }

    doSomething(){
        console.log("Add-on de teste!!!" + this.nome)
    }

    printHelloWorld(){
        console.log("Hello World!")
    }
}

module.exports = ExemploDevice;
