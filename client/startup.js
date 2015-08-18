Meteor.startup(function(){

  if(process.env.METEOR_ENV === "development"){
    console.log("Running in " + process.env.METEOR_ENV);
  }

  if(process.env.DEBUG === "true"){
    Env.display();
  }


  ActiveEntry.configure({
    logo: {
      url: "/mini-circles.png",
      displayed: true
    },
    signIn: {
      displayFullName: true,
      destination: "/table/users"
    },
    signUp: {
      destination: "/table/users"
    },
    themeColors: {
      primary: ""
    }
  });


});
