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

/// <reference path="../../../app/app.js" /> 
/// <reference path="../../../app/services/localStorageService.js" />
/// <reference path="../../../app/services/sessionStorageService.js" />
/// <reference path="../../../app/services/expressService.js" />
/// <reference path="../../../app/services/omnitureService.js" />
/// <reference path="../../../app/services/shoppingCartService.js" />
/// <reference path="../../../app/services/profileService.js" />
/// <reference path="../../../app/services/ie8Service.js" />

/// <reference path="../../../app/search/searchController.js" /> 


describe('SearchController', function () {
    var scope, $controllerConstructor, httpMock, mockSearchResults;

    beforeEach(module('suresupply', function ($provide, $translateProvider) {
        // this mocks out the translation provider from the app.config.
        $provide.factory('customLoader', function () {
            return function () {
                return {
                    then: function() {
                    }
                };
            };
        });
        $translateProvider.useLoader('customLoader');
    }));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        //scope.init();
        $controllerConstructor = $controller;
        $rootScope.user = {authenticated : false};
    })); 

    it('should set the scope isFirstLoaded to true when initialised', function () {
        mockSearchResults = {};

        $controllerConstructor('SearchController', { $scope: scope });

        expect(scope.isFirstLoad).toBe(true);
    });

    it('disableContinue returns false when printers selected', function () {
        mockSearchResults = {};

        $controllerConstructor('SearchController', { $scope: scope });
        var products = [
            { printerId: 0, isHidden: false, integrated: false, isSelected: false },
            { printerId: 0, isHidden: false, integrated: false, isSelected: true }
        ];
        expect(scope.disableContinue(products)).toBe(false);
    });

    it('disableContinue returns true when no printers selected', function () {
        mockSearchResults = {};

        $controllerConstructor('SearchController', { $scope: scope });
        var products = [
            { printerId: 0, isHidden: false, integrated: false, isSelected: false },
            { printerId: 0, isHidden: false, integrated: false, isSelected: false }
        ];
        expect(scope.disableContinue(products)).toBe(true);
    });

    it('search disables onRamp flag', function () {
        mockSearchResults = {};
        scope.isOnRamp = true;
        $controllerConstructor('SearchController', { $scope: scope });
        scope.search('hp');
        expect(scope.isOnRamp).toBe(false);
    });
 
});