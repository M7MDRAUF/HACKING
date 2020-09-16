lppTemplates['CustomControls'] = {
    "playmusic": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "75px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "transparent",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "prevmusic": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "20px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "transparent",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "box18": {
        "type": "element",
        "css": {
            "width": "30px",
            "height": "30px",
            "background-color": "transparent",
            "z-index": "2",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "15px",
            "left": "85px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "data-image": "https://lockplus.us/CreatorAssets/images/bootsplay1.svg",
            "data-image2": "https://lockplus.us/CreatorAssets/images/bootspause1.svg",
            "background-image": "url(\"https://lockplus.us/CreatorAssets/images/bootsplay1.svg\")",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "customName": "playImage"
        }
    },
    "box19": {
        "type": "element",
        "css": {
            "width": "30px",
            "height": "30px",
            "background-color": "transparent",
            "z-index": "2",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "15px",
            "left": "30px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "data-image": "https://lockplus.us/CreatorAssets/images/bootsprev1.svg",
            "background-image": "url(\"https://lockplus.us/CreatorAssets/images/bootsprev1.svg\")",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "customName": "prevImage"
        }
    },
    "box20": {
        "type": "element",
        "css": {
            "width": "30px",
            "height": "30px",
            "background-color": "transparent",
            "z-index": "2",
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "15px",
            "left": "140px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "data-image": "https://lockplus.us/CreatorAssets/images/bootsnext1.svg",
            "background-image": "url(\"https://lockplus.us/CreatorAssets/images/bootsnext1.svg\")",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "customName": "nextImage"
        }
    },
    "nextmusic": {
        "type": "element",
        "css": {
            "top": "15px",
            "left": "130px",
            "position": "absolute",
            "z-index": "4",
            "font-family": "mat2",
            "font-size": "30px",
            "color": "transparent",
            "width": "50px",
            "height": "30px",
            "line-height": "30px",
            "text-align": "center"
        }
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["playmusic", "prevmusic", "box18", "box19", "box20", "nextmusic"],
            "data-name": "customPanels0",
            "width": "200px",
            "height": "60px",
            "position": "absolute",
            "z-index": "2",
            "top": "248px",
            "left": "60px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white"
        },
        "contains": ["playmusic", "prevmusic", "box18", "box19", "box20", "nextmusic"]
    }
};