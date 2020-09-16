/*
    All info is stored under testStorage (can be changed).
    check localStorage.testStorage to see what is stored.
    storedNames is the name in which the value is stored under
    it should match the saveName in jSettings to get a callback on load.
    storageItems are for FrontPage themes, for app changes and icon images.
*/
var storageName = themeName,
    storageItems = {
        iconList: {},
        iconImageLocations: {},
        iconHolderPosition: null,
        iconBadgePosition: {},
        nocustomdrawericons: null,
        dontorganizefavs: null,
        usecurrentbadges: null,
        hideapplabels: null,
        hideappbadges: null,
        alignlabelsleft: null,
        drawerLabels: {},
        hidedrawerlabels: null,
        drawerFavorites: [],
        badgePosition: null,
        overlayPosition: null,
        underlayPosition: null,
        underlayImage: null,
        overlayScale: null,
        underlayScale: null,
        overlayImage: null,
        labelPosition: null,
        moveAllItems: null,
        badgeSize: null,
        badgeBorderRadius: null,
        badgeImage: null,
        labelBadges: null,
        badgeFontSize: null,
        badgeWidthSize: null,
        badgeBGWidth: null,
        badgeBGHeight: null,
        badgeHeightSize: null,
        badgeImageSize: null,
        enablecolorbadges: null,
        labelFontSize: null,
        iconBorderRadius: null,
        badgeBackgroundColorDrawer: null,
        badgeTextColorDrawer: null,
        labelTextColorDrawer: null,
        iconSize: null,
        swipeupdrawer: true,
        enablespotlight: true,
        enabletodayview: true,
        hideFrontPageOnToday: true,
        bodyBackgroundColor: null,
        appIcons: {}
    };

//load page storage items

// if(Number(JSON.parse(localStorage[storageName]).pageLayout) > 0){
//     for(var i = 0; i < Number(localStorage[storageName].pageLayout); i++){
//         storageItems["iconHolder" + i] = [];
//     }
// }

function createPlaceHolderCSSStrings(){
    var string = "#fpplaceholder,";
    for (var i = 0; i < 201; i++) {
         string +=  (i < 200) ? "#fpplaceholder" + i + "," : "#fpplaceholder" + i + "";
    }
    return string;
}

