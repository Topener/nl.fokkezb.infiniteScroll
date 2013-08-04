var args = arguments[0] || {};

var options = {
  height: 50
};

var attached = false;
var loading = false;
var shown = false;

var item = null;
var offset = null;

function show() {
  
  if (!attached || shown) {
    return false;
  }

  shown = true;
  
  $.isIndicator.show();
  $.is.height = options.height;
  
  return true;
}

function hide() { 
  
  if (!attached || !shown) {
    return false;
  }
  
  $.is.height = 0;
  $.isIndicator.hide();
  
  shown = false;
  loading = false;
  
  return true;
}

function load() {
  
  if (!attached || loading) {
    return false;
  }

  loading = true;
  
  show();
  
  $.trigger('end');

  return true;
}

function scrollListener(e) {
  
  if (OS_ANDROID) {
    var triggerLoad = triggerLoad || (item && e.firstVisibleItem > item) && (e.totalItemCount < e.firstVisibleItem + e.visibleItemCount);
    item = e.firstVisibleItem;
  
  } else if (OS_IOS) {
    var triggerLoad = triggerLoad || (offset && e.contentOffset.y > offset) && (e.contentOffset.y + e.size.height > e.contentSize.height);
    offset = e.contentOffset.y;
  }

  if (triggerLoad) {
    load();
  }

  return;
}

function setOptions(_properties) {
  _.extend(options, _properties);
}

function attach(set) {
  
  if (attached) {
    return false;
  }
  
  $.is.height = 0;
  __parentSymbol.footerView = $.is;

  init();

  return true;
}

function init() {
  __parentSymbol.addEventListener('scroll', scrollListener);
  
  attached = true;
  loading = false;
  shown = false;

  item = null;
  offset = null;

  return;
}

function dettach() {

  if (!attached) {
    return false;
  }

  __parentSymbol.footerView = null;

  __parentSymbol.removeEventListener('scroll', scrollListener);

  attached = false;

  return true;
}

delete args.__parentSymbol;

setOptions(args);

init();

exports.setOptions = setOptions;
exports.show = show;
exports.hide = hide;
exports.load = load;
exports.dettach = dettach;
exports.attach = attach;