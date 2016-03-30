define(["jQuery"],function(e){function t(e){ApiClient.getScheduledTasks({isHidden:!1}).then(function(t){a(e,t),Dashboard.hideLoadingMsg()})}function a(e,t){t=t.sort(function(e,t){return e=e.Category+" "+e.Name,t=t.Category+" "+t.Name,e==t?0:t>e?-1:1});for(var a,n="",i=0,o=t.length;o>i;i++){var l=t[i];l.Category!=a&&(a=l.Category,a&&(n+="</div>",n+="</div>"),n+='<div style="margin-bottom:2em;">',n+="<h1>",n+=a,n+="</h1>",n+='<div class="paperList">'),n+='<paper-icon-item class="scheduledTaskPaperIconItem" data-status="'+l.State+'">',n+="<a item-icon class='clearLink' href='scheduledtask.html?id="+l.Id+"'>",n+='<paper-fab mini icon="schedule"></paper-fab>',n+="</a>",n+="<paper-item-body two-line>",n+="<a class='clearLink' href='scheduledtask.html?id="+l.Id+"'>",n+="<div>"+l.Name+"</div>",n+="<div secondary id='taskProgress"+l.Id+"'>"+s(l)+"</div>",n+="</a>",n+="</paper-item-body>",n+="Idle"==l.State?'<paper-icon-button id="btnTask'+l.Id+'" icon="play-arrow" class="btnStartTask" data-taskid="'+l.Id+'" title="'+Globalize.translate("ButtonStart")+'"></paper-icon-button>':"Running"==l.State?'<paper-icon-button id="btnTask'+l.Id+'" icon="stop" class="btnStopTask" data-taskid="'+l.Id+'" title="'+Globalize.translate("ButtonStop")+'"></paper-icon-button>':'<paper-icon-button id="btnTask'+l.Id+'" icon="play-arrow" class="btnStartTask hide" data-taskid="'+l.Id+'" title="'+Globalize.translate("ButtonStart")+'"></paper-icon-button>',n+="</paper-icon-item>"}t.length&&(n+="</div>",n+="</div>");var r=e.querySelector(".divScheduledTasks");r.innerHTML=n}function n(e,t){var a=new Date(e),n=new Date(t),s=(n.getTime()-a.getTime())/1e3,i=Math.floor(s%31536e3/86400),o=Math.floor(s%31536e3%86400/3600),l=Math.floor(s%31536e3%86400%3600/60),r=Math.round(s%31536e3%86400%3600%60),c="";return c+=1==i?i+" day ":"",c+=i>1?i+" days ":"",c+=1==o?o+" hour ":"",c+=o>1?o+" hours ":"",c+=1==l?l+" minute ":"",c+=l>1?l+" minutes ":"",c+=c.length>0?"and ":"",c+=1==r?r+" second":"",c+=0==r||r>1?r+" seconds":""}function s(e){var t="";if("Idle"==e.State)e.LastExecutionResult&&(t+=Globalize.translate("LabelScheduledTaskLastRan").replace("{0}",humane_date(e.LastExecutionResult.EndTimeUtc)).replace("{1}",n(e.LastExecutionResult.StartTimeUtc,e.LastExecutionResult.EndTimeUtc)),"Failed"==e.LastExecutionResult.Status?t+=" <span style='color:#FF0000;'>"+Globalize.translate("LabelFailed")+"</span>":"Cancelled"==e.LastExecutionResult.Status?t+=" <span style='color:#0026FF;'>"+Globalize.translate("LabelCancelled")+"</span>":"Aborted"==e.LastExecutionResult.Status&&(t+=" <span style='color:#FF0000;'>"+Globalize.translate("LabelAbortedByServerShutdown")+"</span>"));else if("Running"==e.State){var a=(e.CurrentProgressPercentage||0).toFixed(1);t+='<paper-progress max="100" value="'+a+'" title="'+a+'%">',t+=""+a+"%",t+="</paper-progress>",t+="<span style='color:#009F00;margin-left:5px;'>"+a+"%</span>"}else t+="<span style='color:#FF0000;'>"+Globalize.translate("LabelStopping")+"</span>";return t}function i(t,a){if("ScheduledTasksInfo"==a.MessageType){var n=a.Data,s=e(e.mobile.activePage)[0];o(s,n)}}function o(e,t){for(var a=0,n=t.length;n>a;a++){var i=t[a];e.querySelector("#taskProgress"+i.Id).innerHTML=s(i);var o=e.querySelector("#btnTask"+i.Id);l(o,i.State)}}function l(t,a){"Idle"==a?(t.classList.add("btnStartTask"),t.classList.remove("btnStopTask"),t.classList.remove("hide"),t.icon="play-arrow",t.title=Globalize.translate("ButtonStart")):"Running"==a?(t.classList.remove("btnStartTask"),t.classList.add("btnStopTask"),t.classList.remove("hide"),t.icon="stop",t.title=Globalize.translate("ButtonStop")):(t.classList.add("btnStartTask"),t.classList.remove("btnStopTask"),t.classList.add("hide"),t.icon="play-arrow",t.title=Globalize.translate("ButtonStart"));var n=e(t).parents("paper-icon-item")[0];n.setAttribute("data-status",a)}function r(){var a=e(e.mobile.activePage)[0];d(),t(a)}function c(){var a=e(e.mobile.activePage)[0];ApiClient.isWebSocketOpen()||t(a)}function d(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("ScheduledTasksInfoStart","1000,1000"),u&&clearInterval(u),u=setInterval(c,5e3)}function p(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("ScheduledTasksInfoStop"),u&&clearInterval(u)}var u;e(document).on("pageinit","#scheduledTasksPage",function(){var a=this;e(".divScheduledTasks",a).on("click",".btnStartTask",function(){var e=this,n=e.getAttribute("data-taskid");ApiClient.startScheduledTask(n).then(function(){l(e,"Running"),t(a)})}).on("click",".btnStopTask",function(){var e=this,n=e.getAttribute("data-taskid");ApiClient.stopScheduledTask(n).then(function(){l(e,""),t(a)})})}).on("pageshow","#scheduledTasksPage",function(){var e=this;Dashboard.showLoadingMsg(),d(),require(["paper-fab","paper-progress","paper-item-body","paper-icon-item"],function(){t(e)}),Events.on(ApiClient,"websocketmessage",i),Events.on(ApiClient,"websocketopen",r)}).on("pagebeforehide","#scheduledTasksPage",function(){Events.off(ApiClient,"websocketmessage",i),Events.off(ApiClient,"websocketopen",r),p()})});