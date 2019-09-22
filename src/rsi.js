/**
 *	Relative Strength Index
 */
const Decimal		= require( 'decimal.js' );
const { isNumber }	= require( './libs/LibCommon' );
const { isString }	= require( './libs/LibCommon' );





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
	 *	@param	{number}	nPeriod
	 *
	 * 	@ref
	 * 	https://zh.wikipedia.org/wiki/%E7%9B%B8%E5%B0%8D%E5%BC%B7%E5%BC%B1%E6%8C%87%E6%95%B8
	 */
	static calculate( arrData, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `call calculate with invalid arrData, require an array with numeric data` );
				}
				if ( ! isNumber( nPeriod ) || nPeriod <= 0 )
				{
					return pfnReject( `call calculate with invalid nPeriod, require a number with its value should greater than 0.` );
				}

				if ( 0 === arrData.length )
				{
					return pfnR( [] );
				}

				//	...
				let arrLossAndGain	= await this._lossOrGain( arrData );
				let arrAvgGains		= await this._averageGain( arrLossAndGain, nPeriod );
				let arrAvgLosses	= await this._averageLoss( arrLossAndGain, nPeriod );
				let arrRs		= await this._calculateRs( arrAvgGains, arrAvgLosses );
				let arrRsi		= await this._calculateRsi( arrAvgLosses, arrRs );

				//	...
				pfnR( arrRsi );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 *
	 *	@param	{array}		arrData
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _lossOrGain( arrData )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `call _lossOrGain with invalid arrData, require an array with data.` );
				}

				let arrResults	= [];
				for ( let i = 0; i < arrData.length; i ++ )
				{
					let oVal = arrData[ i ];
					if ( i > 0 )
					{
						const fPrevVal	= arrData[ i - 1 ];
						const fChange	= Decimal.sub( oVal, fPrevVal );
						arrResults.push
						({
							value	: oVal,
							change	: fChange.toNumber(),
							gain	: ( fChange.toNumber() > 0 ) ? fChange.toNumber() : 0,
							loss	: ( fChange.toNumber() < 0 ) ? fChange.abs().toNumber() : 0
						});
					}
					else
					{
						arrResults.push
						({
							value	: oVal,
							gain	: 0,
							loss	: 0,
							change	: 0
						});
					}
				}

				//	...
				pfnR( arrResults );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 *	get average gain
	 *
	 *	@param	{array}		arrLossAndGain
	 *	@param	{number}	nPeriod
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _averageGain( arrLossAndGain, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrLossAndGain ) )
				{
					return pfnReject( `call _averageGain with invalid arrData, require an array.` );
				}
				if ( ! isNumber( nPeriod ) || nPeriod <= 0 )
				{
					return pfnReject( `call _averageGain with invalid nPeriod, require a number with its value greater than 0.` );
				}

				//	...
				let arrAvgGains	= await this._getAverages( arrLossAndGain, 'gain', nPeriod );
				pfnR( arrAvgGains );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 *	get average loss
	 *
	 *	@param	{array}		arrData
	 *	@param	{number}	nPeriod
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _averageLoss( arrData, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `call _averageLoss with invalid arrData, require an array.` );
				}
				if ( ! isNumber( nPeriod ) || nPeriod <= 0 )
				{
					return pfnReject( `call _averageLoss with invalid nPeriod, require a number with its value greater than 0.` );
				}

				//	...
				let arrAvgLosses = await this._getAverages( arrData, 'loss', nPeriod );
				pfnR( arrAvgLosses );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}


	/**
	 *	get averages by key
	 *
	 *	@param	{array}		arrData
	 *	@param	{string}	sKey
	 *	@param	{number}	nPeriod
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _getAverages( arrData, sKey, nPeriod )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrData ) )
				{
					return pfnReject( `call _getAverages with invalid arrData, require an array.` );
				}
				if ( ! isString( sKey ) || ( 'gain' !== sKey && 'loss' !== sKey ) )
				{
					return pfnReject( `call _getAverages with invalid sKey, require a string( 'gain', 'loss' ).` );
				}
				if ( ! isNumber( nPeriod ) || nPeriod <= 0 )
				{
					return pfnReject( `call _getAverages with invalid nPeriod, require a number with its value greater than 0.` );
				}

				//	...
				let fSum	= new Decimal( 0 );
				let fAvg	= 0;
				let fOverallAvg	= 0;
				let arrResults	= [];

				for ( let i = 0; i < arrData.length; i ++ )
				{
					let fVal = arrData[ i ][ sKey ];
					if ( i < nPeriod )
					{
						fSum = fSum.plus( fVal );
					}
					else if ( i === nPeriod )
					{
						fSum = fSum.plus( fVal );
						fAvg = fSum.dividedBy( nPeriod );
						arrResults[ i ] = fAvg.toNumber();
					}
					else
					{
						let fLastOne	= arrResults[ i - 1 ];
						fOverallAvg	= Decimal.mul( fLastOne, ( nPeriod - 1 ) )
								.plus( fVal )
								.dividedBy( nPeriod );
						arrResults[ i ] = fOverallAvg.toNumber();
					}
				}

				//	...
				pfnR( arrResults );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 * 	calculate Rs
	 *
	 *	@param	{array}	arrAvgGains
	 *	@param	{array}	arrAvgLosses
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _calculateRs( arrAvgGains, arrAvgLosses )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrAvgGains ) )
				{
					return pfnReject( `call _calculateRsi with invalid arrAvgGains, require an array.` );
				}
				if ( ! Array.isArray( arrAvgLosses ) )
				{
					return pfnReject( `call _calculateRsi with invalid arrAvgLosses, require an array.` );
				}
				if ( arrAvgGains.length !== arrAvgLosses.length )
				{
					return pfnReject( `call _calculateRsi with invalid arrAvgLosses and arrAvgLosses, the length not matched.` );
				}

				//	...
				let arrRs = [];
				for ( let i = 0; i < arrAvgGains.length; i ++ )
				{
					let fAvgGain	= arrAvgGains[ i ];
					let fAvgLoss	= arrAvgLosses[ i ];
					if ( fAvgGain !== undefined && fAvgLoss !== undefined &&
						! isNaN( parseFloat( fAvgGain ) ) && ! isNaN( parseFloat( fAvgLoss ) ) )
					{
						arrRs[ i ] = Decimal.div( fAvgGain, fAvgLoss ).toNumber();
					}
				}

				//	...
				pfnR( arrRs );
			}
			catch ( vException )
			{
				pfnReject( vException );
			}
		});
	}

	/**
	 *	calculate Rsi
	 *
	 *	@param	{array}	arrAvgLosses
	 *	@param	{array}	arrRs
	 *	@return {Promise<array>}
	 *	@private
	 */
	static _calculateRsi( arrAvgLosses, arrRs )
	{
		return new Promise( async ( pfnR, pfnReject ) =>
		{
			try
			{
				if ( ! Array.isArray( arrAvgLosses ) )
				{
					return pfnReject( `call _calculateRsi with invalid arrAvgLosses, require an array.` );
				}
				if ( ! Array.isArray( arrRs ) )
				{
					return pfnReject( `call _calculateRsi with invalid arrRs, require an array.` );
				}
				if ( arrAvgLosses.length !== arrRs.length )
				{
					return pfnReject( `call _calculateRsi with invalid arrAvgLosses and arrRs, the length not matched.` );
				}

				//	...
				let arrRsi	= [];
				for ( let i = 0; i < arrAvgLosses.length; i ++ )
				{
					let fAvgLoss	= arrAvgLosses[ i ];
					let fRs		= arrRs[ i ];
					let fRsi	= undefined;

					if ( fAvgLoss )
					{
						fRsi = Decimal.sub( 100, Decimal.div( 100, Decimal.add( 1, fRs ) ) ).toNumber();
					}
					else if ( undefined !== fRs )
					{
						fRsi = 100;
					}

					//	...
					arrRsi[ i ] = fRsi;
				}

				//	...
				pfnR( arrRsi );
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
 *	@type {rsi}
 */
module.exports	= rsi;