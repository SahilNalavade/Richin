import yliveticker


# this function is called on each ticker update
def on_new_msg(ws, msg):
    print(msg)


yliveticker.YLiveTicker(on_ticker=on_new_msg, ticker_names=['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'HINDUNILVR.NS', 'ICICIBANK.NS', 'BAJFINANCE.NS', 'INFY.NS', 'ITC.NS', 'ASIANPAINT.NS', 'KOTAKBANK.NS'])