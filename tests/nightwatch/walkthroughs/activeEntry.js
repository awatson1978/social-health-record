// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api

// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ["accounts", "janedoe", "signUp", "signIn", "entry"],
  before: function (client) {
    // this depends on the accounts-housemd package
    client
      .url('http://localhost:3000')
      .meteorCall('removeAllUsers', false, false)
      .pause(1000);
  },
  "A. Sign In (Failure)": function (client) {
    client
      .url("http://localhost:3000")
      .resizeWindow(768, 1024)
      //.resizeWindow(375, 667)

    .waitForPage("#entrySignIn")
      .saveScreenshot("tests/nightwatch/screenshots/iphone/accountsEntry/A-signInPage.png")
      .reviewSignIn()
      .signIn("janedoe@pentasyllabic.com", "janedoe123").pause(300)

    .verify.containsText("#signInToAppButton", "USER NOT FOUND").pause(500)
      .saveScreenshot("tests/nightwatch/screenshots/iphone/accountsEntry/A1-signInPage.png")

    .click("#needAnAccountButton").pause(1000);

  },
  "B. Sign Up Page": function (client) {
    client
      .verify.elementPresent("#entrySignUp")
      .saveScreenshot("tests/nightwatch/screenshots/iphone/accountsEntry/B-signUpPage.png")

    .reviewSignUp()
      .signUp("janedoe@pentasyllabic.com", "janedoe123", "Jane Doe").pause(1000)

    // .verify.elementPresent("#signUpPageJoinNowButton")
    // .click("#signUpPageJoinNowButton").pause(1000);
  },
  "C. Home Page": function (client) {
    client
      .verify.elementPresent("#usersTablePage")
      .saveScreenshot("tests/nightwatch/screenshots/iphone/accountsEntry/C-homePage.png")
  },
  "D. Logout": function (client) {
    client
      .meteorLogout()
      // .verify.elementPresent("#entrySignIn")
  },
  "E. Sign In (Success)": function (client) {
    client
      .url("http://localhost:3000/entrySignIn")
      .verify.elementPresent("#entrySignIn")
      .saveScreenshot("tests/nightwatch/screenshots/iphone/accountsEntry/C-homePage.png")

      .signIn("janedoe@pentasyllabic.com", "janedoe123").pause(500)
      .verify.elementPresent("#usersTablePage")

    .end();
  }
};


//
//
//
// module.exports = {
//   tags: ['users', 'entry'],
//   before: function(client){
//     // this depends on the accounts-housemd package
//     client
//       .url("http://localhost:3000")
//       .meteorCall("removeAllUsers", false, false)
//       .pause(500)
//   },
//   "new user should be able to register on desktop" : function (client) {
//     var newUserId = false;
//     client
//       .resizeWindow(1024, 768)
//       .url("http://localhost:3000/entrySignUp")
//       .reviewSignInPage()
//   },
//   "company logo should display on sign-in page" : function (client) {
//     client
//       .expect.element("#logo").to.be.visible
//   },
//   "error messages should be empty by default" : function (client) {
//     client
//       .expect.element("#errorMessages").to.not.be.visible
//   },
//   "user should be able to request be able to create new account" : function (client) {
//     client
//       .expect.element("#signUpPageEmailInput").to.be.visible
//       .expect.element("#signUpPagePasswordInput").to.be.visible
//       .expect.element("#signUpPagePasswordInput").to.be.visible
//       .expect.element("#signUpPageJoinNowButton").to.be.visible
//   },
//   "guest should be notified if username already exists" : function (client) {
//     client
//
//   },
//
//   "guest should be notified if passwords do not match" : function (client) {
//     client
//
//   },
//   "guest should be notified if email is not correctly formatted" : function (client) {
//     client
//
//   },
//   "when new user fills out form and registers, new user should get created" : function (client) {
//     client
//
//   },
//   "when user signs in with username and password, should redirect to home page" : function (client) {
//     client
//
//   },
//   "user should be able to request reset password email" : function (client) {
//     client
//
//   },
//   "existing user should be able to sign in on desktop" : function (client) {
//     client
//
//   },
//   "existing user should be able to sign in on tablet" : function (client) {
//     client
//
//   },
//   "existing user should be able to sign in on phone" : function (client) {
//     client
//
//   },
// };
