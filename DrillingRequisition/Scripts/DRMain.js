var app = angular.module('PMLDR', ['ui.bootstrap']);

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            });
        }
    };
}]);
app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});
app.service('sharedService', ['$http', function ($http) {
    var sharedService = {};
    sharedService.SaveDRDetails = function ( DR_Info) {
    return $http({
        method: 'post', url: '../api/saveDR', data: DR_Info
    });

}
sharedService.UpdateDRDetails = function (DR_Info) {
    return $http({
        method: 'post', url: '../api/updateDR', data: DR_Info
    });

}
sharedService.GetAllDR = function () {
    return $http({
        method: 'get', url: '../api/GetAllDR'
    });

}
sharedService.GetAllDRFilter = function (PrNo) {
    return $http({
        method: 'get', url: '../api/GetAllDRFilter', params: { 'PrNo': PrNo }
    });

    }
    sharedService.DeleteRecord = function (unitnm) {
        return $http({
            method: 'get', url: '../api/DeleteRecord', params: { 'unitnm': unitnm }
        });

    }
    sharedService.getAllProjectDetails = function (unitnm) {
        return $http({
            method: 'get', url: '../api/getAllProjectDetails', params: { 'unitnm': unitnm }
        });
    }

sharedService.Redirect = function (prNumber) {
    return $http({
        method: 'get', url: '../Home/Edit', params: { 'prNumber': prNumber }
    });

}
return sharedService;
}]);
app.controller('CreateController', ['$scope', '$http', 'sharedService', '$window', '$location', function ($scope, $http, sharedService, $window, $location) {
  
    $scope.init = function (SessionValue) {
       // alert(PrNo);
        $scope.session = SessionValue;
        //alert($scope.session);
    }
   
    $scope.AlertSuccessEdit = function (title, text) {
        swal({
            title: title,
            text: text,
            icon: "success",
            buttons: "Ok",
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {
                //alert(willDelete);
                $window.location.href = '../Home/Index';
            } else {
            }
        });
    }
    $scope.AlertSuccessSend = function ( title, text) {
        swal({
            title: title,
            text: text,
            icon: "success",
            buttons: "Ok",
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {
                //alert(willDelete);
                $window.location.href = '../Home/Index';
            } else {

            }
        });
    }
    $scope.saveDRDetails = function () {
        
        var DR_Info = $scope.DRILLRE;
        alert(DR_Info);
        sharedService.SaveDRDetails($scope.session, DR_Info).then(function (response) {
            $scope.AlertSuccessEdit("Success", "Record Saved Successsfully");
            $scope.FormReset();
        });
    }
  
   


    $scope.FormReset = function () {
        $scope.DRILLRE.UNITID ="";
        $scope.DRILLRE.CITY ="";
        $scope.DRILLRE.STABBR ="";
        $scope.DRILLRE.ZIP ="";
        $scope.DRILLRE.ACCREDAGENCY ="";
        $scope.DRILLRE.INSTURL ="";
        $scope.DRILLRE.NPCURL ="";
        $scope.DRILLRE.SCH_DEG ="";
        $scope.DRILLRE.HCM2 ="";
        $scope.DRILLRE.MAIN ="";
        $scope.DRILLRE.NUMBRANCH ="";
       
       


    }
   
}]);
app.controller('ViewController', ['$scope', '$http', 'sharedService', '$window', '$location', function ($scope, $http, sharedService, $window, $location) {

    $scope.tabledata = [];
    $scope.init = function (SessionValue) {
        $scope.PrjNo = "";
        //alert(SessionValue);
        $scope.tabledata = [];
        $scope.session = SessionValue;
        $scope.BindData();
    }
      
        $scope.AlertWarningEdit = function (prno, title, text) {
            swal({
                title: title,
                text: text,
                icon: "warning",
                buttons: ["Cancel", "Edit!"],
                dangerMode: true,
            }).then(function (willDelete) {
                if (willDelete) {
                    $window.location.href = '../Home/Edit?UNITID=' + prno;
                } else {
                   
                }
            });
    }
    $scope.AlertWarningDelete = function (unitnm, title, text) {
        swal({
            title: title,
            text: text,
            icon: "warning",
            buttons: ["Cancel", "Delete!"],
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {

                sharedService.DeleteRecord(unitnm).then(function (response) {
                    $scope.BindData();
                });
                swal("Your Record Deleted Successfully!", {
                    icon: "success",
                });
            } else {
              
            }
        });
    }
        
        $scope.CreateFormRedirect = function () {
            $window.location.href = '../Home/Create';
        }
        $scope.maxSize = 10;
        $scope.BindData = function () {
          //  alert($scope.session);
        sharedService.GetAllDR($scope.session).then(function (response) {
            var prjData = response.data;
            $scope.tabledata = prjData;
            $scope.totalItemsData = $scope.tabledata.length;
            $scope.currentPageData = 1;
            $scope.numPerPage = 10;
            $scope.paginate = function (value) {
                var begin, end, index;
                begin = ($scope.currentPageData - 1) * $scope.numPerPage;
                end = begin + $scope.numPerPage;
                index = $scope.tabledata.indexOf(value);
                return (begin <= index && index < end);
            };
        });
    }
    $scope.changePageData = function (currentPageData) {
        $scope.currentPageData = currentPageData;
    }
   
   
    $scope.DeleteRecord = function (unitnm) {
        $scope.AlertWarningDelete(unitnm, "Are you sure want to Delete Record?", "Click Delete button to Delete information!");
       
    }
    $scope.EditRecord = function (prno) {
        $scope.AlertWarningEdit(prno, "Are you sure want to Edit form?", "Click Edit button to edit information!");

    }
  
  

}])
app.controller('EditController', ['$scope', '$http', 'sharedService', '$window', function ($scope, $http, sharedService, $window) {
    $scope.isPaneShown = true;
    $scope.AlertSuccessEdit = function (title, text) {
        swal({
            title: title,
            text: text,
            icon: "success",
            buttons: "Ok",
            dangerMode: true,
        }).then(function (willDelete) {
            if (willDelete) {
                $window.location.href = '../Home/Index';

            } else {

            }
        });
    }
   
    $scope.FormReset = function () {
        $scope.DRILLRE.prjno ="";
        $scope.DRILLRE.requestDate ="";
        $scope.DRILLRE.techOnOsite ="";
        $scope.DRILLRE.techContactNo ="";
        $scope.DRILLRE.workingHr ="";
        $scope.DRILLRE.clientContact ="";
        $scope.DRILLRE.totalBoreholes ="";
        $scope.DRILLRE.boreholesDepth ="";
        $scope.DRILLRE.soilSampling ="";
        $scope.DRILLRE.totalMonitoringWell ="";
        $scope.DRILLRE.monitorWellDepth ="";
        $scope.DRILLRE.additionalNote ="";
        $scope.DRILLRE.flushMountWellCap ="";
        $scope.DRILLRE.aboveGround ="";
        $scope.DRILLRE.numberOfScreen ="";
        $scope.DRILLRE.scopeOfWork ="";
        $scope.DRILLRE.monitoringWellInstallation_details ="";
        $scope.DRILLRE.undergroundServices ="";
        $scope.DRILLRE.wellDevpPurgWaterSampling ="";
        $scope.DRILLRE.speicalInstruction ="";
        $scope.DRILLRE.sendRequest =0;
        $scope.DRILLRE.Asphalt ="";
        $scope.DRILLRE.Concrete ="";
        $scope.DRILLRE.Bentonite ="";
        $scope.DRILLRE.Sand ="";
        $scope.projectName = "";
        $scope.projectLocation = "";
        $scope.projectAddress = "";

    }
    
    $scope.init = function (PrNo) {
      
        sharedService.getAllProjectDetails(PrNo).then(function (response) {
            var prjData = response.data;
            $scope.DRILLRE = prjData;
           
        });
    }
    $scope.UpdateDRDetails = function () {
        $scope.DRILLRE.sendRequest = 0;
        var DR_Info = $scope.DRILLRE;
        sharedService.UpdateDRDetails( DR_Info).then(function (response) {
            $scope.AlertSuccessEdit("Success", "Record Edit Successsfully");
            $scope.FormReset();
            
        }).finally(function () {
            // Always execute this on both error and success
        });
    }
    
}])
