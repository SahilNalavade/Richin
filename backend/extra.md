const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//set port and listen for our requests

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}.`);
});

.........................
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
from flask import Flask, jsonify, request
app = Flask(__name__)

portfolio_analysis = {}
ex_rate = 81
years = 7

df = pd.read_csv('final_data6.csv')
cry = pd.read_csv('crypto_final')

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


def final_portfolio(port,amt):
  global portfo
  data = build(**port)
  tickers = bucket(r = data['r'])
  start = "2015-01-01"
  df = yf.download(tickers, start=start)
  data = df['Adj Close']
  log_returns = np.log(data/data.shift())
  a = new[new['SYMBOL'].isin(tickers)][['SYMBOL','cagr','price','period','marketCap']].rename({'SYMBOL': 'Symbol',}, axis='columns')
  b = cry[cry['Symbol'].isin(tickers)][['Symbol','cagr','price','period','marketCap']]
  ab = pd.concat([a,b])
  mc = dict(zip(ab['Symbol'],(ab['period']**3)*ab['marketCap']**2))
  for m in mc.keys():
    if '.NS' not in m:
      mc[m] = mc[m]*0.3
  
  n = 100*len(tickers)
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
  abc['exp_cagr'] = abc['cagr'] *(abc['purchase']/abc['purchase'].sum()) 
  abc['exp_returns'] = abc['cagr'] * abc['purchase']
  abc['percentage'] = (abc['purchase']/abc['purchase'].sum())*100
  return abc


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
  
def bucket(n=15,cryp_split=0.3,r=12):
  r /= 100
  rmin = r*0.7 
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


port = {
    'pv':100, 
    'fv': 400, 'r':None, 'n':8
}


@app.route('/data', methods=['GET','POST'])
def get_data():
    
    # Retrieve the data from the request
    data = request.json
    port,amt = data[0],data[1]
    print(data)
    
    # Process the data or perform any required calculations
  
    
    abc = final_portfolio(port,amt) 
    portfolio_analysis = {}
    portfolio_analysis['crypto_percentage'] = abc[abc['Symbol'].str.contains('USD', regex= True, na=False)]['percentage'].sum()
    portfolio_analysis['stocks_percentage'] = abc[abc['Symbol'].str.contains('.NS', regex= True, na=False)]['percentage'].sum()
    portfolio_analysis['stocks_expected_return'] = abc[abc['Symbol'].str.contains('.NS', regex= True, na=False)]['exp_cagr'].sum()
    portfolio_analysis['crypto_expected_return'] = abc[abc['Symbol'].str.contains('USD', regex= True, na=False)]['exp_cagr'].sum()
    portfolio_analysis['total_expected_return'] = abc['exp_cagr'].sum()
    portfolio_analysis['total_purchase'] = abc['purchase'].sum()

    print(abc)
    # Return the processed data as a JSON response
    return [abc.to_json(orient = 'records'),portfolio_analysis]
    
# spread operator
app.run()
