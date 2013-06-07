var args = arguments[0] || {};
var options;

var height;
var shown = false;
var loading = false;
var item, offset;

function doShow() {
	
	if (shown) {
		return false;
	}
	
	options.table.footerView.height = height;
    $.activityIndicator.show();
    
    shown = true;
    
    return true;
}

function doHide() {	
	
	if (shown === false) {
		return false;
	}
	
	$.footerView.height = 0;
    $.activityIndicator.hide();
    
    shown = false;
    
    return true;
}

function doTrigger() {
	
	if (loading) {
		return false;
	}
	
	loading = true;
	
	doShow();
	
	options.loader(finishLoading);
}

function finishLoading() {
    doHide();
    
    //ensure no multiple trigger events
    setTimeout(function(){
    	loading = false;	
    },500);
}

function doInit(args) {
	options = args;
	
	if (args.msg) {
		$.activityIndicator.message = args.msg;
	}

	height = $.footerView.height;
	options.table.footerView = $.footerView;
	options.table.footerView.height = 0;
	
	options.table.addEventListener('scroll', doScroll);
}

function doRemove() {
	options.table.footerView = null;
	options.table.removeEventListener('scroll', doScroll);
	
	options = null;
	height = null;
	shown = false;
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
	
	if (triggerLoad) {
		doTrigger();
    }
}

if (args.table && args.loader) {
	doInit(args);
}

exports.init	= doInit;
exports.show    = doShow;
exports.hide 	= doHide;
exports.trigger = doTrigger;
exports.remove	= doRemove;
