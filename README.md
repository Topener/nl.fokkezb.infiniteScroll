# Alloy *Infinite Scroll* widget
The *Infinite Scroll* widget implements the design pattern also known as *Dynamic Scroll* or *Endless Scroll* for the [Alloy](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Quick_Start) MVC framework for [Titanium](http://www.appcelerator.com/platform) by [Appcelerator](http://www.appcelerator.com). A Titanium Classic implementation can be found in the [KitchenSink](https://github.com/appcelerator/KitchenSink/blob/master/Resources/ui/handheld/ios/baseui/table_view_dynamic_scroll.js).

Also take a look at my [Pull to Refresh](https://github.com/FokkeZB/nl.fokkezb.pullToRefresh) widget.

## Overview
The widget automatically shows an *ActivityIndicator* in a *TableView*'s *FooterView* when the user reached the end of the table. An event is triggered so that the implementing controller can load more rows.

![screenshot](https://raw.github.com/FokkeZB/nl.fokkezb.infiniteScroll/master/docs/screenshot.png)

## Features
* Add the widget to your *TableView* using just one line of code.
* Override all styling via your app's `app.tss`.
* Manually trigger the widget from your controller.

## Future work
* Full Android, Mobile Web, Tizen and BlackBerry compatibility and testing.
* Support for *ListView*s.

## Quick Start
* Download the latest [release](https://github.com/FokkeZB/nl.fokkezb.infiniteScroll/releases).
* Unzip the file to `app/widgets/nl.fokkezb.infiniteScroll`.
* Add the widget as a dependency to your `app/config.json` file:
	
	```javascript
		"dependencies": {
			"nl.fokkezb.infiniteScroll":"1.3.1"
		}
	```

* Add the widget to your *TableView*:

	```xml
	<TableView>
	  <Widget id="is" src="nl.fokkezb.infiniteScroll" onEnd="myLoader" />
	</TableView>
	```
	
* In the callback set via `myLoader` you call either `e.success()`, `e.error()` or `e.done()` optionally passing a custom message:

	```javascript
	function myLoader(e) {
		
		// Length before
		var ln = myCollection.length;
		
		myCollection.fetch({
		
			// Some data for the sync adapter to retrieve next "page"
			data: { offset: myCollection.length },
		
			// Don't reset the collection, but add to it
			add: true,
		
			// Don't trigger an "add" event for every model, but just one "fetch"
			silent: true,
			
			success: function (col) {
			
				// Call "done" if we didn't add anymore models
				(col.length === ln) ? e.done() : e.success();
			},
			
			error: e.error
		});
	}
	```

## Styling
The widget can be fully styled without touching the widget source. Use the following ID's in your app's `app.tss` to override the default style:

| ID | Description |
| --------- | ------- |
| `#is` | The view to be added as *FooterView* |
| `#isCenter` | Can be used to align the content, but mainly to support iOS7's `Ti.UI.Window.extendEdges` by setting `bottom` to the height of the TabGroup (49). |
| `#isIndicator` | The *ActivityIndicator* showing during load |
| `#isText` | The message shown when not loading. Set `visible` to `false` if you want to hide the text until the first load has happened. |

## Options
There are no required options to pass via TSS properties or XML attributes, apart from the `onEnd` attribute to bind your callback to the end-event. You can change the displayed messages by using the following options:

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| msgTap | `string` | Tap to load more... |
| msgDone | `string` | No more to load... |
| msgError | `string` | Tap to try again... |

## Methods
You can also manually trigger the loading state of the widget. You could use this for the first load when your window opens.

| Function   | Parameters | Usage |
| ---------- | ---------- | ----- |
| setOptions | `object`   | Set any of the options
| load       |            | Manually trigger the `end` event and loading state
| state      | `state`, `string`    | Manually set the state. The first argument should be one of the exported `SUCCESS`, `DONE` and `ERROR` constants. The second optional argument is a custom message to display instead of the message belonging to the state.
| dettach    |            | Manually set the `DONE` state and remove the scroll listener

## Changelog
* 1.3.1: 
  * Fixes scroll-load-state loop with fast syncs.
* 1.3:
  * Compatible with iOS7's new `Ti.UI.Window.extendEdges` via `#isCenter`.
  * Allows you to hide the text until first load by calling `show` after that
* 1.2:
  * Now compatible with Android (and other OS)
  * View will now always show since Android doesn't support removing it :(
* 1.1:
  * From now on declared in the XML view instead of the controller! 
  * Splitted `init` into `setOptions` and `attach`
  * Renamed `remove` to `dettach`
  * Renamed `trigger` to `load` to not interfere with BackBone 
* 1.0.1:
  * Fixed for Alloy 1.0GA
* 1.0: Initial version
itial version

## License

<pre>
Copyright 2013 Fokke Zandbergen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
</pre>

