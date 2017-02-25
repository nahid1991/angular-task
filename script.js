(function(angular) {
  'use strict';
angular.module('myApp.service', []);

/**
 * Directive that ensures the `myNum` model is always number
 */
angular.module('myApp.directive', []).directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});


/**
 * A filter that sorts an array of object by their `name` attribute
 */
angular.module('myApp.filter', []).filter('sortByName',function(){
  return function(a){
    return a.sort(function(a,b){
      return (a.name>b.name);
    });
  }
});

/**
 * Factory for sharing data between two controller 👉 `homeCtrl` and `validatorCtrl`
 */
angular.module('myApp.factory',[]).factory('myNum', function(){
  return { amount: 0 };
});


angular.module('myApp', ['myApp.service', 'myApp.directive', 'myApp.filter', 'myApp.factory' ,'ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
     $urlRouterProvider.otherwise('/');
     $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partial-home.html',
            controller: 'homeCtrl'
        })
        .state('home.trump', {
            url: '/trump',
            template: 'huuuuugee! 😳'
        })
        .state('validator',{
          url: '/validator',
          templateUrl: 'partial-inputValidator.html',
          controller: 'validatorCtrl'
        })
        .state('sortName',{
          url: '/sortName',
          templateUrl: 'partial-nameSort.html',
          controller: 'nameCtrl'
        });
  })
  .controller('homeCtrl', function($scope, myNum){
    $scope.myNum = myNum;
  })
  .controller('validatorCtrl', function($scope, myNum){
    $scope.myNum = myNum;
  })
  .controller('nameCtrl', function($scope) {
    $scope.db = [
      {id: 3, name: "rahman"},
      {id: 1, name: "bashar"},
      {id: 2, name: "anwar"}
    ];
  });
  
})(window.angular);