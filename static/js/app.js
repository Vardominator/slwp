var fahApp = angular.module('fahApp', ['ngRoute', 'ngTableToCsv', 'nvd3', 'rzModule']);

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
            templateUrl: '/slwp/foldingathome/fah-studies-table.html',
            controller: 'mainController'
        })
        .when('/:study', {
            templateUrl: '/slwp/foldingathome/fah-study.html',
            controller: 'studyController'
        })
        .when('/:study/:project', {
            templateUrl: '/slwp/foldingathome/fah-project.html',
            controller: 'projectController'
        })
        .when('/:study/:project/:run', {
            templateUrl: '/slwp/foldingathome/fah-run.html',
            controller: 'runController'
        })
        .when('/:study/:project/:run/:clone', {
            templateUrl: '/slwp/foldingathome/fah-clone.html',
            controller: 'cloneController'
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
    var getCloneSummary = function (apiUrl) {
        return $http({ method: "GET", cache: true, url: apiUrl }).then(function (result) {
            return result.data
        })
    }
    var getCloneDetail = function (apiUrl) {
        return $http({ method: "GET", cache: true, url: apiUrl }).then(function (result) {
            return result.data
        })
    }
    return {
        getProjectSummary: getProjectSummary,
        getRunSummary: getRunSummary,
        getCloneSummary: getCloneSummary,
        getCloneDetail: getCloneDetail
    }
});

// MAIN CONTROLLER FOR FAH STUDIES, NAVIGATES TO INDIVIDUAL STUDIES
fahApp.controller('mainController',
    function ($scope, $location, $http) {
        $scope.retrieveProjectList = function () {
            $http.get('/slwp/foldingathome/api/projectList')
                .then(function (data) {
                    $scope.projectList = data.data
                    $scope.studies = buildTable($scope.projectList)
                })
        }
        $scope.refreshStudiesSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveProjectList()
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
fahApp.controller('studyController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service', '$cacheFactory',
    function ($scope, $routeParams, $http, $location, $route, $window, service, $cacheFactory) {
        $scope.study = $routeParams.study
        $scope.receivedResponse = 0
        
        $scope.retrieveProjectList = function () {        
            $scope.apiUrl = '/slwp/foldingathome/api/' + $scope.study + '_project_summary/'
            var projectSummaryPromise = service.getProjectSummary($scope.apiUrl)
            projectSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
        }
        $scope.refreshProjectSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveProjectList()
        }

        $scope.onSliderChange = function() {
            // user finished sliding a handle
            $scope.filteredData = $scope.data.slice(0)
            var key = $scope.activeKey
            var min = $scope.slider.min
            var max = $scope.slider.max
            $scope.filteredData = $scope.filteredData.filter(function(p){
                return p[key] >= min && p[key] <= max
            })
        }
        $scope.slider = {
            value: 0,
            options: {
              floor: 0,
              ceil: 0,
              step: 0.01,
              precision: 2,
              onEnd: $scope.onSliderChange
            }
        }
        $scope.changeActiveKey = function(key){
            $scope.filteredData = $scope.data.slice(0)
            $scope.activeKey = key
            var maxVal = Math.max.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            var minVal = Math.min.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            if(minVal % 1 == 0){
                $scope.slider.options.step = 1
            }else{
                $scope.slider.options.step = 0.01
            }     
            $scope.slider.max = maxVal
            $scope.slider.min = minVal
            $scope.slider.options.ceil = maxVal
            $scope.slider.options.floor = minVal
        }

        // NAVIGATE TO PROJECT CLICK
        $scope.navigateToProject = function (project) {
            $location.path("/" + $scope.study + "/" + project).search({ project: project })
        }
        // NAVIGATE BACK USING BREADCRUMB
        $scope.backToStudiesTable = function () { window.history.back() };

    }
])

