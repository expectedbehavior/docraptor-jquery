// Copyright (c) 2011 David Baldwin (github.com/baldwindavid)

// DocRaptor API Documentation - http://docraptor.com/documentation

(function($) {

  $.fn.docraptor = function(options) {
    var opts = $.extend({}, $.fn.docraptor.defaults, options);
    
    $(this).each(function(i, link){
      $(link).click(function(e){
        e.preventDefault();
        opts["doc"]["document_url"] = $(link).attr("href");
        if($(link).attr("title").length > 0) {
          opts["doc"]["name"] = $(link).attr("title");
        }
        $.each($(link).data(), function (k, v) { 
          var split_key = k.split("-");
          if(split_key[0] == "doc"){
            if(split_key[1] == "prince_options"){
              // throwing errors currently
              // opts["doc"]["prince_options"][split_key[2]] = v;
            } else {
              opts["doc"][split_key[1]] = v;
            };
          };
        });
        
        // console.log(opts);
        download("http://docraptor.com/docs", opts);
      })
    });

    // this function is based on code found:
    // http://www.filamentgroup.com/lab/jquery_plugin_for_requesting_ajax_like_file_downloads/
    // to easily make a form and POST it
    function download(url, data, method){
      //url and data options required
      if( url && data ){ 
        jQuery('<form style="display: none" id="dr_submission" action="' + url
               + '" method="' + (method||'post') + '">'
               + '</form>').appendTo('body');
        //credentials
        jQuery('form#dr_submission').append('<textarea name="user_credentials"></textarea>');
        jQuery('form#dr_submission textarea[name=user_credentials]').val(data.user_credentials);
        
        //doc values
        for(var key in data.doc) {
          jQuery('form#dr_submission').append('<textarea name="doc['+key+']"></textarea>');
          jQuery('form#dr_submission textarea[name="doc['+key+']"]').val(data.doc[key]);
        }

        //submit the form
        jQuery('form#dr_submission').submit().remove();
      };
    };

  };

  $.fn.docraptor.defaults = {
    doc: {
      // prince_options: {}
    },
    user_credentials: 'INSERT YOUR CREDENTIALS'
  }; 


})(jQuery);