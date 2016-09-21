angular.module('lucidMobile.services', [])
    .factory('documents', ['$filter', function($filter) {
        var documents = [{
            id: 0,
            name: 'Doc Title',
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
                    },
                    "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'

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
            name: 'Doc 2 title',
            insideFolder: 1,
            group: 'Recent'
        }];
        var documentFunctions = {
            all: function() {
                return documents;
            },
            getByID: function(documentID) {
                var filterDocs = $filter('filter')(documents, { id: documentID });
                return filterDocs[0];
            },
            getFromFolder: function(folderID) {
                return $filter('filter')(documents, { insideFolder: folderID });
            }
        };
        return documentFunctions;
    }])
    .factory('folders', ['$filter', function($filter) {
        var folders = [{
            id: 1,
            name: 'UX Group',
            insideFolder: 0,
            shared: true,
            group: 'Shared'
        }, {
            id: 2,
            name: 'My Folder',
            insideFolder: 0,
            group: 'Recent'
        }, {
            id: 3,
            name: 'Android Concepts',
            insideFolder: 1
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
            getFromFolder: function(folderID) {
                return $filter('filter')(folders, { insideFolder: folderID });
            }
        };
        return folderFunctions;
    }]);