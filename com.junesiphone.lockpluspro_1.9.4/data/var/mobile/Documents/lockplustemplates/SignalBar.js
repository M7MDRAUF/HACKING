lppTemplates['SignalBar'] = {
    "box34": {
        "type": "element",
        "css": {
            "width": "32px",
            "height": "6px",
            "background-color": "rgba(255,255,255,0.4)",
            "z-index": "1px",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "4px",
            "left": "4px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "border-radius": "5px",
            "customName": "signalBG"
        }
    },
    "box35": {
        "type": "element",
        "css": {
            "width": "30px",
            "height": "4px",
            "background-color": "white",
            "z-index": "2px",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "5px",
            "left": "5px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "is-signal": "true",
            "border-radius": "5px",
            "customName": "signalBar"
        }
    },
    "textTwentyFour": {
        "type": "element",
        "css": {
            "innerHTML": "signal",
            "top": "14px",
            "left": "0px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "helvetica",
            "font-size": "6px",
            "color": "white",
            "width": "40px",
            "height": "10px",
            "text-align": "center",
            "customName": "signalText"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["box34", "box35", "textTwentyFour"],
            "data-name": "customPanels0",
            "width": "40px",
            "height": "50px",
            "position": "absolute",
            "z-index": "2",
            "top": "80px",
            "left": "140px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "border-radius": "10px",
            "customName": "signalPanel"
        },
        "contains": ["box34", "box35", "textTwentyFour"]
    }
};