
guidedModel =// @startlock
{
	Attendee :
	{
		events :
		{
			onInit:function()
			{// @endlock
				this.ID = generateUUID();
				debugger;
			}// @startlock
		}
	},
	Answer :
	{
		events :
		{
			onSave:function()
			{// @endlock
				//console.log(this.attendeeName);
			}// @startlock
		}
	}
};// @endlock
