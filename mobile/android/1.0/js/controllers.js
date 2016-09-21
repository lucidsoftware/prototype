angular.module('lucidMobile.controllers', [])
    .controller('appCtrl', ['$scope', '$location', function($scope, $location) {
        //to set active tab in menu
        $scope.getClass = function(path) {
            return ($location.path() === path) ? 'active' : '';
        };
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});


    }])
    .controller('documentsCtrl', ['$scope', 'documents', 'folders', '$stateParams', '$ionicActionSheet',
        function($scope, documents, folders, $stateParams, $ionicActionSheet) {
            $scope.folderID = $stateParams.folderID || 0;
            console.log($scope.folderID);
            $scope.folders = folders.all();
            $scope.documents = documents.all();

            if ($stateParams.folderID) {
                $scope.folderName = folders.getByID($stateParams.folderID).name;
            } else {
                if ($stateParams.filter) {
                    $scope.filter = $stateParams.filter;
                }
                $scope.folderName = $stateParams.filter || 'My Documents';
            }
            $scope.showDrawer = function() {

                // Show the action sheet
                $ionicActionSheet.show({
                    buttons: [
                        { text: '<i class="icon material-icons">text_format</i>Rename' },
                        { text: '<i class="icon material-icons">content_copy</i>Copy' },
                        { text: '<i class="icon material-icons">folder</i>Move' },
                        { text: '<i class="icon material-icons">people</i>Share' }
                    ],
                    destructiveText: '<i class="icon material-icons">delete</i>Delete',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        console.log(index);
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        console.log('delete');
                        return true;
                    }
                });
            };
            $scope.openDocument = function(documentID) {
                //console.log('manage shapes');
                documents.openDocument(documentID);

            };

        }
    ])
    .controller('shapeManagerCtrl', ['$scope', 'lucidShapesData', '$rootScope', '$ionicModal', function($scope, lucidShapesData, $rootScope, $ionicModal) {
        $scope.pinnedShapeGroups = lucidShapesData.lucidShapeGroups();
        $scope.search = {};
        $scope.showShapeManager = function() {
            //console.log('manage shapes');
            var $scope = $rootScope.$new();
            $ionicModal.fromTemplateUrl('templates/shape-manager-modal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
                $scope.close = function() {
                    $scope.modal.hide().then(function() {
                        $scope.modal.remove();
                    });
                };
            });
        };
    }])
    .controller('fabCtrl', ['$scope', 'documents', '$stateParams', '$state',
        function($scope, documents, $stateParams) {
            $scope.clickFab = function() {
                if ($scope.openFab) {
                    $scope.createDocument();
                    $scope.openFab = false;
                } else {

                    $scope.openFab = true;
                }
            };
            $scope.createDocument = function() {
                console.log('doc create');
                //insert folderID into create doc
                var documentID = documents.all().length +1;
                documents.create(documentID, $stateParams.folderID);
                documents.openDocument(documentID);
                console.log(documents.all());
            };
        }
    ]);