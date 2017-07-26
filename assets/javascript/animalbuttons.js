var animals = [];
var animal;
$('#addAnimal').on('click',function(){
	event.preventDefault();
 	animal = $('#animal-input').val().trim();
	animals.push(animal);
  console.log(animal);
	makeButtons();
	$("#animal-input").val('');
});
function makeButtons() {
	$("#animal-buttons").empty();
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button type='button'>");
		a.addClass("fellow btn btn-primary btn-lg");
		a.attr("data-animal", animals[i]);
		a.text(animals[i]);
		$("#animal-buttons").append(a);
	}
	$('.fellow').on('click',function(){  // review why we put the on click function inside makeButtons function also note you are calling the class fellow
		$("#animals").empty();
		animal = $(this).attr("data-animal"); // play with this a little more to get a better understanding
		console.log(animal);
		displayAnimalsInfo(); // i was calling these twice when i had another displayAnimalsInfo() placed inside of the on.click function for #addAnimal
	});
}
function displayAnimalsInfo() {

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var results = response.data
		for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div class='col-md-4'>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating:" + rating);
			var animalImage = $("<img>");
			var animatedSrc = results[i].images.fixed_height.url;
			var staticSrc = results[i].images.fixed_height_still.url;
			animalImage.attr("src",staticSrc); // here ("src",staticSrc) its like saying src = url which is static gif
			animalImage.addClass("animalGIF");
			animalImage.attr("data-state","still"); // here state of the image is still. this is changes to animated when its clicked on. the function is being called animate gif
			animalImage.attr("data-still", staticSrc); // data-still equals to the URl of  the static image
			animalImage.attr("data-animate", animatedSrc); // here you are saying that sata-animate is equal to the url of the animated image
			animalDiv.append(p);
			animalDiv.append(animalImage);
			$("#animals").prepend(animalDiv);
		}

		console.log(results);
	})
}
$(document).on("click",".animalGIF", animateGIF);

function animateGIF(){
	var state = $(this).attr("data-state"); // you are storing to whatever the data-state equals.
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state","animate"); // here we are going to change data-sate equal to animate
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state","still");
	}

}
