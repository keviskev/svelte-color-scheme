import { getContext, hasContext, setContext } from "svelte";
import { SchemeState } from './schemeClass.svelte.ts';

const KEY = Symbol('statekey');

export function createSchemeState() {
  const inBrowser = typeof window !== 'undefined';
  return setContext<SchemeState>(KEY, new SchemeState(inBrowser));
}

export function getSchemeState() {
  if (!hasContext(KEY)) {
    throw new Error('did you forget to call createSchemeState?');
  }

  return getContext<ReturnType<typeof createSchemeState>>(KEY); 
}

