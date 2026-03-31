import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { getContext, hasContext, onDestroy, setContext } from "svelte";

export type SystemScheme = 'light' | 'dark';
export type SiteScheme = 'light' | 'dark' | 'system';

export type Options = {
  default: SiteScheme
}

export type OverrideOptions = {
  default?: SiteScheme
}

const QRY = '(prefers-color-scheme: dark)';
const KEY = Symbol('statekey');

const options: Options = {
  default: 'system' 
}

export function createSchemeState(override: OverrideOptions = {}) {
  const inBrowser = typeof window !== 'undefined';

  if (override.default) {
    options.default = override.default
  }

  return setContext<SchemeState>(KEY, new SchemeState(inBrowser));
}

export function getSchemeState() {
  if (!hasContext(KEY)) {
    throw new Error('did you forget to call createSchemeState?');
  }

  return getContext<ReturnType<typeof createSchemeState>>(KEY); 
}

class SchemeState {
  #systemQuery = new MediaQuery(QRY);
  #system = $derived<SystemScheme>(this.#systemQuery.current ? 'dark' : 'light');
  #site = $state<SiteScheme>(options.default);
  #removeStorageListener:VoidFunction;
  
  current = $derived.by(() => {
      if (this.#site === 'system') {
        return this.#system;
      } else {
        return this.#site;
      }
  });
  
  constructor(browser:boolean) {
    if (browser) {
      this.#site = localStorage.getItem('scheme') as SiteScheme ?? options.default;
      this.#removeStorageListener = on(window, 'storage', (e: StorageEvent) => {
        if (e.key === 'scheme') {
          this.#site = e.newValue as SiteScheme ?? options.default;
        }          
      })
      onDestroy(() => {
        this.#removeStorageListener();
      })
    } else {
      this.#removeStorageListener = () => {};
    }
  }

  set = (v: SiteScheme) => {
    this.#site = v;
    localStorage.setItem('scheme', v);
  }

  get site(): SiteScheme {
    return this.#site;
  }

  get system(): SystemScheme {
    return this.#system;
  }
}

