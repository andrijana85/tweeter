/* eslint-disable no-undef */

$(document).ready(function() {

  //add input event listener
  $('#tweet-text').on('input', function() {
    //calculate the length of the input value
    const inputLength = $(this).val().length;
    let counter = 140;
    let charCount = counter - inputLength;
    
    $('.counter').text(charCount);
    //character count
    if (charCount < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }

  });
});