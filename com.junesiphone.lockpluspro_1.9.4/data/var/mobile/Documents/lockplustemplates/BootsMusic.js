lppTemplates['BootsMusic'] = {
    "playmusic": {
        "type": "element",
        "css": {
            "top": "285px",
            "left": "112px",
            "position": "absolute",
            "z-index": 9,
            "font-family": "mat2",
            "font-size": "18px",
            "color": "white",
            "width": "30px",
            "height": "30px",
            "text-align": "center"
        }
    },
    "box17": {
        "type": "element",
        "css": {
            "width": "191px",
            "height": "151px",
            "background-color": "#7394a4",
            "z-index": 1,
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "25px",
            "left": "29.5px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "opacity": "0.6",
            "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.59), 0px -2px 2px rgba(255,255,255, 0.18)",
            "border-radius": "10px"
        }
    },
    "box18": {
        "type": "element",
        "css": {
            "width": "110px",
            "height": "110px",
            "background-color": "#212121",
            "z-index": 4,
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "200px",
            "left": "70px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.59), 0px -2px 2px rgba(255,255,255, 0.18)",
            "border-radius": "99px"
        }
    },
    "box19": {
        "type": "element",
        "css": {
            "width": "45px",
            "height": "45px",
            "background-color": "#242424",
            "z-index": 4,
            "border-color": "red",
            "border-style": "solid",
            "border-width": "0px",
            "position": "absolute",
            "top": "235px",
            "left": "102.5px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "box-shadow": "0px -1px 3px rgba(0, 0, 0, 0.53), 0px 1px 3px rgb(0,0,0)",
            "border-radius": "99px"
        }
    },
    "textNineteen": {
        "type": "element",
        "css": {
            "top": "212px",
            "left": "75px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "helvetica",
            "font-size": "10px",
            "color": "white",
            "height": "20px",
            "width": "100px",
            "text-align": "center",
            "innerHTML": "menu"
        }
    },
    "prevmusic": {
        "type": "element",
        "css": {
            "top": "248px",
            "left": "67px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "18px",
            "color": "white",
            "width": "40px",
            "height": "40px",
            "text-align": "center"
        }
    },
    "nextmusic": {
        "type": "element",
        "css": {
            "top": "248px",
            "left": "144px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "mat2",
            "font-size": "18px",
            "color": "white",
            "height": "40px",
            "width": "40px",
            "text-align": "center"
        }
    },
    "songalbumArtnohide": {
        "type": "element",
        "css": {
            "top": "25px",
            "left": "29.5px",
            "position": "absolute",
            "z-index": 0,
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "width": "191px",
            "height": "151px",
            "background-color": "black",
            "border-color": "black",
            "border-style": "solid",
            "border-width": "0px",
            "background-image": "url('file:///Library/LockPlus/Creator/images/blank.png",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "border-radius": "10px"
        }
    },
    "songartistnohide": {
        "type": "element",
        "css": {
            "top": "14px",
            "left": "10px",
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
            "left": "10px",
            "position": "absolute",
            "z-index": 4,
            "font-family": "helvetica",
            "font-size": "13px",
            "color": "white",
            "width": "200px",
            "text-align": "left"
        }
    },
    "customPanels1": {
        "type": "panel",
        "css": {
            "data-vars": ["songartistnohide", "songtitlenohide"],
            "data-name": "customPanels1",
            "width": "200px",
            "height": "55px",
            "top": "120px",
            "left": "30px",
            "position": "absolute",
            "z-index": 10,
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "overflow": "hidden"
        },
        "contains": ["songartistnohide", "songtitlenohide"]
    },
    "mainPanel": {
        "type": "panel",
        "css": {
            "data-vars": ["playmusic", "box17", "box18", "box19", "textNineteen", "prevmusic", "nextmusic", "songalbumArtnohide", "customPanels1"],
            "data-name": "customPanels0",
            "width": "250px",
            "height": "335px",
            "position": "absolute",
            "z-index": 9,
            "top": "125px",
            "left": "35px",
            "font-family": "helvetica",
            "font-size": "30px",
            "color": "white",
            "background-color": "#242424",
            "-webkit-backdrop-filter": "blur(5px)",
            "border-radius": "12px",
            "overflow": "hidden",
            "box-shadow": "0px 2px 2px rgba(0, 0, 0, 0.59), 0px 3px 5px rgba(0, 0, 0, 0.59)"
        },
        "contains": ["playmusic", "box17", "box18", "box19", "textNineteen", "prevmusic", "nextmusic", "songalbumArtnohide", "customPanels1"]
    }
};