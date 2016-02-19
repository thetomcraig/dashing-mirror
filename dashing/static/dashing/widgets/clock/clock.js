/* global Dashing, $ */

Dashing.widgets.Clock = function(dashboard) {
    this.__init__ = Dashing.utils.widgetInit(dashboard, 'clock');
    this.row = 1;
    this.col = 1;
    this.scope = {};
    this.getWidget = function () {
        return this.__widget__;
    };
    this.getData = function () {
        var self = this,
            formatTime = function(i) {
                return i < 10 ?  '0' + i : i;
            },
            today = new Date(),
            h = today.getHours(),
            m = today.getMinutes(),
            s = today.getSeconds();

			
				var hour = h;
				if (h%12 == 0) {
					hour = 12;
				} else {
					hour = h%12;
				}

        $.extend(self.scope, {
            time: hour + ':' + formatTime(m),
            date: today.toDateString('DDDD ddd')
        });
    };
    this.interval = 500;
};
