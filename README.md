# definance

Financial utilities for calculating KDJ, MACD, RSI, DMI indicators by DeKuan, Inc.


## Install

```
$ npm install definance.js
```

## Testing

```
mocha
```


## Usage

### KDJ


```js
const { kdj }       = require( 'definance.js' );

//  Testing data
const g_oSource     = {
	close	: [ 10201.70, 10283.60, 10285.10, 10250.24, 10215.26, 10206.41, 10224.39, 10221.11, 10194.05, 10189.30, 10185.97, 10200.70, 10170.51, 10159.26, 10170.10, 10160.63, 10216.85, 10184.95, 10213.97, 10198.74, 10253.68, 10251.56 ],
	low 	: [ 10118.03, 10201.60, 10275.00, 10230.00, 10174.20, 10194.94, 10201.94, 10199.22, 10192.00, 10160.01, 10178.25, 10185.97, 10162.75, 10135.12, 10159.26, 10155.48, 10150.00, 10176.22, 10172.85, 10197.20, 10197.35, 10227.00 ],
	high	: [ 10218.08, 10330.00, 10310.00, 10287.54, 10260.19, 10236.69, 10232.20, 10227.88, 10227.50, 10212.50, 10200.00, 10212.90, 10206.38, 10170.58, 10181.58, 10175.00, 10229.08, 10245.27, 10218.48, 10222.49, 10270.26, 10263.15 ],
};

//  Array.<Number> array of closing prices.
const arrClose      = g_oSource.close;

//  Array.<Number> array of low prices.
const arrLow        = g_oSource.low;

//  Array.<Number> array of high prices.
const arrHigh       = g_oSource.high;

//  the size of time periods to get the highest / lowest prices. Defaults to 9.
const nPeriod       = 9;

//  the time periods to calculate the moving average for %K. Defaults to 3
const nKSmaPeriod   = 3;

//  the time periods to calculate the moving average for %D. Defaults to 3
const nDSmaPeriod   = 3;

//  will return a {Promise<{ K: Array, D: Array, J: Array, Ks: Array, Ds: Array}>}
kdj( arrClose, arrLow, arrHigh, nPeriod, nKSmaPeriod, nDSmaPeriod ).then( oValues =>
{
	console.log( oValues );

}).catch( err =>
{
	console.error( err );
});
```

will outputs

```
{ K:
   [ null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     45.28785519963499,
     35.93537857280196,
     29.72619255565715,
     30.4528677520216,
     23.795623154305733,
     23.786035534001563,
     27.868069836841446,
     27.745739241521882,
     47.49176712880241,
     46.74061521705305,
     55.02181126438695,
     55.93374193234791,
     66.53290851333185,
     73.0761050589099 ],
  D:
   [ null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     48.429285066545,
     44.26464956863066,
     39.418497230972825,
     36.42995407132241,
     32.218510432316855,
     29.40768546621176,
     28.89448025642166,
     28.5115665847884,
     34.838300099459744,
     38.80573847199085,
     44.21109606945622,
     48.11864469042012,
     54.2567326313907,
     60.5298567738971 ],
  J:
   [ null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     39.004995465814986,
     19.27683658114455,
     10.341583205025799,
     18.49869511341997,
     6.949848598283495,
     12.542735669581162,
     25.815248997681024,
     26.21408455498885,
     72.79870118748775,
     62.61036870717743,
     76.64324165424841,
     71.56393641620348,
     91.08526027721415,
     98.16860162893552 ],
  Ks:
   [ null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     11.954521866301654,
     17.697996972680283,
     23.467270479802792,
     22.148154661751306,
     19.898390874997343,
     22.05140413233924,
     23.426710898262808,
     29.10002559559906,
     50.172346465589136,
     53.24107078260018,
     67.93544588532417,
     58.19337267362629,
     72.35768276754142,
     77.21711436454517 ],
  Ds:
   [ null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     15.095951733211663,
     27.07441125747898,
     36.9831421093647,
     32.038146293493575,
     27.991561153994827,
     26.01150881344297,
     25.149909508382915,
     26.466614870788295,
     34.36852540238858,
     40.65937386245911,
     49.7513978700808,
     52.56538947126264,
     59.162820570022234,
     65.18091850152989 ] }

```


### Return values

#### K

#### D


#### J


#### Ks

the smooth value of K calculated by the Simple Moving Average with the time period {nKSmaPeriod}.

#### Ds

the smooth value of D calculated by the Simple Moving Average with the time period {nDSmaPeriod}.



## References

https://en.wikipedia.org/wiki/Stochastic_oscillator
