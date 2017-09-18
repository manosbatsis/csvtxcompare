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
define('webapp/helpers/abs', ['exports', 'ember-math-helpers/helpers/abs'], function (exports, _abs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _abs.default;
    }
  });
  Object.defineProperty(exports, 'abs', {
    enumerable: true,
    get: function () {
      return _abs.abs;
    }
  });
});
define('webapp/helpers/acos', ['exports', 'ember-math-helpers/helpers/acos'], function (exports, _acos) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _acos.default;
    }
  });
  Object.defineProperty(exports, 'acos', {
    enumerable: true,
    get: function () {
      return _acos.acos;
    }
  });
});
define('webapp/helpers/acosh', ['exports', 'ember-math-helpers/helpers/acosh'], function (exports, _acosh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _acosh.default;
    }
  });
  Object.defineProperty(exports, 'acosh', {
    enumerable: true,
    get: function () {
      return _acosh.acosh;
    }
  });
});
define('webapp/helpers/add', ['exports', 'ember-math-helpers/helpers/add'], function (exports, _add) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _add.default;
    }
  });
  Object.defineProperty(exports, 'add', {
    enumerable: true,
    get: function () {
      return _add.add;
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
define('webapp/helpers/asin', ['exports', 'ember-math-helpers/helpers/asin'], function (exports, _asin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _asin.default;
    }
  });
  Object.defineProperty(exports, 'asin', {
    enumerable: true,
    get: function () {
      return _asin.asin;
    }
  });
});
define('webapp/helpers/asinh', ['exports', 'ember-math-helpers/helpers/asinh'], function (exports, _asinh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _asinh.default;
    }
  });
  Object.defineProperty(exports, 'asinh', {
    enumerable: true,
    get: function () {
      return _asinh.asinh;
    }
  });
});
define('webapp/helpers/atan', ['exports', 'ember-math-helpers/helpers/atan'], function (exports, _atan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _atan.default;
    }
  });
  Object.defineProperty(exports, 'atan', {
    enumerable: true,
    get: function () {
      return _atan.atan;
    }
  });
});
define('webapp/helpers/atan2', ['exports', 'ember-math-helpers/helpers/atan2'], function (exports, _atan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _atan.default;
    }
  });
  Object.defineProperty(exports, 'atan2', {
    enumerable: true,
    get: function () {
      return _atan.atan2;
    }
  });
});
define('webapp/helpers/atanh', ['exports', 'ember-math-helpers/helpers/atanh'], function (exports, _atanh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _atanh.default;
    }
  });
  Object.defineProperty(exports, 'atanh', {
    enumerable: true,
    get: function () {
      return _atanh.atanh;
    }
  });
});
define('webapp/helpers/cbrt', ['exports', 'ember-math-helpers/helpers/cbrt'], function (exports, _cbrt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cbrt.default;
    }
  });
  Object.defineProperty(exports, 'cbrt', {
    enumerable: true,
    get: function () {
      return _cbrt.cbrt;
    }
  });
});
define('webapp/helpers/ceil', ['exports', 'ember-math-helpers/helpers/ceil'], function (exports, _ceil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ceil.default;
    }
  });
  Object.defineProperty(exports, 'ceil', {
    enumerable: true,
    get: function () {
      return _ceil.ceil;
    }
  });
});
define('webapp/helpers/clz32', ['exports', 'ember-math-helpers/helpers/clz32'], function (exports, _clz) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _clz.default;
    }
  });
  Object.defineProperty(exports, 'clz32', {
    enumerable: true,
    get: function () {
      return _clz.clz32;
    }
  });
});
define('webapp/helpers/cos', ['exports', 'ember-math-helpers/helpers/cos'], function (exports, _cos) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cos.default;
    }
  });
  Object.defineProperty(exports, 'cos', {
    enumerable: true,
    get: function () {
      return _cos.cos;
    }
  });
});
define('webapp/helpers/cosh', ['exports', 'ember-math-helpers/helpers/cosh'], function (exports, _cosh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cosh.default;
    }
  });
  Object.defineProperty(exports, 'cosh', {
    enumerable: true,
    get: function () {
      return _cosh.cosh;
    }
  });
});
define('webapp/helpers/div', ['exports', 'ember-math-helpers/helpers/div'], function (exports, _div) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _div.default;
    }
  });
  Object.defineProperty(exports, 'div', {
    enumerable: true,
    get: function () {
      return _div.div;
    }
  });
});
define('webapp/helpers/exp', ['exports', 'ember-math-helpers/helpers/exp'], function (exports, _exp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _exp.default;
    }
  });
  Object.defineProperty(exports, 'exp', {
    enumerable: true,
    get: function () {
      return _exp.exp;
    }
  });
});
define('webapp/helpers/expm1', ['exports', 'ember-math-helpers/helpers/expm1'], function (exports, _expm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expm.default;
    }
  });
  Object.defineProperty(exports, 'expm1', {
    enumerable: true,
    get: function () {
      return _expm.expm1;
    }
  });
});
define('webapp/helpers/floor', ['exports', 'ember-math-helpers/helpers/floor'], function (exports, _floor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _floor.default;
    }
  });
  Object.defineProperty(exports, 'floor', {
    enumerable: true,
    get: function () {
      return _floor.floor;
    }
  });
});
define('webapp/helpers/fround', ['exports', 'ember-math-helpers/helpers/fround'], function (exports, _fround) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fround.default;
    }
  });
  Object.defineProperty(exports, 'fround', {
    enumerable: true,
    get: function () {
      return _fround.fround;
    }
  });
});
define('webapp/helpers/hypot', ['exports', 'ember-math-helpers/helpers/hypot'], function (exports, _hypot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hypot.default;
    }
  });
  Object.defineProperty(exports, 'hypot', {
    enumerable: true,
    get: function () {
      return _hypot.hypot;
    }
  });
});
define('webapp/helpers/imul', ['exports', 'ember-math-helpers/helpers/imul'], function (exports, _imul) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _imul.default;
    }
  });
  Object.defineProperty(exports, 'imul', {
    enumerable: true,
    get: function () {
      return _imul.imul;
    }
  });
});
define('webapp/helpers/log-e', ['exports', 'ember-math-helpers/helpers/log-e'], function (exports, _logE) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _logE.default;
    }
  });
  Object.defineProperty(exports, 'logE', {
    enumerable: true,
    get: function () {
      return _logE.logE;
    }
  });
});
define('webapp/helpers/log10', ['exports', 'ember-math-helpers/helpers/log10'], function (exports, _log) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _log.default;
    }
  });
  Object.defineProperty(exports, 'log10', {
    enumerable: true,
    get: function () {
      return _log.log10;
    }
  });
});
define('webapp/helpers/log1p', ['exports', 'ember-math-helpers/helpers/log1p'], function (exports, _log1p) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _log1p.default;
    }
  });
  Object.defineProperty(exports, 'log1p', {
    enumerable: true,
    get: function () {
      return _log1p.log1p;
    }
  });
});
define('webapp/helpers/log2', ['exports', 'ember-math-helpers/helpers/log2'], function (exports, _log) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _log.default;
    }
  });
  Object.defineProperty(exports, 'log2', {
    enumerable: true,
    get: function () {
      return _log.log2;
    }
  });
});
define('webapp/helpers/max', ['exports', 'ember-math-helpers/helpers/max'], function (exports, _max) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _max.default;
    }
  });
  Object.defineProperty(exports, 'max', {
    enumerable: true,
    get: function () {
      return _max.max;
    }
  });
});
define('webapp/helpers/min', ['exports', 'ember-math-helpers/helpers/min'], function (exports, _min) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _min.default;
    }
  });
  Object.defineProperty(exports, 'min', {
    enumerable: true,
    get: function () {
      return _min.min;
    }
  });
});
define('webapp/helpers/mod', ['exports', 'ember-math-helpers/helpers/mod'], function (exports, _mod) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mod.default;
    }
  });
  Object.defineProperty(exports, 'mod', {
    enumerable: true,
    get: function () {
      return _mod.mod;
    }
  });
});
define('webapp/helpers/mult', ['exports', 'ember-math-helpers/helpers/mult'], function (exports, _mult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mult.default;
    }
  });
  Object.defineProperty(exports, 'mult', {
    enumerable: true,
    get: function () {
      return _mult.mult;
    }
  });
});
define('webapp/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('webapp/helpers/pow', ['exports', 'ember-math-helpers/helpers/pow'], function (exports, _pow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pow.default;
    }
  });
  Object.defineProperty(exports, 'pow', {
    enumerable: true,
    get: function () {
      return _pow.pow;
    }
  });
});
define('webapp/helpers/random', ['exports', 'ember-math-helpers/helpers/random'], function (exports, _random) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _random.default;
    }
  });
  Object.defineProperty(exports, 'random', {
    enumerable: true,
    get: function () {
      return _random.random;
    }
  });
});
define('webapp/helpers/round', ['exports', 'ember-math-helpers/helpers/round'], function (exports, _round) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _round.default;
    }
  });
  Object.defineProperty(exports, 'round', {
    enumerable: true,
    get: function () {
      return _round.round;
    }
  });
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
define('webapp/helpers/sign', ['exports', 'ember-math-helpers/helpers/sign'], function (exports, _sign) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sign.default;
    }
  });
  Object.defineProperty(exports, 'sign', {
    enumerable: true,
    get: function () {
      return _sign.sign;
    }
  });
});
define('webapp/helpers/sin', ['exports', 'ember-math-helpers/helpers/sin'], function (exports, _sin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sin.default;
    }
  });
  Object.defineProperty(exports, 'sin', {
    enumerable: true,
    get: function () {
      return _sin.sin;
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
define('webapp/helpers/sqrt', ['exports', 'ember-math-helpers/helpers/sqrt'], function (exports, _sqrt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sqrt.default;
    }
  });
  Object.defineProperty(exports, 'sqrt', {
    enumerable: true,
    get: function () {
      return _sqrt.sqrt;
    }
  });
});
define('webapp/helpers/sub', ['exports', 'ember-math-helpers/helpers/sub'], function (exports, _sub) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sub.default;
    }
  });
  Object.defineProperty(exports, 'sub', {
    enumerable: true,
    get: function () {
      return _sub.sub;
    }
  });
});
define('webapp/helpers/tan', ['exports', 'ember-math-helpers/helpers/tan'], function (exports, _tan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tan.default;
    }
  });
  Object.defineProperty(exports, 'tan', {
    enumerable: true,
    get: function () {
      return _tan.tan;
    }
  });
});
define('webapp/helpers/tanh', ['exports', 'ember-math-helpers/helpers/tanh'], function (exports, _tanh) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tanh.default;
    }
  });
  Object.defineProperty(exports, 'tanh', {
    enumerable: true,
    get: function () {
      return _tanh.tanh;
    }
  });
});
define('webapp/helpers/trunc', ['exports', 'ember-math-helpers/helpers/trunc'], function (exports, _trunc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trunc.default;
    }
  });
  Object.defineProperty(exports, 'trunc', {
    enumerable: true,
    get: function () {
      return _trunc.trunc;
    }
  });
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


  var fieldNames = ["recordNumber", "profileName", "transactionDate", "transactionAmount", "transactionNarrative", "transactionDescription", "transactionID", "transactionType", "walletReference"];

  exports.default = _emberData.default.Model.extend({

    clientMarkoff: _emberData.default.attr(),
    tutukaMarkoff: _emberData.default.attr(),

    /**
     * Get suggestions on possible/closest matches between client and tutuka markoff files.
     * @return the suggestions as two arrays with best matches implied by index
     */
    suggestions: Ember.computed('clientMarkoff', 'tutukaMarkoff', function () {

      // clone scores, sort by score value descending
      var sortedScores = this.get("matchingScores").slice(0).sort(function (a, b) {
        return a.score - b.score;
      });

      console.log("sortedScores:", sortedScores);
      var suggestions = {
        clientRecords: [],
        tutukaRecords: []
      };
    }),

    /**
     * Calculate and return the matching scores between client and tutuka markoff records.
     * Records are compared field by field. Each match is awarded with a score of 1.0.
     * The only exception is the record number, where a threshold of extra/missing records
     * allows for awarding 0.5. No other special semantics/logic/weights are applied.
     * @return the matching scores as an array of objects, each having t6he following fields:
     * clientMarkoffIndex, tutukaMarkoffIndex, clientRecordRecordNumber, tutukaRecordRecordNumber, score
     */
    matchingScores: Ember.computed('clientMarkoff', 'tutukaMarkoff', function () {

      // get client/tutuka mismatched records
      var clientMismatches = this.get("clientMarkoff.mismatches");
      var tutukaMismatches = this.get("tutukaMarkoff.mismatches");

      // get the difference in record count between the files if any,
      // useful when comparing record numbers
      var recordCountDifference = Math.abs(clientMismatches.length - tutukaMismatches.length);

      // Evaluate close match scores
      var scores = [];
      // Compare each client markoff record...
      $.each(clientMismatches, function (cIndex, clientRecord) {
        var tutukaScores = [];
        // ...with each tutuka markof record's ...
        $.each(tutukaMismatches, function (tIndex, tutukaRecord) {
          var score = 0.0;
          // ...fields
          $.each(fieldNames, function (fIndex, fieldName) {
            // Add a point for any field match
            if (clientRecord[fieldName] == tutukaRecord[fieldName]) {
              score = score + 1.0;
            }
            // Friendlier handling for record number,
            // award some points if difference is lesser than the
            // difference of record counts between markoff files
            else if (fieldName == "recordNumber" && recordCountDifference > 0) {
                var clientRecordNumber = clientRecord[fieldName];
                var tutukaRecordNumber = tutukaRecord[fieldName];
                // TODO: this does not take into account
                // which side has more records
                // or how many "extra" records have been processed
                if (clientRecordNumber && tutukaRecordNumber && Math.abs(clientRecordNumber - tutukaRecordNumber) <= recordCountDifference) {
                  score = score + 0.5;
                }
              }
          });
          // add total score for records combo
          tutukaScores.push({
            clientMarkoffIndex: cIndex,
            tutukaMarkoffIndex: tIndex,
            clientRecordRecordNumber: clientRecord.recordNumber,
            tutukaRecordRecordNumber: tutukaRecord.recordNumber,
            score: score
          });
        });
        scores.push(tutukaScores);
      });

      return scores;
    })
    /*
     */
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
define('webapp/models/markoff-record', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    recordNumber: _emberData.default.attr(),
    recordComment: _emberData.default.attr(),
    transactionID: _emberData.default.attr(),
    profileName: _emberData.default.attr(),
    transactionDate: _emberData.default.attr(),
    transactionNarrative: _emberData.default.attr(),
    transactionDescription: _emberData.default.attr(),
    transactionType: _emberData.default.attr(),
    walletReference: _emberData.default.attr(),
    transactionAmount: _emberData.default.attr()

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
      this.route('comparison', { path: ':comparison_id' }, function () {
        this.route('report');
      });
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
  exports.default = Ember.Route.extend({
    actions: {
      showReports: function showReports() {
        this.transitionTo("comparisons.comparison.report");
      }
    }

  });
});
define('webapp/routes/comparisons/comparison/report', ['exports'], function (exports) {
  'use strict';

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
  exports.default = Ember.HTMLBars.template({ "id": "q4Lm/Np1", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"card-body\"],[13],[0,\"\\n      \"],[11,\"h5\",[]],[15,\"class\",\"card-title\"],[13],[0,\"Specify files to compare\"],[14],[0,\"\\n\"],[0,\"      \"],[11,\"form\",[]],[15,\"role\",\"form\"],[15,\"enctype\",\"multipart/form-data\"],[15,\"method\",\"post\"],[15,\"id\",\"fileinfo\"],[5,[\"action\"],[[28,[null]],[33,[\"route-action\"],[\"createPost\"],null]],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group row\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"clientMarkoffFile\"],[15,\"class\",\"col-2 col-form-label\"],[13],[0,\"Select client file\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-10\"],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"id\",\"class\"],[\"file\",\"clientMarkoffFile\",\"clientMarkoffFile\",\"form-control-file\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group row\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"tutukaMarkoffFile\"],[15,\"class\",\"col-2 col-form-label\"],[13],[0,\"Select tutuka file\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-10\"],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"id\",\"class\"],[\"file\",\"tutukaMarkoffFile\",\"tutukaMarkoffFile\",\"form-control-file\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-primary\"],[13],[0,\"Compare\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/application.hbs" } });
});
define("webapp/templates/comparisons/comparison", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dR+k86lF", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n  \"],[1,[33,[\"file-info\"],null,[[\"model\"],[[28,[\"model\",\"clientMarkoff\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n  \"],[1,[33,[\"file-info\"],null,[[\"model\"],[[28,[\"model\",\"tutukaMarkoff\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/comparisons/comparison.hbs" } });
});
define("webapp/templates/comparisons/comparison/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0EUkjPNj", "block": "{\"statements\":[[11,\"button\",[]],[15,\"class\",\"btn btn-primary\"],[5,[\"action\"],[[28,[null]],[33,[\"route-action\"],[\"showReports\"],null]],[[\"on\"],[\"click\"]]],[13],[0,\"Compare\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/comparisons/comparison/index.hbs" } });
});
define("webapp/templates/comparisons/comparison/report", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TT2orAHr", "block": "{\"statements\":[[0,\"\\n\"],[11,\"table\",[]],[15,\"class\",\"table table-hover table-responsive\"],[13],[0,\"\\n\\n\"],[14],[0,\"\\n\\n\\n\\n\"],[11,\"table\",[]],[15,\"class\",\"table table-hover table-responsive\"],[13],[0,\"\\n  \"],[11,\"caption\",[]],[15,\"style\",\"caption-side: top;\"],[13],[0,\"Matching scores between client (vertical)and tutuka (horizontal) records\"],[14],[0,\"\\n  \"],[11,\"thead\",[]],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[0,\"Record #\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"tutukaMarkoff\",\"mismatches\"]]],null,{\"statements\":[[0,\"        \"],[11,\"th\",[]],[13],[1,[28,[\"tutukaMismatch\",\"recordNumber\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"tutukaMismatch\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"tbody\",[]],[15,\"style\",\"text-align: right\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"matchingScores\"]]],null,{\"statements\":[[0,\"    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"th\",[]],[13],[1,[28,[\"rowScores\",\"0\",\"clientRecordRecordNumber\"]],false],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"rowScores\"]]],null,{\"statements\":[[0,\"        \"],[11,\"td\",[]],[16,\"style\",[34,[\"background-color: rgba(51, 153, 102, \",[33,[\"mult\"],[[28,[\"score\",\"score\"]],0.1],null],\");\"]]],[13],[1,[28,[\"score\",\"score\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"score\",\"tutukaIndex\"]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[\"rowScores\",\"clientIndex\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/comparisons/comparison/report.hbs" } });
});
define("webapp/templates/components/file-info", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8pPYQ/gK", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"card-body\"],[13],[0,\"\\n    \"],[11,\"h5\",[]],[15,\"class\",\"card-title\"],[13],[1,[28,[\"model\",\"fileName\"]],false],[14],[0,\"\\n    \"],[11,\"h6\",[]],[15,\"class\",\"card-subtitle mb-2 text-muted\"],[13],[0,\"File size: \"],[1,[28,[\"model\",\"fileSize\"]],false],[0,\" bytes\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"card-block\"],[13],[0,\"\\n    \"],[11,\"ul\",[]],[15,\"class\",\"list-group\"],[13],[0,\"\\n      \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n        Total records\\n        \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"totalRecordsCount\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n        Matching records\\n        \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"matchedRecordsCount\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"li\",[]],[15,\"class\",\"list-group-item justify-content-between\"],[13],[0,\"\\n        Unmatched records\\n        \"],[11,\"span\",[]],[15,\"class\",\"badge badge-secondary\"],[13],[1,[28,[\"model\",\"mismatchedRecordsCount\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "webapp/templates/components/file-info.hbs" } });
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
  require("webapp/app")["default"].create({"name":"webapp","version":"0.0.0+1e873eb9"});
}
//# sourceMappingURL=webapp.map
