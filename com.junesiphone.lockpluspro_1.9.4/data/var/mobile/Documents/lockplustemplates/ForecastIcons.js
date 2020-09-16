lppTemplates['ForecastIcons'] = {
    "day1icon": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "15px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "30px",
            "height": "30px",
            "iconname": 'swhite'
        }
    },
    "day2icon": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "65px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "30px",
            "height": "30px"
        }
    },
    "day3icon": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "115px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "30px",
            "height": "30px"
        }
    },
    "day4icon": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "165px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "30px",
            "height": "30px"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["day1icon", "day2icon", "day3icon", "day4icon"],
            "data-name": "customPanels0",
            "width": "210px",
            "height": "60px",
            "position": "absolute",
            "z-index": "2",
            "top": "248px",
            "left": "55px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "rgba(0,0,0,0.6)",
            "border-radius": "10px"
        },
        "contains": ["day1icon", "day2icon", "day3icon", "day4icon"]
    }
}