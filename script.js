// create namespace object
const myApp = {}

// store API endpoint in namespace as well
myApp.imagesUrl = `https://openaccess-api.clevelandart.org/api/artworks/`
myApp.jokesUrl = `https://icanhazdadjoke.com/search`

myApp.init = function () {
  //gotta make it be able to accept a param to pass it to q

  // define a method to make an AJAX request to API for Images 
  // find where the image url is located within the json file
  myApp.getImages = function (style) {
    let call = $.ajax({
      url: myApp.imagesUrl,
      method: 'GET',
      dataType: 'json',
      data: {
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
      dataType: 'json',
      data: {
        limit: 30,
        headers:  { 'Accept': 'application/JSON' }
      }
    });
    return call;
  }

  // .fail(function (jokeError) {
  //   alert(`Get joke failed: ${jokeError.statusText}`);
  //   console.log(jokeError);
  //   // maybe display 404 message if we have time for that feature
  // })

  myApp.imagesArray = [];
  myApp.jokesArray = [];

  // console.log(myApp.jokesArray);

  // use promises to wait for the data to come from both apis
  $.when(myApp.getImages(), myApp.getJokes())
    .then(function (image, joke) {
<<<<<<< HEAD

      console.log(joke);
      for (let i = 0; i < joke[0].results.length; i++) {
        // console.log(i);
        const newJoke = joke[0].results[i].joke;
        myApp.jokesArray.push(newJoke);

        // console.log(newJoke);
      }

      // console.log(newJoke);
      // myApp.jokesArray.push(newJoke);
=======
      console.log(joke);
      const newJoke = joke[0].joke;
      console.log(newJoke);
      myApp.jokesArray.push(newJoke);
>>>>>>> 6d3b0c08f584203b7487d43314b6cc02948710aa
      // loop through the arrays and append the data (joke&image) on the page


      for (let i = 0; i < image[0].data.length; i++) {
        // console.log(i);
        const imagesUrl = image[0].data[i].images.web.url;
        myApp.imagesArray.push(imagesUrl);
      }

      myApp.randomizer(myApp.imagesArray);
      console.log(myApp.imagesArray);


      // APPEND CONTENT LOOP
      for (let i = 0; i < 10; i++) {
        // console.log(myApp.imagesArray);
        myApp.appendContent(i);
      }

      //add pseudo code here
      $('.invisible').remove();
    })

  // create a randomizer to show random jokes and images if needed
  myApp.randomizer = function (array) {
    const randomArrayIndex = Math.floor(Math.random() * array.length);
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
  // check inspector - it shows as imageJokeBox imageJokeBox0
  let pairToAppend = `
    <div class = "imageJokeBox imageJokeBox${i}">
    <p>${myApp.jokesArray[i]}</p>
    </div>
  `;
  $('.appendToHere').append(pairToAppend);
  let imagesToDisplay = myApp.randomizer(myApp.imagesArray);
  console.log(imagesToDisplay);
  $(`.imageJokeBox${i}`).css('background-image', `url(${imagesToDisplay})`);

  // jokesArray.push(joke[0].joke);
}
