
guidedModel =// @startlock
{
	Attendee :
	{
		events :
		{
			onSave:function()
			{// @endlock
				if (this.fullName != null & this.firstName == null){
					var names = this.fullName.split(" ");
					this.firstName = names[0];
					this.lastName = names[1];
				}
			}// @startlock
		},
		uniqueID :
		{
			events :
			{
				onInit:function(attributeName)
				{// @endlock
					//this.uniqueID = generateUUID();
				}// @startlock
			}
		}
	}
};// @endlock
