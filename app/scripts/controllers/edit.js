'use strict';

/**
 * @ngdoc function
 * @name virusApp.controller:EditCtrl
 * @description
 * # EditCtrl
 * Controller to update a single virus
 */
angular.module('virusApp')
  .controller('EditCtrl', function ($scope,$location) {

    // Likely not the best way to do this, but it works!
    var index = $location.url().split('=')[1];

    // go home if there's no index provided
    if(!index) {
      $location.path('/').search('');
      return false;
    }
    
    // Impossible to get here without data!
    $scope.viruses = JSON.parse(localStorage.getItem('viruses'));
    
    $scope.virus = $scope.viruses[index];

    // copy over all the things!
    $scope.name = $scope.virus.name;
    $scope.description = $scope.virus.description;
    $scope.date = $scope.virus.date;

    $scope.levels = [
      { name: 'very low' },
      { name: 'low' },
      { name: 'medium' },
      { name: 'high' },
      { name: 'very high' }
    ];

    $scope.newlevel = $scope.levels;

    // find out what the selected option is
    function getSelectedOption() {
      for( var i = 0; i < $scope.levels.length; i++ ) {
        if( $scope.levels[i].name === $scope.virus.level ) {
          return $scope.levels[i];
        }
      }
    }

    $scope.selectedOption = getSelectedOption();

    // automatically update our localStorage if anything changes
    $scope.$watch('viruses', function () {
      localStorage.setItem('viruses', JSON.stringify($scope.viruses));
    }, true);

    // Save data
    $scope.save = function() {
      $scope.virus.name = $scope.name;
      $scope.virus.description = $scope.description;
      $scope.virus.level = $scope.selectedOption.name;
      $scope.virus.date = $scope.date;

      // go back to main page after updating
      $location.path('/').search('');
    };
  });
