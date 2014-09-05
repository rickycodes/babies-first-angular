'use strict';

/**
 * @ngdoc function
 * @name virusApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the virusApp, add and remove virus to localStorage
 */
angular.module('virusApp')
  .controller('MainCtrl', function($scope, $window, $location, Pagination) {

    // paginate
    $scope.pagination = Pagination.getNew(10);

    // check localStorage for existing viruses
    $scope.saved = localStorage.getItem('viruses');

    // if viruses exist, parse em/set em. Otherwise, make it an empty array
    $scope.viruses = ($scope.saved !== null) ? JSON.parse($scope.saved) : [];

    $scope.pagination.numPages = Math.ceil($scope.viruses.length/$scope.pagination.perPage);

    // levels of severity
    $scope.levels = [
      { name: 'very low' },
      { name: 'low' },
      { name: 'medium' },
      { name: 'high' },
      { name: 'very high' }
    ];

    $scope.newlevel = $scope.levels;

    // automatically update our localStorage if anything changes
    $scope.$watch('viruses', function () {
      localStorage.setItem('viruses', JSON.stringify($scope.viruses));
    }, true);

    // Methods

    // add virus to list
    $scope.add = function () {
      // very basic input validation
      if(!$scope.name || !$scope.description || !$scope.newlevel.name || !$scope.date) {
        $window.alert('Pls fill out all the details TY');
      } else {
        // push all the datas!
        $scope.viruses.push({
          name: $scope.name,
          description: $scope.description,
          level: $scope.newlevel.name,
          date: $scope.date
        });
      }
    };

    // remove virus from list
    $scope.remove = function (index) {
      $scope.viruses.splice(index, 1);
    };

    // goto edit page
    $scope.goto = function(index) {
      $location.path('/edit').search('num='+index);
    };
  });
