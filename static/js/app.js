var fahApp = angular.module('fahApp', ['ngRoute', 'fahControllers']);

fahApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
});

fahApp.config([
    '$routeProvider',
    function ($routeProvider){
        $routeProvider
            .when("/project/:projectId",{
                templateUrl: '/foldingathome/fah-completed.html',
                controller: 'fahCompletedController'
            });
    }
]);

fahApp.config([
    '$httpProvider',
    function ($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
]);
