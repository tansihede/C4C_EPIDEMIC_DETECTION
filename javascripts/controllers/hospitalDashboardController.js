angular.module('myApp').controller('hospitalDashboardController', ['$scope', '$http','$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {

	$scope.loaded = true; 
	$scope.statuses = [{"id":6,"name":"Mark As Cured"},{"id":7,"name":"Mark as Detected"}]; 
		 
   /** Function to get patient details **/

    $scope.getpatientDetails = function () {
     
    	$http.get('/api/getPatients').success(function (data) {
    		
            $scope.result = data.result;
            console.log(JSON.stringify(data.result[0]));
            $scope.dtInstance = {};

            /** Added fix to prevent popup due to null content in db **/
            var  dtColumns = []
            dtColumns.push(DTColumnBuilder.newColumn(null).withTitle('').notSortable().withClass('select-checkbox').renderWith( function() {return '';}))
            dtColumns.push(DTColumnBuilder.newColumn("patient_name").withTitle("Name").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("patient_occ").withTitle("Occupation").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("City").withTitle("Village_Town").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("patient_age").withTitle("Age").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("date_updated").withTitle("Date_Reported").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("Symptoms_reported").withTitle("Key_Symptoms").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("status").withTitle("Status").withOption('defaultContent', ' '))

            $scope.dtColumns = dtColumns //headers
           
            //create options
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('data', $scope.result)
                .withPaginationType('full_numbers')
                .withDisplayLength('5')
                .withOption('createdRow', createdRow)
                .withOption('lengthMenu',[5,10,15]) 
                .withOption('select',{style:'multi',selector: 'td:first-child'})

                
            //initialize the dataTable
            angular.element('#example').attr('datatable', '')
            $compile(angular.element('#example'))($scope)
           
            $scope.loaded = false;
            
        }).error(function (data) {
            console.log('Error: ' + data);
        });
 
    };
    
    /** Function to mark case as Cured/Detected **/
    
 	$scope.markAsCured = function(data) {
 		//alert(data);
 		 var count = $scope.dtInstance.DataTable.rows( { selected: true } ).count();
    	 var selectedData = $scope.dtInstance.DataTable.rows( { selected: true } ).data();

    	 if( selectedData.length <= 0)
    	 { alert("Please Select atleast one record ");
    	   return ;
    	 }
    	 else {
    	 for(i=0; i< selectedData.length;i++)
    		 {  selectedData[i].status=data  }
	    }
    	 
    	var params = { 'updatedData': selectedData, };
    	 
    	 
    	 $http.put('/api/updateStatus',params).success(function(data) {   		   
     		 console.log('Update Success' + data);
  		}).error(function(data) {
  		     //alert('Invalid Username or Password')
  		      console.log('Error: ' + data);
  		  });
	 
 	}  // end of  Mark as Cured method 
 	
 	
 	function createdRow(row, data, dataIndex) {
 	    $compile(angular.element(row).contents())($scope);
 	}
	        
    $scope.getpatientDetails();

}]);




