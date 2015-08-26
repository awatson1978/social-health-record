Template.statusesFooter.helpers({
  isUpsert: function () {
    if (this.type === "upsert") {
      return true;
    } else {
      return false;
    }
  },
  hasId: function () {
    if (this.doc && this.doc._id) {
      return true;
    } else {
      return false;
    }
  }
});

Template.statusesFooter.events({
  'click #removeRecordButton': function () {
    var docId = null;
    if (this.doc) {
      docId = this.doc._id;
    } else {
      docId = this._id;
    }

    Foo.remove(docId, function (error, result) {
      if (result) {
        Router.go('/list/statuses');
      }
    });
  },
  "click #saveRecordButton": function () {
    if (this.doc) {
      Template.statusUpsertPage.saveStatus(this.doc);
    } else {
      Template.statusUpsertPage.saveStatus(this);
    }
    Session.set('recordReadOnly', true);
  }
});
