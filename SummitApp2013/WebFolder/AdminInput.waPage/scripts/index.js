
WAF.onAfterInit = function onAfterInit() {// @lock
	
// @region namespaceDeclaration// @startlock
	var imageButton1 = {};	// @buttonImage
	var button2 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		source.answers.addNewElement();
		
		//Init radio button group valuee;
		source.answers.answer1 = 5;
		source.answers.answer2 = 5;
		source.answers.answer3 = 5;
		source.answers.answer4 = 5;
		source.answers.answer5 = 5;
		$$('radioGroup1').setValue(5);
		$$('radioGroup3').setValue(5);
		$$('radioGroup4').setValue(5);
		$$('radioGroup5').setValue(5);
		$$('radioGroup6').setValue(5);
		$$('button1').show();
		$$('button2').show();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		if(attendeeObj.email)
		sources.attendee.query("email = :1", attendeeObj.email,{
        onSuccess: function(){
				if(sources.attendee.length == 0 ) {
					debugger;
					sources.attendee.addNewElement();
					sources.attendee.fullName = attendeeObj.name;
					sources.attendee.email = attendeeObj.email;
					sources.attendee.save();
				}
				sources.answers.attendee.set(sources.attendee);
				debugger;
            }
        });
		
		sources.answers.survey.set(sources.survey);
		sources.answers.save();
		$$('button1').hide();
		$$('button2').hide();
		console.log("answer saved");
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		attendeeObj= {};
		sources.attendeeObj.sync();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
