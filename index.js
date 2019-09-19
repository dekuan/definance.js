const kdj	= require( './src/kdj' );
const ma	= require( './src/ma' );
const dma	= require( './src/dma' );
const ema	= require( './src/ema' );
const sma	= require( './src/sma' );
const wma	= require( './src/wma' );




/**
 *	@exports
 */
module.exports	=
{
	kdj	: kdj.calculator,
	ma	: ma.calculator,
	dma	: dma.calculator,
	ema	: ema.calculator,
	sma	: sma.calculator,
	wma	: wma.calculator,
};