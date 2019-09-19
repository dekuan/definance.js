/**
 *	Weighted Moving Average
 *	forked from npm package <moving-averages>
 */
const { isNumber }	= require( './libs/LibCommon' );


/**
 *	@class	wma
 */
class wma
{
	constructor()
	{
	}

	/**
	 * 	Weighted Moving Average
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nSize
	 *	@return {Promise<array>}
	 *
	 * 	@ref
	 * 	https://en.wikipedia.org/wiki/Moving_average
	 */
	static calculator( arrData, nSize )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `invalid arrData, require an array.` );
				}
				if ( ! isNumber( nSize ) )
				{
					return pfnReject( `invalid nSize, require a number.` );
				}

				//	...
				const nLength = arrData.length;

				if ( nSize <= 1 )
				{
					return pfnR( arrData.slice() );
				}
				if ( nSize > nLength )
				{
					return pfnR( Array( nLength ) );
				}

				//	...
				const nDenominator	= nSize * (nSize + 1) / 2;
				const nPrepare		= nSize - 1;

				let arrReturns	= [];
				let nSum	= 0;
				let nNumerator	= 0;
				let vElement	= 0;
				let i		= 0;
				let nReal	= -1;

				for ( ; i < nPrepare; i ++ )
				{
					vElement = arrData[ i ];

					if ( isNumber( vElement ) )
					{
						nSum += vElement;
						nNumerator += ( i + 1 ) * vElement;
					}
				}

				for ( ; i < nLength; i ++, nReal ++ )
				{
					vElement = arrData[ i ];

					if ( isNumber( vElement ) )
					{
						nSum += vElement;
						nNumerator += nSize * vElement;
					}

					if ( nReal >= 0 && isNumber( arrData[ nReal ] ) )
					{
						nSum -= arrData[ nReal ];
					}

					//	...
					arrReturns[ i ] = nNumerator / nDenominator;
					nNumerator -= nSum;
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
 *	@type {wma}
 */
module.exports	= wma;