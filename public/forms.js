$(document).ready(function(){
  // this is the company ultimately selected
  var final_id;
  $('#search-button').click(function() {
    console.log('click');
    // reset company if new search is initiated
     $("#results").html("");
     final_id = null;
     var parameters = { search: $('#search').val() };
       $.get( '/job/company',parameters, function(data) {
          console.log(data);
          if (data.length == 0) {
            $('#results').text('No results found...');
          } else {
            // Create listings for companies
            $('#results').append( "<ul id='result-list' class='collection'></ul>");
            $.each(data, function(index, company) {
              $a = $("<a id='" + 'company' +"'class='collection-item avatar' data='" +company.name + "'></a>");
              $a.append($("<img src='" + (company.squareLogo ? company.squareLogo : 'https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_1280.png') + "' class='circle' alt=''>"));
              $a.append($("<p><span class='title'>" + company.name +"</span></p>"));
              $a.append($("<a href='http://" + company.website + "'>" + company.website + "</a>"));
              $('#result-list').append($a);
            });
          };
     });
      
   });

// Select company
  $(document).on('click', '.collection-item', function(){
      $(".collection-item").removeClass('active');
      $(this).toggleClass('active');
      final_id = $(this).attr("data");
  });


// Form validation handling
  $('#submit').click(function() {
    let plan_name = $('#plan_name').val();
    let pay = $('#pay').val();
    if (!plan_name) {
      Materialize.toast('Add a plan name!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
      return;
    };
    if (!pay) {
      Materialize.toast('Add a salary!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
      return;
    }
    if (!final_id) {
      Materialize.toast('Pick a company!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
      return;
    }

// Make sure creating new plan is url passable
    plan_name = plan_name.replace(" ", "%20");
    pay = pay.replace(" ", "%20");

    $.ajax({
        url: `/plan/new/${plan_name}/${pay}/${final_id}`,
        type: 'PUT',
        success: function(result) {
            window.location.replace("/success");
        },
        error: function (request, status, error) {
            Materialize.toast('Plan name already exists, try another :-( ', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast
        }
    });
  })
});

