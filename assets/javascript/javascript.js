

var topics = ["jalapenos", "habaneros", "beef", "chicken", "corn", "lobster"];

function renderButtons() {
	$("#topics").empty();

	for (var i=0; i< topics.length; i++) {
		$("<button>").addClass("foods")
		.attr("data-name", topics[i])
		.text(topics[i])
		.appendTo("#topicButtons")
		}
}


$("#addTopic").on("click", function(event) {
	event.preventDefault();

	var topics = $("#topic-Input").val().trim()
	topics.push(topics);
	// console.log(topics);
});
console.log(topics);

renderButtons();

$(document).on('click', '.foods', function () {

    var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response.data[0]);
      $('#ajax').attr('src', response.data[0].images.preview_gif.url)
    });
});
