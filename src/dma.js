/**
 *	Dynamic Weighted Moving Average
 *	forked from npm package <moving-averages>
 */
const { isNumber }	= require( './libs/LibCommon' );


/**
 *	@class	dma
 */
class dma
{
	constructor()
	{
	}

	/**
	 * 	Dynamic Weighted Moving Average
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	fAlpha
	 *	@param	{?boolean}	bNoHead
	 *	@return {Promise<array>}
	 *
	 * 	@ref
	 * 	Dynamic weights: an array of weights
	 * 	https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
	 */
	static calculate( arrData, fAlpha, bNoHead )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `invalid arrData, require an array.` );
				}
				if ( ! isNumber( fAlpha ) )
				{
					return pfnReject( `invalid fAlpha, require a number.` );
				}

				//	...
				const nLength	= arrData.length;

				if ( fAlpha > 1 )
				{
					return pfnR( Array( nLength ) );
				}
				if ( 1 === fAlpha )
				{
					return pfnR( arrData.slice() );
				}

				//	...
				let arrReturns = [];
				let vElement;

				//	period `i`
				let i = 0;

				//	`s` is the value of the DWMA at any time period `i`
				let s = 0;

				//	Handles head
				for ( ; i < nLength; i ++ )
				{
					vElement = arrData[ i ];

					if ( isNumber( vElement ) )
					{
						arrReturns[ i ] = bNoHead ? 0 : vElement;

						//	...
						s = vElement;
						i ++;

						//	...
						break;
					}
				}

				//	...
				const o = 1 - fAlpha;

				//	Fixed alpha
				for ( ; i < nLength; i++ )
				{
					vElement = arrData[ i ];
					isNumber( vElement )
						? s = arrReturns[ i ] = fAlpha * vElement + o * s
						: arrReturns[ i ] = arrReturns[ i - 1 ];
				}

				//	...
				pfnR( arrReturns );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}
}




/**
 *	@exports
 *	@type {dma}
 */
module.exports	= dma;