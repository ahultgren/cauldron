'use strict';

var Router = module.exports = {
  create: function (path, callback) {
    var router = Object.create(Router);
    router.path = path;
    router.callback = callback;
    return router;
  },

  match: function (path) {
    // [TODO] More advanced matching
    return this.path === path;
  },

  route: function () {
    this.callback();
  }
};
