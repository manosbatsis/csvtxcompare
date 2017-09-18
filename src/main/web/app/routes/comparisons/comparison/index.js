import Ember from "ember";

export default Ember.Route.extend({
  actions: {
    showReports : function(){
      this.transitionTo("comparisons.comparison.report");
    }
  },

});
