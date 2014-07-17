exports.definition = {
	config: {
		columns: {
			id: 'INTEGER PRIMARY KEY',
			title: 'TEXT'
		},
		adapter: {
			type: 'json',
			url: 'http://www.tidev.io/feed/json'
		}
	}
};