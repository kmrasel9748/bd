var server = window.location.host;
var base_url = "//" + server + "/"


jQuery(document).ready(function () {

    img_slide(1);
    show_date_time();

    // Setup - add a text input to each footer cell
    $('#datatable1 tfoot th').each(function () {
        var title = $(this).text();
        if (title != "") {
            titles = title.split("*");
            if (titles.length > 1) {
                var str = '<select class="select_find  form-control">';
                str += '<option value="">Select ' + titles[0] + '</option>';
                for (i = 1; i < titles.length; i++) {
                    var values = titles[i].split(":");
                    if (values.length > 1) {
                        str += '<option value="' + values[0] + '">' + values[1] + '</option>';
                    } else {
                        str += '<option value="' + titles[i] + '">' + titles[i] + '</option>';
                    }
                }
                str += '</select>';
                $(this).html(str);
            } else {
                $(this).html('<input class="input_find form-control" type="text" placeholder="' + title + '" />');
            }

        }
    });

    // DataTable
    var table = $('#datatable1').DataTable({
        "paging": true,
        "lengthChange": true,
        "pageLength": 25,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true
    });
    // Apply the search
    table.columns().every(function () {
        var that = this;

        $('input, select', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                        .search(this.value)
                        .draw();
            }
        });
    });
});


function img_slide(s) {
    $(".banner-section").css({"background-image": "url(" + base_url + "assets/institute/images/banner" + s + ".png)"}, "slow");
    s++;
    if (s > 3) {
        s = s - 3;
    }
    setTimeout('img_slide(' + s + ')', 5000);
}


function show_date_time()
{
    var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    var currentDate = new Date();
    var day = currentDate.getDate();
    var day_name = weekday[currentDate.getDay()];
    var month = currentDate.getMonth() + 1;
    var month_name = months[month - 1];
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var second = currentDate.getSeconds();
    var am_pm = "AM";
    if (hours > 11)
    {
        am_pm = "PM";
    } else
    {
        am_pm = "AM";
    }
    if (hours > 12)
    {
        hours = hours - 12;
    }
    if (minutes < 10)
    {
        minutes = "0" + minutes
    }
    if (second < 10)
    {
        second = "0" + second
    }
    var date = day_name + ", " + day + "th " + month_name + " " + year;
    var time = hours + ":" + minutes + ":" + second + " " + am_pm;

    document.getElementById("show_date").innerHTML = date;
    document.getElementById("show_time").innerHTML = time;
    setTimeout('show_date_time()', 1000);
}
