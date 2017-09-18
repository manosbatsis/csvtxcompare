import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {

  this.route('comparisons', function () {
    this.route('comparison', {path: ':comparison_id'}, function () {
      this.route('report');
    });
  });
});

export default Router;
