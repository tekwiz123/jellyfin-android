define(["playbackManager","focusManager","embyRouter"],function(e,a,r){function s(){k=(new Date).getTime()}function c(){return(new Date).getTime()-k}function n(e){e.click()}function t(e,a){u++,e.addEventListener("command",a)}function o(e,a){u&&u--,e.removeEventListener("command",a)}function i(e){var a=l[e]||0,r=(new Date).getTime();return 1e3>r-a?!1:(l[e]=r,!0)}function b(c,t){s();var o=t?t.sourceElement:null;if(o&&(o=a.focusableParent(o)),o=o||document.activeElement||window,u){var b=new CustomEvent("command",{detail:{command:c},bubbles:!0,cancelable:!0}),k=o.dispatchEvent(b);if(!k)return}switch(c){case"up":a.moveUp(o);break;case"down":a.moveDown(o);break;case"left":a.moveLeft(o);break;case"right":a.moveRight(o);break;case"home":r.goHome();break;case"settings":r.showSettings();break;case"back":r.back();break;case"forward":break;case"select":n(o);break;case"pageup":break;case"pagedown":break;case"end":break;case"menu":case"info":break;case"next":e.isPlaying()&&e.nextTrack();break;case"previous":e.isPlaying()&&e.previousTrack();break;case"guide":r.showGuide();break;case"recordedtv":r.showRecordedTV();break;case"record":break;case"livetv":r.showLiveTV();break;case"mute":e.mute();break;case"unmute":e.unMute();break;case"togglemute":e.toggleMute();break;case"volumedown":e.volumeDown();break;case"volumeup":e.volumeUp();break;case"play":e.unpause();break;case"pause":e.pause();break;case"playpause":e.playPause();break;case"stop":i("stop")&&e.stop();break;case"changezoom":break;case"changeaudiotrack":break;case"changesubtitletrack":break;case"search":r.showSearch();break;case"favorites":r.showFavorites();break;case"fastforward":e.fastForward();break;case"rewind":e.rewind();break;case"togglefullscreen":break;case"disabledisplaymirror":e.enableDisplayMirroring(!1);break;case"enabledisplaymirror":e.enableDisplayMirroring(!0);break;case"toggledisplaymirror":e.toggleDisplayMirroring();break;case"movies":break;case"music":break;case"tv":break;case"latestepisodes":break;case"nowplaying":break;case"upcomingtv":break;case"nextup":}}var k=(new Date).getTime(),u=0,l={};return document.addEventListener("click",s),{trigger:b,handle:b,notify:s,idleTime:c,on:t,off:o}});