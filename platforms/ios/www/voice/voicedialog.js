define(["dialogHelper","jQuery"],function(e,n){function o(){return f?Promise.resolve(f):new Promise(function(e,n){var o="grammar",i=new XMLHttpRequest;i.open("GET","voice/grammar/"+o+".json",!0),i.onload=function(){f=JSON.parse(this.response),e(f)},i.onerror=n,i.send()})}function i(e){for(var n,o,i=e.length;0!==i;)o=Math.floor(Math.random()*i),i-=1,n=e[i],e[i]=e[o],e[o]=n;return e}function a(e){return o().then(function(n){e="undefined"!=typeof e?e:"";var o=[];return n.map(function(n){n.items&&n.items.length>0&&(e==n.groupid||""==e)&&n.items.map(function(e){e.commandtemplates&&e.commandtemplates.length>0&&e.commandtemplates.map(function(e){o.push(e)})})}),i(o)})}function t(e){if(f){var n=-1;return n=f.map(function(e){return e.groupid}).indexOf(e),n>-1?f[n]:null}return null}function c(e,o){o.length=Math.min(o.length,4),o=o.map(function(e){return'<div class="exampleCommand"><span class="exampleCommandText">"'+e+'"</span></div>'}).join(""),n(".exampleCommands",e).html(o)}function s(o){var i=e.createDialog({size:"medium",removeOnClose:!0});i.classList.add("ui-body-b"),i.classList.add("background-theme-b");var s="";if(s+='<h2 class="dialogHeader">',s+='<paper-fab icon="arrow-back" mini class="btnCancelVoiceInput"></paper-fab>',o){var r=t(o);r&&(s+="  "+r.name)}s+="</h2>",s+="<div>";var l=a(o);s+='<div class="voiceHelpContent">',s+='<div class="defaultVoiceHelp">',s+='<h1 style="margin-bottom:1.25em;">'+Globalize.translate("HeaderSaySomethingLike")+"</h1>",s+='<div class="exampleCommands">',s+="</div>",s+="</div>",s+='<div class="unrecognizedCommand" style="display:none;">',s+="<h1>"+Globalize.translate("HeaderYouSaid")+"</h1>",s+='<p class="exampleCommand voiceInputContainer"><i class="fa fa-quote-left"></i><span class="voiceInputText exampleCommandText"></span><i class="fa fa-quote-right"></i></p>',s+="<p>"+Globalize.translate("MessageWeDidntRecognizeCommand")+"</p>",s+="<br/>",s+='<paper-button raised class="submit block btnRetry"><iron-icon icon="mic"></iron-icon><span>'+Globalize.translate("ButtonTryAgain")+"</span></paper-button>",s+='<p class="blockedMessage" style="display:none;">'+Globalize.translate("MessageIfYouBlockedVoice")+"<br/><br/></p>",s+="</div>",s+='<paper-button raised class="block btnCancelVoiceInput" style="background-color:#444;"><iron-icon icon="close"></iron-icon><span>'+Globalize.translate("ButtonCancel")+"</span></paper-button>",s+="</div>",s+="</div>",i.innerHTML=s,document.body.appendChild(i),e.open(i),v=i,i.addEventListener("close",function(){v=null}),n(".btnCancelVoiceInput",i).on("click",function(){d(),e.close(i)}),n(".btnRetry",i).on("click",function(){n(".unrecognizedCommand").hide(),n(".defaultVoiceHelp").show(),u(!1)}),l.then(function(e){c(i.querySelector(".voiceHelpContent"),e)})}function r(){n(".unrecognizedCommand").show(),n(".defaultVoiceHelp").hide()}function l(o,i){n(".voiceInputText").html(o),o||AppInfo.isNativeApp?n(".blockedMessage").hide():n(".blockedMessage").show(),o?require(["voice/voicecommands.js","voice/grammarprocessor.js"],function(n,i){var a=i(f,o);a&&a.command?n(a).then(function(e){if("show"===e.item.actionid&&"group"===e.item.sourceid){var n=v;n?p(!1,e):p(!0,e)}}).catch(r):r();var t=v;t&&e.close(t)}):i||r()}function u(e){d();var n=new(window.SpeechRecognition||window.webkitSpeechRecognition||window.mozSpeechRecognition||window.oSpeechRecognition||window.msSpeechRecognition);n.lang=h;n.onresult=function(e){e.results.length>0&&l(e.results[0][0].transcript||"")},n.onerror=function(){l("",n.cancelled)},n.onnomatch=function(){l("",n.cancelled)},n.start(),m=n,p(e)}function d(){var e=m;e&&(e.abort(),m=null)}function p(e,n){e!==!1&&require(["paper-fab","css!voice/voice.css"],function(){n?s(n.groupid,n.name):s()})}var m,f,v,h="en-US";return{startListening:u}});