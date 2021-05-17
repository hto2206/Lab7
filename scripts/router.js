// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function() {
  window.addEventListener("popstate", event => {
    if(event.state.state == "null"){
      document.body.setAttribute("class", "");
      document.querySelector("h1").innerHTML = 'Journal Entries';
    } else if(event.state.state == "home"){
      document.body.setAttribute("class", "");
      document.querySelector("h1").innerHTML = 'Journal Entries';
    } else if(event.state.state == "settings"){
      document.body.setAttribute("class", "settings");
      document.querySelector("h1").innerHTML = 'Settings';
    } else if (event.state.state == "single-entry"){
      single_entry(event.state);
    } 
  });

  document.querySelector("h1").addEventListener('click', () => {
    history.pushState({state: "home"}, '', '/');
    document.body.setAttribute("class", "");
    document.querySelector("h1").innerHTML = 'Journal Entries';
  });

  document.querySelector("img[alt='settings']").addEventListener('click', () => {
    history.pushState({state: "settings"}, '', '/#settings');
    document.body.setAttribute("class", "settings");
    document.querySelector("h1").innerHTML = 'Settings';
  });

  var entryNum = 1;
  document.querySelectorAll("journal-entry").forEach(entry => {
    let stateDef = {state: "single-entry", ind: entryNum, entry: entry.entry};
    let url = '/#entry' + entryNum;
    entryNum = entryNum + 1;
    entry.addEventListener('click', () => {
        history.pushState(stateDef, '', url);
        single_entry(stateDef);
    })
  });

  function single_entry(state){
    document.body.setAttribute("class", "single-entry");
    document.body.removeChild(document.querySelector("entry-page"));
    document.body.appendChild(document.createElement("entry-page"));
    document.querySelector("entry-page").entry = state.entry;
    document.querySelector("h1").innerHTML = 'Entry ' + state.ind;
  }
}
