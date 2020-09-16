$(function () {
    $('header nav').meanmenu({
        meanMenuContainer: 'header .place-nav',
        meanMenuOpen: "<i class='icon-menu'></i>",
        meanMenuClose: "<i class='icon-plus'></i>",
        meanScreenWidth: 1000,
        meanDisplay: "block"
    });

    $("#main-link").click(function() { $('main').focus(); });
    $("#bn-play").click(function() {
        $('#bn-vid').focus();
    });
    $("#popup").click(function() { $('.modal-content').focus(); });

    $("nav a[href^='https']").attr("target","_blank");
    $("a[name]").parent().addClass('has_target');
    $("#page h1, h2#append").appendTo("#page-title");
    $("#page .page-divider").parent("#page").addClass('has_divider');
    $("#page .more-to-explore").appendTo(".internal")

    ///////////// global variables
    var theWindow = $(window),
        body = $("body"),
        header = $("header"),
        headerBottom = $("header").outerHeight(),
        stickyBottom = $("header #hd-top").outerHeight();

    /////////////// resize options
    $(window).on('resize', function () {
        $("body").css('padding-top', $("header").outerHeight());
        $(".mean-container .mean-nav").css('bottom', $("#fixed-tabs").outerHeight());
        if ($(window).width() <= 1000) {
            $("footer").css('padding-bottom', $("#fixed-tabs").outerHeight());
        }
    }).trigger('resize');

    /////////////// fixed header with animated in on desktop and attach on mobile
    theWindow.on("scroll", function () {
        if (theWindow.width() > 1000) {
            if (theWindow.scrollTop() >= headerBottom) {
                body.addClass("fix-nav");
                header.addClass("animated slideInDown");
            } else if (theWindow.scrollTop() <= headerBottom) {
                body.removeClass("fix-nav");
                header.removeClass("animated slideInDown");
            }
        }
    });

    if (theWindow.width() < 1001) {
        // Hide Header on on scroll down
                var didScroll;
                var lastScrollTop = 0;
                var delta = 5;
                var navbarHeight = $('header').outerHeight();
    
                $(window).scroll(function(event){
                    didScroll = true;
                });
    
                setInterval(function() {
                    if (didScroll) {
                        hasScrolled();
                        didScroll = false;
                    }
                }, 250);
    
                function hasScrolled() {
                    var st = $(this).scrollTop();
                    // Make sure they scroll more than delta
                    if(Math.abs(lastScrollTop - st) <= delta)
                        return;
                    // If they scrolled down and are past the navbar, add class .nav-up.
                    // This is necessary so you never see what is "behind" the navbar.
                    if (st > lastScrollTop && st > navbarHeight){
                        // Scroll Down
                        $('header').removeClass('nav-down').addClass('nav-up');
                    } else {
                        // Scroll Up
                        if(st + $(window).height() < $(document).height()) {
                            $('header').removeClass('nav-up').addClass('nav-down');
                        }
                    }
                    lastScrollTop = st;
                }
        }

    if ($(window).width() <= 1000) {
        $("footer .social").clone().prependTo(".mean-container .mean-nav");
        $("footer .hours").clone().appendTo(".mean-container .mean-nav");
    }


});   // end of top-most function


