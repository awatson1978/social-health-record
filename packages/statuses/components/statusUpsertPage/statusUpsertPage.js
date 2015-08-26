Session.setDefault('recordReadOnly', true);


Router.map(function(){
  this.route('newFooRoute', {
    path: '/insert/status',
    template: 'statusUpsertPage',
    onAfterAction: function(){
      Session.set('recordReadOnly', false);
    }
  });

});
Router.route('/upsert/status/:id', {
  name: 'upsertFooRoute',
  template: 'statusUpsertPage',
  data: function(){
    return Statuses.findOne(this.params.id);
  },
  onAfterAction: function(){
    Session.set('recordReadOnly', false);
  }
});
Router.route('/view/status/:id', {
  name: 'viewFooRoute',
  template: 'statusUpsertPage',
  data: function(){
    return Statuses.findOne(this.params.id);
  },
  onAfterAction: function(){
    Session.set('recordReadOnly', true);
  }
});


//-------------------------------------------------------------


Template.statusUpsertPage.rendered = function(){
  Template.appLayout.layout();
};


Template.statusUpsertPage.helpers({
  isNewFoo: function(){
    if(this._id){
      return false;
    }else{
      return true;
    }
  },
  getLockIcon: function(){
    if(Session.get('recordReadOnly')){
      return "fa-lock";
    }else{
      return "fa-unlock";
    }
  },
  isReadOnly: function(){
    if(Session.get('recordReadOnly')){
      return "readonly";
    }
  },
  getRecordId: function() {
    if(this._id) {
      return this._id;
    }else{
      return "---";
    }
  }
});

Template.statusUpsertPage.events({
  'click #removeRecordButton': function(){
    Statuses.remove(this._id, function(error, result){
      if(result){
        Router.go('/list/statuses');
      }
    });
  },
  "click #saveRecordButton": function(){
    Template.statusUpsertPage.saveStatus(this);
    Session.set('recordReadOnly', true);
  },
  "click .barcode": function(){
    // TODO:  refactor to Session.toggle('recordReadOnly')
    if(Session.equals('recordReadOnly', true)){
      Session.set('recordReadOnly', false);
    }else{
      Session.set('recordReadOnly', true);
      console.log('Locking the record...');
      Template.statusUpsertPage.saveStatus(this);
    }
  },
  "click #lockFooButton": function(){
    console.log("click #lockFooButton");

    if(Session.equals('recordReadOnly', true)){
      Session.set('recordReadOnly', false);
    }else{
      Session.set('recordReadOnly', true);
    }
  },
  "click .fa-chevron-left": function(event, template){
    Router.go('/list/statuses');
  },
  "click .imageGridButton": function(event, template){
    Router.go('/grid/foos');
  },
  "click .tableButton": function(event, template){
    Router.go('/table/foos');
  },
  'click #previewFooButton':function(){
    Router.go('/customer/' + this._id);
  },
  'click #upsertFooButton': function() {
    console.log('creating new foo...');
    Template.statusUpsertPage.saveStatus(this);
  }
});


Template.statusUpsertPage.saveStatus = function(record){
  // TODO:  add validation functions

  var newStatus = {
    title: $('input[name="title"]').val(),
    description: $('textarea[name="description"]').val(),
    imageUrl: $('input[name="imageUrl"]').val(),
    url: $('input[name="url"]').val()
  };

  console.log("newStatus",newStatus);


  if(record._id){
    Statuses.update({_id: record._id}, {$set: newStatus }, function(error, result){
      if(error) console.log(error);
      Router.go('/view/status/' + record._id);
    });
  }else{
    Statuses.insert(newStatus, function(error, result){
      if(error) console.log(error);
      Router.go('/view/status/' + result);
    });
  }
};
