var todos = angular.module('todos', ['ngRoute']);

todos.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/todos', {
        templateUrl: 'todos/todos.tpl.html',
        controller: 'TodosCtrl'
    });
}]);


todos.controller('TodosCtrl', ['$scope', '$location', function ($scope, $location) {

}]);