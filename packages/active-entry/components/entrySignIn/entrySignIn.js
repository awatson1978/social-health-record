
//==================================================================================================
// ROUTER

Router.route('entrySignIn', {
  template: 'entrySignIn',
  name: 'entrySignIn'
});


//==================================================================================================



Template.entrySignIn.helpers({
  getButtonText: function () {
    if(ActiveEntry.errorMessages.get('signInError')){
      return ActiveEntry.errorMessages.get('signInError').message;
    }else{
      return "Sign In";
    }
  },
  getEmailValidationStyling: function () {
    if (ActiveEntry.errorMessages.equals('email', "Email is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('email', "Email is poorly formatted")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('email', "Email present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getPasswordValidationStyling: function () {
    if (ActiveEntry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});


Template.entrySignIn.events({
  'click #forgotPasswordButton': function () {
    Router.go('/forgotPassword');
  },
  "click #needAnAccountButton": function () {
    Router.go('/entrySignUp');
  },
  'change #signInPageEmailInput': function (event, template) {
    var email = template.$('[name="email"]').val();
    ActiveEntry.validateEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change #signInPagePasswordInput': function (event, template) {
    var password = template.$('[name="password"]').val();
    ActiveEntry.validatePassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'submit': function (event, template) {
    event.preventDefault();

    var emailValue = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    ActiveEntry.validatePassword(password);
    ActiveEntry.validateEmail(email);

    Meteor.loginWithPassword({email: emailValue}, password, function (error) {
      if (error) {
        ActiveEntry.errorMessages.set('signInError', error);
      }else{
        var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
        Router.go(ActiveEntryConfig.signIn.destination);
      }
    });
  }
});
