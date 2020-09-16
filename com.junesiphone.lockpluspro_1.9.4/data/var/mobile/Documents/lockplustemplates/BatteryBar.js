lppTemplates['BatteryBar'] = {
    "box30": {
        "type": "element",
        "css": {
            "width": "32px",
            "height": "6px",
            "background-color": "rgba(255,255,255,0.4)",
            "z-index": "2",
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
            "customName": "batteryBG"
        }
    },
    "box31": {
        "type": "element",
        "css": {
            "width": "30px",
            "height": "4px",
            "background-color": "white",
            "z-index": "2",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "5px",
            "left": "5px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "is-battery": "true",
            "border-radius": "5px",
            "customName": "batteryBar"
        }
    },
    "textTwentyTwo": {
        "type": "element",
        "css": {
            "innerHTML": "battery",
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
            "customName": "batteryText"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["box30", "box31", "textTwentyTwo"],
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
            "customName": "batteryPanel"
        },
        "contains": ["box30", "box31", "textTwentyTwo"]
    }
};