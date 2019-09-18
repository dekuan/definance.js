/**
 *	@class	LibKDJ
 */
class LibKDJ
{
	constructor()
	{
	}

	/**
	 *	extract sub array by period for an array
	 *
	 *	@param	{array}		arrInputs	Array<number>, all members must be greater than 0
	 *	@param	{number}	nCurrentIndex	a zero based number indicate the point to the arrInputs, must be greater than or equal to 0
	 *	@param	{number}	nPeriod		size to subtract elements from the arrInputs for the calculation, must be greater than 0
	 *	@return {Promise<array|null>}
	 */
	extractSubArrayByPeriod( arrInputs, nCurrentIndex, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrInputs ) )
				{
					return pfnReject( `invalid arrInputs, must be an array.` );
				}
				if ( ! Number.isInteger( nCurrentIndex ) || nCurrentIndex < 0 || nCurrentIndex >= arrInputs.length )
				{
					return pfnReject( `invalid nCurrentIndex, nCurrentIndex must be greater than or equal to 0, and less than the length of arrInputs.` );
				}
				if ( ! Number.isInteger( nPeriod ) || nPeriod < 1 || nPeriod > arrInputs.length )
				{
					return pfnReject( `invalid nPeriod, nPeriod must be greater than 1.` );
				}
				if ( ( nCurrentIndex + 1 ) < nPeriod )
				{
					//return pfnReject( `invalid nCurrentIndex, nCurrentIndex not matched with nPeriod.` );
					return pfnR( null );
				}

				let arrCheckPositives	= arrInputs.filter( nElement => ! Number.isNaN( nElement ) && nElement > 0 );
				if ( ! Array.isArray( arrCheckPositives ) || arrCheckPositives.length !== arrInputs.length )
				{
					return pfnReject( `invalid arrInputs, all members must be greater than 0.` );
				}

				//	...
				let nBegin	= nCurrentIndex + 1 - nPeriod;
				let nEnd	= nCurrentIndex + 1;

				//	...
				pfnR( arrInputs.slice( nBegin, nEnd ) );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}


	/**
	 *	pick up the min value by period for an array
	 *
	 *	@param	{array}		arrInputs	Array<number>, all members must be greater than 0
	 *	@param	{number}	nCurrentIndex	a zero based number indicate the point to the arrInputs, must be greater than 0
	 *	@param	{number}	nPeriod		size to subtract elements from the arrInputs for the calculation.
	 *	@return {Promise<number|null>}
	 */
	getMinElementByPeriod( arrInputs, nCurrentIndex, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				let arrSubInputs = await this.extractSubArrayByPeriod( arrInputs, nCurrentIndex, nPeriod );
				if ( ! Array.isArray( arrSubInputs ) )
				{
					// return pfnReject( `failed to extract sub array by period.` );
					return pfnR( null );
				}

				//	...
				let nValue = Math.min( ... arrSubInputs );
				pfnR( nValue );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 *	pick up the max value by period for an array
	 *
	 *	@param	{array}		arrInputs	Array<number>, all members must be greater than 0
	 *	@param	{number}	nCurrentIndex	a zero based number indicate the point to the arrInputs, must be greater than 0
	 *	@param	{number}	nPeriod		size to subtract elements from the arrInputs for the calculation.
	 *	@return {Promise<number|null>}
	 */
	getMaxElementByPeriod( arrInputs, nCurrentIndex, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				let arrSubInputs = await this.extractSubArrayByPeriod( arrInputs, nCurrentIndex, nPeriod );
				if ( ! Array.isArray( arrSubInputs ) )
				{
					// return pfnReject( `failed to extract sub array by period.` );
					return pfnR( null );
				}

				//	...
				let nValue = Math.max( ... arrSubInputs );
				pfnR( nValue );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
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
	 *
	 * 	@document
	 * 	https://zh.wikipedia.org/wiki/%E9%9A%8F%E6%9C%BA%E6%8C%87%E6%A0%87
	 */
	calculateKDJ( arrClose, arrLow, arrHigh, nPeriod, nKSmaPeriod, nDSmaPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrClose ) )
				{
					return pfnReject( `invalid arrClose, must be an array.` );
				}
				if ( ! Array.isArray( arrLow ) )
				{
					return pfnReject( `invalid arrLow, must be an array.` );
				}
				if ( ! Array.isArray( arrHigh ) )
				{
					return pfnReject( `invalid arrHigh, must be an array.` );
				}
				if ( ! Number.isInteger( nPeriod ) || nPeriod < 1 )
				{
					return pfnReject( `invalid nPeriod, must be greater than 1.` );
				}
				if ( ! Number.isInteger( nKSmaPeriod ) || nKSmaPeriod < 1 )
				{
					return pfnReject( `invalid nKSmaPeriod, must be greater than 1.` );
				}
				if ( ! Number.isInteger( nDSmaPeriod ) || nDSmaPeriod < 1 )
				{
					return pfnReject( `invalid nDSmaPeriod, must be greater than 1.` );
				}

				//	...
				const fAlpha	= 1 / 3;

				//	...
				let arrRsv	= [];
				let arrK	= [];
				let arrD	= [];
				let arrJ	= [];
				let arrKs	= [];
				let arrDs	= [];

				for ( let i = 0; i < arrClose.length; i ++ )
				{
					//
					//	9日RSV =（ C － L9 ）÷（ H9 － L9 ）× 100
					//	C  为第 9 日的收盘价
					// 	L9 为 9 日内的最低价
					// 	H9 为 9 日内的最高价
					//
					let fRsvN	= null;
					let fKN		= null;
					let fDN		= null;
					let fJN		= null;
					let fSmoothK	= null;
					let fSmoothD	= null;

					let nCloseN	= arrClose[ i ];
					let nLowestN	= await this.getMinElementByPeriod( arrLow, i, nPeriod );
					let nHighestN	= await this.getMaxElementByPeriod( arrHigh, i, nPeriod );

					if ( null !== nCloseN && null !== nLowestN && null !== nHighestN )
					{
						fRsvN		= ( ( nCloseN - nLowestN ) / ( nHighestN - nLowestN ) ) * 100;
						let fKN_1	= ( null === arrK[ i - 1 ] ? 50 : arrK[ i - 1 ] );
						let fDN_1	= ( null === arrD[ i - 1 ] ? 50 : arrD[ i - 1 ] );

						//	K, D, J
						fKN	= fAlpha * fRsvN + ( 1 - fAlpha ) * fKN_1;
						fDN	= fAlpha * fKN + ( 1 - fAlpha ) * fDN_1;
						fJN	= 3 * fKN - 2 * fDN;

						//
						//	%K 值是 RSV 值的 {nKSmaPeriod} 日指数平滑移动平均
						//	%D 值是 K 值的 {nDSmaPeriod} 日指数平滑移动平均
						//
						let nRsvSumInPastKSmaPeriod	= fRsvN + arrRsv.slice( -1 * ( nKSmaPeriod - 1 ) ).filter( nElement => null !== nElement ).reduce( ( a, b ) => a + b, 0 );
						let nKSumInPastDSmaPeriod	= fKN + arrK.slice( -1 * ( nDSmaPeriod - 1 ) ).filter( nElement => null !== nElement ).reduce( ( a, b ) => a + b, 0 );

						//	...
						fSmoothK	= nRsvSumInPastKSmaPeriod / nKSmaPeriod;
						fSmoothD	= nKSumInPastDSmaPeriod / nDSmaPeriod;
					}

					//	...
					arrRsv.push( fRsvN );
					arrK.push( fKN );
					arrD.push( fDN );
					arrJ.push( fJN );
					arrKs.push( fSmoothK );
					arrDs.push( fSmoothD );
				}

				pfnR({
					K	: arrK,
					D	: arrD,
					J	: arrJ,
					Ks	: arrKs,
					Ds	: arrDs,
				});
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}
}





/**
 *	@type {LibKDJ}
 */
module.exports	= LibKDJ;