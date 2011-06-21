// Copyright (c) 2011 David Baldwin (github.com/baldwindavid)

// DocRaptor API Documentation - http://docraptor.com/documentation

// USAGE
/*

  ================
  in a reference javascript file...

  $(document).ready(function(){

    $(".whatever").docraptor({
      doc: {
        test: true,
        document_type: 'pdf',
        name: 'document',
        strict: 'none',
        javascript: true
      },
      user_credentials: 'INSERT YOUR CREDENTIALS'
    });

  });

  ================
  in your html...

  <a href="http://example.com/page_i_want_to_convert_to_pdf.html" title="Here is my title" class="whatever">Click me for a PDF</a>

  });

*/

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

  // the doc part of this will get overwritten anyway
  $.fn.docraptor.defaults = {
    doc: {
      test: true,
      document_type: 'pdf',
      name: 'document',
      strict: 'none',
      javascript: false
    },
    user_credentials: 'XXX'
  }; 

})(jQuery);