'use strict';
/// <reference path="../../../Scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/jasmine/jasmine-html.js" />
/// <reference path="../../../scripts/jasmine/boot.js" />

/// <reference path="../../../Scripts/angular/angular.js" />
/// <reference path="../../../Scripts/angular/ui-bootstrap-custom-tpls-0.6.0.js" />
/// <reference path="../../../Scripts/angular/angular-resource.js" /> 
/// <reference path="../../../Scripts/angular/angular-route.js" /> 
/// <reference path="../../../Scripts/angular/angular-mocks.js" /> 
/// <reference path="../../../Scripts/angular/angular-cookies.js" /> 
/// <reference path="../../../Scripts/angular/angular-sanitize.js" /> 
/// <reference path="../../../Scripts/angular/angular-touch.js" /> 
/// <reference path="../../../Scripts/angular/angular-translate.js" />
/// <reference path="../../../Scripts/angular/angular-translate-loader-url.js" />

/// <reference path="../../../Scripts/shims.js" /> 
/// <reference path="../../../Scripts/underscore.js" /> 
/// <reference path="../../../Scripts/sinon-1.9.1.js" /> 

/// <reference path="../../../app/app.js" /> 
/// <reference path="../../../app/services/localStorageService.js" />
/// <reference path="../../../app/services/sessionStorageService.js" />
/// <reference path="../../../app/services/omnitureService.js" />
/// <reference path="../../../app/services/shoppingCartService.js" />
/// <reference path="../../../app/services/profileService.js" />
/// <reference path="../../../app/services/ie8Service.js" />

/// <reference path="../../../app/search/searchController.js" /> 

describe('shoppingCartService', function () {
    var mockLocalStorageService;

    beforeEach(module('suresupply', function ($provide, $translateProvider) {
        // this mocks out the translation provider from the app.config.
        $provide.factory('customLoader', function () {
            return function () {
                return {
                    then: function () {
                    }
                };
            };
        });
        $translateProvider.useLoader('customLoader');
    }));
    
    beforeEach(function () {
        mockLocalStorageService = sinon.stub({ get: function() {}, set: function() {} });

        module(function($provide) {
            $provide.value('localStorageService', mockLocalStorageService);
        });
    });

    describe('addSearchItem', function () {
        
        it('should ony add a supplyItem if marked as selected', inject(function (shoppingCartService) {
            var selectedItem = { sku: 'SKU', name: '', description: '', imageUrl: '', supplyInfo: [{ isSelected: true }] };
            var cartridgeItem = { sku: 'SKU', name: '', description: '', imageUrl: '' };
            
            shoppingCartService.addSearchItem(selectedItem, cartridgeItem);

            var cachedCart = mockLocalStorageService.set.args[0][1];

            expect(cachedCart.supplyItems.length).toEqual(0);
        }));

        it('should add a supplyItem if marked as selected', inject(function (shoppingCartService) {
            var selectedItem = { sku: 'SKU', name: '', description: '', imageUrl: '',isSelected: true, supplyInfo: [{ isSelected: true }] };
            var cartridgeItem = { sku: 'SKU', name: '', description: '', imageUrl: '', isSelected: true, };

            shoppingCartService.addSearchItem(selectedItem, cartridgeItem);

            var cachedCart = mockLocalStorageService.set.args[0][1];

            expect(cachedCart.supplyItems.length).toEqual(1);
        }));
        
        //it('should not add unselected supplyItem from the cart', inject(function (shoppingCartService) {
        //    mockLocalStorageService.get.returns({ });

        //    var selectedItem = { sku: 'SKU', name: '', description: '', imageUrl: '', supplyInfo: [{ sku: 'keep', isSelected: true }, { sku: 'remove', isSelected: false }] };
            
        //    shoppingCartService.addSearchItem(selectedItem);

        //    var cachedCart = mockLocalStorageService.set.args[0][1];

        //    expect(cachedCart.supplyItems.length).toEqual(1);
        //    expect(cachedCart.supplyItems[0].sku).toEqual('keep');
        //}));
        


        //it('should remove unselected supplyItem from the cart', inject(function (shoppingCartService) {
        //    mockLocalStorageService.get.returns({ supplyItems: [{ quantity: 1, sku: 'keep' }, { quantity: 1, sku: 'remove' }] });

        //    var selectedItem = { sku: 'SKU', name: '', description: '', imageUrl: '', supplyInfo: [{ sku: 'keep', isSelected: true }, { sku: 'remove', isSelected: false }] };

        //    shoppingCartService.addSearchItem(selectedItem);

        //    var cachedCart = mockLocalStorageService.set.args[0][1];

        //    expect(cachedCart.supplyItems.length).toEqual(1);
        //    expect(cachedCart.supplyItems[0].sku).toEqual('keep');
        //}));
    });
    
    //describe('updateItem', function () {

    //    it('should update the cart supplyItem.price value', inject(function (shoppingCartService) {
    //        mockLocalStorageService.get.returns({ supplyItems: [{ sku: '123', isTempCartItem: false, quantity: 1, price: 45.55 }, { sku: '456', isTempCartItem: true, quantity: 1, price: 92 }] });

    //        var resp = shoppingCartService.updateItem({ sku: '456', isTempCartItem: true, quantity: 1, price: 21.25 });

    //        var sku123 = _.find(resp.supplyItems, function (si) { return si.sku === '123'; });
    //        var sku456 = _.find(resp.supplyItems, function (si) { return si.sku === '456'; });
            
    //        expect(sku123.price).toEqual(45.55);
    //        expect(sku456.price).toEqual(21.25);
    //    }));
        
    //    it('should update the cart supplyItem.price decimal value', inject(function (shoppingCartService) {
    //        mockLocalStorageService.get.returns({ supplyItems: [{ sku: '123', isTempCartItem: false, quantity: 1, price: 45.55 }] });

    //        var resp = shoppingCartService.updateItem({ sku: '123', isTempCartItem: true, quantity: 1, price: '' });

    //        var sku123 = _.find(resp.supplyItems, function (si) { return si.sku === '123'; });

    //        expect(sku123.price).toEqual(0);
            
    //    }));
    //});
});