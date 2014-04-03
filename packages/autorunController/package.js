Package.describe({
    summary: 'Package for simplifying multiple autoruns with Meteor'
});

Package.on_use(function (api) {
    api.use('underscore', 'client');

    api.add_files('lib/autorunController.js', 'client');

    api.export('AutorunController', 'client');
});