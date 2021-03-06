/**
 *	Smoothed Moving Average
 *	forked from npm package <moving-averages>
 */
const dma	= require( './dma' );



/**
 *	@class	sma
 */
class sma
{
	constructor()
	{
	}

	/**
	 * 	Smoothed Moving Average
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nSize
	 *	@param	{number}	nTimes
	 *	@return {Promise<array>}
	 */
	static calculator( arrData, nSize, nTimes )
	{
		if ( undefined === nTimes )
		{
			nTimes = 1;
		}

		return dma.calculator( arrData, nTimes / nSize, true );
	}
}




/**
 *	@exports
 *	@type {sma}
 */
module.exports	= sma;