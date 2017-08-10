$(document).ready(function() {
    $("#app").on('keypress', '.forget-form input', function(e) {
        if (e.which == 13) {
            if ($('.forget-form').validate().form()) {
                $('.forget-form').submit();
            }
            return false;
        }
    });

    $("#app").on("DOMNodeInserted", function() {
        if ($("#mask_phone")) {
            $("#mask_phone").inputmask("mask", {
                "mask": "(999) 999-9999"
            });
        }

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
                var hr = "";
                if (e.time.meridian === "AM" && e.time.hours < 10) {
                    hr = "0" + e.time.hours;
                } else if (e.time.meridian === "AM" && e.time.hours === 12) {
                    hr = "00";
                } else if ((e.time.meridian === "AM" && e.time.hours >= 10) || (e.time.meridian === "PM" && e.time.hours === 12)) {
                    hr = String(e.time.hours);
                } else if (e.time.meridian === "PM") {
                    hr = String(parseInt(e.time.hours) + 12)
                }
                var time = hr + ":00:00";
                $("input[name='reservation_time']").val(time);
            });
        }
    });
});