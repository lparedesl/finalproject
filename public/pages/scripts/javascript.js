$(document).ready(function() {
    $("#app").on('keypress', '.forget-form input', function(e) {
        if (e.which == 13) {
            if ($('.forget-form').validate().form()) {
                $('.forget-form').submit();
            }
            return false;
        }
    });

    var FormInputMask = function () {
        var handleInputMasks = function () {
            $("#mask_phone").inputmask("mask", {
                "mask": "(999) 999-9999"
            }); //specifying fn & options
    }

    return {
        //main function to initiate the module
        init: function () {
            handleInputMasks();
        }
    };

}();

if (App.isAngularJsApp() === false) { 
    jQuery(document).ready(function() {
        FormInputMask.init(); // init metronic core componets
    });
}

    $("#app").on("DOMNodeInserted", function() {
        // if ($(".login-bg")) {
        //     $('.login-bg').backstretch([
        //             "/pages/img/bg01.jpg",
        //             "/pages/img/bg02.jpg",
        //             "/pages/img/bg03.jpg",
        //             "/pages/img/bg04.jpg"
        //         ], {
        //             fade: 1000,
        //             duration: 8000
        //         }
        //     );
        // }

        if ($("#signup-dob")) {
            $("#signup-dob").datepicker({
                // rtl: App.isRTL(),
                orientation: "left",
                autoclose: true,
                format: "yyyy-mm-dd"
            });
        }

        if ($("#reservation-date")) {
            $("#reservation-date").datepicker()
            .on("changeDate", function(e) {
                $("input[name='reservation_date']").val(moment(e.date).format("YYYY-MM-DD"));
            });
        }

        if ($(".timepicker")) {
            $('.timepicker').timepicker({
                minuteStep: 60
            })
            .on('changeTime.timepicker', function(e) {
                var hr = e.time.meridian === "AM" ? e.time.hours < 10 ? "0" + e.time.hours : e.time.hours : parseInt(e.time.hours) + 12;
                var time = hr + ":00:00";
                $("input[name='reservation_time']").val(time);
            });
        }
    });
});