// CONTROLLER FOR SELECTED PROJECT, NAVIGATES TO RUN
fahApp.controller('projectController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service', '$cacheFactory',
    function ($scope, $routeParams, $http, $location, $route, $window, service, $cacheFactory) {
        $scope.study = $routeParams.study
        $scope.project = $routeParams.project
        $scope.receivedResponse = 0
        $scope.retrieveRunList = function () {
            $scope.apiUrl = '/slwp/foldingathome/api/' + $scope.study + '_project_run_summary/?project=' + $scope.project
            var runSummaryPromise = service.getRunSummary($scope.apiUrl)
            $scope.receivedResponse = 0
            runSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.filteredData = $scope.data.slice(0)
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
        }
        $scope.refreshRunSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveRunList()
        }

        $scope.onSliderChange = function() {
            // user finished sliding a handle
            $scope.filteredData = $scope.data.slice(0)
            var key = $scope.activeKey
            var min = $scope.slider.min
            var max = $scope.slider.max
            $scope.filteredData = $scope.filteredData.filter(function(p){
                return p[key] >= min && p[key] <= max
            })
        }
        $scope.slider = {
            value: 0,
            options: {
              floor: 0,
              ceil: 0,
              step: 0.01,
              precision: 2,
              onEnd: $scope.onSliderChange
            }
        }
        $scope.changeActiveKey = function(key){
            $scope.filteredData = $scope.data.slice(0)
            $scope.activeKey = key
            var maxVal = Math.max.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            var minVal = Math.min.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            if(minVal % 1 == 0){
                $scope.slider.options.step = 1
            }else{
                $scope.slider.options.step = 0.01
            }     
            $scope.slider.max = maxVal
            $scope.slider.min = minVal
            $scope.slider.options.ceil = maxVal
            $scope.slider.options.floor = minVal
        }

        // NAVIGATE TO RUN CLICK
        $scope.navigateToRun = function (run) {
            $location.path("/" + $scope.study + "/" + $scope.project + "/" + run).search({ run: run })
        }

        // NAVIGATE BACK USING BREADCRUMB
        $scope.backToStudiesTable = function () { window.history.go(-2) };
        $scope.backToProjectsTable = function () { window.history.back() };
    }
])

// CONTROLLER FOR SELECTED RUN, NAVIGATES TO CLONE
fahApp.controller('runController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service', '$cacheFactory',
    function ($scope, $routeParams, $http, $location, $route, $window, service, $cacheFactory) {
        $scope.study = $routeParams.study
        $scope.project = $routeParams.project
        $scope.run = $routeParams.run
        $scope.receivedResponse = 0
        $scope.retrieveCloneList = function () {
            $scope.apiUrl = '/slwp/foldingathome/api/' + $scope.study + '_project_run_clone_summary/?project=' + $scope.project + 
                                                                                              '&run=' + $scope.run;
            var cloneSummaryPromise = service.getCloneSummary($scope.apiUrl)
            cloneSummaryPromise.then(function (result) {
                $scope.data = result
                $scope.filteredData = $scope.data.slice(0)
                $scope.keys = Object.keys($scope.data[0])
                $scope.receivedResponse = 1
            });
        }
        $scope.refreshCloneSummary = function(){
            var cache = $cacheFactory.get('$http')
            cache.remove($scope.apiUrl)
            $scope.retrieveCloneList()
        }

        $scope.onSliderChange = function() {
            // user finished sliding a handle
            $scope.filteredData = $scope.data.slice(0)
            var key = $scope.activeKey
            var min = $scope.slider.min
            var max = $scope.slider.max
            $scope.filteredData = $scope.filteredData.filter(function(p){
                return p[key] >= min && p[key] <= max
            })
        }
        $scope.slider = {
            value: 0,
            options: {
              floor: 0,
              ceil: 0,
              step: 0.01,
              precision: 2,
              onEnd: $scope.onSliderChange
            }
        }
        $scope.changeActiveKey = function(key){
            $scope.filteredData = $scope.data.slice(0)
            $scope.activeKey = key
            var maxVal = Math.max.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            var minVal = Math.min.apply(Math, $scope.data.map(function(row) { return row[key]; }))
            if(minVal % 1 == 0){
                $scope.slider.options.step = 1
            }else{
                $scope.slider.options.step = 0.01
            }     
            $scope.slider.max = maxVal
            $scope.slider.min = minVal
            $scope.slider.options.ceil = maxVal
            $scope.slider.options.floor = minVal
        }

        // NAVIGATE TO CLONE DETAIL
        $scope.navigateToClone = function (clone) {
            $location.path("/" + $scope.study + "/" + $scope.project + "/" + $scope.run + "/" + clone).search({ clone: clone })
        }

        // NAVIGATE BACK USING BREADCRUMB
        $scope.backToStudiesTable = function () { window.history.go(-3) };
        $scope.backToProjectsTable = function () { window.history.go(-2) };
        $scope.backToRunsTable = function () { window.history.back() };
    }
])

