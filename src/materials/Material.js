/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Material = function () {

	this.id = THREE.MaterialIdCount ++;

	this.name = '';

	this.side = THREE.FrontSide;

	this.opacity = 1;
	this.transparent = false;

	this.blending = THREE.NormalBlending;

	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;

	this.depthTest = true;
	this.depthWrite = true;

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.alphaTest = 0;

	this.overdraw = false; // Boolean for fixing antialiasing gaps in CanvasRenderer

	this.visible = true;

	this.needsUpdate = true;

	THREE.MaterialLibrary[ this.id ] = this;

};

THREE.Material.prototype.setValues = function ( values ) {

	if ( values === undefined ) return;

	for ( var key in values ) {

		var newValue = values[ key ];

		if ( newValue === undefined ) {

			console.warn( 'THREE.Material: \'' + key + '\' parameter is undefined.' );
			continue;

		}

		if ( key in this ) {

			var currentValue = this[ key ];

			if ( currentValue instanceof THREE.Color && newValue instanceof THREE.Color ) {

				currentValue.copy( newValue );

			} else if ( currentValue instanceof THREE.Color ) {

				currentValue.set( newValue );

			} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {

				currentValue.copy( newValue );

			} else {

				this[ key ] = newValue;

			}

		}

	}

};

THREE.Material.prototype.clone = function ( material ) {

	if ( material === undefined ) material = new THREE.Material();

	material.name = this.name;

	material.side = this.side;

	material.opacity = this.opacity;
	material.transparent = this.transparent;

	material.blending = this.blending;

	material.blendSrc = this.blendSrc;
	material.blendDst = this.blendDst;
	material.blendEquation = this.blendEquation;

	material.depthTest = this.depthTest;
	material.depthWrite = this.depthWrite;

	material.polygonOffset = this.polygonOffset;
	material.polygonOffsetFactor = this.polygonOffsetFactor;
	material.polygonOffsetUnits = this.polygonOffsetUnits;

	material.alphaTest = this.alphaTest;

	material.overdraw = this.overdraw;

	material.visible = this.visible;

	return material;

};

THREE.Material.prototype.deallocate = function () {

	delete THREE.MaterialLibrary[ this.id ];

};

THREE.MaterialIdCount = 0;
THREE.MaterialLibrary = {};
