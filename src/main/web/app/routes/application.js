import Ember from "ember";

export default Ember.Route.extend({
  store: Ember.inject.service(),
  actions: {
    createPost: function () {
      const _this = this;
      var fd = new FormData(document.getElementById("fileinfo"));
      //Ember.$('#clientMarkoffFile').val(''); //reset fileinput field
      //Ember.$('#tutukaMarkoffFile').val(''); //reset fileinput field

      Ember.$.ajax({
        url: "/api/rest/comparisons",
        type: "POST",
        dataType: 'json',
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
      }).done(function (data, textStatus, jqXHR) {
        // response is a JSON object, previously parsed by jQuery using $.parseJSON
        console.log("done with status/data: ", textStatus, data);
        // in case of success the JSON returned
        // to display mismatches
        const model =
          _this.get('store').createRecord('comparison', data);
        console.log("application, model: ", model);
        _this.set("model", model);
        _this.transitionTo(
          'comparisons.comparison', model);
        // TODO: in case of an error exception in the backend,
        // handle the JSON returned to display relevant info
      });
    }
  }

});
