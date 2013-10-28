$(document).ready(function() {

  var page = 1;
  /*
    Capture Enter to search
   */
  $('.search-term').keypress(function (e) {
    if (e.which == 13) {
      $('#search').submit();
    }
  });

  /*
    On Search
   */
  $("#search").submit(function(event) {
    event.preventDefault();
    $('#results').empty(); // Clean Results
    var searchTerm = $('#search-term').val();
    window.location.replace('#/?q='+searchTerm); 
    $.ajax({url:'/search?q='+searchTerm
    }).done(
      function(response){
        console.log(response);
        $('#search-info').append('<div class=".col-md-3 .col-md-offset-3"><h6>'+10*page+'/'+response.totalResults+' results, for more results <span class="label label-default">Scroll</span> Down</h6></div>');
        $.each(response.results, function(index, item) {
          var edition = item.edition?' ['+item.edition+']':'';
          var format = item.format?' {'+item.format+'}':'';
          var date = item.date?' ('+(new Date(item.publicationDate)).getUTCFullYear()+')':'';
          $("#results").append('<li class="list-group-item">'+ item.title+edition+', by '+ item.author + date +' - '+ item.publisher +' '+ item.price + format +'</li>');
        });
      });
    return false;
  });

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      page += 1;
      if(page <= 10){
        var searchTerm = $('#search-term').val();
        $.ajax({url:'/search?q='+searchTerm+'&page='+page
        }).done(
          function(response){
            $('#search-info').empty();
            $('#search-info').append('<div class=".col-md-3 .col-md-offset-3"><h6>'+10*page+'/'+response.totalResults+' results, for more results <span class="label label-default">Scroll</span> Down</h6></div>');
            $.each(response.results, function(index, item) {
              var edition = item.edition?' ['+item.edition+']':'';
              var format = item.format?' {'+item.format+'}':'';
              var date = item.date?' ('+(new Date(item.publicationDate)).getUTCFullYear()+')':'';
              $("#results").append('<li class="list-group-item">'+ item.title+edition+', by '+ item.author + date +' - '+ item.publisher +' '+ item.price + format +'</li>');
            });
          });
      }else{
        alert('Maximum 100 elements reached!!');
      }
    }
  });
});
