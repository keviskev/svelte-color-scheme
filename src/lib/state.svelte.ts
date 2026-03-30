import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { getContext, hasContext, onDestroy, setContext } from "svelte";

export const Scheme = ['light', 'dark', 'system'] as const;
export type Scheme = (typeof Scheme)[number]

const QRY = '(prefers-color-scheme: dark)';
const KEY = Symbol('statekey');

class SchemeState {
  #systemQuery = new MediaQuery(QRY);
  #system = $derived<Scheme>(this.#systemQuery.current ? 'dark' : 'light');
  #site = $state<Scheme>('system');
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
      this.#site = localStorage.getItem('scheme') as Scheme ?? 'system';
      this.#removeStorageListener = on(window, 'storage', (e: StorageEvent) => {
        if (e.key === 'scheme') {
          this.#site = e.newValue as Scheme ?? 'system';
        }          
      })
      onDestroy(() => {
        this.#removeStorageListener();
      })
    } else {
      this.#removeStorageListener = () => {};
    }
  }

  set = (v: Scheme) => {
    this.#site = v;
    localStorage.setItem('scheme', v);
  }

  get site() {
    return this.#site;
  }
}

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

