import Ember from "ember";

export default Ember.Route.extend({

  actions: {
    createPost: function () {
      var fd = new FormData(document.getElementById("fileinfo"));
      Ember.$('#clientMarkoffFile').val(''); //reset fileinput field
      Ember.$('#tutukaMarkoffFile').val(''); //reset fileinput field

      Ember.$.ajax({
        url: "http://localhost:8080/api/rest/mismatches",
        type: "POST",
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        // in case of an error exception in the backend,
        // handle the JSON returned to display relevant info
        error: function (jqXHR, textStatus, errorThrown) {
          // route to error display
          // TODO
          console.log("error: " + jqXHR.responseText);

        },
        // in case of successhandle the JSON returned
        // to display mismatches
        success: function (data, textStatus, jqXHR) {
          // route to error display
          // TODO
          console.log("success: " + jqXHR.responseText);

        },
      });
    }
  }
});
