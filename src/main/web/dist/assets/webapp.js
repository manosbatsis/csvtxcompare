"use strict";



define("webapp/app", ["exports", "webapp/resolver", "ember-load-initializers", "webapp/config/environment"], function (exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define("webapp/components/file-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('webapp/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('webapp/helpers/app-version', ['exports', 'webapp/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('webapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('webapp/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _routeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _routeAction.default;
    }
  });
});
define('webapp/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('webapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'webapp/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('webapp/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('webapp/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('webapp/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('webapp/initializers/export-application-global', ['exports', 'webapp/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('webapp/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('webapp/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('webapp/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("webapp/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define("webapp/models/comparison", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    clientMarkoff: _emberData.default.attr(),
    tutukaMarkoff: _emberData.default.attr()

  });
});
define("webapp/models/markoff-file", ["exports", "ember-data"], function (exports, _emberData) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    fileName: _emberData.default.attr(),
    fileSize: _emberData.default.attr(),
    totalRecordsCount: _emberData.default.attr(),
    matchedRecordsCount: _emberData.default.attr(),
    mismatchedRecordsCount: _emberData.default.attr(),
    mismatches: _emberData.default.attr()

  });
});
define("webapp/resolver", ["exports", "ember-resolver"], function (exports, _emberResolver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define("webapp/router", ["exports", "webapp/config/environment"], function (exports, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {

    this.route('comparisons', function () {
      this.route('comparison', { path: ':comparison_id' }, function () {});
    });
  });

  exports.default = Router;
});
define("webapp/routes/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    store: Ember.inject.service(),
    actions: {
      createPost: function createPost() {
        var _this = this;
        var fd = new FormData(document.getElementById("fileinfo"));
        //Ember.$('#clientMarkoffFile').val(''); //reset fileinput field
        //Ember.$('#tutukaMarkoffFile').val(''); //reset fileinput field

        Ember.$.ajax({
          url: "/api/rest/comparisons",
          type: "POST",
          dataType: 'json',
          data: fd,
          processData: false, // tell jQuery not to process the data
          contentType: false // tell jQuery not to set contentType
        }).done(function (data, textStatus, jqXHR) {
          // response is a JSON object, previously parsed by jQuery using $.parseJSON
          console.log("done with status/data: ", textStatus, data);
          // in case of success the JSON returned
          // to display mismatches
          var model = _this.get('store').createRecord('comparison', data);
          console.log("application, model: ", model);
          _this.set("model", model);
          _this.transitionTo('comparisons.comparison', model);
          // TODO: in case of an error exception in the backend,
          // handle the JSON returned to display relevant info
        });
      }
    }

  });
});
define("webapp/routes/comparisons/comparison", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("webapp/routes/comparisons/comparison/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('webapp/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("webapp/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uD11Aluj", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n      Specify files to compare\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-block\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[15,\"class\",\"card-text\"],[13],[14],[0,\"\\n\"],[0,\"      \"],[11,\"form\",[]],[15,\"role\",\"form\"],[15,\"enctype\",\"multipart/form-data\"],[15,\"method\",\"post\"],[15,\"id\",\"fileinfo\"],[5,[\"action\"],[[28,[null]],[33,[\"route-action\"],[\"createPost\"],null]],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group row\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"clientMarkoffFile\"],[15,\"class\",\"col-2 col-form-label\"],[13],[0,\"Select client file\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-10\"],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"id\",\"class\"],[\"file\",\"clientMarkoffFile\",\"clientMarkoffFile\",\"form-control-file\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group row\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"tutukaMarkoffFile\"],[15,\"class\",\"col-2 col-form-label\"],[13],[0,\"Select tutuka file\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-10\"],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"id\",\"class\"],[\"file\",\"tutukaMarkoffFile\",\"tutukaMarkoffFile\",\"form-control-file\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-primary\"],[13],[0,\"Compare\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/application.hbs" } });
});
define("webapp/templates/comparisons/comparison", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "A7lnHpeC", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"card-deck\"],[13],[0,\"\\n  \"],[1,[33,[\"file-info\"],null,[[\"model\"],[[28,[\"model\",\"clientMarkoff\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"file-info\"],null,[[\"model\"],[[28,[\"model\",\"tutukaMarkoff\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/comparisons/comparison.hbs" } });
});
define("webapp/templates/comparisons/comparison/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tNe4Iu6a", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/comparisons/comparison/index.hbs" } });
});
define("webapp/templates/components/file-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bvP2mkKC", "block": "{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n      \"],[1,[28,[\"model\",\"fileName\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-block\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n          Total records\\n          \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"totalRecordsCount\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n          Matching records\\n          \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"matchedRecordsCount\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n          Unmatched records\\n          \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"mismatchedRecordsCount\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-footer\"],[13],[0,\"\\n      \"],[11,\"small\",[]],[15,\"class\",\"text-muted\"],[13],[0,\"Filesize: \"],[1,[28,[\"model\",\"fileSize\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/components/file-info.hbs" } });
});


define('webapp/config/environment', ['ember'], function(Ember) {
  var prefix = 'webapp';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("webapp/app")["default"].create({"name":"webapp","version":"0.0.0+c07e5078"});
}
//# sourceMappingURL=webapp.map
