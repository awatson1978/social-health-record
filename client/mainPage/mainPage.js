Template.mainPage.events({
  'click #signInButton': function () {
    Router.go("/entrySignIn");
  },
  'click #signUpButton': function () {
    Router.go("/entrySignUp");
  },
  "click #usersListButton":function () {
    Router.go("/table/users");
  }
});

Template.mainPage.helpers({

});
