/*
    shadowInfo = [
        {
            type: '',
            xVal: '',
            yVal: '',
            blurVal: '',
            color: ''
        }
    ]
*/

(function(window, doc){
    function initExternalMethods() {
        var externalMethods = {};
        var selectedItemForGradient;

        function saveGradient(gradient){
            saveGradientToElement(gradient, selectedItemForGradient);
            applyGradientToElement(gradient, selectedItemForGradient);
        }

        var gradientPresets = {
            name: 'Gradients',
            'Faded': function(){
                var gradient = "linear-gradient(to bottom, rgba(255,255,255) 35%, black 100%)";
                saveGradient(gradient);
            },
            'FadedR': function(){
                var gradient = "linear-gradient(to bottom, black 20%, white 100%)";
                saveGradient(gradient);
            },
            'Far': function(){
                var gradient = "linear-gradient(0deg, rgba(255,0,229,0) 0%, rgba(255,255,255,0.6787902661064426) 100%)";
                saveGradient(gradient);
            },
            'Transp': function(){
                var gradient = "linear-gradient(0deg, rgba(0,242,255,0) 0%, rgba(255,255,255,1) 100%)";
                saveGradient(gradient);
            },
            'Smooth': function(){
                var gradient = "linear-gradient(to bottom, #485563, #29323c)";
                saveGradient(gradient);
            },
            'Dark': function(){
                var gradient = "linear-gradient(to bottom, #343434, #29323c)";
                saveGradient(gradient);
            },
            'Ocean': function(){
                var gradient = "linear-gradient(to bottom, #c2e59c, #64b3f4)";
                saveGradient(gradient);
            },
            'Moonlight': function(){
                var gradient = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
                saveGradient(gradient);
            },
            'Vivid': function(){
                var gradient = "linear-gradient(to bottom, #f953c6, #b91d73)";
                saveGradient(gradient);
            },
            'Cosmic': function(){
                var gradient = "linear-gradient(to bottom, #ff00cc, #333399)";
                saveGradient(gradient);
            },
            'Lime': function(){
                var gradient = "linear-gradient(to bottom, #fdfc47, #24fe41)";
                saveGradient(gradient);
            },
            'Cozy': function(){
                var gradient = "linear-gradient(to bottom, #d38312, #a83279)";
                saveGradient(gradient);
            },
            'Spoti': function(){
                var gradient = "linear-gradient(0deg, #7ee8fa 0%, #80ff72 74%)";
                saveGradient(gradient);
            },
            'CockTail': function(){
                var gradient = "linear-gradient(0deg, #36096d 0%, #37d5d6 74%)";
                saveGradient(gradient);
            },
            'CockTail': function(){
                var gradient = "linear-gradient(0deg, #36096d 0%, #37d5d6 74%)";
                saveGradient(gradient);
            },
            'Purp': function(){
                var gradient = "linear-gradient(0deg, #5de6de 0%, #b58ecc 74%)";
                saveGradient(gradient);
            },
            'Yuki': function(){
                var gradient = "linear-gradient(0deg, #9eabe4 0%, #77eed8 74%)";
                saveGradient(gradient);
            },
            'Harmless': function(){
                var gradient = "linear-gradient(0deg, #f6fba2 0%, #20ded3 74%)";
                saveGradient(gradient);
            },
            'Harmless': function(){
                var gradient = "linear-gradient(0deg, #f6fba2 0%, #20ded3 74%)";
                saveGradient(gradient);
            },
            'Warm': function(){
                var gradient = "linear-gradient(0deg, #bf033b 0%, #ffc719 74%)";
                saveGradient(gradient);
            },
            'Aki': function(){
                var gradient = "linear-gradient(0deg, rgba(0,212,255,1) 0%, rgba(0,242,255,1) 65%, rgba(0,254,255,1) 100%)";
                saveGradient(gradient);
            },
            'Hana': function(){
                var gradient = "linear-gradient(0deg, rgba(255,0,229,0) 0%, rgba(0,255,243,1) 100%)";
                saveGradient(gradient);
            },
            'Masao': function(){
                var gradient = "linear-gradient(0deg, rgba(255,0,229,0) 0%, rgba(255,0,211,1) 100%)";
                saveGradient(gradient);
            },
            'Sky': function(){
                var gradient = "linear-gradient(0deg, rgba(255,0,229,0) 0%, rgba(0,207,255,1) 100%)";
                saveGradient(gradient);
            },
            'Nao': function(){
                var gradient = "linear-gradient(0deg, rgba(255,0,229,0) 0%, rgba(19,255,0,1) 100%)";
                saveGradient(gradient);
            },
            'Ren': function(){
                var gradient = "linear-gradient(to bottom, #FF96F9 0%, #C32BAC 100%)";
                saveGradient(gradient);
            },

        };

        
        

        function showGradientPresets(){
            var obj = gradientPresets;
            menuLayout.generateMenu({
        		dict: obj,
        		backAction: function(){
                    menuLayout.loadMainMenu();
        		},
        		clickAction: function(el){
                    //selectPlacedElement(el.target.title.split('~')[0]);
        		}
        	});
        }
        externalMethods.showMenu = function() {
            selectedItemForGradient = action.selectedItem;
            showGradientPresets();
        };
        return externalMethods;
    }
    window.gradientPresets = initExternalMethods();
}(window, document));