website.controller('WebsiteController', ['$scope', function($scope) {
  $scope.projects = [
    {
      // Portfolio Website
  		src: 'Images/Portfolio_Website.jpg',
      href: '1LordPheonix1.github.io/Portfolio%20Website/index.html',
      id: 1,
      description: "My Portfolio Website that has been created in 2 weeks.",
    },
    {
      // Agatha Cristie Project 2015-2016
      src: 'Images/Agatha_Cristie_Project_2015-2016.jpg',
      href: 'https://www.codecademy.com/1LordPheonix12/codebits/xeKDli',
      id: 2,
      description: "My Agatha Christie Poster Project for my 7th Grade ELA Teacher, in which I created a 'travel agency' that advertised going to Torquay (Home of the late Agatha Christie) and plan a vacation there while staying under the budget of $5,000.",
    },
    {
      // Math Vacation Project 2015-2016
      src: 'Images/Math_Vacation_Project_2015-2016.jpg',
      href: 'https://www.codecademy.com/1LordPheonix12/codebits/8qbpmR',
      id: 3,
      description: "My Math Vacation Project for my 7th Grade Math Teacher, in which my group had to pick a place to go to in the continental U.S. and had to 'have' a Vacation as long as we stayed under the budget of $4,500.",
    },{
     // 5 Themes of Geography
      src: '../Images/Portfolio_Website.jpg',
      href: '../Projects/8th%20Grade/5-Themes-Of-Geography/index.html',
      id: 4,
      description: "My 5 Themes of Geography project that I made for my 8th Grade World Geography teacher, Ms. Barber. It was created in less than a week.",
    }];

  $scope.projectDescription = function(index) {
    var answer = confirm($scope.projects[index].description + ' Go to the project page?');
    if (answer) {location.assign($scope.projects[index].href)};
  }
}]);