$(function () {
    var theWindow = $(window);

        // accordion + video reload
        $(".accordion h3, .accordion h2").addClass("toggle").wrapInner("<div />");
        $(".toggle").each(function () {
            $(this).nextUntil('.toggle').add().wrapAll('<div class="accordion-content"><span />');        
        });

        $(".accordion-content").each(function() {
            $(this).append('<i class="close-content" />');
        });
        $(".toggle, .accordion-content:before").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active").next().slideUp();
            } else {
                $(".toggle").removeClass("active").next().slideUp();
                $(this).addClass("active").next().slideDown();
                for (var i = 0; i < $('.accordion iframe').length; i++) {
                    var noAutoPlay = $('.accordion iframe').attr('src').replace('autoplay=1','autoplay=0');
                    $ ('.accordion iframe').attr('src', noAutoPlay);
                    //url add: ?enablejsapi=1
                    $('.accordion iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                }
            }
        });
        $(".accordion .close-content").on("click", function() {
            $(this).parent().hide();
        });


    if (theWindow.width() > 999) {
        $(".accordion h2").each(function () {
            let quest = $(this).next() 
            $(this).clone().prependTo(quest) 
        });
        $(".accordion-content h2").each(function () {
            $(this).removeClass("toggle").next("span").addBack().wrapAll('<div class="flex-quest">');   
        });
    }
    ////////////////////////////// FAQ / Accordion
    // $(".accordion > h3, .accordion > h2").each(function () {
    //     $(this).wrap('<button></button>').parent().addClass('toggle');
    // });
    // $(".toggle").each(function () {
    //     $(this).nextUntil('.toggle').add().wrapAll('<div>');
    // });
    // $(".toggle").on("click", function () {
    //     if ($(this).hasClass("active")) {
    //         $(this).removeClass("active").next().slideUp();
    //     } else {
    //         $(".toggle").removeClass("active").next().slideUp();
    //         $(this).addClass("active").next().slideDown();
    //         for (var i = 0; i < $('.accordion iframe').length; i++) {
    //             $('.accordion iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    //         }
    //     }
    // });



    ////////////////////////////// page divider
    var dividerStart = "> h2, .page-divider .wrap",
        mobileWidth = 1000;
    $.when(setupServices()).done(function () {});
       function setupServices() {

        $(".page-divider " + dividerStart)
            .addClass("dividerLead").each(function () { //auto wrap
                $(this)
                    .nextUntil('.dividerLead')
                    .addBack()
                    .wrapAll('<div class="block">');
        });

         $(".block").each(function (index) {
                   $(this)
                       .find('.dividerLead')
                       .next(".elem")
                       .addClass('wow fadeIn')
                       .addClass(index % 2 ? 'elem-left' : 'elem-right')
                    // move .elem above H2
                   if ($(window).width() >= mobileWidth) {
                       $(this).children(".elem").insertBefore($(this).children(".dividerLead"));
                   }
               })


///////////// move anchors to top of blocks
           $(".page-divider a[name]").each(function () {
            var getAnchor = $(this).parent(".has_target"),
                anchorTarget = $(this).parentsUntil(".page-divider").next().find(".dividerLead").parent();
            getAnchor.remove();
            $(this).prependTo(anchorTarget);
        });

    }

    $(".block [class^='btn']").parent("p").addClass('has_btn');


    /// for flexing inside .blocks
    $(".block .elem").each(function () { //auto wrap
        $(this).nextUntil('.block, .mini-block').addBack().wrapAll('<div>').parent().addClass('contain');
    });

///////// make mini-blocks for h3 inside divider blocks
    $(".page-divider h3").each(function() {
        $(this).nextUntil('h3, .dividerLead').addBack().wrapAll('<div>')
        .parent().addClass("mini-block")
    });
    $(".mini-block").each(function (index) {
        $(this)
            .find('h3')
            .next(".elem-sm")
            .addClass('wow fadeIn elem-left')
        if ($(window).width() >= mobileWidth) {
            $(this).children(".elem-sm").insertBefore($(this).children("h3"));
        }
    })

    ///////////// wraps text & .btn in article after .block .elem
    $(".block .elem + *, .block .wrap").each(function () { //auto wrap
        $(this).nextUntil('.block').addBack().wrapAll('<article>');
    });

    $(".mini-block h3").each(function () { //auto wrap
        $(this).nextUntil('.mini-block, .block').addBack().wrapAll('<article>');
    });
    

        ////////// just adds tall class (overflow:visible) on .block article
        $(".block .contain").each(function () {
            if ( $(this).height() > 700) { $(this).addClass("tall") }
        });

        ////////  If no image insided block to change styles
        $('.block').each(function() {
            if (!$(this).find('.elem').length) {
                ($(this).addClass('no_img'))
            }
        });
        $(".block.no_img .dividerLead").each(function () { //auto wrap
            $(this).nextUntil('.block').addBack().wrapAll('<article>');
        });


    // page title + intro - interior banner
    ////////////  Add flex to .top img/video + text before page-dividers
    $("#page > p:first-of-type").each(function() {
        $(this).nextUntil("div, h1, h2, h3, form").addBack().wrapAll("<article id='intro'>")
    });
    $("#intro").appendTo("#page-banner .contain")

    $('.internal').each(function() {
        if ($(this).find('.main-img').length) {
            $('.main-img').appendTo('#page-banner');
        }
    });
      $('#page-banner').each(function() {
        if ($(this).find('.main-img').length) {
            $("#page-banner .contain").nextUntil('#main-img').addBack().wrapAll('<div>').parent().addClass('flex-banner');
        }
    });

    if (theWindow.width() > 999) {
        if ($("body").find('.flex-ed-special').length) {
            $('#page-title, #intro').prependTo('#add')
        }
    }

});


//////// Banner and testimonial video with different top offsets
 
    $(".slick-reviews").slick({      
        dots:true,   
        arrows:true,  
        appendDots:".reviews-controls",          
        appendArrows:".reviews-controls",
        draggable:false,
        autoplay:true,
        // fade: true,
        cssEase: 'linear',
        autoplaySpeed:10000,
        slidesToScroll:1,
        slidesToShow:1,
        focusOnSelect:true,
        prevArrow:"<button type='button' class='arrow' id='prev'><i class='icon-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button'  class='arrow' id='next'><i class='icon-angle-right' aria-hidden='true'></i></button>",
        speed:300,
        customPaging:function(slider,index) {         
        return '<span></span>';
        },
        responsive: 
        [{
            breakpoint: 1000,
            settings: {
                fade: true,
            } 
        }]       
    });   

    $(".slick-gallery").slick({
        dots:true,
        arrows:true, 
        fade: true,
        autoplay:true,
        autoplaySpeed:5000,
        speed:500,    
        adaptiveHeight: false,
        appendDots:".slick-controls",
        appendArrows: ".gallery",
        prevArrow:"<button type='button' class='arrow' id='prev'><i class='icon-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button'  class='arrow' id='next'><i class='icon-angle-right' aria-hidden='true'></i></button>",  
        customPaging:function(slider,index) {         
            return '<span></span>';
         },
        responsive: 
        [{
            breakpoint: 750,
            settings: {  
                appendArrows:".slick-controls",
                dots:true
            } 
        }]     
    }); 

    var $status = $('.pagingInfo');
    var $slickLetters = $('.letters-gallery');
    $slickLetters.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      $status.text('0' + i + '/' + slick.slideCount);
    });

