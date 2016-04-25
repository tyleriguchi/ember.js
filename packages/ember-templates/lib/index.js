import Ember from 'ember-metal/core'; // reexports
import require from 'require';
import {
  getTemplates,
  setTemplates
} from 'ember-templates/template-registry';
import 'bootstrap';

let Component;
Object.defineProperty(Ember, 'Component', {
  get: () => {
    if (!Component) {
      Component = require('ember-templates/component').default;
    }
    return Component;
  },
  enumerable: false
});

let Helper;
Object.defineProperty(Ember, 'Helper', {
  get: () => {
    if (!Helper) {
      Helper = require('ember-templates/helper').default;
      Helper.helper = require('ember-templates/helper').helper;
    }
    return Helper;
  },
  enumerable: false
});

/**
  Global hash of shared templates. This will automatically be populated
  by the build tools so that you can store your Handlebars templates in
  separate files that get loaded into JavaScript at buildtime.

  @property TEMPLATES
  @for Ember
  @type Object
  @private
*/
Object.defineProperty(Ember, 'TEMPLATES', {
  get: getTemplates,
  set: setTemplates,
  configurable: false,
  enumerable: false
});
