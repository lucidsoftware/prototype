angular.module('lucidMobile.services', [])
    .factory('documents', ['$filter', '$rootScope', '$ionicModal', function($filter, $rootScope, $ionicModal) {
        var documents = [{
            id: 0,
            thumb: 'img/thumb-1.png',
            name: 'Blank Diagram',
            insideFolder: 0,
            pages: [{
                'name': 'Page 1',
                'thumb': 'assets/thumb-placeholder-flowchart.png',
                'id': 14543,
                'canvasBG': '#FFF',
                'blocks': [{
                    "customcolor": false,
                    "swatch": {
                        "fill": "#ffffff",
                        "text": "#AEAEAE",
                        "border": "#666666"
                    },
                    "swatchnumber": 1,
                    "borderwidth": 3,
                    "borderstyle": "solid",
                    "comment": {
                        "text": "yep this is a comment"
                    },
                    "table": true,
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "Process",
                        "size": 16,
                    },

                    "padding": 7,
                    "metrics": {
                        "z": 2,
                        "x": 75,
                        "y": 75,
                        "width": 120,
                        "height": 100
                    }
                }, {
                    "customcolor": false,
                    "swatch": {
                        "fill": "#ffffff",
                        "text": "#AEAEAE",
                        "border": "#666666"
                    },
                    "swatchnumber": 1,
                    "borderwidth": 3,
                    "borderstyle": "solid",
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "Process",
                        "size": 16,
                    },

                    "padding": 7,
                    "metrics": {
                        "z": 2,
                        "x": 75,
                        "y": 243,
                        "width": 120,
                        "height": 80
                    },


                }],
                'lines': [{
                    "points": "450.5 184 450.5 240",
                    "endarrow": true,
                    "width": 3,
                }],
                'linecolor': '#333'
            }]
        }, {
            id: 1,
            name: 'Blank Diagram',
            insideFolder: 0,
            shared: true,
            thumb: 'img/thumb-2.png',
            group: 'Recent',
            pages: [{
                'name': 'Page 1',
                'thumb': 'assets/thumb-placeholder-flowchart.png',
                'id': 14543,
                'canvasBG': '#FFF',
                'blocks': [{
                    "customcolor": false,
                    "swatch": {
                        "fill": "#ffffff",
                        "text": "#AEAEAE",
                        "border": "#666666"
                    },
                    "swatchnumber": 1,
                    "borderwidth": 3,
                    "borderstyle": "solid",
                    "comment": {
                        "text": "yep this is a comment"
                    },
                    "table": true,
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "Process",
                        "size": 16,
                    },

                    "padding": 7,
                    "metrics": {
                        "z": 2,
                        "x": 75,
                        "y": 75,
                        "width": 120,
                        "height": 100
                    }

                }, {
                    "customcolor": false,
                    "swatch": {
                        "fill": "#ffffff",
                        "text": "#AEAEAE",
                        "border": "#666666"
                    },
                    "swatchnumber": 1,
                    "borderwidth": 3,
                    "borderstyle": "solid",
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "Process",
                        "size": 16,
                    },

                    "padding": 7,
                    "metrics": {
                        "z": 2,
                        "x": 75,
                        "y": 243,
                        "width": 120,
                        "height": 80
                    },


                }],
                'lines': [{
                    "points": "450.5 184 450.5 240",
                    "endarrow": true,
                    "width": 3,
                }],
                'linecolor': '#333'
            }]
        }, {
            id: 3,
            name: 'ERD & Data Flow',
            insideFolder: 0,
            shared: true,
            thumb: 'img/thumb-3.png',
            group: 'Recent',
            pages: [{
                blocks:[]
            }]
        },{
            id: 4,
            name: 'ERD & Data Flow',
            insideFolder: 0,
            shared: true,
            thumb: 'img/thumb-4.png',
            group: 'Recent',
            pages: [{
                blocks:[]
            }]
        }, {
            id: 5,
            name: 'ERD & Data Flow',
            insideFolder: 0,
            shared: true,
            thumb: 'img/thumb-5.png',
            group: 'Recent',
            pages: [{
                blocks:[]
            }]
        }];
        var documentFunctions = {
            all: function() {
                return documents;
            },
            getByID: function(documentID) {
                var filterDocs = $filter('filter')(documents, { id: documentID });
                return filterDocs[0];
            },
            copy: function(newDocument) {
                var copyDocument = angular.copy(newDocument);
                copyDocument.name = copyDocument.name + ' (Copy)';
                copyDocument.id = documentFunctions.all().length + 1;
                documents.push(copyDocument);
            },
            delete: function(documentID) {
                var i;
                for (i = documentFunctions.all().length - 1; i >= 0; i--) {
                    if (documentFunctions.all()[i].id === documentID) {
                        documentFunctions.all().splice(i, 1);
                    }
                }
            },
            getFromFolder: function(folderID) {
                return $filter('filter')(documents, { insideFolder: folderID });
            },
            create: function(documentID, folderID) {
                var newDoc = {
                    id: documentID,
                    name: 'Doc' + Number(documents.length) + 1,
                    insideFolder: folderID || 0,
                    thumb: 'img/thumb.jpg',
                    group: 'Recent',
                    pages: [{
                        'name': 'Page 1',
                        'thumb': 'assets/thumb-placeholder-flowchart.png',
                        'id': 14543,
                        'canvasBG': '#FFF',
                        'blocks': []
                    }]
                };

                documents.push(newDoc);
                console.log('doc pushed', newDoc);
            },
            openDocument: function(documentID) {
                //console.log('manage shapes');
                var $scope = $rootScope.$new();
                $ionicModal.fromTemplateUrl('templates/document-modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    focusFirstInput: true
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.modal.show();

                    $scope.currentDocument = documentFunctions.getByID(documentID);
                    $rootScope.currentPage = documentFunctions.getByID(documentID).pages[0];

                    $scope.close = function() {
                        $scope.modal.hide().then(function() {
                            $scope.modal.remove();
                        });
                    };
                });

            }

        };
        return documentFunctions;
    }])
    .factory('folders', ['$filter', function($filter) {
        var folders = [{
            id: 1,
            name: 'Cory\'s Stuff',
            insideFolder: 0,
            shared: true,
            group: 'Shared with me'
        }, {
            id: 2,
            name: 'Sub Folder',
            insideFolder: 1,
            group: 'Recent'
        }, {
            id: 3,
            name: 'Cory\'s Doc',
            insideFolder: 2
        }, {
            id: 4,
            name: '1.0',
            insideFolder: 3
        }];
        var folderFunctions = {
            all: function() {
                return folders;
            },
            getByID: function(folderID) {
                var filterFolders = $filter('filter')(folders, { id: folderID });
                return filterFolders[0];
            },
            delete: function(folderID) {
                var i;
                for (i = folderFunctions.all().length - 1; i >= 0; i--) {
                    if (folderFunctions.all()[i].id === folderID) {
                        folderFunctions.all().splice(i, 1);
                    }
                }
            },
            getFromFolder: function(folderID) {
                return $filter('filter')(folders, { insideFolder: folderID });
            }
        };
        return folderFunctions;
    }]);