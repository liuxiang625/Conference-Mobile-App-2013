
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textField2 = {};	// @textField
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	textField2.keyup = function textField2_keyup (event)// @startlock
	{// @endlock
		var searchPhrase = $$('textField2').getValue();
		sources.session.query("title begin :1 AND isActivity == null", searchPhrase);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textField2", "keyup", textField2.keyup, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
