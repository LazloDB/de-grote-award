/**
 * @author TatumCreative (Greg Tatum) / http://gregtatum.com/
 */

var constants = {

	combine: {

		'THREE.MultiplyOperation': THREE.MultiplyOperation,
		'THREE.MixOperation': THREE.MixOperation,
		'THREE.AddOperation': THREE.AddOperation

	},
	side: {

		'THREE.FrontSide': THREE.FrontSide,
		'THREE.BackSide': THREE.BackSide,
		'THREE.DoubleSide': THREE.DoubleSide

	},

	colors: {

		'THREE.NoColors': THREE.NoColors,
		'THREE.VertexColors': THREE.VertexColors

	},

	blendingMode: {

		'THREE.NoBlending': THREE.NoBlending,
		'THREE.NormalBlending': THREE.NormalBlending,
		'THREE.AdditiveBlending': THREE.AdditiveBlending,
		'THREE.SubtractiveBlending': THREE.SubtractiveBlending,
		'THREE.MultiplyBlending': THREE.MultiplyBlending,
		'THREE.CustomBlending': THREE.CustomBlending

	},

	equations: {

		'THREE.AddEquation': THREE.AddEquation,
		'THREE.SubtractEquation': THREE.SubtractEquation,
		'THREE.ReverseSubtractEquation': THREE.ReverseSubtractEquation

	},

	destinationFactors: {

		'THREE.ZeroFactor': THREE.ZeroFactor,
		'THREE.OneFactor': THREE.OneFactor,
		'THREE.SrcColorFactor': THREE.SrcColorFactor,
		'THREE.OneMinusSrcColorFactor': THREE.OneMinusSrcColorFactor,
		'THREE.SrcAlphaFactor': THREE.SrcAlphaFactor,
		'THREE.OneMinusSrcAlphaFactor': THREE.OneMinusSrcAlphaFactor,
		'THREE.DstAlphaFactor': THREE.DstAlphaFactor,
		'THREE.OneMinusDstAlphaFactor': THREE.OneMinusDstAlphaFactor

	},

	sourceFactors: {

		'THREE.DstColorFactor': THREE.DstColorFactor,
		'THREE.OneMinusDstColorFactor': THREE.OneMinusDstColorFactor,
		'THREE.SrcAlphaSaturateFactor': THREE.SrcAlphaSaturateFactor

	}

};

function getObjectsKeys( obj ) {

	var keys = [];

	for ( var key in obj ) {

		if ( obj.hasOwnProperty( key ) ) {

			keys.push( key );

		}

	}

	return keys;

}

function handleColorChange( color ) {

	return function ( value ) {

		if ( typeof value === 'string' ) {

			value = value.replace( '#', '0x' );

		}

		color.setHex( value );

	};

}

function needsUpdate( material, geometry ) {

	return function () {

		material.vertexColors = parseInt( material.vertexColors ); //Ensure number
		material.side = parseInt( material.side ); //Ensure number
		material.needsUpdate = true;
		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.normal.needsUpdate = true;
		geometry.attributes.color.needsUpdate = true;

	};

}

function updateTexture( material, materialKey, textures ) {

	return function ( key ) {

		material[ materialKey ] = textures[ key ];
		material.needsUpdate = true;

	};

}

function guiScene( gui, scene ) {

	var folder = gui.addFolder( 'Background color' );

	var data = {
		background: '#ffffff',
		'ambientLight': '#ffffff'
	};

	var color = new THREE.Color();
	var colorConvert = handleColorChange( color );

	folder.addColor( data, 'background' ).onChange( function ( value ) {

		colorConvert( value );

		renderer.setClearColor( color.getHex() );

	} );

	// folder.addColor( data, 'ambient light' ).onChange( handleColorChange( ambientLight.color ) );
}

function guiMeshStandardMaterial( gui, mesh, material, name ) {

	var data = {
		color: material.color.getHex(),
	};

	var folder = gui.addFolder(name);

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );

	folder.add( material, 'roughness', 0, 1 );
	folder.add( material, 'metalness', 0, 1 );

}

function chooseFromHash( gui, mesh, name ) {

	var selectedMaterial = window.location.hash.substring( 1 ) || 'MeshStandardMaterial';
	var material;

	switch ( selectedMaterial ) {

		case 'MeshStandardMaterial' :

			material = new THREE.MeshStandardMaterial( { color: 0x2194CE } );
			guiMeshStandardMaterial( gui, mesh, material, name );

			return material;

			break;
	}
}