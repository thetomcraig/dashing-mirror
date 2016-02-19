import ystockquote
from datetime import datetime

class StockCalc():
	history = {}

	def record_stock_price(self, stock, file):

		price = ystockquote.get_price(stock)
		now = datetime.now()
		self.history[now] = price

		with open(file, "a") as f:
			f.write(str(now))
			f.write(',')
			f.write(price)
			f.write("\n")
		f.close()

	def get_weekly_data(self):
		now = datetime.now()

		prev = now.replace(day=now.day-8)
		week_hist=ystockquote.get_historical_prices('P', prev.strftime('%Y-%m-%d'), now.strftime('%Y-%m-%d'))

		week_data = []
		for date,data in week_hist.iteritems():
			week_data.append((date,data['Close']))

		return week_data
