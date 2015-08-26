

Statuses = new Mongo.Collection('statuses');

Statuses.allow({
  insert: function (){
    return true;
  },
  update: function (){
    return true;
  },
  remove: function (){
    return true;
  }
});

if (Meteor.isClient){
  Meteor.subscribe("statuses");
};

if (Meteor.isServer){
  Meteor.publish("statuses", function (userId){
    return Statuses.find();
  });
};
