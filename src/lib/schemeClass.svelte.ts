import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { onDestroy } from "svelte";

export type SystemScheme = 'light' | 'dark';
export type SiteScheme = 'light' | 'dark' | 'system';

export type Options = {
  browser: boolean  
}

export type OverrideOptions = {
  default?: SiteScheme  
}

type ConstructorOptions = Options & OverrideOptions;

export class SchemeState {
  #systemQuery = new MediaQuery('(prefers-color-scheme: dark)');
  #system = $derived<SystemScheme>(this.#systemQuery.current ? 'dark' : 'light');
  #default: SiteScheme = 'system';
  #site = $state<SiteScheme>(this.#default);
  #removeStorageListener:VoidFunction;
  
  current = $derived.by(() => {
      if (this.#site === 'system') {
        return this.#system;
      } else {
        return this.#site;
      }
  });
  
  constructor(opts: ConstructorOptions) {
    if (opts.default) {
      this.#default = opts.default;
    }

    if (opts.browser) {
      this.#site = localStorage.getItem('scheme') as SiteScheme ?? this.#default;
      this.#removeStorageListener = on(window, 'storage', (e: StorageEvent) => {
        if (e.key === 'scheme') {
          this.#site = e.newValue as SiteScheme ?? this.#default;
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
