/* level up and change stats, gain new skills,  choose basic states /*
/* skill modifiers */
/* roll for stats, dice roller if we're even doing this */
/* if a ability is X modifyer = Y. Max ability is 30.
1 = -5
2-3 = -4
4-5 = -3
6-7 = -2
8-9 = -1
10-11 = 0
12-13 = 1
14-15 = 2
16-17 = 3
18-19 = 4
20-21 = 5
22-23 = 6
24-25 = 7
26-27 = 8
28-29 = 9
30 = 10
*/
/* levels:
1 = exp 0 bonus is +2 to stats
2 = exp 300 bonus is +2 to stats
3 = exp 900 bonus is +2 to stats
4 = exp 2700 bonus is +2 to stats
5 = exp 6500 bonus is +2 to stats
6 = exp 14000 bonus is +2 to stats */

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