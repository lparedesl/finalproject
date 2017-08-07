$(document).ready(function() {
    $("#app").on("DOMNodeInserted", function() {
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