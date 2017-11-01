var fahApp = angular.module('fahApp', ['ngRoute']);

fahApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
});

fahApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/foldingathome/fah-studies-table.html',
        controller: 'mainController'
    })
    .when('/:study', {
        templateUrl: '/foldingathome/fah-study.html',
        controller: 'studyController'
    })
}])

// main controller for fah studies, navigates to individual studies
fahApp.controller('mainController', function($scope, $location) {
    $scope.message = 'Everyone come and see how good I look!';
    $scope.navigateToStudy = function(study){
        $location.path("/" + study).search({study:study});
        
    }
});

// controller for fah studies table
fahApp.controller('studyController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window',
    function($scope, $routeParams, $http, $location, $route, $window){
        $scope.study = $routeParams.study;
    }
])

// fahApp.config(
//     function ($routeProvider){
//         $routeProvider
//             .when("/", {
//              templateUrl: '/foldingathome/fah-studies.html',
//                 controller: 'mainController'
//             })
//             .when("/fah-study", {
//                 templateUrl: '/foldingathome/fah-study.html',
//                 controller: 'fahStudyController'
//             })
//             .when("/fah-project", {
//                 templateUrl: '/foldingathome/fah-project.html',
//                 controller: 'fahProjectController'
//             })
//             .when("/fah-clone", {
//                 templateUrl: '/foldingathome/fah-clone.html',
//                 controller: 'fahCloneController'
//             })
//             .when("/fah-run", {
//                 templateUrl: '/foldingathome/fah-run.html',
//                 controller: 'fahRunController'
//             });
//     }
// );

fahApp.config([
    '$httpProvider',
    function ($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
]);
