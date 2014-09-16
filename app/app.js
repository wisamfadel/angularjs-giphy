'use strict';

var app = angular.module('ngGiphyApp', ['ngRoute' , 'ngAnimate']);

app.config(function($routeProvider) {

    $routeProvider

    .when('/detailview', {
        templateUrl: 'templates/detail-view.html',
        controller: 'detailviewController'
    })
    .otherwise({ redirectTo: '/' });
});


app.controller('mainController', ['$scope', function($scope) {
    $scope.pageClass = 'page-about';
    $scope.currentPage = 0;
    $scope.pageSize = 25;

    $scope.numberOfPages = function(){
        return Math.ceil(100/$scope.pageSize);                
    };

     $scope.imgSizes = [
      {size:'img-size-large', name:'Large Image'},
      {size:'img-size-medium',name:'Medium Image'},
      {size:'img-size-small', name:'Small Image'},
      {size:'img-size-extra-small', name:'Extra small Image'}
    ];

    $scope.mySize = $scope.imgSizes[1];

}]);

app.controller('detailviewController', ['$scope','$routeParams', '$location', function($scope,$routeParams,$location) {
    $scope.gifid = $routeParams.gifid;
    $scope.url = $routeParams.url;
    $scope.urlsource = $routeParams.urlsource;
    $scope.rating = $routeParams.rating;
    $scope.pageClass = 'page-home';

    $scope.back = function () {
        $location.path('/');
    };
}]);


//We alreay have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.directive('ngGiphySearch', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

    // Create the output object
    var output = {};

    // Restrict the directive to Attributes and Elements
    output.restrict = 'AE';

    output.scope = {
      query : '@query',
      limit : '@limit',
      offset : '@offset',
      apikey : '@apikey'
  }

 // Retrive the template from the templateUrl parameter or use the default one.

    var getTemplate = function(url){
      if (angular.isUndefined(url)) {
          url = 'templates/giphy-view.html';
      };

      var templateLoader = $http.get(url, {cache: $templateCache});

      return templateLoader;

    }

    // Create the linker function
    var linker = function(scope, element, attrs) {

      // Define if data has been loaded
      scope.dataLoaded = false;

      // Define parameters from attributes
      var params = {};

      // Retrive parameters from directive attributes
      params.q = scope.query.split(',').join('+');
      params.limit = scope.limit;
      params.offset = scope.offset;
      params.api_key =  scope.apikey;

      var apiSearch = function(){

          $http.get('//api.giphy.com/v1/gifs/search', {params:params})
          .success(
              function(data,status){

                if(typeof data=='object'){
                  scope.results = data.data;
                  scope.dataLoaded = true;
              }

          }

          )
          .error(
              function(){
                console.log("Failed to access");
            }
            )

      }

        var loader = getTemplate(attrs.templateUrl);

      var promise = loader.success(function(html) {
          element.replaceWith($compile(html)(scope));
      }).then(function (response) {
          apiSearch();
      });
    }

  output.link = linker;

  return output;

}]);

