angular.module('myApp').controller('diseasesController', ['$scope', '$window','$http','$compile','DTOptionsBuilder', 'DTColumnBuilder', function ($scope,$window, $http,$compile, DTOptionsBuilder, DTColumnBuilder) { 
	
    $scope.loaded = true ; 
    $scope.dtInstance = {};

	$scope.getpatientDetails = function () {

        $http.get('/api/getPatients').success(function (data) {
            $scope.result = data.result;
            console.log(JSON.stringify(data));
            /** Added fix to prevent popup due to null content in db **/
            var  dtColumns = []
            //dtColumns.push(DTColumnBuilder.newColumn(null).withTitle('').notSortable().withClass('select-checkbox').renderWith( function() {return '';}))
            dtColumns.push(DTColumnBuilder.newColumn("hospital_name").withTitle("Hospital").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("patient_occ").withTitle("Occupation").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("City").withTitle("Village_Town").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("patient_age").withTitle("Age").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("date_updated").withTitle("Date_Reported").withOption('defaultContent', ' '))
            dtColumns.push(DTColumnBuilder.newColumn("Symptoms_reported").withTitle("Key_Symptoms").withOption('defaultContent', ' '))
            //dtColumns.push(DTColumnBuilder.newColumn("status").withTitle("Status").withOption('defaultContent', ' '))

            $scope.dtColumns = dtColumns //headers
           
            //create options
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('data', $scope.result)
                .withPaginationType('full_numbers')
                .withDisplayLength(5)
              //  .withOption('createdRow', createdRow)
                .withOption('lengthMenu',[5,10,15]) 
               // .withOption('select',{style:'multi',selector: 'td:first-child'})

                
            //initialize the dataTable
            angular.element('#outbreak').attr('datatable', '')
            $compile(angular.element('#outbreak'))($scope) 
            $scope.loaded = false ; 
        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    }; 
    
    $scope.userlabel = "John";
    $scope.getpatientDetails();
    
    $scope.getVolunteerDetails = function () {

        $http.get('/api/getVolunteers').success(function (data) {
		    debugger;
            $scope.volunteers = data.result;
            console.log("Volunteer");
            console.log(JSON.stringify(data));
            $scope.loaded = false ; 
        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    };
	$scope.getVolunteerDetails();
	
	
	$scope.sendMessage = function(number){
		document.getElementById("ph-Number").value = number;
	}
	
    $scope.tagData = [
          {text: "weakness", weight: 15, link: "https://google.com"}, //if your tag has a link.
          {text: "abdominal pain", weight: 9},
          {text: "Dozy", weight: 6},
          {text: "constipation", weight: 7},
          {text: "headaches", weight: 5},
		  {text: "fever", weight: 5},
          {text: "muscle pain", weight: 2},
		  // ...as many words as you want
      ];


  /*  alert("fine");*/
    $scope.userlabel = "John";
    $scope.requests=[];
    $scope.queryBlockchain = function () {
      var token = $window.localStorage.getItem('token');
      $http({
          method: "GET",
          url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc?peer=peer0.org2.example.com&fcn=query&args=%5B%27%27%2C%27%27%5D",
          withCredentials : false , 
          headers: {
              'Authorization': 'Bearer '+token,
              'content-type': 'application/json'
          }
      }).success(function (response) {
         $scope.requests =response.responce.reverse();
         console.log(response);
      }).error(function (error) {
          console.log(error);
      });
  };
  $scope.queryBlockchain();

    /** Function to Approve supply chain **/
 	$scope.approveRequest = function(requestId) {
        var token = $window.localStorage.getItem('token');
        var args = [requestId];
        var peers =["peer0.org1.example.com"];
        var data={
            "peers": peers,
            "fcn":"volunteerInvoke",
            "args":args
        }

        $http({
            method: "POST",
            withCredentials : false , 
            url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc",
            headers: {
                'Authorization': 'Bearer '+ token,
                'content-type': 'application/json'
            },
            data:JSON.stringify(data)
        }).success(function (response) {
           $scope.queryBlockchain();
            console.log("Approved")
        }).error(function (error) {
             console.log("Approve Failed")
        });
	 
 	}  // Approve supply chain

    $scope.supplyChainPopup = function(hospitalSuccess, ngoSuccess, volunteerSuccess, assetRequested){
        
        if(hospitalSuccess){
             document.getElementById("hospitalSuccess").setAttribute("class", "li complete");
        }
        if(ngoSuccess){
            document.getElementById("ngoSuccess").setAttribute("class", "li complete");
        }
        if(volunteerSuccess){
             document.getElementById("volunteerSuccess").setAttribute("class", "li complete");
        }
        if(assetRequested){
            document.getElementById("assetRequested").setAttribute("class", "li complete");
        }
    }


  
}]);