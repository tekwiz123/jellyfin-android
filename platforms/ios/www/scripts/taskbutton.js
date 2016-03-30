define(["appStorage","jQuery"],function(e,t){t.fn.taskButton=function(n){function a(e){ApiClient.getScheduledTasks({IsEnabled:!0}).then(function(t){s(e,t)})}function s(e,a){var s=a.filter(function(e){return e.Key==n.taskKey})[0];if(n.panel&&(s?t(n.panel).show():t(n.panel).hide()),s){"Idle"==s.State?t(e).removeAttr("disabled"):t(e).attr("disabled","disabled"),t(e).attr("data-taskid",s.Id);var l=(s.CurrentProgressPercentage||0).toFixed(1);if(n.progressElem&&(n.progressElem.value=l,"Running"==s.State?n.progressElem.classList.remove("hide"):n.progressElem.classList.add("hide")),n.lastResultElem){var i=s.LastExecutionResult?s.LastExecutionResult.Status:"";n.lastResultElem.html("Failed"==i?'<span style="color:#FF0000;">'+Globalize.translate("LabelFailed")+"</span>":"Cancelled"==i?'<span style="color:#0026FF;">'+Globalize.translate("LabelCancelled")+"</span>":"Aborted"==i?'<span style="color:#FF0000;">'+Globalize.translate("LabelAbortedByServerShutdown")+"</span>":i)}}}function l(e,t){ApiClient.startScheduledTask(t).then(function(){a(e)})}function i(){var t=this,a=t.getAttribute("data-taskid"),s="scheduledTaskButton"+n.taskKey,i=(new Date).getMonth()+"5";if(e.getItem(s)==i)l(t,a);else{var o=Globalize.translate("ConfirmMessageScheduledTaskButton");o+="<br/>",o+='<div style="margin-top:1em;">',o+='<a class="clearLink" href="scheduledtasks.html"><paper-button style="color:#3f51b5!important;margin:0;">'+Globalize.translate("ButtonScheduledTasks")+"</paper-button></a>",o+="</div>",require(["confirm"],function(n){n(o,Globalize.translate("HeaderConfirmation")).then(function(){e.setItem(s,i),l(t,a)})})}}function o(){d()}function r(e,t){if("ScheduledTasksInfo"==t.MessageType){var n=t.Data;s(f,n)}}function c(){ApiClient.isWebSocketOpen()||a(f)}function d(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("ScheduledTasksInfoStart","1000,1000"),p&&clearInterval(p),p=setInterval(c,5e3)}function u(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("ScheduledTasksInfoStop"),p&&clearInterval(p)}var p,f=this;return n.panel&&t(n.panel).hide(),"off"==n.mode?(this.off("click",i),Events.off(ApiClient,"websocketmessage",r),Events.off(ApiClient,"websocketopen",o),u()):this.length&&(this.on("click",i),a(f),d(),Events.on(ApiClient,"websocketmessage",r),Events.on(ApiClient,"websocketopen",o)),this}});