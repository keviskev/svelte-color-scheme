import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { onDestroy } from "svelte";

export type SystemScheme = 'light' | 'dark';
export type SiteScheme = 'light' | 'dark' | 'system';

export class SchemeState {
  #systemQuery = new MediaQuery('(prefers-color-scheme: dark)');
  #system = $derived<SystemScheme>(this.#systemQuery.current ? 'dark' : 'light');
  #site = $state<SiteScheme>('system');
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
      this.#site = localStorage.getItem('scheme') as SiteScheme ?? 'system';
      this.#removeStorageListener = on(window, 'storage', (e: StorageEvent) => {
        if (e.key === 'scheme') {
          this.#site = e.newValue as SiteScheme ?? 'system';
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
