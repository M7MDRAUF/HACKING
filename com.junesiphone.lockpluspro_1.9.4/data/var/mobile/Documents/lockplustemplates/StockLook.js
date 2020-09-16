lppTemplates['StockLook'] = {
    "zclock": {
        "type": "element",
        "css": {
            "top": "0px",
            "left": "0px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "-apple-system, BlinkMacSystemFont, sans-serif",
            "font-size": "70px",
            "color": "white",
            "width": "250px",
            "text-align": "center",
            "font-weight": "200"
        }
    },
    "datestring": {
        "type": "element",
        "css": {
            "left": "0px",
            "top": "80px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "-apple-system, BlinkMacSystemFont, sans-serif",
            "font-size": "18px",
            "color": "white",
            "width": "250px",
            "text-align": "center",
            "font-weight": "400"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["zclock", "datestring"],
            "data-name": "customPanels0",
            "width": "250px",
            "height": "125px",
            "position": "absolute",
            "z-index": "2",
            "top": "80px",
            "left": "35px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "border-radius": "10px"
        },
        "contains": ["zclock", "datestring"]
    }
};