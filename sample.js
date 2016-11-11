var app = angular.module('app', ['ui.router', 'ui.bootstrap']);
app.factory('chakridb',function(){
	var chakridb={};

	chakridb.get=function(){
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('chakri.db');
console.log(chakridb);
return db;
};
return chakridb;
});
 app.config( function( $stateProvider, $urlRouterProvider) {
       $stateProvider
           .state('login', {
               url: '/',
               templateUrl: 'loginpage.html',
               controller: 'loginController'
               
           })
            .state('forgot', {
               url: '/',
               templateUrl: 'reset-password.html',
               controller: 'resetController'
               
           })
           .state('register', {
               url: '/register',
               templateUrl: 'registrationpage.html',
               controller: 'regisController'
               
           })
           .state('home', {
               url: '/home',
               templateUrl: 'home.html',
               controller: 'homeController'
             
           })
            .state('profile', {
               url: '/profile',
               templateUrl: 'profile.html',
               controller: 'profileController'
               
           });
      $urlRouterProvider.otherwise("/");
});
 app.controller('loginController',['$scope','chakridb','$location',function ($scope,chakridb,$location){  
          $scope.loginVal = function(login){
          	var db=chakridb.get();
          	console.log(login);
          	db.serialize(function(){
          		db.all("select email,password from Test2",function(err,row){
          			console.log(row);
          		    for(var i=0;i<row.length;i++){
          		    	console.log(row[i]);
          			if(login.email==row[i].email && login.password==row[i].password){
          			 $location.path("/home");

          		}
          		}
          	});
          	});
            };
          }]);
   app.controller('regisController',['$scope','chakridb','$location',function ($scope,chakridb,$location){  
                   $scope.save=function(customer){
                   	//console.log(customer);
                   var db = chakridb.get();
                    db.serialize(function () {
                    	console.log(customer);
                   db.run("CREATE TABLE Test2 (first_name text ,last_name text ,email text  ,password text,phoneNumber integer,gender text )");
                    //db.run("INSERT INTO Test2 VALUES ('?','?','?','?',?,'?')",function(err,row){

                    	var stmt = db.prepare("INSERT INTO Test2 VALUES (?,?,?,?,?,?)");
                    		stmt.run(customer.first_name,customer.last_name,customer.email,customer.password,customer.phoneNumber,customer.gender);
                    	   db.each("SELECT * FROM Test2", function(err, row){
                          console.log(err,row)                                      
                });
                    	   stmt.finalize();
                      	
            });
            $location.path("/");
        }
     }]);
   app.controller('profileController',function($scope,$location){
           $scope.updateCustomer=function(customer){
            $location.path("/home")
           }
   });
app.controller('homeController',function($scope,$location){
  $scope.logout=function(home){
        $location.path("/");
     }
});