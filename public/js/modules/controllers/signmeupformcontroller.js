app.controller("SignMeUpFormController", ["$http", "$moment", "$location", function($http, $moment, $location) {
  this.userData = {
    name: null,
    email: null,
    occupation: null,
    birthdate: null
  };
  this.minAge = $moment().subtract(18, 'years').format('YYYY-MM-DD');

  var _self = this;
  this.occupations = [];
  this.occupationData = [];
  $http.get('/occupations').then(function (resp) {
    if (resp.status = 200) {
      var data = resp.data;
      _self.occupationData = data.data;
    }
  });

  function onType(current) {
    if (current.length < 3) {
      _self.occupations = [];
    } else {
      _self.occupations = _self.occupationData;
    }
  }
  this.onType = onType;

  var submit = function(data) {
    console.log(data);
    $http.post('/signup', data).success(function (data, status) {
      if (status === 200) {
        $location.path('/submitted');
      }
    }).error(function(data, status) {

    });
  }
  this.submit = submit;

  function canSubmitted(signupForm) {
    return signupForm.$valid;
  }
  this.canSubmitted = canSubmitted;

}]);
