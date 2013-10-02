
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
			if(elem.isActivity != true) html += '<a href="#page4" data-transition="slide">';
			html += '<h1 class="ui-li-heading">'+ htmlEncode(elem.title) +'</h1>';
			html += '<p class="ui-li-desc">'+ htmlEncode(elem.startTimeString) +'- '+ htmlEncode(elem.endTimeString) + ', ' + htmlEncode(elem.room) +'</p>';
			if(elem.isActivity != true) html += '</a>';
			html += '</li>';
		});
		var listview = document.getElementById('sessionListview');
		listview.innerHTML = html;
		$('#sessionListview').listview('refresh');
	}
	
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$( "#sessionListview li" ).live( "tap", function() {
//		  $( "#sessionListview li" ).removeClass('ui-btn-active ui-state-persist');
//		  $(this).addClass('ui-btn-active ui-state-persist');
		  var sessionId = this.id;
		  ds.Session.find("ID = " + sessionId , {
		  			//autoExpand:'ID_Company_3_',
		   			onSuccess: function(findEvent) {
		   				console.log(findEvent.entity);
		   				var sessionEntity = findEvent.entity;
		   				$('#sessionDetailDiv h3')[0].innerHTML = sessionEntity.title.getValue();
		   				$('#sessionDetailDiv div p span')[0].innerHTML = sessionEntity.sessionDateString.getValue() + ', ' + sessionEntity.startTimeString.getValue() + '- ' 
		   																 + sessionEntity.endTimeString.getValue() + ', ' + sessionEntity.room.getValue();
		   			}
		   		});
		  ;
		});
		
		//Get all sessions and build the list
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
