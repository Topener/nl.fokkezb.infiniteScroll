function Sync(method, model, opts) {

  if (method !== 'read') {
    throw 'This sync adapter only reads.';

  } else {

    if (Ti.Network.online) {

      var xhr = Ti.Network.createHTTPClient({

        onload: function() {

          try {
            var values = JSON.parse(this.responseText);

            model.length = values.length;

            opts.success((model.length === 1) ? values[0] : values, this.responseText);

          } catch (e) {
            opts.error(model, this.responseText);
          }

        },

        onerror: function(e) {
          opts.error(model, this.responseText);
        }

      });

      var url = model.config.adapter.url;

      if (opts.params) {
        url += opts.params;
      }

      xhr.open('GET', url);
      xhr.send();

    } else {
      opts.error(model, 'Network is offline');
    }
  }
}

exports.sync = Sync;