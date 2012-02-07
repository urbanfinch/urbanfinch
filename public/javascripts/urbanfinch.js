var urbanfinch = {
  
  current_theme: 'blue',
  current_section: null,
  
  run: function() {
    
    if($.cookie("css")) {
      urbanfinch.setTheme($.cookie("css"));
    } else {
      urbanfinch.setTheme('/stylesheets/hybrid.css');
    }
    
    /* Initialize scripting CSS stylesheet */
    urbanfinch.initCSS();
    
    /* Initialize navs */
    urbanfinch.initMainNav();
    urbanfinch.initThemeNav();
    urbanfinch.initSegmentNav();
    
    /* Initialize sections & segments */
    urbanfinch.initSegments();
    urbanfinch.initSections();
    
    /* Initialize contact form */
    urbanfinch.initContactForm();
    
    /* Animate the logo and initialize the scripting layout */
    $('div#animation img').attr('src', '/images/' + urbanfinch.current_theme + '/logo.png');
    $('div#animation img').load(function() {
      urbanfinch.animateLogo(function() {
        urbanfinch.initLayout();
      });
    });
  },
  
  initCSS: function() {
    $('html').hide();
    $('body').hide();
    $('head').append('<link id="script" rel="stylesheet" href="/stylesheets/script.css" title="URBAN FINCH" type="text/css" />');
    $('body').addClass('no_background');
    $('body').show();
    $('html').show();
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
  },
  
  initSegmentNav: function() {
    $('nav.segment > a').click(function(event) {
      urbanfinch.handleSegmentNav($(this).attr('class').split(' ')[0]);
      event.preventDefault();
    });
  },
  
  initContactForm: function() {
    $('form#contact input#name').focus();
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
      $('div.inner_body > div.segment', this).hide();
      $('div.inner_body > div.segment', this).first().show();
    });
  },
  
  initSections: function() {
    $('section').hide();
  },
  
  initLayout: function() {
    $('nav#main').show();
    $('nav#themes').show();
    $('div#logo').show();
    $('div#skyline').show();
    $('body').removeClass('no_background');
    
    if(!Modernizr.backgroundsize) {
        $('html').css('background', 'none');
    }
    
    urbanfinch.animateSectionOpen($('section#the_finch'));
    urbanfinch.current_section = 'the_finch';
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
    $('div#' + segment).parent('div.inner_body').find('div.segment').hide();
    $('div#' + segment).show();
    $('div#' + segment + ' div.slider').slider();
  },
  
  animateLogo: function(callback) {
    $('div#animation').show();
    $('div#logo').show();
    var left = $('div#logo').position().left;
    var top = $('div#logo').position().top;
    $('div#logo').hide();
    
    var logoTimeout = window.setTimeout(function() {
      $('div#animation').css('margin-top', '0px');
      $('div#animation').css('margin-left', '0px');
      $('div#animation').css('left', $('div#animation').offset().left - $('div#animation').width() / 2);
      $('div#animation').css('top', $('div#animation').offset().top - $('div#animation').height() / 2);
      $('div#animation').animate({
        top: top,
        left: left,
        width: '250px',
        height: '157px'
      }, 1000, function() {
        $('div#animation').hide();
        callback();
      });
    }, 2000);
  },
  
  setTheme: function(theme) {
    $("link#theme").attr("href", theme);
    $.cookie("css", theme, {expires: 365, path: '/'});
    if (theme.search("orange") > 0) {
      urbanfinch.current_theme = 'orange';
    } else {
      urbanfinch.current_theme = 'blue';
    };
  },
  
  animateSectionOpen: function(section, callback) {
    $(section).css('bottom', '-400px');
    $(section).css('display', 'block');

    $(section).animate({
      bottom: '0px'
    }, 500);
    
    if (callback) {
      callback();
    }
  },
  
  animateSectionClose: function(section, callback) {
    $(section).animate({
      bottom: '-400px'
    }, 500, function() {
      $(section).css('bottom', '0px');
      $(section).css('display', 'none');
      
      if (callback) {
        callback();
      }
    });
  }
}