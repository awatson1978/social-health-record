


//==================================================================================================
// ROUTER

Router.route('entrySignUp',{
  template: 'entrySignUp',
  name: 'entrySignUp'
});

//==================================================================================================



Template.entrySignUp.helpers({
  getButtonText: function () {
    if(ActiveEntry.errorMessages.get('signInError')){
      return ActiveEntry.errorMessages.get('signInError').message;
    }else{
      return "Sign In";
    }
  },
  getEmailStyling: function () {
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
  getPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getConfirmPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('confirm', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getFullNameStyling: function () {
    if (ActiveEntry.errorMessages.equals('fullName', "Name is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('fullName', "Name is probably not complete")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('fullName', "Name present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});

Template.entrySignUp.events({
  "click #signUpPageSignInButton":function(){
    Router.go('/entrySignIn');
  },
  'change, keyup #signUpPageEmailInput': function (event, template) {
    var email = template.$('[name="email"]').val();
    ActiveEntry.validateEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordInput': function (event, template) {
    var password = template.$('[name="password"]').val();
    ActiveEntry.validatePassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordConfirmInput': function (event, template) {

    var password = template.$('[name="password"]').val();
    var confirmPassword = template.$('[name="confirm"]').val();

    ActiveEntry.validateConfirmPassword(password, confirmPassword);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPageFullNameInput': function (event, template) {
    var fullName = template.$('[name="fullName"]').val();

    ActiveEntry.validateFullName(fullName);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'submit': function(event, template) {
    event.preventDefault();

    ActiveEntry.errorMessages.set('signInError', null);
    ActiveEntry.validatePassword(event, template);

    var fullName = template.$('[name="fullName"]').val();
    var email = template.$('[name="email"]').val();
    var password = template.$('[name="password"]').val();
    var confirm = template.$('[name="confirm"]').val();

    ActiveEntry.validateFullName(fullName);
    ActiveEntry.validateEmail(email);
    ActiveEntry.validatePassword(password);
    ActiveEntry.validateConfirmPassword(password, confirm);

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        fullName: fullName
      }
    }, function(error) {
      if (error) {
        ActiveEntry.errorMessages.set('signInError', error);
      } else {
        var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
        Router.go(ActiveEntryConfig.signIn.destination);
      }

      Router.go('/table/users');
    });
  }
});
