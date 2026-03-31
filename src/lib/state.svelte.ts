import { getContext, hasContext, setContext } from "svelte";
import { SchemeState, type OverrideOptions } from './schemeClass.svelte.ts';

const KEY = Symbol('statekey');

export function createSchemeState(opts: OverrideOptions = {}) {
  const browser = typeof window !== 'undefined';
  return setContext<SchemeState>(KEY, new SchemeState({browser, ...opts}));
}

export function getSchemeState() {
  if (!hasContext(KEY)) {
    throw new Error('did you forget to call createSchemeState?');
  }

  return getContext<ReturnType<typeof createSchemeState>>(KEY); 
}

