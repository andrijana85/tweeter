/* eslint-disable no-undef */

$(document).ready(function() {
  // console.log('is loaded');
 
  $('#tweet-text').on('input', function(event) {
    //calculate the length of the input value
    const inputLength = $(this).val().length;
    let counter = 140;
    let charCount = counter - inputLength;
    
    $('.counter').text(charCount);

    if (charCount < 0) {
      $('.counter').css('color', 'red');
    }

  });
});