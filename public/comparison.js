$(document).ready(function(){

// left side
    var left_parameters = { search: $('#left_job').text() };
    $.get( '/job/company',left_parameters, function(data) {
       data = data[0];
       console.log(data);
       if (data.length == 0) {
         $('#results').text('No results found...');
       } else {
         $('#left').append( data.featuredReview.cons );
         $("#left_image").attr("src",data.squareLogo);
         $("#left_link").attr("href","http://"+data.website);
         $('#left_overall').append( data.overallRating );
         $('#left_rating').append( data.ratingDescription );
         $('#left_wlb').append( data.workLifeBalanceRating );
         $('#left_comp').append( data.compensationAndBenefitsRating );
         $('#left_culture').append( data.cultureAndValuesRating );
         $('#left_senior').append( data.seniorLeadershipRating );
         $('#left_pros').append( data.featuredReview.pros );
         $('#left_cons').append( data.featuredReview.cons );


         // right side, need to embed because it is asynchronous
           var right_parameters = { search: $('#right_job').text() };
           $.get( '/job/company', right_parameters, function(data) {
              data = data[0];
              console.log(data);
              if (data.length == 0) {
                $('#results').text('No results found...');
              } else {
                $('#right').append( data.featuredReview.cons );
                $("#right_image").attr("src",data.squareLogo);
                $("#right_link").attr("href","http://"+data.website);
                $('#right_overall').append( data.overallRating );
                $('#right_rating').append( data.ratingDescription );
                $('#right_wlb').append( data.workLifeBalanceRating );
                $('#right_comp').append( data.compensationAndBenefitsRating );
                $('#right_culture').append( data.cultureAndValuesRating );
                $('#right_senior').append( data.seniorLeadershipRating );
                $('#right_pros').append( data.featuredReview.pros );
                $('#right_cons').append( data.featuredReview.cons );






              };
         });







       };
  });


});



