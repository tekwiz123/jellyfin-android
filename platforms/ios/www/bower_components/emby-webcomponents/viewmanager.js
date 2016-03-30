define(["viewcontainer","focusManager","queryString","connectionManager","events"],function(e,t,n,i,a){function o(e,n,i){var a=(n.type,v);a&&c(a,"viewhide"),v=e;var o=r(e,n,i);i?e.activeElement&&e.activeElement.focus():n.autoFocus!==!1&&t.autoFocus(e),e.dispatchEvent(new CustomEvent("viewshow",o)),d&&e.dispatchEvent(new CustomEvent("pageshow",o))}function c(e,t,n){e.dispatchEvent(new CustomEvent(t,{detail:{type:e.getAttribute("data-type"),isRestored:n},bubbles:!0,cancelable:!1})),d&&e.dispatchEvent(new CustomEvent(t.replace("view","page"),{detail:{type:e.getAttribute("data-type"),isRestored:n},bubbles:!0,cancelable:!1}))}function r(e,t,i){var a=t.url,o=(t.state,a.indexOf("?")),c=-1==o?{}:n.parse(a.substring(o+1));return{detail:{type:e.getAttribute("data-type"),params:c,isRestored:i,state:t.state,options:t.options||{}},bubbles:!0,cancelable:!1}}function s(){e.reset()}function u(e,t,n,i){t.cancel||e.tryRestoreView(t).then(function(e){o(e,t,!0),n()},i)}function l(){var t=this;t.loadView=function(t){var n=v;n&&(n.activeElement=document.activeElement),t.cancel||e.loadView(t).then(function(e){o(e,t)})},t.tryRestoreView=function(t){return new Promise(function(n,i){t.cancel||(v&&(v.activeElement=document.activeElement),u(e,t,n,i))})},t.dispatchPageEvents=function(e){d=e}}var v,d;return e.setOnBeforeChange(function(e,t,n){var i=v;if(i&&c(i,"viewbeforehide"),!e.initComplete){e.initComplete=!0;var a=r(e,n,!1);if(n.controllerFactory){new n.controllerFactory(e,a.detail.params)}(!n.controllerFactory||d)&&c(e,"viewinit")}c(e,"viewbeforeshow",t)}),document.addEventListener("skinunload",s),a.on(i,"localusersignedin",s),a.on(i,"localusersignedout",s),new l});