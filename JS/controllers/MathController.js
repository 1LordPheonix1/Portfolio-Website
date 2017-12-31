math.controller('MathController', ['$scope', function($scope) {
  $scope.projects = [
  	{
      // LorenzAttractor
  		src: 'Images/LorenzAttractor.gif',
      href: 'Projects/LorenzAttractor/index.html',
      id: 1,
      description: "Lorenz Attractor Simulation",
  	},
    {
      // LinearRegression
      src: 'Images/LinearRegression.svg.png',
      href: 'Projects/LinearRegression/index.html',
      id: 2,
      description: "Linear Regression Simulation"
    }
  ];

  $scope.projectDescription = function(index) {
    var answer = confirm($scope.projects[index].description + ' Go to the project page?');
    if (answer) {location.assign($scope.projects[index].href)};
  }
}]);
