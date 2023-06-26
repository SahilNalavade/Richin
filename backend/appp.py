from flask_cors import CORS
import matplotlib.pyplot as plt
import numpy as np
import datetime as dt
import pandas as pd
import yfinance as yf
from datetime import date
from sklearn import preprocessing
from sklearn.preprocessing import MinMaxScaler
from dateutil.relativedelta import relativedelta
import random
import math
import json
from flask import Flask, jsonify, request
import sqlite3
connection = sqlite3.connect(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\test.db')
cursor = connection.cursor()
app = Flask(__name__)
CORS(app)
portfolio_analysis = {}
ex_rate = 81
years = 7
z = None
user = 'Merken'

df = pd.read_csv(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\final_data6.csv')
cry = pd.read_csv(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\crypto_final.csv')

def norm(arr):
  return MinMaxScaler().fit_transform(np.array(arr).reshape(-1,1))


features = ['NAME OF COMPANY', 'SYMBOL','marketCap','sector','volitility','std','price', 'Sscore', 'beta', 'cagr','market_cagr', 'net_cagr','returns','sharp_ratio','spearman','pearson', 'kendall','period']
featuresc = ['Sscore', 'Symbol','Market Cap', 'Name','cagr', 'currency', 'marketCap', 'period', 'returns', 'sharp_ratio','std', 'volitility','price']
le = preprocessing.LabelEncoder()
new = df[features].copy().dropna(axis=0, subset=['Sscore'])
new['avgcorr'] = new[['spearman','pearson', 'kendall']].sum(axis='columns')/3
new['intsector'] = le.fit_transform(new['sector'])
new['spscore'] = norm(new['Sscore']*new['period']/new['volitility'])
new['Sscore'] = norm(new['Sscore'])
new['vscore'] = norm(new['Sscore']/new['returns'])
new = new.query(f'period >= {years}')
portfo = None
cry = cry[featuresc]
cry['spscore'] = cry['Sscore']*cry['period']/cry['volitility']
cry['price'] *= ex_rate

def portfolio(row):
  global portfo
  if '.NS' in row['Symbol']:
    row['quantity'] = round(portfo[row['Symbol']]/row['price'])
    row['purchase'] = row['quantity']*row['price']
  else:
    row['purchase'] = portfo[row['Symbol']]
    row['quantity'] = portfo[row['Symbol']]/row['price']
  return row


def final_portfolio(port,amt,risk):
  global portfo
  data = build(**port)
  tickers = bucket(r = data['r'],risk=risk)
  start = "2015-01-01"
  df = yf.download(tickers, start=start)
  data = df['Adj Close']
  log_returns = np.log(data/data.shift())
  a = new[new['SYMBOL'].isin(tickers)][['SYMBOL','cagr','price','period','std','marketCap']].rename({'SYMBOL': 'Symbol',}, axis='columns')
  b = cry[cry['Symbol'].isin(tickers)][['Symbol','cagr','price','period','std','marketCap']]
  ab = pd.concat([a,b])
  mc = dict(zip(ab['Symbol'],(ab['period']**3)*ab['marketCap']**2))
  for m in mc.keys():
    if '.NS' not in m:
      mc[m] = mc[m]*0.3
  
  n = 50*len(tickers)
  weights = np.zeros((n, len(tickers)))
  exp_rtns = np.zeros(n)
  exp_vols = np.zeros(n)
  sharpe_ratios = np.zeros(n)
  markcap = [mc[tick] for tick in tickers]

  for i in range(n):
      weight = np.random.random(len(tickers))
      weight /= weight.sum()
      weights[i] = weight
      
      exp_rtns[i] = np.sum(log_returns.mean()*weight)*252
      exp_vols[i] = np.sqrt(np.dot(weight.T, np.dot(log_returns.cov()*252, weight)))

      sharpe_ratios[i] = (exp_rtns[i] / (exp_vols[i])**2)*sum(weight*(markcap))

  index = np.where((norm(exp_vols).reshape(-1) <= 0.6) & (norm(exp_rtns).reshape(-1) >= 0) & (norm(exp_rtns).reshape(-1) <= 1))[0]
  # import matplotlib.pyplot as plt
  # fig, ax = plt.subplots()
  # ax.scatter(exp_vols, exp_rtns, c=sharpe_ratios)
  # ax.scatter(exp_vols[np.where(sharpe_ratios == sharpe_ratios[index].max())], exp_rtns[np.where(sharpe_ratios == sharpe_ratios[index].max())], c='r')
  # ax.set_xlabel('Expected Volatility')
  # ax.set_ylabel('Expected Return')
  print(index)
  investments = weights[sharpe_ratios[index].argmax()]*amt
  portfo = dict(zip(tickers,investments))
  abc = ab.apply(portfolio,axis=1).drop_duplicates(subset='Symbol')
  abc['cagr'] *= (1 - abc['std']*10)
  abc['exp_cagr'] = abc['cagr'] *(abc['purchase']/abc['purchase'].sum()) *100
  abc['exp_returns'] = abc['cagr'] * abc['purchase']
  abc['percentage'] = (abc['purchase']/abc['purchase'].sum())*100
  return abc

@app.route('/infostocks', methods=['POST','GET'])
def info_on():
  data = request.json
  msft = yf.Ticker(data['ticker'] + '.NS')
  info = msft.info
  return info

def build(pv=None, fv=None, r=None,n=None):

  if fv == None:
    fv = pv * (((1 + (r/100.0)) ** n))
  elif r == None:
    r = (((fv/pv)**(1/n))-1)*100
  elif n == None:
    n = (np.log(fv/pv))/np.log(1+r/100)
  return ({
      'pv':pv,'fv':fv
      ,'r':r,'n':n})
  
def bucket(n=15,cryp_split=0.3,r=12,risk=0):
  r /= 100
  rmin = r*(risk/100)
  ncrypto = math.floor(n*cryp_split)
  nstocks = n - ncrypto - 5
  # print(nstocks)
  df = new.query(f'cagr >= {rmin}')
  df1 = cry.query(f'cagr >= {rmin}').drop_duplicates()
  numeric_columns = df.select_dtypes(include=['int', 'float'])
#   print(df.groupby('sector')[numeric_columns.columns].mean())
  inedx = list(df.groupby('sector')[numeric_columns.columns].mean().sort_values(by=['spscore'],ascending=False).index)
  sectors, cryp = inedx[:5] , []
  # sectors.append('RELIANCE.NS')
  bucket = ['RELIANCE.NS']

  for x in range(nstocks):
    sectors.append(random.choice(inedx))

  for x in range(ncrypto):
    bucket.append(random.choice(list(cry.sort_values(by=['spscore'],ascending=False)['Symbol'].head(ncrypto*3))))

  for sec in sectors:
    #  print(df.loc[df['sector'] == sec].sort_values(by=['spscore'],ascending=False))
     candidates = list(df.loc[df['sector'] == sec].sort_values(by=['spscore'],ascending=False)['SYMBOL'].head(5))

    #  print(candidates)
     bucket.append(random.choice(candidates))

  return list(set(bucket))
@app.route('/table', methods=['POST','GET'])
def get_abc():
   global abc,portfolio_analysis
   stocks = abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)].to_json(orient = 'records')
   crypto = abc[abc['Symbol'].str.contains('USD', regex=True, na=False)].to_json(orient = 'records')
  #  for x in [stocks,crypto]:
  #       analysis = {
  #       'crypto_percentage': abc[abc['Symbol'].str.contains('USD', regex=True, na=False)]['percentage'].sum(),
  #       'stocks_percentage': abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)]['percentage'].sum(),
  #       'stocks_expected_return': abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)]['exp_cagr'].sum(),
  #       'crypto_expected_return': abc[abc['Symbol'].str.contains('USD', regex=True, na=False)]['exp_cagr'].sum(),
  #       'total_expected_return': abc['exp_cagr'].sum(),
  #       'total_purchase': abc['purchase'].sum()
  #   }
   return [abc.to_json(orient = 'records'), portfolio_analysis,stocks,crypto]


@app.route('/members', methods=['POST','GET'])
def get_data():
    global abc,portfolio_analysis
    global z
    # Retrieve the data from the request
    # print('executed')
    data = request.json
    print(data)
    port, amt, risk = build(**data[0]), data[1], data[2]
    print(port)

    # Process the data or perform any required calculations
    abc = final_portfolio(port, amt,risk)
    abc.drop(['period','std'], axis=1,inplace=True)
    
    portfolio_analysis = {
        'crypto_percentage': abc[abc['Symbol'].str.contains('USD', regex=True, na=False)]['percentage'].sum(),
        'stocks_percentage': abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)]['percentage'].sum(),
        'stocks_expected_return': abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)]['exp_cagr'].sum(),
        'crypto_expected_return': abc[abc['Symbol'].str.contains('USD', regex=True, na=False)]['exp_cagr'].sum(),
        'total_expected_return': abc['exp_cagr'].sum(),
        'total_purchase': abc['purchase'].sum()
    }
    new_port = build(fv=port['fv'],r=portfolio_analysis['total_expected_return'],pv=portfolio_analysis['total_purchase']
                     ,n=None)
    portfolio_analysis['future_value'] = new_port['fv']
    portfolio_analysis['years'] = new_port['n']
    print(abc)
    print(portfolio_analysis)
    z = abc[['Symbol','quantity']]
    insert_purchase_order(z)
    # Return the processed data as a JSON response
    stocks = abc[abc['Symbol'].str.contains('.NS', regex=True, na=False)].to_json(orient = 'records')
    crypto = abc[abc['Symbol'].str.contains('USD', regex=True, na=False)].to_json(orient = 'records')
    print(crypto)
    return jsonify([abc.to_json(orient = 'records'), portfolio_analysis])

