/**
 *	Simple Moving Average
 *	forked from npm package <moving-averages>
 */
const { isNumber }	= require( './libs/LibCommon' );


/**
 *	@class	ma
 */
class ma
{
	constructor()
	{
	}

	/**
	 *	Simple Moving Average
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nSize
	 *	@return {Promise<array>}
	 */
	static calculate( arrData, nSize )
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

				if ( ! nSize )
				{
					return pfnR( [ arrData.reduce( ( a, b ) => a + b, 0 ) / nLength ] );
				}

				if ( nSize <= 1 )
				{
					return pfnR( arrData.slice() );
				}

				if ( nSize > nLength )
				{
					return pfnR( Array( nLength ) );
				}

				//	...
				const nPrepare	= nSize - 1;
				let arrReturns	= [];
				let nSum 	= 0;
				let i		= 0;
				let nCounter	= 0;
				let vElement;

				for (; i < nLength && nCounter < nPrepare; i ++ )
				{
					vElement = arrData[ i ];
					if ( isNumber( vElement ) )
					{
						nSum += vElement;
						nCounter ++;
					}
				}

				for ( ; i < nLength; i ++ )
				{
					vElement = arrData[ i ];

					if ( isNumber( vElement ) )
					{
						nSum += vElement;
					}

					if ( isNumber( arrData[ i - nSize ] ) )
					{
						nSum -= arrData[ i - nSize ];
					}

					//	...
					arrReturns[ i ] = nSum / nSize;
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
 *	@type {ma}
 */
module.exports	= ma;