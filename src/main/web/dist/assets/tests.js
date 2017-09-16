'use strict';

define('webapp/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/file-info.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/file-info.js should pass ESLint\n\n');
  });

  QUnit.test('models/comparison.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/comparison.js should pass ESLint\n\n');
  });

  QUnit.test('models/markoff-file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/markoff-file.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/comparisons/comparison.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/comparisons/comparison.js should pass ESLint\n\n');
  });

  QUnit.test('routes/comparisons/comparison/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/comparisons/comparison/index.js should pass ESLint\n\n');
  });
});
define("webapp/tests/helpers/destroy-app", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define("webapp/tests/helpers/module-for-acceptance", ["exports", "qunit", "webapp/tests/helpers/start-app", "webapp/tests/helpers/destroy-app"], function (exports, _qunit, _startApp, _destroyApp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = Ember.RSVP.Promise;
});
define("webapp/tests/helpers/resolver", ["exports", "webapp/resolver", "webapp/config/environment"], function (exports, _resolver, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define("webapp/tests/helpers/start-app", ["exports", "webapp/app", "webapp/config/environment"], function (exports, _app, _environment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define("webapp/tests/integration/components/file-info-test", ["ember-qunit"], function (_emberQunit) {
  "use strict";

  (0, _emberQunit.moduleForComponent)('file-info', 'Integration | Component | file info', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "BX9RbyTJ",
      "block": "{\"statements\":[[1,[26,[\"file-info\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "xsOMUxwb",
      "block": "{\"statements\":[[0,\"\\n\"],[6,[\"file-info\"],null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"locals\":[]},null],[0,\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define("webapp/tests/test-helper", ["webapp/tests/helpers/resolver", "ember-qunit", "ember-cli-qunit"], function (_resolver, _emberQunit, _emberCliQunit) {
  "use strict";

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('webapp/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/file-info-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/file-info-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/comparison-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/comparison-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/markoff-file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/markoff-file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/comparisons/comparison-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/comparisons/comparison-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/comparisons/comparison/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/comparisons/comparison/index-test.js should pass ESLint\n\n');
  });
});
define('webapp/tests/unit/models/comparison-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('comparison', 'Unit | Model | comparison', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('webapp/tests/unit/models/markoff-file-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('markoff-file', 'Unit | Model | markoff file', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('webapp/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('webapp/tests/unit/routes/comparisons/comparison-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:comparisons/comparison', 'Unit | Route | comparisons/comparison', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('webapp/tests/unit/routes/comparisons/comparison/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:comparisons/comparison/index', 'Unit | Route | comparisons/comparison/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('webapp/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
