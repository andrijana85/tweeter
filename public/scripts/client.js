/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  const createTweetElement = function(tweetData) {

    const $tweet = $(`<article class="tweet">
  <header class="header-tweet">
    <div class="header-container" >
    <img id="image" src="${tweetData.user.avatars}" alt="girl">
    <span>${tweetData.user.name}</span>
    </div>
    <span>${tweetData.user.handle}</span>
  </header>
    <p class="tweet-content">${tweetData.content.text}</p>
  <footer class="tweet-footer">
      <span><small>${timeago.format(tweetData.created_at)}</small></span>
    <div>
      <i class="fa-sharp fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-sharp fa-solid fa-heart"></i> 
    </div>
  </footer>
</article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.all-tweets').append($tweetElement);
    }
  };


  //submit form
  $('.new-form').submit(function(event) {
    event.preventDefault(); // prevent the default form submission
    console.log("New tweet");
    //form data into a query string
    const tweetText = $(this).serialize();
    const textValue = $('#tweet-text').val();
    
    if (textValue === '' || textValue === null) {
      return alert("Say something, please 🤷‍♀️");
    }
    if (textValue.length > 140) {
      return alert("✋You tweet is too long ✋");
    }


    $.ajax({
      method:'POST',
      url:'http://localhost:8080/tweets',
      data: tweetText,
      success: function(response) {
        console.log(tweetText);
      }
    });


    // fetch (GET) data from the server
    const loadTweets = function() {
      $.ajax({
        method: 'GET',
        url: 'http://localhost:8080/tweets',
        dataType: 'json',
        success: (tweets) => {
          renderTweets(tweets);
        },
        error : (error) => { // Unhappy path, error callback.
          console.log("Something went wrong", error);
        }
      });
    };
    loadTweets();
  });
});

  
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log("Here is the tweet", $tweet); // to see what it looks like
// $('#all-tweets').append($tweet);
