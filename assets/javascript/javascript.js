
//create the array of initial topics
var topics = ["jalapenos", "habaneros", "beef", "chicken", "corn", "lobster"];


//create function to render the buttons on the webpage for all the topics in the array
function renderButtons() {
	//clears the array so they don't duplicate.
	$("#topicButtons").empty();

	//runs loop so that buttons are created for each new item in the array
	for (var i=0; i< topics.length; i++) {
		$("<button>").addClass("foods")
		.attr("id", topics[i])
		.text(topics[i])
		.appendTo("#topicButtons")
	}
}

// create event listener for clicking on the buttons
$("#addTopic").on("click", function(event) {
	// makes it so that the page doesn't refresh when the submit button is clicked.
	event.preventDefault();

	// takes the food added and appends it to the array
	var newTopic = $("#topic-Input").val()
	topics.push(newTopic);
	//once appended, this will call the render function to add the new button for new food.
	renderButtons();
});


// create the API script to search for the item that was clicked within the buttons. 
$(document).on('click', '.foods', function () {
	console.log(this);
	console.log(this.id);
	
	// clears the initial image of food 
	$("#clearThis").html("");

	var arrayOfGifDivs = []; // create for-loop for the GIF images coming in from the API call. 

	// creates the URL to query the API dynamically 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ this.id + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    console.log(queryURL);
    
    // query to the API to get the image objects
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response.data);
      
      // saves variable with all the response data

      var responseData = response.data;
      
      // Loop to go thru the 10 images queried from the API
      for (var j=0; j < 10; j++) {

      	// var to hold the DIV created with the GIFs
      	var gifDiv = $("<div class='item'>");

      	var rating = responseData[j].rating; 
      	//console.log(rating);
      	var p = $("<p>").text("Rating: " + rating);

      	// var created to hold all the attributes to the images being loaded
      	var topicImage = $("<img class='pause'>");
      	topicImage.attr("src", responseData[j].images.original_still.url) 
      	topicImage.attr("data-still", responseData[j].images.original_still.url)
      	topicImage.attr("data-animate", responseData[j].images.original.url)

      	gifDiv.prepend(p);
      	gifDiv.prepend(topicImage);
      	arrayOfGifDivs.push(gifDiv)
      	
      	// pushes the images to the HTML
      	$("#gifs-appear").prepend(gifDiv);
      	console.log(gifDiv);
      }

      // allows for user to click the GIF. initial state of Still then to Animate. Click again to Still.
      $(".pause").on("click", function () {
      	// variable that sets the initial state of the GIF
      	var state = $(this).attr("data-state");
      	
      	// if/else statement so the still can animate on click and the Animated can Still on click.
      	if (state == "still") {
      		$(this).attr("src", $(this).data("animate"));
      		$(this).attr("data-state", "animate");
      		} else {
      		$(this).attr("src", $(this).data("still"));
      		$(this).attr("data-state", "still");
      		}
      	});


      });

    });


// runs the function to start the buttons
renderButtons();










