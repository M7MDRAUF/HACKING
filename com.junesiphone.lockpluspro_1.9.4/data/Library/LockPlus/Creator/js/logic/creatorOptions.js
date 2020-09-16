
(function(window, doc) {
	var creatorSettings = {};

	var methods = {
		bgcolor: function(value){
			doc.getElementById('screen').style.backgroundColor = value;
		},
		circlecolor: function(value){
			doc.getElementById('roundmenu').style.backgroundColor = value;
		},
		circleoutside: function(value){
			doc.getElementById('roundmenu').style.border = "2px solid " + value;
		},
        menubuttoncolor: function(value, key){
            addStyleString('.elementOption, .String{background-color:'+value+'!important;}', key + 'settings');
        },
        menubuttontextcolor: function(value, key){
            addStyleString('#elementPanelContainer span{color:'+value+';!important}', key + 'settings');
        },
        menubarscolor: function(value, key){
            addStyleString('.elementMenu::after, .elementMenu::before{background-color:'+value+'!important;}', key + 'settings');
        },
        menubarstextcolor: function(value, key){
            addStyleString('.elementScrollInfo,.elementCloseButton::after, .elementBackButton::after,.elementInfoTitle,.elementInfoDragger::after{color:'+value+'!important;}', key + 'settings');
        }
	}

    function saveSetting(setting, value, action){
        creatorSettings[setting] = {
            value: value
        };
        methods[setting](value, setting);
        localStorage.creatorOptions = JSON.stringify(creatorSettings);
    }

	function showColorPickerForCreatorOptions(saveName){
        function onMove(e, tinycolor){
            creatorOptions.saveSetting(saveName, tinycolor.toRgbString());
        }
        var color = (creatorSettings[saveName]) ? creatorSettings[saveName].value : '#131313';
        colorPicker.showPicker('colorPickerHolder', color, null, onMove, false);
	}

	function loadSavedOptions(){
		if(localStorage.creatorOptions != null && localStorage.creatorOptions != 'null'){
			creatorSettings = JSON.parse(localStorage.creatorOptions);
			Object.keys(creatorSettings).forEach(function (key) {
	        	var value = creatorSettings[key].value;
	        	if(methods[key]){
	        		methods[key](value, key);
	        	}
		    });
		}
	}

    function resetCreatorSettings(){
        creatorSettings = {};
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.init = function(){
        	loadSavedOptions();
        };
        externalMethods.showColorPickerForCreatorOptions = function(savename){
        	showColorPickerForCreatorOptions(savename);
        };
        externalMethods.saveSetting = function(setting, value, action){
        	saveSetting(setting, value, action);
        };
        externalMethods.resetCreatorSettings = function(){
            resetCreatorSettings();
        };
        return externalMethods;
    }
    window.creatorOptions = initExternalMethods();
}(window, document));


//if I load this elsewhere I wouldn't have to worry about setting a timeout.
setTimeout(function(){
	creatorOptions.init();
}, 200);