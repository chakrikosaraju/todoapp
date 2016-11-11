var app = angular.module('app', ['ui.router', 'ui.bootstrap',require('angular-sqlite')]);
 app.constant('DB_CONFIG', {
       todo: {
            first_name: { type: 'text'},
            last_name:{type:'text'},
            email: { type: 'text' },
            password:{type:'text'},
            phoneNumber:{type:'integer'},
            gender:{type:'text'}
           
        },
        todo1:{
             first_name: {type: 'text'},
            last_name:{type:'text'},
            email: { type: 'text' },
            password:{type:'text'},
            phoneNumber:{type:'integer'},
            gender:{type:'text'},
            itemname:{type:'text'},
            model:{type:'text'},
            batchnumber:{type:'integer'},
            leadsource:{type:'text'}
           
        },
        form:{
            itemname:{type:'text'},
            model:{type:'text'},
            batchnumber:{type:'integer'},
            leadsource:{type:'text'}
        }
    })
    .run(function ($SQLite) {
        $SQLite.dbConfig({
            name: 'sqlite-db',
            description: 'Test DB',
            version: '1.0'
        });
    })
  .run(function ($SQLite, DB_CONFIG) {
        $SQLite.init(function (init) {
            angular.forEach(DB_CONFIG, function (config, name) {
                init.step();
                $SQLite.createTable(name, config).then(init.done);
                console.log(name);

            });
            init.finish();
        });
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
             .state('todo', {
               url: '/todo',
               templateUrl: 'todo.html',
               controller: 'todoController'
             
           })
             .state('form', {
               url: '/form',
               templateUrl: 'form.html',
               controller: 'formController'
             
           })
            .state('profile', {
               url: '/profile',
               templateUrl: 'profile.html',
               controller: 'profileController'
               
           });
      $urlRouterProvider.otherwise("/");
});
 app.controller('loginController',function ($scope,$location,$SQLite){  
          $scope.loginVal = function(login){
          
      
       $SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM todo ')
            .then(
        function () { 
        	console.log('Empty Result!');
        	 },
        function () {
      //  console.err('Error!');
          },
        function (data) {
          for(var i=0;i<data.rows.length;i++){
          if(login.email==data.rows[i].email && login.password==data.rows[i].password){
            $SQLite.insert("todo1",data.rows[i])
          console.log(data.rows); 
          $location.path("/home");
        }
      }
  			});
    });
          			 
          			 
           };
         });
   app.controller('regisController',function ($scope,$location,$SQLite){  
                   $scope.save=function(customer){
                $SQLite.ready(function () {
        this.insert('todo', customer) // this.replace 
            //.then(onResult, onError) 
    });
            $location.path("/");
        }
     });
   app.controller('profileController',function($scope,$SQLite,$location){
        
        $SQLite.ready(function () {
         // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM todo1 ')
            .then(
           function () { 
          console.log('Empty Result!');
           },
         function () {
      //  console.err('Error!');
          },
          function (data) {
          for(var i=0;i<data.rows.length;i++){
          var customer=data.rows[i];
          $scope.customers=customer;
          // console.log(data.rows); 
          // $location.path("/home");
       $scope.updateCustomer=function(customers){
          $SQLite.ready(function(){
            this.execute('update todo SET first_name=?,last_name=?,email=?,password=?,phoneNumber=?,gender=?',[customers.first_name,customers.last_name,customers.email,customers.password,customers.phoneNumber,customers.gender])
            $location.path("/home");
          })
        }
      }
    }
        );
   });
      
   });
app.controller('homeController',function($SQLite,$scope,$location)
{
  console.log($scope.login);
  
  $scope.logout=function(home)
  {
    $SQLite.ready(function () 
    { // The DB is created and prepared async. 
          this
            .selectAll('SELECT * FROM todo1')
            .then(
            function () { 
              console.log('Empty Result!');
               },
            function () {
             //console.err('Error!'); 
           },
            function (data)
             {
            console.log(data);
            for(var i=0;i<data.rows.length;i++)
            {
              console.log(data.rows[i].email);
            $SQLite.execute('delete from todo1 where email=?',[data.rows[i].email]);
            $location.path("/");
          }
        }
      );
       });
  }
});
app.controller('todoController',function($scope,$location,$SQLite){
           
  $SQLite.ready(function () { // The DB is created and prepared async. 
        this
            .selectAll('SELECT * FROM form')
            .then(
        function () { 
          console.log('Empty Result!');
           },
        function ()
         {
          console.err('Error!');
           },
          function (data) {
          for(var i=0;i<data.rows.length;i++){
            console.log(data.rows[2]);
           $SQLite.insert("todo1",data.rows[i])
          // if(customers.email==data.rows[i].email && customers.password==data.rows[i].password){
          //   var customers=data.rows[i];
          // $scope.customer=customers;
}
//}
 $scope.logout=function(home)
{
                      $SQLite.execute('delete from tod1 where model=?',[data.rows[i].model]);
                      console.log(data.rows[i].model);
                      $location.path("/");

          //$SQLite.insert("todo1",data.rows[i])

}
        }
        );

      });
            $scope.addcustomer=function(customer){
    $location.path("/form");

}
});

 


app.controller('formController',function($scope,$location,$SQLite){
  $scope.save=function(customer){
          $SQLite.ready(function () {
      this.insert('form', customer) 
      console.log(customer);// this.replace 
            //.then(onResult, onError) 
    });
    $location.path("/todo")
  };

});
// app.controller('todoController',function($scope,$location,$SQLite){
//     $SQLite.ready(function () { // The DB is created and prepared async. 
//         this
//             .selectAll('SELECT * FROM users')
//             .then(
//         function () { 
//           console.log('Empty Result!');
//            },
//         function ()
//          {
//           console.err('Error!');
//            },
//           function (data) {
//           for(var i=0;i<data.rows.length;i++){
//           var customers=data.rows[i];
//           $scope.customer=customers;
//            $scope.editcustomer=function(customer){
//           $SQLite.ready(function(){
//             this.execute('update users1 SET first_name=?,last_name=?,email=?,password=?,phoneNumber=?,gender=?',[customer.first_name,customer.last_name,customer.email,customer.password,customer.phoneNumber,customer.gender])
//             $location.path("/profile");
//           })
//         }
//       }
//     }
//     ); 
//         });
//     });


