import { StatementSyntax } from 'glimmer-runtime';
import { ConstReference, isConst } from 'glimmer-reference';

export class DynamicComponentSyntax extends StatementSyntax {
  constructor({ args, templates }) {
    super();
    this.args = args;
    this.definition = dynamicComponentFor;
    this.templates = templates;
    this.shadow = null;
  }

  compile(builder) {
    builder.component.dynamic(this);
  }
}

function lookup(env, name) {
  if (typeof name === 'string') {
    return env.getComponentDefinition([name]);
  } else {
    throw new Error(`Cannot render ${name} as a component`);
  }
}

function dynamicComponentFor(args, { env }) {
  let nameRef = args.positional.at(0);

  if (isConst(nameRef)) {
    return new ConstReference(lookup(env, nameRef.value()));
  } else {
    return new DynamicComponentReference({ nameRef, env });
  }
}

class DynamicComponentReference {
  constructor({ nameRef, env }) {
    this.nameRef = nameRef;
    this.env = env;
    this.tag = nameRef.tag;
  }

  value() {
    let { env, nameRef } = this;
    return lookup(env, nameRef.value());
  }
}