@app.route('/portfolio',methods=['POST','GET'])
def fetch_active():
    connection = sqlite3.connect(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\test.db')
    # cursor = connection.cursor()
    
    query = f"SELECT * FROM active_table WHERE uid = '{user}'"
    query2 = f"SELECT * FROM user_info WHERE uid = '{user}'"
    df = pd.read_sql_query(query, connection)
    df2 = pd.read_sql_query(query2, connection)
    
    # print(df.to_json(orient = 'records'))
    analysis = {
       'Name' : df2['name'][0],
       'balance' : df2['balance'][0], 
        'invested_stocks': df[df['stock_name'].str.contains('.NS', regex=True, na=False)]['purchase'].sum(),
        'invested_crypto': df[df['stock_name'].str.contains('USD', regex=True, na=False)]['purchase'].sum(),
        'current_stocks': df[df['stock_name'].str.contains('.NS', regex=True, na=False)]['Total_amount'].sum(),
        'current_crypto': df[df['stock_name'].str.contains('USD', regex=True, na=False)]['Total_amount'].sum(),
        'invested': (df['purchase']*df['quantity']).sum(),
        'total_value' : df['Total_amount'].sum(),
        'total_PL' : df['PL'].sum()
    }
    analysis['stocks_percentage'] = analysis['current_stocks'] / analysis['total_value']
    analysis['crypto_percentage'] = analysis['current_crypto'] / analysis['total_value']
    print(analysis['crypto_percentage'],analysis['stocks_percentage'])

    analysis = json.dumps(analysis)
    
    connection.close()

    return jsonify([df.to_json(orient = 'records'),analysis])
    


def insert_purchase_order(data):
    connection = sqlite3.connect(r'C:\Users\Welcome\Desktop\fun\git\Richin\backend\test.db')
    cursor = connection.cursor()

    for index, row in data.iterrows():
        cursor.execute("INSERT INTO purchase_order (stock_name, quantity, uid) VALUES (?, ?, ?)",
                       (row['Symbol'], row['quantity'],user))

    connection.commit()


@app.route('/purchase',methods=['POST'])
def update_purchase_order():
  insert_purchase_order(z)


@app.route('/chart-data', methods=['POST','GET'])
def get_chart_data():
    data = {
        'crypto_expected_return': 0.20654986145302684,
        'crypto_percentage': 25.94217671400576,
        'stocks_expected_return': 0.20165659546851827,
        'stocks_percentage': 74.05782328599422,
        'total_expected_return': 0.4082064569215451,
        'total_purchase': 99714.11031647312
    }
    labels = ['Crypto Expected Return', 'Crypto Percentage', 'Stocks Expected Return', 'Stocks Percentage', 'Total Expected Return', 'Total Purchase']
    values = [data['crypto_expected_return'], data['crypto_percentage'], data['stocks_expected_return'], data['stocks_percentage'], data['total_expected_return'], data['total_purchase']]

    plt.bar(labels, values)
    plt.ylabel('Value')
    plt.title('Portfolio Analysis')

    # Save the chart image
    plt.savefig('chart.png')

    return 'Chart data generated'


if __name__ == "__main__":
    app.run(debug=True)




