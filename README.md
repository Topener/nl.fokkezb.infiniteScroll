**WANTED**: Help to make the widget Android and Mobile Web compatible

# DynamicScrolling Widget
## Overview
The *DynamicScrolling* widget is an [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) implementation of dynamic scrolling for a *TableView*, like found in the [KitchenSink](https://github.com/appcelerator/KitchenSink/blob/master/Resources/ui/handheld/ios/baseui/table_view_dynamic_scroll.js) for [Titanium](http://www.appcelerator.com/platform) by [Appcelerator](http://www.appcelerator.com).

## Screenshot
![Dynamic Scrolling](https://raw.github.com/FokkeZB/nl.fokkezb.dynamicScrolling/master/app/widgets/nl.fokkezb.dynamicScrolling/docs/screenshot.png)

## Features
* Initialize the widget through one simple call.
* Localize the loading message through [Internationalization](http://docs.appcelerator.com/titanium/latest/#!/guide/Internationalization) or pass your own.
* Hide or even remove the view if you don't need it anymore.

## Future work
* Android and Mobile Web compatibility and testing.
* Find out how to override the view/style from outside the widget.

## Quick Start
* [Download the latest version](https://github.com/FokkeZB/nl.fokkezb.dynamicScrolling/tags) of the widget as a ZIP file.
* Move the file to your project's root folder.
* Unzip the file and you'll find the widget under `app/widgets/nl.fokkezb.dynamicScrolling`.
* Add the widget as a dependency to your `app/config.json` file like so:

```javascript
	"dependencies": {
		"nl.fokkezb.dynamicScrolling":"1.0"
	}
```

* Attach the widget to any *Ti.UI.TableView*. 

```javascript
var scrollCtrl = Alloy.createWidget('nl.fokkezb.dynamicScrolling', null, {
	table: $.myTable,
	loader: myLoaderCallback
});
```

**or**

```javascript
var scrollCtrl = Alloy.createWidget('nl.fokkezb.dynamicScrolling');
scrollCtrl({
	table: $.myTable,
	loader: myLoaderCallback
});
```

* Your *myLoaderCallback* gets passed a callback that should be called upon completion to let the widget finish up.

```javascript
function myLoaderCallback(widgetCallback) {
	// DO YOUR LOADING
	widgetCallback();
}
```

## Additonal parameters
The only required parameters are the `table` and `loader` parameters. You can change the displayed texts using the following additional ones:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| msg | `string` | Loading... *(Internationalized)* |

## Addtional API functions
You can also manually *show* and *hide* the view, undo the *init* completely or *trigger* the complete cycle of the widget. You e.g. use *remove* upon reaching the end of your table's contents.

| Function | Parameters | Usage |
| -------- | ---------- | ----- |
| init     | `Object`   | Initialize the widget (see Quick Start) | 
| trigger  |            | Manually trigger show > load > hide cycle 
| show     |            | Show the tableFooterView |
| hide     |            | Hide the tableFooterView |
| remove   |            | Undo the init |

## Changelog
* 1.0.1: Fixed for Alloy 1.0GA
* 1.0: Initial version