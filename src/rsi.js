/**
 *	Relative Strength Index
 */
const { isNumber }	= require( './libs/LibCommon' );
const ema		= require( './ema' );


/**
 * 	@class	rsi
 */
class rsi
{
	constructor()
	{
	}

	/**
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nSize
	 *
	 * 	@ref
	 * 	https://zh.wikipedia.org/wiki/%E7%9B%B8%E5%B0%8D%E5%BC%B7%E5%BC%B1%E6%8C%87%E6%95%B8
	 */
	static calculate( arrData, nSize )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) || 0 === arrData.length )
				{
					return pfnReject( `invalid arrData, require an array with values.` );
				}
				if ( ! isNumber( nSize ) || nSize <= 0 )
				{
					return pfnReject( `invalid nSize, require a number with the value should greater than 0.` );
				}

				let fPrevClose	= undefined;
				let arrUps	= [];
				let arrDowns	= [];

				for ( let i = 0; i < arrData.length; i ++ )
				{
					let fClose = arrData[ i ];
					if ( ! isNumber( fClose ) || fClose < 0 )
					{
						if ( undefined !== fPrevClose )
						{
							fPrevClose = undefined;
						}
					}
					if ( undefined === fPrevClose )
					{
						fPrevClose = fClose;
					}

					//	...
					arrUps.push( this._upChange( fPrevClose, fClose ) );
					arrDowns.push( this._downChange( fPrevClose, fClose ) );
				}

				if ( ! Array.isArray( arrUps ) ||
					! Array.isArray( arrDowns ) ||
					0 === arrUps.length ||
					0 === arrDowns.length ||
					arrUps.length !== arrDowns.length )
				{
					return pfnR( Array( arrData.length ) );
				}

				//	...
				let arrEmaUps	= await ema.calculate( arrUps, nSize );
				let arrEmaDowns	= await ema.calculate( arrDowns, nSize );

				if ( ! Array.isArray( arrEmaUps ) ||
					! Array.isArray( arrEmaDowns ) ||
					0 === arrEmaUps.length ||
					0 === arrEmaDowns.length ||
					arrEmaUps.length !== arrEmaDowns.length )
				{
					return pfnR( Array( arrData.length ) );
				}

				let arrReturns	= [];
				for ( let i = 0; i < arrEmaUps.length; i ++ )
				{
					let fEmaUp	= arrEmaUps[ i ];
					let fEmaDown	= arrEmaDowns[ i ];
					let fRs		= fEmaUp / fEmaDown;
					let fRsi	= ( 1 - 1 / ( 1 + fRs ) ) * 100;

					//	...
					arrReturns.push( fRsi );
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


	static _upChange( fPrevClose, fClose )
	{
		//
		//	在价格上升的日子：
		//	U ＝ 是日收市价 － 昨日收市价
		//	D ＝ 0
		//
		//	任何情况下，U及D皆不可能为负数；若两天价格相同，则U及D皆等于零。
		//
		return fClose > fPrevClose ? fClose - fPrevClose : 0;
	}

	static _downChange( fPrevClose, fClose )
	{
		//
		//	在价格下跌的日子：
		//	U ＝ 0
		//	D ＝ 昨日收市价 － 是日收市价
		//
		//	任何情况下，U及D皆不可能为负数；若两天价格相同，则U及D皆等于零。
		//
		return fPrevClose > fClose ? fPrevClose - fClose : 0;
	}



}





/**
 *	@exports
 *	@type {rsi}
 */
module.exports	= rsi;