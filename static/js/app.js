var fahApp = angular.module('fahApp', ['ngRoute', 'ngTableToCsv']);

fahApp.config([
    '$httpProvider',
    function ($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
]);
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
    .when('/:study/:project', {
        templateUrl: '/foldingathome/fah-project.html',
        controller: 'projectController'
    })
}])

fahApp.factory('service', function($http){
    var getProjectSummary = function(study){
        return $http({method: "GET", url:'/foldingathome/api/' + study + '_project_summary/'}).then(function(result){
            return result.data
        })
    }
    var getRunSummary = function(study, project){
        return $http({method: "GET", url:'/foldingathome/api/' + study + '_project_run_summary/?project=' + project}).then(function(result){
            return result.data
        })
    }
    return {getProjectSummary: getProjectSummary,
            getRunSummary: getRunSummary}
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
            $location.path("/" + study).search({study:study})   
        }
    }
)

// controller for fah study table, navigates to project
fahApp.controller('studyController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service',
    function($scope, $routeParams, $http, $location, $route, $window, service){
        $scope.study = $routeParams.study
        $scope.receivedResponse = 0
        $scope.retrieveProjectList = function(){
            // var projectSummaryPromise = service.getProjectSummary($scope.study)
            // var projectSummaryPromise = service.test()
            // projectSummaryPromise.then(function(result){
            //     $scope.data = result
            //     $scope.keys = Object.keys($scope.data[0])
            //     $scope.receivedResponse = 1
            // });
            $scope.data = [{'Proj': 8202}]
            $scope.keys = Object.keys($scope.data[0])
            $scope.receivedResponse = 1
        }

        // navigate to study
        $scope.navigateToProject = function(project){
            console.log(project)
            $location.path("/" + $scope.study + "/" + project).search({project:project})   
        }        

        // navigate back
        $scope.backToStudiesTable = function() {
            window.history.back(-1)
        };
    }
])

// controller for project table, navigates to run
fahApp.controller('projectController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service',
    function($scope, $routeParams, $http, $location, $route, $window, service){
        $scope.study = $routeParams.study
        $scope.project = $routeParams.project
        $scope.receivedResponse = 0
        $scope.retrieveRunList = function(){
            var runSummaryPromise = service.getRunSummary($scope.study, $scope.project)
            projectSummaryPromise.then(function(result){
                // $scope.data = result
                // $scope.keys = Object.keys($scope.data[0])
                // $scope.receivedResponse = 1
            });
        }
        $scope.backToStudiesTable = function() {
            window.history.back(-2)
        };
        $scope.backToProjectsTable = function() {
            window.history.back(-1)
        };
    }
])



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