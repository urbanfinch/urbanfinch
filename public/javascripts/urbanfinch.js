var urbanfinch = {
  
  current_theme: 'blue',
  current_section: null,
  
  run: function() {
    if (!window.IE6) {
      if($.cookie("css")) {
        urbanfinch.setTheme($.cookie("css"));
      } else {
        urbanfinch.setTheme('/stylesheets/hybrid.css');
      }
    }
    
    /* Initialize CSS fixes */
    urbanfinch.initCSS();
    urbanfinch.addPlaceholders();
    
    /* Initialize navs */
    urbanfinch.initMainNav();
    urbanfinch.initThemeNav();
    urbanfinch.initSegmentNav();
    
    /* Initialize sections & segments */
    urbanfinch.initSegments();
    urbanfinch.initSections();
    
    /* Initialize contact form */
    urbanfinch.initContactForm();
    
    urbanfinch.handleMainNav('the_finch');
  },
  
  initCSS: function() {
    if(!Modernizr.backgroundsize) {
        $('html').css('background', 'none');
    }
    
    $('div.segment').css('margin-top', '0px');
    $('body').css('height', window.innerHeight);
  },
  
  initMainNav: function() {
    $('nav#main > a.the_finch').click(function(event) {
      urbanfinch.handleMainNav('the_finch');
      event.preventDefault();
    });
    $('nav#main > a.the_services').click(function(event) {
      urbanfinch.handleMainNav('the_services');
      event.preventDefault();
    });
    $('nav#main > a.the_work').click(function(event) {
      urbanfinch.handleMainNav('the_work');
      event.preventDefault();
    });
    $('nav#main > a.the_indoor').click(function(event) {
      urbanfinch.handleMainNav('the_indoor');
      event.preventDefault();
    });
    $('nav#main > a.the_contacts').click(function(event) {
      urbanfinch.handleMainNav('the_contacts');
      event.preventDefault();
    });
    $('nav#main > a.the_finch').addClass('active');
  },
  
  initThemeNav: function() {
    if (!window.IE6) {
      $('nav#themes > a#blue').click(function(event) {
        urbanfinch.setTheme($(this).attr('href'));
        event.preventDefault();
      });
      $('nav#themes > a#orange').click(function(event) {
        urbanfinch.setTheme($(this).attr('href'));
        event.preventDefault();
      });
      $('nav#themes > a#hybrid').click(function(event) {
        urbanfinch.setTheme($(this).attr('href'));
        event.preventDefault();
      });
    } else {
      $('nav#themes').hide();
    }
  },
  
  initSegmentNav: function() {
    $('nav.segment > a').click(function(event) {
      urbanfinch.handleSegmentNav($(this).attr('class').split(' ')[0]);
      event.preventDefault();
    });
  },
  
  initContactForm: function() {
    $("form#contact").validate(
    {
      rules: {
        name: { required: true },
        email: { required: true, email: true },
        message: { required: true }
      },
      submitHandler: urbanfinch.handleContact,
      errorPlacement: function(error, element) {},
      highlight: function(element, errorClass) {
        $(element).addClass('error');
      },
      unhighlight: function(element, errorClass) {
        $(element).removeClass('error');
      }
    });
  },
  
  initSegments: function() {
    $('section').each(function() {
      $('div.container > div.segment', this).hide();
      $('div.container > div.segment', this).first().show();
    });
  },
  
  initSections: function() {
    $('section').hide();
  },
  
  initImages: function(segment) {
    $('img.lazy', segment).each(function() {
      $(this)
        .hide()
        .attr('src', $(this).attr('data-original'))
        .one('load', function() {
          $(this).fadeIn().removeClass('lazy').parent().css('background-image', 'none');
        });
    });
  },
  
  handleContact: function() {
    if($('form#contact').valid()){

      $('form#contact p.message').hide();
      $('form#contact p.loading').show();

      $.ajax({
        url: '/contact',
        type: 'POST',
        cache: false,
        data: $('form#contact').serialize(),
        dataType: 'json',
        success: function(data){
          $('form#contact p.loading').hide();
          $('form#contact p.message').show();
          $('form#contact p.message').html(data.feedback);
        },
        error: function(){
          $('form#contact p.loading').hide();
          $('form#contact p.message').show();
          $('form#contact p.message').html('Error sending form. Try again later.');
        }
      });

    }
    return false;
  },
  
  handleMainNav: function(section) {
    if (urbanfinch.current_section != section) {
      if (urbanfinch.current_section) {
        urbanfinch.animateSectionClose('section#' + urbanfinch.current_section, function() {
          urbanfinch.animateSectionOpen($('section#' + section), function() {
            if ($('section#' + urbanfinch.current_section + ' nav.segment > a').length > 0) {
              urbanfinch.handleSegmentNav($('section#' + urbanfinch.current_section + ' nav.segment > a').eq(0).attr('class').split(' ')[0]);
            }
          });
        });
      } else {
        urbanfinch.animateSectionOpen($('section#' + section), function() {
          if ($('section#' + urbanfinch.current_section + ' nav.segment > a').length > 0) {
            urbanfinch.handleSegmentNav($('section#' + urbanfinch.current_section + ' nav.segment > a').eq(0).attr('class').split(' ')[0]);
          }
        });
      }
      urbanfinch.current_section = section;
      $('nav#main > a').removeClass('active');
      $('a.' + section).addClass('active');
    };
  },
  
  handleSegmentNav: function(segment) {
    $('div#' + segment).parent('div.container').find('div.segment').hide();
    $('div#' + segment).show();
    $('div#' + segment + ' div.slider').slider();
    urbanfinch.initImages($('div#' + segment));
  },
  
  setTheme: function(theme) {
    if ($("link#theme")) {
      $("link#theme").attr("href", theme);
      $.cookie("css", theme, {expires: 365, path: '/'});
      if (theme.search("orange") > 0) {
        urbanfinch.current_theme = 'orange';
      } else {
        urbanfinch.current_theme = 'blue';
      };
    }
  },
  
  animateSectionOpen: function(section, callback) {
    $(section).css('top', $(window).height());
    $(section).css('display', 'block');

    $(section).animate({
      top: '0px'
    }, 750);
    
    if (callback) {
      callback();
    }
  },
  
  animateSectionClose: function(section, callback) {
    $(section).animate({
      top: $(window).height()
    }, 750, function() {
      $(section).css('top', '0px');
      $(section).css('display', 'none');
      
      if (callback) {
        callback();
      }
    });
  },
  
  addPlaceholders: function() {
    if ('placeholder' in document.createElement('input')) {
      return;
    }
    
    $.merge($('input[placeholder]'), $('textarea[placeholder]')).each(function (){
      var placeholderName = $(this).attr('id');
      var placeholderText = $(this).attr('placeholder');
      var placeholder = $('<label for='+ $(this).attr('id') +'>'+ placeholderText + '</label>');
      placeholder.addClass('placeholder');
      
      $(this).before(placeholder);
      
      $(placeholder).click(function(){
        $('label[for=' + placeholderName + ']').hide();
        document.getElementById(placeholderName).focus();
      })
      $(this).focus(function(){
        $('label[for=' + placeholderName + ']').hide();
      })
    
      $(this).blur(function(){
        $('label[for=' + placeholderName + ']').show();
      })
    });
    
  }
}