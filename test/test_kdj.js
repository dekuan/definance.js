const assert		= require( 'assert' );
const { DeUtilsCore }	= require( '../src/deutils.core' );



describe( 'DeUtilsCore.test', () =>
{
	it( 'isNumeric', () =>
	{
		assert.equal( true, DeUtilsCore.isNumeric( 1 ) );
		assert.equal( false, DeUtilsCore.isNumeric( '11111112323' ) );
		assert.equal( false, DeUtilsCore.isNumeric( 'xxx' ) );
	});
	it( 'isString', () =>
	{
		assert.equal( false, DeUtilsCore.isString( 1 ) );
		assert.equal( false, DeUtilsCore.isString( null ) );
		assert.equal( false, DeUtilsCore.isString( undefined ) );
		assert.equal( false, DeUtilsCore.isString( NaN ) );
		assert.equal( true, DeUtilsCore.isString( '11111112323' ) );
		assert.equal( true, DeUtilsCore.isString( 'xxx' ) );
	});
	it( 'isExistingString', () =>
	{
		assert.equal( false, DeUtilsCore.isExistingString( 1 ) );
		assert.equal( false, DeUtilsCore.isExistingString( null ) );
		assert.equal( false, DeUtilsCore.isExistingString( undefined ) );
		assert.equal( false, DeUtilsCore.isExistingString( NaN ) );
		assert.equal( false, DeUtilsCore.isExistingString( '' ) );
		assert.equal( true, DeUtilsCore.isExistingString( '11111112323' ) );
		assert.equal( true, DeUtilsCore.isExistingString( 'xxx' ) );
	});
	it( 'isFunction', () =>
	{
		assert.equal( false, DeUtilsCore.isFunction( 1 ) );
		assert.equal( false, DeUtilsCore.isFunction( null ) );
		assert.equal( false, DeUtilsCore.isFunction( undefined ) );
		assert.equal( false, DeUtilsCore.isFunction( NaN ) );
		assert.equal( false, DeUtilsCore.isFunction( '' ) );
		assert.equal( true, DeUtilsCore.isFunction( function() {} ) );
		assert.equal( true, DeUtilsCore.isFunction( DeUtilsCore.isFunction ) );
	});
	it( 'isPlainObject', () =>
	{
		assert.equal( false, DeUtilsCore.isPlainObject( 1 ) );
		assert.equal( false, DeUtilsCore.isPlainObject( null ) );
		assert.equal( false, DeUtilsCore.isPlainObject( undefined ) );
		assert.equal( false, DeUtilsCore.isPlainObject( NaN ) );
		assert.equal( false, DeUtilsCore.isPlainObject( '' ) );
		assert.equal( false, DeUtilsCore.isPlainObject( DeUtilsCore.isFunction ) );
		assert.equal( true, DeUtilsCore.isPlainObject( {} ) );
		assert.equal( true, DeUtilsCore.isPlainObject( { 'k' : 1 } ) );
		assert.equal( true, DeUtilsCore.isPlainObject( [] ) );
	});
	it( 'isPlainObjectWithKeys', () =>
	{
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( 1 ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( null ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( undefined ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( NaN ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( '' ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( DeUtilsCore.isFunction ) );
		assert.equal( false, DeUtilsCore.isPlainObjectWithKeys( [] ) );
		assert.equal( true, DeUtilsCore.isPlainObjectWithKeys( {} ) );
		assert.equal( true, DeUtilsCore.isPlainObjectWithKeys( { 'k' : 1 }, 'k' ) );
	});

	it( 'isValidChinaPhoneNumber', () =>
	{
		assert.equal( true, DeUtilsCore.isValidChinaPhoneNumber( '18811009090' ) );
		assert.equal( false, DeUtilsCore.isValidChinaPhoneNumber( '28811009090' ) );
		assert.equal( false, DeUtilsCore.isValidChinaPhoneNumber( '12811009090' ) );
	});
});