	


TestApp = angular.module('TestApp', ['TestApp.controllers', 'smart-table', 'ui.bootstrap']);
	
angular.module('TestApp.controllers', []).controller('testController',  ['$scope', '$http', '$uibModal', function($scope, $http, $modal) {
	$scope.loading = false;
	var modalInstance = null;
	
	$scope.getData = function() {
		$scope.loading = true;
		$http.get("http://localhost:3000/api/employees/")
		.then(function(response){
			$scope.employees = response.data;
			$scope.loading = false;
		});
	}
	
	$scope.viewRecord = function(id){
		   if(id > 0) {
			  $http.get("http://localhost:3000/api/employee/"+id)
				.then(function(response){
					modalInstance = $modal.open({
					  animation: false,
					  templateUrl: 'view/view_record.html',
					  controller: 'empViewCtrl',
					  scope: $scope,
					  size: '',
					  resolve: {
						  record: function () {
							  return response.data;
						  }
					  }
				   });
				});
			 
		   }
			   

	}
	
	$scope.addRecord = function(){
		modalInstance = $modal.open({
		  animation: false,
		  templateUrl: 'view/add_record.html',
		  controller: 'addEmpCtrl',
		  scope: $scope,
		  size: '',
		  resolve: {
		  }
	   });

	}
	
	$scope.editRecord = function(id){
		   if(id > 0) {
			  $http.get("http://localhost:3000/api/employee/"+id)
				.then(function(response){
					modalInstance = $modal.open({
					  animation: false,
					  templateUrl: 'view/update_record.html',
					  controller: 'updateEmpCtrl',
					  scope: $scope,
					  size: '',
					  resolve: {
						  record: function () {
							  return response.data;
						  }
					  }
				   });
				});
		   }

	}

	$scope.cancelModal = function(){
	 modalInstance.dismiss('cancel');
	}
	
	$scope.saveRecord = function(params) {
		console.log(params);
		$http.post("http://localhost:3000/api/employees/", params)
			.then(function(response){
				console.log(response);
				$scope.getData();
			});
	}
	
	$scope.updateRecord = function(params) {
		$http.put("http://localhost:3000/api/employees/", params)
			.then(function(response){
			  console.log(response);
			  $scope.getData();
			});
	}
	$scope.deletRecord = function(id) {
		if (confirm('Are you sure you want to delete this?')) {
			 $http.delete("http://localhost:3000/api/employees/"+id)
			.then(function(response){
				console.log(response);
			});
		}
		
	}
	$scope.getData();
}]);

TestApp.controller('empViewCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {
	function init(){
        $scope.employee = record;
    }
	init();
	
}]);

TestApp.controller('addEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http) {
	$scope.saveEmp = function () {
            $scope.datas = {};

            if(!angular.isDefined($scope.employee_name) || $scope.employee_name === '') {
                alert('employee name is empty');
                return;
            }
            else if(!angular.isDefined($scope.employee_dob) || $scope.employee_dob === '') {
                alert('employee date of birth is empty');
                return;
            }else if(!angular.isDefined($scope.employee_role) || $scope.employee_role === '') {
                alert('employee role is empty');
                return;
            } else {
				$scope.datas.name = $scope.employee_name;
				$scope.datas.dob = $scope.employee_dob;
				$scope.datas.role = $scope.employee_role;
				console.log($scope.datas);
			}
            $scope.cancelModal();
            $scope.saveRecord($scope.datas);
        };
	
}]);

TestApp.controller('updateEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {
	$scope.employee = {};
	function init(){
		$scope.employee.name = record.employee_name;
		$scope.employee.dob = parseInt(record.employee_dob);
		$scope.employee.role = parseInt(record.employee_role);
		$scope.employee.id = parseInt(record.id);
    }
	$scope.updateEmp = function () {
		$scope.cancelModal();
		if(!angular.isDefined($scope.employee.name) || $scope.employee.name === '') {
                alert('employee name is empty');
                return;
            }
            else if(!angular.isDefined($scope.employee.dob) || $scope.employee.dob === '') {
                alert('employee date of birth is empty');
                return;
            }else if(!angular.isDefined($scope.employee.role) || $scope.employee.role === '') {
                alert('employee role is empty');
                return;
            }
		$scope.updateRecord($scope.employee);
	}
	init();
	
}]);