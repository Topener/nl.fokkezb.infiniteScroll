// as from Alloy 1.3.0 we need to manually bind the table
$.tableWidget.init($.table);
$.listWidget.init($.list);

$.index.open();

// trigger load to populate first page
$.tableWidget.load();
$.listWidget.load();

/* whenever you populate the listview collection without using the widget
 * always let it update its marker by calling $.listWidget.mark()
 */

function tableLoader(e) {
  myLoader(e, $.tableCollection);
}

function listLoader(e) {
  myLoader(e, $.listCollection);
}

function myLoader(e, collection) {
  var ln = collection.models.length;

  collection.fetch({

    // ask for right page depending on what we have and knowing it's 10 per page
    params: '?paged=' + (Math.floor(ln / 10) + 1),

    // don't reset the collection, but add to it
    add: true,

    success: function(col) {

      // call done() when we received last page - else success()
      (col.models.length - ln < 10) ? e.done() : e.success();
    },

    // call error() when fetch fails
    error: e.error
  });
}