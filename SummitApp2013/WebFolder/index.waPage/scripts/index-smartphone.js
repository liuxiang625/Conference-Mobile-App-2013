
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock
	function buildSessionListView(arr) {
		var html = "";

		arr.forEach(function(elem) {
			if(elem.title.indexOf("Registration") != -1){
				html += '<li role="heading" data-role="list-divider">' + htmlEncode(elem.sessionDateString) + '</li>';
			}
			html += '<li id = "'+ htmlEncode(elem. __KEY) +'" data-theme="c">';
			html += '<a href="#page4" data-transition="slide">';
			html += '<h1 class="ui-li-heading">'+ htmlEncode(elem.title) +'</h1>';
			html += '<p class="ui-li-desc">'+ htmlEncode(elem.startTimeString) +'- '+ htmlEncode(elem.endTimeString) + ', ' + htmlEncode(elem.room) +'</p>';
			//html += '<p class="ui-li-desc">'+ htmlEncode(elem.room) +'</p>';
			html += '</a></li>'
		});
		var listview = document.getElementById('sessionListview');
		listview.innerHTML = html;
		$('#sessionListview').listview('refresh');
		//buildAccordion(arr[0]);
	}
	
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		ds.Session.query("", {
			pageSize:1,
			orderBy:"ID",
			onSuccess: function(e) {
				e.entityCollection.toArray("title,isActivity,room,startTimeString,endTimeString,sessionDateString", {
					onSuccess: function(e2) {
						console.log(e2.result);
						buildSessionListView(e2.result);
					}
				});
			}
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
