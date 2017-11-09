var fahApp = angular.module('fahApp', ['ngRoute', 'ngTableToCsv']);

fahApp.config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
]);
fahApp.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

fahApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
        .when('/:study/:project/:run', {
            templateUrl: '/foldingathome/fah-run.html',
            controller: 'runController'
        })
}])

fahApp.factory('service', function ($http, $cacheFactory) {
    var getProjectSummary = function (apiUrl) {
        return $http({ method: "GET", cache:true, url: apiUrl }).then(function (result) {
            return result.data
        })
    }
    var getRunSummary = function (apiUrl) {
        return $http({ method: "GET", cache: true, url: apiUrl }).then(function (result) {
            return result.data
        })
    }
    var getCloneSummary = function (study, project, clone) {
        return 0
    }
    return {
        getProjectSummary: getProjectSummary,
        getRunSummary: getRunSummary,
        getCloneSummary: getCloneSummary
    }
});

// MAIN CONTROLLER FOR FAH STUDIES, NAVIGATES TO INDIVIDUAL STUDIES
fahApp.controller('mainController',
    function ($scope, $location, $http) {

        $scope.retrieveProjectList = function () {
            $http.get('/foldingathome/api/projectList')
                .then(function (data) {
                    $scope.projectList = data.data
                    $scope.studies = buildTable($scope.projectList)
                })
        }

        function buildTable(projectList) {
            var projectGroups = groupBy(projectList, project => project.projType)
            var studies = [];
            projectGroups.forEach(function (study, key) {
                var simCount = 0
                study.forEach(function (project, key) {
                    simCount += project.numClone * project.numRun
                })
                var projectCount = study.length
                var currStudy = {
                    'molecule': key,
                    'projectCount': projectCount,
                    'simCount': nFormatter(simCount)
                }
                studies.push(currStudy)
            });
            return studies
        }

        $scope.navigateToStudy = function (study) {
            $location.path("/" + study).search({ study: study })
        }
    }
)

// CONTROLLER FOR SELECTED STUDY, NAVIGATES TO PROJECT
fahApp.controller('studyController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service',
    function ($scope, $routeParams, $http, $location, $route, $window, service) {
        $scope.study = $routeParams.study
        $scope.receivedResponse = 0
        $scope.retrieveProjectList = function () {
            $scope.apiUrl = '/foldingathome/api/' + $scope.study + '_project_summary/'
            var projectSummaryPromise = service.getProjectSummary($scope.apiUrl)
            projectSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
            // $scope.data = [{'Proj': 8202}]
            // $scope.keys = Object.keys($scope.data[0])
            // $scope.receivedResponse = 1
        }
        $scope.refreshProjectSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveProjectList()
        }
        // NAVIGATE TO PROJECT CLICK
        $scope.navigateToProject = function (project) {
            $location.path("/" + $scope.study + "/" + project).search({ project: project })
        }
        $scope.backToStudiesTable = function () {
            window.history.back(-1)
        };
    }
])

// CONTROLLER FOR SELECTED PROJECT, NAVIGATES TO RUN
fahApp.controller('projectController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service', '$cacheFactory',
    function ($scope, $routeParams, $http, $location, $route, $window, service, $cacheFactory) {
        $scope.study = $routeParams.study
        $scope.project = $routeParams.project
        $scope.receivedResponse = 0
        $scope.retrieveRunList = function () {
            $scope.apiUrl = '/foldingathome/api/' + $scope.study + '_project_run_summary/?project=' + $scope.project
            var runSummaryPromise = service.getRunSummary($scope.apiUrl)
            $scope.receivedResponse = 0
            runSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
        }
        $scope.refreshRunSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveRunList()
        }

        // NAVIGATE TO RUN CLICK
        $scope.navigateToRun = function (run) {
            $location.path("/" + $scope.study + "/" + $scope.project + "/" + run).search({ run: run })
        }
        $scope.backToProjectsTable = function () {
            window.history.back(-1)
        };
    }
])

// CONTROLLER FOR SELECTED RUN, NAVIGATES TO CLONE
fahApp.controller('runController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service',
    function ($scope, $routeParams, $http, $location, $route, $window, service) {
        $scope.study = $routeParams.study
        $scope.project = $routeParams.project
        $scope.run = $routeParams.run
        $scope.receivedResponse = 0
        $scope.retrieveCloneList = function () {
            var cloneSummaryPromise = service.getCloneSummary($scope.study, $scope.project, $scope.run)
            cloneSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
        }
        $scope.backToRunsTable = function () {
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