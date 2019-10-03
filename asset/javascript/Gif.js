//arry of aniamls that alreay exist
var topic=["cat","dog","food","basketball","cookie","rapper","piano","Olympics"]
        
$(document).ready(function(){
    //display the button that already exsit
    for(var i=0;i<topic.length;i++){
        var name=topic[i];
        addButton(name);
    }   

    //make a click funtion to make every button can work when they're clicked
    $(document).on("click","button",function(){
        event.preventDefault;
        var name=$(this).val();
        console.name;
        GiphyLink(name);
    });

    //add button
    $("#add").click(function(event){
        event.preventDefault;
        var newGif=$("input[name=gifs]").val();
        console.log(newGif);
        //default if the newGif already exist
        if(!topic.includes(newGif)){
            addButton(newGif);
            GiphyLink(newGif);
        }
        //push the new giphy topic the array
        topic.push(newGif);
        console.log(topic);

    });

    //function to add button
    function addButton(name){
        var newButton=$("<button>");
        newButton.attr("value",name);
        newButton.attr("id",name);
        newButton.text(name);

        console.log()
        //default when the value is empty
        if(name!==""){
            $("#topics").append(newButton);
        }
    }
    //ajax function

    document.on('click', '.gifImages',function(gifImage){
        //grab the data-url attribute value

        //change the src of the image on the gifImage

        $(gifImage).attr('src', $(gifImage).attr('data-alturl'))
    })
    
    function GiphyLink(newGif){
        //giphy API Key 0iYSNC99kE45PTgxuB2gXrzTTwVX7mOU
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            newGif + "&api_key=0iYSNC99kE45PTgxuB2gXrzTTwVX7mOU&limit=10";
        var gifDiv = $("<div>");
                
        var result =$("<div>");

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;

            var gifDiv = $("<div>");
                
            var result =$("<div>");
            
        
            for (var i = 0; i < results.length; i++) {
                
                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                //creat onclick img element to let the frozen img to be animated img
                gifImage.on('click',function(){
                    switchImg(results[i].images.fixed_height.url,gifImage)
                    });
                gifDiv.append(p);
                gifDiv.append(gifImage);
                
                
                result.html(gifDiv);  
            }

            //using html method to replace the previous gifs
            $(".display").html(result);

        });
    }
});