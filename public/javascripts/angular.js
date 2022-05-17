var app = angular.module("myapp",[])

app.controller('mycntrl', function ($scope, $http) {
	/* Registration Details */
	$scope.patient = {};
	$scope.patientdata = [];
	$scope.postData = function (val) {
        if(val.firstname==null||val.lastname==null||val.gender==null||val.age==null||val.email==null||val.pwd
            ==null||val.cpwd==null||val.address==null){
                alert("Please check details");
        }
        else if(val.pwd!=val.cpwd){
            alert("Passwords are not matched");
        }

        else{
		$http({
			method:"post",
			url:"/patientposting",
			data:val
		}).then(function (success) {
			console.log(success)
            alert("Account Created Successfully");
        },function (error) {
            console.log(error)
		})
    }
    $scope.patient={};
    }
    /* getting patient data */
    $scope.getdata = function(){
		$http({
			method:'get',
			url:'/getpatients',
		}).then(function(success){
			console.log(success)
			$scope.patientdata=success.data
		},function(error){
			console.log(error)
		})
	}
	/* Login details */

	$scope.log = {}
	$scope.logindata=[];
    $scope.logdata = function (val) {
        $http({
            method:"post",
            url:"/checkdata",
            data: val
        }).then(function(success) {
            console.log(success);

            if(success.data==''){
				console.log(success.data)
                alert("something is wrong");
            }
            else{  
                    location.href = "/profile";
                    alert("data is matched successfully");
        }
        },function (error) {
            console.log(error)
            alert("Credentials are not matched")
        })
	}
	// $scope.patient = {  
    //     pwd: "",  
    //     cpwd: ""  
    // };  
    $scope.admin = {};
	$scope.admindata = [];
	$scope.adminpostData = function (val) {
        if(val.firstname==null||val.lastname==null||val.adminid==null||val.email==null||val.pwd==null||val.cpwd==null||val.phno==null){
            alert("Please fill the details");
        }
          else if(val.pwd!=val.cpwd){
                alert("Please check passwords");
            }
            else{
		$http({
			method:"post",
			url:"/adminposting",
			data:val
		}).then(function (success) {
			console.log(success)
			alert("Account Created Successfully");
		},function (error) {
			console.log(error)
			alert("Someting Went Worng");
		})
        }
        $scope.admin={};
    }
//admin login
$scope.adminlog = {}
$scope.adminlogindata=[];
$scope.adminlogdata = function (val) {
    $http({
        method:"post",
        url:"/admincheckdata",
        data: val
    }).then(function(success) {
        console.log(success);

        if(success.data==''){
            console.log(success.data)
            alert("something is wrong");
        }
        else{  
                location.href = "/patientreg";
                alert("data is matched successfully");
    }
    },function (error) {
        console.log(error)
        alert("Credentials are not matched")
    })
}
// Doctor posting    

    $scope.doctor = {};
	$scope.doctordata = [];
	$scope.doctorpostData = function (val) {
        if(val.firstname==null||val.lastname==null||val.doctorid==null||val.specialization==null||val.email==null||val.pwd==null||val.cpwd==null||val.phno==null){
                alert("please fill Details");
        }
        else if(val.pwd!=val.cpwd){
            alert("please check passwords");
        }
        else{
		$http({
			method:"post",
			url:"/doctorposting",
			data:val
		}).then(function (success) {
			console.log(success)
			alert("Account Created Successfully");
		},function (error) {
			console.log(error)
			alert("Someting Went Worng");
		})
    }
    $scope.doctor={};
    }
//Doctor Login
$scope.doctorlog = {}
$scope.doctorlogindata=[];
$scope.doctorlogdata = function (val) {
    $http({
        method:"post",
        url:"/doctorcheckdata",
        data: val
    }).then(function(success) {
        console.log(success);

            console.log(success.data)
            location.href = "/docprofile";
                alert("data is matched successfully");
    },function (error) {
        console.log(error)
        alert("Credentials are not matched")
    })
}
/* Get doctor Data */
$scope.getdocdata = function(){
    $http({
        method:'get',
        url:'/getdoctors',
    }).then(function(success){
        console.log(success)
        $scope.doctordata=success.data
    },function(error){
        console.log(error)
    })
}

// Receptionist Posting
$scope.receptionist = {};
$scope.receptionistdata = [];
$scope.receptionpostData = function (val) {
    if(val.firstname==null||val.lastname==null||val.receptionid==null||val.email==null||val.pwd==null||val.cpwd==null||val.phno==null){
            alert("Please fill the details");
    }
    else if(val.pwd!==val.cpwd){
        alert("Please check passwords");
    }
    else{
    $http({
        method:"post",
        url:"/receptionistposting",
        data:val
    }).then(function (success) {
        console.log(success)
        alert("Account Created Successfully");
    },function (error) {
        console.log(error)
        alert("Someting Went Worng");
    })
    }
    $scope.receptionist={};
}

//Reception Login
$scope.receptionlog = {}
$scope.receptionlogindata=[];
$scope.receptionlogdata = function (val) {
    $http({
        method:"post",
        url:"/receptioncheckdata",
        data: val
    }).then(function(success) {
        console.log(success);

        if(success.data==''){
            console.log(success.data)
            alert("something is wrong");
        }
        else{  
                location.href = "/receptionist";
                alert("data is matched successfully");
    }
    },function (error) {
        console.log(error)
        alert("Credentials are not matched")
    })
}

    //appointment posting
    $scope.appointment = {};
	$scope.appointmentdata = [];
	$scope.appointmentpostData = function (val) {
        if(val.firstname==null || val.email==null || val.date==null || val.departement==null || val.num==null || val.message==null){
            alert("Please fill all the details")
        }else{
            $http({
                method:"post",
                url:"/appointmentposting",
                data:val
            }).then(function (success) {
                console.log(success)
                alert("Your Appointment is Successful")
            },function (error) {
                console.log(error)
            })
    
        }
        $scope.appointment={}
    }
    //appoinment getting
    $scope.appointmentgetdata = function(){
		$http({
			method:'get',
			url:'/getappointmentpatients',
		}).then(function(success){
			//console.log(success)
			$scope.appointmentdata=success.data
		},function(error){
			console.log(error)
		})
	}

    // //Posting accepted and rejected data
    // $scope.acceptreject = {};
	// $scope.acceptrejectdata = [];
	// $scope.acceptrejectpostdata = function (val) {
	// 	$http({
	// 		method:"post",
	// 		url:"/acceptrejectposting",
	// 		data:val
	// 	}).then(function (success) {
	// 		console.log(success)
    //     },function (error) {
    //         console.log(error)
	// 	})
    // }

    //update values
    // $scope.IsDisabled = false;
    $scope.update = function(val){
		$http({
			method:'post',
			url:'/updatepatients',
			data:val
		}).then(function(success){
                console.log(success)
                alert("Accepted");			
		},function(error){
			console.log(error)
			alert("not updated");
		})
	}
    // update values
    $scope.update1 = function(val){
		$http({
			method:'post',
			url:'/updatepatientsrej',
			data:val
		}).then(function(success){
			console.log(success)
			alert("Rejected");			
		},function(error){
			console.log(error)
			alert("not updated");
		})
	}

});


// var compareTo = function () {
//     return {
//         require: "ngModel",
//         scope: {
//             otherModelValue: "=compareTo"
//         },
//         link: function (scope, element, attributes, ngModel) {
//             ngModel.$validators.compareTo = function (modelValue) {
//                 return modelValue == scope.otherModelValue;
//             };

//             scope.$watch("otherModelValue", function () {
//                 ngModel.$validate();
//             });
//         }
//     };
// };

// app.directive("compareTo", compareTo);