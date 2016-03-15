var myApp=angular.module('starter.controllers', ['ngCordova'])
myApp.factory('Data',function(){
    return{
        id:''
    };
});

myApp.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/navigation/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

myApp.controller('HomeController', function($scope,$stateParams) {
  $scope.categories = [
    { title: 'English Alphabets', id: "English_Alpha",img:'1.jpg' },
    { title: 'Hindi Vowels', id: "Hindi_vowels",img:'2.jpg' },
    { title: 'Hindi Consonants', id: "Hindi_consonants",img:'3.jpg' },
    { title: 'Animals', id: "Animals",img:'4.jpg' },
    { title: 'Birds', id: "Birds",img:'5.jpg'},
    { title: 'Fruits', id: "Fruits",img:'6.jpg' },
    { title: 'Vegetables', id: "Vegetables",img:'7.jpg' },
    { title: 'Months', id: "Months",img:'8.jpg' },
    { title: 'Days', id: "Weekdays",img:'9.jpg' },
    { title: 'Bodyparts', id: "Bodyparts",img:'10.jpg' }
  ];
    
})

myApp.controller('ListingController', function($scope, $stateParams, $http,Data,$rootScope) {
    console.log($stateParams);
    Data.id=$stateParams.categoryId;
    console.log(Data.id);
    $http.get('json/category'+$stateParams.categoryId+'.json',{}).success(function(data){
			$scope.lists = data;
            $rootScope.listData = data;
		});
})

myApp.controller('TouchController', function($scope, $stateParams, $cordovaMedia, $ionicLoading, $stateParams, Data, $http, $rootScope)      
                {
    
    
    $scope.touchPageData = $rootScope.listData[$stateParams.listId-1].img;
    $scope.demo = $rootScope.listData[$stateParams.listId-1].title;
    $scope.message=Data.id;
   
    var canvas = document.getElementById('signatureCanvas');
    var canvasDiv = document.getElementById('canvasDiv');
    
    canvas.height = canvasDiv.offsetHeight-5;
    canvas.width = canvasDiv.offsetWidth;
    var buttons=document.getElementById('buttonDiv');
   
    
    var signaturePad = new SignaturePad(canvas);
     $scope.clearCanvas = function() {
        signaturePad.clear();
    }
     
    
    $scope.play = function(src) {
        var media = new Media(src, null, null, mediaStatusCallback);
        $cordovaMedia.play(media);
    }
 
    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    }
    
   
 
    $scope.saveCanvas = function() {
        var sigImg = signaturePad.toDataURL();
        $scope.signature = sigImg;
    }
    
    
    $scope.previousCanvas=function(){
        
       $stateParams.listId=(Number($stateParams.listId))-1;
        
        if($stateParams.listId < 1){
            $stateParams.listId = 1;
        }
     
    $scope.touchPageData = $rootScope.listData[$stateParams.listId-1].img;
    $scope.demo = $rootScope.listData[$stateParams.listId-1].title;
    $scope.message=Data.id;
        
        
    var canvas = document.getElementById('signatureCanvas');
    var canvasDiv = document.getElementById('canvasDiv');
    
    canvas.height = canvasDiv.offsetHeight-5;
    canvas.width = canvasDiv.offsetWidth;
    var buttons=document.getElementById('buttonDiv');
   
    
    var signaturePad = new SignaturePad(canvas);
     $scope.clearCanvas = function() {
        signaturePad.clear();
    }
    
    
    }
      $scope.nextCanvas=function(){
          
          $stateParams.listId=(Number($stateParams.listId))+1;
          
           if($stateParams.listId >=  $rootScope.listData.length){
            $stateParams.listId = $rootScope.listData.length;
        }
          
          $scope.touchPageData = $rootScope.listData[$stateParams.listId-1].img;
            $scope.demo = $rootScope.listData[$stateParams.listId-1].title;
            $scope.message=Data.id;
            
         /*$http.get('json/category'+Data.id+'.json',{}).success(function(data){
			$scope.lists = data;
                      if($stateParams.listId>=data.length)
                 {
                     $stateParams.listId=data.length;
                 }
         for(i=0;i<data.length;i++){
             if(data[i].id==($stateParams.listId)){
                 $scope.touchPageData=data[i].img;
                 $scope.demo=data[i].title;
                 break;
             }
         }
		});*/
            var canvas = document.getElementById('signatureCanvas');
            var canvasDiv = document.getElementById('canvasDiv');
    
            canvas.height = canvasDiv.offsetHeight-5;
            canvas.width = canvasDiv.offsetWidth;
        
            var buttons=document.getElementById('buttonDiv');
            var signaturePad = new SignaturePad(canvas);
          $scope.clearCanvas = function() {
            signaturePad.clear();
    }
    }
});
