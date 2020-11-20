// create namespace object

const myApp = {}

// store API endpoint in namespace as well
myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/`

myApp.init = function () {
  //gotta make it be able to accept a param to pass it to q

  // define a method to make an AJAX request to API for Images 
  // find where the image url is located within the json file
  myApp.getImages = function (style) {
    // function(style){
    //   return 
    console.log(`inside myApp.getImages`);
    let call = $.ajax({
      url: myApp.imagesUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        // q: myApp.dropDownEventListener(),
        // q: 'portrait',
        q: style,
        has_image: 1,
        // department: 'Medieval Art',
        type: 'Painting',
      }
    });
    return call;
  }

  // .fail(function (imageError) {
  //   alert(`Joke content failed: ${imageError.statusText}`);
  //   console.log(imageError);
  // })

  // define a method to make an AJAX request to API for joke
  // find where the joke is located within the json file

  myApp.getJokes = function () {
    let call = $.ajax({
      url: myApp.jokesUrl,
      method: 'GET',
      dataType: 'json'
    });
    return call;
  }
 
  myApp.getTheJoke = function () {
    myApp.getJokes();
    // let joke = myApp.getJokes.responseJSON.joke;
    // console.log(joke);
  }
  myApp.getTheJoke();

  // .fail(function (jokeError) {
  //   alert(`Get joke failed: ${jokeError.statusText}`);
  //   console.log(jokeError);
  //   // maybe display 404 message if we have time for that feature
  // })

  myApp.imagesArray = [];
  myApp.jokesArray = [];
  console.log(myApp.jokesArray);

  let imagesToDisplay;

  // use promises to wait for the data to come from both apis
  $.when(myApp.getImages(), myApp.getJokes())
    .then(function (image, joke) {
      myApp.jokesArray.push(myApp.getJokes);

      // loop through the arrays and append the data (joke&image) on the page
      console.log('inside of then');
      console.log(image[0].data.length);
      for (let i = 0; i < image[0].data.length; i++) {
        // console.log(i);
        const imagesUrl = image[0].data[i].images.web.url;
        myApp.imagesArray.push(imagesUrl);
      }
      // console.log(myApp.imagesArray);
      for (let i = 0; i < 10; i++) {
        myApp.appendContent(i);
        console.log('after append content');
      }
      //add pseudo code here
      $('.invisible').remove();
    })

  // create a randomizer to show random jokes and images if needed
  myApp.randomizer = function (array) {
    const randomArrayIndex = Math.floor(Math.random() * array.length);
    console.log(randomArrayIndex);
    return array[randomArrayIndex]
  }

  myApp.dropDownEventListener = function () {
    $('#style').on('change', function () {
      // console.log($(this).val());
      const chosenStyle = $(this).val();
      $('.imageJokeBox').empty();
      myApp.getImages(chosenStyle);
      myApp.appendContent();
      $('.currentStyle').text(chosenStyle);
    })
  }
  myApp.dropDownEventListener();

  //circular menu on/off
  // $('.menu-toggle').click(function () {
  //   $('.menu-toggle').toggleClass('open');
  //   $('.menu-round').toggleClass('open');
  //   $('.menu-line').toggleClass('open');
  // });
}

// doc ready
// call app.init
$(function () {

  // $(window).on("scroll", function () {
  //   //page height
  //   let scrollHeight = $(document).height();
  //   //scroll position
  //   let scrollPos = $(window).height() + $(window).scrollTop();
  //   // fire if the scroll position is 300 pixels above the bottom of the page
  //   if (((scrollHeight - 300) >= scrollPos) / scrollHeight == 0) {
  //     $('.appendToHere').append(pairToAppend)
  //     console.log('bottom');
  //   }
  // });

  myApp.init()


})
myApp.appendContent = function (i) {
  console.log('inside append');
  // check inspector - it shows as imageJokeBox imageJokeBox0
  let pairToAppend = `
<div class = "imageJokeBox">
<p>${jokesArray}</p>
</div>
`;
  $('.appendToHere').append(pairToAppend);

  imagesToDisplay = myApp.randomizer(myApp.imagesArray);
  console.log(`inside append content`, imagesToDisplay);

  $(`.imageJokeBox`).css('background-image', `url(${imagesToDisplay})`)
  // jokesArray.push(joke[0].joke);
}

//

