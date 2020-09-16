(function(window, doc) {

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(){
            var obj = {
                name: "RSS_URLS",
                'http://feeds.feedburner.com/crunchgear': 'Tech Crunch',
                'https://www.wired.com/feed': 'Wired',
                'https://www.theverge.com/rss/frontpage': 'Verge',
                'http://feeds.feedburner.com/DumbLittleMan': 'Dumb Little Man',
                'http://feeds.reuters.com/reuters/scienceNews': 'Science',
                'http://feeds.feedburner.com/boingboing': 'BoingBoing',
                'http://feeds.reuters.com/reuters/topNews': 'World News',
                'http://rss.cnn.com/rss/cnn_topstories' : 'CNN',
                'http://feeds.reuters.com/reuters/entertainment': 'Entertainment',
                'http://feeds.feedburner.com/quotationspage/qotd' : 'Quotes',
                'http://feeds.feedburner.com/Mashable' : 'Mashable',
                'http://feeds.feedburner.com/elise/simplyrecipes' : 'Recipes',
                'http://feeds.feedburner.com/InterestingThingOfTheDay': 'Interesting Thing',
                'https://www.forbes.com/most-popular/feed/' : 'Forbes',
                'http://feeds.feedburner.com/entrepreneur/latest': 'Entrepreneur',
                'https://www.cnet.com/rss/news/': 'CNET',
                'http://www.espn.com/espn/rss/news' : 'ESPN',
                'http://www.theonion.com/feeds/rss' : 'Onion',
                'http://feeds.feedburner.com/thedailybeast/articles' : 'DailyBeast',
                'custom' : function(){
                    var pr = prompt('Enter url');
                    if(pr){
                        action.savedElements.placedElements[action.selectedItem]['data-url'] = pr;
                        action.saveStorage();
                        menuLayout.close();
                    }
                }
            };
            menuLayout.generateMenu({
        		dict: obj,
        		backAction: function(){
                    menuLayout.close();
        		},
        		clickAction: function(el){
                    if(el.target.title && el.target.title != 'custom'){
                        action.savedElements.placedElements[action.selectedItem]['data-url'] = el.target.title;
                        action.saveStorage();
                        menuLayout.close();
                    }
        		}
        	});
        };
        return externalMethods;
    }
    window.rssMenu = initExternalMethods();
}(window, document));

