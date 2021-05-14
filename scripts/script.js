// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryNum = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = entryNum;
        newPost.addEventListener("click", () => {
          setState({name: "entry", id: newPost.id}, false);
        });
        document.querySelector('main').appendChild(newPost);
        entryNum += 1;
      });
    });
});

var settings = document.querySelector("header img");
settings.addEventListener("click", () => {setState({name: "settings"}, false)});

var header = document.querySelector("header h1");
header.addEventListener("click", () => {setState({name: "home"}, false)});

window.onpopstate = function(event) {
  setState(event.state, true);
};