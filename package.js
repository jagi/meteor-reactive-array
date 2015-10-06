Package.describe({
  summary: 'Reactive array for Meteor',
  version: '0.1.0',
  name: 'jagi:reactive-array',
  git: 'https://github.com/jagi/meteor-reactive-array.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('erasaur:meteor-lodash');
  api.use('tracker');

  api.addFiles('lib/reactive_array.js', ['client', 'server']);

  api.export(['ReactiveArray'], ['client', 'server']);
});
