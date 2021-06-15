// Onload tool
$(document).ready(function() {
  updateColors();
});

// Navigation Picker
$('.slds-nav-vertical__action').click(function() {
  $('.slds-nav-vertical__item').removeClass('slds-is-active');
  $(this).parent().addClass('slds-is-active');
});

// Navigation Scroll
$(window).scroll(function() {
  var windscroll = $(window).scrollTop();
  console.log(windscroll);
  if (windscroll >= 100) {
    $('#builder-form .slds-medium-size_4-of-5').find('article').each(function(i) {
      console.log($(this).attr('id'))
      if($(this).position().top <= windscroll + 100) {
        $('nav li.slds-is-active').removeClass('slds-is-active');
        $('nav').find('li').eq(i).addClass('slds-is-active');
      }
    });
  } else {
    $('nav .slds-nav-vertical__item').removeClass('slds-is-active');
    $('nav .slds-nav-vertical__item:first').addClass('slds-is-active');
  }
});


///////////////////////////////////////////////////////
//////////     GENERAL FUNCTIONS     //////////////////
///////////////////////////////////////////////////////
// Card Expander
function toggleCard(lbl){
  $('.slds-card__body[aria-label="'+lbl+'"]').toggleClass('slds-hide');
}

// Color picker changer
$('input[role="color-picker"]').keyup(function() {
  updateColors();
});

// Color picker operator
function updateColors(){
  $('input[role="color-picker"]').each(function() {
    if($(this).val().length==6 && $(this).val().substring(0, 1)!='#'){
      $(this).val('#' + $(this).val())
    }
    if($(this).val().length==7){
      $(this).val($(this).val().toUpperCase())
      $(this).css('background-color', $(this).val());
      $(this).css('color', getContrastCol($(this).val()));
    }
  });
}
// Color picker sub-operator
function getContrastCol(hexcolor){
  if (hexcolor.indexOf('#') === 0){ hexcolor = hexcolor.slice(1);}
  return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'black':'white';
}

// Image picker Operator
$('input[type="file"]').change(function() {
  if($(this).attr('accept')=='.jpg,.png'){
    previewImage(this, $(this).attr('aria-controls'));
  }
});

// Image picker sub-operator
function previewImage(input, Id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#' + Id).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}