// CONTROLLER FOR SELECTED CLONE
fahApp.controller('cloneController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window', 'service', '$cacheFactory',
function ($scope, $routeParams, $http, $location, $route, $window, service, $cacheFactory) {
    $scope.study = $routeParams.study
    $scope.project = $routeParams.project
    $scope.run = $routeParams.run
    $scope.clone = $routeParams.clone
    $scope.receivedResponse = 0
    $scope.retrieveCloneDetail = function (active) {
        $scope.apiUrl = '/slwp/foldingathome/api/' + $scope.study + '_project_run_clone_detail/?project=' + $scope.project + 
                                                                                          '&run=' + $scope.run +
                                                                                          '&clone=' + $scope.clone;
        var cloneDetailPromise = service.getCloneDetail($scope.apiUrl)
        cloneDetailPromise.then(function (result) {
            $scope.data = result
            $scope.filteredData = $scope.data.slice(0)
            $scope.keys = Object.keys($scope.data[0])
            $scope.plotKeys = $scope.keys.filter(function(key){
                return ["proj", "run", "clone", "frame", "dssp", "dateacquried", "timeacquired"].indexOf(key) === -1
            })
            $scope.currentAttribute = $scope.plotKeys[0]
            $scope.receivedResponse = active
        });
    }
    $scope.refreshCloneDetail = function(active){
        var cache = $cacheFactory.get('$http')
        cache.remove($scope.apiUrl)
        $scope.retrieveCloneDetail(active)
    }

    $scope.downloadPlot = function(){
        saveSvgAsPng(document.getElementById("plot"), "plot.png")
    }

    $scope.onSliderChange = function() {
        // user finished sliding a handle
        $scope.filteredData = $scope.data.slice(0)
        var key = $scope.activeKey
        var min = $scope.slider.min
        var max = $scope.slider.max
        $scope.filteredData = $scope.filteredData.filter(function(p){
            return p[key] >= min && p[key] <= max
        })
    }
    $scope.slider = {
        value: 0,
        options: {
          floor: 0,
          ceil: 0,
          step: 0.001,
          precision: 3,
          onEnd: $scope.onSliderChange
        }
    }
    $scope.changeActiveKey = function(key){
        $scope.filteredData = $scope.data.slice(0)
        $scope.activeKey = key
        var maxVal = Math.max.apply(Math, $scope.data.map(function(row) { return row[key]; }))
        var minVal = Math.min.apply(Math, $scope.data.map(function(row) { return row[key]; }))
        if(minVal % 1 == 0){
            $scope.slider.options.step = 1
        }else{
            $scope.slider.options.step = 0.001
        }     
        $scope.slider.max = maxVal
        $scope.slider.min = minVal
        $scope.slider.options.ceil = maxVal
        $scope.slider.options.floor = minVal
    }

    // SWITCH BETWEEN DATA TABLE AND PLOT
    $scope.tablePlotSwitch = function(active){
        $scope.receivedResponse = active
    }

    // NAVIGATE BACK USING BREADCRUMB
    $scope.backToStudiesTable = function () { window.history.go(-4) };
    $scope.backToProjectsTable = function () { window.history.go(-3) };
    $scope.backToRunsTable = function () { window.history.go(-2) };
    $scope.backToClonesTable = function () { window.history.back() };

    // ALL THINGS PLOTTING
    $scope.loadChartData = function (key){
        $scope.currentAttribute = key
        var chartData = [{"key":$scope.currentAttribute, "values":[]}]
        var times = $scope.data.map(function(item){return item["frame"];})
        var attributeVals = $scope.data.map(function(item){return parseFloat(item[$scope.currentAttribute]); })
        for(var i = 0; i < times.length; i++){
            chartData[0].values.push({"x": times[i], "y": attributeVals[i]})
        }
        $scope.options.chart.yAxis.axisLabel = $scope.currentAttribute
        $scope.currentChartData = chartData
    }

    // NVD3 CHART OPTIONS
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            color: d3.scale.category10().range(),
            scatter: {
                onlyCircles: false
            },
            showDistX: true,
            showDistY: true,
            duration: 350,
            showLegend: false,
            xAxis: {
                axisLabel: 'frame',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                }
            },
            yAxis: {
                axisLabel: '',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -5
            },
            zoom: {
                //NOTE: All attributes below are optional
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: false,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };

    $scope.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        refreshDataOnly: true, // default: true
        deepWatchOptions: true, // default: true
        deepWatchData: true, // default: true
        deepWatchDataDepth: 2, // default: 2
        debounce: 10 // default: 10
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