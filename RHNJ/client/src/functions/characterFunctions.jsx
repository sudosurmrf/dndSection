/* level up and change stats, gain new skills,  choose basic states /*
/* skill modifiers */
/* roll for stats, dice roller if we're even doing this */

/* for each level up, you gail an additional attack die */


/*from https://codepen.io/pineapplechunk/pen/AoegBq */
$(function() {
    console.log('Document Ready!');
    
    var $buttons = $('.button'),
        $bt1 = $('#bt1'),
        $bt2 = $('#bt2'),
        $bt3 = $('#bt3'),
        $stats = $('#stats > table > tbody > tr > td:first-child > input');
   
    
    
    
    $buttons.click(function() {
      console.log('Clicked button');
      $buttons.removeClass('selected');
      $(this).addClass('selected active');
      var $selected = $(this).attr('id');
      
      switch($selected)
      {
        case 'bt1':
          $('.tab').removeClass('active');
          $('#tab1').addClass('active');
          break;
          
        case 'bt2':
          $('.tab').removeClass('active');
          $('#tab2').addClass('active');
          break;
          
        case 'bt3':
          $('.tab').removeClass('active');
          $('#tab3').addClass('active');
          break;
          
        default:
          console.log('Error: executed default case');
      }        
    });
    
    /*
    Mod Calculator
    */
    $stats.keyup(function() {
      console.log('Keyup');
      var $val = this.value;
      if ($val > 0) {
        console.log('if statement executed');
        var $mod = Math.floor(($val - 10) / 2);
        console.log($mod);
        $(this).parent().next().children('input').attr('value', $mod);
      } else if ($val == '') {
        $(this).parent().next().children('input').attr('value', '0');
      }
    });
  });



 