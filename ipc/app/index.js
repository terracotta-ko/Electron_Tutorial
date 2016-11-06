'use strict';

//> ipc for renderer process
let ipcRenderer = require('electron').ipcRenderer;

//> close button
let closeBtn = document.querySelector('#close');

closeBtn.addEventListener('click', () => {
    //> send a message to close-main-window channel without args
    ipcRenderer.send('close-main-window');
});
