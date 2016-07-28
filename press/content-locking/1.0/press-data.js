/*global angular : true fixes codekit error*/

angular.module('pressData', [])
    .factory('prototypeData', [function() {
        var pressPages = [{
            'name': 'Page 1',
            'thumb': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-1-Full.jpg',
            'id': 1,
            'canvasBG': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-1-Full.jpg',
            'blocks': [{
                'lock': {
                    'lock': 'unlock',
                    'position': false,
                    'style': false,
                    'content': false
                },
                'type': 'image',
                'backgroundImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-logo.jpg',
                "swatch": {
                    "fill": "transparent",
                    "text": "#AEAEAE",
                    "border": "transparent"
                },
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "",
                    "size": 16,
                },

                "padding": 7,
                "metrics": {
                    "z": 2,
                    "x": 35,
                    "y": 323,
                    "width": 218,
                    "height": 63
                }

            }, {
                'type': 'text',
                'lock': {
                    'lock': 'unlock',
                    'position': false,
                    'style': false,
                    'content': false
                },
                "swatch": {
                    "fill": "transparent",
                    "text": "#FFF",
                    "border": "transparent"
                },
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Single Family Homes",
                    "size": 40,
                },

                "padding": 4,
                "metrics": {
                    "z": 2,
                    "x": 24,
                    "y": 640,
                    "width": 380,
                    "height": 50
                }

            }, {
                'type': 'text',
                'lock': {
                    'lock': 'unlock',
                    'position': false,
                    'style': false,
                    'content': false
                },
                "swatch": {
                    "fill": "transparent",
                    "text": "#FFF",
                    "border": "transparent"
                },
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "January",
                    "size": 28,
                },

                "padding": 4,
                "metrics": {
                    "z": 2,
                    "x": 687,
                    "y": 374,
                    "width": 180,
                    "height": 50
                }

            }]
        }];
        return pressPages;
    }])
    ///////
    //Press Templates
    ///////
    .factory('pressTemplates', [function() {
        var pressTemplates = [{
            "category": "Marketing Material",
            "groups": [{
                "groupname": "Flyer",
                "size": {
                    "width": 8.5,
                    "height": 11,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-7.png"
                }]
            }, {
                "groupname": "Brochure",
                "size": {
                    "width": 11,
                    "height": 8.5,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-7.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-8.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-9.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-10.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-11.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-12.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-13.png"
                }]
            }, {
                "groupname": "Poster",
                "size": {
                    "width": 18,
                    "height": 24,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-7.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-8.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-9.png"
                }]
            }, {
                "groupname": "Stationary",
                "size": {
                    "width": 8.5,
                    "height": 11,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-stationary-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-stationary-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-stationary-template-3.png"
                }]
            }, {
                "groupname": "Business Card",
                "size": {
                    "width": 3.5,
                    "height": 2,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-7.png"
                }]
            }, {
                "groupname": "Leaflets",
                "size": {
                    "width": 3.667,
                    "height": 8.5,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-leaflet-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-leaflet-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-leaflet-template-3.png"
                }]
            }]
        }, {
            "category": "Events",
            "groups": [{
                "groupname": "Postcard",
                "size": {
                    "width": 6,
                    "height": 4,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-postcard-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-postcard-template-2.png"
                }]
            }, {
                "groupname": "Wedding",
                "size": {
                    "width": 5,
                    "height": 7,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-7.png"
                }]
            }, {
                "groupname": "Invitation",
                "size": {
                    "width": 7,
                    "height": 5,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-invitation-template-6.png"
                }]
            }, {
                "groupname": "Card",
                "size": {
                    "width": 7,
                    "height": 5,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-5.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-6.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-7.png"
                }]
            }]
        }, {
            "category": "Long Form Content",
            "groups": [{
                "groupname": "Magazine",
                "size": {
                    "width": 8.5,
                    "height": 11,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-magazine-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-magazine-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-magazine-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-magazine-template-4.png"
                }]
            }, {
                "groupname": "Newsletter",
                "size": {
                    "width": 8.5,
                    "height": 11,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-newsletter-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-newsletter-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-newsletter-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-newsletter-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-newsletter-template-5.png"
                }]
            }, {
                "groupname": "Report",
                "size": {
                    "width": 8.5,
                    "height": 11,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-3.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-4.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-5.png"
                }]
            }, {
                "groupname": "Photobook",
                "size": {
                    "width": 11,
                    "height": 8.5,
                },
                "unit": "in",
                "templates": [{
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-photobook-template-1.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-photobook-template-2.png"
                }, {
                    "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-photobook-template-3.png"
                }]
            }]
        }];
        return pressTemplates;
    }]);