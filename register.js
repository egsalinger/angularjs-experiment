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
		return $scope.passwordValid && $scope.hasValue($scope.user.name) && $scope.hasValue($scope.user.type);
	}

	$scope.hasValue = function(val)
	{
		return !(angular.isUndefined(val) ||val === null);
	};

	$scope.userValid = function()
	{
		$http.post('checkName.php', $scope.user.name)
			.success(function(data, status)
			{
				$scope.status = status;
				$scope.user.exists = data;
			}).error (function(data, status)
			{
				$scope.user.exists = data;
				$scope.status = status;
			});
	}
	$scope.register = function ()
	{
		$http.post ('register.php', $scope.user)
			.success(function(data, status)
                        {
                                $scope.status = status;
                        }).error (function(data, status)
                        {
                                $scope.user.exists = data;
                        });

	}
	
	
	$scope.reset();
});
