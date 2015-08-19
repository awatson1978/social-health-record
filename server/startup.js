Meteor.startup(function(){
    console.log("Starting up " + process.env.DOMAIN + " in " + process.env.METEOR_ENV);

    if(process.env.METEOR_ENV === "development"){
      /*console.log("process.env", process.env);*/
      Env.display();
    }
});


Env.allow({
  DEBUG: true,
  TRACE: true,
  METEOR_ENV: true,
  DOMAIN: true,
  SECRET_KEY: false
});

Accounts.emailTemplates.siteName = "AwesomeSite";
Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Awesome Town, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have been selected to participate in building a better future!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};  
