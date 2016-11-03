window.onload = initialize;

function initialize() {
    var $body = $('body'),
        deviceUUID = 'e32e2584-8d49-437e-9a01-fde072b5c589',
        projectID = '8238',
        APIКey = 'a1b7e216-1afb-4e85-b975-baeb04495bed',
        DHApiKey = "a1b7e216-1afb-4e85-b975-baeb04495bed";


    get_sensor_value('numeric_data_sensor');

    function get_sensor_value(sensorName) {

        var deviceHubRequest = "https://api.devicehub.net/v2/project/8238/device/e32e2584-8d49-437e-9a01-fde072b5c589/sensor/numeric_data_sensor/data?limit=2&from=1430905196";

        $.ajax({
            type: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-ApiKey", DHApiKey);
            },
            url: 'https://api.devicehub.net/v2/project/' + projectID + '/device/' + deviceUUID + '/sensor/' + sensorName + '/data?limit=2',
            error: function () {
                console.log('error');
            },
            success: function (data) {
                console.log(data);
            }
        });

    }

}
