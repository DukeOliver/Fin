 /* jQuery v1.9.1 included
 */

$(document).ready(function() {
  
  //Application Installer EULA Tickbox
  //If you click the EULA tickbox, "disabled" is removed from button, making it clickable
  $( "#cbAccept" ).click(function() {
    $( 'div.installer-btn-container' ).toggleClass( "eula-click" );
    $('button#ExagoDownloadLinkWindows').prop('disabled', !$('div.installer-btn-container').hasClass("eula-click"));
    $('button#ExagoDownloadLinkLinux').prop('disabled', !$('div.installer-btn-container').hasClass("eula-click"));
  });
  
  //Hidden 'report a site issue' in ticket form
  //hide 'report a site issue' from the dropdown selector
  $('#request_issue_type_select option[value="211898"]').hide();
  //remove it from the nesty-input after it has been created. 
  $('.nesty-panel').on('DOMNodeInserted', function(e){
    $(this).children('ul').children().remove('#211898');
  });
  
  //Up Arrow
  $(window).scroll(function(){  
    // if the user scrolled the page more than 1000 pixels, show the 'up' arrow image
    if ($(this).scrollTop() > 1000) {
      $('.uparrow').fadeIn();
    }
    // hide the 'up' arrow image
    else {
      $('.uparrow').fadeOut();
    } 
  });
  // when the user clicks on the 'up' arrow image, it will scroll the page to the top
  // it will occur in a second (see 1000 value below)
  // you can change that value if you want to make the scroll faster or slower
  $('.uparrow').click(function(){
    $("html, body").animate({ scrollTop: 0}, 1000);
    return false;
  });
  
    // Show div html based on role
    if (HelpCenter.user.role=="anonymous"){
      $("div.anonymous").show();
    }

    if (HelpCenter.user.role=="end_user"){
      $("div.end_user").show();
    }
  
    if (HelpCenter.user.role=="agent" || HelpCenter.user.role=="manager"){
      $("div.manager").show();
    }
  
   if (HelpCenter.user.role=="agent" || HelpCenter.user.role=="manager"){
      $("li.manager").show();
    }

   // Change text in search bar
  $("#query").attr('placeholder','Search Our Knowledge Base');
  
  // change text in request-list search bar
  $('#quick-search').attr('placeholder','Search Requests');
  
  // change text in form's CC box
  $('#request_collaborators_').attr('placeholder','Add email address');

  // toggle categories and sections on the home page
  $(".category-tree").on("click", "h2 a, h3 a", function() {
    $(this).parent().nextAll().toggle();
    return false;
  });

  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $answerbodyTextarea = $(".answer-body textarea"),
      $answerFormControls = $(".answer-form-controls"),
      $commentContainerTextarea = $(".comment-container textarea"),
      $commentContainerFormControls = $(".comment-form-controls");

  $answerbodyTextarea.one("focus", function() {
    $answerFormControls.show();
  });

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  if ($answerbodyTextarea.val() !== "") {
    $answerFormControls.show();
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });
  
  
  // This is a hack to make sure the recent_articles side section
  // on the articles page will not display if there are no recent 
  // articles to show. Same for related_articles.
  var recentArticlesSection = document.getElementById("recent_articles");
  if (recentArticlesSection && recentArticlesSection.innerHTML.indexOf("<li>") === -1)
  {
  	recentArticlesSection.style.display = "none";
  }
  
  var relatedArticlesSection = document.getElementById("related_articles");
  if (relatedArticlesSection && relatedArticlesSection.innerHTML.indexOf("<li>") === -1)
  {
  	relatedArticlesSection.style.display = "none";
  }
});
