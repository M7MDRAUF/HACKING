lppTemplates['Events3'] = { //Events3 must be the name of this file.
    events1title: {
        type: 'element',
        css: {
            'top': '13px',
            'width': '200px',
            'text-align': 'left',
            'font-family': 'helvetica',
            'z-index': '4',
            'font-size': '12px',
            'left': '20px'
        }
    },
    events2title: {
        type: 'element',
        css: {
            'top': '13px',
            'width': '200px',
            'text-align': 'left',
            'font-family': 'helvetica',
            'z-index': '4',
            'font-size': '12px',
            'left': '20px'
        }
    },
    events1daystring8: {
        type: 'element',
        css: {
            'top': '0px',
            'width': '200px',
            'text-align': 'left',
            'z-index': '4',
            'font-size': '8',
            'left': '10px'
        }
    },
    events2daystring8: {
        type: 'element',
        css: {
            'top': '0px',
            'width': '200px',
            'text-align': 'left',
            'z-index': '4',
            'font-size': '8',
            'left': '10px'
        }
    },
    events1timestring: {
        type: 'element',
        css: {
            'top': '28px',
            'width': '200px',
            'text-align': 'left',
            'padding-left': '2px',
            'z-index': '4',
            'font-size': '6px',
            'color': 'rgba(255,255,255,0.6)',
            'left': '18px'
        }
    },
    events2timestring: {
        type: 'element',
        css: {
            'top': '28px',
            'width': '200px',
            'text-align': 'left',
            'padding-left': '2px',
            'z-index': '4',
            'font-size': '6px',
            'color': 'rgba(255,255,255,0.6)',
            'left': '18px'
        }
    },
    box40: {
        type: 'element',
        css: {
            'top': '15px',
            'width': '2px',
            'height': '20px',
            'border-radius': '2px',
            'background-color': 'white',
            'z-index': '4',
            'left': '10px',
            'customName': 'Event1Side'
        }
    },
    box42: {
        type: 'element',
        css: {
            'top': '15px',
            'width': '2px',
            'height': '20px',
            'border-radius': '2px',
            'background-color': 'white',
            'z-index': '4',
            'left': '10px',
            'customName': 'Event2Side'
        }
    },
    panel1: {
        type: 'panel',
        contains: ['box40', 'events1title', 'events1daystring8', 'events1timestring'],
        css: {
            'width': '250px',
            'top': '0px',
            'height': '50px',
            'background-color': 'transparent',
            'z-index': '9',
            'left': '0px',
            'customName': 'Event1Panel'
        }
    },
    panel2: {
        type: 'panel',
        contains: ['box42', 'events2title', 'events2daystring8', 'events2timestring'],
        css: {
            'width': '250px',
            'top': '50px',
            'height': '50px',
            'background-color': 'transparent',
            'z-index': '9',
            'left': '0px',
            'customName': 'Event2Panel'
        }
    },
    mainPanel: {
        type: 'panel',
        contains: ['panel1', 'panel2'],
        css: {
            'width': '250px',
            'top': '100px',
            'height': '130px',
            'background-color': 'transparent',
            'z-index': '9',
            'left': 'center',
            'customName': 'mainEventPanel'
        }
    }
};