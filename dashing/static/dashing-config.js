/* global $, Dashboard */

var dashboard = new Dashboard();
var stock_value;

dashboard.addWidget('clock_widget', 'Clock');

dashboard.addWidget('wheater_widget', 'Weather', {
    WOEID: '12797393'
});


dashboard.addWidget('convergence_widget', 'Graph', {
    getData: function () {
				var url = "http://query.yahooapis.com/v1/public/yql";
				var symbol = 'P';
				var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

				$.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
						.done(function (data) {
						$("#result").text("Bid Price: " + data.query.results.quote.LastTradePriceOnly);
						stock_value = data.query.results.quote.LastTradePriceOnly;
						console.log(data.query.results);
				})
						.fail(function (jqxhr, textStatus, error) {
						var err = textStatus + ", " + error;
								$("#result").text('Request failed: ' + err);
				});


        $.extend(this.scope, {
            title: 'Pandora Stock',
            value: "$" + stock_value,
            moreInfo: '',
            data: [
/*
                    { x: 0, y: 40 },
                    { x: 1, y: 9 },
                    { x: 2, y: 38 },
                    { x: 3, y: 30 },
                    { x: 4, y: 32 }
*/
                ]
            });
    }
});
