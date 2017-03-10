// Copyright (c) 2011 David Baldwin (github.com/baldwindavid)

// DocRaptor API Documentation - http://docraptor.com/documentation

(function($) {

  $.fn.docraptor = function(options, user_credentials) {
    var opts = $.extend({}, $.fn.docraptor.defaults, options);
    var user_credentials = user_credentials || $.fn.docraptor["user_credentials"];
    var domain = $.fn.docraptor["domain"];

    $(this).each(function(i, link){
      $(link).click(function(e){
        e.preventDefault();

        // option to set url of document to convert via href attribute
        opts["document_url"] = $(link).attr("href");

        // option to set name of document to produce via title attribute
        if($(link).attr("title") && $(link).attr("title").length > 0) {
          opts["name"] = $(link).attr("title");
        }

        // ensure that prince_options exist
        if(!!opts["prince_options"]){
          opts["prince_options"] = {}
        }

        // any standard docraptor doc options can be set via data attributes
        // example: data-doc-document_url="my_file_to_convert.html"
        // example of prince_options: data-doc-prince_options-baseurl="http://example.com"
        // data-doc-document_url would override setting of url in href attribute
        // data-doc-name would override setting of name in title attribute
        $.each($(link).data(), function (k, v) { 
          var split_key = k.split("-");
          if(split_key[0] == "doc"){
            if(split_key[1] == "prince_options"){
              opts["prince_options"][split_key[2]] = v;
            } else {
              opts[split_key[1]] = v;
            };
          };
        });

        // you can leave off the domain of a page to convert if you have pre-configured "domain"
        // example:  $.fn.docraptor["domain"] = 'http://mycooldomain.com';
        // this will be overriden per instance if the full URL is provided
          // i.e. href="http://mydomain.com/file_to_convert.html"
        if(!opts["document_url"].match(/:\/\//)){
          opts["document_url"] = domain + "/" + opts["document_url"];
        }

        download("http://docraptor.com/docs", opts, user_credentials);
      })
    });

    // this function is based on code found:
    // http://www.filamentgroup.com/lab/jquery_plugin_for_requesting_ajax_like_file_downloads/
    // to easily make a form and POST it
    function download(url, data, user_credentials){
      //url and data options required
      if( url && data ){ 
        jQuery('<form style="display: none" id="dr_submission" action="' + url
               + '" method="post">'
               + '</form>').appendTo('body');
        //credentials
        jQuery('form#dr_submission').append('<textarea name="user_credentials"></textarea>');
        jQuery('form#dr_submission textarea[name=user_credentials]').val(user_credentials);
        
        //doc values
        for(var key in data) {
          if(key == "prince_options"){
            for(var prince_key in data.prince_options){
              jQuery('form#dr_submission').append('<textarea name="doc[prince_options]['+prince_key+']"></textarea>');
              jQuery('form#dr_submission textarea[name="doc[prince_options]['+prince_key+']"]').val(data.prince_options[prince_key]);
            }
          } else {
            jQuery('form#dr_submission').append('<textarea name="doc['+key+']"></textarea>');
            jQuery('form#dr_submission textarea[name="doc['+key+']"]').val(data[key]);
          }
        }

        //submit the form
        jQuery('form#dr_submission').submit().remove();
      };
    };

  };

  $.fn.docraptor.defaults = {
    prince_options: {}
  };

  $.fn.docraptor["user_credentials"] = '';
  $.fn.docraptor["domain"] = '';

})(jQuery);
