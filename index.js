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
	kdj	: kdj.calculate,
	ma	: ma.calculate,
	dma	: dma.calculate,
	ema	: ema.calculate,
	sma	: sma.calculate,
	wma	: wma.calculate,
};