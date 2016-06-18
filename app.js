var app= angular.module('flapperNews', ['ui.router']);


app.config(['$stateProvider', '$urlRouteProvider', function($stateProvider, $urlRouteProvider){

  $stateProvider
    .state('home',{  //setting our home route name
      url: '/home',  //settig home url
      templateUrl: '/home.html',  //telling it to use home template
      controller: 'MainCtrl'  //telling angulr to controle this state with mainctrl
    })

  $urlRouteProvider.otherwise('home');  //if templ not available then set automaticaly to home
}]);  //after this, set a home templ, we will do this in index.html


// creating posts factory bc we will need it in our entire app, so its stored in one place and available everywhwre
app.factory('posts', [function(){
  var o = {   // want to create an object that will hold on to our array of posts
    posts:[]
  };
  return o; //need to return it so its available outside for use, for any other modules that want to onject it
}]);



// need to inject the services into the controler so we can access its data later
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
  $scope.test= "hello world";

  $scope.posts= posts.post; //need to bind our posts array to the scope to display


// LLETTING USER ADD NEW POSTS, when invoked it will push the new post into our posts array
  $scope.addPost= function(){

    if(!$scope.title || $scope.title === '') {return;}  //if the input field is not filled then dont allow to post

    $scope.posts.push({   //pushes user input to the array
      title: $scope.title, 
      link: $scope.link,
      upvotes:0
    }); 

    $scope.title = ' '; //resets input box to clear
    $scope.link = ' ';
  };


  $scope.incrementUpvotes= function(post){
    post.upvotes ++;
  };


}]);

// $scope allows controller to interact and share data with templates
// ng-model binds the user input to the $scope

// FACTORY is a type of service that operates as a singleton tzn:
// data u put in a FACTORY will be available thruout the entire application naytime. its one copy

// services like controllers are declared in app.js

// routing for uploading templates when we go to different sites. use ui.router
// its an externa module we use in out app so needs to be injected into our app.module. 
// ui.router is more flexible and has more features then ng-route
// after adding it, we need to configure it