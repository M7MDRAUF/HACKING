/* Not USED */

var multiSelectedItems = [],
	multiDragger = null;

setTimeout(function(){
	multiDragger = new DragSelect({
	  selectables: document.getElementById('screenElements').children,
	  callback:function(e){
	  	multiDragger.stop();
	  	// action.selectedItem = multiSelectedItems;
	  	// bottomMenu.toggle();
	  	// //showMultiBottomMenu(multiSelectedItems);
	  	// multiSelectedItems = [];
	  },
	  onElementSelect: function(element) {
	  	multiSelectedItems.push(element.id);
	  	element.style.outline = '1px solid white';
	  }
	});

	multiDragger.stop();
},400);


