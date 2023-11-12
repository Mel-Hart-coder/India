$( document ).ready(function() {
    // creates an array of pet names for the second select option 
   let petNames = [
    ["None", ["SO SAD"]],
    ["Cat", ["Mr. Whiskers", "Mr. Grumpy", "King Julian"]],
    ["Dog", ["Fido", "Lassie", "Spot"]],
    ["Fish", ["Scales", "Posiedon", "Ariel"]],
    
   ];


  //  Email with no spaces
  
  $("#email").keyup(function (){

    let error = "NOOOOOO";

    console.log("keyup");  
    let inputVal = $(this).val();
      let strSpace = " ";

      let spaceCount = inputVal.split(" ").length - 1;
      console.log(spaceCount);
      $('#emailEr').text("Thank you!");

      console.log(spaceCount);
      if (spaceCount === 0) {
        $('#emailEr').text("Thank you!");
        console.log("Thank you");
      } else if (spaceCount > 0) {
        $('#emailEr').text("No spaces!");
        console.log("NO ");
      }

    


   });

  


  // SSN with no letters

   $("#ssn").keyup(function (e) {
    e.preventDefault();
    
     this.value = this.value.replace(/[^0-9\.]/g, "");
    
    $(this).next().text("Please only input numbers!");
  });
 



// changes the pet name options based on the type

$("#petType").on("change", function (e) {

  $("#pets").prop("disabled", false);

  let inputVal = this.value;

  console.log(inputVal);
$.each(petNames, function (key, value) {
 
  if (inputVal === value[0]) {
    console.log(
      "value[0]:" + value[0] + ", key:" + key + "value: " + value
    );
    $.each(value, function (nestKey, nestValue) {
    

      switch (nestKey) {
        case 0:
          $("label[for=pets]").text(nestValue);
          $("#pets").empty();
          $("#pets").append(
            $("<option>").text(`select a ${nestValue} `)
          );
          break;
        case 1:
          $.each(nestValue, function (nameKey, nameValue) {
            console.log(nameKey, nameValue);

            $("#pets").append(
              $("<option>").val(nameValue).text(nameValue)
            );
          });
          break;
      }
    });
  }
});




// submits the form and shows the card with the information
$("#submit").click(function (e) {
  e.preventDefault();  
  console.log("dipsplay button clicked: "); 

  $("#submission").append(
    "Thank you! We have confirmed that your name is " + $("#name").val() + " and that your email is " + $("#email").val() + " and that your social security number is " + $("#ssn").val()
  );
  showCard();
});
});
// Shows the card
function showCard() {
  // Get the card element
  var card = document.getElementById('subCard');

  // Display the card
  card.style.display = 'block';
}

// Loads the JSON data into the inputs
$('#loadData').click(function(e) {
  e.preventDefault();
  console.log("clicked");
  let jsonURL = "../demo.json";
  fetch(jsonURL)
    .then(response => {
      // Check if the fetch was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Now 'data' contains the parsed JSON object
      console.log(data);
  
      // You can access specific properties, for example:
      console.log(`Name: ${data.Name}`);
      console.log(`Age: ${data.email}`);
      console.log(`City: ${data.ssn}`);

      $("#email").val(data.email);
            console.log(data.email);
      
      $("#Name").val(data.Name);
            console.log(data.Name);
            
      $("#password").val(data.password);
           console.log(data.password);

      $("#ssn").val(data.ssn);
           console.log(data.ssn);
      
    })
    .catch(error => {
      // Handle errors during fetch or JSON parsing
      console.error('Error fetching or parsing the JSON file:', error);
    });
  console.log(jsonURL);
 
    

})
});
