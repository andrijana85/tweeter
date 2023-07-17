/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  //Cross-Site Scripting
  const escape = function(str) {
    //Create a new div element
    let div = document.createElement("div");
    //Create a text node and set its content to the input string
    div.appendChild(document.createTextNode(str));
    //Get the HTML content using innerHTML, escape special characters
    return div.innerHTML;
  };
  

  const createTweetElement = function(tweetData) {

    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;
    
    //HTML markup
    const $tweet = $(`<article class="tweet">
  <header class="header-tweet">
    <div class="header-container" >
    <img id="image" src="${tweetData.user.avatars}" alt="girl">
    <span>${tweetData.user.name}</span>
    </div>
    <span>${tweetData.user.handle}</span>
  </header>
    <p class="tweet-content">${safeHTML}</p>
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
      $('.all-tweets').prepend($tweetElement);
    }
  };

  //submit form
  $('.new-form').submit(function(event) {
    event.preventDefault(); // prevent the default form submission
    
    //form data into a query string
    const tweetText = $(this).serialize();
    const textValue = $('#tweet-text').val();

    if (textValue === '' || textValue === null) {
      $('.error-short').slideDown('slow');
      $('.error-short').css('display', 'flex');
      return;
    }
    if (textValue.length > 140) {
      $('.error-long').slideDown('slow');
      $('.error-long').css('display', 'flex');
      return;
    }
    $('.error-short').slideUp('slow');
    $('.error-long').slideUp('slow');

    //POST request
    $.ajax({
      method:'POST',
      url:'http://localhost:8080/tweets',
      data: tweetText,
      success: function() {
        loadTweets();
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
