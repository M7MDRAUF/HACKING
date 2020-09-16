lppTemplates['MusicControls'] = {
    "playmusic": {
        "type": "element",
        "css": {
            "top": "14px",
            "left": "75px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "prevmusic": {
        "type": "element",
        "css": {
            "top": "14px",
            "left": "20px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "nextmusic": {
        "type": "element",
        "css": {
            "top": "14px",
            "left": "130px",
            "position": "absolute",
            "z-index": "2",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["playmusic", "prevmusic", "nextmusic"],
            "data-name": "customPanels0",
            "width": "200px",
            "height": "60px",
            "position": "absolute",
            "z-index": "2",
            "top": "248px",
            "left": "60px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "rgba(0,0,0,0.6)",
            "border-radius": "10px"
        },
        "contains": ["playmusic", "prevmusic", "nextmusic"]
    }
};