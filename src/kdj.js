const LibKDJ	= require( './libs/LibKDJ' );




/**
 *	Library
 */
class kdj
{
	constructor()
	{
	}

	/**
	 *	calculate KDJ
	 *
	 *	@param	{array}		arrClose	- Array.<Number> array of closing prices.
	 *	@param	{array}		arrLow		- Array.<Number> array of low prices.
	 *	@param	{array}		arrHigh		- Array.<Number> array of high prices.
	 *	@param	{number}	nPeriod		- the size of time periods to get the highest / lowest prices. Defaults to 9.
	 *	@param	{number}	nKSmaPeriod	- the time periods to calculate the moving average for %K. Defaults to 3
	 *	@param	{number}	nDSmaPeriod	- the time periods to calculate the moving average for %D. Defaults to 3
	 *	@return {Promise<{ K: Array, D: Array, J: Array, Ks: Array, Ds: Array}>}
	 */
	static calculate( arrClose, arrLow, arrHigh, nPeriod, nKSmaPeriod, nDSmaPeriod )
	{
		//
		//	try to fix parameters with the default values if needed.
		//
		nPeriod		= ( undefined === nPeriod ) ? 9 : nPeriod;
		nKSmaPeriod	= ( undefined === nKSmaPeriod ) ? 3 : nKSmaPeriod;
		nDSmaPeriod	= ( undefined === nDSmaPeriod ) ? 3 : nDSmaPeriod;

		//	...
		return new LibKDJ().calculateKDJ( arrClose, arrLow, arrHigh, nPeriod, nKSmaPeriod, nDSmaPeriod );
	}
}



/**
 *	exports
 */
module.exports	= kdj;