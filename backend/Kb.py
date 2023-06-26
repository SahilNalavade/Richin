import sqlite3
import pandas as pd


data = pd.DataFrame({
    'Symbol': ['BTC-USD',
 'ETH-USD',
 'BNB-USD',
 'MATIC-USD',
 'STETH-USD',
 'STETH-USD',
 'SOL-USD',
 'DOGE-USD',
 'ADA-USD',
 'TRX-USD',
 'WBTC-USD',
 'WBTC-USD',
 'HEX-USD',
 'XRP-USD',
 'LTC-USD'],
    'quantity': [0.4 for x in range(15)]
})

def insert_purchase_order(data):
    connection = sqlite3.connect('test.db')
    cursor = connection.cursor()

    for index, row in data.iterrows():
        cursor.execute("INSERT INTO purchase_order (stock_name, quantity, uid) VALUES (?, ?, ?)",
                       (row['Symbol'], row['quantity'],'Merken'))

    connection.commit()
    connection.close()

# Example usage
insert_purchase_order(data)
