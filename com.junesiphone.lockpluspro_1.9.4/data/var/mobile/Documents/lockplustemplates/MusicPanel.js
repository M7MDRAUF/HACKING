lppTemplates['MusicPanel'] = {
    "playmusic": {
        "type": "element",
        "css": {
            "top": "185px",
            "left": "92.5px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "40px",
            "text-align": "center"
        }
    },
    "prevmusic": {
        "type": "element",
        "css": {
            "top": "185px",
            "left": "32.5px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "40px",
            "text-align": "center"
        }
    },
    "nextmusic": {
        "type": "element",
        "css": {
            "top": "185px",
            "left": "162.5px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "40px",
            "text-align": "center"
        }
    },
    "boxTwenty": {
        "type": "element",
        "css": {
            "width": "225px",
            "height": "50px",
            "background-color": "rgba(0,0,0,0.6)",
            "z-index": 3,
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "176px",
            "left": "0px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "-webkit-backdrop-filter": "blur(1px)"
        }
    },
    "songalbumArtnohide": {
        "type": "element",
        "css": {
            "top": "0px",
            "left": "0px",
            "position": "absolute",
            "z-index": 0,
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "225px",
            "height": "225px",
            "background-color": "black",
            "border-color": "black",
            "border-style": "solid",
            "border-width": "0px",
            "background-image": "url('file:///Library/LockPlus/Creator/images/blank.png",
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "border-radius": "10px"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["playmusic", "prevmusic", "nextmusic", "boxTwenty", "songalbumArtnohide"],
            "data-name": "customPanels0",
            "width": "225px",
            "height": "225px",
            "position": "absolute",
            "z-index": 9,
            "top": "120px",
            "left": "47.5px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "transparent",
            "border-radius": "10px",
            "overflow": "hidden"
        },
        "contains": ["playmusic", "prevmusic", "nextmusic", "boxTwenty", "songalbumArtnohide"]
    }
};