	


AccionApp = angular.module('AccionApp', ['AccionApp.controllers', 'smart-table', 'ui.bootstrap']);
	
angular.module('AccionApp.controllers', []).controller('accionController',  ['$scope', '$http', '$uibModal', function($scope, $http, $modal) {
	$scope.loading = false;
	var modalInstance = null;
	


	//method call from index.js
	$scope.addRecord = function(){
		modalInstance = $modal.open({
		  animation: false,
		  templateUrl: 'view/addupdate_record.html',
		  controller: 'addEmpCtrl',
		  scope: $scope,
		  size: '',
            resolve: {
                record: function () {
                    return [{"mode":"Add"}];
                }
            }
	   });

	}
	
	$scope.editRecord = function(id){
		   if(id > 0) {
			  $http.get("http://localhost:3000/api/employees?id="+id)
				.then(function(response){
					modalInstance = $modal.open({
					  animation: false,
					  templateUrl: 'view/addupdate_record.html',
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

    $scope.removeRecord = function(id,name){
        if(id > 0) {
                    modalInstance = $modal.open({
                        animation: false,
                        templateUrl: 'view/delete_confirmation.html',
                        controller: 'deleteEmpCtrl',
                        scope: $scope,
                        size: '',
                        resolve: {
                            record: function () {
                                var data = {"id":id,"name":name};
                                return data;
                            }
                        }
                    });
        }

    }


	$scope.cancelModal = function(){
	 modalInstance.dismiss('cancel');
	}


    //methods call for API's
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
	$scope.deleteRecord = function(id) {
			 $http.delete("http://localhost:3000/api/employees/"+id)
			.then(function(response){
				console.log(response);
                $scope.getData();
			});
	}
    $scope.getData = function() {
        $scope.loading = true;
        $http.get("http://localhost:3000/api/employees/")
            .then(function(response){
                $scope.employees = response.data;
                $scope.loading = false;
            });
    }

	$scope.getData();
}]);


//Controllers
AccionApp.controller('addEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http,record) {
    $scope.employee = {};
    var visibility = {
        "name":false,
        "isActive":false,
        "save":true,
        "update":false
    };
    function init(){
        $scope.employee.mode = record[0].mode;
        $scope.employee.view = visibility;

    }

    $scope.saveEmp = function () {
            $scope.datas = {};

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
            } else {
				$scope.datas.name = $scope.employee.name;
				$scope.datas.dob = $scope.employee.dob;
				$scope.datas.role = $scope.employee.role;
				console.log($scope.datas);
			}
            $scope.cancelModal();
            $scope.saveRecord($scope.datas);
        };
	init();
}]);

AccionApp.controller('updateEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {
	$scope.employee = {};
    var visibility = {
        "name":true,
        "isActive":true,
        "save":false,
        "update":true
    };
	function init(){
		$scope.employee.name = record[0].name;
		$scope.employee.dob = new Date(record[0].dateOfBirth) ;
		$scope.employee.role = record[0].role;
        $scope.employee.isActive = record[0].isActive;
		$scope.employee.id = parseInt(record[0]._id);
        $scope.employee.mode = "Update";
        $scope.employee.view = visibility;
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

AccionApp.controller('deleteEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {

    $scope.employee = {};
    function init(){
        $scope.employee.name = record.name;
        $scope.employee.id = parseInt(record.id);
    }
    $scope.deleteEmp = function () {
        $scope.cancelModal();
        $scope.deleteRecord($scope.employee.id);
    }
    init();
}]);