import { assert } from 'ember-metal/debug';
import EmberObject from 'ember-runtime/system/object';
import { getOwner } from 'container/owner';
import require from 'require';

export default EmberObject.extend({
  lookupFactory(name, owner) {
    owner = owner || getOwner(this);

    var fullName = 'component:' + name;
    var templateFullName = 'template:components/' + name;
    var templateRegistered = owner && owner.hasRegistration(templateFullName);

    if (templateRegistered) {
      owner.inject(fullName, 'layout', templateFullName);
    }

    var Component = owner._lookupFactory(fullName);

    // Only treat as a component if either the component
    // or a template has been registered.
    if (templateRegistered || Component) {
      if (!Component) {
        // TODO: need a declaritave way to setup an alias to another factory
        owner.register(fullName, require('ember-templating/component'));
        Component = owner._lookupFactory(fullName);
      }
      return Component;
    }
  },

  componentFor(name, owner, options) {
    assert(`You cannot use '${name}' as a component name. Component names must contain a hyphen.`, ~name.indexOf('-'));

    var fullName = 'component:' + name;
    return owner._lookupFactory(fullName, options);
  },

  layoutFor(name, owner, options) {
    if (this.invalidName(name)) {
      return;
    }

    var templateFullName = 'template:components/' + name;
    return owner.lookup(templateFullName, options);
  }
});
