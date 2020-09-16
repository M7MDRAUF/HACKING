lppTemplates['stepslogo'] = {
    "stepsToday": {
        "type": "element",
        "css": {
            "position": "absolute",
            "font-family": "aileronthin",
            "color": "white",
            "text-align": "right",
            "width": "35px",
            "font-weight": "bold",
            "z-index": "2",
            "top": "3px",
            "left": "5px",
            "font-size": "12px"
        }
    },
    "ft19_mashup": {
        "type": "element",
        "css": {
            "position": "absolute",
            "font-family": "mashup",
            "color": "rgb(255, 255, 255)",
            "z-index": "2",
            "top": 0,
            "left": "45px",
            "font-size": "20px"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["stepsToday", "ft19_mashup"],
            "data-name": "customPanel3",
            "width": "67px",
            "height": "65px",
            "position": "absolute",
            "z-index": "2",
            "top": "43px",
            "left": "223px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white"
        },
        "contains": ["stepsToday", "ft19_mashup"]
    }
};