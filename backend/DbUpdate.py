import yliveticker
import sqlite3
import pandas as pd

connection = sqlite3.connect(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\test.db')
cursor = connection.cursor()
stocks_val = {}
active_table_with_value = None
user = 'Merken'
uid = user
buy_order = {}

def retrieve_purchase_order():

    cursor.execute("SELECT stock_name, quantity FROM purchase_order")
    rows = cursor.fetchall()
    data = {}
    for row in rows:
        stock_name, quantity = row
        data[stock_name] = quantity
    print(data)

    return data

def fetch_active_record(uid, stock_name):
    query = "SELECT * FROM active_table WHERE uid = ? AND stock_name = ?"
    cursor.execute(query, (uid, stock_name))
    record = cursor.fetchone()
    return record

def update_active_record(uid, stock_name, new_quantity, new_purchase):
    query = "UPDATE active_table SET quantity = ?, purchase = ? WHERE uid = ? AND stock_name = ?"
    cursor.execute(query, (new_quantity, new_purchase, uid, stock_name))
    connection.commit()

def fetch_records_by_uid(uid):
    query = "SELECT * FROM active_table WHERE uid = ?"
    cursor.execute(query, (uid,))
    records = cursor.fetchall()
    return records

def convert_records_to_dictionary(records):
    columns = [column[0] for column in cursor.description]
    records_dict = []
    for record in records:
        record_dict = dict(zip(columns, record))
        records_dict.append(record_dict)
    return records_dict

def update_user_info(uid, new_balance):
    query = "UPDATE user_info SET balance = ? WHERE uid = ?"
    cursor.execute(query, (new_balance, uid))
    connection.commit()

user_info_df = pd.read_sql_query('SELECT * FROM user_info', connection)

# Convert the DataFrame to a dictionary with 'uid' as the key and 'balance' as the value
user_info_dict = user_info_df.set_index('uid')['balance'].to_dict()

# Print the dictionary
print(user_info_dict)
# this function is called on each ticker update

def on_new_msg(ws, msg):
    global buy_order, user_info_dictgl, user
    global active_table_with_value

    ticker_id = msg['id']
    ticker_price = msg['price']
    stocks_val[ticker_id] = ticker_price
    print(ticker_id,ticker_price)

    if ticker_id in buy_order.keys():

      total_cost = buy_order[ticker_id]*ticker_price

      if user_info_dict[user] > total_cost:
        user_info_dict[user] -= total_cost
                # Insert data into the 'transactions' tabl6+5y7e
        transactions_data = [
            (ticker_id, 'buy', buy_order[ticker_id], ticker_price, user),
        ]
        cursor.executemany('INSERT INTO transactions (stock_name, type, quantity, value, uid) VALUES (?, ?, ?, ?, ?)', transactions_data)

        record = fetch_active_record(user,ticker_id)
        if record is None:
          active_table_data = [
              (ticker_id, buy_order[ticker_id], ticker_price, user),
          ]
          cursor.executemany('INSERT INTO active_table (stock_name, quantity, purchase, uid) VALUES (?, ?, ?, ?)', active_table_data)
        else:
          new_purchase = (record[1]*record[2] + ticker_price*buy_order[ticker_id])/(record[1]+buy_order[ticker_id])
          new_quantity = record[1]+buy_order[ticker_id]
          update_active_record(user, ticker_id, new_quantity, new_purchase)
        buy_order.pop(ticker_id)
        update_user_info(user, user_info_dict[user])
        query = "DELETE FROM purchase_order WHERE uid = ? AND stock_name = ?"
        cursor.execute(query, (user,ticker_id ))
        

        connection.commit()
    stocks_val_df = pd.DataFrame(list(stocks_val.items()), columns=['stock_name', 'stock_value'])

    # Merge the active_table DataFrame with the stocks_val_df DataFrame based on 'stock_name'
     
    query = "SELECT * FROM active_table "
    active_df = pd.read_sql_query(query, connection)[[ 'stock_name', 'quantity',     'purchase',     'uid']]
    
    active_table_with_value = active_df.merge(stocks_val_df, on='stock_name', how='left')
    active_table_with_value['PL'] =  (active_table_with_value['stock_value'] - active_table_with_value['purchase'])*active_table_with_value['quantity']
    active_table_with_value['Total amount'] = active_table_with_value['stock_value']*active_table_with_value['quantity']
    active_table_with_value['percentage'] = (active_table_with_value['PL']/active_table_with_value['Total amount'])*100
    pl,ta = active_table_with_value['PL'].sum(), active_table_with_value['Total amount'].sum()
    # print(active_table_with_value)

    cursor.execute("SELECT * FROM users WHERE uid = ?", (user,))
    row = cursor.fetchone()
    if row:
        # User exists, update the record
        cursor.execute("UPDATE users SET PL=?, net_worth=? WHERE uid=?", (pl, ta, user))
    else:
        # User does not exist, insert a new record
        cursor.execute("INSERT INTO users (uid, PL, net_worth) VALUES (?, ?, ?)", (user, pl, ta))
    
    active_table_with_value.fillna(0, inplace=True)
    for index, row in active_table_with_value.iterrows():
    # Extract the values from the row
        stock_name = row['stock_name']
        quantity = row['quantity']
        purchase = row['purchase']
        uid = row['uid']
        stock_value = row['stock_value']
        PL = row['PL']
        total_amount = row['Total amount']
        # print('exe3')
        # print(row['percentage'])
        percentage = row['percentage']

        # Check if the row exists in the table
        sql = f"SELECT COUNT(*) FROM active_table WHERE uid = '{uid}' AND stock_name = '{stock_name}'"
        cursor.execute(sql)
        result = cursor.fetchone()
        row_count = result[0]
        # print(stock_name,row)
        

        # If the row exists, update it; otherwise, insert a new row
        if row_count > 0:
            update_sql = f"UPDATE active_table SET quantity = {quantity}, purchase = {purchase}, stock_value = {stock_value}, PL = {PL}, `Total_amount` = {total_amount}, percentage = {percentage} WHERE uid = '{uid}' AND stock_name = '{stock_name}'"
            cursor.execute(update_sql)
        else:
            insert_sql = f"INSERT INTO active_table (stock_name, quantity, purchase, uid, stock_value, PL, `Total_amount`, percentage) VALUES ('{stock_name}', {quantity}, {purchase}, '{uid}', {stock_value}, {PL}, {total_amount}, {percentage})"
            cursor.execute(insert_sql)
        # connection.commit()
    connection.commit()

    # Iterate over the DataFrame rows
   

from time import sleep
while True:
  sleep(1)
  print('running')
  buy_order = retrieve_purchase_order()
  buy = buy_order.keys()
  query = f"SELECT * FROM active_table WHERE uid = '{user}'"
  df = list(pd.read_sql_query(query, connection)['stock_name'])
#   print(df)
  final = list(set(df).union(buy))
#   print(list(buy_order.keys()))
  if buy_order: 
    yliveticker.YLiveTicker(on_ticker=on_new_msg, ticker_names=final)