import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { getContext, onDestroy, setContext } from "svelte";
import type { Scheme } from './types.ts';
import { browser } from "$app/environment";

const QRY = '(prefers-color-scheme: dark)';
const KEY = Symbol('statekey');

class SchemeState {
  #systemQuery = new MediaQuery(QRY);
  #systemPref = $derived<Scheme>(this.#systemQuery.current ? 'dark' : 'light');
  #sitePref = $state<Scheme>('system');
  #removeStorageListener:VoidFunction;
  
  current = $derived.by(() => {
      if (this.#sitePref !== 'system') {
        return this.#sitePref;
      } else {
        return this.#systemPref;
      }
  });
  
  constructor() {
    if (browser) {
      this.#sitePref = localStorage.getItem('scheme') as Scheme ?? 'system';
      this.#removeStorageListener = on(window, 'storage', (e: StorageEvent) => {
        if (e.key === 'scheme') {
          this.#sitePref = e.newValue as Scheme ?? 'system';
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
    this.#sitePref = v;
    localStorage.setItem('scheme', v);
  }

  get sitePref() {
    return this.#sitePref;
  }
}

export function createSchemeState() {
  return setContext<SchemeState>(KEY, new SchemeState());
}

export function getSchemeState() {
  return getContext<ReturnType<typeof createSchemeState>>(KEY); 
}

