Template.navbarFooter.events({
  "click #infoBtn": function (event, template) {
    Router.go('/info');
  },
  "click #tableBtn": function (event, template) {
    Router.go('/table/users');
  },
  "click #initializeBtn": function (event, template) {
    console.log('initializing database');
    Meteor.call("initializeDatabase");
  },
  "click #dropBtn": function (event, template) {
    console.log('dropping database');
    Meteor.call('dropDatabase');
  }
});
