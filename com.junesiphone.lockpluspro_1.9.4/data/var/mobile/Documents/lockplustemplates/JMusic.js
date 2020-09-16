lppTemplates['JMusic'] = {
    "playmusic": {
        "type": "element",
        "css": {
            "top": "65px",
            "left": "205px",
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
            "top": "65px",
            "left": "160px",
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
            "top": "65px",
            "left": "250px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "30px",
            "color": "white",
            "width": "40px",
            "text-align": "center"
        }
    },
    "songalbumArtnohide": {
        "type": "element",
        "css": {
            "top": "7px",
            "left": "10px",
            "position": "absolute",
            "z-index": 0,
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "85px",
            "height": "85px",
            "background-color": "black",
            "border-color": "black",
            "border-style": "solid",
            "border-width": "0px",
            "background-image": "url('file:///Library/LockPlus/Creator/images/blank.png",
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "border-radius": "5px"
        }
    },
    "songartistnohide": {
        "type": "element",
        "css": {
            "top": "14px",
            "left": "110px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "helvetica",
            "font-size": "13px",
            "color": "white",
            "font-weight": "100",
            "width": "200px",
            "text-align": "left"
        }
    },
    "songtitlenohide": {
        "type": "element",
        "css": {
            "top": "30px",
            "left": "110px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "helvetica",
            "font-size": "13px",
            "color": "white",
            "width": "200px",
            "text-align": "left"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["playmusic", "prevmusic", "nextmusic", "songalbumArtnohide", "songartistnohide", "songtitlenohide"],
            "data-name": "customPanels0",
            "width": "300px",
            "height": "100px",
            "position": "absolute",
            "z-index": 9,
            "top": "125px",
            "left": "10px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "rgba(0,0,0,0.6)",
            "-webkit-backdrop-filter": "blur(5px)",
            "border-radius": "10px",
            "overflow": "hidden"
        },
        "contains": ["playmusic", "prevmusic", "nextmusic", "songalbumArtnohide", "songartistnohide", "songtitlenohide"]
    }
};