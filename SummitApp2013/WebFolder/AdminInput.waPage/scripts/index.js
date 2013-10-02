
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var imageButton1 = {};	// @buttonImage
	var button2 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		source.answer.addNewElement();
		$$('container2').show();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		sources.answer.survey.set(sources.survey);
		sources.answer.save();
		$$('container2').hide();
		console.log("answer saved");
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
