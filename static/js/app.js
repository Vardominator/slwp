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

fahApp.factory('service', function($http){
    var getProjectSummary = function(study){
        return $http({method: "GET", url:'/foldingathome/api/' + study + '_project_summary/'}).then(function(result){
            return result.data
        })
    }
    return {getProjectSummary: getProjectSummary}
});

// main controller for fah studies, navigates to individual studies
fahApp.controller('mainController',
    function($scope, $location, $http) {

        $scope.retrieveProjectList = function(){
            $http.get('/foldingathome/api/projectList')
            .then(function(data){
                $scope.projectList = data.data
                $scope.studies = buildTable($scope.projectList)
            })
        }

        function buildTable(projectList){
            var projectGroups = groupBy(projectList, project => project.projType)
            var studies = [];
            projectGroups.forEach(function(study, key) {
                var simCount = 0
                study.forEach(function(project, key){
                    simCount += project.numClone * project.numRun
                })
                var projectCount = study.length
                var currStudy = {'molecule': key,
                                 'projectCount': projectCount, 
                                 'simCount': nFormatter(simCount)
                }
                studies.push(currStudy)
            });
            return studies
        }

        $scope.navigateToStudy = function(study){
            $location.path("/" + study).search({study:study});   
        }
    }
)

// controller for fah study table, navigates to individual clones
fahApp.controller('studyController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service',
    function($scope, $routeParams, $http, $location, $route, $window, service){
        $scope.study = $routeParams.study;
        console.log($scope.study)
        $scope.retrieveProjectList = function(){
            var projectSummaryPromise = service.getProjectSummary($scope.study)
            projectSummaryPromise.then(function(result){
                $scope.data = result
                $scope.keys = Object.keys($scope.data[0])
                console.log($scope.keys)
                console.log($scope.data)
            });
            // var url = '/foldingathome/api/' + $scope.study + '_project_summary/'
            // console.log(url)
            // $http.get(url)
            // .then(function(data){
            //     var projectSummary = data.data
            //     console.log(projectSummary)
            //     // var projectGroups = groupBy(projectList, project => project.projType)
            //     // $scope.study = projectGroups.get($scope.study)
            //     // console.log($scope.study)
            // })
        }
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


// helpers
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}