var storageBlock = {
    // iconOverlayImage: {
    //     saveName: 'iconOverlayImage',
    //     onload: function(storedItem){
    //         var style = "";
    //         if(storedItem){
    //             style = '.overlay{-webkit-transform:scale('+ storedItem+');}';
    //             addStyleString(style, 'iconOverlayScale');
    //         }
    //     }
    // },
    bodyBackgroundColor: {
        saveName: 'bodyBackgroundColor',
        onload: function(value){
            if(value){
                addStyleString('body{background-color:'+value+'!important;}', 'bodyBackgroundColor');  
            }
        }
    },
    labelTextColorDrawer:{
        saveName: 'labelTextColorDrawer',
        onload: function(value){
            if(value){
                addStyleString('.icon_label{color:'+value+'!important;}', 'labelTextColorDrawer');
            }
        }
    },
    badgeTextColorDrawer:{
        saveName: 'badgeTextColorDrawer',
        onload: function(value){
            if(value){
                addStyleString('.icon_badge{color:'+value+'!important;}', 'badgeTextColorDrawer');
            }
        }
    },
    badgeBackgroundColorDrawer:{
        saveName: 'badgeBackgroundColorDrawer',
        onload: function(value){
            if(value){
                if(!lStorage.enablecolorbadges){
                    addStyleString('.icon_badge{background-color:'+value+'!important;}', 'badgeBackgroundColorDrawer');
                }
            }
        }
    },
    iconBorderRadius: {
        saveName: 'iconBorderRadius',
        onload: function(value){
            addStyleString(createPlaceHolderCSSStrings() + '{border-radius:'+value+'px!important;}', 'iconBorderRadius');
        }
    },
    iconSize: {
        saveName: 'iconSize',
        onload: function(value){
            addStyleString(createPlaceHolderCSSStrings() + '{background-position: center;background-size:'+value+'px!important;}', 'iconSize');
        }
    },
    badgeTextColor: {
        saveName: 'badgeTextColor',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{color:'+storedItem+'!important;}', 'badgeTextColor');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{color:'+storedItem+'!important;}', 'badgeTextColorDrawer');
                }
            }
        }
    },
    badgeWidthSize: {
        saveName: 'badgeWidthSize',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{width:'+storedItem+'px!important;height:'+storedItem+'px!important;padding:0!important;}', 'badgeWidth');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{width:'+storedItem+'px!important;height:'+storedItem+'px!important;padding:0!important;}', 'badgeWidthDrawer');
                }
            }
        }
    },
    badgeBGWidth:{
        saveName: 'badgeBGWidth',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{width:'+storedItem+'px!important;padding:0!important;}', 'badgeBGWidth');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{width:'+storedItem+'px!important;padding:0!important;}', 'badgeBGWidthDrawer');
                }
            }
        }
    },
    badgeBGHeight:{
        saveName: 'badgeBGHeight',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{height:'+storedItem+'px!important;padding:0!important;}', 'badgeBGHeight');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{height:'+storedItem+'px!important;padding:0!important;}', 'badgeBGHeightDrawer');
                }
            }
        }
    },
    badgeHeightSize: {
        saveName: 'badgeHeightSize',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{height:'+storedItem+'px!important;padding:0!important;}', 'badgeHeight');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{height:'+storedItem+'px!important;padding:0!important;}', 'badgeHeightDrawer');
                }
            }
        }
    },
    badgeImageSize: {
        saveName: 'badgeImageSize',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPBadge{background-size:'+storedItem+'% '+storedItem+'%!important;}', 'badgeImageSize');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{background-size:'+storedItem+'% '+storedItem+'%!important;}', 'badgeImageSize');
                }
            }
        }
    },
    badgeBackgroundColor: {
        saveName: 'badgeBackgroundColor',
        onload: function(storedItem){
            if(storedItem){
                if(!lStorage.enablecolorbadges){
                    addStyleString('.FPBadge{background-color:'+storedItem+'!important;}', 'badgeBackgroundColor');  
                    if(lStorage['usecurrentbadges']){
                        addStyleString('.icon_badge{background-color:'+storedItem+'!important;}', 'badgeBackgroundColorDrawer');
                    }
                }
            }
        }
    },
    labelTextColor: {
        saveName: 'labelTextColor',
        onload: function(storedItem){
            if(storedItem){
                addStyleString('.FPLabel{color:'+storedItem+'!important;}', 'labelTextColor');  
            }
        }
    },
    badgePosition: {
        saveName: 'badgePosition',
        onload: function(storedItem){
            if(storedItem){
                style = '.FPBadge{margin-left:'+storedItem.left+'px;margin-top:'+storedItem.top+'px;}';
                addStyleString(style, 'badgeDragging');
                if(lStorage['usecurrentbadges']){
                    addStyleString('.icon_badge{left:'+(storedItem.left-2)+'px;margin-top:'+storedItem.top+'px;}', 'badgeDraggingDrawer');
                }
            }
        }
    },
    appIcons: {
        saveName: 'appIcons',
        onload: function(storedItem){
            if(storedItem){
                Object.keys(storedItem).forEach(function(key){
                    if(storedItem[key]['labelTextColor']){
                        addStyleString('#'+key+' > .FPLabel{color:'+storedItem[key]['labelTextColor']+'!important;}', 'individualLabelTextColor');
                    }
                    if(storedItem[key]['badgeBackgroundColor']){
                        addStyleString('#'+key+' > .FPBadge{background-color:'+storedItem[key]['badgeBackgroundColor']+'!important;}', 'individualBadgeBGColor');
                    }
                    if(storedItem[key]['badgeTextColor']){
                        addStyleString('#'+key+' > .FPBadge{color:'+storedItem[key]['badgeTextColor']+'!important;}', 'individualBadgeTextColor');
                    }
                });
            }
        }
    }
}

function initiateStorage() {
    lStorage.preload(storageBlock);
    lStorage.init({
        name: storageName,
        storageItems: storageItems,
        onloadBlock: storageBlock
    });
}
initiateStorage();

// if(Number(lStorage.pageLayout) > 0){
//     var number = Number(lStorage.pageLayout);
//     for(var i = 0; i < number-1; i++){
//         pagesController.addPage('onreload');
//     }
// }

