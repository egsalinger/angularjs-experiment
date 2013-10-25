var regApp = angular.module('RegApp',[]);

regApp.controller('RegController', function RegController ($scope, $http)
{

	$scope.master = {};

	$scope.update = function(user)
	{
		$scope.master = angular.copy(user);
	};

	$scope.reset = function()
	{
		$scope.user = angular.copy($scope.master);
	};

	$scope.isUnchanged = function(user)
	{
		return angular.equals(user, $scope.master);
	};
 
	$scope.passwordsMatch = function()
	{
		return $scope.user.password === $scope.user.confirmpwd;
	};

	$scope.passwordValid = function()
	{
		return $scope.passwordsMatch && $scope.hasValue($scope.user.password);
	};

	$scope.canRegister = function()
	{
		var truth = !$scope.user.exists;
		return $scope.passwordValid && $scope.hasValue($scope.user.name) && $scope.hasValue($scope.user.type) && $scope.hasValue($scope.user.exists) && truth;
	};

	$scope.hasValue = function(val)
	{
		return !(angular.isUndefined(val) ||val === null);
	};

	$scope.userValid = function()
	{
		$scope.inProgress = true;
		$http.post('checkName.php', $scope.user.name)
			.success(function(data, status)
			{
				$scope.status = status;
				$scope.user.exists = (data == "true");
			}).error (function(data, status)
			{
				$scope.user.exists = (data == "true");
				$scope.status = status;
			});
		$scope.inProgress = false;
	}
	$scope.register = function ()
	{
		$scope.inProgress = true;

		$http.post ('register.php', $scope.user)
			.success(function(data, status)
                        {
                                $scope.user.registered = (data == "success");
                        }).error (function(data, status)
                        {
                                $scope.user.exists = (data == false);
                        });
		$scope.inProgress = false;
	}
	
	
	$scope.reset();
});
