var args = arguments[0] || {};
var options;

var height;
var loading = false;
var item, offset;

function doReset() {	
	$.footerView.height = 0;
    $.activityIndicator.hide();
    
    loading = false;
}

function doInit(args) {
	options = args;

	height = $.footerView.height;
	options.table.footerView = $.footerView;
	options.table.footerView.height = 0;
	
	options.table.on('scroll', doScroll);
}

function doRemove() {
	options.table.footerView = null;
	options.table.off('scroll', doScroll);
	
	options = null;
	height = null;
	loading = false;
	item = null;
	offset = null;
}

function doScroll(e) {	
	var triggerLoad;
	
	if (OS_ANDROID) {
		triggerLoad = (item && e.firstVisibleItem > item) && (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount);
		item = e.firstVisibleItem;
	
	} else if (OS_IOS) {
		triggerLoad = (offset && e.contentOffset.y > offset) && (e.contentOffset.y + e.size.height > e.contentSize.height);
		offset = e.contentOffset.y;
	}
	
	if (triggerLoad && !loading) {		
		loading = true;
		
		options.table.footerView.height = height;
    	$.activityIndicator.show();
		
		options.loader(doReset);
    }
}

if (args.table && args.loader) {
	doInit(args);
}

exports.init	= doInit;
exports.remove	= doRemove;
exports.reset 	= doReset;