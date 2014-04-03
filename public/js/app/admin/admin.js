var admin = angular.module('admin', ['ngRoute']);

admin.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/admin', {
        templateUrl: 'admin/admin.tpl.html',
        controller: 'AdminCtrl'
    });
}]);


admin.controller('AdminCtrl', ['$scope', '$location', function ($scope, $location) {

}]);