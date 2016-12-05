(function(angular) {
  'use strict';
angular.module('aplicacion', ['ngRoute'])

 .controller('PrincipalController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams; //Inicialmente {}, y luego en el ejemplo no vuelve a ejecutarse esta linea.
 })

 .controller('LibroController', function($scope, $routeParams) {
     $scope.nombre = 'LibroController';
     $scope.parametros = $routeParams;
 })

 .controller('CapituloController', function($scope, $routeParams) {
     $scope.nombre = 'CapituloController';
     $scope.parametros = $routeParams;
 })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/libro/:libroId', {
    templateUrl: 'libro.html',
    controller: 'LibroController',
    resolve: {
      // Creamos un retardo de 3 segundos, para simular la petición 
      // Así vemos que el acceso a las variables de $scope tarda más en pintarse
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 3000);
        return delay.promise;
      }
    }
  })
  .when('/libro/:libroId/capitulo/:capituloId', {
    templateUrl: 'capitulo.html',
    controller: 'CapituloController'
  });

  // Para que los links funcionen, sino dirá que no encuentra...
  $locationProvider.html5Mode(true);

});
})(window.angular);

/*
Basado en https://docs.angularjs.org/api/ngRoute/service/$route
*/