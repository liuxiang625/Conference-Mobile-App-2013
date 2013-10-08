var pageNotInit = true;
$(document).live('pageinit',function(event){//Force the app to go home after force refresh the page on browser
	if(pageNotInit){
		$.mobile.changePage($('#page2'));
		pageNotInit = false;
	}	
});

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
			html += '<li id = "'+ htmlEncode(elem. __KEY) +'" data-theme="c" class = "loadSessionDetail" >';
			if(elem.isActivity != true) html += '<a href="#page4" data-transition="slide" >';
			html += '<h1 class="ui-li-heading">'+ htmlEncode(elem.title) +'</h1>';
			html += '<p class="ui-li-desc">'+ htmlEncode(elem.startTimeString) +'- '+ htmlEncode(elem.endTimeString) + ', ' + htmlEncode(elem.room) +'</p>';
			if(elem.isActivity != true) html += '</a>';
			html += '</li>';
		});
		var listview = document.getElementById('sessionListview');
		listview.innerHTML = html;
		if ($('#sessionListview').hasClass('ui-listview')) $('#sessionListview').listview('refresh');
	}
	
	
	$(".goPrevious").live('tap', function() {//go to previous page in history
				history.back();
				return false;
	});
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//tap event handler to load session detail
		$( ".loadSessionDetail" ).live( "tap", function() {
		  var sessionId = this.id;
		  ds.Session.find("ID = " + sessionId , {
		  			autoExpand:'presentaors',
		   			onSuccess: function(findEvent) {
		   				var speakerListHTML = '';
		   				var sessionEntity = findEvent.entity;
		   				
		   				$('#sessionDetailTitleDiv h3')[0].innerHTML = sessionEntity.title.getValue();
		   				$('#sessionDetailTitleDiv div p span')[0].innerHTML = sessionEntity.sessionDateString.getValue() + ', ' + sessionEntity.startTimeString.getValue() + '- ' 
		   																 + sessionEntity.endTimeString.getValue() + ', ' + sessionEntity.room.getValue();
		   				$('#sessionDescrption p')[0].innerHTML = sessionEntity.description.getValue();//Load session description
			
						//build speakers list
		   				sessionEntity.presentaors.getValue().forEach({  
					        onSuccess: function(presentorEvent)
					        {
					            var presentor = presentorEvent.entity; // get the entity from event.entity
					            speakerListHTML += '<li data-theme="c" id="'+ presentor.speaker.relKey +'"><a  href="#page5" data-transition="slide">Speaker: '+ presentor.speakerName.getValue() +'</a></li>'
							}
					    });
						$('#sessionSpeakersList')[0].innerHTML = speakerListHTML;
		   			}
		   		});
		});
		
		$( '#page4' ).live( 'pageshow',function(event, ui){
		  $('#sessionSpeakersList').listview('refresh');
		});

		// tap event handler to load speak's profile
		$( "#sessionSpeakersList li" ).live( "tap", function() {
			var speakerId = this.id;
			var sessionListHTML = '';
			 ds.Speaker.find("ID = " + speakerId , {
		  			autoExpand:'presentations',
		   			onSuccess: function(findSpeakerEvent) {
		   				var speakerEntity = findSpeakerEvent.entity;
		   				$('#speakerName h2 span')[0].innerHTML = speakerEntity.fullName.getValue();
		   				$('#speakerName h3 span')[0].innerHTML = speakerEntity.title.getValue() + " at " + speakerEntity.company.getValue();
		   				$('#speakerBio p')[0].innerHTML = speakerEntity.biography.getValue();
		   				
		   				//build speakers' session list
		   				speakerEntity.presentations.getValue().forEach({  
					        onSuccess: function(presentationEvent)
					        {
					            var presentation = presentationEvent.entity; // get the entity from event.entity
					            sessionListHTML += '<li data-theme="c" id="'+ presentation.session.relKey +'" class = "loadSessionDetail"><a  href="#page4" data-transition="slide">Speaker: '+ presentation.sessionName.getValue() +'</a></li>'
							}
					    });
						$('#speakersSessionsList')[0].innerHTML = sessionListHTML;
		   			}
		   	 });
		});
		$( '#page5' ).live( 'pageshow',function(event, ui){
		  $('#speakersSessionsList').listview('refresh');
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
