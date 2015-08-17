
//--------------------------------------------------------------
// Global Configuration

Router.configure({
  layoutTemplate: "appLayout",
  yieldTemplates: {
    "navbarHeader": {to: "header"},
    "navbarFooter": {to: "footer"}
  }
});

Router.route("/", {
  template: "entrySignIn",
  name: "homeRoute"
});
Router.route("/info", {
  template: "mainPage",
  name: "infoRoute"
});

Router.onAfterAction = function (){
  Template.appLayout.delayedLayout(50);
};
