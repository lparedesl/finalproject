var Login = function() {
    var handleLogin = function() {
        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        $('#forget-password').click(function(){
            $('.login-form').hide();
            $('.forget-form').show();
        });

        $('#back-btn').click(function(){
            $('.login-form').show();
            $('.forget-form').hide();
        });
    };

    return {
        init: function() {
            handleLogin();

            $('.login-bg').backstretch([
                "/pages/img/bg01.jpg",
                "/pages/img/bg02.jpg",
                "/pages/img/bg03.jpg",
                "/pages/img/bg04.jpg"
                ], {
                  fade: 1000,
                  duration: 8000
                }
            );

            $('.forget-form').hide();
        }
    };
}();

var DatePicker = function () {

    var handleDatePicker = function () {

        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                // rtl: App.isRTL(),
                orientation: "left",
                autoclose: true,
                format: "yyyy-mm-dd"
            });
        }
    };

    return {
        init: function () {
            handleDatePicker();
        }
    };

}();

$(document).ready(function() {
    Login.init();
    DatePicker.init();
});