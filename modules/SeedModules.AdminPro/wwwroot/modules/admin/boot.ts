import angular = require('angular');
import 'app/application';
import 'angular-ui-router';

let instance: ng.IModule = angular.module('modules.adminpro.boot', [
  'ui.router'
]);

export = instance;
