/* 
    Pending fonts are fonts users are wanting to add to the creator.
    Works by loading a js file when creator is loaded the tweak reads
    the fonts from /Library/LockPlus and stores in userAddedFonts array.
*/

(function(window, doc) {

    /* 
        Create Object of fonts for menuLayout to create.

        fontObj = {
            name: "Pending Fonts",
            reload_fontmenu: 'reload fonts',
            examplefont: examplefont,
            examplefont2: examplefont2
        }

    */
    function getPendingFonts(){
        var fontObj = {
            name: "Pending Fonts",
            reload_fontmenu: 'reload fonts'
        },i;
        if(userAddedFonts.length > 0 && userAddedFonts[0].length > 0){
            for (i = 0; i < userAddedFonts.length; i += 1) {
                if(userAddedFonts[i] != " "){
                    fontObj[userAddedFonts[i]] = userAddedFonts[i];
                }
            }
        }
        return fontObj;
    }

    function redirectToAddFont(){
        menuLayout.close();
        menuLayout.generateMenu({
            dict: menuPanel.add_font,
            backAction: function(){
                //on the back action of add_font it's to open root menu.
                menuLayout.close();
                mainMenu.create();
            },
            clickAction: function(el){
                // Not needed
            }
        });
    }

    function createMenu(){
        menuLayout.generateMenu({
            dict: getPendingFonts(),
            backAction: function(){
                redirectToAddFont();
                
            },
            clickAction: function(el){
                if(el.target.innerHTML == "reload fonts"){
                    location.href = "file:///Library/LockPlus/LockPlus/index.html";
                }else{
                    menuLayout.close();
                    window.location = "uploadfont:Library/LockPlus/fonts/" + el.target.innerHTML + ".otf~" + el.target.innerHTML + ".otf";
                }
            }
        });
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(){
            createMenu();
        };
        return externalMethods;
    }
    window.addFontsMenu = initExternalMethods();
}(window, document));
