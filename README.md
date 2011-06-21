# jquery.docraptor.js

Easily create pdf/xls docs using (DocRaptor)[http://docraptor.com] with jQuery and simple links.

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
    
DocRaptor API Documentation - http://docraptor.com/documentation