# jquery.docraptor.js

Easily create pdf/xls docs using [DocRaptor](http://docraptor.com) with jQuery and simple links.

# Fully functioning example page

Our examples repo has a page with this library integrated:
https://github.com/expectedbehavior/doc_raptor_examples/blob/master/javascript/jquery_library_example.html

# Simplest Usage

### in a linked javascript file...

    $(".whatever").docraptor({
        document_type: 'pdf'
      },
      'XXXXX-USER-CREDENTIALS'
    );
    
### in your html...

    <a href="http://example.com/page_i_want_to_convert_to_pdf.html" title="my_document_name" class="whatever">Click me for a PDF</a>
    
This will provide DocRaptor with the following...
  
    {
      doc: {
        document_type: 'pdf',
        document_url: 'http://example.com/page_i_want_to_convert_to_pdf.html',
        name: 'my_document_name'
      },
      user_credentials: 'XXXXX-USER-CREDENTIALS'
    }
    

# Example with more options
You can provide any of the DocRaptor options within the javascript call to "docraptor". 

### in a linked javascript file...

    $(".whatever").docraptor({
        document_type: 'pdf',
        strict: none,
        test: true,
        prince_options: {
          user_password: "hello"
        }
      },
      'XXXXX-USER-CREDENTIALS'
    );

# Via Data Attributes

If you prefer, any of these options can be set via data attributes on the element.
    
### in your html...

    <a class="whatever" data-doc-document_url="http://example.com/page_i_want_to_convert_to_pdf.html" data-doc-name="my_new_document" data-doc-test="true" data-doc-document_type="pdf" data-doc-javascript="true" data-doc-strict="none" data-doc-prince_options-user_password="hello">Click me for a PDF</a>
    
The data attributes follow a pattern based on the json object expected by DocRaptor.

    data-doc-test="true"
    
is converted to...

    {
      doc: {
        test: true
      }
    }
    
This will provide DocRaptor with the following...
  
    {
      doc: {
        document_type: 'pdf',
        document_url: 'http://example.com/page_i_want_to_convert_to_pdf.html',
        name: 'my_new_document',
        test: true,
        javascript: true,
        strict: 'none'
        prince_options: {
          user_password: 'hello'
        }
      },
      user_credentials: 'XXXXX-USER-CREDENTIALS'
    } 
    
You can use either the "href" or "data-doc-document_url" attributes to supply the URL and either the "title" or "data-doc-name" attributes for the name.  The data attributes will always override standard attributes.

# Setting default user_credentials

Default user_credentials can be set via this method...

    $.fn.docraptor["user_credentials"] = 'XXXXX-USER-CREDENTIALS';
    
This will allow you to use doc_raptor without providing the user_credentials multiple times.  Setting up elements to use doc_raptor could be as simple as this...

    $(".whatever").docraptor();

# Setting a default domain

DocRaptor needs to know the full URL of the document it is to convert.  However, you may be dealing with dev, staging and production servers, so it can be problematic and redundant to include the full URL.  Setting a default domain allows you to provide only file names.

    $.fn.docraptor["domain"] = 'http://example.com';
    
Now your html can be simplified to this...

    <a href="page_i_want_to_convert_to_pdf.html" title="my_document_name" class="whatever">Click me for a PDF</a>
    
If a specific link needs to use an alternative URL, simply provide the full URL; the default will be overridden for that instance.

# Example: Automatic Defaults for Testing and Production

You will likely be running DocRaptor in test mode in development.  It can be convenient to set some defaults that automatically change based upon your development, staging and production environments.

In the example below the domain is detected.  With this default, DocRaptor will run in test mode unless requested from the production domain.  This will also allow you to provide only file names in your links (see "Setting a default domain" above) across multiple locations.

    $.fn.docraptor.domain = window.location.protocol + '//' + window.location.host;
    $.fn.docraptor.user_credentials = 'XXX';
    $.fn.docraptor.defaults = {
      test: !($.fn.docraptor["domain"] == "http://my-production-domain.com"),
    }

---
    
DocRaptor API Documentation - http://docraptor.com/documentation