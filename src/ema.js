/**
 *	Exponential Moving Average
 *	forked from npm package <moving-averages>
 */
const dma	= require( './dma' );




/**
 *	@class	ema
 */
class ema
{
	constructor()
	{
	}

	/**
	 * 	Exponential Moving Average
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nSize
	 *	@return {Promise<array>}
	 *
	 * 	@ref
	 * 	Exponential moving average
	 * 	https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
	 */
	static calculate( arrData, nSize )
	{
		return dma.calculate( arrData, 2 / ( nSize + 1 ), undefined );
	}
}




/**
 *	@exports
 *	@type {ema}
 */
module.exports	= ema;