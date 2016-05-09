var app = angular.module("phonesApp", ['ngRoute']);

//controllers
app.controller('phoneListCtrl', ['$scope','$http',  function($scope, $http, phoneDetailCtrl){
    $http.get('phones/phones.json')
        .success(function(data){
        $scope.phones  = data;
        $scope.orderProp = 'age';
    })
        .error(function(){
        console.log("json not loaded/received");
    });
}]);

app.controller('phoneDetailCtrl',['$scope','$http', '$routeParams', function($scope,$http , $routeParams){
    $http.get('phones/' + $routeParams.phoneId + '.json')
        .success(function(data){
        $scope.phone = data;
        $scope.mainImageUrl = data.images[0];   //default image
        $scope.setImage = function(img){
            $scope.mainImageUrl = img;
        }
    })
        .error(function(){console.log("Phone details not received");});
}]);



//configs
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/phones', {
        templateUrl: 'partials/phoneList.html',
        controller: 'phoneListCtrl'
    })
    .when('/phones/:phoneId', {
        templateUrl: 'partials/phoneDetail.html',
        controller: 'phoneDetailCtrl'
    })
    .otherwise({
        redirectTo: '/phones'
      });
}]);