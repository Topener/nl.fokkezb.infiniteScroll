var args = arguments[0] || {};

var options = {
	msgTap: L('isTap', 'Tap to load more...'),
	msgDone: L('isDone', 'No more to load...'),
	msgError: L('isError', 'Tap to try again...')
};

var loading = false,
	position = null;

init();

function init() {

	// delete special args
	delete args.__parentSymbol;
	delete args.__itemTemplate;
	delete args.$model;

	// set args as options
	setOptions(args);

	// set default text & remove indicator
	$.isText.text = options.msgTap;
	$.is.remove($.isIndicator);

	// listen to scroll
	__parentSymbol.addEventListener('scroll', onScroll);

	return;
}

function state(state, message) {

	// remove indicator
	$.isIndicator.hide();
	$.is.remove($.isIndicator);

	// set custom message
	if (message) {
		$.isText.text = message;

	// set state message
	} else {

		if (state === 0 || state === false) {
			$.isText.text = options.msgError;
		} else if (state === -1) {
			$.isText.text = options.msgDone;
			loading = true;
		} else if (state === 1 || state === true) {
			$.isText.text = options.msgTap;
		} else {
			throw Error('Pass a valid state');
		}
	}

	// add text
	$.is.add($.isText);

	if(loading) {
		return true;
	} else {
		loading = false;
	}

	return true;
}

function load() {

	if (loading) {
		return false;
	}

	loading = true;

	// remove text
	$.is.remove($.isText);

	// add indicator
	$.is.add($.isIndicator);
	$.isIndicator.show();

	// trigger listener to load
	$.trigger('end', {
		success: function (msg) { return state(exports.SUCCESS, msg); },
		error: function (msg) { return state(exports.ERROR, msg); },
		done: function (msg) { return state(exports.DONE, msg); },
	});

	return true;
}

function onScroll(e) {
	var triggerLoad;

	if (OS_ANDROID) {

		// last item shown
		triggerLoad = (position && e.firstVisibleItem > position && e.totalItemCount <= (e.firstVisibleItem + e.visibleItemCount));

		// remember position
		position = e.firstVisibleItem;

	} else if (OS_IOS) {

		// last pixel shown
		triggerLoad = (position && e.contentOffset.y > position) && (e.contentOffset.y + e.size.height > e.contentSize.height);

		// remember position
		position = e.contentOffset.y;
	}

	// trigger
	if (triggerLoad) {
		load();
	}

	return;
}

function dettach() {

	// set as done
	state(exports.DONE);

	// remove listener
	__parentSymbol.removeEventListener('scroll', onScroll);

	return;
}

function setOptions(_properties) {
	_.extend(options, _properties);
}

exports.SUCCESS = 1;
exports.ERROR = 0;
exports.DONE = -1;

exports.setOptions = setOptions;
exports.load = load;
exports.state = state;
exports.dettach = dettach;