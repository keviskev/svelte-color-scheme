# svelte-color-scheme
a sveltekit library that exposes a context containing a
class instance whose purpose is to watch the system color scheme
preference and a localStorage variable called scheme to override
that system setting. The default setting of 'system' means that the
SchemeState instance's current value will always match the system setting
of 'light' or 'dark', and that updating the value with .set method to 'light'
or 'dark' will override the system setting accordingly. The state class
uses $state and $derivied along with MediaQuery and svelte/events to
acheive this. 

## installing
  `npm|pnpm|yarn install svelte-color-scheme`

## what you get when you install

  1) two functions, one to create and one to retrieve the scheme state object.
  2) a SchemeDatasetHeader element to add an iife to svelte:head on
  first load that will set a data attribute called scheme on the html
  element. This is to prevent a FUOC.
  3) a SchemeClassHeader element to add an iiffe to svelte:head on
  first load that will add a dark class to the html element. This is to prevent
  a FUOC.
   
## how to use svelte-color-scheme in your sveltekit project

  1) import the createSchemeState function in your +layout.svelte file.
  2) call createSchemeState() in the script of +layout.svelte
  3) import and add the SchemeDatasetHeader or SchemeClassHeader component to your
  +layout.svelte if you want first time visitors' dark setting to be honored
  sans FUOC.
  4) import getSchemaState in your scheme selection code 
  5) store a class instance in a variable and get/set the state.
  6) wire up the ui to the state
  7) create an $effect that uses the state to toggle the dataset or classlist
  8) watch the scheme change in all open tabs :)
  
## expected behavior

  1) first time visitors will get the system's current scheme
  2) setting the state to light or dark will override the system preference
  indefinitely unless the localStorage is cleared.
  3) on systems that have an auto setting based on time of day, the scheme will
  auto update without the need for intervention.
  4) all instances in the current session should change together when either the
  override or system scheme changes.

