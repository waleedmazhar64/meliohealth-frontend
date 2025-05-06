(function ($) {

    $(document).ready(function () {

        // sticky header --------
        function sticky_header() {
            var wind = $(window);
            var sticky = $('.header_area');
            wind.on('scroll', function () {
                var scroll = wind.scrollTop();
                if (scroll < 50) {
                    sticky.removeClass('header_fixed');
                } else {
                    sticky.addClass('header_fixed');
                }
            });
        }
        sticky_header();


        //  Back to top button -------- 
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 600) {
                $('.back-to-top').fadeIn(200)
            } else {
                $('.back-to-top').fadeOut(200)
            }
        });


        // animation for Back to top button --------
        $('.back-to-top').on('click', function (event) {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: 0,
            }, 1500);
        });


        // Hamburger-menu --------
        $('.hamburger-menu').on('click', function () {
            $('.hamburger-menu .line-top, .ofcavas-menu, .main-left-col').toggleClass('current');
            $('.hamburger-menu .line-center').toggleClass('current');
            $('.hamburger-menu .line-bottom').toggleClass('current');
        });


        // hide show password -------------
        $('.togglePassword').click(function(){
            const targetId = $(this).data('target');
            const passwordField = $('#' + targetId);
            const passwordFieldType = passwordField.attr('type');

            if (passwordFieldType === 'password') {
              passwordField.attr('type', 'text');
              $(this).find('img').attr('src', '/assets/images/eye.svg');
            } else {
              passwordField.attr('type', 'password');
              $(this).find('img').attr('src', '/assets/images/eye-slash.svg');
            }
        });


        // accordian ---------
        jQuery(".accordion_title").click(function() {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active").next().slideUp();
            } else {
                $(".accordion_title").next().slideUp();
                $(".accordion_title").removeClass("active");
                $(this).addClass("active").next().slideDown();
            }
            return false;
        })



        
    });

})(jQuery);