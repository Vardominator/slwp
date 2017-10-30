var fahApp = angular.module('fahControllers', ['nvd3']);


// fahControllers.controller('fahStudiesController', ['$scope', '$routeParams', '$http', '$location', '$route', '$window',
//     function($scope, $routeParams, $http, $location, $route, $window){
//         $scope.message = 'Everyone come and see how good I look!';
        
//         $scope.navigateToStudy = function(study){
//             $location.url("/").search({study: study});
//         }

//     }
// ])

fahApp.controller('mainController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

fahApp.controller('fahStudyController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http){
        $scope.message = "study";
        console.log($routeParams.study);
    }
])

// fahControllers.controller('fahCompletedController', ['$scope', '$routeParams', '$http',
//     function($scope, $routeParams, $http){
    
//         $scope.currentProject = "1797";
//         $scope.currentRun = "0";
//         $scope.currentClone = "0";
//         $scope.currentAttribute = "rmsd";

//         $scope.loadProjectNumbers = function(){
//             $http.get('/foldingathome/api/project/')
//             .then(function(data){
//                 $scope.projects = data.data;
//             })       
//         }        
        
//         $scope.loadChartData = function (){
            
//             if($scope.currentProject != "" &&
//                $scope.currentRun != "" && 
//                $scope.currentClone != "" &&
//                $scope.currentAttribute != "")
//             {
//                 var chartData = [{"key":$scope.currentAttribute, "values":[]}]
//                 $http.get('/foldingathome/api/timeattribute/?project_number=' + $scope.currentProject + 
//                         '&run_number=' + $scope.currentRun + 
//                         '&clone_number=' + $scope.currentClone + 
//                         '&attribute_name=' + $scope.currentAttribute)
//                 .then(function(data){
                    
//                     var currentData = data.data;
//                     var times = currentData.map(function(item){return item["time_number"];});
//                     var attributeVals = currentData.map(function(item){return parseFloat(item["value"]); });
                    
//                     for(var i = 0; i < currentData.length; i++){
//                         chartData[0].values.push(
//                             {"x": times[i], "y": attributeVals[i]}
//                         );
//                     }
//                     $scope.currentChartData = chartData;
//                     $scope.api.refresh();
//                 })
//             }
//         };


//         // NVD3 CHART OPTIONS
//         $scope.options = {
//             chart: {
//                 type: 'lineChart',
//                 height: 450,
//                 color: d3.scale.category10().range(),
//                 scatter: {
//                     onlyCircles: false
//                 },
//                 showDistX: true,
//                 showDistY: true,
//                 duration: 350,
//                 xAxis: {
//                     axisLabel: 'TIME',
//                     tickFormat: function(d){
//                         return d3.format('.02f')(d);
//                     }
//                 },
//                 yAxis: {
//                     axisLabel: 'RMSD',
//                     tickFormat: function(d){
//                         return d3.format('.02f')(d);
//                     },
//                     axisLabelDistance: -5
//                 },
//                 zoom: {
//                     //NOTE: All attributes below are optional
//                     enabled: true,
//                     scaleExtent: [1, 10],
//                     useFixedDomain: false,
//                     useNiceScale: false,
//                     horizontalOff: false,
//                     verticalOff: false,
//                     unzoomEventType: 'dblclick.zoom'
//                 }
//             }
//         };

//         $scope.config = {
//             visible: true, // default: true
//             extended: false, // default: false
//             disabled: false, // default: false
//             refreshDataOnly: true, // default: true
//             deepWatchOptions: true, // default: true
//             deepWatchData: true, // default: true
//             deepWatchDataDepth: 2, // default: 2
//             debounce: 10 // default: 10
//         };

//         // $http.get('/foldingathome/api/timeattribute/?project_number=1797&run_number=1&clone_number=0&attribute_name=rmsd')
//         // .then(function(data){
//         //     $scope.data = data.data;
//         //     $scope.times = $scope.data.map(function(item){return item["time_number"]; });
//         //     $scope.rmsd = $scope.data.map(function(item){return parseFloat(item["value"]); });
//         //     console.log($scope.rmsd);
//         //     $scope.chartData = [{"key":"RMSD", "values":[]}]

//         //     for(var i = 0; i < $scope.data.length; i++){
//         //         $scope.chartData[0].values.push(
//         //             {"x": $scope.times[i], "y": $scope.rmsd[i]}
//         //         );
//         //     }
//         // });

//     }
// ])


