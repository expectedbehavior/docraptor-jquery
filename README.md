# jquery.docraptor.js

Easily create pdf/xls docs using [DocRaptor](http://docraptor.com) with jQuery and simple links.

# Basic Usage

### in a linked javascript file...

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
    
### in your html...

    <a href="http://example.com/page_i_want_to_convert_to_pdf.html" title="Here is my title" class="whatever">Click me for a PDF</a>
    


# Via Data Attributes

### in a linked javascript file...

    $(document).ready(function(){

      $(".whatever").docraptor({
        user_credentials: 'INSERT YOUR CREDENTIALS'
      });
      
      // or you could set default user_credentials for all items using docraptor like so...
      $.fn.docraptor.defaults.user_credentials = 'INSERT YOUR CREDENTIALS'

    });
    
### in your html...

    <a class="whatever" data-doc-document_url="http://example.com/page_i_want_to_convert_to_pdf.html" data-doc-name="Here is my title" data-doc-test="true" data-doc-document_type="pdf" data-doc-javascript="true" data-doc-strict="none">Click me for a PDF</a>
    
The data attributes follow a pattern based on the json object expected by DocRapter.

    data-doc-test="true"
    
is converted to...

    {
      doc: {
        test: true
      }
    }
    
You can use either the "href" or "data-doc-document_url" attributes to supply the URL and either the "title" or "data-doc-name" attributes for the name.

    
DocRaptor API Documentation - http://docraptor.com/documentation