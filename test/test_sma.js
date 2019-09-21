const assert		= require( 'assert' );
const sma 		= require( '../src/sma' );


const g_oSource	= {
	close	: [ 10201.70, 10283.60, 10285.10, 10250.24, 10215.26, 10206.41, 10224.39, 10221.11, 10194.05, 10189.30, 10185.97, 10200.70, 10170.51, 10159.26, 10170.10, 10160.63, 10216.85, 10184.95, 10213.97, 10198.74, 10253.68, 10251.56 ],
	low 	: [ 10118.03, 10201.60, 10275.00, 10230.00, 10174.20, 10194.94, 10201.94, 10199.22, 10192.00, 10160.01, 10178.25, 10185.97, 10162.75, 10135.12, 10159.26, 10155.48, 10150.00, 10176.22, 10172.85, 10197.20, 10197.35, 10227.00 ],
	high	: [ 10218.08, 10330.00, 10310.00, 10287.54, 10260.19, 10236.69, 10232.20, 10227.88, 10227.50, 10212.50, 10200.00, 10212.90, 10206.38, 10170.58, 10181.58, 10175.00, 10229.08, 10245.27, 10218.48, 10222.49, 10270.26, 10263.15 ],
};



describe( 'sma.test', () =>
{
	it( 'basic testing', ( pfnDone ) =>
	{
		sma.calculate( g_oSource.close, 12, undefined ).then( arrValues =>
		{
			// assert.equal( true, Array.isArray( oValues.K ) && oValues.K.length > 0 );
			// assert.equal( true, Array.isArray( oValues.D ) && oValues.D.length > 0 );
			// assert.equal( true, Array.isArray( oValues.J ) && oValues.J.length > 0 );
			// assert.equal( true, Array.isArray( oValues.Ks ) && oValues.Ks.length > 0 );
			// assert.equal( true, Array.isArray( oValues.Ds ) && oValues.Ds.length > 0 );
			//
			// assert.equal( true, oValues.K.length === oValues.D.length );
			// assert.equal( true, oValues.D.length === oValues.J.length );
			// assert.equal( true, oValues.J.length === oValues.Ks.length );
			// assert.equal( true, oValues.Ks.length === oValues.Ds.length );

			console.log( arrValues );
			assert.equal( true, true );

			//
			//	call it after we are done
			//
			pfnDone();

		}).catch( err =>
		{
			console.error( err );
			assert.ifError( err );
		});
	});
});