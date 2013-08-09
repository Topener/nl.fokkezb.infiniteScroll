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
			"nl.fokkezb.infiniteScroll":"1.1"
		}
	```

* Add the widget to your *TableView*:

	```xml
	<TableView dataCollection="myCollection">
	  <Widget id="is" src="nl.fokkezb.infiniteScroll" onEnd="myLoader" />
	</TableView>
	```
	
* In the callback set via `myLoader` you can call `$.is.hide()` to hide the *FooterView* or `$.is.dettach()` to remove it when there are no more rows to load. For example:

	```javascript
	function myLoader() {
		
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
	
				// Reached the end
				if (col.length === ln) {
					$.is.dettach();
					
				// Just hide
				} else {
					$.is.hide();
				}
			},
			
			error: $.is.hide
		});
	}
	```

## Styling
The widget can be fully styled without touching the widget source. Use the following ID's in your app's `app.tss` to override the default style:

| ID | Description |
| --------- | ------- |
| `#is` | The view to be added as *FooterView* |
| `#isIndicator` | The *ActivityIndicator* showing during load |

## Options
There are no required options to pass via TSS properties or XML attributes, apart from the `onEnd` attribute to bind your callback to the end-event.

If you re-style the widget you might need to change the `height` of the footerView to keep during load. When the *FooterView* is added to your *TableView* its height will be set to `0`. When the user reaches the end of the *TableView* the height is set to the configured height.

| Parameter | Type | Default |
| --------- | ---- | ----------- |
| height | `number` | Height of the *FooterView* when shown (default: `50`) |

## Methods
You can also manually show and hide the view or trigger the complete cycle of the widget. You could use this for the first load when your window opens.

| Function   | Parameters | Usage |
| ---------- | ---------- | ----- |
| setOptions | `object`   | Set any of the options
| load       |            | Manually trigger show + the `end` event
| show       |            | Show the *FooterView*
| hide       |            | Hide the *FooterView*
| dettach    |            | Remove the *FooterView*
| attach     |            | Re-add the *FooterView* after removal

## Changelog
* 1.1:
  * Renamed to nl.fokkezb.infiniteScroll 
  * From now on declared in the XML view instead of the controller! 
  * Splitted `init` into `setOptions` and `attach`
  * Renamed `remove` to `dettach`
  * Renamed `trigger` to `load` to not interfere with BackBone 
* 1.0.1:
  * Fixed for Alloy 1.0GA
* 1.0: Initial version

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

