$(document).ready(function(){
  var left;
  var right;
  // these are what get passed as the plans to compare

  // need to get data about the plans

  $.get( '/plan', function(data) {
     console.log(data);
     if (data.length == 0) {
       $('#left').text('No results found...');
     } else {
       $('#left').append( "<ul id='left-result-list' class='collection'></ul>");
       $('#right').append( "<ul id='right-result-list' class='collection'></ul>");
       $.each(data, function(index, plan) {
         $a = $("<a id='plan' class='collection-item avatar' data='" + plan.name + "'></a>");
         $a.append($("<p><span class='title'>" + plan.name +"</span></p>"));
         $a.append($("<a href='" + plan.job + "'>" + "" + "</a>"));
         $('#left-result-list').append($a);
         $a.clone().appendTo("#right-result-list")
         // $('#right-result-list').append($a);
       });
     };
});

// Changing the selected plan

  $("#left").on('click', '.collection-item', function(){
      $("#left .collection-item").removeClass('active');
      $(this).toggleClass('active');
      left = $(this).attr("data");
  });

  $("#right").on('click', '.collection-item', function(){
      $("#right .collection-item").removeClass('active');
      $(this).toggleClass('active');
      right = $(this).attr("data");
  });

// Form error handling

  $('#submit').click(function() {
    if (!left) {
      Materialize.toast('Pick two plans to compare!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
      return;
    }

    if (!right) {
      Materialize.toast('Pick two plans to compare!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
      return;
    }

    if (right == left) {
      Materialize.toast('Must pick two different plans to compare!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
    	return;
    }

    url = `/compare/${left}/${right}`;
    window.location.replace(url);

  })


});



