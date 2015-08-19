// Write your tests here!
// Here is an example.



Tinytest.add('EntrySignIn - No errors should display by default.', function (test) {
  test.equal(Session.get("signinErrors"), {});
});
Tinytest.add('My First Test', function (test) {
  test.equal(true, true);
});


Tinytest.add('Entry Pages Client Test', function (test) {
  if(Meteor.isClient){
    test.equal("fizzle!", Template.entrySignIn.__helpers.get('foo')());
  }
});
