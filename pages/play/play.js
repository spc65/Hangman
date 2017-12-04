var app = angular.module('hangman', []);
var id = document.getElementById("game_id").innerHTML;
app.controller('hangmanCtrl', function($scope,$http) {
  $scope.gameid = id;
  $scope.word = "";
  $scope.lives = 0;
  $scope.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  $http.get("../../api/game_update.php?id="+$scope.gameid).then(function(response) {
    console.log(response.data);
    var letters_used = response.data.letters_used;
    var letters_temp = [];
    for(var i = 0; i < $scope.letters.length;i++){
      if(letters_used.indexOf($scope.letters[i]) == -1){
        letters_temp.push($scope.letters[i]);
      }
    }
    $scope.letters = letters_temp;
    $scope.word = response.data.word;
    $scope.lives = response.data.lives;
    if($scope.lives == 0 || $scope.word.indexOf('-') == -1){
      $scope.letters = [];
    }
  });
  $scope.guess = function(letter){
    //console.log(letter);
    $scope.letters.splice($scope.letters.indexOf(letter),1);
    $http.get("../../api/guess.php?id="+$scope.gameid+"&letter="+letter).then(function(response) {
      console.log(response.data);
      $scope.word = response.data.word;
      $scope.lives = response.data.lives;
    });
    if($scope.lives == 0 || $scope.word.indexOf('-') == -1){
      $scope.letters = [];
    }
  }
});
