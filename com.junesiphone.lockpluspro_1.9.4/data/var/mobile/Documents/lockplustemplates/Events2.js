lppTemplates['Events2'] = {
    "box40": {
        "type": "element",
        "css": {
            "width": "2px",
            "height": "20px",
            "background-color": "white",
            "z-index": "4",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "15px",
            "left": "10px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "border-radius": "2px",
            "customName": "Event1Side"
        }
    },
    "events1title": {
        "type": "element",
        "css": {
            "left": "20px",
            "top": "13px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "helvetica",
            "font-size": "12px",
            "color": "white",
            "width": "200px",
            "text-align": "left"
        }
    },
    "events1day": {
        "type": "element",
        "css": {
            "top": "27px",
            "left": "20px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "helvetica",
            "font-size": "8",
            "color": "rgba(255,255,255,0.6)",
            "width": "200px",
            "text-align": "left"
        }
    },
    "box42": {
        "type": "element",
        "css": {
            "width": "2px",
            "height": "20px",
            "background-color": "white",
            "z-index": "4",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "15px",
            "left": "10px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "border-radius": "2px",
            "customName": "Event2Side"
        }
    },
    "events2title": {
        "type": "element",
        "css": {
            "left": "20px",
            "top": "13px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "helvetica",
            "font-size": "12px",
            "color": "white",
            "width": "200px",
            "text-align": "left"
        }
    },
    "events2day": {
        "type": "element",
        "css": {
            "top": "27px",
            "left": "20px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "helvetica",
            "font-size": "8",
            "color": "rgba(255,255,255,0.6)",
            "width": "200px",
            "text-align": "left"
        }
    },
    "customPanels0": {
        "type": "panel",
        "css": {
            "data-vars": ["box40", "events1title", "events1day"],
            "data-name": "customPanels0",
            "width": "250px",
            "height": "50px",
            "top": "0px",
            "left": "0px",
            "position": "absolute",
            "z-index": "9",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "customName": "Event1Panel"
        },
        "contains": ["box40", "events1title", "events1day"]
    },
    "customPanels1": {
        "type": "panel",
        "css": {
            "data-vars": ["box42", "events2title", "events2day"],
            "data-name": "customPanels1",
            "width": "250px",
            "height": "50px",
            "top": "50px",
            "left": "0px",
            "position": "absolute",
            "z-index": "9",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "customName": "Event2Panel"
        },
        "contains": ["box42", "events2title", "events2day"]
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["customPanels0", "customPanels1"],
            "data-name": "customPanels2",
            "width": "250px",
            "height": "130px",
            "position": "absolute",
            "z-index": "9",
            "top": "100px",
            "left": "35px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "customName": "mainEventPanel"
        },
        "contains": ["customPanels0", "customPanels1"]
    }
};