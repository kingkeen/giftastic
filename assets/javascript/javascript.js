
//create the array of initial topics
var topics = ["jalapenos", "habaneros", "beef", "chicken", "corn", "lobster"];


//create function to render the buttons on the webpage for all the topics in the array

function renderButtons() {
	$("#topics").empty();

	for (var i=0; i< topics.length; i++) {
		$("<button>").addClass("foods")
		.attr("id", topics[i])
		.text(topics[i])
		.appendTo("#topicButtons")
		}
}

// create event listener for clicking on the buttons
$("#addTopic").on("click", function(event) {
	event.preventDefault();

	var newTopic = $("#addTopic").val().trim()
	newTopic.push(topics);
	// console.log(topics);
});


// create the API script to search for the item that was clicked within the buttons. 
$(document).on('click', '.foods', function () {
	console.log(this);
	console.log(this.id)


	// creates the URL to query the API dynamically 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ this.id + "&api_key=dc6zaTOxFJmzC&LIMIT=10";
    
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response.data[0]);
      var responseData = response.data[0];
      //pushes image to the HTML 
      //need to make it so it pushes 10 images to the HTML
      // $('#clickedTopic').attr('src', response.data[0].images.original_still.url)

      for (var j=0; j < responseData.length; j++) {

      	var gifDiv = $("<div class='item'>");

      	var rating = responseData[j].rating; //check this

      	var p = $("<p>").text("Rating: " + rating);

      	var topicImage = $("<img>");
      	topicImage.attr("src", responseData[j].images.fixed_height.url) //check this

      	gifDiv.prepend(p);
      	gifDiv.prepend(topicImage);

      	$("#gifs-appear-here-div").prepend(gifDiv);
      }


    });
});

// runs the function to start the buttons
renderButtons();










