// JavaScript Document

$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("XDnTN3cpdPIhzRua58wPlXAJE41vKCHNlAmqAchK",
"IIZqLo8MNAQOv3sXANbAs2K2fojb2qPAkOb5CrqK");
				   
	var BuryItView = Parse.View.extend({
	  events: {
      "submit form.bury-it-form": "buryIt"
    },

    el: ".content",
    
    initialize: function() {
      _.bindAll(this, "buryIt");
	  $('.confirmation').html('<p>your thought will unearth during the next 24 hours</p>').show();
	  $('#confirmation').css('color','#666666');
      this.render();
    },
	
	buryIt: function(e) {
		e.preventDefault();

		console.log("Handling the submit");
		//add error handling here
		//gather the form data
		
		var self = this;
		
		var data = {};
		data.email = this.$("#email").val();
		data.thought = this.$("#thought-to-bury").val();
		data.timeframe = "";
		
		if (this.$("#forgotten").is(":checked"))
			data.timeframe = "forgotten";
		else if (this.$("#someday").is(":checked"))
			data.timeframe = "someday";
		else if (this.$("#later").is(":checked"))
			data.timeframe = "later";
		else if (this.$("#soon").is(":checked"))
			data.timeframe = "soon";
			
			// TODO v1.2 if none checked tell user to select a timeframe, show timeframe explination messages when checked
			
		if (!validateEmail(data.email))
		 {
			$("#confirmation").html("<p>your thought will be lost without someone to find it...</p>").show();
			$("#confirmation").css("color","#6F0008");
		}
			else if (data.thought == "")
		{
			$("#confirmation").html("<p>nothing buried, nothing gained...</p>").show();
			$("#confirmation").css("color","#6F0008");
			}
			else if (data.timeframe == "")
		{
			$("#confirmation").html("<p>without knowing when, your thought will stay buried...</p>").show();
			$("#confirmation").css("color","#6F0008");
		}
		 else
			{
				var AppVariables =  Parse.Object.extend("appVariables");
				var appVariables =  new AppVariables();
				var currentDay = 0;
				var currentInterval = 1;
	var query = new Parse.Query("appVariables");
	
	query.equalTo("objectId","Sid4J1kfn5");
	
	query.find({
    success: function(result) {
		appVariables = result[0];
		currentDay = appVariables.get("daysSinceLaunch");
		currentInterval = appVariables.get("intervalOfDay");
		var Capsule = Parse.Object.extend("capsule");
		var capsule = new Capsule();
	
	capsule.save({email:data.email,thought:data.thought,timeframe:data.timeframe},
	{success: function(capsule) {
    // Execute any logic that should take place after the object is saved.
    console.log('New object created with objectId: ' + capsule.id);
  },
  error: function(capsule, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and description.
    alert('Failed to create new object, with error code: ' + error.description);
  }
  });
	var time = new Date();
	console.log("Capsule buried at "+time);
	console.log("email:"+data.email);
	console.log("thought: "+data.thought);
	console.log("timeframe: "+data.timeframe);
	console.log("currentDay: "+currentDay);
	console.log("currentInterval: "+currentInterval);
	
  	var nextSubmission = new BuryItView();
          self.undelegateEvents();
          delete self;
		  $("#confirmation").html("<p>your thought has been buried...</p>").show();
		  $("#confirmation").css("color","#196024");
	
    }, error: function() {
	}});
		} 
		
	
	return false;
	},
	
	  render: function() {
      this.$el.html(_.template($("#bury-it-template").html()));
      this.delegateEvents();
    }
  });
    
  
  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#buriedapp"),

    initialize: function() {
      this.render();
    },

    render: function() {
		new BuryItView();
    }
  });

  new AppView;
});


function validateEmail(email) { 
  // http://stackoverflow.com/a/46181/11236
  
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}