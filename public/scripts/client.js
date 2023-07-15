/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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
      <span><small>${tweetData.created_at}</small></span>
    <div>
      <i class="fa-sharp fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-sharp fa-solid fa-heart"></i>
      
    </div>
  </footer>
</article>`);
    return $tweet;
  };
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log("Here is the tweet", $tweet); // to see what it looks like
  $('#all-tweets').append($tweet);
});