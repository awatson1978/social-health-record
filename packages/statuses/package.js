Package.describe({
  name: 'statuses',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Status log and history.',
  // URL to the Git repository containing the source code for this package.
  git: 'http://github.com/awatson1978/active-record/packages/active-record-core',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use('meteor-platform');
  api.use('iron:router@1.0.7');

  api.use('aldeed:simple-schema@1.3.3');
  api.use('aldeed:collection2@2.3.3');
  api.use('aldeed:autoform@5.3.2');
  api.use('less');

  api.imply('aldeed:simple-schema');
  api.imply('aldeed:collection2');


  api.addFiles('statuses-core.less');

  api.addFiles('lib/statuses.js', ["server", "client"]);

  api.addFiles('components/statusesFooter/statusesFooter.html', ['client']);
  api.addFiles('components/statusesFooter/statusesFooter.js', ['client']);
  api.addFiles('components/statusesFooter/statusesFooter.less', ['client']);

  api.addFiles('components/statusesHeader/statusesHeader.html', ['client']);
  api.addFiles('components/statusesHeader/statusesHeader.js', ['client']);
  api.addFiles('components/statusesHeader/statusesHeader.less', ['client']);

  api.addFiles('components/statusesListPage/statusesListPage.html', ['client']);
  api.addFiles('components/statusesListPage/statusesListPage.js', ['client']);
  api.addFiles('components/statusesListPage/statusesListPage.less', ['client']);

  api.addFiles('components/statusUpsertPage/statusUpsertPage.html', ['client']);
  api.addFiles('components/statusUpsertPage/statusUpsertPage.js', ['client']);
  api.addFiles('components/statusUpsertPage/statusUpsertPage.less', ['client']);

  api.export('statusesFooter');
  api.export('statusesHeader');
  api.export('statusesListPage');
  api.export('statusUpsertPage');

  api.export('Statuses');
  api.export("Autoform");

});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('statuses-core');
  api.addFiles('tests/statuses-tests.js');

});
