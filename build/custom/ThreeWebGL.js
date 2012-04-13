<<<<<<< HEAD
/**
 * @author mr.doob / http://mrdoob.com/
 */

var THREE = THREE || { REVISION: '49dev' };

if ( ! self.Int32Array ) {

	self.Int32Array = Array;
	self.Float32Array = Array;

}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Color = function ( hex ) {

	if ( hex !== undefined ) this.setHex( hex );
	return this;

};

THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,

	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	},

	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	},

	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	setHSV: function ( h, s, v ) {

		// based on MochiKit implementation by Bob Ippolito
		// h,s,v ranges are < 0.0 - 1.0 >

		var i, f, p, q, t;

		if ( v === 0 ) {

			this.r = this.g = this.b = 0;

		} else {

			i = Math.floor( h * 6 );
			f = ( h * 6 ) - i;
			p = v * ( 1 - s );
			q = v * ( 1 - ( s * f ) );
			t = v * ( 1 - ( s * ( 1 - f ) ) );

			switch ( i ) {

				case 1: this.r = q; this.g = v; this.b = p; break;
				case 2: this.r = p; this.g = v; this.b = t; break;
				case 3: this.r = p; this.g = q; this.b = v; break;
				case 4: this.r = t; this.g = p; this.b = v; break;
				case 5: this.r = v; this.g = p; this.b = q; break;
				case 6: // fall through
				case 0: this.r = v; this.g = t; this.b = p; break;

			}

		}

		return this;

	},

	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	lerpSelf: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	getHex: function () {

		return Math.floor( this.r * 255 ) << 16 ^ Math.floor( this.g * 255 ) << 8 ^ Math.floor( this.b * 255 );

	},

	getContextStyle: function () {

		return 'rgb(' + Math.floor( this.r * 255 ) + ',' + Math.floor( this.g * 255 ) + ',' + Math.floor( this.b * 255 ) + ')';

	},

	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;

		} else {

			this.set( 0, 0 );

		}

		return this;

	},

	negate: function() {

		return this.multiplyScalar( - 1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	equals: function( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	isZero: function () {

		return ( this.lengthSq() < 0.0001 /* almostZero */ );

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};


THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	multiply: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	multiplySelf: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;
		this.z *= s;

		return this;

	},

	divideSelf: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;
			this.z /= s;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},


	negate: function() {

		return this.multiplyScalar( - 1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	cross: function ( a, b ) {

		this.x = a.y * b.z - a.z * b.y;
		this.y = a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;

		return this;

	},

	crossSelf: function ( v ) {

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		return new THREE.Vector3().sub( this, v ).lengthSq();

	},

	getPositionFromMatrix: function ( m ) {

		this.x = m.elements[12];
		this.y = m.elements[13];
		this.z = m.elements[14];

		return this;

	},

	getRotationFromMatrix: function ( m, scale ) {

		var sx = scale ? scale.x : 1;
		var sy = scale ? scale.y : 1;
		var sz = scale ? scale.z : 1;

		var m11 = m.elements[0] / sx, m12 = m.elements[4] / sy, m13 = m.elements[8] / sz;
		var m21 = m.elements[1] / sx, m22 = m.elements[5] / sy, m23 = m.elements[9] / sz;
		var m33 = m.elements[10] / sz;

		this.y = Math.asin( m13 );

		var cosY = Math.cos( this.y );

		if ( Math.abs( cosY ) > 0.00001 ) {

			this.x = Math.atan2( - m23 / cosY, m33 / cosY );
			this.z = Math.atan2( - m12 / cosY, m11 / cosY );

		} else {

			this.x = 0;
			this.z = Math.atan2( m21, m22 );

		}

		return this;

	},

	/*

	// from http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m
	// order XYZ

	getEulerXYZFromQuaternion: function ( q ) {

		this.x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z ) );
		this.y = Math.asin( 2 *  ( q.x * q.z + q.y * q.w ) );
		this.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z ) );

	},

	// from http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToEuler/index.htm
	// order YZX (assuming heading == y, attitude == z, bank == x)

	getEulerYZXFromQuaternion: function ( q ) {

		var sqw = q.w * q.w;
		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var unit = sqx + sqy + sqz + sqw; // if normalised is one, otherwise is correction factor
		var test = q.x * q.y + q.z * q.w;

		if ( test > 0.499 * unit ) { // singularity at north pole

			this.y = 2 * Math.atan2( q.x, q.w );
			this.z = Math.PI / 2;
			this.x = 0;

			return;

		}

		if ( test < -0.499 * unit ) { // singularity at south pole

			this.y = -2 * Math.atan2( q.x, q.w );
			this.z = -Math.PI / 2;
			this.x = 0;

			return;

		}

		this.y = Math.atan2( 2 * q.y * q.w - 2 * q.x * q.z, sqx - sqy - sqz + sqw );
		this.z = Math.asin( 2 * test / unit );
		this.x = Math.atan2( 2 * q.x * q.w - 2 * q.y * q.z, -sqx + sqy - sqz + sqw );

	},

	*/

	getScaleFromMatrix: function ( m ) {

		var sx = this.set( m.elements[0], m.elements[1], m.elements[2] ).length();
		var sy = this.set( m.elements[4], m.elements[5], m.elements[6] ).length();
		var sz = this.set( m.elements[8], m.elements[9], m.elements[10] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	isZero: function () {

		return ( this.lengthSq() < 0.0001 /* almostZero */ );

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 */

THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	},

	add: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	sub: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;
		this.z *= s;
		this.w *= s;

		return this;

	},

	divideScalar: function ( s ) {

		if ( s ) {

			this.x /= s;
			this.y /= s;
			this.z /= s;
			this.w /= s;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;

	},


	negate: function() {

		return this.multiplyScalar( -1 );

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	},

	lengthSq: function () {

		return this.dot( this );

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		return this.normalize().multiplyScalar( l );

	},

	lerpSelf: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	},

	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	}

};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Frustum = function ( ) {

	this.planes = [

		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4(),
		new THREE.Vector4()

	];

};

THREE.Frustum.prototype.setFromMatrix = function ( m ) {

	var i, plane,
	planes = this.planes;
    var me = m.elements;
    var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3]; 
    var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7]; 
    var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11]; 
    var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15]; 

	planes[ 0 ].set( me3 - me0, me7 - me4, me11 - me8, me15 - me12 );
	planes[ 1 ].set( me3 + me0, me7 + me4, me11 + me8, me15 + me12 );
	planes[ 2 ].set( me3 + me1, me7 + me5, me11 + me9, me15 + me13 );
	planes[ 3 ].set( me3 - me1, me7 - me5, me11 - me9, me15 - me13 );
	planes[ 4 ].set( me3 - me2, me7 - me6, me11 - me10, me15 - me14 );
	planes[ 5 ].set( me3 + me2, me7 + me6, me11 + me10, me15 + me14 );

	for ( i = 0; i < 6; i ++ ) {

		plane = planes[ i ];
		plane.divideScalar( Math.sqrt( plane.x * plane.x + plane.y * plane.y + plane.z * plane.z ) );

	}

};

THREE.Frustum.prototype.contains = function ( object ) {

	var distance,
	planes = this.planes,
	matrix = object.matrixWorld,
    me = matrix.elements,
	scale = THREE.Frustum.__v1.set( matrix.getColumnX().length(), matrix.getColumnY().length(), matrix.getColumnZ().length() ),
	radius = - object.geometry.boundingSphere.radius * Math.max( scale.x, Math.max( scale.y, scale.z ) );

	for ( var i = 0; i < 6; i ++ ) {

		distance = planes[ i ].x * me[12] + planes[ i ].y * me[13] + planes[ i ].z * me[14] + planes[ i ].w;
		if ( distance <= radius ) return false;

	}

	return true;

};

THREE.Frustum.__v1 = new THREE.Vector3();
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Ray = function ( origin, direction ) {

	this.origin = origin || new THREE.Vector3();
	this.direction = direction || new THREE.Vector3();

	var precision = 0.0001;

	this.setPrecision = function ( value ) {

		precision = value;

	};

	var a = new THREE.Vector3();
	var b = new THREE.Vector3();
	var c = new THREE.Vector3();
	var d = new THREE.Vector3();

	var originCopy = new THREE.Vector3();
	var directionCopy = new THREE.Vector3();

	var vector = new THREE.Vector3();
	var normal = new THREE.Vector3();
	var intersectPoint = new THREE.Vector3()

	this.intersectObject = function ( object ) {

		var intersect, intersects = [];

		if ( object instanceof THREE.Particle ) {

			var distance = distanceFromIntersection( this.origin, this.direction, object.matrixWorld.getPosition() );

			if ( distance > object.scale.x ) {

				return [];

			}

			intersect = {

				distance: distance,
				point: object.position,
				face: null,
				object: object

			};

			intersects.push( intersect );

		} else if ( object instanceof THREE.Mesh ) {

			// Checking boundingSphere

			var distance = distanceFromIntersection( this.origin, this.direction, object.matrixWorld.getPosition() );
			var scale = THREE.Frustum.__v1.set( object.matrixWorld.getColumnX().length(), object.matrixWorld.getColumnY().length(), object.matrixWorld.getColumnZ().length() );

			if ( distance > object.geometry.boundingSphere.radius * Math.max( scale.x, Math.max( scale.y, scale.z ) ) ) {

				return intersects;

			}

			// Checking faces

			var f, fl, face, dot, scalar,
			geometry = object.geometry,
			vertices = geometry.vertices,
			objMatrix;

			object.matrixRotationWorld.extractRotation( object.matrixWorld );

			for ( f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

				face = geometry.faces[ f ];

				originCopy.copy( this.origin );
				directionCopy.copy( this.direction );

				objMatrix = object.matrixWorld;

				// determine if ray intersects the plane of the face
				// note: this works regardless of the direction of the face normal

				vector = objMatrix.multiplyVector3( vector.copy( face.centroid ) ).subSelf( originCopy );
				normal = object.matrixRotationWorld.multiplyVector3( normal.copy( face.normal ) );
				dot = directionCopy.dot( normal );

				// bail if ray and plane are parallel

				if ( Math.abs( dot ) < precision ) continue;

				// calc distance to plane

				scalar = normal.dot( vector ) / dot;

				// if negative distance, then plane is behind ray

				if ( scalar < 0 ) continue;

				if ( object.doubleSided || ( object.flipSided ? dot > 0 : dot < 0 ) ) {

					intersectPoint.add( originCopy, directionCopy.multiplyScalar( scalar ) );

					if ( face instanceof THREE.Face3 ) {

						a = objMatrix.multiplyVector3( a.copy( vertices[ face.a ].position ) );
						b = objMatrix.multiplyVector3( b.copy( vertices[ face.b ].position ) );
						c = objMatrix.multiplyVector3( c.copy( vertices[ face.c ].position ) );

						if ( pointInFace3( intersectPoint, a, b, c ) ) {

							intersect = {

								distance: originCopy.distanceTo( intersectPoint ),
								point: intersectPoint.clone(),
								face: face,
								object: object

							};

							intersects.push( intersect );

						}

					} else if ( face instanceof THREE.Face4 ) {

						a = objMatrix.multiplyVector3( a.copy( vertices[ face.a ].position ) );
						b = objMatrix.multiplyVector3( b.copy( vertices[ face.b ].position ) );
						c = objMatrix.multiplyVector3( c.copy( vertices[ face.c ].position ) );
						d = objMatrix.multiplyVector3( d.copy( vertices[ face.d ].position ) );

						if ( pointInFace3( intersectPoint, a, b, d ) || pointInFace3( intersectPoint, b, c, d ) ) {

							intersect = {

								distance: originCopy.distanceTo( intersectPoint ),
								point: intersectPoint.clone(),
								face: face,
								object: object

							};

							intersects.push( intersect );

						}

					}

				}

			}

		}

		return intersects;

	}

	this.intersectObjects = function ( objects ) {

		var intersects = [];

		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			Array.prototype.push.apply( intersects, this.intersectObject( objects[ i ] ) );

		}

		intersects.sort( function ( a, b ) { return a.distance - b.distance; } );

		return intersects;

	};

	var v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3();
	var dot, intersect, distance;

	function distanceFromIntersection( origin, direction, position ) {

		v0.sub( position, origin );
		dot = v0.dot( direction );

		intersect = v1.add( origin, v2.copy( direction ).multiplyScalar( dot ) );
		distance = position.distanceTo( intersect );

		return distance;

	}

	// http://www.blackpawn.com/texts/pointinpoly/default.html

	var dot00, dot01, dot02, dot11, dot12, invDenom, u, v;

	function pointInFace3( p, a, b, c ) {

		v0.sub( c, a );
		v1.sub( b, a );
		v2.sub( p, a );

		dot00 = v0.dot( v0 );
		dot01 = v0.dot( v1 );
		dot02 = v0.dot( v2 );
		dot11 = v1.dot( v1 );
		dot12 = v1.dot( v2 );

		invDenom = 1 / ( dot00 * dot11 - dot01 * dot01 );
		u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		return ( u >= 0 ) && ( v >= 0 ) && ( u + v < 1 );

	}

};/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Rectangle = function () {

	var _left, _top, _right, _bottom,
	_width, _height, _isEmpty = true;

	function resize() {

		_width = _right - _left;
		_height = _bottom - _top;

	}

	this.getX = function () {

		return _left;

	};

	this.getY = function () {

		return _top;

	};

	this.getWidth = function () {

		return _width;

	};

	this.getHeight = function () {

		return _height;

	};

	this.getLeft = function() {

		return _left;

	};

	this.getTop = function() {

		return _top;

	};

	this.getRight = function() {

		return _right;

	};

	this.getBottom = function() {

		return _bottom;

	};

	this.set = function ( left, top, right, bottom ) {

		_isEmpty = false;

		_left = left; _top = top;
		_right = right; _bottom = bottom;

		resize();

	};

	this.addPoint = function ( x, y ) {

		if ( _isEmpty ) {

			_isEmpty = false;
			_left = x; _top = y;
			_right = x; _bottom = y;

			resize();

		} else {

			_left = _left < x ? _left : x; // Math.min( _left, x );
			_top = _top < y ? _top : y; // Math.min( _top, y );
			_right = _right > x ? _right : x; // Math.max( _right, x );
			_bottom = _bottom > y ? _bottom : y; // Math.max( _bottom, y );

			resize();
		}

	};

	this.add3Points = function ( x1, y1, x2, y2, x3, y3 ) {

		if (_isEmpty) {

			_isEmpty = false;
			_left = x1 < x2 ? ( x1 < x3 ? x1 : x3 ) : ( x2 < x3 ? x2 : x3 );
			_top = y1 < y2 ? ( y1 < y3 ? y1 : y3 ) : ( y2 < y3 ? y2 : y3 );
			_right = x1 > x2 ? ( x1 > x3 ? x1 : x3 ) : ( x2 > x3 ? x2 : x3 );
			_bottom = y1 > y2 ? ( y1 > y3 ? y1 : y3 ) : ( y2 > y3 ? y2 : y3 );

			resize();

		} else {

			_left = x1 < x2 ? ( x1 < x3 ? ( x1 < _left ? x1 : _left ) : ( x3 < _left ? x3 : _left ) ) : ( x2 < x3 ? ( x2 < _left ? x2 : _left ) : ( x3 < _left ? x3 : _left ) );
			_top = y1 < y2 ? ( y1 < y3 ? ( y1 < _top ? y1 : _top ) : ( y3 < _top ? y3 : _top ) ) : ( y2 < y3 ? ( y2 < _top ? y2 : _top ) : ( y3 < _top ? y3 : _top ) );
			_right = x1 > x2 ? ( x1 > x3 ? ( x1 > _right ? x1 : _right ) : ( x3 > _right ? x3 : _right ) ) : ( x2 > x3 ? ( x2 > _right ? x2 : _right ) : ( x3 > _right ? x3 : _right ) );
			_bottom = y1 > y2 ? ( y1 > y3 ? ( y1 > _bottom ? y1 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) ) : ( y2 > y3 ? ( y2 > _bottom ? y2 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) );

			resize();

		};

	};

	this.addRectangle = function ( r ) {

		if ( _isEmpty ) {

			_isEmpty = false;
			_left = r.getLeft(); _top = r.getTop();
			_right = r.getRight(); _bottom = r.getBottom();

			resize();

		} else {

			_left = _left < r.getLeft() ? _left : r.getLeft(); // Math.min(_left, r.getLeft() );
			_top = _top < r.getTop() ? _top : r.getTop(); // Math.min(_top, r.getTop() );
			_right = _right > r.getRight() ? _right : r.getRight(); // Math.max(_right, r.getRight() );
			_bottom = _bottom > r.getBottom() ? _bottom : r.getBottom(); // Math.max(_bottom, r.getBottom() );

			resize();

		}

	};

	this.inflate = function ( v ) {

		_left -= v; _top -= v;
		_right += v; _bottom += v;

		resize();

	};

	this.minSelf = function ( r ) {

		_left = _left > r.getLeft() ? _left : r.getLeft(); // Math.max( _left, r.getLeft() );
		_top = _top > r.getTop() ? _top : r.getTop(); // Math.max( _top, r.getTop() );
		_right = _right < r.getRight() ? _right : r.getRight(); // Math.min( _right, r.getRight() );
		_bottom = _bottom < r.getBottom() ? _bottom : r.getBottom(); // Math.min( _bottom, r.getBottom() );

		resize();

	};

	this.intersects = function ( r ) {

		// http://gamemath.com/2011/09/detecting-whether-two-boxes-overlap/

		if ( _right < r.getLeft() ) return false;
		if ( _left > r.getRight() ) return false;
		if ( _bottom < r.getTop() ) return false;
		if ( _top > r.getBottom() ) return false;

		return true;

	};

	this.empty = function () {

		_isEmpty = true;

		_left = 0; _top = 0;
		_right = 0; _bottom = 0;

		resize();

	};

	this.isEmpty = function () {

		return _isEmpty;

	};

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Math = {

	// Clamp value to range <a, b>

	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)

	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	sign: function ( x ) {

		return ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Matrix3 = function () {

	this.m = [];

};

THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,

	getInverse: function ( matrix ) {

		// input: THREE.Matrix4
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var a11 =   matrix.elements[10] * matrix.elements[5] - matrix.elements[6] * matrix.elements[9];
		var a21 = - matrix.elements[10] * matrix.elements[1] + matrix.elements[2] * matrix.elements[9];
		var a31 =   matrix.elements[6] * matrix.elements[1] - matrix.elements[2] * matrix.elements[5];
		var a12 = - matrix.elements[10] * matrix.elements[4] + matrix.elements[6] * matrix.elements[8];
		var a22 =   matrix.elements[10] * matrix.elements[0] - matrix.elements[2] * matrix.elements[8];
		var a32 = - matrix.elements[6] * matrix.elements[0] + matrix.elements[2] * matrix.elements[4];
		var a13 =   matrix.elements[9] * matrix.elements[4] - matrix.elements[5] * matrix.elements[8];
		var a23 = - matrix.elements[9] * matrix.elements[0] + matrix.elements[1] * matrix.elements[8];
		var a33 =   matrix.elements[5] * matrix.elements[0] - matrix.elements[1] * matrix.elements[4];

		var det = matrix.elements[0] * a11 + matrix.elements[1] * a12 + matrix.elements[2] * a13;

		// no inverse

		if ( det === 0 ) {

			console.warn( "Matrix3.getInverse(): determinant == 0" );

		}

		var idet = 1.0 / det;

		var m = this.m;

		m[ 0 ] = idet * a11; m[ 1 ] = idet * a21; m[ 2 ] = idet * a31;
		m[ 3 ] = idet * a12; m[ 4 ] = idet * a22; m[ 5 ] = idet * a32;
		m[ 6 ] = idet * a13; m[ 7 ] = idet * a23; m[ 8 ] = idet * a33;

		return this;

	},

	/*
	transpose: function () {

		var tmp, m = this.m;

		tmp = m[1]; m[1] = m[3]; m[3] = tmp;
		tmp = m[2]; m[2] = m[6]; m[6] = tmp;
		tmp = m[5]; m[5] = m[7]; m[7] = tmp;

		return this;

	},
	*/

	transposeIntoArray: function ( r ) {

		var m = this.m;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 */

THREE.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

    this.elements = new Float32Array(16);

	this.set(

		( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0, n14 || 0,
		n21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0, n24 || 0,
		n31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1, n34 || 0,
		n41 || 0, n42 || 0, n43 || 0, ( n44 !== undefined ) ? n44 : 1

	);

};

THREE.Matrix4.prototype = {

	constructor: THREE.Matrix4,

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
        var te = this.elements;
        
		te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
		te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
		te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
		te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {
        
        var me = m.elements;
        
		this.set(

			me[0], me[4], me[8], me[12],
			me[1], me[5], me[9], me[13],
			me[2], me[6], me[10], me[14],
			me[3], me[7], me[11], me[15]

		);

		return this;

	},

	lookAt: function ( eye, target, up ) {
        var te = this.elements;
        
		var x = THREE.Matrix4.__v1;
		var y = THREE.Matrix4.__v2;
		var z = THREE.Matrix4.__v3;

		z.sub( eye, target ).normalize();

		if ( z.length() === 0 ) {

			z.z = 1;

		}

		x.cross( up, z ).normalize();

		if ( x.length() === 0 ) {

			z.x += 0.0001;
			x.cross( up, z ).normalize();

		}

		y.cross( z, x );


		te[0] = x.x; te[4] = y.x; te[8] = z.x;
		te[1] = x.y; te[5] = y.y; te[9] = z.y;
		te[2] = x.z; te[6] = y.z; te[10] = z.z;

		return this;

	},

	multiply: function ( a, b ) {
        
        var ae = a.elements,
            be = b.elements,
            te = this.elements;

		var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
		var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
		var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
		var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

		var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
		var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
		var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
		var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	multiplySelf: function ( m ) {

		return this.multiply( this, m );

	},

	multiplyToArray: function ( a, b, r ) {
        
        var te = this.elements;
        
		this.multiply( a, b );

		r[ 0 ] = te[0]; r[ 1 ] = te[1]; r[ 2 ] = te[2]; r[ 3 ] = te[3];
		r[ 4 ] = te[4]; r[ 5 ] = te[5]; r[ 6 ] = te[6]; r[ 7 ] = te[7];
		r[ 8 ]  = te[8]; r[ 9 ]  = te[9]; r[ 10 ] = te[10]; r[ 11 ] = te[11];
		r[ 12 ] = te[12]; r[ 13 ] = te[13]; r[ 14 ] = te[14]; r[ 15 ] = te[15];

		return this;

	},

	multiplyScalar: function ( s ) {
        
        var te = this.elements;
        
		te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
		te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
		te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
		te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;

		return this;

	},

	multiplyVector3: function ( v ) {
        var te = this.elements;
        
		var vx = v.x, vy = v.y, vz = v.z;
		var d = 1 / ( te[3] * vx + te[7] * vy + te[11] * vz + te[15] );

		v.x = ( te[0] * vx + te[4] * vy + te[8] * vz + te[12] ) * d;
		v.y = ( te[1] * vx + te[5] * vy + te[9] * vz + te[13] ) * d;
		v.z = ( te[2] * vx + te[6] * vy + te[10] * vz + te[14] ) * d;

		return v;

	},

	multiplyVector4: function ( v ) {
        
        var te = this.elements;
		var vx = v.x, vy = v.y, vz = v.z, vw = v.w;

		v.x = te[0] * vx + te[4] * vy + te[8] * vz + te[12] * vw;
		v.y = te[1] * vx + te[5] * vy + te[9] * vz + te[13] * vw;
		v.z = te[2] * vx + te[6] * vy + te[10] * vz + te[14] * vw;
		v.w = te[3] * vx + te[7] * vy + te[11] * vz + te[15] * vw;

		return v;

	},

	rotateAxis: function ( v ) {
        
        var te = this.elements;
		var vx = v.x, vy = v.y, vz = v.z;

		v.x = vx * te[0] + vy * te[4] + vz * te[8];
		v.y = vx * te[1] + vy * te[5] + vz * te[9];
		v.z = vx * te[2] + vy * te[6] + vz * te[10];

		v.normalize();

		return v;

	},

	crossVector: function ( a ) {
        
        var te = this.elements;
		var v = new THREE.Vector4();

		v.x = te[0] * a.x + te[4] * a.y + te[8] * a.z + te[12] * a.w;
		v.y = te[1] * a.x + te[5] * a.y + te[9] * a.z + te[13] * a.w;
		v.z = te[2] * a.x + te[6] * a.y + te[10] * a.z + te[14] * a.w;

		v.w = ( a.w ) ? te[3] * a.x + te[7] * a.y + te[11] * a.z + te[15] * a.w : 1;

		return v;

	},

	determinant: function () {

        var te = this.elements;
        
		var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
		var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
		var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
		var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n14 * n23 * n32 * n41-
			n13 * n24 * n32 * n41-
			n14 * n22 * n33 * n41+
			n12 * n24 * n33 * n41+

			n13 * n22 * n34 * n41-
			n12 * n23 * n34 * n41-
			n14 * n23 * n31 * n42+
			n13 * n24 * n31 * n42+

			n14 * n21 * n33 * n42-
			n11 * n24 * n33 * n42-
			n13 * n21 * n34 * n42+
			n11 * n23 * n34 * n42+

			n14 * n22 * n31 * n43-
			n12 * n24 * n31 * n43-
			n14 * n21 * n32 * n43+
			n11 * n24 * n32 * n43+

			n12 * n21 * n34 * n43-
			n11 * n22 * n34 * n43-
			n13 * n22 * n31 * n44+
			n12 * n23 * n31 * n44+

			n13 * n21 * n32 * n44-
			n11 * n23 * n32 * n44-
			n12 * n21 * n33 * n44+
			n11 * n22 * n33 * n44
		);

	},

	transpose: function () {
        var te = this.elements;
        
		var tmp;

		tmp = te[1]; te[1] = te[4]; te[4] = tmp;
		tmp = te[2]; te[2] = te[8]; te[8] = tmp;
		tmp = te[6]; te[6] = te[9]; te[9] = tmp;

		tmp = te[3]; te[3] = te[12]; te[12] = tmp;
		tmp = te[7]; te[7] = te[13]; te[13] = tmp;
		tmp = te[11]; te[11] = te[14]; te[14] = tmp;

		return this;

	},

	flattenToArray: function ( flat ) {

        var te = this.elements;
		flat[ 0 ] = te[0]; flat[ 1 ] = te[1]; flat[ 2 ] = te[2]; flat[ 3 ] = te[3];
		flat[ 4 ] = te[4]; flat[ 5 ] = te[5]; flat[ 6 ] = te[6]; flat[ 7 ] = te[7];
		flat[ 8 ]  = te[8]; flat[ 9 ]  = te[9]; flat[ 10 ] = te[10]; flat[ 11 ] = te[11];
		flat[ 12 ] = te[12]; flat[ 13 ] = te[13]; flat[ 14 ] = te[14]; flat[ 15 ] = te[15];

		return flat;

	},

	flattenToArrayOffset: function( flat, offset ) {

        var te = this.elements;
		flat[ offset ] = te[0];
		flat[ offset + 1 ] = te[1];
		flat[ offset + 2 ] = te[2];
		flat[ offset + 3 ] = te[3];

		flat[ offset + 4 ] = te[4];
		flat[ offset + 5 ] = te[5];
		flat[ offset + 6 ] = te[6];
		flat[ offset + 7 ] = te[7];

		flat[ offset + 8 ]  = te[8];
		flat[ offset + 9 ]  = te[9];
		flat[ offset + 10 ] = te[10];
		flat[ offset + 11 ] = te[11];

		flat[ offset + 12 ] = te[12];
		flat[ offset + 13 ] = te[13];
		flat[ offset + 14 ] = te[14];
		flat[ offset + 15 ] = te[15];

		return flat;

	},

	getPosition: function () {
        var te = this.elements;
        
		return THREE.Matrix4.__v1.set( te[12], te[13], te[14] );

	},

	setPosition: function ( v ) {
        var te = this.elements;
		te[12] = v.x;
		te[13] = v.y;
		te[14] = v.z;

		return this;

	},

	getColumnX: function () {
        var te = this.elements;
		return THREE.Matrix4.__v1.set( te[0], te[1], te[2] );

	},

	getColumnY: function () {
        var te = this.elements;
		return THREE.Matrix4.__v1.set( te[4], te[5], te[6] );

	},

	getColumnZ: function() {
        var te = this.elements;
		return THREE.Matrix4.__v1.set( te[8], te[9], te[10] );

	},

	getInverse: function ( m ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var te = this.elements;
        var me = m.elements;
                
		var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
		var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
		var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
		var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

		te[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;
		te[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;
		te[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;
		te[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;
		te[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;
		te[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;
		te[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;
		te[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;
		te[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;
		te[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;
		te[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;
		te[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;
		te[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;
		te[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;
		te[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;
		te[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;
		this.multiplyScalar( 1 / m.determinant() );

		return this;

	},

	setRotationFromEuler: function( v, order ) {
        var te = this.elements;
        
		var x = v.x, y = v.y, z = v.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		switch ( order ) {

			case 'YXZ':

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[0] = ce + df * b;
				te[4] = de * b - cf;
				te[8] = a * d;

				te[1] = a * f;
				te[5] = a * e;
				te[9] = - b;

				te[2] = cf * b - de;
				te[6] = df + ce * b;
				te[10] = a * c;
				break;

			case 'ZXY':

				var ce = c * e, cf = c * f, de = d * e, df = d * f;

				te[0] = ce - df * b;
				te[4] = - a * f;
				te[8] = de + cf * b;

				te[1] = cf + de * b;
				te[5] = a * e;
				te[9] = df - ce * b;

				te[2] = - a * d;
				te[6] = b;
				te[10] = a * c;
				break;

			case 'ZYX':

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[0] = c * e;
				te[4] = be * d - af;
				te[8] = ae * d + bf;

				te[1] = c * f;
				te[5] = bf * d + ae;
				te[9] = af * d - be;

				te[2] = - d;
				te[6] = b * c;
				te[10] = a * c;
				break;

			case 'YZX':

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[0] = c * e;
				te[4] = bd - ac * f;
				te[8] = bc * f + ad;

				te[1] = f;
				te[5] = a * e;
				te[9] = - b * e;

				te[2] = - d * e;
				te[6] = ad * f + bc;
				te[10] = ac - bd * f;
				break;

			case 'XZY':

				var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

				te[0] = c * e;
				te[4] = - f;
				te[8] = d * e;

				te[1] = ac * f + bd;
				te[5] = a * e;
				te[9] = ad * f - bc;

				te[2] = bc * f - ad;
				te[6] = b * e;
				te[10] = bd * f + ac;
				break;

			default: // 'XYZ'

				var ae = a * e, af = a * f, be = b * e, bf = b * f;

				te[0] = c * e;
				te[4] = - c * f;
				te[8] = d;

				te[1] = af + be * d;
				te[5] = ae - bf * d;
				te[9] = - b * c;

				te[2] = bf - ae * d;
				te[6] = be + af * d;
				te[10] = a * c;
				break;

		}

		return this;

	},


	setRotationFromQuaternion: function( q ) {
        var te = this.elements;
        
		var x = q.x, y = q.y, z = q.z, w = q.w;
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		te[0] = 1 - ( yy + zz );
		te[4] = xy - wz;
		te[8] = xz + wy;

		te[1] = xy + wz;
		te[5] = 1 - ( xx + zz );
		te[9] = yz - wx;

		te[2] = xz - wy;
		te[6] = yz + wx;
		te[10] = 1 - ( xx + yy );

		return this;

	},

	compose: function ( translation, rotation, scale ) {
        var te = this.elements;
		var mRotation = THREE.Matrix4.__m1;
		var mScale = THREE.Matrix4.__m2;

		mRotation.identity();
		mRotation.setRotationFromQuaternion( rotation );

		mScale.makeScale( scale.x, scale.y, scale.z );

		this.multiply( mRotation, mScale );

		te[12] = translation.x;
		te[13] = translation.y;
		te[14] = translation.z;

		return this;

	},

	decompose: function ( translation, rotation, scale ) {

		// grab the axis vectors
        var te = this.elements;
		var x = THREE.Matrix4.__v1;
		var y = THREE.Matrix4.__v2;
		var z = THREE.Matrix4.__v3;

		x.set( te[0], te[1], te[2] );
		y.set( te[4], te[5], te[6] );
		z.set( te[8], te[9], te[10] );

		translation = ( translation instanceof THREE.Vector3 ) ? translation : new THREE.Vector3();
		rotation = ( rotation instanceof THREE.Quaternion ) ? rotation : new THREE.Quaternion();
		scale = ( scale instanceof THREE.Vector3 ) ? scale : new THREE.Vector3();

		scale.x = x.length();
		scale.y = y.length();
		scale.z = z.length();

		translation.x = te[12];
		translation.y = te[13];
		translation.z = te[14];

		// scale the rotation part

		var matrix = THREE.Matrix4.__m1;

		matrix.copy( this );

		matrix.elements[0] /= scale.x;
		matrix.elements[1] /= scale.x;
		matrix.elements[2] /= scale.x;

		matrix.elements[4] /= scale.y;
		matrix.elements[5] /= scale.y;
		matrix.elements[6] /= scale.y;

		matrix.elements[8] /= scale.z;
		matrix.elements[9] /= scale.z;
		matrix.elements[10] /= scale.z;

		rotation.setFromRotationMatrix( matrix );

		return [ translation, rotation, scale ];

	},

	extractPosition: function ( m ) {
        var te = this.elements;
        var me = m.elements;
		te[12] = me[12];
		te[13] = me[13];
		te[14] = me[14];

		return this;

	},

	extractRotation: function ( m ) {
        var te = this.elements;
        var me = m.elements;
        
		var vector = THREE.Matrix4.__v1;

		var scaleX = 1 / vector.set( me[0], me[1], me[2] ).length();
		var scaleY = 1 / vector.set( me[4], me[5], me[6] ).length();
		var scaleZ = 1 / vector.set( me[8], me[9], me[10] ).length();

		te[0] = me[0] * scaleX;
		te[1] = me[1] * scaleX;
		te[2] = me[2] * scaleX;

		te[4] = me[4] * scaleY;
		te[5] = me[5] * scaleY;
		te[6] = me[6] * scaleY;

		te[8] = me[8] * scaleZ;
		te[9] = me[9] * scaleZ;
		te[10] = me[10] * scaleZ;

		return this;

	},

	//

	translate: function ( v ) {
        var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[12] = te[0] * x + te[4] * y + te[8] * z + te[12];
		te[13] = te[1] * x + te[5] * y + te[9] * z + te[13];
		te[14] = te[2] * x + te[6] * y + te[10] * z + te[14];
		te[15] = te[3] * x + te[7] * y + te[11] * z + te[15];

		return this;

	},

	rotateX: function ( angle ) {
        var te = this.elements;
		var m12 = te[4];
		var m22 = te[5];
		var m32 = te[6];
		var m42 = te[7];
		var m13 = te[8];
		var m23 = te[9];
		var m33 = te[10];
		var m43 = te[11];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[4] = c * m12 + s * m13;
		te[5] = c * m22 + s * m23;
		te[6] = c * m32 + s * m33;
		te[7] = c * m42 + s * m43;

		te[8] = c * m13 - s * m12;
		te[9] = c * m23 - s * m22;
		te[10] = c * m33 - s * m32;
		te[11] = c * m43 - s * m42;

		return this;

  	},

	rotateY: function ( angle ) {
        var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m13 = te[8];
		var m23 = te[9];
		var m33 = te[10];
		var m43 = te[11];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 - s * m13;
		te[1] = c * m21 - s * m23;
		te[2] = c * m31 - s * m33;
		te[3] = c * m41 - s * m43;

		te[8] = c * m13 + s * m11;
		te[9] = c * m23 + s * m21;
		te[10] = c * m33 + s * m31;
		te[11] = c * m43 + s * m41;

		return this;

	},

	rotateZ: function ( angle ) {
        var te = this.elements;
		var m11 = te[0];
		var m21 = te[1];
		var m31 = te[2];
		var m41 = te[3];
		var m12 = te[4];
		var m22 = te[5];
		var m32 = te[6];
		var m42 = te[7];
		var c = Math.cos( angle );
		var s = Math.sin( angle );

		te[0] = c * m11 + s * m12;
		te[1] = c * m21 + s * m22;
		te[2] = c * m31 + s * m32;
		te[3] = c * m41 + s * m42;

		te[4] = c * m12 - s * m11;
		te[5] = c * m22 - s * m21;
		te[6] = c * m32 - s * m31;
		te[7] = c * m42 - s * m41;

		return this;

	},

	rotateByAxis: function ( axis, angle ) {
        var te = this.elements;
		// optimize by checking axis

		if ( axis.x === 1 && axis.y === 0 && axis.z === 0 ) {

			return this.rotateX( angle );

		} else if ( axis.x === 0 && axis.y === 1 && axis.z === 0 ) {

			return this.rotateY( angle );

		} else if ( axis.x === 0 && axis.y === 0 && axis.z === 1 ) {

			return this.rotateZ( angle );

		}

		var x = axis.x, y = axis.y, z = axis.z;
		var n = Math.sqrt(x * x + y * y + z * z);

		x /= n;
		y /= n;
		z /= n;

		var xx = x * x, yy = y * y, zz = z * z;
		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var oneMinusCosine = 1 - c;
		var xy = x * y * oneMinusCosine;
		var xz = x * z * oneMinusCosine;
		var yz = y * z * oneMinusCosine;
		var xs = x * s;
		var ys = y * s;
		var zs = z * s;

		var r11 = xx + (1 - xx) * c;
		var r21 = xy + zs;
		var r31 = xz - ys;
		var r12 = xy - zs;
		var r22 = yy + (1 - yy) * c;
		var r32 = yz + xs;
		var r13 = xz + ys;
		var r23 = yz - xs;
		var r33 = zz + (1 - zz) * c;

		var m11 = te[0], m21 = te[1], m31 = te[2], m41 = te[3];
		var m12 = te[4], m22 = te[5], m32 = te[6], m42 = te[7];
		var m13 = te[8], m23 = te[9], m33 = te[10], m43 = te[11];
		var m14 = te[12], m24 = te[13], m34 = te[14], m44 = te[15];

		te[0] = r11 * m11 + r21 * m12 + r31 * m13;
		te[1] = r11 * m21 + r21 * m22 + r31 * m23;
		te[2] = r11 * m31 + r21 * m32 + r31 * m33;
		te[3] = r11 * m41 + r21 * m42 + r31 * m43;

		te[4] = r12 * m11 + r22 * m12 + r32 * m13;
		te[5] = r12 * m21 + r22 * m22 + r32 * m23;
		te[6] = r12 * m31 + r22 * m32 + r32 * m33;
		te[7] = r12 * m41 + r22 * m42 + r32 * m43;

		te[8] = r13 * m11 + r23 * m12 + r33 * m13;
		te[9] = r13 * m21 + r23 * m22 + r33 * m23;
		te[10] = r13 * m31 + r23 * m32 + r33 * m33;
		te[11] = r13 * m41 + r23 * m42 + r33 * m43;

		return this;

	},

	scale: function ( v ) {
        var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[0] *= x; te[4] *= y; te[8] *= z;
		te[1] *= x; te[5] *= y; te[9] *= z;
		te[2] *= x; te[6] *= y; te[10] *= z;
		te[3] *= x; te[7] *= y; te[11] *= z;

		return this;

	},

	//

	makeTranslation: function ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	},

	makeRotationX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1

		);

		return this;

	},

	makeRotationY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			-s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	},

	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},

	makeRotationAxis: function ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

		 	tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		 return this;

	},

	makeScale: function ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	},

	makeFrustum: function ( left, right, bottom, top, near, far ) {
        var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[0] = x;  te[4] = 0;  te[8] = a;   te[12] = 0;
		te[1] = 0;  te[5] = y;  te[9] = b;   te[13] = 0;
		te[2] = 0;  te[6] = 0;  te[10] = c;   te[14] = d;
		te[3] = 0;  te[7] = 0;  te[11] = - 1; te[15] = 0;

		return this;

	},

	makePerspective: function ( fov, aspect, near, far ) {

		var ymax = near * Math.tan( fov * Math.PI / 360 );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {
        var te = this.elements;
		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		te[0] = 2 / w; te[4] = 0;     te[8] = 0;      te[12] = -x;
		te[1] = 0;     te[5] = 2 / h; te[9] = 0;      te[13] = -y;
		te[2] = 0;     te[6] = 0;     te[10] = -2 / p; te[14] = -z;
		te[3] = 0;     te[7] = 0;     te[11] = 0;      te[15] = 1;

		return this;

	},


	clone: function () {
        var te = this.elements;
		return new THREE.Matrix4(

			te[0], te[4], te[8], te[12],
			te[1], te[5], te[9], te[13],
			te[2], te[6], te[10], te[14],
			te[3], te[7], te[11], te[15]

		);

	}

};

THREE.Matrix4.__v1 = new THREE.Vector3();
THREE.Matrix4.__v2 = new THREE.Vector3();
THREE.Matrix4.__v3 = new THREE.Vector3();

THREE.Matrix4.__m1 = new THREE.Matrix4();
THREE.Matrix4.__m2 = new THREE.Matrix4();
/**
 * @author mr.doob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Object3D = function () {

	this.id = THREE.Object3DCount ++;

	this.name = '';

	this.parent = undefined;
	this.children = [];

	this.up = new THREE.Vector3( 0, 1, 0 );

	this.position = new THREE.Vector3();
	this.rotation = new THREE.Vector3();
	this.eulerOrder = 'XYZ';
	this.scale = new THREE.Vector3( 1, 1, 1 );

	this.doubleSided = false;
	this.flipSided = false;

	this.renderDepth = null;

	this.rotationAutoUpdate = true;

	this.matrix = new THREE.Matrix4();
	this.matrixWorld = new THREE.Matrix4();
	this.matrixRotationWorld = new THREE.Matrix4();

	this.matrixAutoUpdate = true;
	this.matrixWorldNeedsUpdate = true;

	this.quaternion = new THREE.Quaternion();
	this.useQuaternion = false;

	this.boundRadius = 0.0;
	this.boundRadiusScale = 1.0;

	this.visible = true;

	this.castShadow = false;
	this.receiveShadow = false;

	this.frustumCulled = true;

	this._vector = new THREE.Vector3();

};


THREE.Object3D.prototype = {

	constructor: THREE.Object3D,

	applyMatrix: function ( matrix ) {

		this.matrix.multiply( matrix, this.matrix );

		this.scale.getScaleFromMatrix( this.matrix );
		this.rotation.getRotationFromMatrix( this.matrix, this.scale );
		this.position.getPositionFromMatrix( this.matrix );

	},

	translate: function ( distance, axis ) {

		this.matrix.rotateAxis( axis );
		this.position.addSelf( axis.multiplyScalar( distance ) );

	},

	translateX: function ( distance ) {

		this.translate( distance, this._vector.set( 1, 0, 0 ) );

	},

	translateY: function ( distance ) {

		this.translate( distance, this._vector.set( 0, 1, 0 ) );

	},

	translateZ: function ( distance ) {

		this.translate( distance, this._vector.set( 0, 0, 1 ) );

	},

	lookAt: function ( vector ) {

		// TODO: Add hierarchy support.

		this.matrix.lookAt( vector, this.position, this.up );

		if ( this.rotationAutoUpdate ) {

			this.rotation.getRotationFromMatrix( this.matrix );

		}

	},

	add: function ( object ) {

		if ( object === this ) {

			console.warn( 'THREE.Object3D.add: An object can\'t be added as a child of itself.' );
			return;

		}

		if ( this.children.indexOf( object ) === - 1 ) {

			if ( object.parent !== undefined ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			// add to scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene )  {

				scene.__addObject( object );

			}

		}

	},

	remove: function ( object ) {

		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = undefined;
			this.children.splice( index, 1 );

			// remove from scene

			var scene = this;

			while ( scene.parent !== undefined ) {

				scene = scene.parent;

			}

			if ( scene !== undefined && scene instanceof THREE.Scene ) {

				scene.__removeObject( object );

			}

		}

	},

	getChildByName: function ( name, recursive ) {

		var c, cl, child;

		for ( c = 0, cl = this.children.length; c < cl; c ++ ) {

			child = this.children[ c ];

			if ( child.name === name ) {

				return child;

			}

			if ( recursive ) {

				child = child.getChildByName( name, recursive );

				if ( child !== undefined ) {

					return child;

				}

			}

		}

		return undefined;

	},

	updateMatrix: function () {

		this.matrix.setPosition( this.position );

		if ( this.useQuaternion )  {

			this.matrix.setRotationFromQuaternion( this.quaternion );

		} else {

			this.matrix.setRotationFromEuler( this.rotation, this.eulerOrder );

		}

		if ( this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1 ) {

			this.matrix.scale( this.scale );
			this.boundRadiusScale = Math.max( this.scale.x, Math.max( this.scale.y, this.scale.z ) );

		}

		this.matrixWorldNeedsUpdate = true;

	},

	updateMatrixWorld: function ( force ) {

		this.matrixAutoUpdate && this.updateMatrix();

		// update matrixWorld

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent ) {

				this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

			} else {

				this.matrixWorld.copy( this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	}

};

THREE.Object3DCount = 0;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */

THREE.Projector = function() {

	var _object, _objectCount, _objectPool = [],
	_vertex, _vertexCount, _vertexPool = [],
	_face, _face3Count, _face3Pool = [], _face4Count, _face4Pool = [],
	_line, _lineCount, _linePool = [],
	_particle, _particleCount, _particlePool = [],

	_renderData = { objects: [], sprites: [], lights: [], elements: [] },

	_vector3 = new THREE.Vector3(),
	_vector4 = new THREE.Vector4(),

	_projScreenMatrix = new THREE.Matrix4(),
	_projScreenobjectMatrixWorld = new THREE.Matrix4(),

	_frustum = new THREE.Frustum(),

	_clippedVertex1PositionScreen = new THREE.Vector4(),
	_clippedVertex2PositionScreen = new THREE.Vector4(),

	_face3VertexNormals;

	this.projectVector = function ( vector, camera ) {

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
		_projScreenMatrix.multiplyVector3( vector );

		return vector;

	};

	this.unprojectVector = function ( vector, camera ) {

		camera.projectionMatrixInverse.getInverse( camera.projectionMatrix );

		_projScreenMatrix.multiply( camera.matrixWorld, camera.projectionMatrixInverse );
		_projScreenMatrix.multiplyVector3( vector );

		return vector;

	};

	this.pickingRay = function ( vector, camera ) {

		var end, ray, t;

		// set two vectors with opposing z values
		vector.z = -1.0;
		end = new THREE.Vector3( vector.x, vector.y, 1.0 );

		this.unprojectVector( vector, camera );
		this.unprojectVector( end, camera );

		// find direction from vector to end
		end.subSelf( vector ).normalize();

		return new THREE.Ray( vector, end );

	};

	this.projectGraph = function ( root, sort ) {

		_objectCount = 0;

		_renderData.objects.length = 0;
		_renderData.sprites.length = 0;
		_renderData.lights.length = 0;

		var projectObject = function ( object ) {

			if ( object.visible === false ) return;

			if ( ( object instanceof THREE.Mesh || object instanceof THREE.Line ) &&
			( object.frustumCulled === false || _frustum.contains( object ) ) ) {

				_vector3.copy( object.matrixWorld.getPosition() );
				_projScreenMatrix.multiplyVector3( _vector3 );

				_object = getNextObjectInPool();
				_object.object = object;
				_object.z = _vector3.z;

				_renderData.objects.push( _object );

			} else if ( object instanceof THREE.Sprite || object instanceof THREE.Particle ) {

				_vector3.copy( object.matrixWorld.getPosition() );
				_projScreenMatrix.multiplyVector3( _vector3 );

				_object = getNextObjectInPool();
				_object.object = object;
				_object.z = _vector3.z;

				_renderData.sprites.push( _object );

			} else if ( object instanceof THREE.Light ) {

				_renderData.lights.push( object );

			}

			for ( var c = 0, cl = object.children.length; c < cl; c ++ ) {

				projectObject( object.children[ c ] );

			}

		};

		projectObject( root );

		sort && _renderData.objects.sort( painterSort );

		return _renderData;

	};

	this.projectScene = function ( scene, camera, sort ) {

		var near = camera.near, far = camera.far, visible = false,
		o, ol, v, vl, f, fl, n, nl, c, cl, u, ul, object,
		objectMatrixWorld, objectMatrixWorldRotation,
		geometry, geometryMaterials, vertices, vertex, vertexPositionScreen,
		faces, face, faceVertexNormals, normal, faceVertexUvs, uvs,
		v1, v2, v3, v4;

		_face3Count = 0;
		_face4Count = 0;
		_lineCount = 0;
		_particleCount = 0;

		_renderData.elements.length = 0;

		if ( camera.parent === undefined ) {

			console.warn( 'DEPRECATED: Camera hasn\'t been added to a Scene. Adding it...' );
			scene.add( camera );

		}

		scene.updateMatrixWorld();

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );

		_frustum.setFromMatrix( _projScreenMatrix );

		_renderData = this.projectGraph( scene, false );

		for ( o = 0, ol = _renderData.objects.length; o < ol; o++ ) {

			object = _renderData.objects[ o ].object;

			objectMatrixWorld = object.matrixWorld;

			_vertexCount = 0;

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;
				geometryMaterials = object.geometry.materials;
				vertices = geometry.vertices;
				faces = geometry.faces;
				faceVertexUvs = geometry.faceVertexUvs;

				objectMatrixWorldRotation = object.matrixRotationWorld.extractRotation( objectMatrixWorld );

				for ( v = 0, vl = vertices.length; v < vl; v ++ ) {

					_vertex = getNextVertexInPool();
					_vertex.positionWorld.copy( vertices[ v ].position );

					objectMatrixWorld.multiplyVector3( _vertex.positionWorld );

					_vertex.positionScreen.copy( _vertex.positionWorld );
					_projScreenMatrix.multiplyVector4( _vertex.positionScreen );

					_vertex.positionScreen.x /= _vertex.positionScreen.w;
					_vertex.positionScreen.y /= _vertex.positionScreen.w;

					_vertex.visible = _vertex.positionScreen.z > near && _vertex.positionScreen.z < far;

				}

				for ( f = 0, fl = faces.length; f < fl; f ++ ) {

					face = faces[ f ];

					if ( face instanceof THREE.Face3 ) {

						v1 = _vertexPool[ face.a ];
						v2 = _vertexPool[ face.b ];
						v3 = _vertexPool[ face.c ];

						if ( v1.visible && v2.visible && v3.visible ) {

							visible = ( ( v3.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
								( v3.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) ) < 0;

							if ( object.doubleSided || visible != object.flipSided ) {

								_face = getNextFace3InPool();

								_face.v1.copy( v1 );
								_face.v2.copy( v2 );
								_face.v3.copy( v3 );

							} else {

								continue;

							}

						} else {

							continue;

						}

					} else if ( face instanceof THREE.Face4 ) {

						v1 = _vertexPool[ face.a ];
						v2 = _vertexPool[ face.b ];
						v3 = _vertexPool[ face.c ];
						v4 = _vertexPool[ face.d ];

						if ( v1.visible && v2.visible && v3.visible && v4.visible ) {

							visible = ( v4.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
								( v4.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) < 0 ||
								( v2.positionScreen.x - v3.positionScreen.x ) * ( v4.positionScreen.y - v3.positionScreen.y ) -
								( v2.positionScreen.y - v3.positionScreen.y ) * ( v4.positionScreen.x - v3.positionScreen.x ) < 0;


							if ( object.doubleSided || visible != object.flipSided ) {

								_face = getNextFace4InPool();

								_face.v1.copy( v1 );
								_face.v2.copy( v2 );
								_face.v3.copy( v3 );
								_face.v4.copy( v4 );

							} else {

								continue;

							}

						} else {

							continue;

						}

					}

					_face.normalWorld.copy( face.normal );
					if ( !visible && ( object.flipSided || object.doubleSided ) ) _face.normalWorld.negate();
					objectMatrixWorldRotation.multiplyVector3( _face.normalWorld );

					_face.centroidWorld.copy( face.centroid );
					objectMatrixWorld.multiplyVector3( _face.centroidWorld );

					_face.centroidScreen.copy( _face.centroidWorld );
					_projScreenMatrix.multiplyVector3( _face.centroidScreen );

					faceVertexNormals = face.vertexNormals;

					for ( n = 0, nl = faceVertexNormals.length; n < nl; n ++ ) {

						normal = _face.vertexNormalsWorld[ n ];
						normal.copy( faceVertexNormals[ n ] );
						if ( !visible && ( object.flipSided || object.doubleSided ) ) normal.negate();
						objectMatrixWorldRotation.multiplyVector3( normal );

					}

					for ( c = 0, cl = faceVertexUvs.length; c < cl; c ++ ) {

						uvs = faceVertexUvs[ c ][ f ];

						if ( !uvs ) continue;

						for ( u = 0, ul = uvs.length; u < ul; u ++ ) {

							_face.uvs[ c ][ u ] = uvs[ u ];

						}

					}

					_face.material = object.material;
					_face.faceMaterial = face.materialIndex !== null ? geometryMaterials[ face.materialIndex ] : null;

					_face.z = _face.centroidScreen.z;

					_renderData.elements.push( _face );

				}

			} else if ( object instanceof THREE.Line ) {

				_projScreenobjectMatrixWorld.multiply( _projScreenMatrix, objectMatrixWorld );

				vertices = object.geometry.vertices;
				
				v1 = getNextVertexInPool();
				v1.positionScreen.copy( vertices[ 0 ].position );
				_projScreenobjectMatrixWorld.multiplyVector4( v1.positionScreen );

				// Handle LineStrip and LinePieces
				var step = object.type === THREE.LinePieces ? 2 : 1;

				for ( v = 1, vl = vertices.length; v < vl; v ++ ) {

					v1 = getNextVertexInPool();
					v1.positionScreen.copy( vertices[ v ].position );
					_projScreenobjectMatrixWorld.multiplyVector4( v1.positionScreen );

					if ( ( v + 1 ) % step > 0 ) continue;

					v2 = _vertexPool[ _vertexCount - 2 ];

					_clippedVertex1PositionScreen.copy( v1.positionScreen );
					_clippedVertex2PositionScreen.copy( v2.positionScreen );

					if ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) ) {

						// Perform the perspective divide
						_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );
						_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );

						_line = getNextLineInPool();
						_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );
						_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );

						_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );

						_line.material = object.material;

						_renderData.elements.push( _line );

					}

				}

			}

		}

		for ( o = 0, ol = _renderData.sprites.length; o < ol; o++ ) {

			object = _renderData.sprites[ o ].object;

			objectMatrixWorld = object.matrixWorld;

			if ( object instanceof THREE.Particle ) {

				_vector4.set( objectMatrixWorld.elements[12], objectMatrixWorld.elements[13], objectMatrixWorld.elements[14], 1 );
				_projScreenMatrix.multiplyVector4( _vector4 );

				_vector4.z /= _vector4.w;

				if ( _vector4.z > 0 && _vector4.z < 1 ) {

					_particle = getNextParticleInPool();
					_particle.x = _vector4.x / _vector4.w;
					_particle.y = _vector4.y / _vector4.w;
					_particle.z = _vector4.z;

					_particle.rotation = object.rotation.z;

					_particle.scale.x = object.scale.x * Math.abs( _particle.x - ( _vector4.x + camera.projectionMatrix.elements[0] ) / ( _vector4.w + camera.projectionMatrix.elements[12] ) );
					_particle.scale.y = object.scale.y * Math.abs( _particle.y - ( _vector4.y + camera.projectionMatrix.elements[5] ) / ( _vector4.w + camera.projectionMatrix.elements[13] ) );

					_particle.material = object.material;

					_renderData.elements.push( _particle );

				}

			}

		}

		sort && _renderData.elements.sort( painterSort );

		return _renderData;

	};

	// Pools

	function getNextObjectInPool() {

		var object = _objectPool[ _objectCount ] = _objectPool[ _objectCount ] || new THREE.RenderableObject();

		_objectCount ++;

		return object;

	}

	function getNextVertexInPool() {

		var vertex = _vertexPool[ _vertexCount ] = _vertexPool[ _vertexCount ] || new THREE.RenderableVertex();

		_vertexCount ++;

		return vertex;

	}

	function getNextFace3InPool() {

		var face = _face3Pool[ _face3Count ] = _face3Pool[ _face3Count ] || new THREE.RenderableFace3();

		_face3Count ++;

		return face;

	}

	function getNextFace4InPool() {

		var face = _face4Pool[ _face4Count ] = _face4Pool[ _face4Count ] || new THREE.RenderableFace4();

		_face4Count ++;

		return face;

	}

	function getNextLineInPool() {

		var line = _linePool[ _lineCount ] = _linePool[ _lineCount ] || new THREE.RenderableLine();

		_lineCount ++;

		return line;

	}

	function getNextParticleInPool() {

		var particle = _particlePool[ _particleCount ] = _particlePool[ _particleCount ] || new THREE.RenderableParticle();
		_particleCount ++;
		return particle;

	}

	//

	function painterSort( a, b ) {

		return b.z - a.z;

	}

	function clipLine( s1, s2 ) {

		var alpha1 = 0, alpha2 = 1,

		// Calculate the boundary coordinate of each vertex for the near and far clip planes,
		// Z = -1 and Z = +1, respectively.
		bc1near =  s1.z + s1.w,
		bc2near =  s2.z + s2.w,
		bc1far =  - s1.z + s1.w,
		bc2far =  - s2.z + s2.w;

		if ( bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {

			// Both vertices lie entirely within all clip planes.
			return true;

		} else if ( ( bc1near < 0 && bc2near < 0) || (bc1far < 0 && bc2far < 0 ) ) {

			// Both vertices lie entirely outside one of the clip planes.
			return false;

		} else {

			// The line segment spans at least one clip plane.

			if ( bc1near < 0 ) {

				// v1 lies outside the near plane, v2 inside
				alpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );

			} else if ( bc2near < 0 ) {

				// v2 lies outside the near plane, v1 inside
				alpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );

			}

			if ( bc1far < 0 ) {

				// v1 lies outside the far plane, v2 inside
				alpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );

			} else if ( bc2far < 0 ) {

				// v2 lies outside the far plane, v2 inside
				alpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );

			}

			if ( alpha2 < alpha1 ) {

				// The line segment spans two boundaries, but is outside both of them.
				// (This can't happen when we're only clipping against just near/far but good
				//  to leave the check here for future usage if other clip planes are added.)
				return false;

			} else {

				// Update the s1 and s2 vertices to match the clipped line segment.
				s1.lerpSelf( s2, alpha1 );
				s2.lerpSelf( s1, 1 - alpha2 );

				return true;

			}

		}

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Quaternion = function( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( q ) {

		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;

		return this;

	},

	setFromEuler: function ( vector ) {

		var c = Math.PI / 360, // 0.5 * Math.PI / 360, // 0.5 is an optimization
		x = vector.x * c,
		y = vector.y * c,
		z = vector.z * c,

		c1 = Math.cos( y  ),
		s1 = Math.sin( y  ),
		c2 = Math.cos( -z ),
		s2 = Math.sin( -z ),
		c3 = Math.cos( x  ),
		s3 = Math.sin( x  ),

		c1c2 = c1 * c2,
		s1s2 = s1 * s2;

		this.w = c1c2 * c3  - s1s2 * s3;
	  	this.x = c1c2 * s3  + s1s2 * c3;
		this.y = s1 * c2 * c3 + c1 * s2 * s3;
		this.z = c1 * s2 * c3 - s1 * c2 * s3;

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
		// axis have to be normalized

		var halfAngle = angle / 2,
			s = Math.sin( halfAngle );

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos( halfAngle );

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// Adapted from: http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		function copySign( a, b ) {

			return b < 0 ? -Math.abs( a ) : Math.abs( a );

		}

		var absQ = Math.pow( m.determinant(), 1.0 / 3.0 );
		this.w = Math.sqrt( Math.max( 0, absQ + m.elements[0] + m.elements[5] + m.elements[10] ) ) / 2;
		this.x = Math.sqrt( Math.max( 0, absQ + m.elements[0] - m.elements[5] - m.elements[10] ) ) / 2;
		this.y = Math.sqrt( Math.max( 0, absQ - m.elements[0] + m.elements[5] - m.elements[10] ) ) / 2;
		this.z = Math.sqrt( Math.max( 0, absQ - m.elements[0] - m.elements[5] + m.elements[10] ) ) / 2;
		this.x = copySign( this.x, ( m.elements[6] - m.elements[9] ) );
		this.y = copySign( this.y, ( m.elements[8] - m.elements[2] ) );
		this.z = copySign( this.z, ( m.elements[1] - m.elements[4] ) );
		this.normalize();

		return this;

	},

	calculateW : function () {

		this.w = - Math.sqrt( Math.abs( 1.0 - this.x * this.x - this.y * this.y - this.z * this.z ) );

		return this;

	},

	inverse: function () {

		this.x *= -1;
		this.y *= -1;
		this.z *= -1;

		return this;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	normalize: function () {

		var l = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

		if ( l === 0 ) {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;

		} else {

			l = 1 / l;

			this.x = this.x * l;
			this.y = this.y * l;
			this.z = this.z * l;
			this.w = this.w * l;

		}

		return this;

	},

	multiply: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		this.x =  a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
		this.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
		this.z =  a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
		this.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;

		return this;

	},

	multiplySelf: function ( b ) {

		var qax = this.x, qay = this.y, qaz = this.z, qaw = this.w,
		qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		return this;

	},

	multiplyVector3: function ( vector, dest ) {

		if ( !dest ) { dest = vector; }

		var x    = vector.x,  y  = vector.y,  z  = vector.z,
			qx   = this.x, qy = this.y, qz = this.z, qw = this.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y,
			iy =  qw * y + qz * x - qx * z,
			iz =  qw * z + qx * y - qy * x,
			iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		dest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		dest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		dest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return dest;

	},

	clone: function () {

		return new THREE.Quaternion( this.x, this.y, this.z, this.w );

	}

}

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

	var cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;

	if (cosHalfTheta < 0) {
		qm.w = -qb.w; qm.x = -qb.x; qm.y = -qb.y; qm.z = -qb.z;
		cosHalfTheta = -cosHalfTheta;
	} else {
		qm.copy(qb);
	}

	if ( Math.abs( cosHalfTheta ) >= 1.0 ) {

		qm.w = qa.w; qm.x = qa.x; qm.y = qa.y; qm.z = qa.z;
		return qm;

	}

	var halfTheta = Math.acos( cosHalfTheta ),
	sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

	if ( Math.abs( sinHalfTheta ) < 0.001 ) {

		qm.w = 0.5 * ( qa.w + qb.w );
		qm.x = 0.5 * ( qa.x + qb.x );
		qm.y = 0.5 * ( qa.y + qb.y );
		qm.z = 0.5 * ( qa.z + qb.z );

		return qm;

	}

	var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
	ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

	qm.w = ( qa.w * ratioA + qm.w * ratioB );
	qm.x = ( qa.x * ratioA + qm.x * ratioB );
	qm.y = ( qa.y * ratioA + qm.y * ratioB );
	qm.z = ( qa.z * ratioA + qm.z * ratioB );

	return qm;

}
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Vertex = function ( position ) {

	this.position = position || new THREE.Vector3();

};

THREE.Vertex.prototype = {

	constructor: THREE.Vertex,

	clone: function () {

		return new THREE.Vertex( this.position.clone() );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals = normal instanceof Array ? normal : [ ];

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.vertexTangents = [];

	this.materialIndex = materialIndex;

	this.centroid = new THREE.Vector3();

};

THREE.Face3.prototype = {

	constructor: THREE.Face3,

	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c );

		face.normal.copy( this.normal );
		face.color.copy( this.color );
		face.centroid.copy( this.centroid );

		face.materialIndex = this.materialIndex;

		var i, il;
		for ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();
		for ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();
		for ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		return face;

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals = normal instanceof Array ? normal : [ ];

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.vertexTangents = [];

	this.materialIndex = materialIndex;

	this.centroid = new THREE.Vector3();

};

THREE.Face4.prototype = {

	constructor: THREE.Face4,

	clone: function () {

		var face = new THREE.Face4( this.a, this.b, this.c, this.d );

		face.normal.copy( this.normal );
		face.color.copy( this.color );
		face.centroid.copy( this.centroid );

		face.materialIndex = this.materialIndex;

		var i, il;
		for ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();
		for ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();
		for ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		return face;

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.UV = function ( u, v ) {

	this.u = u || 0;
	this.v = v || 0;

};

THREE.UV.prototype = {

	constructor: THREE.UV,

	set: function ( u, v ) {

		this.u = u;
		this.v = v;

		return this;

	},

	copy: function ( uv ) {

		this.u = uv.u;
		this.v = uv.v;

		return this;

	},

	lerpSelf: function ( uv, alpha ) {

		this.u += ( uv.u - this.u ) * alpha;
		this.v += ( uv.v - this.v ) * alpha;

		return this;

	},

	clone: function () {

		return new THREE.UV( this.u, this.v );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Geometry = function () {

	this.id = THREE.GeometryCount ++;

	this.vertices = [];
	this.colors = []; // one-to-one vertex colors, used in ParticleSystem, Line and Ribbon

	this.materials = [];

	this.faces = [];

	this.faceUvs = [[]];
	this.faceVertexUvs = [[]];

	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];

	this.skinWeights = [];
	this.skinIndices = [];

	this.boundingBox = null;
	this.boundingSphere = null;

	this.hasTangents = false;

	this.dynamic = false; // unless set to true the *Arrays will be deleted once sent to a buffer.

};

THREE.Geometry.prototype = {

	constructor : THREE.Geometry,

	applyMatrix: function ( matrix ) {

		var matrixRotation = new THREE.Matrix4();
		matrixRotation.extractRotation( matrix );

		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

			var vertex = this.vertices[ i ];

			matrix.multiplyVector3( vertex.position );

		}

		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

			var face = this.faces[ i ];

			matrixRotation.multiplyVector3( face.normal );

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				matrixRotation.multiplyVector3( face.vertexNormals[ j ] );

			}

			matrix.multiplyVector3( face.centroid );

		}

	},

	computeCentroids: function () {

		var f, fl, face;

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			face.centroid.set( 0, 0, 0 );

			if ( face instanceof THREE.Face3 ) {

				face.centroid.addSelf( this.vertices[ face.a ].position );
				face.centroid.addSelf( this.vertices[ face.b ].position );
				face.centroid.addSelf( this.vertices[ face.c ].position );
				face.centroid.divideScalar( 3 );

			} else if ( face instanceof THREE.Face4 ) {

				face.centroid.addSelf( this.vertices[ face.a ].position );
				face.centroid.addSelf( this.vertices[ face.b ].position );
				face.centroid.addSelf( this.vertices[ face.c ].position );
				face.centroid.addSelf( this.vertices[ face.d ].position );
				face.centroid.divideScalar( 4 );

			}

		}

	},

	computeFaceNormals: function () {

		var n, nl, v, vl, vertex, f, fl, face, vA, vB, vC,
		cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			vA = this.vertices[ face.a ];
			vB = this.vertices[ face.b ];
			vC = this.vertices[ face.c ];

			cb.sub( vC.position, vB.position );
			ab.sub( vA.position, vB.position );
			cb.crossSelf( ab );

			if ( !cb.isZero() ) {

				cb.normalize();

			}

			face.normal.copy( cb );

		}

	},

	computeVertexNormals: function () {

		var v, vl, f, fl, face, vertices;

		// create internal buffers for reuse when calling this method repeatedly
		// (otherwise memory allocation / deallocation every frame is big resource hog)

		if ( this.__tmpVertices === undefined ) {

			this.__tmpVertices = new Array( this.vertices.length );
			vertices = this.__tmpVertices;

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ] = new THREE.Vector3();

			}

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				if ( face instanceof THREE.Face3 ) {

					face.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

				} else if ( face instanceof THREE.Face4 ) {

					face.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

				}

			}

		} else {

			vertices = this.__tmpVertices;

			for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

				vertices[ v ].set( 0, 0, 0 );

			}

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( face instanceof THREE.Face3 ) {

				vertices[ face.a ].addSelf( face.normal );
				vertices[ face.b ].addSelf( face.normal );
				vertices[ face.c ].addSelf( face.normal );

			} else if ( face instanceof THREE.Face4 ) {

				vertices[ face.a ].addSelf( face.normal );
				vertices[ face.b ].addSelf( face.normal );
				vertices[ face.c ].addSelf( face.normal );
				vertices[ face.d ].addSelf( face.normal );

			}

		}

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( face instanceof THREE.Face3 ) {

				face.vertexNormals[ 0 ].copy( vertices[ face.a ] );
				face.vertexNormals[ 1 ].copy( vertices[ face.b ] );
				face.vertexNormals[ 2 ].copy( vertices[ face.c ] );

			} else if ( face instanceof THREE.Face4 ) {

				face.vertexNormals[ 0 ].copy( vertices[ face.a ] );
				face.vertexNormals[ 1 ].copy( vertices[ face.b ] );
				face.vertexNormals[ 2 ].copy( vertices[ face.c ] );
				face.vertexNormals[ 3 ].copy( vertices[ face.d ] );

			}

		}

	},

	computeMorphNormals: function () {

		var i, il, f, fl, face;

		// save original normals
		// - create temp variables on first access
		//   otherwise just copy (for faster repeated calls)

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph

		var tmpGeo = new THREE.Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					face = this.faces[ f ];

					faceNormal = new THREE.Vector3();

					if ( face instanceof THREE.Face3 ) {

						vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

					} else {

						vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3() };

					}

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals

			var faceNormal, vertexNormals;

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				if ( face instanceof THREE.Face3 ) {

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );

				} else {

					vertexNormals.a.copy( face.vertexNormals[ 0 ] );
					vertexNormals.b.copy( face.vertexNormals[ 1 ] );
					vertexNormals.c.copy( face.vertexNormals[ 2 ] );
					vertexNormals.d.copy( face.vertexNormals[ 3 ] );

				}

			}

		}

		// restore original normals

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// tangents go to vertices

		var f, fl, v, vl, i, il, vertexIndex,
			face, uv, vA, vB, vC, uvA, uvB, uvC,
			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r, t, test,
			tan1 = [], tan2 = [],
			sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
			tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
			n = new THREE.Vector3(), w;

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			tan1[ v ] = new THREE.Vector3();
			tan2[ v ] = new THREE.Vector3();

		}

		function handleTriangle( context, a, b, c, ua, ub, uc ) {

			vA = context.vertices[ a ].position;
			vB = context.vertices[ b ].position;
			vC = context.vertices[ c ].position;

			uvA = uv[ ua ];
			uvB = uv[ ub ];
			uvC = uv[ uc ];

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;
			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;
			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.u - uvA.u;
			s2 = uvC.u - uvA.u;
			t1 = uvB.v - uvA.v;
			t2 = uvC.v - uvA.v;

			r = 1.0 / ( s1 * t2 - s2 * t1 );
			sdir.set( ( t2 * x1 - t1 * x2 ) * r,
					  ( t2 * y1 - t1 * y2 ) * r,
					  ( t2 * z1 - t1 * z2 ) * r );
			tdir.set( ( s1 * x2 - s2 * x1 ) * r,
					  ( s1 * y2 - s2 * y1 ) * r,
					  ( s1 * z2 - s2 * z1 ) * r );

			tan1[ a ].addSelf( sdir );
			tan1[ b ].addSelf( sdir );
			tan1[ c ].addSelf( sdir );

			tan2[ a ].addSelf( tdir );
			tan2[ b ].addSelf( tdir );
			tan2[ c ].addSelf( tdir );

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			uv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents

			if ( face instanceof THREE.Face3 ) {

				handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );

			} else if ( face instanceof THREE.Face4 ) {

				handleTriangle( this, face.a, face.b, face.d, 0, 1, 3 );
				handleTriangle( this, face.b, face.c, face.d, 1, 2, 3 );

			}

		}

		var faceIndex = [ 'a', 'b', 'c', 'd' ];

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			for ( i = 0; i < face.vertexNormals.length; i++ ) {

				n.copy( face.vertexNormals[ i ] );

				vertexIndex = face[ faceIndex[ i ] ];

				t = tan1[ vertexIndex ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.subSelf( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness

				tmp2.cross( face.vertexNormals[ i ], t );
				test = tmp2.dot( tan2[ vertexIndex ] );
				w = (test < 0.0) ? -1.0 : 1.0;

				face.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );

			}

		}

		this.hasTangents = true;

	},

	computeBoundingBox: function () {

		if ( ! this.boundingBox ) {

			this.boundingBox = { min: new THREE.Vector3(), max: new THREE.Vector3() };

		}

		if ( this.vertices.length > 0 ) {

			var position, firstPosition = this.vertices[ 0 ].position;

			this.boundingBox.min.copy( firstPosition );
			this.boundingBox.max.copy( firstPosition );

			var min = this.boundingBox.min,
				max = this.boundingBox.max;

			for ( var v = 1, vl = this.vertices.length; v < vl; v ++ ) {

				position = this.vertices[ v ].position;

				if ( position.x < min.x ) {

					min.x = position.x;

				} else if ( position.x > max.x ) {

					max.x = position.x;

				}

				if ( position.y < min.y ) {

					min.y = position.y;

				} else if ( position.y > max.y ) {

					max.y = position.y;

				}

				if ( position.z < min.z ) {

					min.z = position.z;

				} else if ( position.z > max.z ) {

					max.z = position.z;

				}

			}

		} else {

			this.boundingBox.min.set( 0, 0, 0 );
			this.boundingBox.max.set( 0, 0, 0 );

		}

	},

	computeBoundingSphere: function () {

		if ( ! this.boundingSphere ) this.boundingSphere = { radius: 0 };

		var radius, maxRadius = 0;

		for ( var v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			radius = this.vertices[ v ].position.length();
			if ( radius > maxRadius ) maxRadius = radius;

		}

		this.boundingSphere.radius = maxRadius;

	},

	/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */

	mergeVertices: function() {

		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ].position;
			key = [ Math.round( v.x * precision ), Math.round( v.y * precision ), Math.round( v.z * precision ) ].join( '_' );

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// Start to patch face indices

		for( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			if ( face instanceof THREE.Face3 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];

			} else if ( face instanceof THREE.Face4 ) {

				face.a = changes[ face.a ];
				face.b = changes[ face.b ];
				face.c = changes[ face.c ];
				face.d = changes[ face.d ];

			}

		}

		// Use unique set of vertices

		this.vertices = unique;

	}

};

THREE.GeometryCount = 0;
/**
 * Spline from Tween.js, slightly optimized (and trashed)
 * http://sole.github.com/tween.js/examples/05_spline.html
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Spline = function ( points ) {

	this.points = points;

	var c = [], v3 = { x: 0, y: 0, z: 0 },
	point, intPoint, weight, w2, w3,
	pa, pb, pc, pd;

	this.initFromArray = function( a ) {

		this.points = [];

		for ( var i = 0; i < a.length; i++ ) {

			this.points[ i ] = { x: a[ i ][ 0 ], y: a[ i ][ 1 ], z: a[ i ][ 2 ] };

		}

	};

	this.getPoint = function ( k ) {

		point = ( this.points.length - 1 ) * k;
		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint  > this.points.length - 2 ? this.points.length - 1 : intPoint + 1;
		c[ 3 ] = intPoint  > this.points.length - 3 ? this.points.length - 1 : intPoint + 2;

		pa = this.points[ c[ 0 ] ];
		pb = this.points[ c[ 1 ] ];
		pc = this.points[ c[ 2 ] ];
		pd = this.points[ c[ 3 ] ];

		w2 = weight * weight;
		w3 = weight * w2;

		v3.x = interpolate( pa.x, pb.x, pc.x, pd.x, weight, w2, w3 );
		v3.y = interpolate( pa.y, pb.y, pc.y, pd.y, weight, w2, w3 );
		v3.z = interpolate( pa.z, pb.z, pc.z, pd.z, weight, w2, w3 );

		return v3;

	};

	this.getControlPointsArray = function () {

		var i, p, l = this.points.length,
			coords = [];

		for ( i = 0; i < l; i ++ ) {

			p = this.points[ i ];
			coords[ i ] = [ p.x, p.y, p.z ];

		}

		return coords;

	};

	// approximate length by summing linear segments

	this.getLength = function ( nSubDivisions ) {

		var i, index, nSamples, position,
			point = 0, intPoint = 0, oldIntPoint = 0,
			oldPosition = new THREE.Vector3(),
			tmpVec = new THREE.Vector3(),
			chunkLengths = [],
			totalLength = 0;

		// first point has 0 length

		chunkLengths[ 0 ] = 0;

		if ( !nSubDivisions ) nSubDivisions = 100;

		nSamples = this.points.length * nSubDivisions;

		oldPosition.copy( this.points[ 0 ] );

		for ( i = 1; i < nSamples; i ++ ) {

			index = i / nSamples;

			position = this.getPoint( index );
			tmpVec.copy( position );

			totalLength += tmpVec.distanceTo( oldPosition );

			oldPosition.copy( position );

			point = ( this.points.length - 1 ) * index;
			intPoint = Math.floor( point );

			if ( intPoint != oldIntPoint ) {

				chunkLengths[ intPoint ] = totalLength;
				oldIntPoint = intPoint;

			}

		}

		// last point ends with total length

		chunkLengths[ chunkLengths.length ] = totalLength;

		return { chunks: chunkLengths, total: totalLength };

	};

	this.reparametrizeByArcLength = function ( samplingCoef ) {

		var i, j,
			index, indexCurrent, indexNext,
			linearDistance, realDistance,
			sampling, position,
			newpoints = [],
			tmpVec = new THREE.Vector3(),
			sl = this.getLength();

		newpoints.push( tmpVec.copy( this.points[ 0 ] ).clone() );

		for ( i = 1; i < this.points.length; i++ ) {

			//tmpVec.copy( this.points[ i - 1 ] );
			//linearDistance = tmpVec.distanceTo( this.points[ i ] );

			realDistance = sl.chunks[ i ] - sl.chunks[ i - 1 ];

			sampling = Math.ceil( samplingCoef * realDistance / sl.total );

			indexCurrent = ( i - 1 ) / ( this.points.length - 1 );
			indexNext = i / ( this.points.length - 1 );

			for ( j = 1; j < sampling - 1; j++ ) {

				index = indexCurrent + j * ( 1 / sampling ) * ( indexNext - indexCurrent );

				position = this.getPoint( index );
				newpoints.push( tmpVec.copy( position ).clone() );

			}

			newpoints.push( tmpVec.copy( this.points[ i ] ).clone() );

		}

		this.points = newpoints;

	};

	// Catmull-Rom

	function interpolate( p0, p1, p2, p3, t, t2, t3 ) {

		var v0 = ( p2 - p0 ) * 0.5,
			v1 = ( p3 - p1 ) * 0.5;

		return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	};

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Camera = function () {

	THREE.Object3D.call( this );

	this.matrixWorldInverse = new THREE.Matrix4();

	this.projectionMatrix = new THREE.Matrix4();
	this.projectionMatrixInverse = new THREE.Matrix4();

};

THREE.Camera.prototype = new THREE.Object3D();
THREE.Camera.prototype.constructor = THREE.Camera;

THREE.Camera.prototype.lookAt = function ( vector ) {

	// TODO: Add hierarchy support.

	this.matrix.lookAt( this.position, vector, this.up );

	if ( this.rotationAutoUpdate ) {

		this.rotation.getRotationFromMatrix( this.matrix );

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

	THREE.Camera.call( this );

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.near = ( near !== undefined ) ? near : 0.1;
	this.far = ( far !== undefined ) ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.OrthographicCamera.prototype = new THREE.Camera();
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera;

THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

	this.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {

	THREE.Camera.call( this );

	this.fov = fov !== undefined ? fov : 50;
	this.aspect = aspect !== undefined ? aspect : 1;
	this.near = near !== undefined ? near : 0.1;
	this.far = far !== undefined ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.PerspectiveCamera.prototype = new THREE.Camera();
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera;


/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 */

THREE.PerspectiveCamera.prototype.setLens = function ( focalLength, frameHeight ) {

	frameHeight = frameHeight !== undefined ? frameHeight : 24;

	this.fov = 2 * Math.atan( frameHeight / ( focalLength * 2 ) ) * ( 180 / Math.PI );
	this.updateProjectionMatrix();

}


/**
 * Sets an offset in a larger frustum. This is useful for multi-window or
 * multi-monitor/multi-machine setups.
 *
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
 * the monitors are in grid like this
 *
 *   +---+---+---+
 *   | A | B | C |
 *   +---+---+---+
 *   | D | E | F |
 *   +---+---+---+
 *
 * then for each monitor you would call it like this
 *
 *   var w = 1920;
 *   var h = 1080;
 *   var fullWidth = w * 3;
 *   var fullHeight = h * 2;
 *
 *   --A--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
 *   --B--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
 *   --C--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
 *   --D--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
 *   --E--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
 *   --F--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
 *
 *   Note there is no reason monitors have to be the same size or in a grid.
 */

THREE.PerspectiveCamera.prototype.setViewOffset = function ( fullWidth, fullHeight, x, y, width, height ) {

	this.fullWidth = fullWidth;
	this.fullHeight = fullHeight;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.updateProjectionMatrix();

};


THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {

	if ( this.fullWidth ) {

		var aspect = this.fullWidth / this.fullHeight;
		var top = Math.tan( this.fov * Math.PI / 360 ) * this.near;
		var bottom = -top;
		var left = aspect * bottom;
		var right = aspect * top;
		var width = Math.abs( right - left );
		var height = Math.abs( top - bottom );

		this.projectionMatrix.makeFrustum(
			left + this.x * width / this.fullWidth,
			left + ( this.x + this.width ) * width / this.fullWidth,
			top - ( this.y + this.height ) * height / this.fullHeight,
			top - this.y * height / this.fullHeight,
			this.near,
			this.far
		);

	} else {

		this.projectionMatrix.makePerspective( this.fov, this.aspect, this.near, this.far );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
 
THREE.Light = function ( hex ) {

	THREE.Object3D.call( this );

	this.color = new THREE.Color( hex );

};

THREE.Light.prototype = new THREE.Object3D();
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.AmbientLight = function ( hex ) {

	THREE.Light.call( this, hex );

};

THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight; 
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DirectionalLight = function ( hex, intensity, distance ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;

	this.shadowCameraLeft = -500;
	this.shadowCameraRight = 500;
	this.shadowCameraTop = 500;
	this.shadowCameraBottom = -500;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowCascade = false;

	this.shadowCascadeOffset = new THREE.Vector3( 0, 0, -1000 );
	this.shadowCascadeCount = 2;

	this.shadowCascadeBias = [ 0, 0, 0 ];
	this.shadowCascadeWidth = [ 512, 512, 512 ];
	this.shadowCascadeHeight = [ 512, 512, 512 ];

	this.shadowCascadeNearZ = [ -1.000, 0.990, 0.998 ];
	this.shadowCascadeFarZ  = [  0.990, 0.998, 1.000 ];

	this.shadowCascadeArray = [];

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.PointLight = function ( hex, intensity, distance ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 0, 0 );
	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;

};

THREE.PointLight.prototype = new THREE.Light();
THREE.PointLight.prototype.constructor = THREE.PointLight;
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpotLight = function ( hex, intensity, distance ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;
	this.shadowCameraFov = 50;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.SpotLight.prototype = new THREE.Light();
THREE.SpotLight.prototype.constructor = THREE.SpotLight;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Material = function ( parameters ) {

	parameters = parameters || {};

	this.id = THREE.MaterialCount ++;

	this.name = '';

	this.opacity = parameters.opacity !== undefined ? parameters.opacity : 1;
	this.transparent = parameters.transparent !== undefined ? parameters.transparent : false;

	this.blending = parameters.blending !== undefined ? parameters.blending : THREE.NormalBlending;

	this.blendSrc = parameters.blendSrc !== undefined ? parameters.blendSrc : THREE.SrcAlphaFactor;
	this.blendDst = parameters.blendDst !== undefined ? parameters.blendDst : THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = parameters.blendEquation !== undefined ? parameters.blendEquation : THREE.AddEquation;

	this.depthTest = parameters.depthTest !== undefined ? parameters.depthTest : true;
	this.depthWrite = parameters.depthWrite !== undefined ? parameters.depthWrite : true;

	this.polygonOffset = parameters.polygonOffset !== undefined ? parameters.polygonOffset : false;
	this.polygonOffsetFactor = parameters.polygonOffsetFactor !== undefined ? parameters.polygonOffsetFactor : 0;
	this.polygonOffsetUnits = parameters.polygonOffsetUnits !== undefined ? parameters.polygonOffsetUnits : 0;

	this.alphaTest = parameters.alphaTest !== undefined ? parameters.alphaTest : 0;

	this.overdraw = parameters.overdraw !== undefined ? parameters.overdraw : false; // Boolean for fixing antialiasing gaps in CanvasRenderer

	this.needsUpdate = true;

}

THREE.MaterialCount = 0;

// shading

THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;

// colors

THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;

// blending modes

THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.AdditiveAlphaBlending = 5;
THREE.CustomBlending = 6;

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)

THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;

// custom blending destination factors

THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;

// custom blending source factors

//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;

/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

THREE.LineBasicMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );

	this.linewidth = parameters.linewidth !== undefined ? parameters.linewidth : 1;
	this.linecap = parameters.linecap !== undefined ? parameters.linecap : 'round';
	this.linejoin = parameters.linejoin !== undefined ? parameters.linejoin : 'round';

	this.vertexColors = parameters.vertexColors ? parameters.vertexColors : false;

	this.fog = parameters.fog !== undefined ? parameters.fog : true;

};

THREE.LineBasicMaterial.prototype = new THREE.Material();
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshBasicMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	// color property represents emissive for MeshBasicMaterial

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );

	this.map = parameters.map !== undefined ? parameters.map : null;

	this.lightMap = parameters.lightMap !== undefined ? parameters.lightMap : null;

	this.envMap = parameters.envMap !== undefined ? parameters.envMap : null;
	this.combine = parameters.combine !== undefined ? parameters.combine : THREE.MultiplyOperation;
	this.reflectivity = parameters.reflectivity !== undefined ? parameters.reflectivity : 1;
	this.refractionRatio = parameters.refractionRatio !== undefined ? parameters.refractionRatio : 0.98;

	this.fog = parameters.fog !== undefined ? parameters.fog : true;

	this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading;

	this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;
	this.wireframeLinecap = parameters.wireframeLinecap !== undefined ? parameters.wireframeLinecap : 'round';
	this.wireframeLinejoin = parameters.wireframeLinejoin !== undefined ? parameters.wireframeLinejoin : 'round';

	this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : THREE.NoColors;

	this.skinning = parameters.skinning !== undefined ? parameters.skinning : false;
	this.morphTargets = parameters.morphTargets !== undefined ? parameters.morphTargets : false;

};

THREE.MeshBasicMaterial.prototype = new THREE.Material();
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshLambertMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	// color property represents diffuse for MeshLambertMaterial

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );
	this.ambient = parameters.ambient !== undefined ? new THREE.Color( parameters.ambient ) : new THREE.Color( 0xffffff );
	this.emissive = parameters.emissive !== undefined ? new THREE.Color( parameters.emissive ) : new THREE.Color( 0x000000 );

	this.wrapAround = parameters.wrapAround !== undefined ? parameters.wrapAround: false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = parameters.map !== undefined ? parameters.map : null;

	this.lightMap = parameters.lightMap !== undefined ? parameters.lightMap : null;

	this.envMap = parameters.envMap !== undefined ? parameters.envMap : null;
	this.combine = parameters.combine !== undefined ? parameters.combine : THREE.MultiplyOperation;
	this.reflectivity = parameters.reflectivity !== undefined ? parameters.reflectivity : 1;
	this.refractionRatio = parameters.refractionRatio !== undefined ? parameters.refractionRatio : 0.98;

	this.fog = parameters.fog !== undefined ? parameters.fog : true;

	this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading;

	this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;
	this.wireframeLinecap = parameters.wireframeLinecap !== undefined ? parameters.wireframeLinecap : 'round';
	this.wireframeLinejoin = parameters.wireframeLinejoin !== undefined ? parameters.wireframeLinejoin : 'round';

	this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : THREE.NoColors;

	this.skinning = parameters.skinning !== undefined ? parameters.skinning : false;
	this.morphTargets = parameters.morphTargets !== undefined ? parameters.morphTargets : false;
	this.morphNormals = parameters.morphNormals !== undefined ? parameters.morphNormals : false;

};

THREE.MeshLambertMaterial.prototype = new THREE.Material();
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshPhongMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	// color property represents diffuse for MeshPhongMaterial

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );
	this.ambient = parameters.ambient !== undefined ? new THREE.Color( parameters.ambient ) : new THREE.Color( 0xffffff );
	this.emissive = parameters.emissive !== undefined ? new THREE.Color( parameters.emissive ) : new THREE.Color( 0x000000 );
	this.specular = parameters.specular !== undefined ? new THREE.Color( parameters.specular ) : new THREE.Color( 0x111111 );
	this.shininess = parameters.shininess !== undefined ? parameters.shininess : 30;

	this.metal = parameters.metal !== undefined ? parameters.metal : false;
	this.perPixel = parameters.perPixel !== undefined ? parameters.perPixel : false;

	this.wrapAround = parameters.wrapAround !== undefined ? parameters.wrapAround: false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = parameters.map !== undefined ? parameters.map : null;

	this.lightMap = parameters.lightMap !== undefined ? parameters.lightMap : null;

	this.envMap = parameters.envMap !== undefined ? parameters.envMap : null;
	this.combine = parameters.combine !== undefined ? parameters.combine : THREE.MultiplyOperation;
	this.reflectivity = parameters.reflectivity !== undefined ? parameters.reflectivity : 1;
	this.refractionRatio = parameters.refractionRatio !== undefined ? parameters.refractionRatio : 0.98;

	this.fog = parameters.fog !== undefined ? parameters.fog : true;

	this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading;

	this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;
	this.wireframeLinecap = parameters.wireframeLinecap !== undefined ? parameters.wireframeLinecap : 'round';
	this.wireframeLinejoin = parameters.wireframeLinejoin !== undefined ? parameters.wireframeLinejoin : 'round';

	this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : THREE.NoColors;

	this.skinning = parameters.skinning !== undefined ? parameters.skinning : false;
	this.morphTargets = parameters.morphTargets !== undefined ? parameters.morphTargets : false;
	this.morphNormals = parameters.morphNormals !== undefined ? parameters.morphNormals : false;

};

THREE.MeshPhongMaterial.prototype = new THREE.Material();
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  opacity: <float>,
 
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * } 
 */

THREE.MeshDepthMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading; // doesn't really apply here, normals are not used

	this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;

};

THREE.MeshDepthMaterial.prototype = new THREE.Material();
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 *
 * parameters = {
 *  opacity: <float>,
 
 *  shading: THREE.FlatShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

THREE.MeshNormalMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	this.shading = parameters.shading ? parameters.shading : THREE.FlatShading;

	this.wireframe = parameters.wireframe ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth ? parameters.wireframeLinewidth : 1;

};

THREE.MeshNormalMaterial.prototype = new THREE.Material();
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MeshFaceMaterial = function () {

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  vertexColors: <bool>,
 *
 *  fog: <bool>
 * }
 */

THREE.ParticleBasicMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	this.color = parameters.color !== undefined ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );

	this.map = parameters.map !== undefined ? parameters.map : null;

	this.size = parameters.size !== undefined ? parameters.size : 1;
	this.sizeAttenuation = parameters.sizeAttenuation !== undefined ? parameters.sizeAttenuation : true;

	this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : false;

	this.fog = parameters.fog !== undefined ? parameters.fog : true;

};

THREE.ParticleBasicMaterial.prototype = new THREE.Material();
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.ShaderMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	parameters = parameters || {};

	this.fragmentShader = parameters.fragmentShader !== undefined ? parameters.fragmentShader : "void main() {}";
	this.vertexShader = parameters.vertexShader !== undefined ? parameters.vertexShader : "void main() {}";
	this.uniforms = parameters.uniforms !== undefined ? parameters.uniforms : {};
	this.attributes = parameters.attributes;

	this.shading = parameters.shading !== undefined ? parameters.shading : THREE.SmoothShading;

	this.wireframe = parameters.wireframe !== undefined ? parameters.wireframe : false;
	this.wireframeLinewidth = parameters.wireframeLinewidth !== undefined ? parameters.wireframeLinewidth : 1;

	this.fog = parameters.fog !== undefined ? parameters.fog : false; // set to use scene fog

	this.lights = parameters.lights !== undefined ? parameters.lights : false; // set to use scene lights

	this.vertexColors = parameters.vertexColors !== undefined ? parameters.vertexColors : THREE.NoColors; // set to use "color" attribute stream

	this.skinning = parameters.skinning !== undefined ? parameters.skinning : false; // set to use skinning attribute streams

	this.morphTargets = parameters.morphTargets !== undefined ? parameters.morphTargets : false; // set to use morph targets
	this.morphNormals = parameters.morphNormals !== undefined ? parameters.morphNormals : false; // set to use morph normals

};

THREE.ShaderMaterial.prototype = new THREE.Material();
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type ) {

	this.id = THREE.TextureCount ++;

	this.image = image;

	this.mapping = mapping !== undefined ? mapping : new THREE.UVMapping();

	this.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;
	this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;

	this.format = format !== undefined ? format : THREE.RGBAFormat;
	this.type = type !== undefined ? type : THREE.UnsignedByteType;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.generateMipmaps = true;
	this.premultiplyAlpha = false;

	this.needsUpdate = false;
	this.onUpdate = null;

};

THREE.Texture.prototype = {

	constructor: THREE.Texture,

	clone: function () {

		var clonedTexture = new THREE.Texture( this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter, this.format, this.type );

		clonedTexture.offset.copy( this.offset );
		clonedTexture.repeat.copy( this.repeat );

		return clonedTexture;

	}

};

THREE.TextureCount = 0;

THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;

// Mapping modes

THREE.UVMapping = function () {};

THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};

THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};

// Wrapping modes

THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;

// Filters

THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;

// Types

THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;

// Formats

THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type );

	this.image = { data: data, width: width, height: height };

};

THREE.DataTexture.prototype = new THREE.Texture();
THREE.DataTexture.prototype.constructor = THREE.DataTexture;

THREE.DataTexture.prototype.clone = function () {

	var clonedTexture = new THREE.DataTexture( this.image.data,  this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter );

	clonedTexture.offset.copy( this.offset );
	clonedTexture.repeat.copy( this.repeat );

	return clonedTexture;

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Particle = function ( material ) {

	THREE.Object3D.call( this );

	this.material = material;

};

THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ParticleSystem = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.ParticleBasicMaterial( { color: Math.random() * 0xffffff } );

	this.sortParticles = false;

	if ( this.geometry ) {

		// calc bound radius

		if( !this.geometry.boundingSphere ) {

			this.geometry.computeBoundingSphere();

		}

		this.boundRadius = geometry.boundingSphere.radius;

	}

	this.frustumCulled = false;

};

THREE.ParticleSystem.prototype = new THREE.Object3D();
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Line = function ( geometry, material, type ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );
	this.type = ( type !== undefined ) ? type : THREE.LineStrip;

	if ( this.geometry ) {

		if ( ! this.geometry.boundingSphere ) {

			this.geometry.computeBoundingSphere();

		}

	}

};

THREE.LineStrip = 0;
THREE.LinePieces = 1;

THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Mesh = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = ( material !== undefined ) ? material : new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

	if ( this.geometry ) {

		// calc bound radius

		if( ! this.geometry.boundingSphere ) {

			this.geometry.computeBoundingSphere();

		}

		this.boundRadius = geometry.boundingSphere.radius;


		// setup morph targets

		if( this.geometry.morphTargets.length ) {

			this.morphTargetBase = -1;
			this.morphTargetForcedOrder = [];
			this.morphTargetInfluences = [];
			this.morphTargetDictionary = {};

			for( var m = 0; m < this.geometry.morphTargets.length; m ++ ) {

				this.morphTargetInfluences.push( 0 );
				this.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;

			}

		}

	}

}

THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;


/*
 * Get Morph Target Index by Name
 */

THREE.Mesh.prototype.getMorphTargetIndexByName = function( name ) {

	if ( this.morphTargetDictionary[ name ] !== undefined ) {

		return this.morphTargetDictionary[ name ];
	}

	console.log( "THREE.Mesh.getMorphTargetIndexByName: morph target " + name + " does not exist. Returning 0." );
	return 0;

}
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Bone = function( belongsToSkin ) {

	THREE.Object3D.call( this );

	this.skin = belongsToSkin;
	this.skinMatrix = new THREE.Matrix4();

};

THREE.Bone.prototype = new THREE.Object3D();
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;


THREE.Bone.prototype.update = function( parentSkinMatrix, forceUpdate ) {

	// update local

	if ( this.matrixAutoUpdate ) {

		forceUpdate |= this.updateMatrix();

	}

	// update skin matrix

	if ( forceUpdate || this.matrixWorldNeedsUpdate ) {

		if( parentSkinMatrix ) {

			this.skinMatrix.multiply( parentSkinMatrix, this.matrix );

		} else {

			this.skinMatrix.copy( this.matrix );

		}

		this.matrixWorldNeedsUpdate = false;
		forceUpdate = true;

	}

	// update children

	var child, i, l = this.children.length;

	for ( i = 0; i < l; i ++ ) {

		this.children[ i ].update( this.skinMatrix, forceUpdate );

	}

};

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SkinnedMesh = function ( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	// init bones

	this.identityMatrix = new THREE.Matrix4();

	this.bones = [];
	this.boneMatrices = [];

	var b, bone, gbone, p, q, s;

	if ( this.geometry.bones !== undefined ) {

		for ( b = 0; b < this.geometry.bones.length; b ++ ) {

			gbone = this.geometry.bones[ b ];

			p = gbone.pos;
			q = gbone.rotq;
			s = gbone.scl;

			bone = this.addBone();

			bone.name = gbone.name;
			bone.position.set( p[0], p[1], p[2] );
			bone.quaternion.set( q[0], q[1], q[2], q[3] );
			bone.useQuaternion = true;

			if ( s !== undefined ) {

				bone.scale.set( s[0], s[1], s[2] );

			} else {

				bone.scale.set( 1, 1, 1 );

			}

		}

		for ( b = 0; b < this.bones.length; b ++ ) {

			gbone = this.geometry.bones[ b ];
			bone = this.bones[ b ];

			if ( gbone.parent === -1 ) {

				this.add( bone );

			} else {

				this.bones[ gbone.parent ].add( bone );

			}

		}

		this.boneMatrices = new Float32Array( 16 * this.bones.length );

		this.pose();

	}

};

THREE.SkinnedMesh.prototype = new THREE.Mesh();
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;

THREE.SkinnedMesh.prototype.addBone = function( bone ) {

	if ( bone === undefined ) {

		bone = new THREE.Bone( this );

	}

	this.bones.push( bone );

	return bone;

};

THREE.SkinnedMesh.prototype.updateMatrixWorld = function ( force ) {

	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

		} else {

			this.matrixWorld.copy( this.matrix );

		}

		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		var child = this.children[ i ];

		if ( child instanceof THREE.Bone ) {

			child.update( this.identityMatrix, false );

		} else {

			child.updateMatrixWorld( true );

		}

	}

	// flatten bone matrices to array

	var b, bl = this.bones.length,
		ba = this.bones,
		bm = this.boneMatrices;

	for ( b = 0; b < bl; b ++ ) {

		ba[ b ].skinMatrix.flattenToArrayOffset( bm, b * 16 );

	}

};

/*
 * Pose
 */

THREE.SkinnedMesh.prototype.pose = function() {

	this.updateMatrixWorld( true );

	var bim, bone, boneInverses = [];

	for ( var b = 0; b < this.bones.length; b ++ ) {

		bone = this.bones[ b ];

		var inverseMatrix = new THREE.Matrix4();
		inverseMatrix.getInverse( bone.skinMatrix );

		boneInverses.push( inverseMatrix );

		bone.skinMatrix.flattenToArrayOffset( this.boneMatrices, b * 16 );

	}

	// project vertices to local

	if ( this.geometry.skinVerticesA === undefined ) {

		this.geometry.skinVerticesA = [];
		this.geometry.skinVerticesB = [];

		var orgVertex, vertex;

		for ( var i = 0; i < this.geometry.skinIndices.length; i ++ ) {

			orgVertex = this.geometry.vertices[ i ].position;

			var indexA = this.geometry.skinIndices[ i ].x;
			var indexB = this.geometry.skinIndices[ i ].y;

			vertex = new THREE.Vector3( orgVertex.x, orgVertex.y, orgVertex.z );
			this.geometry.skinVerticesA.push( boneInverses[ indexA ].multiplyVector3( vertex ) );

			vertex = new THREE.Vector3( orgVertex.x, orgVertex.y, orgVertex.z );
			this.geometry.skinVerticesB.push( boneInverses[ indexB ].multiplyVector3( vertex ) );

			// todo: add more influences

			// normalize weights

			if ( this.geometry.skinWeights[ i ].x + this.geometry.skinWeights[ i ].y !== 1 ) {

				var len = ( 1.0 - ( this.geometry.skinWeights[ i ].x + this.geometry.skinWeights[ i ].y ) ) * 0.5;
				this.geometry.skinWeights[ i ].x += len;
				this.geometry.skinWeights[ i ].y += len;

			}

		}

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Ribbon = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = material;

};

THREE.Ribbon.prototype = new THREE.Object3D();
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

THREE.LOD = function () {

	THREE.Object3D.call( this );

	this.LODs = [];

};

THREE.LOD.prototype = new THREE.Object3D();
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;

THREE.LOD.prototype.addLevel = function ( object3D, visibleAtDistance ) {

	if ( visibleAtDistance === undefined ) {

		visibleAtDistance = 0;

	}

	visibleAtDistance = Math.abs( visibleAtDistance );

	for ( var l = 0; l < this.LODs.length; l ++ ) {

		if ( visibleAtDistance < this.LODs[ l ].visibleAtDistance ) {

			break;

		}

	}

	this.LODs.splice( l, 0, { visibleAtDistance: visibleAtDistance, object3D: object3D } );
	this.add( object3D );

};

THREE.LOD.prototype.update = function ( camera ) {

	if ( this.LODs.length > 1 ) {

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		var inverse  = camera.matrixWorldInverse;
		var distance = -( inverse.elements[2] * this.matrixWorld.elements[12] + inverse.elements[6] * this.matrixWorld.elements[13] + inverse.elements[10] * this.matrixWorld.elements[14] + inverse.elements[14] );

		this.LODs[ 0 ].object3D.visible = true;

		for ( var l = 1; l < this.LODs.length; l ++ ) {

			if( distance >= this.LODs[ l ].visibleAtDistance ) {

				this.LODs[ l - 1 ].object3D.visible = false;
				this.LODs[ l     ].object3D.visible = true;

			} else {

				break;

			}

		}

		for( ; l < this.LODs.length; l ++ ) {

			this.LODs[ l ].object3D.visible = false;

		}

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 */

THREE.Sprite = function ( parameters ) {

	THREE.Object3D.call( this );

	this.color = ( parameters.color !== undefined ) ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );
	this.map = ( parameters.map !== undefined ) ? parameters.map : new THREE.Texture();

	this.blending = ( parameters.blending !== undefined ) ? parameters.blending : THREE.NormalBlending;

	this.blendSrc = parameters.blendSrc !== undefined ? parameters.blendSrc : THREE.SrcAlphaFactor;
	this.blendDst = parameters.blendDst !== undefined ? parameters.blendDst : THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = parameters.blendEquation !== undefined ? parameters.blendEquation : THREE.AddEquation;

	this.useScreenCoordinates = ( parameters.useScreenCoordinates !== undefined ) ? parameters.useScreenCoordinates : true;
	this.mergeWith3D = ( parameters.mergeWith3D !== undefined ) ? parameters.mergeWith3D : !this.useScreenCoordinates;
	this.affectedByDistance = ( parameters.affectedByDistance !== undefined ) ? parameters.affectedByDistance : !this.useScreenCoordinates;
	this.scaleByViewport = ( parameters.scaleByViewport !== undefined ) ? parameters.scaleByViewport : !this.affectedByDistance;
	this.alignment = ( parameters.alignment instanceof THREE.Vector2 ) ? parameters.alignment : THREE.SpriteAlignment.center;

	this.rotation3d = this.rotation;
	this.rotation = 0;
	this.opacity = 1;

	this.uvOffset = new THREE.Vector2( 0, 0 );
	this.uvScale  = new THREE.Vector2( 1, 1 );

};

THREE.Sprite.prototype = new THREE.Object3D();
THREE.Sprite.prototype.constructor = THREE.Sprite;


/*
 * Custom update matrix
 */

THREE.Sprite.prototype.updateMatrix = function () {

	this.matrix.setPosition( this.position );

	this.rotation3d.set( 0, 0, this.rotation );
	this.matrix.setRotationFromEuler( this.rotation3d );

	if ( this.scale.x !== 1 || this.scale.y !== 1 ) {

		this.matrix.scale( this.scale );
		this.boundRadiusScale = Math.max( this.scale.x, this.scale.y );

	}

	this.matrixWorldNeedsUpdate = true;

};

/*
 * Alignment
 */

THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2( 1, -1 );
THREE.SpriteAlignment.topCenter = new THREE.Vector2( 0, -1 );
THREE.SpriteAlignment.topRight = new THREE.Vector2( -1, -1 );
THREE.SpriteAlignment.centerLeft = new THREE.Vector2( 1, 0 );
THREE.SpriteAlignment.center = new THREE.Vector2( 0, 0 );
THREE.SpriteAlignment.centerRight = new THREE.Vector2( -1, 0 );
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2( 1, 1 );
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2( 0, 1 );
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( -1, 1 );
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Scene = function () {

	THREE.Object3D.call( this );

	this.fog = null;
	this.overrideMaterial = null;

	this.matrixAutoUpdate = false;

	this.__objects = [];
	this.__lights = [];

	this.__objectsAdded = [];
	this.__objectsRemoved = [];

};

THREE.Scene.prototype = new THREE.Object3D();
THREE.Scene.prototype.constructor = THREE.Scene;

THREE.Scene.prototype.__addObject = function ( object ) {

	if ( object instanceof THREE.Light ) {

		if ( this.__lights.indexOf( object ) === - 1 ) {

			this.__lights.push( object );

		}

	} else if ( !( object instanceof THREE.Camera || object instanceof THREE.Bone ) ) {

		if ( this.__objects.indexOf( object ) === - 1 ) {

			this.__objects.push( object );
			this.__objectsAdded.push( object );

			// check if previously removed

			var i = this.__objectsRemoved.indexOf( object );

			if ( i !== -1 ) {

				this.__objectsRemoved.splice( i, 1 );

			}

		}

	}

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.__addObject( object.children[ c ] );

	}

};

THREE.Scene.prototype.__removeObject = function ( object ) {

	if ( object instanceof THREE.Light ) {

		var i = this.__lights.indexOf( object );

		if ( i !== -1 ) {

			this.__lights.splice( i, 1 );

		}

	} else if ( !( object instanceof THREE.Camera ) ) {

		var i = this.__objects.indexOf( object );

		if( i !== -1 ) {

			this.__objects.splice( i, 1 );
			this.__objectsRemoved.push( object );

			// check if previously added

			var ai = this.__objectsAdded.indexOf( object );

			if ( ai !== -1 ) {

				this.__objectsAdded.splice( ai, 1 );

			}

		}

	}

	for ( var c = 0; c < object.children.length; c ++ ) {

		this.__removeObject( object.children[ c ] );

	}

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Fog = function ( hex, near, far ) {

	this.color = new THREE.Color( hex );

	this.near = ( near !== undefined ) ? near : 1;
	this.far = ( far !== undefined ) ? far : 1000;

};
/**
 * @author mr.doob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.FogExp2 = function ( hex, density ) {

	this.color = new THREE.Color( hex );
	this.density = ( density !== undefined ) ? density : 0.00025;

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

THREE.ShaderChunk = {

	// FOG

	fog_pars_fragment: [

		"#ifdef USE_FOG",

			"uniform vec3 fogColor;",

			"#ifdef FOG_EXP2",

				"uniform float fogDensity;",

			"#else",

				"uniform float fogNear;",
				"uniform float fogFar;",

			"#endif",

		"#endif"

	].join("\n"),

	fog_fragment: [

		"#ifdef USE_FOG",

			"float depth = gl_FragCoord.z / gl_FragCoord.w;",

			"#ifdef FOG_EXP2",

				"const float LOG2 = 1.442695;",
				"float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );",
				"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );",

			"#else",

				"float fogFactor = smoothstep( fogNear, fogFar, depth );",

			"#endif",

			"gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );",

		"#endif"

	].join("\n"),

	// ENVIRONMENT MAP

	envmap_pars_fragment: [

		"#ifdef USE_ENVMAP",

			"varying vec3 vReflect;",

			"uniform float reflectivity;",
			"uniform samplerCube envMap;",
			"uniform float flipEnvMap;",
			"uniform int combine;",

		"#endif"

	].join("\n"),

	envmap_fragment: [

		"#ifdef USE_ENVMAP",

			"#ifdef DOUBLE_SIDED",

				"float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );",
				"vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );",

			"#else",

				"vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );",

			"#endif",

			"#ifdef GAMMA_INPUT",

				"cubeColor.xyz *= cubeColor.xyz;",

			"#endif",

			"if ( combine == 1 ) {",

				"gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );",

			"} else {",

				"gl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;",

			"}",

		"#endif"

	].join("\n"),

	envmap_pars_vertex: [

		"#ifdef USE_ENVMAP",

			"varying vec3 vReflect;",

			"uniform float refractionRatio;",
			"uniform bool useRefract;",

		"#endif"

	].join("\n"),

	envmap_vertex : [

		"#ifdef USE_ENVMAP",

			"vec4 mPosition = objectMatrix * vec4( position, 1.0 );",
			"vec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;",

			"if ( useRefract ) {",

				"vReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );",

			"} else {",

				"vReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );",

			"}",

		"#endif"

	].join("\n"),

	// COLOR MAP (particles)

	map_particle_pars_fragment: [

		"#ifdef USE_MAP",

			"uniform sampler2D map;",

		"#endif"

	].join("\n"),


	map_particle_fragment: [

		"#ifdef USE_MAP",

			"gl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );",

		"#endif"

	].join("\n"),

	// COLOR MAP (triangles)

	map_pars_vertex: [

		"#ifdef USE_MAP",

			"varying vec2 vUv;",
			"uniform vec4 offsetRepeat;",

		"#endif"

	].join("\n"),

	map_pars_fragment: [

		"#ifdef USE_MAP",

			"varying vec2 vUv;",
			"uniform sampler2D map;",

		"#endif"

	].join("\n"),

	map_vertex: [

		"#ifdef USE_MAP",

			"vUv = uv * offsetRepeat.zw + offsetRepeat.xy;",

		"#endif"

	].join("\n"),

	map_fragment: [

		"#ifdef USE_MAP",

			"#ifdef GAMMA_INPUT",

				"vec4 texelColor = texture2D( map, vUv );",
				"texelColor.xyz *= texelColor.xyz;",

				"gl_FragColor = gl_FragColor * texelColor;",

			"#else",

				"gl_FragColor = gl_FragColor * texture2D( map, vUv );",

			"#endif",

		"#endif"

	].join("\n"),

	// LIGHT MAP

	lightmap_pars_fragment: [

		"#ifdef USE_LIGHTMAP",

			"varying vec2 vUv2;",
			"uniform sampler2D lightMap;",

		"#endif"

	].join("\n"),

	lightmap_pars_vertex: [

		"#ifdef USE_LIGHTMAP",

			"varying vec2 vUv2;",

		"#endif"

	].join("\n"),

	lightmap_fragment: [

		"#ifdef USE_LIGHTMAP",

			"gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );",

		"#endif"

	].join("\n"),

	lightmap_vertex: [

		"#ifdef USE_LIGHTMAP",

			"vUv2 = uv2;",

		"#endif"

	].join("\n"),

	// LIGHTS LAMBERT

	lights_lambert_pars_vertex: [

		"uniform vec3 ambient;",
		"uniform vec3 diffuse;",
		"uniform vec3 emissive;",

		"uniform vec3 ambientLightColor;",

		"#if MAX_DIR_LIGHTS > 0",

			"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
			"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
			"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
			"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

		"#endif",

		"#ifdef WRAP_AROUND",

			"uniform vec3 wrapRGB;",

		"#endif",

	].join("\n"),

	lights_lambert_vertex: [

		"vLightFront = vec3( 0.0 );",

		"#ifdef DOUBLE_SIDED",

			"vLightBack = vec3( 0.0 );",

		"#endif",

		"transformedNormal = normalize( transformedNormal );",

		"#if MAX_DIR_LIGHTS > 0",

		"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

			"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
			"vec3 dirVector = normalize( lDirection.xyz );",

			"float dotProduct = dot( transformedNormal, dirVector );",
			"vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );",

			"#ifdef DOUBLE_SIDED",

				"vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

				"#ifdef WRAP_AROUND",

					"vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

				"#endif",

			"#endif",

			"#ifdef WRAP_AROUND",

				"vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
				"directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );",

				"#ifdef DOUBLE_SIDED",

					"directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );",

				"#endif",

			"#endif",

			"vLightFront += directionalLightColor[ i ] * directionalLightWeighting;",

			"#ifdef DOUBLE_SIDED",

				"vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;",

			"#endif",

		"}",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float lDistance = 1.0;",
				"if ( pointLightDistance[ i ] > 0.0 )",
					"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

				"lVector = normalize( lVector );",
				"float dotProduct = dot( transformedNormal, lVector );",

				"vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );",

				"#ifdef DOUBLE_SIDED",

					"vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );",

					"#ifdef WRAP_AROUND",

						"vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );",

					"#endif",

				"#endif",

				"#ifdef WRAP_AROUND",

					"vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );",
					"pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );",

					"#ifdef DOUBLE_SIDED",

						"pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );",

					"#endif",

				"#endif",

				"vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;",

				"#ifdef DOUBLE_SIDED",

					"vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;",

				"#endif",

			"}",

		"#endif",

		"vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;",

		"#ifdef DOUBLE_SIDED",

			"vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;",

		"#endif",

	].join("\n"),

	// LIGHTS PHONG

	lights_phong_pars_vertex: [

		"#if MAX_POINT_LIGHTS > 0",
		"#ifndef PHONG_PER_PIXEL",

			"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
			"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

			"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

		"#endif",
		"#endif"

	].join("\n"),


	lights_phong_vertex: [

		"#if MAX_POINT_LIGHTS > 0",
		"#ifndef PHONG_PER_PIXEL",

			"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
				"vec3 lVector = lPosition.xyz - mvPosition.xyz;",

				"float lDistance = 1.0;",
				"if ( pointLightDistance[ i ] > 0.0 )",
					"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

				"vPointLight[ i ] = vec4( lVector, lDistance );",

			"}",

		"#endif",
		"#endif"

	].join("\n"),

	lights_phong_pars_fragment: [

		"uniform vec3 ambientLightColor;",

		"#if MAX_DIR_LIGHTS > 0",

			"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
			"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",

			"#ifdef PHONG_PER_PIXEL",

				"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
				"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

			"#else",

				"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];",

			"#endif",

		"#endif",

		"#ifdef WRAP_AROUND",

			"uniform vec3 wrapRGB;",

		"#endif",

		"varying vec3 vViewPosition;",
		"varying vec3 vNormal;"

	].join("\n"),

	lights_phong_fragment: [

		"vec3 normal = normalize( vNormal );",
		"vec3 viewPosition = normalize( vViewPosition );",

		"#ifdef DOUBLE_SIDED",

			"normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"vec3 pointDiffuse  = vec3( 0.0 );",
			"vec3 pointSpecular = vec3( 0.0 );",

			"for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

				"#ifdef PHONG_PER_PIXEL",

					"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
					"vec3 lVector = lPosition.xyz + vViewPosition.xyz;",

					"float lDistance = 1.0;",
					"if ( pointLightDistance[ i ] > 0.0 )",
						"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );",

					"lVector = normalize( lVector );",

				"#else",

					"vec3 lVector = normalize( vPointLight[ i ].xyz );",
					"float lDistance = vPointLight[ i ].w;",

				"#endif",

				// diffuse

				"float dotProduct = dot( normal, lVector );",

				"#ifdef WRAP_AROUND",

					"float pointDiffuseWeightFull = max( dotProduct, 0.0 );",
					"float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

					"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",

				"#else",

					"float pointDiffuseWeight = max( dotProduct, 0.0 );",

				"#endif",

				"pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;",

				// specular

				"vec3 pointHalfVector = normalize( lVector + viewPosition );",
				"float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
				"float pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );",

				"#ifdef PHYSICALLY_BASED_SHADING",

					// 2.0 => 2.0001 is hack to work around ANGLE bug

					"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

					"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );",
					"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;",

				"#else",

					"pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;",

				"#endif",

			"}",

		"#endif",

		"#if MAX_DIR_LIGHTS > 0",

			"vec3 dirDiffuse  = vec3( 0.0 );",
			"vec3 dirSpecular = vec3( 0.0 );" ,

			"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {",

				"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
				"vec3 dirVector = normalize( lDirection.xyz );",

				// diffuse

				"float dotProduct = dot( normal, dirVector );",

				"#ifdef WRAP_AROUND",

					"float dirDiffuseWeightFull = max( dotProduct, 0.0 );",
					"float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );",

					"vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );",

				"#else",

					"float dirDiffuseWeight = max( dotProduct, 0.0 );",

				"#endif",

				"dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;",

				// specular

				"vec3 dirHalfVector = normalize( dirVector + viewPosition );",
				"float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
				"float dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );",

				"#ifdef PHYSICALLY_BASED_SHADING",

					/*
					// fresnel term from skin shader
					"const float F0 = 0.128;",

					"float base = 1.0 - dot( viewPosition, dirHalfVector );",
					"float exponential = pow( base, 5.0 );",

					"float fresnel = exponential + F0 * ( 1.0 - exponential );",
					*/

					/*
					// fresnel term from fresnel shader
					"const float mFresnelBias = 0.08;",
					"const float mFresnelScale = 0.3;",
					"const float mFresnelPower = 5.0;",

					"float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );",
					*/

					// 2.0 => 2.0001 is hack to work around ANGLE bug

					"float specularNormalization = ( shininess + 2.0001 ) / 8.0;",

					//"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;",

					"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );",
					"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",

				"#else",

					"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;",

				"#endif",

			"}",

		"#endif",

		"vec3 totalDiffuse = vec3( 0.0 );",
		"vec3 totalSpecular = vec3( 0.0 );",

		"#if MAX_DIR_LIGHTS > 0",

			"totalDiffuse += dirDiffuse;",
			"totalSpecular += dirSpecular;",

		"#endif",

		"#if MAX_POINT_LIGHTS > 0",

			"totalDiffuse += pointDiffuse;",
			"totalSpecular += pointSpecular;",

		"#endif",

		"#ifdef METAL",

			"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );",

		"#else",

			"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;",

		"#endif"

	].join("\n"),

	// VERTEX COLORS

	color_pars_fragment: [

		"#ifdef USE_COLOR",

			"varying vec3 vColor;",

		"#endif"

	].join("\n"),


	color_fragment: [

		"#ifdef USE_COLOR",

			"gl_FragColor = gl_FragColor * vec4( vColor, opacity );",

		"#endif"

	].join("\n"),

	color_pars_vertex: [

		"#ifdef USE_COLOR",

			"varying vec3 vColor;",

		"#endif"

	].join("\n"),


	color_vertex: [

		"#ifdef USE_COLOR",

			"#ifdef GAMMA_INPUT",

				"vColor = color * color;",

			"#else",

				"vColor = color;",

			"#endif",

		"#endif"

	].join("\n"),

	// SKINNING

	skinning_pars_vertex: [

		"#ifdef USE_SKINNING",

			"uniform mat4 boneGlobalMatrices[ MAX_BONES ];",

		"#endif"

	].join("\n"),

	skinning_vertex: [

		"#ifdef USE_SKINNING",

			"gl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;",
			"gl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;",

			"gl_Position  = projectionMatrix * modelViewMatrix * gl_Position;",

		"#endif"

	].join("\n"),

	// MORPHING

	morphtarget_pars_vertex: [

		"#ifdef USE_MORPHTARGETS",

			"#ifndef USE_MORPHNORMALS",

			"uniform float morphTargetInfluences[ 8 ];",

			"#else",

			"uniform float morphTargetInfluences[ 4 ];",

			"#endif",

		"#endif"

	].join("\n"),

	morphtarget_vertex: [

		"#ifdef USE_MORPHTARGETS",

			"vec3 morphed = vec3( 0.0 );",
			"morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];",
			"morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];",
			"morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];",
			"morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];",

			"#ifndef USE_MORPHNORMALS",

			"morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];",
			"morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];",
			"morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];",
			"morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];",

			"#endif",

			"morphed += position;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );",

		"#endif"

	].join("\n"),

	default_vertex : [

		"#ifndef USE_MORPHTARGETS",
		"#ifndef USE_SKINNING",

			"gl_Position = projectionMatrix * mvPosition;",

		"#endif",
		"#endif"

	].join("\n"),

	morphnormal_vertex: [

		"#ifdef USE_MORPHNORMALS",

			"vec3 morphedNormal = vec3( 0.0 );",

			"morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];",
			"morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];",
			"morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];",
			"morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];",

			"morphedNormal += normal;",

			"vec3 transformedNormal = normalMatrix * morphedNormal;",

		"#else",

			"vec3 transformedNormal = normalMatrix * normal;",

		"#endif"

	].join("\n"),

	// SHADOW MAP

	// based on SpiderGL shadow map and Fabien Sanglard's GLSL shadow mapping examples
	//  http://spidergl.org/example.php?id=6
	// 	http://fabiensanglard.net/shadowmapping

	shadowmap_pars_fragment: [

		"#ifdef USE_SHADOWMAP",

			"uniform sampler2D shadowMap[ MAX_SHADOWS ];",
			"uniform vec2 shadowMapSize[ MAX_SHADOWS ];",

			"uniform float shadowDarkness[ MAX_SHADOWS ];",
			"uniform float shadowBias[ MAX_SHADOWS ];",

			"varying vec4 vShadowCoord[ MAX_SHADOWS ];",

			"float unpackDepth( const in vec4 rgba_depth ) {",

				"const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );",
				"float depth = dot( rgba_depth, bit_shift );",
				"return depth;",

			"}",

		"#endif"

	].join("\n"),

	shadowmap_fragment: [

		"#ifdef USE_SHADOWMAP",

			"#ifdef SHADOWMAP_DEBUG",

				"vec3 frustumColors[3];",
				"frustumColors[0] = vec3( 1.0, 0.5, 0.0 );",
				"frustumColors[1] = vec3( 0.0, 1.0, 0.8 );",
				"frustumColors[2] = vec3( 0.0, 0.5, 1.0 );",

			"#endif",

			"#ifdef SHADOWMAP_CASCADE",

				"int inFrustumCount = 0;",

			"#endif",

			"float fDepth;",
			"vec3 shadowColor = vec3( 1.0 );",

			"for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

				"vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;",

				// "if ( something && something )" 		 breaks ATI OpenGL shader compiler
				// "if ( all( something, something ) )"  using this instead

				"bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );",
				"bool inFrustum = all( inFrustumVec );",

				// don't shadow pixels outside of light frustum
				// use just first frustum (for cascades)
				// don't shadow pixels behind far plane of light frustum

				"#ifdef SHADOWMAP_CASCADE",

					"inFrustumCount += int( inFrustum );",
					"bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );",

				"#else",

					"bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );",

				"#endif",

				"bool frustumTest = all( frustumTestVec );",

				"if ( frustumTest ) {",

					"shadowCoord.z += shadowBias[ i ];",

					"#ifdef SHADOWMAP_SOFT",

						// Percentage-close filtering
						// (9 pixel kernel)
						// http://fabiensanglard.net/shadowmappingPCF/

						"float shadow = 0.0;",

						/*
						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL
						// must enroll loop manually

						"for ( float y = -1.25; y <= 1.25; y += 1.25 )",
							"for ( float x = -1.25; x <= 1.25; x += 1.25 ) {",

								"vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );",

								// doesn't seem to produce any noticeable visual difference compared to simple "texture2D" lookup
								//"vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );",

								"float fDepth = unpackDepth( rgbaDepth );",

								"if ( fDepth < shadowCoord.z )",
									"shadow += 1.0;",

						"}",

						"shadow /= 9.0;",

						*/

						"const float shadowDelta = 1.0 / 9.0;",

						"float xPixelOffset = 1.0 / shadowMapSize[ i ].x;",
						"float yPixelOffset = 1.0 / shadowMapSize[ i ].y;",

						"float dx0 = -1.25 * xPixelOffset;",
						"float dy0 = -1.25 * yPixelOffset;",
						"float dx1 = 1.25 * xPixelOffset;",
						"float dy1 = 1.25 * yPixelOffset;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );",
						"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;",

						"shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );",

					"#else",

						"vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );",
						"float fDepth = unpackDepth( rgbaDepth );",

						"if ( fDepth < shadowCoord.z )",

							// spot with multiple shadows is darker

							"shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );",

							// spot with multiple shadows has the same color as single shadow spot

							//"shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );",

					"#endif",

				"}",


				"#ifdef SHADOWMAP_DEBUG",

					"#ifdef SHADOWMAP_CASCADE",

						"if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];",

					"#else",

						"if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];",

					"#endif",

				"#endif",

			"}",

			"#ifdef GAMMA_OUTPUT",

				"shadowColor *= shadowColor;",

			"#endif",

			"gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;",

		"#endif"

	].join("\n"),

	shadowmap_pars_vertex: [

		"#ifdef USE_SHADOWMAP",

			"varying vec4 vShadowCoord[ MAX_SHADOWS ];",
			"uniform mat4 shadowMatrix[ MAX_SHADOWS ];",

		"#endif"

	].join("\n"),

	shadowmap_vertex: [

		"#ifdef USE_SHADOWMAP",

			"for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

				"#ifdef USE_MORPHTARGETS",

					"vShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );",

				"#else",

					"vShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );",

				"#endif",

			"}",

		"#endif"

	].join("\n"),

	// ALPHATEST

	alphatest_fragment: [

		"#ifdef ALPHATEST",

			"if ( gl_FragColor.a < ALPHATEST ) discard;",

		"#endif"

	].join("\n"),

	// LINEAR SPACE

	linear_to_gamma_fragment: [

		"#ifdef GAMMA_OUTPUT",

			"gl_FragColor.xyz = sqrt( gl_FragColor.xyz );",

		"#endif"

	].join("\n"),


};

THREE.UniformsUtils = {

	merge: function ( uniforms ) {

		var u, p, tmp, merged = {};

		for ( u = 0; u < uniforms.length; u++ ) {

			tmp = this.clone( uniforms[ u ] );

			for ( p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	},

	clone: function ( uniforms_src ) {

		var u, p, parameter, parameter_src, uniforms_dst = {};

		for ( u in uniforms_src ) {

			uniforms_dst[ u ] = {};

			for ( p in uniforms_src[ u ] ) {

				parameter_src = uniforms_src[ u ][ p ];

				if ( parameter_src instanceof THREE.Color ||
					 parameter_src instanceof THREE.Vector2 ||
					 parameter_src instanceof THREE.Vector3 ||
					 parameter_src instanceof THREE.Vector4 ||
					 parameter_src instanceof THREE.Matrix4 ||
					 parameter_src instanceof THREE.Texture ) {

					uniforms_dst[ u ][ p ] = parameter_src.clone();

				} else if ( parameter_src instanceof Array ) {

					uniforms_dst[ u ][ p ] = parameter_src.slice();

				} else {

					uniforms_dst[ u ][ p ] = parameter_src;

				}

			}

		}

		return uniforms_dst;

	}

};

THREE.UniformsLib = {

	common: {

		"diffuse" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },

		"map" : { type: "t", value: 0, texture: null },
		"offsetRepeat" : { type: "v4", value: new THREE.Vector4( 0, 0, 1, 1 ) },

		"lightMap" : { type: "t", value: 2, texture: null },

		"envMap" : { type: "t", value: 1, texture: null },
		"flipEnvMap" : { type: "f", value: -1 },
		"useRefract" : { type: "i", value: 0 },
		"reflectivity" : { type: "f", value: 1.0 },
		"refractionRatio" : { type: "f", value: 0.98 },
		"combine" : { type: "i", value: 0 },

		"morphTargetInfluences" : { type: "f", value: 0 }

	},

	fog : {

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	lights: {

		"ambientLightColor" : { type: "fv", value: [] },
		"directionalLightDirection" : { type: "fv", value: [] },
		"directionalLightColor" : { type: "fv", value: [] },
		"pointLightColor" : { type: "fv", value: [] },
		"pointLightPosition" : { type: "fv", value: [] },
		"pointLightDistance" : { type: "fv1", value: [] }

	},

	particle: {

		"psColor" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },
		"size" : { type: "f", value: 1.0 },
		"scale" : { type: "f", value: 1.0 },
		"map" : { type: "t", value: 0, texture: null },

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	shadowmap: {

		"shadowMap": { type: "tv", value: 6, texture: [] },
		"shadowMapSize": { type: "v2v", value: [] },

		"shadowBias" : { type: "fv1", value: [] },
		"shadowDarkness": { type: "fv1", value: [] },

		"shadowMatrix" : { type: "m4v", value: [] },

	}

};

THREE.ShaderLib = {

	'depth': {

		uniforms: {

			"mNear": { type: "f", value: 1.0 },
			"mFar" : { type: "f", value: 2000.0 },
			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"void main() {",

				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float mNear;",
			"uniform float mFar;",
			"uniform float opacity;",

			"void main() {",

				"float depth = gl_FragCoord.z / gl_FragCoord.w;",
				"float color = 1.0 - smoothstep( mNear, mFar, depth );",
				"gl_FragColor = vec4( vec3( color ), opacity );",

			"}"

		].join("\n")

	},

	'normal': {

		uniforms: {

			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"varying vec3 vNormal;",

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vNormal = normalMatrix * normal;",

				"gl_Position = projectionMatrix * mvPosition;",

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",
			"varying vec3 vNormal;",

			"void main() {",

				"gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",

			"}"

		].join("\n")

	},

	'basic': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( diffuse, opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'lambert': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],

				THREE.ShaderChunk[ "lights_lambert_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],


			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

				"varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],

				"#ifdef DOUBLE_SIDED",

					//"float isFront = float( gl_FrontFacing );",
					//"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",

					"if ( gl_FrontFacing )",
						"gl_FragColor.xyz *= vLightFront;",
					"else",
						"gl_FragColor.xyz *= vLightBack;",

				"#else",

					"gl_FragColor.xyz *= vLightFront;",

				"#endif",

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'phong': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
				"shininess": { type: "f", value: 30 },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"varying vec3 vViewPosition;",
			"varying vec3 vNormal;",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				"#ifndef USE_ENVMAP",

					"vec4 mPosition = objectMatrix * vec4( position, 1.0 );",

				"#endif",

				"vViewPosition = -mvPosition.xyz;",

				THREE.ShaderChunk[ "morphnormal_vertex" ],

				"vNormal = transformedNormal;",

				THREE.ShaderChunk[ "lights_phong_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform vec3 ambient;",
			"uniform vec3 emissive;",
			"uniform vec3 specular;",
			"uniform float shininess;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );",

				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],

				THREE.ShaderChunk[ "lights_phong_fragment" ],

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'particle_basic': {

		uniforms:  THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "particle" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			"uniform float size;",
			"uniform float scale;",

			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "color_vertex" ],

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				"#ifdef USE_SIZEATTENUATION",
					"gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
				"#else",
					"gl_PointSize = size;",
				"#endif",

				"gl_Position = projectionMatrix * mvPosition;",

				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 psColor;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_particle_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],

			"void main() {",

				"gl_FragColor = vec4( psColor, opacity );",

				THREE.ShaderChunk[ "map_particle_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	// Depth encoding into RGBA texture
	// 	based on SpiderGL shadow map example
	// 		http://spidergl.org/example.php?id=6
	// 	originally from
	//		http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
	// 	see also here:
	//		http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/

	'depthRGBA': {

		uniforms: {},

		vertexShader: [

			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],

			"void main() {",

				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"vec4 pack_depth( const in float depth ) {",

				"const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
				"const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
				"vec4 res = fract( depth * bit_shift );",
				"res -= res.xxyz * bit_mask;",
				"return res;",

			"}",

			"void main() {",

				"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

				//"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
				//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
				//"gl_FragData[ 0 ] = pack_depth( z );",
				//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",

			"}"

		].join("\n")

	}

};/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.WebGLRenderer = function ( parameters ) {

	// constructor parameters

	parameters = parameters || {};

	var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),

	_precision = parameters.precision !== undefined ? parameters.precision : 'highp',

	_alpha = parameters.alpha !== undefined ? parameters.alpha : true,
	_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
	_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
	_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
	_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,

	_clearColor = parameters.clearColor !== undefined ? new THREE.Color( parameters.clearColor ) : new THREE.Color( 0x000000 ),
	_clearAlpha = parameters.clearAlpha !== undefined ? parameters.clearAlpha : 0,

	_maxLights = parameters.maxLights !== undefined ? parameters.maxLights : 4;

	// public properties

	this.domElement = _canvas;
	this.context = null;

	// clearing

	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;

	// scene graph

	this.sortObjects = true;

	this.autoUpdateObjects = true;
	this.autoUpdateScene = true;

	// physically based shading

	this.gammaInput = false;
	this.gammaOutput = false;
	this.physicallyBasedShading = false;

	// shadow map

	this.shadowMapEnabled = false;
	this.shadowMapAutoUpdate = true;
	this.shadowMapSoft = true;
	this.shadowMapCullFrontFaces = true;
	this.shadowMapDebug = false;
	this.shadowMapCascade = false;

	// morphs

	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;

	// flags

	this.autoScaleCubemaps = true;

	// custom render plugins

	this.renderPluginsPre = [];
	this.renderPluginsPost = [];

	// info

	this.info = {

		memory: {

			programs: 0,
			geometries: 0,
			textures: 0

		},

		render: {

			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0

		}

	};

	// internal properties

	var _this = this,

	_gl,

	_programs = [],

	// internal state cache

	_currentProgram = null,
	_currentFramebuffer = null,
	_currentMaterialId = -1,
	_currentGeometryGroupHash = null,
	_currentCamera = null,
	_geometryGroupCounter = 0,

	// GL state cache

	_oldDoubleSided = null,
	_oldFlipSided = null,

	_oldBlending = null,

	_oldBlendEquation = null,
	_oldBlendSrc = null,
	_oldBlendDst = null,

	_oldDepthTest = null,
	_oldDepthWrite = null,

	_oldPolygonOffset = null,
	_oldPolygonOffsetFactor = null,
	_oldPolygonOffsetUnits = null,

	_oldLineWidth = null,

	_viewportX = 0,
	_viewportY = 0,
	_viewportWidth = 0,
	_viewportHeight = 0,
	_currentWidth = 0,
	_currentHeight = 0,

	// frustum

	_frustum = new THREE.Frustum(),

	 // camera matrices cache

	_projScreenMatrix = new THREE.Matrix4(),
	_projScreenMatrixPS = new THREE.Matrix4(),

	_vector3 = new THREE.Vector4(),

	// light arrays cache

	_direction = new THREE.Vector3(),

	_lights = {

		ambient: [ 0, 0, 0 ],
		directional: { length: 0, colors: new Array(), positions: new Array() },
		point: { length: 0, colors: new Array(), positions: new Array(), distances: new Array() }

	};

	// initialize

	_gl = initGL();

	setDefaultGLState();

	this.context = _gl;

	// GPU capabilities

	var _maxVertexTextures = _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ),
	_maxTextureSize = _gl.getParameter( _gl.MAX_TEXTURE_SIZE ),
	_maxCubemapSize = _gl.getParameter( _gl.MAX_CUBE_MAP_TEXTURE_SIZE );

	// API

	this.getContext = function () {

		return _gl;

	};

	this.supportsVertexTextures = function () {

		return _maxVertexTextures > 0;

	};

	this.setSize = function ( width, height ) {

		_canvas.width = width;
		_canvas.height = height;

		this.setViewport( 0, 0, _canvas.width, _canvas.height );

	};

	this.setViewport = function ( x, y, width, height ) {

		_viewportX = x;
		_viewportY = y;

		_viewportWidth = width;
		_viewportHeight = height;

		_gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

	};

	this.setScissor = function ( x, y, width, height ) {

		_gl.scissor( x, y, width, height );

	};

	this.enableScissorTest = function ( enable ) {

		enable ? _gl.enable( _gl.SCISSOR_TEST ) : _gl.disable( _gl.SCISSOR_TEST );

	};

	// Clearing

	this.setClearColorHex = function ( hex, alpha ) {

		_clearColor.setHex( hex );
		_clearAlpha = alpha;

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	this.setClearColor = function ( color, alpha ) {

		_clearColor.copy( color );
		_clearAlpha = alpha;

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	this.getClearColor = function () {

		return _clearColor;

	};

	this.getClearAlpha = function () {

		return _clearAlpha;

	};

	this.clear = function ( color, depth, stencil ) {

		var bits = 0;

		if ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;
		if ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;
		if ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;

		_gl.clear( bits );

	};

	this.clearTarget = function ( renderTarget, color, depth, stencil ) {

		this.setRenderTarget( renderTarget );
		this.clear( color, depth, stencil );

	};

	// Plugins

	this.addPostPlugin = function ( plugin ) {

		plugin.init( this );
		this.renderPluginsPost.push( plugin );

	};

	this.addPrePlugin = function ( plugin ) {

		plugin.init( this );
		this.renderPluginsPre.push( plugin );

	};

	// Deallocation

	this.deallocateObject = function ( object ) {

		if ( ! object.__webglInit ) return;

		object.__webglInit = false;

		delete object._modelViewMatrix;
		delete object._normalMatrix;

		delete object._normalMatrixArray;
		delete object._modelViewMatrixArray;
		delete object._objectMatrixArray;

		if ( object instanceof THREE.Mesh ) {

			for ( var g in object.geometry.geometryGroups ) {

				deleteMeshBuffers( object.geometry.geometryGroups[ g ] );

			}

		} else if ( object instanceof THREE.Ribbon ) {

			deleteRibbonBuffers( object.geometry );

		} else if ( object instanceof THREE.Line ) {

			deleteLineBuffers( object.geometry );

		} else if ( object instanceof THREE.ParticleSystem ) {

			deleteParticleBuffers( object.geometry );

		}

	};

	this.deallocateTexture = function ( texture ) {

		if ( ! texture.__webglInit ) return;

		texture.__webglInit = false;
		_gl.deleteTexture( texture.__webglTexture );

		_this.info.memory.textures --;

	};

	this.deallocateRenderTarget = function ( renderTarget ) {

		if ( !renderTarget || ! renderTarget.__webglTexture ) return;

		_gl.deleteTexture( renderTarget.__webglTexture );

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			for ( var i = 0; i < 6; i ++ ) {

				_gl.deleteFramebuffer( renderTarget.__webglFramebuffer[ i ] );
				_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer[ i ] );

			}

		} else {

			_gl.deleteFramebuffer( renderTarget.__webglFramebuffer );
			_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer );

		}

	};

	// Rendering

	this.updateShadowMap = function ( scene, camera ) {

		_currentProgram = null;
		_oldBlending = -1;
		_oldDepthTest = -1;
		_oldDepthWrite = -1;
		_currentGeometryGroupHash = -1;
		_currentMaterialId = -1;

		this.shadowMapPlugin.update( scene, camera );

	};

	// Internal functions

	// Buffer allocation

	function createParticleBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();

		_this.info.geometries ++;

	};

	function createLineBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createRibbonBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createMeshBuffers ( geometryGroup ) {

		geometryGroup.__webglVertexBuffer = _gl.createBuffer();
		geometryGroup.__webglNormalBuffer = _gl.createBuffer();
		geometryGroup.__webglTangentBuffer = _gl.createBuffer();
		geometryGroup.__webglColorBuffer = _gl.createBuffer();
		geometryGroup.__webglUVBuffer = _gl.createBuffer();
		geometryGroup.__webglUV2Buffer = _gl.createBuffer();

		geometryGroup.__webglSkinVertexABuffer = _gl.createBuffer();
		geometryGroup.__webglSkinVertexBBuffer = _gl.createBuffer();
		geometryGroup.__webglSkinIndicesBuffer = _gl.createBuffer();
		geometryGroup.__webglSkinWeightsBuffer = _gl.createBuffer();

		geometryGroup.__webglFaceBuffer = _gl.createBuffer();
		geometryGroup.__webglLineBuffer = _gl.createBuffer();

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__webglMorphTargetsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__webglMorphNormalsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );

			}

		}

		_this.info.memory.geometries ++;

	};

	// Buffer deallocation

	function deleteParticleBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );

		_this.info.memory.geometries --;

	};

	function deleteLineBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );

		_this.info.memory.geometries --;

	};

	function deleteRibbonBuffers ( geometry ) {

		_gl.deleteBuffer( geometry.__webglVertexBuffer );
		_gl.deleteBuffer( geometry.__webglColorBuffer );

		_this.info.memory.geometries --;

	};

	function deleteMeshBuffers ( geometryGroup ) {

		_gl.deleteBuffer( geometryGroup.__webglVertexBuffer );
		_gl.deleteBuffer( geometryGroup.__webglNormalBuffer );
		_gl.deleteBuffer( geometryGroup.__webglTangentBuffer );
		_gl.deleteBuffer( geometryGroup.__webglColorBuffer );
		_gl.deleteBuffer( geometryGroup.__webglUVBuffer );
		_gl.deleteBuffer( geometryGroup.__webglUV2Buffer );

		_gl.deleteBuffer( geometryGroup.__webglSkinVertexABuffer );
		_gl.deleteBuffer( geometryGroup.__webglSkinVertexBBuffer );
		_gl.deleteBuffer( geometryGroup.__webglSkinIndicesBuffer );
		_gl.deleteBuffer( geometryGroup.__webglSkinWeightsBuffer );

		_gl.deleteBuffer( geometryGroup.__webglFaceBuffer );
		_gl.deleteBuffer( geometryGroup.__webglLineBuffer );

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				_gl.deleteBuffer( geometryGroup.__webglMorphTargetsBuffers[ m ] );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				_gl.deleteBuffer( geometryGroup.__webglMorphNormalsBuffers[ m ] );

			}

		}


		if ( geometryGroup.__webglCustomAttributesList ) {

			for ( var id in geometryGroup.__webglCustomAttributesList ) {

				_gl.deleteBuffer( geometryGroup.__webglCustomAttributesList[ id ].buffer );

			}

		}

		_this.info.memory.geometries --;

	};

	// Buffer initialization

	function initCustomAttributes ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		var material = object.material;

		if ( material.attributes ) {

			if ( geometry.__webglCustomAttributesList === undefined ) {

				geometry.__webglCustomAttributesList = [];

			}

			for ( var a in material.attributes ) {

				var attribute = material.attributes[ a ];

				if( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;		// "f" and "i"

					if ( attribute.type === "v2" ) size = 2;
					else if ( attribute.type === "v3" ) size = 3;
					else if ( attribute.type === "v4" ) size = 4;
					else if ( attribute.type === "c"  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = a;

					attribute.needsUpdate = true;

				}

				geometry.__webglCustomAttributesList.push( attribute );

			}

		}

	};

	function initParticleBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );

		geometry.__sortArray = [];

		geometry.__webglParticleCount = nvertices;

		initCustomAttributes ( geometry, object );

	};

	function initLineBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );

		geometry.__webglLineCount = nvertices;

		initCustomAttributes ( geometry, object );

	};

	function initRibbonBuffers ( geometry ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );

		geometry.__webglVertexCount = nvertices;

	};

	function initMeshBuffers ( geometryGroup, object ) {

		var geometry = object.geometry,
			faces3 = geometryGroup.faces3,
			faces4 = geometryGroup.faces4,

			nvertices = faces3.length * 3 + faces4.length * 4,
			ntris     = faces3.length * 1 + faces4.length * 2,
			nlines    = faces3.length * 3 + faces4.length * 4,

			material = getBufferMaterial( object, geometryGroup ),

			uvType = bufferGuessUVType( material ),
			normalType = bufferGuessNormalType( material ),
			vertexColorType = bufferGuessVertexColorType( material );

		//console.log( "uvType", uvType, "normalType", normalType, "vertexColorType", vertexColorType, object, geometryGroup, material );

		geometryGroup.__vertexArray = new Float32Array( nvertices * 3 );

		if ( normalType ) {

			geometryGroup.__normalArray = new Float32Array( nvertices * 3 );

		}

		if ( geometry.hasTangents ) {

			geometryGroup.__tangentArray = new Float32Array( nvertices * 4 );

		}

		if ( vertexColorType ) {

			geometryGroup.__colorArray = new Float32Array( nvertices * 3 );

		}

		if ( uvType ) {

			if ( geometry.faceUvs.length > 0 || geometry.faceVertexUvs.length > 0 ) {

				geometryGroup.__uvArray = new Float32Array( nvertices * 2 );

			}

			if ( geometry.faceUvs.length > 1 || geometry.faceVertexUvs.length > 1 ) {

				geometryGroup.__uv2Array = new Float32Array( nvertices * 2 );

			}

		}

		if ( object.geometry.skinWeights.length && object.geometry.skinIndices.length ) {

			geometryGroup.__skinVertexAArray = new Float32Array( nvertices * 4 );
			geometryGroup.__skinVertexBArray = new Float32Array( nvertices * 4 );
			geometryGroup.__skinIndexArray = new Float32Array( nvertices * 4 );
			geometryGroup.__skinWeightArray = new Float32Array( nvertices * 4 );

		}

		geometryGroup.__faceArray = new Uint16Array( ntris * 3 );
		geometryGroup.__lineArray = new Uint16Array( nlines * 2 );

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__morphTargetsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__morphTargetsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__morphNormalsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__morphNormalsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		geometryGroup.__webglFaceCount = ntris * 3;
		geometryGroup.__webglLineCount = nlines * 2;


		// custom attributes

		if ( material.attributes ) {

			if ( geometryGroup.__webglCustomAttributesList === undefined ) {

				geometryGroup.__webglCustomAttributesList = [];

			}

			for ( var a in material.attributes ) {

				// Do a shallow copy of the attribute object so different geometryGroup chunks use different
				// attribute buffers which are correctly indexed in the setMeshBuffers function

				var originalAttribute = material.attributes[ a ];

				var attribute = {};

				for ( var property in originalAttribute ) {

					attribute[ property ] = originalAttribute[ property ];

				}

				if( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;		// "f" and "i"

					if( attribute.type === "v2" ) size = 2;
					else if( attribute.type === "v3" ) size = 3;
					else if( attribute.type === "v4" ) size = 4;
					else if( attribute.type === "c"  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = a;

					originalAttribute.needsUpdate = true;
					attribute.__original = originalAttribute;

				}

				geometryGroup.__webglCustomAttributesList.push( attribute );

			}

		}

		geometryGroup.__inittedArrays = true;

	};

	function getBufferMaterial( object, geometryGroup ) {

		if ( object.material && ! ( object.material instanceof THREE.MeshFaceMaterial ) ) {

			return object.material;

		} else if ( geometryGroup.materialIndex >= 0 ) {

			return object.geometry.materials[ geometryGroup.materialIndex ];

		}

	};

	function materialNeedsSmoothNormals ( material ) {

		return material && material.shading !== undefined && material.shading === THREE.SmoothShading;

	};

	function bufferGuessNormalType ( material ) {

		// only MeshBasicMaterial and MeshDepthMaterial don't need normals

		if ( ( material instanceof THREE.MeshBasicMaterial && !material.envMap ) || material instanceof THREE.MeshDepthMaterial ) {

			return false;

		}

		if ( materialNeedsSmoothNormals( material ) ) {

			return THREE.SmoothShading;

		} else {

			return THREE.FlatShading;

		}

	};

	function bufferGuessVertexColorType ( material ) {

		if ( material.vertexColors ) {

			return material.vertexColors;

		}

		return false;

	};

	function bufferGuessUVType ( material ) {

		// material must use some texture to require uvs

		if ( material.map || material.lightMap || material instanceof THREE.ShaderMaterial ) {

			return true;

		}

		return false;

	};

	// Buffer setting

	function setParticleBuffers ( geometry, hint, object ) {

		var v, c, vertex, offset, index, color,

		vertices = geometry.vertices,
		vl = vertices.length,

		colors = geometry.colors,
		cl = colors.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,

		sortArray = geometry.__sortArray,

		dirtyVertices = geometry.__dirtyVertices,
		dirtyElements = geometry.__dirtyElements,
		dirtyColors = geometry.__dirtyColors,

		customAttributes = geometry.__webglCustomAttributesList,
		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( object.sortParticles ) {

			_projScreenMatrixPS.copy( _projScreenMatrix );
			_projScreenMatrixPS.multiplySelf( object.matrixWorld );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ].position;

				_vector3.copy( vertex );
				_projScreenMatrixPS.multiplyVector3( _vector3 );

				sortArray[ v ] = [ _vector3.z, v ];

			}

			sortArray.sort( function( a, b ) { return b[ 0 ] - a[ 0 ]; } );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ sortArray[v][1] ].position;

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			for ( c = 0; c < cl; c ++ ) {

				offset = c * 3;

				color = colors[ sortArray[c][1] ];

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( ! ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) ) continue;

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							customAttribute.array[ ca ] = customAttribute.value[ index ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ] 	= value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === "c" ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ]     = value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ]      = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

				}

			}

		} else {

			if ( dirtyVertices ) {

				for ( v = 0; v < vl; v ++ ) {

					vertex = vertices[ v ].position;

					offset = v * 3;

					vertexArray[ offset ]     = vertex.x;
					vertexArray[ offset + 1 ] = vertex.y;
					vertexArray[ offset + 2 ] = vertex.z;

				}

			}

			if ( dirtyColors ) {

				for ( c = 0; c < cl; c ++ ) {

					color = colors[ c ];

					offset = c * 3;

					colorArray[ offset ]     = color.r;
					colorArray[ offset + 1 ] = color.g;
					colorArray[ offset + 2 ] = color.b;

				}

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( customAttribute.needsUpdate &&
						 ( customAttribute.boundTo === undefined ||
						   customAttribute.boundTo === "vertices") ) {

						cal = customAttribute.value.length;

						offset = 0;

						if ( customAttribute.size === 1 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								customAttribute.array[ ca ] = customAttribute.value[ ca ];

							}

						} else if ( customAttribute.size === 2 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;

								offset += 2;

							}

						} else if ( customAttribute.size === 3 ) {

							if ( customAttribute.type === "c" ) {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ] 	= value.r;
									customAttribute.array[ offset + 1 ] = value.g;
									customAttribute.array[ offset + 2 ] = value.b;

									offset += 3;

								}

							} else {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ] 	= value.x;
									customAttribute.array[ offset + 1 ] = value.y;
									customAttribute.array[ offset + 2 ] = value.z;

									offset += 3;

								}

							}

						} else if ( customAttribute.size === 4 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]      = value.x;
								customAttribute.array[ offset + 1  ] = value.y;
								customAttribute.array[ offset + 2  ] = value.z;
								customAttribute.array[ offset + 3  ] = value.w;

								offset += 4;

							}

						}

					}

				}

			}

		}

		if ( dirtyVertices || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate || object.sortParticles ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}


	};

	function setLineBuffers ( geometry, hint ) {

		var v, c, vertex, offset, color,

		vertices = geometry.vertices,
		colors = geometry.colors,
		vl = vertices.length,
		cl = colors.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,

		dirtyVertices = geometry.__dirtyVertices,
		dirtyColors = geometry.__dirtyColors,

		customAttributes = geometry.__webglCustomAttributesList,

		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( dirtyVertices ) {

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ].position;

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors ) {

			for ( c = 0; c < cl; c ++ ) {

				color = colors[ c ];

				offset = c * 3;

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate &&
					 ( customAttribute.boundTo === undefined ||
					   customAttribute.boundTo === "vertices" ) ) {

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							customAttribute.array[ ca ] = customAttribute.value[ ca ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	= value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === "c" ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ] 	= value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ] 	 = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}

	};

	function setRibbonBuffers ( geometry, hint ) {

		var v, c, vertex, offset, color,

		vertices = geometry.vertices,
		colors = geometry.colors,
		vl = vertices.length,
		cl = colors.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,

		dirtyVertices = geometry.__dirtyVertices,
		dirtyColors = geometry.__dirtyColors;

		if ( dirtyVertices ) {

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ].position;

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors ) {

			for ( c = 0; c < cl; c ++ ) {

				color = colors[ c ];

				offset = c * 3;

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

	};

	function setMeshBuffers( geometryGroup, object, hint, dispose, material ) {

		if ( ! geometryGroup.__inittedArrays ) {

			// console.log( object );
			return;

		}

		var normalType = bufferGuessNormalType( material ),
		vertexColorType = bufferGuessVertexColorType( material ),
		uvType = bufferGuessUVType( material ),

		needsSmoothNormals = ( normalType === THREE.SmoothShading );

		var f, fl, fi, face,
		vertexNormals, faceNormal, normal,
		vertexColors, faceColor,
		vertexTangents,
		uv, uv2, v1, v2, v3, v4, t1, t2, t3, t4, n1, n2, n3, n4,
		c1, c2, c3, c4,
		sw1, sw2, sw3, sw4,
		si1, si2, si3, si4,
		sa1, sa2, sa3, sa4,
		sb1, sb2, sb3, sb4,
		m, ml, i, il,
		vn, uvi, uv2i,
		vk, vkl, vka,
		nka, chf, faceVertexNormals,
		a,

		vertexIndex = 0,

		offset = 0,
		offset_uv = 0,
		offset_uv2 = 0,
		offset_face = 0,
		offset_normal = 0,
		offset_tangent = 0,
		offset_line = 0,
		offset_color = 0,
		offset_skin = 0,
		offset_morphTarget = 0,
		offset_custom = 0,
		offset_customSrc = 0,

		value,

		vertexArray = geometryGroup.__vertexArray,
		uvArray = geometryGroup.__uvArray,
		uv2Array = geometryGroup.__uv2Array,
		normalArray = geometryGroup.__normalArray,
		tangentArray = geometryGroup.__tangentArray,
		colorArray = geometryGroup.__colorArray,

		skinVertexAArray = geometryGroup.__skinVertexAArray,
		skinVertexBArray = geometryGroup.__skinVertexBArray,
		skinIndexArray = geometryGroup.__skinIndexArray,
		skinWeightArray = geometryGroup.__skinWeightArray,

		morphTargetsArrays = geometryGroup.__morphTargetsArrays,
		morphNormalsArrays = geometryGroup.__morphNormalsArrays,

		customAttributes = geometryGroup.__webglCustomAttributesList,
		customAttribute,

		faceArray = geometryGroup.__faceArray,
		lineArray = geometryGroup.__lineArray,

		geometry = object.geometry, // this is shared for all chunks

		dirtyVertices = geometry.__dirtyVertices,
		dirtyElements = geometry.__dirtyElements,
		dirtyUvs = geometry.__dirtyUvs,
		dirtyNormals = geometry.__dirtyNormals,
		dirtyTangents = geometry.__dirtyTangents,
		dirtyColors = geometry.__dirtyColors,
		dirtyMorphTargets = geometry.__dirtyMorphTargets,

		vertices = geometry.vertices,
		chunk_faces3 = geometryGroup.faces3,
		chunk_faces4 = geometryGroup.faces4,
		obj_faces = geometry.faces,

		obj_uvs  = geometry.faceVertexUvs[ 0 ],
		obj_uvs2 = geometry.faceVertexUvs[ 1 ],

		obj_colors = geometry.colors,

		obj_skinVerticesA = geometry.skinVerticesA,
		obj_skinVerticesB = geometry.skinVerticesB,
		obj_skinIndices = geometry.skinIndices,
		obj_skinWeights = geometry.skinWeights,

		morphTargets = geometry.morphTargets,
		morphNormals = geometry.morphNormals;

		if ( dirtyVertices ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				v1 = vertices[ face.a ].position;
				v2 = vertices[ face.b ].position;
				v3 = vertices[ face.c ].position;

				vertexArray[ offset ]     = v1.x;
				vertexArray[ offset + 1 ] = v1.y;
				vertexArray[ offset + 2 ] = v1.z;

				vertexArray[ offset + 3 ] = v2.x;
				vertexArray[ offset + 4 ] = v2.y;
				vertexArray[ offset + 5 ] = v2.z;

				vertexArray[ offset + 6 ] = v3.x;
				vertexArray[ offset + 7 ] = v3.y;
				vertexArray[ offset + 8 ] = v3.z;

				offset += 9;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				v1 = vertices[ face.a ].position;
				v2 = vertices[ face.b ].position;
				v3 = vertices[ face.c ].position;
				v4 = vertices[ face.d ].position;

				vertexArray[ offset ]     = v1.x;
				vertexArray[ offset + 1 ] = v1.y;
				vertexArray[ offset + 2 ] = v1.z;

				vertexArray[ offset + 3 ] = v2.x;
				vertexArray[ offset + 4 ] = v2.y;
				vertexArray[ offset + 5 ] = v2.z;

				vertexArray[ offset + 6 ] = v3.x;
				vertexArray[ offset + 7 ] = v3.y;
				vertexArray[ offset + 8 ] = v3.z;

				vertexArray[ offset + 9 ]  = v4.x;
				vertexArray[ offset + 10 ] = v4.y;
				vertexArray[ offset + 11 ] = v4.z;

				offset += 12;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyMorphTargets ) {

			for ( vk = 0, vkl = morphTargets.length; vk < vkl; vk ++ ) {

				offset_morphTarget = 0;

				for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

					chf = chunk_faces3[ f ];
					face = obj_faces[ chf ];

					// morph positions

					v1 = morphTargets[ vk ].vertices[ face.a ].position;
					v2 = morphTargets[ vk ].vertices[ face.b ].position;
					v3 = morphTargets[ vk ].vertices[ face.c ].position;

					vka = morphTargetsArrays[ vk ];

					vka[ offset_morphTarget ] 	  = v1.x;
					vka[ offset_morphTarget + 1 ] = v1.y;
					vka[ offset_morphTarget + 2 ] = v1.z;

					vka[ offset_morphTarget + 3 ] = v2.x;
					vka[ offset_morphTarget + 4 ] = v2.y;
					vka[ offset_morphTarget + 5 ] = v2.z;

					vka[ offset_morphTarget + 6 ] = v3.x;
					vka[ offset_morphTarget + 7 ] = v3.y;
					vka[ offset_morphTarget + 8 ] = v3.z;

					// morph normals

					if ( material.morphNormals ) {

						if ( needsSmoothNormals ) {

							faceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];

							n1 = faceVertexNormals.a;
							n2 = faceVertexNormals.b;
							n3 = faceVertexNormals.c;

						} else {

							n1 = morphNormals[ vk ].faceNormals[ chf ];
							n2 = n1;
							n3 = n1;

						}

						nka = morphNormalsArrays[ vk ];

						nka[ offset_morphTarget ] 	  = n1.x;
						nka[ offset_morphTarget + 1 ] = n1.y;
						nka[ offset_morphTarget + 2 ] = n1.z;

						nka[ offset_morphTarget + 3 ] = n2.x;
						nka[ offset_morphTarget + 4 ] = n2.y;
						nka[ offset_morphTarget + 5 ] = n2.z;

						nka[ offset_morphTarget + 6 ] = n3.x;
						nka[ offset_morphTarget + 7 ] = n3.y;
						nka[ offset_morphTarget + 8 ] = n3.z;

					}

					//

					offset_morphTarget += 9;

				}

				for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

					chf = chunk_faces4[ f ];
					face = obj_faces[ chf ];

					// morph positions

					v1 = morphTargets[ vk ].vertices[ face.a ].position;
					v2 = morphTargets[ vk ].vertices[ face.b ].position;
					v3 = morphTargets[ vk ].vertices[ face.c ].position;
					v4 = morphTargets[ vk ].vertices[ face.d ].position;

					vka = morphTargetsArrays[ vk ];

					vka[ offset_morphTarget ] 	  = v1.x;
					vka[ offset_morphTarget + 1 ] = v1.y;
					vka[ offset_morphTarget + 2 ] = v1.z;

					vka[ offset_morphTarget + 3 ] = v2.x;
					vka[ offset_morphTarget + 4 ] = v2.y;
					vka[ offset_morphTarget + 5 ] = v2.z;

					vka[ offset_morphTarget + 6 ] = v3.x;
					vka[ offset_morphTarget + 7 ] = v3.y;
					vka[ offset_morphTarget + 8 ] = v3.z;

					vka[ offset_morphTarget + 9 ]  = v4.x;
					vka[ offset_morphTarget + 10 ] = v4.y;
					vka[ offset_morphTarget + 11 ] = v4.z;

					// morph normals

					if ( material.morphNormals ) {

						if ( needsSmoothNormals ) {

							faceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];

							n1 = faceVertexNormals.a;
							n2 = faceVertexNormals.b;
							n3 = faceVertexNormals.c;
							n4 = faceVertexNormals.d;

						} else {

							n1 = morphNormals[ vk ].faceNormals[ chf ];
							n2 = n1;
							n3 = n1;
							n4 = n1;

						}

						nka = morphNormalsArrays[ vk ];

						nka[ offset_morphTarget ] 	  = n1.x;
						nka[ offset_morphTarget + 1 ] = n1.y;
						nka[ offset_morphTarget + 2 ] = n1.z;

						nka[ offset_morphTarget + 3 ] = n2.x;
						nka[ offset_morphTarget + 4 ] = n2.y;
						nka[ offset_morphTarget + 5 ] = n2.z;

						nka[ offset_morphTarget + 6 ] = n3.x;
						nka[ offset_morphTarget + 7 ] = n3.y;
						nka[ offset_morphTarget + 8 ] = n3.z;

						nka[ offset_morphTarget + 9 ]  = n4.x;
						nka[ offset_morphTarget + 10 ] = n4.y;
						nka[ offset_morphTarget + 11 ] = n4.z;

					}

					//

					offset_morphTarget += 12;

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ vk ] );
				_gl.bufferData( _gl.ARRAY_BUFFER, morphTargetsArrays[ vk ], hint );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ vk ] );
					_gl.bufferData( _gl.ARRAY_BUFFER, morphNormalsArrays[ vk ], hint );

				}

			}

		}

		if ( obj_skinWeights.length ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				// weights

				sw1 = obj_skinWeights[ face.a ];
				sw2 = obj_skinWeights[ face.b ];
				sw3 = obj_skinWeights[ face.c ];

				skinWeightArray[ offset_skin ]     = sw1.x;
				skinWeightArray[ offset_skin + 1 ] = sw1.y;
				skinWeightArray[ offset_skin + 2 ] = sw1.z;
				skinWeightArray[ offset_skin + 3 ] = sw1.w;

				skinWeightArray[ offset_skin + 4 ] = sw2.x;
				skinWeightArray[ offset_skin + 5 ] = sw2.y;
				skinWeightArray[ offset_skin + 6 ] = sw2.z;
				skinWeightArray[ offset_skin + 7 ] = sw2.w;

				skinWeightArray[ offset_skin + 8 ]  = sw3.x;
				skinWeightArray[ offset_skin + 9 ]  = sw3.y;
				skinWeightArray[ offset_skin + 10 ] = sw3.z;
				skinWeightArray[ offset_skin + 11 ] = sw3.w;

				// indices

				si1 = obj_skinIndices[ face.a ];
				si2 = obj_skinIndices[ face.b ];
				si3 = obj_skinIndices[ face.c ];

				skinIndexArray[ offset_skin ]     = si1.x;
				skinIndexArray[ offset_skin + 1 ] = si1.y;
				skinIndexArray[ offset_skin + 2 ] = si1.z;
				skinIndexArray[ offset_skin + 3 ] = si1.w;

				skinIndexArray[ offset_skin + 4 ] = si2.x;
				skinIndexArray[ offset_skin + 5 ] = si2.y;
				skinIndexArray[ offset_skin + 6 ] = si2.z;
				skinIndexArray[ offset_skin + 7 ] = si2.w;

				skinIndexArray[ offset_skin + 8 ]  = si3.x;
				skinIndexArray[ offset_skin + 9 ]  = si3.y;
				skinIndexArray[ offset_skin + 10 ] = si3.z;
				skinIndexArray[ offset_skin + 11 ] = si3.w;

				// vertices A

				sa1 = obj_skinVerticesA[ face.a ];
				sa2 = obj_skinVerticesA[ face.b ];
				sa3 = obj_skinVerticesA[ face.c ];

				skinVertexAArray[ offset_skin ]     = sa1.x;
				skinVertexAArray[ offset_skin + 1 ] = sa1.y;
				skinVertexAArray[ offset_skin + 2 ] = sa1.z;
				skinVertexAArray[ offset_skin + 3 ] = 1; // pad for faster vertex shader

				skinVertexAArray[ offset_skin + 4 ] = sa2.x;
				skinVertexAArray[ offset_skin + 5 ] = sa2.y;
				skinVertexAArray[ offset_skin + 6 ] = sa2.z;
				skinVertexAArray[ offset_skin + 7 ] = 1;

				skinVertexAArray[ offset_skin + 8 ]  = sa3.x;
				skinVertexAArray[ offset_skin + 9 ]  = sa3.y;
				skinVertexAArray[ offset_skin + 10 ] = sa3.z;
				skinVertexAArray[ offset_skin + 11 ] = 1;

				// vertices B

				sb1 = obj_skinVerticesB[ face.a ];
				sb2 = obj_skinVerticesB[ face.b ];
				sb3 = obj_skinVerticesB[ face.c ];

				skinVertexBArray[ offset_skin ]     = sb1.x;
				skinVertexBArray[ offset_skin + 1 ] = sb1.y;
				skinVertexBArray[ offset_skin + 2 ] = sb1.z;
				skinVertexBArray[ offset_skin + 3 ] = 1; // pad for faster vertex shader

				skinVertexBArray[ offset_skin + 4 ] = sb2.x;
				skinVertexBArray[ offset_skin + 5 ] = sb2.y;
				skinVertexBArray[ offset_skin + 6 ] = sb2.z;
				skinVertexBArray[ offset_skin + 7 ] = 1;

				skinVertexBArray[ offset_skin + 8 ]  = sb3.x;
				skinVertexBArray[ offset_skin + 9 ]  = sb3.y;
				skinVertexBArray[ offset_skin + 10 ] = sb3.z;
				skinVertexBArray[ offset_skin + 11 ] = 1;

				offset_skin += 12;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				// weights

				sw1 = obj_skinWeights[ face.a ];
				sw2 = obj_skinWeights[ face.b ];
				sw3 = obj_skinWeights[ face.c ];
				sw4 = obj_skinWeights[ face.d ];

				skinWeightArray[ offset_skin ]     = sw1.x;
				skinWeightArray[ offset_skin + 1 ] = sw1.y;
				skinWeightArray[ offset_skin + 2 ] = sw1.z;
				skinWeightArray[ offset_skin + 3 ] = sw1.w;

				skinWeightArray[ offset_skin + 4 ] = sw2.x;
				skinWeightArray[ offset_skin + 5 ] = sw2.y;
				skinWeightArray[ offset_skin + 6 ] = sw2.z;
				skinWeightArray[ offset_skin + 7 ] = sw2.w;

				skinWeightArray[ offset_skin + 8 ]  = sw3.x;
				skinWeightArray[ offset_skin + 9 ]  = sw3.y;
				skinWeightArray[ offset_skin + 10 ] = sw3.z;
				skinWeightArray[ offset_skin + 11 ] = sw3.w;

				skinWeightArray[ offset_skin + 12 ] = sw4.x;
				skinWeightArray[ offset_skin + 13 ] = sw4.y;
				skinWeightArray[ offset_skin + 14 ] = sw4.z;
				skinWeightArray[ offset_skin + 15 ] = sw4.w;

				// indices

				si1 = obj_skinIndices[ face.a ];
				si2 = obj_skinIndices[ face.b ];
				si3 = obj_skinIndices[ face.c ];
				si4 = obj_skinIndices[ face.d ];

				skinIndexArray[ offset_skin ]     = si1.x;
				skinIndexArray[ offset_skin + 1 ] = si1.y;
				skinIndexArray[ offset_skin + 2 ] = si1.z;
				skinIndexArray[ offset_skin + 3 ] = si1.w;

				skinIndexArray[ offset_skin + 4 ] = si2.x;
				skinIndexArray[ offset_skin + 5 ] = si2.y;
				skinIndexArray[ offset_skin + 6 ] = si2.z;
				skinIndexArray[ offset_skin + 7 ] = si2.w;

				skinIndexArray[ offset_skin + 8 ]  = si3.x;
				skinIndexArray[ offset_skin + 9 ]  = si3.y;
				skinIndexArray[ offset_skin + 10 ] = si3.z;
				skinIndexArray[ offset_skin + 11 ] = si3.w;

				skinIndexArray[ offset_skin + 12 ] = si4.x;
				skinIndexArray[ offset_skin + 13 ] = si4.y;
				skinIndexArray[ offset_skin + 14 ] = si4.z;
				skinIndexArray[ offset_skin + 15 ] = si4.w;

				// vertices A

				sa1 = obj_skinVerticesA[ face.a ];
				sa2 = obj_skinVerticesA[ face.b ];
				sa3 = obj_skinVerticesA[ face.c ];
				sa4 = obj_skinVerticesA[ face.d ];

				skinVertexAArray[ offset_skin ]     = sa1.x;
				skinVertexAArray[ offset_skin + 1 ] = sa1.y;
				skinVertexAArray[ offset_skin + 2 ] = sa1.z;
				skinVertexAArray[ offset_skin + 3 ] = 1; // pad for faster vertex shader

				skinVertexAArray[ offset_skin + 4 ] = sa2.x;
				skinVertexAArray[ offset_skin + 5 ] = sa2.y;
				skinVertexAArray[ offset_skin + 6 ] = sa2.z;
				skinVertexAArray[ offset_skin + 7 ] = 1;

				skinVertexAArray[ offset_skin + 8 ]  = sa3.x;
				skinVertexAArray[ offset_skin + 9 ]  = sa3.y;
				skinVertexAArray[ offset_skin + 10 ] = sa3.z;
				skinVertexAArray[ offset_skin + 11 ] = 1;

				skinVertexAArray[ offset_skin + 12 ] = sa4.x;
				skinVertexAArray[ offset_skin + 13 ] = sa4.y;
				skinVertexAArray[ offset_skin + 14 ] = sa4.z;
				skinVertexAArray[ offset_skin + 15 ] = 1;

				// vertices B

				sb1 = obj_skinVerticesB[ face.a ];
				sb2 = obj_skinVerticesB[ face.b ];
				sb3 = obj_skinVerticesB[ face.c ];
				sb4 = obj_skinVerticesB[ face.d ];

				skinVertexBArray[ offset_skin ]     = sb1.x;
				skinVertexBArray[ offset_skin + 1 ] = sb1.y;
				skinVertexBArray[ offset_skin + 2 ] = sb1.z;
				skinVertexBArray[ offset_skin + 3 ] = 1; // pad for faster vertex shader

				skinVertexBArray[ offset_skin + 4 ] = sb2.x;
				skinVertexBArray[ offset_skin + 5 ] = sb2.y;
				skinVertexBArray[ offset_skin + 6 ] = sb2.z;
				skinVertexBArray[ offset_skin + 7 ] = 1;

				skinVertexBArray[ offset_skin + 8 ]  = sb3.x;
				skinVertexBArray[ offset_skin + 9 ]  = sb3.y;
				skinVertexBArray[ offset_skin + 10 ] = sb3.z;
				skinVertexBArray[ offset_skin + 11 ] = 1;

				skinVertexBArray[ offset_skin + 12 ] = sb4.x;
				skinVertexBArray[ offset_skin + 13 ] = sb4.y;
				skinVertexBArray[ offset_skin + 14 ] = sb4.z;
				skinVertexBArray[ offset_skin + 15 ] = 1;

				offset_skin += 16;

			}

			if ( offset_skin > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinVertexABuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinVertexAArray, hint );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinVertexBBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinVertexBArray, hint );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinIndexArray, hint );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinWeightArray, hint );

			}

		}

		if ( dirtyColors && vertexColorType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexColors = face.vertexColors;
				faceColor = face.color;

				if ( vertexColors.length === 3 && vertexColorType === THREE.VertexColors ) {

					c1 = vertexColors[ 0 ];
					c2 = vertexColors[ 1 ];
					c3 = vertexColors[ 2 ];

				} else {

					c1 = faceColor;
					c2 = faceColor;
					c3 = faceColor;

				}

				colorArray[ offset_color ]     = c1.r;
				colorArray[ offset_color + 1 ] = c1.g;
				colorArray[ offset_color + 2 ] = c1.b;

				colorArray[ offset_color + 3 ] = c2.r;
				colorArray[ offset_color + 4 ] = c2.g;
				colorArray[ offset_color + 5 ] = c2.b;

				colorArray[ offset_color + 6 ] = c3.r;
				colorArray[ offset_color + 7 ] = c3.g;
				colorArray[ offset_color + 8 ] = c3.b;

				offset_color += 9;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexColors = face.vertexColors;
				faceColor = face.color;

				if ( vertexColors.length === 4 && vertexColorType === THREE.VertexColors ) {

					c1 = vertexColors[ 0 ];
					c2 = vertexColors[ 1 ];
					c3 = vertexColors[ 2 ];
					c4 = vertexColors[ 3 ];

				} else {

					c1 = faceColor;
					c2 = faceColor;
					c3 = faceColor;
					c4 = faceColor;

				}

				colorArray[ offset_color ]     = c1.r;
				colorArray[ offset_color + 1 ] = c1.g;
				colorArray[ offset_color + 2 ] = c1.b;

				colorArray[ offset_color + 3 ] = c2.r;
				colorArray[ offset_color + 4 ] = c2.g;
				colorArray[ offset_color + 5 ] = c2.b;

				colorArray[ offset_color + 6 ] = c3.r;
				colorArray[ offset_color + 7 ] = c3.g;
				colorArray[ offset_color + 8 ] = c3.b;

				colorArray[ offset_color + 9 ]  = c4.r;
				colorArray[ offset_color + 10 ] = c4.g;
				colorArray[ offset_color + 11 ] = c4.b;

				offset_color += 12;

			}

			if ( offset_color > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

			}

		}

		if ( dirtyTangents && geometry.hasTangents ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexTangents = face.vertexTangents;

				t1 = vertexTangents[ 0 ];
				t2 = vertexTangents[ 1 ];
				t3 = vertexTangents[ 2 ];

				tangentArray[ offset_tangent ]     = t1.x;
				tangentArray[ offset_tangent + 1 ] = t1.y;
				tangentArray[ offset_tangent + 2 ] = t1.z;
				tangentArray[ offset_tangent + 3 ] = t1.w;

				tangentArray[ offset_tangent + 4 ] = t2.x;
				tangentArray[ offset_tangent + 5 ] = t2.y;
				tangentArray[ offset_tangent + 6 ] = t2.z;
				tangentArray[ offset_tangent + 7 ] = t2.w;

				tangentArray[ offset_tangent + 8 ]  = t3.x;
				tangentArray[ offset_tangent + 9 ]  = t3.y;
				tangentArray[ offset_tangent + 10 ] = t3.z;
				tangentArray[ offset_tangent + 11 ] = t3.w;

				offset_tangent += 12;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexTangents = face.vertexTangents;

				t1 = vertexTangents[ 0 ];
				t2 = vertexTangents[ 1 ];
				t3 = vertexTangents[ 2 ];
				t4 = vertexTangents[ 3 ];

				tangentArray[ offset_tangent ]     = t1.x;
				tangentArray[ offset_tangent + 1 ] = t1.y;
				tangentArray[ offset_tangent + 2 ] = t1.z;
				tangentArray[ offset_tangent + 3 ] = t1.w;

				tangentArray[ offset_tangent + 4 ] = t2.x;
				tangentArray[ offset_tangent + 5 ] = t2.y;
				tangentArray[ offset_tangent + 6 ] = t2.z;
				tangentArray[ offset_tangent + 7 ] = t2.w;

				tangentArray[ offset_tangent + 8 ]  = t3.x;
				tangentArray[ offset_tangent + 9 ]  = t3.y;
				tangentArray[ offset_tangent + 10 ] = t3.z;
				tangentArray[ offset_tangent + 11 ] = t3.w;

				tangentArray[ offset_tangent + 12 ] = t4.x;
				tangentArray[ offset_tangent + 13 ] = t4.y;
				tangentArray[ offset_tangent + 14 ] = t4.z;
				tangentArray[ offset_tangent + 15 ] = t4.w;

				offset_tangent += 16;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, tangentArray, hint );

		}

		if ( dirtyNormals && normalType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				vertexNormals = face.vertexNormals;
				faceNormal = face.normal;

				if ( vertexNormals.length === 3 && needsSmoothNormals ) {

					for ( i = 0; i < 3; i ++ ) {

						vn = vertexNormals[ i ];

						normalArray[ offset_normal ]     = vn.x;
						normalArray[ offset_normal + 1 ] = vn.y;
						normalArray[ offset_normal + 2 ] = vn.z;

						offset_normal += 3;

					}

				} else {

					for ( i = 0; i < 3; i ++ ) {

						normalArray[ offset_normal ]     = faceNormal.x;
						normalArray[ offset_normal + 1 ] = faceNormal.y;
						normalArray[ offset_normal + 2 ] = faceNormal.z;

						offset_normal += 3;

					}

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				vertexNormals = face.vertexNormals;
				faceNormal = face.normal;

				if ( vertexNormals.length === 4 && needsSmoothNormals ) {

					for ( i = 0; i < 4; i ++ ) {

						vn = vertexNormals[ i ];

						normalArray[ offset_normal ]     = vn.x;
						normalArray[ offset_normal + 1 ] = vn.y;
						normalArray[ offset_normal + 2 ] = vn.z;

						offset_normal += 3;

					}

				} else {

					for ( i = 0; i < 4; i ++ ) {

						normalArray[ offset_normal ]     = faceNormal.x;
						normalArray[ offset_normal + 1 ] = faceNormal.y;
						normalArray[ offset_normal + 2 ] = faceNormal.z;

						offset_normal += 3;

					}

				}

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );

		}

		if ( dirtyUvs && obj_uvs && uvType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				face = obj_faces[ fi ];
				uv = obj_uvs[ fi ];

				if ( uv === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uvi = uv[ i ];

					uvArray[ offset_uv ]     = uvi.u;
					uvArray[ offset_uv + 1 ] = uvi.v;

					offset_uv += 2;

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				fi = chunk_faces4[ f ];

				face = obj_faces[ fi ];
				uv = obj_uvs[ fi ];

				if ( uv === undefined ) continue;

				for ( i = 0; i < 4; i ++ ) {

					uvi = uv[ i ];

					uvArray[ offset_uv ]     = uvi.u;
					uvArray[ offset_uv + 1 ] = uvi.v;

					offset_uv += 2;

				}

			}

			if ( offset_uv > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uvArray, hint );

			}

		}

		if ( dirtyUvs && obj_uvs2 && uvType ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				face = obj_faces[ fi ];
				uv2 = obj_uvs2[ fi ];

				if ( uv2 === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uv2i = uv2[ i ];

					uv2Array[ offset_uv2 ]     = uv2i.u;
					uv2Array[ offset_uv2 + 1 ] = uv2i.v;

					offset_uv2 += 2;

				}

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				fi = chunk_faces4[ f ];

				face = obj_faces[ fi ];
				uv2 = obj_uvs2[ fi ];

				if ( uv2 === undefined ) continue;

				for ( i = 0; i < 4; i ++ ) {

					uv2i = uv2[ i ];

					uv2Array[ offset_uv2 ]     = uv2i.u;
					uv2Array[ offset_uv2 + 1 ] = uv2i.v;

					offset_uv2 += 2;

				}

			}

			if ( offset_uv2 > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uv2Array, hint );

			}

		}

		if ( dirtyElements ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ]	];

				faceArray[ offset_face ] 	 = vertexIndex;
				faceArray[ offset_face + 1 ] = vertexIndex + 1;
				faceArray[ offset_face + 2 ] = vertexIndex + 2;

				offset_face += 3;

				lineArray[ offset_line ]     = vertexIndex;
				lineArray[ offset_line + 1 ] = vertexIndex + 1;

				lineArray[ offset_line + 2 ] = vertexIndex;
				lineArray[ offset_line + 3 ] = vertexIndex + 2;

				lineArray[ offset_line + 4 ] = vertexIndex + 1;
				lineArray[ offset_line + 5 ] = vertexIndex + 2;

				offset_line += 6;

				vertexIndex += 3;

			}

			for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces4[ f ] ];

				faceArray[ offset_face ]     = vertexIndex;
				faceArray[ offset_face + 1 ] = vertexIndex + 1;
				faceArray[ offset_face + 2 ] = vertexIndex + 3;

				faceArray[ offset_face + 3 ] = vertexIndex + 1;
				faceArray[ offset_face + 4 ] = vertexIndex + 2;
				faceArray[ offset_face + 5 ] = vertexIndex + 3;

				offset_face += 6;

				lineArray[ offset_line ]     = vertexIndex;
				lineArray[ offset_line + 1 ] = vertexIndex + 1;

				lineArray[ offset_line + 2 ] = vertexIndex;
				lineArray[ offset_line + 3 ] = vertexIndex + 3;

				lineArray[ offset_line + 4 ] = vertexIndex + 1;
				lineArray[ offset_line + 5 ] = vertexIndex + 2;

				lineArray[ offset_line + 6 ] = vertexIndex + 2;
				lineArray[ offset_line + 7 ] = vertexIndex + 3;

				offset_line += 8;

				vertexIndex += 4;

			}

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, faceArray, hint );

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, lineArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( ! customAttribute.__original.needsUpdate ) continue;

				offset_custom = 0;
				offset_customSrc = 0;

				if ( customAttribute.size === 1 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							customAttribute.array[ offset_custom ] 	   = customAttribute.value[ face.a ];
							customAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];
							customAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];

							offset_custom += 3;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							customAttribute.array[ offset_custom ] 	   = customAttribute.value[ face.a ];
							customAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];
							customAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];
							customAttribute.array[ offset_custom + 3 ] = customAttribute.value[ face.d ];

							offset_custom += 4;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							customAttribute.array[ offset_custom ] 	   = value;
							customAttribute.array[ offset_custom + 1 ] = value;
							customAttribute.array[ offset_custom + 2 ] = value;

							offset_custom += 3;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							customAttribute.array[ offset_custom ] 	   = value;
							customAttribute.array[ offset_custom + 1 ] = value;
							customAttribute.array[ offset_custom + 2 ] = value;
							customAttribute.array[ offset_custom + 3 ] = value;

							offset_custom += 4;

						}

					}

				} else if ( customAttribute.size === 2 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							customAttribute.array[ offset_custom + 6 ] = v4.x;
							customAttribute.array[ offset_custom + 7 ] = v4.y;

							offset_custom += 8;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom ] 	   = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							customAttribute.array[ offset_custom + 6 ] = v4.x;
							customAttribute.array[ offset_custom + 7 ] = v4.y;

							offset_custom += 8;

						}

					}

				} else if ( customAttribute.size === 3 ) {

					var pp;

					if ( customAttribute.type === "c" ) {

						pp = [ "r", "g", "b" ];

					} else {

						pp = [ "x", "y", "z" ];

					}

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ] 	   = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom  ] 	= v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];

							offset_custom += 12;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ] 	   = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom  ] 	= v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];

							offset_custom += 12;

						}

					}

				} else if ( customAttribute.size === 4 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === "vertices" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ]	];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces4[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];
							v4 = customAttribute.value[ face.d ];

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							customAttribute.array[ offset_custom + 12 ] = v4.x;
							customAttribute.array[ offset_custom + 13 ] = v4.y;
							customAttribute.array[ offset_custom + 14 ] = v4.z;
							customAttribute.array[ offset_custom + 15 ] = v4.w;

							offset_custom += 16;

						}

					} else if ( customAttribute.boundTo === "faces" ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

						for ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces4[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;
							v4 = value;

							customAttribute.array[ offset_custom  ] 	= v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							customAttribute.array[ offset_custom + 12 ] = v4.x;
							customAttribute.array[ offset_custom + 13 ] = v4.y;
							customAttribute.array[ offset_custom + 14 ] = v4.z;
							customAttribute.array[ offset_custom + 15 ] = v4.w;

							offset_custom += 16;

						}

					}

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

			}

		}

		if ( dispose ) {

			delete geometryGroup.__inittedArrays;
			delete geometryGroup.__colorArray;
			delete geometryGroup.__normalArray;
			delete geometryGroup.__tangentArray;
			delete geometryGroup.__uvArray;
			delete geometryGroup.__uv2Array;
			delete geometryGroup.__faceArray;
			delete geometryGroup.__vertexArray;
			delete geometryGroup.__lineArray;
			delete geometryGroup.__skinVertexAArray;
			delete geometryGroup.__skinVertexBArray;
			delete geometryGroup.__skinIndexArray;
			delete geometryGroup.__skinWeightArray;

		}

	};

	// Buffer rendering

	this.renderBufferImmediate = function ( object, program, shading ) {

		if ( ! object.__webglVertexBuffer ) object.__webglVertexBuffer = _gl.createBuffer();
		if ( ! object.__webglNormalBuffer ) object.__webglNormalBuffer = _gl.createBuffer();

		if ( object.hasPos ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.position );
			_gl.vertexAttribPointer( program.attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasNormal ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglNormalBuffer );

			if ( shading === THREE.FlatShading ) {

				var nx, ny, nz,
					nax, nbx, ncx, nay, nby, ncy, naz, nbz, ncz,
					normalArray,
					i, il = object.count * 3;

				for( i = 0; i < il; i += 9 ) {

					normalArray = object.normalArray;

					nax  = normalArray[ i ];
					nay  = normalArray[ i + 1 ];
					naz  = normalArray[ i + 2 ];

					nbx  = normalArray[ i + 3 ];
					nby  = normalArray[ i + 4 ];
					nbz  = normalArray[ i + 5 ];

					ncx  = normalArray[ i + 6 ];
					ncy  = normalArray[ i + 7 ];
					ncz  = normalArray[ i + 8 ];

					nx = ( nax + nbx + ncx ) / 3;
					ny = ( nay + nby + ncy ) / 3;
					nz = ( naz + nbz + ncz ) / 3;

					normalArray[ i ] 	 = nx;
					normalArray[ i + 1 ] = ny;
					normalArray[ i + 2 ] = nz;

					normalArray[ i + 3 ] = nx;
					normalArray[ i + 4 ] = ny;
					normalArray[ i + 5 ] = nz;

					normalArray[ i + 6 ] = nx;
					normalArray[ i + 7 ] = ny;
					normalArray[ i + 8 ] = nz;

				}

			}

			_gl.bufferData( _gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW );
			_gl.enableVertexAttribArray( program.attributes.normal );
			_gl.vertexAttribPointer( program.attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

		}

		_gl.drawArrays( _gl.TRIANGLES, 0, object.count );

		object.count = 0;

	};

	this.renderBufferDirect = function ( camera, lights, fog, material, geometryGroup, object ) {

		if ( material.opacity === 0 ) return;

		var program, attributes, linewidth, primitives, a, attribute;

		program = setProgram( camera, lights, fog, material, object );

		attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryGroupHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryGroupHash;
			updateBuffers = true;

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			var offsets = geometryGroup.offsets;

			for ( var i = 0, il = offsets.length; i < il; ++ i ) {

				if ( updateBuffers ) {

					// vertices

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexPositionBuffer );
					_gl.vertexAttribPointer( attributes.position, geometryGroup.vertexPositionBuffer.itemSize, _gl.FLOAT, false, 0, offsets[ i ].index * 4 * 3 );

					// normals

					if ( attributes.normal >= 0 && geometryGroup.vertexNormalBuffer ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexNormalBuffer );
						_gl.vertexAttribPointer( attributes.normal, geometryGroup.vertexNormalBuffer.itemSize, _gl.FLOAT, false, 0, offsets[ i ].index * 4 * 3 );

					}

					// uvs

					if ( attributes.uv >= 0 && geometryGroup.vertexUvBuffer ) {

						if ( geometryGroup.vertexUvBuffer ) {

							_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexUvBuffer );
							_gl.vertexAttribPointer(  attributes.uv, geometryGroup.vertexUvBuffer.itemSize, _gl.FLOAT, false, 0, offsets[ i ].index * 4 * 2 );

							_gl.enableVertexAttribArray( attributes.uv );

						} else {

							_gl.disableVertexAttribArray( attributes.uv );

						}

					}

					// colors

					if ( attributes.color >= 0 && geometryGroup.vertexColorBuffer ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexColorBuffer );
						_gl.vertexAttribPointer( attributes.color, geometryGroup.vertexColorBuffer.itemSize, _gl.FLOAT, false, 0, offsets[ i ].index * 4 * 4 );


					}

					_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.vertexIndexBuffer );

				}

				// render indexed triangles

				_gl.drawElements( _gl.TRIANGLES, offsets[ i ].count, _gl.UNSIGNED_SHORT, offsets[ i ].start * 2 ); // 2 = Uint16

				_this.info.render.calls ++;
				_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared
				_this.info.render.faces += offsets[ i ].count / 3;

			}

		}

	};

	this.renderBuffer = function ( camera, lights, fog, material, geometryGroup, object ) {

		if ( material.opacity === 0 ) return;

		var program, attributes, linewidth, primitives, a, attribute, i, il;

		program = setProgram( camera, lights, fog, material, object );

		attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryGroupHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryGroupHash;
			updateBuffers = true;

		}

		// vertices

		if ( !material.morphTargets && attributes.position >= 0 ) {

			if ( updateBuffers ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
				_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

			}

		} else {

			if ( object.morphTargetBase ) {

				setupMorphTargets( material, geometryGroup, object );

			}

		}


		if ( updateBuffers ) {

			// custom attributes

			// Use the per-geometryGroup custom attribute arrays which are setup in initMeshBuffers

			if ( geometryGroup.__webglCustomAttributesList ) {

				for ( i = 0, il = geometryGroup.__webglCustomAttributesList.length; i < il; i ++ ) {

					attribute = geometryGroup.__webglCustomAttributesList[ i ];

					if( attributes[ attribute.buffer.belongsToAttribute ] >= 0 ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, attribute.buffer );
						_gl.vertexAttribPointer( attributes[ attribute.buffer.belongsToAttribute ], attribute.size, _gl.FLOAT, false, 0, 0 );

					}

				}

			}


			// colors

			if ( attributes.color >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
				_gl.vertexAttribPointer( attributes.color, 3, _gl.FLOAT, false, 0, 0 );

			}

			// normals

			if ( attributes.normal >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
				_gl.vertexAttribPointer( attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

			}

			// tangents

			if ( attributes.tangent >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
				_gl.vertexAttribPointer( attributes.tangent, 4, _gl.FLOAT, false, 0, 0 );

			}

			// uvs

			if ( attributes.uv >= 0 ) {

				if ( geometryGroup.__webglUVBuffer ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
					_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 0, 0 );

					_gl.enableVertexAttribArray( attributes.uv );

				} else {

					_gl.disableVertexAttribArray( attributes.uv );

				}

			}

			if ( attributes.uv2 >= 0 ) {

				if ( geometryGroup.__webglUV2Buffer ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
					_gl.vertexAttribPointer( attributes.uv2, 2, _gl.FLOAT, false, 0, 0 );

					_gl.enableVertexAttribArray( attributes.uv2 );

				} else {

					_gl.disableVertexAttribArray( attributes.uv2 );

				}

			}

			if ( material.skinning &&
				 attributes.skinVertexA >= 0 && attributes.skinVertexB >= 0 &&
				 attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinVertexABuffer );
				_gl.vertexAttribPointer( attributes.skinVertexA, 4, _gl.FLOAT, false, 0, 0 );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinVertexBBuffer );
				_gl.vertexAttribPointer( attributes.skinVertexB, 4, _gl.FLOAT, false, 0, 0 );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				_gl.vertexAttribPointer( attributes.skinIndex, 4, _gl.FLOAT, false, 0, 0 );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				_gl.vertexAttribPointer( attributes.skinWeight, 4, _gl.FLOAT, false, 0, 0 );

			}

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			// wireframe

			if ( material.wireframe ) {

				setLineWidth( material.wireframeLinewidth );

				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
				_gl.drawElements( _gl.LINES, geometryGroup.__webglLineCount, _gl.UNSIGNED_SHORT, 0 );

			// triangles

			} else {

				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
				_gl.drawElements( _gl.TRIANGLES, geometryGroup.__webglFaceCount, _gl.UNSIGNED_SHORT, 0 );

			}

			_this.info.render.calls ++;
			_this.info.render.vertices += geometryGroup.__webglFaceCount;
			_this.info.render.faces += geometryGroup.__webglFaceCount / 3;

		// render lines

		} else if ( object instanceof THREE.Line ) {

			primitives = ( object.type === THREE.LineStrip ) ? _gl.LINE_STRIP : _gl.LINES;

			setLineWidth( material.linewidth );

			_gl.drawArrays( primitives, 0, geometryGroup.__webglLineCount );

			_this.info.render.calls ++;

		// render particles

		} else if ( object instanceof THREE.ParticleSystem ) {

			_gl.drawArrays( _gl.POINTS, 0, geometryGroup.__webglParticleCount );

			_this.info.render.calls ++;
			_this.info.render.points += geometryGroup.__webglParticleCount;

		// render ribbon

		} else if ( object instanceof THREE.Ribbon ) {

			_gl.drawArrays( _gl.TRIANGLE_STRIP, 0, geometryGroup.__webglVertexCount );

			_this.info.render.calls ++;

		}

	};

	function setupMorphTargets ( material, geometryGroup, object ) {

		// set base

		var attributes = material.program.attributes;

		if ( object.morphTargetBase !== - 1 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		} else if ( attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.morphTargetForcedOrder.length ) {

			// set forced order

			var m = 0;
			var order = object.morphTargetForcedOrder;
			var influences = object.morphTargetInfluences;

			while ( m < material.numSupportedMorphTargets && m < order.length ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );
				_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );
					_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];

				m ++;
			}

		} else {

			// find most influencing

			var used = [];
			var candidateInfluence = - 1;
			var candidate = 0;
			var influences = object.morphTargetInfluences;
			var i, il = influences.length;
			var m = 0;

			if ( object.morphTargetBase !== - 1 ) {

				used[ object.morphTargetBase ] = true;

			}

			while ( m < material.numSupportedMorphTargets ) {

				for ( i = 0; i < il; i ++ ) {

					if ( !used[ i ] && influences[ i ] > candidateInfluence ) {

						candidate = i;
						candidateInfluence = influences[ candidate ];

					}

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ candidate ] );
				_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ candidate ] );
					_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = candidateInfluence;

				used[ candidate ] = 1;
				candidateInfluence = -1;
				m ++;

			}

		}

		// load updated influences uniform

		if( material.program.uniforms.morphTargetInfluences !== null ) {

			_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );

		}

	};


	function painterSort ( a, b ) {

		return b.z - a.z;

	};

	// Rendering

	this.render = function ( scene, camera, renderTarget, forceClear ) {

		var i, il,

		webglObject, object,
		renderList,

		lights = scene.__lights,
		fog = scene.fog;

		_currentMaterialId = -1;

		// update scene graph

		if ( camera.parent === undefined ) {

			console.warn( 'DEPRECATED: Camera hasn\'t been added to a Scene. Adding it...' );
			scene.add( camera );

		}

		if ( this.autoUpdateScene ) scene.updateMatrixWorld();

		// update camera matrices and frustum

		if ( ! camera._viewMatrixArray ) camera._viewMatrixArray = new Float32Array( 16 );
		if ( ! camera._projectionMatrixArray ) camera._projectionMatrixArray = new Float32Array( 16 );

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		camera.matrixWorldInverse.flattenToArray( camera._viewMatrixArray );
		camera.projectionMatrix.flattenToArray( camera._projectionMatrixArray );

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromMatrix( _projScreenMatrix );

		// update WebGL objects

		if ( this.autoUpdateObjects ) this.initWebGLObjects( scene );

		// custom render plugins (pre pass)

		renderPlugins( this.renderPluginsPre, scene, camera );

		//

		_this.info.render.calls = 0;
		_this.info.render.vertices = 0;
		_this.info.render.faces = 0;
		_this.info.render.points = 0;

		this.setRenderTarget( renderTarget );

		if ( this.autoClear || forceClear ) {

			this.clear( this.autoClearColor, this.autoClearDepth, this.autoClearStencil );

		}

		// set matrices for regular objects (frustum culled)

		renderList = scene.__webglObjects;

		for ( i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			webglObject.render = false;

			if ( object.visible ) {

				if ( ! ( object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {

					//object.matrixWorld.flattenToArray( object._objectMatrixArray );

					setupMatrices( object, camera );

					unrollBufferMaterial( webglObject );

					webglObject.render = true;

					if ( this.sortObjects ) {

						if ( object.renderDepth ) {

							webglObject.z = object.renderDepth;

						} else {

							_vector3.copy( object.matrixWorld.getPosition() );
							_projScreenMatrix.multiplyVector3( _vector3 );

							webglObject.z = _vector3.z;

						}

					}

				}

			}

		}

		if ( this.sortObjects ) {

			renderList.sort( painterSort );

		}

		// set matrices for immediate objects

		renderList = scene.__webglObjectsImmediate;

		for ( i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			if ( object.visible ) {

				if( object.matrixAutoUpdate ) {

					//object.matrixWorld.flattenToArray( object._objectMatrixArray );

				}

				setupMatrices( object, camera );

				unrollImmediateBufferMaterial( webglObject );

			}

		}

		if ( scene.overrideMaterial ) {

			var material = scene.overrideMaterial;

			this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
			this.setDepthTest( material.depthTest );
			this.setDepthWrite( material.depthWrite );
			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

			renderObjects( scene.__webglObjects, false, "", camera, lights, fog, true, material );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "", camera, lights, fog, false, material );

		} else {

			// opaque pass (front-to-back order)

			this.setBlending( THREE.NormalBlending );

			renderObjects( scene.__webglObjects, true, "opaque", camera, lights, fog, false );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "opaque", camera, lights, fog, false );

			// transparent pass (back-to-front order)

			renderObjects( scene.__webglObjects, false, "transparent", camera, lights, fog, true );
			renderObjectsImmediate( scene.__webglObjectsImmediate, "transparent", camera, lights, fog, true );

		}

		// custom render plugins (post pass)

		renderPlugins( this.renderPluginsPost, scene, camera );


		// Generate mipmap if we're using any kind of mipmap filtering

		if ( renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter ) {

			updateRenderTargetMipmap( renderTarget );

		}

		// Ensure depth buffer writing is enabled so it can be cleared on next render

		this.setDepthTest( true );
		this.setDepthWrite( true );

		// _gl.finish();

	};

	function renderPlugins( plugins, scene, camera ) {

		if ( ! plugins.length ) return;

		for ( var i = 0, il = plugins.length; i < il; i ++ ) {

			_currentProgram = null;
			_currentCamera = null;
			_oldBlending = -1;
			_oldDepthTest = -1;
			_oldDepthWrite = -1;
			_currentGeometryGroupHash = -1;
			_currentMaterialId = -1;

			plugins[ i ].render( scene, camera, _currentWidth, _currentHeight );

			_currentProgram = null;
			_currentCamera = null;
			_oldBlending = -1;
			_oldDepthTest = -1;
			_oldDepthWrite = -1;
			_currentGeometryGroupHash = -1;
			_currentMaterialId = -1;

		}

	};

	function renderObjects ( renderList, reverse, materialType, camera, lights, fog, useBlending, overrideMaterial ) {

		var webglObject, object, buffer, material, start, end, delta;

		if ( reverse ) {

			start = renderList.length - 1;
			end = -1;
			delta = -1;

		} else {

			start = 0;
			end = renderList.length;
			delta = 1;
		}

		for ( var i = start; i !== end; i += delta ) {

			webglObject = renderList[ i ];

			if ( webglObject.render ) {

				object = webglObject.object;
				buffer = webglObject.buffer;

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

					_this.setDepthTest( material.depthTest );
					_this.setDepthWrite( material.depthWrite );
					setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

				}

				_this.setObjectFaces( object );

				if ( buffer instanceof THREE.BufferGeometry ) {

					_this.renderBufferDirect( camera, lights, fog, material, buffer, object );

				} else {

					_this.renderBuffer( camera, lights, fog, material, buffer, object );

				}

			}

		}

	};

	function renderObjectsImmediate ( renderList, materialType, camera, lights, fog, useBlending, overrideMaterial ) {

		var webglObject, object, material, program;

		for ( var i = 0, il = renderList.length; i < il; i ++ ) {

			webglObject = renderList[ i ];
			object = webglObject.object;

			if ( object.visible ) {

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

					_this.setDepthTest( material.depthTest );
					_this.setDepthWrite( material.depthWrite );
					setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

				}

				_this.renderImmediateObject( camera, lights, fog, material, object );

			}

		}

	};

	this.renderImmediateObject = function ( camera, lights, fog, material, object ) {

		var program = setProgram( camera, lights, fog, material, object );

		_currentGeometryGroupHash = -1;

		_this.setObjectFaces( object );

		if ( object.immediateRenderCallback ) {

			object.immediateRenderCallback( program, _gl, _frustum );

		} else {

			object.render( function( object ) { _this.renderBufferImmediate( object, program, material.shading ); } );

		}

	};

	function unrollImmediateBufferMaterial ( globject ) {

		var object = globject.object,
			material = object.material;

		if ( material.transparent ) {

			globject.transparent = material;
			globject.opaque = null;

		} else {

			globject.opaque = material;
			globject.transparent = null;

		}

	};

	function unrollBufferMaterial ( globject ) {

		var object = globject.object,
			buffer = globject.buffer,
			material, materialIndex, meshMaterial;

		meshMaterial = object.material;

		if ( meshMaterial instanceof THREE.MeshFaceMaterial ) {

			materialIndex = buffer.materialIndex;

			if ( materialIndex >= 0 ) {

				material = object.geometry.materials[ materialIndex ];

				if ( material.transparent ) {

					globject.transparent = material;
					globject.opaque = null;

				} else {

					globject.opaque = material;
					globject.transparent = null;

				}

			}

		} else {

			material = meshMaterial;

			if ( material ) {

				if ( material.transparent ) {

					globject.transparent = material;
					globject.opaque = null;

				} else {

					globject.opaque = material;
					globject.transparent = null;

				}

			}

		}

	};

	// Geometry splitting

	function sortFacesByMaterial ( geometry ) {

		var f, fl, face, materialIndex, vertices,
			materialHash, groupHash,
			hash_map = {};

		var numMorphTargets = geometry.morphTargets.length;
		var numMorphNormals = geometry.morphNormals.length;

		geometry.geometryGroups = {};

		for ( f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

			face = geometry.faces[ f ];
			materialIndex = face.materialIndex;

			materialHash = ( materialIndex !== undefined ) ? materialIndex : -1;

			if ( hash_map[ materialHash ] === undefined ) {

				hash_map[ materialHash ] = { 'hash': materialHash, 'counter': 0 };

			}

			groupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;

			if ( geometry.geometryGroups[ groupHash ] === undefined ) {

				geometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };

			}

			vertices = face instanceof THREE.Face3 ? 3 : 4;

			if ( geometry.geometryGroups[ groupHash ].vertices + vertices > 65535 ) {

				hash_map[ materialHash ].counter += 1;
				groupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;

				if ( geometry.geometryGroups[ groupHash ] === undefined ) {

					geometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };

				}

			}

			if ( face instanceof THREE.Face3 ) {

				geometry.geometryGroups[ groupHash ].faces3.push( f );

			} else {

				geometry.geometryGroups[ groupHash ].faces4.push( f );

			}

			geometry.geometryGroups[ groupHash ].vertices += vertices;

		}

		geometry.geometryGroupsList = [];

		for ( var g in geometry.geometryGroups ) {

			geometry.geometryGroups[ g ].id = _geometryGroupCounter ++;

			geometry.geometryGroupsList.push( geometry.geometryGroups[ g ] );

		}

	};

	// Objects refresh

	this.initWebGLObjects = function ( scene ) {

		if ( !scene.__webglObjects ) {

			scene.__webglObjects = [];
			scene.__webglObjectsImmediate = [];
			scene.__webglSprites = [];
			scene.__webglFlares = [];

		}

		while ( scene.__objectsAdded.length ) {

			addObject( scene.__objectsAdded[ 0 ], scene );
			scene.__objectsAdded.splice( 0, 1 );

		}

		while ( scene.__objectsRemoved.length ) {

			removeObject( scene.__objectsRemoved[ 0 ], scene );
			scene.__objectsRemoved.splice( 0, 1 );

		}

		// update must be called after objects adding / removal

		for ( var o = 0, ol = scene.__webglObjects.length; o < ol; o ++ ) {

			updateObject( scene.__webglObjects[ o ].object );

		}

	};

	// Objects adding

	function addObject ( object, scene ) {

		var g, geometry, geometryGroup;

		if ( ! object.__webglInit ) {

			object.__webglInit = true;

			object._modelViewMatrix = new THREE.Matrix4();
			object._normalMatrix = new THREE.Matrix3();

			object._normalMatrixArray = new Float32Array( 9 );
			object._modelViewMatrixArray = new Float32Array( 16 );
			object._objectMatrixArray = new Float32Array( 16 );

			//object.matrixWorld.flattenToArray( object._objectMatrixArray );

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;

				if ( geometry instanceof THREE.Geometry ) {

					if ( geometry.geometryGroups === undefined ) {

						sortFacesByMaterial( geometry );

					}

					// create separate VBOs per geometry chunk

					for ( g in geometry.geometryGroups ) {

						geometryGroup = geometry.geometryGroups[ g ];

						// initialise VBO on the first access

						if ( ! geometryGroup.__webglVertexBuffer ) {

							createMeshBuffers( geometryGroup );
							initMeshBuffers( geometryGroup, object );

							geometry.__dirtyVertices = true;
							geometry.__dirtyMorphTargets = true;
							geometry.__dirtyElements = true;
							geometry.__dirtyUvs = true;
							geometry.__dirtyNormals = true;
							geometry.__dirtyTangents = true;
							geometry.__dirtyColors = true;

						}

					}

				}

			} else if ( object instanceof THREE.Ribbon ) {

				geometry = object.geometry;

				if( ! geometry.__webglVertexBuffer ) {

					createRibbonBuffers( geometry );
					initRibbonBuffers( geometry );

					geometry.__dirtyVertices = true;
					geometry.__dirtyColors = true;

				}

			} else if ( object instanceof THREE.Line ) {

				geometry = object.geometry;

				if( ! geometry.__webglVertexBuffer ) {

					createLineBuffers( geometry );
					initLineBuffers( geometry, object );

					geometry.__dirtyVertices = true;
					geometry.__dirtyColors = true;

				}

			} else if ( object instanceof THREE.ParticleSystem ) {

				geometry = object.geometry;

				if ( ! geometry.__webglVertexBuffer ) {

					createParticleBuffers( geometry );
					initParticleBuffers( geometry, object );

					geometry.__dirtyVertices = true;
					geometry.__dirtyColors = true;

				}

			}

		}

		if ( ! object.__webglActive ) {

			if ( object instanceof THREE.Mesh ) {

				geometry = object.geometry;

				if ( geometry instanceof THREE.BufferGeometry ) {

					addBuffer( scene.__webglObjects, geometry, object );

				} else {

					for ( g in geometry.geometryGroups ) {

						geometryGroup = geometry.geometryGroups[ g ];

						addBuffer( scene.__webglObjects, geometryGroup, object );

					}

				}

			} else if ( object instanceof THREE.Ribbon ||
						object instanceof THREE.Line ||
						object instanceof THREE.ParticleSystem ) {

				geometry = object.geometry;
				addBuffer( scene.__webglObjects, geometry, object );

			} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

				addBufferImmediate( scene.__webglObjectsImmediate, object );

			} else if ( object instanceof THREE.Sprite ) {

				scene.__webglSprites.push( object );

			} else if ( object instanceof THREE.LensFlare ) {

				scene.__webglFlares.push( object );

			}

			object.__webglActive = true;

		}

	};

	function addBuffer ( objlist, buffer, object ) {

		objlist.push(
			{
				buffer: buffer,
				object: object,
				opaque: null,
				transparent: null
			}
		);

	};

	function addBufferImmediate ( objlist, object ) {

		objlist.push(
			{
				object: object,
				opaque: null,
				transparent: null
			}
		);

	};

	// Objects updates

	function updateObject ( object ) {

		var geometry = object.geometry,
			geometryGroup, customAttributesDirty, material;

		if ( object instanceof THREE.Mesh ) {

			if ( geometry instanceof THREE.BufferGeometry ) {

				/*
				if ( geometry.__dirtyVertices || geometry.__dirtyElements ||
					 geometry.__dirtyUvs || geometry.__dirtyNormals ||
					 geometry.__dirtyColors  ) {

					// TODO
					// set buffers from typed arrays

				}
				*/

				geometry.__dirtyVertices = false;
				geometry.__dirtyElements = false;
				geometry.__dirtyUvs = false;
				geometry.__dirtyNormals = false;
				geometry.__dirtyColors = false;

			} else {

				// check all geometry groups

				for( var i = 0, il = geometry.geometryGroupsList.length; i < il; i ++ ) {

					geometryGroup = geometry.geometryGroupsList[ i ];

					material = getBufferMaterial( object, geometryGroup );

					customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

					if ( geometry.__dirtyVertices || geometry.__dirtyMorphTargets || geometry.__dirtyElements ||
						 geometry.__dirtyUvs || geometry.__dirtyNormals ||
						 geometry.__dirtyColors || geometry.__dirtyTangents || customAttributesDirty ) {

						setMeshBuffers( geometryGroup, object, _gl.DYNAMIC_DRAW, !geometry.dynamic, material );

					}

				}

				geometry.__dirtyVertices = false;
				geometry.__dirtyMorphTargets = false;
				geometry.__dirtyElements = false;
				geometry.__dirtyUvs = false;
				geometry.__dirtyNormals = false;
				geometry.__dirtyColors = false;
				geometry.__dirtyTangents = false;

				material.attributes && clearCustomAttributes( material );

			}

		} else if ( object instanceof THREE.Ribbon ) {

			if ( geometry.__dirtyVertices || geometry.__dirtyColors ) {

				setRibbonBuffers( geometry, _gl.DYNAMIC_DRAW );

			}

			geometry.__dirtyVertices = false;
			geometry.__dirtyColors = false;

		} else if ( object instanceof THREE.Line ) {

			material = getBufferMaterial( object, geometryGroup );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.__dirtyVertices ||  geometry.__dirtyColors || customAttributesDirty ) {

				setLineBuffers( geometry, _gl.DYNAMIC_DRAW );

			}

			geometry.__dirtyVertices = false;
			geometry.__dirtyColors = false;

			material.attributes && clearCustomAttributes( material );

		} else if ( object instanceof THREE.ParticleSystem ) {

			material = getBufferMaterial( object, geometryGroup );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.__dirtyVertices || geometry.__dirtyColors || object.sortParticles || customAttributesDirty ) {

				setParticleBuffers( geometry, _gl.DYNAMIC_DRAW, object );

			}

			geometry.__dirtyVertices = false;
			geometry.__dirtyColors = false;

			material.attributes && clearCustomAttributes( material );

		}

	};

	// Objects updates - custom attributes check

	function areCustomAttributesDirty ( material ) {

		for ( var a in material.attributes ) {

			if ( material.attributes[ a ].needsUpdate ) return true;

		}

		return false;

	};

	function clearCustomAttributes ( material ) {

		for ( var a in material.attributes ) {

			material.attributes[ a ].needsUpdate = false;

		}

	};

	// Objects removal

	function removeObject ( object, scene ) {

		if ( object instanceof THREE.Mesh  ||
			 object instanceof THREE.ParticleSystem ||
			 object instanceof THREE.Ribbon ||
			 object instanceof THREE.Line ) {

			removeInstances( scene.__webglObjects, object );

		} else if ( object instanceof THREE.Sprite ) {

			removeInstancesDirect( scene.__webglSprites, object );

		} else if ( object instanceof THREE.LensFlare ) {

			removeInstancesDirect( scene.__webglFlares, object );

		} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

			removeInstances( scene.__webglObjectsImmediate, object );

		}

		object.__webglActive = false;

	};

	function removeInstances ( objlist, object ) {

		for ( var o = objlist.length - 1; o >= 0; o -- ) {

			if ( objlist[ o ].object === object ) {

				objlist.splice( o, 1 );

			}

		}

	};

	function removeInstancesDirect ( objlist, object ) {

		for ( var o = objlist.length - 1; o >= 0; o -- ) {

			if ( objlist[ o ] === object ) {

				objlist.splice( o, 1 );

			}

		}

	};

	// Materials

	this.initMaterial = function ( material, lights, fog, object ) {

		var u, a, identifiers, i, parameters, maxLightCount, maxBones, maxShadows, shaderID;

		if ( material instanceof THREE.MeshDepthMaterial ) {

			shaderID = 'depth';

		} else if ( material instanceof THREE.MeshNormalMaterial ) {

			shaderID = 'normal';

		} else if ( material instanceof THREE.MeshBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.MeshLambertMaterial ) {

			shaderID = 'lambert';

		} else if ( material instanceof THREE.MeshPhongMaterial ) {

			shaderID = 'phong';

		} else if ( material instanceof THREE.LineBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.ParticleBasicMaterial ) {

			shaderID = 'particle_basic';

		}

		if ( shaderID ) {

			setMaterialShaders( material, THREE.ShaderLib[ shaderID ] );

		}

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)

		maxLightCount = allocateLights( lights );

		maxShadows = allocateShadows( lights );

		maxBones = allocateBones( object );

		parameters = {

			map: !!material.map, envMap: !!material.envMap, lightMap: !!material.lightMap,
			vertexColors: material.vertexColors,
			fog: fog, useFog: material.fog,
			sizeAttenuation: material.sizeAttenuation,
			skinning: material.skinning,
			morphTargets: material.morphTargets,
			morphNormals: material.morphNormals,
			maxMorphTargets: this.maxMorphTargets,
			maxMorphNormals: this.maxMorphNormals,
			maxDirLights: maxLightCount.directional, maxPointLights: maxLightCount.point,
			maxBones: maxBones,
			shadowMapEnabled: this.shadowMapEnabled && object.receiveShadow,
			shadowMapSoft: this.shadowMapSoft,
			shadowMapDebug: this.shadowMapDebug,
			shadowMapCascade: this.shadowMapCascade,
			maxShadows: maxShadows,
			alphaTest: material.alphaTest,
			metal: material.metal,
			perPixel: material.perPixel,
			wrapAround: material.wrapAround,
			doubleSided: object && object.doubleSided

		};

		material.program = buildProgram( shaderID, material.fragmentShader, material.vertexShader, material.uniforms, material.attributes, parameters );

		var attributes = material.program.attributes;

		if ( attributes.position >= 0 ) _gl.enableVertexAttribArray( attributes.position );
		if ( attributes.color >= 0 ) _gl.enableVertexAttribArray( attributes.color );
		if ( attributes.normal >= 0 ) _gl.enableVertexAttribArray( attributes.normal );
		if ( attributes.tangent >= 0 ) _gl.enableVertexAttribArray( attributes.tangent );

		if ( material.skinning &&
			 attributes.skinVertexA >=0 && attributes.skinVertexB >= 0 &&
			 attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {

			_gl.enableVertexAttribArray( attributes.skinVertexA );
			_gl.enableVertexAttribArray( attributes.skinVertexB );
			_gl.enableVertexAttribArray( attributes.skinIndex );
			_gl.enableVertexAttribArray( attributes.skinWeight );

		}

		if ( material.attributes ) {

			for ( a in material.attributes ) {

				if( attributes[ a ] !== undefined && attributes[ a ] >= 0 ) _gl.enableVertexAttribArray( attributes[ a ] );

			}

		}

		if ( material.morphTargets ) {

			material.numSupportedMorphTargets = 0;

			var id, base = "morphTarget";

			for ( i = 0; i < this.maxMorphTargets; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					_gl.enableVertexAttribArray( attributes[ id ] );
					material.numSupportedMorphTargets ++;

				}

			}

		}

		if ( material.morphNormals ) {

			material.numSupportedMorphNormals = 0;

			var id, base = "morphNormal";

			for ( i = 0; i < this.maxMorphNormals; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					_gl.enableVertexAttribArray( attributes[ id ] );
					material.numSupportedMorphNormals ++;

				}

			}

		}

		material.uniformsList = [];

		for ( u in material.uniforms ) {

			material.uniformsList.push( [ material.uniforms[ u ], u ] );

		}

	};

	function setMaterialShaders( material, shaders ) {

		material.uniforms = THREE.UniformsUtils.clone( shaders.uniforms );
		material.vertexShader = shaders.vertexShader;
		material.fragmentShader = shaders.fragmentShader;

	};

	function setProgram( camera, lights, fog, material, object ) {

		if ( ! material.program || material.needsUpdate ) {

			_this.initMaterial( material, lights, fog, object );
			material.needsUpdate = false;

		}

		if ( material.morphTargets ) {

			if ( ! object.__webglMorphTargetInfluences ) {

				object.__webglMorphTargetInfluences = new Float32Array( _this.maxMorphTargets );

				for ( var i = 0, il = _this.maxMorphTargets; i < il; i ++ ) {

					object.__webglMorphTargetInfluences[ i ] = 0;

				}

			}

		}

		var refreshMaterial = false;

		var program = material.program,
			p_uniforms = program.uniforms,
			m_uniforms = material.uniforms;

		if ( program !== _currentProgram ) {

			_gl.useProgram( program );
			_currentProgram = program;

			refreshMaterial = true;

		}

		if ( material.id !== _currentMaterialId ) {

			_currentMaterialId = material.id;
			refreshMaterial = true;

		}

		if ( refreshMaterial || camera !== _currentCamera ) {

			_gl.uniformMatrix4fv( p_uniforms.projectionMatrix, false, camera._projectionMatrixArray );

			if ( camera !== _currentCamera ) _currentCamera = camera;

		}

		if ( refreshMaterial ) {

			// refresh uniforms common to several materials

			if ( fog && material.fog ) {

				refreshUniformsFog( m_uniforms, fog );

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material.lights ) {

				setupLights( program, lights );
				refreshUniformsLights( m_uniforms, _lights );

			}

			if ( material instanceof THREE.MeshBasicMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsCommon( m_uniforms, material );

			}

			// refresh single material specific uniforms

			if ( material instanceof THREE.LineBasicMaterial ) {

				refreshUniformsLine( m_uniforms, material );

			} else if ( material instanceof THREE.ParticleBasicMaterial ) {

				refreshUniformsParticle( m_uniforms, material );

			} else if ( material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsPhong( m_uniforms, material );

			} else if ( material instanceof THREE.MeshLambertMaterial ) {

				refreshUniformsLambert( m_uniforms, material );

			} else if ( material instanceof THREE.MeshDepthMaterial ) {

				m_uniforms.mNear.value = camera.near;
				m_uniforms.mFar.value = camera.far;
				m_uniforms.opacity.value = material.opacity;

			} else if ( material instanceof THREE.MeshNormalMaterial ) {

				m_uniforms.opacity.value = material.opacity;

			}

			if ( object.receiveShadow && ! material._shadowPass ) {

				refreshUniformsShadow( m_uniforms, lights );

			}

			// load common uniforms

			loadUniformsGeneric( program, material.uniformsList );

			// load material specific uniforms
			// (shader material also gets them for the sake of genericity)

			if ( material instanceof THREE.ShaderMaterial ||
				 material instanceof THREE.MeshPhongMaterial ||
				 material.envMap ) {

				if ( p_uniforms.cameraPosition !== null ) {

					var position = camera.matrixWorld.getPosition();
					_gl.uniform3f( p_uniforms.cameraPosition, position.x, position.y, position.z );

				}

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.ShaderMaterial ||
				 material.skinning ) {

				if ( p_uniforms.viewMatrix !== null ) {

					_gl.uniformMatrix4fv( p_uniforms.viewMatrix, false, camera._viewMatrixArray );

				}

			}

			if ( material.skinning ) {

				_gl.uniformMatrix4fv( p_uniforms.boneGlobalMatrices, false, object.boneMatrices );

			}

		}

		loadUniformsMatrices( p_uniforms, object );

		if ( material instanceof THREE.ShaderMaterial ||
			 material.envMap ||
			 material.skinning ||
			 object.receiveShadow ) {

			if ( p_uniforms.objectMatrix !== null ) {

				_gl.uniformMatrix4fv( p_uniforms.objectMatrix, false, object.matrixWorld.elements );

			}

		}

		return program;

	};

	// Uniforms (refresh uniforms objects)

	function refreshUniformsCommon ( uniforms, material ) {

		uniforms.opacity.value = material.opacity;

		if ( _this.gammaInput ) {

			uniforms.diffuse.value.copyGammaToLinear( material.color );

		} else {

			uniforms.diffuse.value = material.color;

		}

		uniforms.map.texture = material.map;

		if ( material.map ) {

			uniforms.offsetRepeat.value.set( material.map.offset.x, material.map.offset.y, material.map.repeat.x, material.map.repeat.y );

		}

		uniforms.lightMap.texture = material.lightMap;

		uniforms.envMap.texture = material.envMap;
		uniforms.flipEnvMap.value = ( material.envMap instanceof THREE.WebGLRenderTargetCube ) ? 1 : -1;

		if ( _this.gammaInput ) {

			//uniforms.reflectivity.value = material.reflectivity * material.reflectivity;
			uniforms.reflectivity.value = material.reflectivity;

		} else {

			uniforms.reflectivity.value = material.reflectivity;

		}

		uniforms.refractionRatio.value = material.refractionRatio;
		uniforms.combine.value = material.combine;
		uniforms.useRefract.value = material.envMap && material.envMap.mapping instanceof THREE.CubeRefractionMapping;

	};

	function refreshUniformsLine ( uniforms, material ) {

		uniforms.diffuse.value = material.color;
		uniforms.opacity.value = material.opacity;

	};

	function refreshUniformsParticle ( uniforms, material ) {

		uniforms.psColor.value = material.color;
		uniforms.opacity.value = material.opacity;
		uniforms.size.value = material.size;
		uniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.

		uniforms.map.texture = material.map;

	};

	function refreshUniformsFog ( uniforms, fog ) {

		uniforms.fogColor.value = fog.color;

		if ( fog instanceof THREE.Fog ) {

			uniforms.fogNear.value = fog.near;
			uniforms.fogFar.value = fog.far;

		} else if ( fog instanceof THREE.FogExp2 ) {

			uniforms.fogDensity.value = fog.density;

		}

	};

	function refreshUniformsPhong ( uniforms, material ) {

		uniforms.shininess.value = material.shininess;

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );
			uniforms.specular.value.copyGammaToLinear( material.specular );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;
			uniforms.specular.value = material.specular;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	};

	function refreshUniformsLambert ( uniforms, material ) {

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	};

	function refreshUniformsLights ( uniforms, lights ) {

		uniforms.ambientLightColor.value = lights.ambient;

		uniforms.directionalLightColor.value = lights.directional.colors;
		uniforms.directionalLightDirection.value = lights.directional.positions;

		uniforms.pointLightColor.value = lights.point.colors;
		uniforms.pointLightPosition.value = lights.point.positions;
		uniforms.pointLightDistance.value = lights.point.distances;

	};

	function refreshUniformsShadow ( uniforms, lights ) {

		if ( uniforms.shadowMatrix ) {

			var j = 0;

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];

				if ( ! light.castShadow ) continue;

				if ( light instanceof THREE.SpotLight || ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) ) {

					uniforms.shadowMap.texture[ j ] = light.shadowMap;
					uniforms.shadowMapSize.value[ j ] = light.shadowMapSize;

					uniforms.shadowMatrix.value[ j ] = light.shadowMatrix;

					uniforms.shadowDarkness.value[ j ] = light.shadowDarkness;
					uniforms.shadowBias.value[ j ] = light.shadowBias;

					j ++;

				}

			}

		}

	};

	// Uniforms (load to GPU)

	function loadUniformsMatrices ( uniforms, object ) {

		_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, object._modelViewMatrix.elements );

		if ( uniforms.normalMatrix ) {

			_gl.uniformMatrix3fv( uniforms.normalMatrix, false, object._normalMatrixArray );

		}

	};

	function loadUniformsGeneric ( program, uniforms ) {

		var uniform, value, type, location, texture, i, il, j, jl, offset;

		for( j = 0, jl = uniforms.length; j < jl; j ++ ) {

			location = program.uniforms[ uniforms[ j ][ 1 ] ];
			if ( !location ) continue;

			uniform = uniforms[ j ][ 0 ];

			type = uniform.type;
			value = uniform.value;

			// single integer

			if( type === "i" ) {

				_gl.uniform1i( location, value );

			// single float

			} else if( type === "f" ) {

				_gl.uniform1f( location, value );

			// single THREE.Vector2

			} else if( type === "v2" ) {

				_gl.uniform2f( location, value.x, value.y );

			// single THREE.Vector3

			} else if( type === "v3" ) {

				_gl.uniform3f( location, value.x, value.y, value.z );

			// single THREE.Vector4

			} else if( type === "v4" ) {

				_gl.uniform4f( location, value.x, value.y, value.z, value.w );

			// single THREE.Color

			} else if( type === "c" ) {

				_gl.uniform3f( location, value.r, value.g, value.b );

			// flat array of floats (JS or typed array)

			} else if( type === "fv1" ) {

				_gl.uniform1fv( location, value );

			// flat array of floats with 3 x N size (JS or typed array)

			} else if( type === "fv" ) {

				_gl.uniform3fv( location, value );

			// array of THREE.Vector2

			} else if( type === "v2v" ) {

				if ( ! uniform._array ) {

					uniform._array = new Float32Array( 2 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 2;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;

				}

				_gl.uniform2fv( location, uniform._array );

			// array of THREE.Vector3

			} else if( type === "v3v" ) {

				if ( ! uniform._array ) {

					uniform._array = new Float32Array( 3 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 3;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;
					uniform._array[ offset + 2 ] = value[ i ].z;

				}

				_gl.uniform3fv( location, uniform._array );

			// array of THREE.Vector4

			} else if( type == "v4v" ) {

				if ( ! uniform._array ) {

					uniform._array = new Float32Array( 4 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					offset = i * 4;

					uniform._array[ offset ] 	 = value[ i ].x;
					uniform._array[ offset + 1 ] = value[ i ].y;
					uniform._array[ offset + 2 ] = value[ i ].z;
					uniform._array[ offset + 3 ] = value[ i ].w;

				}

				_gl.uniform4fv( location, uniform._array );

			// single THREE.Matrix4

			} else if( type === "m4" ) {

				if ( ! uniform._array ) {

					uniform._array = new Float32Array( 16 );

				}

				value.flattenToArray( uniform._array );
				_gl.uniformMatrix4fv( location, false, uniform._array );

			// array of THREE.Matrix4

			} else if( type === "m4v" ) {

				if ( ! uniform._array ) {

					uniform._array = new Float32Array( 16 * value.length );

				}

				for ( i = 0, il = value.length; i < il; i ++ ) {

					value[ i ].flattenToArrayOffset( uniform._array, i * 16 );

				}

				_gl.uniformMatrix4fv( location, false, uniform._array );


			// single THREE.Texture (2d or cube)

			} else if( type === "t" ) {

				_gl.uniform1i( location, value );

				texture = uniform.texture;

				if ( !texture ) continue;

				if ( texture.image instanceof Array && texture.image.length === 6 ) {

					setCubeTexture( texture, value );

				} else if ( texture instanceof THREE.WebGLRenderTargetCube ) {

					setCubeTextureDynamic( texture, value );

				} else {

					_this.setTexture( texture, value );

				}

			// array of THREE.Texture (2d)

			} else if( type === "tv" ) {

				if ( ! uniform._array ) {

					uniform._array = [];

					for( i = 0, il = uniform.texture.length; i < il; i ++ ) {

						uniform._array[ i ] = value + i;

					}

				}

				_gl.uniform1iv( location, uniform._array );

				for( i = 0, il = uniform.texture.length; i < il; i ++ ) {

					texture = uniform.texture[ i ];

					if ( !texture ) continue;

					_this.setTexture( texture, uniform._array[ i ] );

				}

			}

		}

	};

	function setupMatrices ( object, camera ) {

		object._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld);

		object._normalMatrix.getInverse( object._modelViewMatrix );
		object._normalMatrix.transposeIntoArray( object._normalMatrixArray );

	};

	function setupLights ( program, lights ) {

		var l, ll, light, n,
		r = 0, g = 0, b = 0,
		color, position, intensity, distance,

		zlights = _lights,

		dcolors = zlights.directional.colors,
		dpositions = zlights.directional.positions,

		pcolors = zlights.point.colors,
		ppositions = zlights.point.positions,
		pdistances = zlights.point.distances,

		dlength = 0,
		plength = 0,

		doffset = 0,
		poffset = 0;

		for ( l = 0, ll = lights.length; l < ll; l ++ ) {

			light = lights[ l ];

			if ( light.onlyShadow ) continue;

			color = light.color;
			intensity = light.intensity;
			distance = light.distance;

			if ( light instanceof THREE.AmbientLight ) {

				if ( _this.gammaInput ) {

					r += color.r * color.r;
					g += color.g * color.g;
					b += color.b * color.b;

				} else {

					r += color.r;
					g += color.g;
					b += color.b;

				}

			} else if ( light instanceof THREE.DirectionalLight ) {

				doffset = dlength * 3;

				if ( _this.gammaInput ) {

					dcolors[ doffset ]     = color.r * color.r * intensity * intensity;
					dcolors[ doffset + 1 ] = color.g * color.g * intensity * intensity;
					dcolors[ doffset + 2 ] = color.b * color.b * intensity * intensity;

				} else {

					dcolors[ doffset ]     = color.r * intensity;
					dcolors[ doffset + 1 ] = color.g * intensity;
					dcolors[ doffset + 2 ] = color.b * intensity;

				}

				_direction.copy( light.matrixWorld.getPosition() );
				_direction.subSelf( light.target.matrixWorld.getPosition() );
				_direction.normalize();

				dpositions[ doffset ]     = _direction.x;
				dpositions[ doffset + 1 ] = _direction.y;
				dpositions[ doffset + 2 ] = _direction.z;

				dlength += 1;

			} else if( light instanceof THREE.PointLight || light instanceof THREE.SpotLight ) {

				poffset = plength * 3;

				if ( _this.gammaInput ) {

					pcolors[ poffset ]     = color.r * color.r * intensity * intensity;
					pcolors[ poffset + 1 ] = color.g * color.g * intensity * intensity;
					pcolors[ poffset + 2 ] = color.b * color.b * intensity * intensity;

				} else {

					pcolors[ poffset ]     = color.r * intensity;
					pcolors[ poffset + 1 ] = color.g * intensity;
					pcolors[ poffset + 2 ] = color.b * intensity;

				}

				position = light.matrixWorld.getPosition();

				ppositions[ poffset ]     = position.x;
				ppositions[ poffset + 1 ] = position.y;
				ppositions[ poffset + 2 ] = position.z;

				pdistances[ plength ] = distance;

				plength += 1;

			}

		}

		// null eventual remains from removed lights
		// (this is to avoid if in shader)

		for ( l = dlength * 3, ll = dcolors.length; l < ll; l ++ ) dcolors[ l ] = 0.0;
		for ( l = plength * 3, ll = pcolors.length; l < ll; l ++ ) pcolors[ l ] = 0.0;

		zlights.point.length = plength;
		zlights.directional.length = dlength;

		zlights.ambient[ 0 ] = r;
		zlights.ambient[ 1 ] = g;
		zlights.ambient[ 2 ] = b;

	};

	// GL state setting

	this.setFaceCulling = function ( cullFace, frontFace ) {

		if ( cullFace ) {

			if ( !frontFace || frontFace === "ccw" ) {

				_gl.frontFace( _gl.CCW );

			} else {

				_gl.frontFace( _gl.CW );

			}

			if( cullFace === "back" ) {

				_gl.cullFace( _gl.BACK );

			} else if( cullFace === "front" ) {

				_gl.cullFace( _gl.FRONT );

			} else {

				_gl.cullFace( _gl.FRONT_AND_BACK );

			}

			_gl.enable( _gl.CULL_FACE );

		} else {

			_gl.disable( _gl.CULL_FACE );

		}

	};

	this.setObjectFaces = function ( object ) {

		if ( _oldDoubleSided !== object.doubleSided ) {

			if( object.doubleSided ) {

				_gl.disable( _gl.CULL_FACE );

			} else {

				_gl.enable( _gl.CULL_FACE );

			}

			_oldDoubleSided = object.doubleSided;

		}

		if ( _oldFlipSided !== object.flipSided ) {

			if( object.flipSided ) {

				_gl.frontFace( _gl.CW );

			} else {

				_gl.frontFace( _gl.CCW );

			}

			_oldFlipSided = object.flipSided;

		}

	};

	this.setDepthTest = function ( depthTest ) {

		if ( _oldDepthTest !== depthTest ) {

			if ( depthTest ) {

				_gl.enable( _gl.DEPTH_TEST );

			} else {

				_gl.disable( _gl.DEPTH_TEST );

			}

			_oldDepthTest = depthTest;

		}

	};

	this.setDepthWrite = function ( depthWrite ) {

		if ( _oldDepthWrite !== depthWrite ) {

			_gl.depthMask( depthWrite );
			_oldDepthWrite = depthWrite;

		}

	};

	function setLineWidth ( width ) {

		if ( width !== _oldLineWidth ) {

			_gl.lineWidth( width );

			_oldLineWidth = width;

		}

	};

	function setPolygonOffset ( polygonoffset, factor, units ) {

		if ( _oldPolygonOffset !== polygonoffset ) {

			if ( polygonoffset ) {

				_gl.enable( _gl.POLYGON_OFFSET_FILL );

			} else {

				_gl.disable( _gl.POLYGON_OFFSET_FILL );

			}

			_oldPolygonOffset = polygonoffset;

		}

		if ( polygonoffset && ( _oldPolygonOffsetFactor !== factor || _oldPolygonOffsetUnits !== units ) ) {

			_gl.polygonOffset( factor, units );

			_oldPolygonOffsetFactor = factor;
			_oldPolygonOffsetUnits = units;

		}

	};

	this.setBlending = function ( blending, blendEquation, blendSrc, blendDst ) {

		if ( blending !== _oldBlending ) {

			switch ( blending ) {

				case THREE.NoBlending:

					_gl.disable( _gl.BLEND );

					break;

				case THREE.AdditiveBlending:

					_gl.enable( _gl.BLEND );
					_gl.blendEquation( _gl.FUNC_ADD );
					_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE );

					break;

				case THREE.SubtractiveBlending:

					// TODO: Find blendFuncSeparate() combination
					_gl.enable( _gl.BLEND );
					_gl.blendEquation( _gl.FUNC_ADD );
					_gl.blendFunc( _gl.ZERO, _gl.ONE_MINUS_SRC_COLOR );

					break;

				case THREE.MultiplyBlending:

					// TODO: Find blendFuncSeparate() combination
					_gl.enable( _gl.BLEND );
					_gl.blendEquation( _gl.FUNC_ADD );
					_gl.blendFunc( _gl.ZERO, _gl.SRC_COLOR );

					break;

				case THREE.CustomBlending:

					_gl.enable( _gl.BLEND );

					break;

				default:

					_gl.enable( _gl.BLEND );
					_gl.blendEquationSeparate( _gl.FUNC_ADD, _gl.FUNC_ADD );
					_gl.blendFuncSeparate( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );

					break;

			}

			_oldBlending = blending;

		}

		if ( blending === THREE.CustomBlending ) {

			if ( blendEquation !== _oldBlendEquation ) {

				_gl.blendEquation( paramThreeToGL( blendEquation ) );

				_oldBlendEquation = blendEquation;

			}

			if ( blendSrc !== _oldBlendSrc || blendDst !== _oldBlendDst ) {

				_gl.blendFunc( paramThreeToGL( blendSrc ), paramThreeToGL( blendDst ) );

				_oldBlendSrc = blendSrc;
				_oldBlendDst = blendDst;

			}

		} else {

			_oldBlendEquation = null;
			_oldBlendSrc = null;
			_oldBlendDst = null;

		}

	};

	// Shaders

	function buildProgram ( shaderID, fragmentShader, vertexShader, uniforms, attributes, parameters ) {

		var p, pl, program, code;
		var chunks = [];

		// Generate code

		if ( shaderID ) {

			chunks.push( shaderID );

		} else {

			chunks.push( fragmentShader );
			chunks.push( vertexShader );

		}

		for ( p in parameters ) {

			chunks.push( p );
			chunks.push( parameters[ p ] );

		}

		code = chunks.join();

		// Check if code has been already compiled

		for ( p = 0, pl = _programs.length; p < pl; p ++ ) {

			if ( _programs[ p ].code === code ) {

				// console.log( "Code already compiled." /*: \n\n" + code*/ );

				return _programs[ p ].program;

			}

		}

		//console.log( "building new program " );

		//

		program = _gl.createProgram();

		var prefix_vertex = [

			"precision " + _precision + " float;",

			( _maxVertexTextures > 0 ) ? "#define VERTEX_TEXTURES" : "",

			_this.gammaInput ? "#define GAMMA_INPUT" : "",
			_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",
			_this.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",

			"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
			"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,

			"#define MAX_SHADOWS " + parameters.maxShadows,

			"#define MAX_BONES " + parameters.maxBones,

			parameters.map ? "#define USE_MAP" : "",
			parameters.envMap ? "#define USE_ENVMAP" : "",
			parameters.lightMap ? "#define USE_LIGHTMAP" : "",
			parameters.vertexColors ? "#define USE_COLOR" : "",
			parameters.skinning ? "#define USE_SKINNING" : "",
			parameters.morphTargets ? "#define USE_MORPHTARGETS" : "",
			parameters.morphNormals ? "#define USE_MORPHNORMALS" : "",
			parameters.perPixel ? "#define PHONG_PER_PIXEL" : "",
			parameters.wrapAround ? "#define WRAP_AROUND" : "",
			parameters.doubleSided ? "#define DOUBLE_SIDED" : "",

			parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
			parameters.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
			parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
			parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

			parameters.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",

			"uniform mat4 objectMatrix;",
			"uniform mat4 modelViewMatrix;",
			"uniform mat4 projectionMatrix;",
			"uniform mat4 viewMatrix;",
			"uniform mat3 normalMatrix;",
			"uniform vec3 cameraPosition;",

			"attribute vec3 position;",
			"attribute vec3 normal;",
			"attribute vec2 uv;",
			"attribute vec2 uv2;",

			"#ifdef USE_COLOR",

				"attribute vec3 color;",

			"#endif",

			"#ifdef USE_MORPHTARGETS",

				"attribute vec3 morphTarget0;",
				"attribute vec3 morphTarget1;",
				"attribute vec3 morphTarget2;",
				"attribute vec3 morphTarget3;",

				"#ifdef USE_MORPHNORMALS",

					"attribute vec3 morphNormal0;",
					"attribute vec3 morphNormal1;",
					"attribute vec3 morphNormal2;",
					"attribute vec3 morphNormal3;",

				"#else",

					"attribute vec3 morphTarget4;",
					"attribute vec3 morphTarget5;",
					"attribute vec3 morphTarget6;",
					"attribute vec3 morphTarget7;",

				"#endif",

			"#endif",

			"#ifdef USE_SKINNING",

				"attribute vec4 skinVertexA;",
				"attribute vec4 skinVertexB;",
				"attribute vec4 skinIndex;",
				"attribute vec4 skinWeight;",

			"#endif",

			""

		].join("\n");

		var prefix_fragment = [

			"precision " + _precision + " float;",

			"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
			"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,

			"#define MAX_SHADOWS " + parameters.maxShadows,

			parameters.alphaTest ? "#define ALPHATEST " + parameters.alphaTest: "",

			_this.gammaInput ? "#define GAMMA_INPUT" : "",
			_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",
			_this.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "",

			( parameters.useFog && parameters.fog ) ? "#define USE_FOG" : "",
			( parameters.useFog && parameters.fog instanceof THREE.FogExp2 ) ? "#define FOG_EXP2" : "",

			parameters.map ? "#define USE_MAP" : "",
			parameters.envMap ? "#define USE_ENVMAP" : "",
			parameters.lightMap ? "#define USE_LIGHTMAP" : "",
			parameters.vertexColors ? "#define USE_COLOR" : "",

			parameters.metal ? "#define METAL" : "",
			parameters.perPixel ? "#define PHONG_PER_PIXEL" : "",
			parameters.wrapAround ? "#define WRAP_AROUND" : "",
			parameters.doubleSided ? "#define DOUBLE_SIDED" : "",

			parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
			parameters.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
			parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
			parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

			"uniform mat4 viewMatrix;",
			"uniform vec3 cameraPosition;",
			""

		].join("\n");

		_gl.attachShader( program, getShader( "fragment", prefix_fragment + fragmentShader ) );
		_gl.attachShader( program, getShader( "vertex", prefix_vertex + vertexShader ) );

		_gl.linkProgram( program );

		if ( !_gl.getProgramParameter( program, _gl.LINK_STATUS ) ) {

			console.error( "Could not initialise shader\n" + "VALIDATE_STATUS: " + _gl.getProgramParameter( program, _gl.VALIDATE_STATUS ) + ", gl error [" + _gl.getError() + "]" );

		}

		//console.log( prefix_fragment + fragmentShader );
		//console.log( prefix_vertex + vertexShader );

		program.uniforms = {};
		program.attributes = {};

		var identifiers, u, a, i;

		// cache uniform locations

		identifiers = [

			'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'objectMatrix', 'cameraPosition',
			'boneGlobalMatrices', 'morphTargetInfluences'

		];

		for ( u in uniforms ) {

			identifiers.push( u );

		}

		cacheUniformLocations( program, identifiers );

		// cache attributes locations

		identifiers = [

			"position", "normal", "uv", "uv2", "tangent", "color",
			"skinVertexA", "skinVertexB", "skinIndex", "skinWeight"

		];

		for ( i = 0; i < parameters.maxMorphTargets; i ++ ) {

			identifiers.push( "morphTarget" + i );

		}

		for ( i = 0; i < parameters.maxMorphNormals; i ++ ) {

			identifiers.push( "morphNormal" + i );

		}

		for ( a in attributes ) {

			identifiers.push( a );

		}

		cacheAttributeLocations( program, identifiers );

		program.id = _programs.length;

		_programs.push( { program: program, code: code } );

		_this.info.memory.programs = _programs.length;

		return program;

	};

	// Shader parameters cache

	function cacheUniformLocations ( program, identifiers ) {

		var i, l, id;

		for( i = 0, l = identifiers.length; i < l; i ++ ) {

			id = identifiers[ i ];
			program.uniforms[ id ] = _gl.getUniformLocation( program, id );

		}

	};

	function cacheAttributeLocations ( program, identifiers ) {

		var i, l, id;

		for( i = 0, l = identifiers.length; i < l; i ++ ) {

			id = identifiers[ i ];
			program.attributes[ id ] = _gl.getAttribLocation( program, id );

		}

	};

	function getShader ( type, string ) {

		var shader;

		if ( type === "fragment" ) {

			shader = _gl.createShader( _gl.FRAGMENT_SHADER );

		} else if ( type === "vertex" ) {

			shader = _gl.createShader( _gl.VERTEX_SHADER );

		}

		_gl.shaderSource( shader, string );
		_gl.compileShader( shader );

		if ( !_gl.getShaderParameter( shader, _gl.COMPILE_STATUS ) ) {

			console.error( _gl.getShaderInfoLog( shader ) );
			console.error( string );
			return null;

		}

		return shader;

	};

	// Textures


	function isPowerOfTwo ( value ) {

		return ( value & ( value - 1 ) ) === 0;

	};

	function setTextureParameters ( textureType, texture, isImagePowerOfTwo ) {

		if ( isImagePowerOfTwo ) {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, paramThreeToGL( texture.wrapS ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, paramThreeToGL( texture.wrapT ) );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, paramThreeToGL( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, paramThreeToGL( texture.minFilter ) );

		} else {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

		}

	};

	this.setTexture = function ( texture, slot ) {

		if ( texture.needsUpdate ) {

			if ( ! texture.__webglInit ) {

				texture.__webglInit = true;
				texture.__webglTexture = _gl.createTexture();

				_this.info.memory.textures ++;

			}

			_gl.activeTexture( _gl.TEXTURE0 + slot );
			_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

			_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );

			var image = texture.image,
			isImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),
			glFormat = paramThreeToGL( texture.format ),
			glType = paramThreeToGL( texture.type );

			setTextureParameters( _gl.TEXTURE_2D, texture, isImagePowerOfTwo );

			if ( texture instanceof THREE.DataTexture ) {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, image.width, image.height, 0, glFormat, glType, image.data );

			} else {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, glFormat, glType, texture.image );

			}

			if ( texture.generateMipmaps && isImagePowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

			texture.needsUpdate = false;

			if ( texture.onUpdate ) texture.onUpdate();

		} else {

			_gl.activeTexture( _gl.TEXTURE0 + slot );
			_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

		}

	};

	function clampToMaxSize ( image, maxSize ) {

		if ( image.width <= maxSize && image.height <= maxSize ) {

			return image;

		}

		// Warning: Scaling through the canvas will only work with images that use
		// premultiplied alpha.

		var maxDimension = Math.max( image.width, image.height );
		var newWidth = Math.floor( image.width * maxSize / maxDimension );
		var newHeight = Math.floor( image.height * maxSize / maxDimension );

		var canvas = document.createElement( 'canvas' );
		canvas.width = newWidth;
		canvas.height = newHeight;

		var ctx = canvas.getContext( "2d" );
		ctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight );

		return canvas;

	}

	function setCubeTexture ( texture, slot ) {

		if ( texture.image.length === 6 ) {

			if ( texture.needsUpdate ) {

				if ( ! texture.image.__webglTextureCube ) {

					texture.image.__webglTextureCube = _gl.createTexture();

				}

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

				var cubeImage = [];

				for ( var i = 0; i < 6; i ++ ) {

					if ( _this.autoScaleCubemaps ) {

						cubeImage[ i ] = clampToMaxSize( texture.image[ i ], _maxCubemapSize );

					} else {

						cubeImage[ i ] = texture.image[ i ];

					}

				}

				var image = cubeImage[ 0 ],
				isImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),
				glFormat = paramThreeToGL( texture.format ),
				glType = paramThreeToGL( texture.type );

				setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, isImagePowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, glFormat, glType, cubeImage[ i ] );

				}

				if ( texture.generateMipmaps && isImagePowerOfTwo )	_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

				texture.needsUpdate = false;

				if ( texture.onUpdate ) texture.onUpdate();

			} else {

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

			}

		}

	};

	function setCubeTextureDynamic ( texture, slot ) {

		_gl.activeTexture( _gl.TEXTURE0 + slot );
		_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.__webglTexture );

	};

	// Render targets

	function setupFrameBuffer ( framebuffer, renderTarget, textureTarget ) {

		_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
		_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureTarget, renderTarget.__webglTexture, 0 );

	};

	function setupRenderBuffer ( renderbuffer, renderTarget  ) {

		_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );

		if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		/* For some reason this is not working. Defaulting to RGBA4.
		} else if( ! renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );
		*/
		} else if( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		} else {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height );

		}

	};

	this.setRenderTarget = function ( renderTarget ) {

		var isCube = ( renderTarget instanceof THREE.WebGLRenderTargetCube );

		if ( renderTarget && ! renderTarget.__webglFramebuffer ) {

			if( renderTarget.depthBuffer === undefined ) renderTarget.depthBuffer = true;
			if( renderTarget.stencilBuffer === undefined ) renderTarget.stencilBuffer = true;

			renderTarget.__webglTexture = _gl.createTexture();

			// Setup texture, create render and frame buffers

			var isTargetPowerOfTwo = isPowerOfTwo( renderTarget.width ) && isPowerOfTwo( renderTarget.height ),
				glFormat = paramThreeToGL( renderTarget.format ),
				glType = paramThreeToGL( renderTarget.type );

			if ( isCube ) {

				renderTarget.__webglFramebuffer = [];
				renderTarget.__webglRenderbuffer = [];

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget, isTargetPowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					renderTarget.__webglFramebuffer[ i ] = _gl.createFramebuffer();
					renderTarget.__webglRenderbuffer[ i ] = _gl.createRenderbuffer();

					_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

					setupFrameBuffer( renderTarget.__webglFramebuffer[ i ], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );
					setupRenderBuffer( renderTarget.__webglRenderbuffer[ i ], renderTarget );

				}

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

			} else {

				renderTarget.__webglFramebuffer = _gl.createFramebuffer();
				renderTarget.__webglRenderbuffer = _gl.createRenderbuffer();

				_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_2D, renderTarget, isTargetPowerOfTwo );

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

				setupFrameBuffer( renderTarget.__webglFramebuffer, renderTarget, _gl.TEXTURE_2D );
				setupRenderBuffer( renderTarget.__webglRenderbuffer, renderTarget );

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

			}

			// Release everything

			if ( isCube ) {

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

			} else {

				_gl.bindTexture( _gl.TEXTURE_2D, null );

			}

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );
			_gl.bindFramebuffer( _gl.FRAMEBUFFER, null);

		}

		var framebuffer, width, height, vx, vy;

		if ( renderTarget ) {

			if ( isCube ) {

				framebuffer = renderTarget.__webglFramebuffer[ renderTarget.activeCubeFace ];

			} else {

				framebuffer = renderTarget.__webglFramebuffer;

			}

			width = renderTarget.width;
			height = renderTarget.height;

			vx = 0;
			vy = 0;

		} else {

			framebuffer = null;

			width = _viewportWidth;
			height = _viewportHeight;

			vx = _viewportX;
			vy = _viewportY;

		}

		if ( framebuffer !== _currentFramebuffer ) {

			_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
			_gl.viewport( vx, vy, width, height );

			_currentFramebuffer = framebuffer;

		}

		_currentWidth = width;
		_currentHeight = height;

	};

	function updateRenderTargetMipmap ( renderTarget ) {

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );
			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

		} else {

			_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_2D );
			_gl.bindTexture( _gl.TEXTURE_2D, null );

		}

	};

	// Fallback filters for non-power-of-2 textures

	function filterFallback ( f ) {

		switch ( f ) {

			case THREE.NearestFilter:
			case THREE.NearestMipMapNearestFilter:
			case THREE.NearestMipMapLinearFilter: return _gl.NEAREST; break;

			case THREE.LinearFilter:
			case THREE.LinearMipMapNearestFilter:
			case THREE.LinearMipMapLinearFilter:
			default:

				return _gl.LINEAR; break;

		}

	};

	// Map three.js constants to WebGL constants

	function paramThreeToGL ( p ) {

		switch ( p ) {

			case THREE.RepeatWrapping: return _gl.REPEAT; break;
			case THREE.ClampToEdgeWrapping: return _gl.CLAMP_TO_EDGE; break;
			case THREE.MirroredRepeatWrapping: return _gl.MIRRORED_REPEAT; break;

			case THREE.NearestFilter: return _gl.NEAREST; break;
			case THREE.NearestMipMapNearestFilter: return _gl.NEAREST_MIPMAP_NEAREST; break;
			case THREE.NearestMipMapLinearFilter: return _gl.NEAREST_MIPMAP_LINEAR; break;

			case THREE.LinearFilter: return _gl.LINEAR; break;
			case THREE.LinearMipMapNearestFilter: return _gl.LINEAR_MIPMAP_NEAREST; break;
			case THREE.LinearMipMapLinearFilter: return _gl.LINEAR_MIPMAP_LINEAR; break;

			case THREE.ByteType: return _gl.BYTE; break;
			case THREE.UnsignedByteType: return _gl.UNSIGNED_BYTE; break;
			case THREE.ShortType: return _gl.SHORT; break;
			case THREE.UnsignedShortType: return _gl.UNSIGNED_SHORT; break;
			case THREE.IntType: return _gl.INT; break;
			case THREE.UnsignedIntType: return _gl.UNSIGNED_INT; break;
			case THREE.FloatType: return _gl.FLOAT; break;

			case THREE.AlphaFormat: return _gl.ALPHA; break;
			case THREE.RGBFormat: return _gl.RGB; break;
			case THREE.RGBAFormat: return _gl.RGBA; break;
			case THREE.LuminanceFormat: return _gl.LUMINANCE; break;
			case THREE.LuminanceAlphaFormat: return _gl.LUMINANCE_ALPHA; break;

			case THREE.AddEquation: return _gl.FUNC_ADD; break;
			case THREE.SubtractEquation: return _gl.FUNC_SUBTRACT; break;
			case THREE.ReverseSubtractEquation: return _gl.FUNC_REVERSE_SUBTRACT; break;

			case THREE.ZeroFactor: return _gl.ZERO; break;
			case THREE.OneFactor: return _gl.ONE; break;
			case THREE.SrcColorFactor: return _gl.SRC_COLOR; break;
			case THREE.OneMinusSrcColorFactor: return _gl.ONE_MINUS_SRC_COLOR; break;
			case THREE.SrcAlphaFactor: return _gl.SRC_ALPHA; break;
			case THREE.OneMinusSrcAlphaFactor: return _gl.ONE_MINUS_SRC_ALPHA; break;
			case THREE.DstAlphaFactor: return _gl.DST_ALPHA; break;
			case THREE.OneMinusDstAlphaFactor: return _gl.ONE_MINUS_DST_ALPHA; break;

			case THREE.DstColorFactor: return _gl.DST_COLOR; break;
			case THREE.OneMinusDstColorFactor: return _gl.ONE_MINUS_DST_COLOR; break;
			case THREE.SrcAlphaSaturateFactor: return _gl.SRC_ALPHA_SATURATE; break;

		}

		return 0;

	};

	// Allocations

	function allocateBones ( object ) {

		// default for when object is not specified
		// ( for example when prebuilding shader
		//   to be used with multiple objects )
		//
		// 	- leave some extra space for other uniforms
		//  - limit here is ANGLE's 254 max uniform vectors
		//    (up to 54 should be safe)

		var maxBones = 50;

		if ( object !== undefined && object instanceof THREE.SkinnedMesh ) {

			maxBones = object.bones.length;

		}

		return maxBones;

	};

	function allocateLights ( lights ) {

		var l, ll, light, dirLights, pointLights, maxDirLights, maxPointLights;
		dirLights = pointLights = maxDirLights = maxPointLights = 0;

		for ( l = 0, ll = lights.length; l < ll; l++ ) {

			light = lights[ l ];

			if ( light.onlyShadow ) continue;

			if ( light instanceof THREE.DirectionalLight ) dirLights ++;
			if ( light instanceof THREE.PointLight ) pointLights ++;
			if ( light instanceof THREE.SpotLight ) pointLights ++;

		}

		if ( ( pointLights + dirLights ) <= _maxLights ) {

			maxDirLights = dirLights;
			maxPointLights = pointLights;

		} else {

			maxDirLights = Math.ceil( _maxLights * dirLights / ( pointLights + dirLights ) );
			maxPointLights = _maxLights - maxDirLights;

		}

		return { 'directional' : maxDirLights, 'point' : maxPointLights };

	};

	function allocateShadows ( lights ) {

		var l, ll, light, maxShadows = 0;

		for ( l = 0, ll = lights.length; l < ll; l++ ) {

			light = lights[ l ];

			if ( ! light.castShadow ) continue;

			if ( light instanceof THREE.SpotLight ) maxShadows ++;
			if ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) maxShadows ++;

		}

		return maxShadows;

	};

	// Initialization

	function initGL () {

		var gl;

		try {

			if ( ! ( gl = _canvas.getContext( 'experimental-webgl', { alpha: _alpha, premultipliedAlpha: _premultipliedAlpha, antialias: _antialias, stencil: _stencil, preserveDrawingBuffer: _preserveDrawingBuffer } ) ) ) {

				throw 'Error creating WebGL context.';

			}

			console.log(
				navigator.userAgent + " | " +
				gl.getParameter( gl.VERSION ) + " | " +
				gl.getParameter( gl.VENDOR ) + " | " +
				gl.getParameter( gl.RENDERER ) + " | " +
				gl.getParameter( gl.SHADING_LANGUAGE_VERSION )
			);

		} catch ( error ) {

			console.error( error );

		}

		return gl;

	};

	function setDefaultGLState () {

		_gl.clearColor( 0, 0, 0, 1 );
		_gl.clearDepth( 1 );
		_gl.clearStencil( 0 );

		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthFunc( _gl.LEQUAL );

		_gl.frontFace( _gl.CCW );
		_gl.cullFace( _gl.BACK );
		_gl.enable( _gl.CULL_FACE );

		_gl.enable( _gl.BLEND );
		_gl.blendEquation( _gl.FUNC_ADD );
		_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	// default plugins (order is important)

	this.shadowMapPlugin = new THREE.ShadowMapPlugin();
	this.addPrePlugin( this.shadowMapPlugin );

	this.addPostPlugin( new THREE.SpritePlugin() );
	this.addPostPlugin( new THREE.LensFlarePlugin() );

};
/**
 * @author szimek / https://github.com/szimek/
 */

THREE.WebGLRenderTarget = function ( width, height, options ) {

	this.width = width;
	this.height = height;

	options = options || {};

	this.wrapS = options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter;
	this.minFilter = options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.format = options.format !== undefined ? options.format : THREE.RGBAFormat;
	this.type = options.type !== undefined ? options.type : THREE.UnsignedByteType;

	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;

	this.generateMipmaps = true;

};

THREE.WebGLRenderTarget.prototype.clone = function() {

	var tmp = new THREE.WebGLRenderTarget( this.width, this.height );

	tmp.wrapS = this.wrapS;
	tmp.wrapT = this.wrapT;

	tmp.magFilter = this.magFilter;
	tmp.minFilter = this.minFilter;

	tmp.offset.copy( this.offset );
	tmp.repeat.copy( this.repeat );

	tmp.format = this.format;
	tmp.type = this.type;

	tmp.depthBuffer = this.depthBuffer;
	tmp.stencilBuffer = this.stencilBuffer;

	return tmp;

};
/**
 * @author alteredq / http://alteredqualia.com
 */

THREE.WebGLRenderTargetCube = function ( width, height, options ) {

	THREE.WebGLRenderTarget.call( this, width, height, options );

	this.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5

};

THREE.WebGLRenderTargetCube.prototype = new THREE.WebGLRenderTarget();
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube;
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableVertex = function () {

	this.positionWorld = new THREE.Vector3();
	this.positionScreen = new THREE.Vector4();

	this.visible = true;

};

THREE.RenderableVertex.prototype.copy = function ( vertex ) {

	this.positionWorld.copy( vertex.positionWorld );
	this.positionScreen.copy( vertex.positionScreen );

}
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableFace3 = function () {

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();
	this.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

	this.material = null;
	this.faceMaterial = null;
	this.uvs = [[]];

	this.z = null;

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableFace4 = function () {

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();
	this.v3 = new THREE.RenderableVertex();
	this.v4 = new THREE.RenderableVertex();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();
	this.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];

	this.material = null;
	this.faceMaterial = null;
	this.uvs = [[]];

	this.z = null;

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableObject = function () {

	this.object = null;
	this.z = null;

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableParticle = function () {

	this.x = null;
	this.y = null;
	this.z = null;

	this.rotation = null;
	this.scale = new THREE.Vector2();

	this.material = null;

};
/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableLine = function () {

	this.z = null;

	this.v1 = new THREE.RenderableVertex();
	this.v2 = new THREE.RenderableVertex();

	this.material = null;

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.BufferGeometry = function () {

	this.id = THREE.GeometryCount ++;

	// GL buffers

	this.vertexIndexBuffer = null;
	this.vertexPositionBuffer = null;
	this.vertexNormalBuffer = null;
	this.vertexUvBuffer = null;
	this.vertexColorBuffer = null;

	// typed arrays (kept only if dynamic flag is set)

	this.vertexIndexArray = null;
	this.vertexPositionArray = null;
	this.vertexNormalArray = null;
	this.vertexUvArray = null;
	this.vertexColorArray = null;

	this.dynamic = false;

	// boundings

	this.boundingBox = null;
	this.boundingSphere = null;

	// for compatibility

	this.morphTargets = [];

};

THREE.BufferGeometry.prototype = {

	constructor : THREE.BufferGeometry,

	// for compatibility

	computeBoundingBox: function () {

	},

	// for compatibility

	computeBoundingSphere: function () {

	}


};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Gyroscope = function () {

	THREE.Object3D.call( this );

};


THREE.Gyroscope.prototype = new THREE.Object3D();
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope;

THREE.Gyroscope.prototype.updateMatrixWorld = function ( force ) {

	this.matrixAutoUpdate && this.updateMatrix();

	// update matrixWorld

	if ( this.matrixWorldNeedsUpdate || force ) {

		if ( this.parent ) {

			this.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );

			this.matrixWorld.decompose( this.translationWorld, this.rotationWorld, this.scaleWorld );
			this.matrix.decompose( this.translationObject, this.rotationObject, this.scaleObject );

			this.matrixWorld.compose( this.translationWorld, this.rotationObject, this.scaleWorld );


		} else {

			this.matrixWorld.copy( this.matrix );

		}


		this.matrixWorldNeedsUpdate = false;

		force = true;

	}

	// update children

	for ( var i = 0, l = this.children.length; i < l; i ++ ) {

		this.children[ i ].updateMatrixWorld( force );

	}

};

THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */

THREE.CameraHelper = function ( camera ) {

	THREE.Object3D.call( this );

	var _this = this;

	this.lineGeometry = new THREE.Geometry();
	this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );

	this.pointMap = {};

	// colors

	var hexFrustum = 0xffaa00,
	hexCone	   	   = 0xff0000,
	hexUp	   	   = 0x00aaff,
	hexTarget  	   = 0xffffff,
	hexCross   	   = 0x333333;

	// near

	addLine( "n1", "n2", hexFrustum );
	addLine( "n2", "n4", hexFrustum );
	addLine( "n4", "n3", hexFrustum );
	addLine( "n3", "n1", hexFrustum );

	// far

	addLine( "f1", "f2", hexFrustum );
	addLine( "f2", "f4", hexFrustum );
	addLine( "f4", "f3", hexFrustum );
	addLine( "f3", "f1", hexFrustum );

	// sides

	addLine( "n1", "f1", hexFrustum );
	addLine( "n2", "f2", hexFrustum );
	addLine( "n3", "f3", hexFrustum );
	addLine( "n4", "f4", hexFrustum );

	// cone

	addLine( "p", "n1", hexCone );
	addLine( "p", "n2", hexCone );
	addLine( "p", "n3", hexCone );
	addLine( "p", "n4", hexCone );

	// up

	addLine( "u1", "u2", hexUp );
	addLine( "u2", "u3", hexUp );
	addLine( "u3", "u1", hexUp );

	// target

	addLine( "c", "t", hexTarget );
	addLine( "p", "c", hexCross );

	// cross

	addLine( "cn1", "cn2", hexCross );
	addLine( "cn3", "cn4", hexCross );

	addLine( "cf1", "cf2", hexCross );
	addLine( "cf3", "cf4", hexCross );

	this.camera = camera;

	function addLine( a, b, hex ) {

		addPoint( a, hex );
		addPoint( b, hex );

	}

	function addPoint( id, hex ) {

		_this.lineGeometry.vertices.push( new THREE.Vertex( new THREE.Vector3() ) );
		_this.lineGeometry.colors.push( new THREE.Color( hex ) );

		if ( _this.pointMap[ id ] === undefined ) _this.pointMap[ id ] = [];
		_this.pointMap[ id ].push( _this.lineGeometry.vertices.length - 1 );

	}

	this.update( camera );

	this.lines = new THREE.Line( this.lineGeometry, this.lineMaterial, THREE.LinePieces );
	this.add( this.lines );

};

THREE.CameraHelper.prototype = new THREE.Object3D();
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper;

THREE.CameraHelper.prototype.update = function () {

	var camera = this.camera;

	var w = 1;
	var h = 1;

	var _this = this;

	// we need just camera projection matrix
	// world matrix must be identity

	THREE.CameraHelper.__c.projectionMatrix.copy( camera.projectionMatrix );

	// center / target

	setPoint( "c", 0, 0, -1 );
	setPoint( "t", 0, 0,  1 );

	// near

	setPoint( "n1", -w, -h, -1 );
	setPoint( "n2",  w, -h, -1 );
	setPoint( "n3", -w,  h, -1 );
	setPoint( "n4",  w,  h, -1 );

	// far

	setPoint( "f1", -w, -h, 1 );
	setPoint( "f2",  w, -h, 1 );
	setPoint( "f3", -w,  h, 1 );
	setPoint( "f4",  w,  h, 1 );

	// up

	setPoint( "u1",  w * 0.7, h * 1.1, -1 );
	setPoint( "u2", -w * 0.7, h * 1.1, -1 );
	setPoint( "u3",        0, h * 2,   -1 );

	// cross

	setPoint( "cf1", -w,  0, 1 );
	setPoint( "cf2",  w,  0, 1 );
	setPoint( "cf3",  0, -h, 1 );
	setPoint( "cf4",  0,  h, 1 );

	setPoint( "cn1", -w,  0, -1 );
	setPoint( "cn2",  w,  0, -1 );
	setPoint( "cn3",  0, -h, -1 );
	setPoint( "cn4",  0,  h, -1 );

	function setPoint( point, x, y, z ) {

		THREE.CameraHelper.__v.set( x, y, z );
		THREE.CameraHelper.__projector.unprojectVector( THREE.CameraHelper.__v, THREE.CameraHelper.__c );

		var points = _this.pointMap[ point ];

		if ( points !== undefined ) {

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				var j = points[ i ];
				_this.lineGeometry.vertices[ j ].position.copy( THREE.CameraHelper.__v );

			}

		}

	}

	this.lineGeometry.__dirtyVertices = true;

};

THREE.CameraHelper.__projector = new THREE.Projector();
THREE.CameraHelper.__v = new THREE.Vector3();
THREE.CameraHelper.__c = new THREE.Camera();

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlare = function ( texture, size, distance, blending, color ) {

	THREE.Object3D.call( this );

	this.lensFlares = [];

	this.positionScreen = new THREE.Vector3();
	this.customUpdateCallback = undefined;

	if( texture !== undefined ) {

		this.add( texture, size, distance, blending, color );

	}

};

THREE.LensFlare.prototype = new THREE.Object3D();
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;


/*
 * Add: adds another flare
 */

THREE.LensFlare.prototype.add = function ( texture, size, distance, blending, color, opacity ) {

	if( size === undefined ) size = -1;
	if( distance === undefined ) distance = 0;
	if( opacity === undefined ) opacity = 1;
	if( color === undefined ) color = new THREE.Color( 0xffffff );
	if( blending === undefined ) blending = THREE.NormalBlending;

	distance = Math.min( distance, Math.max( 0, distance ) );

	this.lensFlares.push( { texture: texture, 			// THREE.Texture
		                    size: size, 				// size in pixels (-1 = use texture.width)
		                    distance: distance, 		// distance (0-1) from light source (0=at light source)
		                    x: 0, y: 0, z: 0,			// screen position (-1 => 1) z = 0 is ontop z = 1 is back
		                    scale: 1, 					// scale
		                    rotation: 1, 				// rotation
		                    opacity: opacity,			// opacity
							color: color,				// color
		                    blending: blending } );		// blending

};


/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */

THREE.LensFlare.prototype.updateLensFlares = function () {

	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = -this.positionScreen.x * 2;
	var vecY = -this.positionScreen.y * 2;

	for( f = 0; f < fl; f ++ ) {

		flare = this.lensFlares[ f ];

		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;

		flare.wantedRotation = flare.x * Math.PI * 0.25;
		flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;

	}

};












/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ImmediateRenderObject = function ( ) {

	THREE.Object3D.call( this );

	this.render = function( renderCallback ) {
	};

};

THREE.ImmediateRenderObject.prototype = new THREE.Object3D();
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject;

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlarePlugin = function ( ) {

	var _gl, _renderer, _lensFlare = {};

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		_lensFlare.vertices = new Float32Array( 8 + 8 );
		_lensFlare.faces = new Uint16Array( 6 );

		var i = 0;
		_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = -1;	// vertex
		_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 0;	// uv... etc.

		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = -1;
		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 0;

		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;
		_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;

		_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = 1;
		_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 1;

		i = 0;
		_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 1; _lensFlare.faces[ i++ ] = 2;
		_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 2; _lensFlare.faces[ i++ ] = 3;

		// buffers

		_lensFlare.vertexBuffer     = _gl.createBuffer();
		_lensFlare.elementBuffer    = _gl.createBuffer();

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, _lensFlare.vertices, _gl.STATIC_DRAW );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.faces, _gl.STATIC_DRAW );

		// textures

		_lensFlare.tempTexture      = _gl.createTexture();
		_lensFlare.occlusionTexture = _gl.createTexture();

		_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
		_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, 16, 16, 0, _gl.RGB, _gl.UNSIGNED_BYTE, null );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );

		_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );
		_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, 16, 16, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );
		_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );

		if ( _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) <= 0 ) {

			_lensFlare.hasVertexTexture = false;
			_lensFlare.program = createProgram( THREE.ShaderFlares[ "lensFlare" ] );

		} else {

			_lensFlare.hasVertexTexture = true;
			_lensFlare.program = createProgram( THREE.ShaderFlares[ "lensFlareVertexTexture" ] );

		}

		_lensFlare.attributes = {};
		_lensFlare.uniforms = {};

		_lensFlare.attributes.vertex       = _gl.getAttribLocation ( _lensFlare.program, "position" );
		_lensFlare.attributes.uv           = _gl.getAttribLocation ( _lensFlare.program, "uv" );

		_lensFlare.uniforms.renderType     = _gl.getUniformLocation( _lensFlare.program, "renderType" );
		_lensFlare.uniforms.map            = _gl.getUniformLocation( _lensFlare.program, "map" );
		_lensFlare.uniforms.occlusionMap   = _gl.getUniformLocation( _lensFlare.program, "occlusionMap" );
		_lensFlare.uniforms.opacity        = _gl.getUniformLocation( _lensFlare.program, "opacity" );
		_lensFlare.uniforms.color          = _gl.getUniformLocation( _lensFlare.program, "color" );
		_lensFlare.uniforms.scale          = _gl.getUniformLocation( _lensFlare.program, "scale" );
		_lensFlare.uniforms.rotation       = _gl.getUniformLocation( _lensFlare.program, "rotation" );
		_lensFlare.uniforms.screenPosition = _gl.getUniformLocation( _lensFlare.program, "screenPosition" );

		_lensFlare.attributesEnabled = false;

	};


	/*
	 * Render lens flares
	 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
	 *         reads these back and calculates occlusion.
	 *         Then _lensFlare.update_lensFlares() is called to re-position and
	 *         update transparency of flares. Then they are rendered.
	 *
	 */

	this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

		var flares = scene.__webglFlares,
			nFlares = flares.length;

		if ( ! nFlares ) return;

		var tempPosition = new THREE.Vector3();

		var invAspect = viewportHeight / viewportWidth,
			halfViewportWidth = viewportWidth * 0.5,
			halfViewportHeight = viewportHeight * 0.5;

		var size = 16 / viewportHeight,
			scale = new THREE.Vector2( size * invAspect, size );

		var screenPosition = new THREE.Vector3( 1, 1, 0 ),
			screenPositionPixels = new THREE.Vector2( 1, 1 );

		var uniforms = _lensFlare.uniforms,
			attributes = _lensFlare.attributes;

		// set _lensFlare program and reset blending

		_gl.useProgram( _lensFlare.program );

		if ( ! _lensFlare.attributesEnabled ) {

			_gl.enableVertexAttribArray( _lensFlare.attributes.vertex );
			_gl.enableVertexAttribArray( _lensFlare.attributes.uv );

			_lensFlare.attributesEnabled = true;

		}

		// loop through all lens flares to update their occlusion and positions
		// setup gl and common used attribs/unforms

		_gl.uniform1i( uniforms.occlusionMap, 0 );
		_gl.uniform1i( uniforms.map, 1 );

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );
		_gl.vertexAttribPointer( attributes.vertex, 2, _gl.FLOAT, false, 2 * 8, 0 );
		_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );

		_gl.disable( _gl.CULL_FACE );
		_gl.depthMask( false );

		var i, j, jl, flare, sprite;

		for ( i = 0; i < nFlares; i ++ ) {

			size = 16 / viewportHeight;
			scale.set( size * invAspect, size );

			// calc object screen position

			flare = flares[ i ];

			tempPosition.set( flare.matrixWorld.elements[12], flare.matrixWorld.elements[13], flare.matrixWorld.elements[14] );

			camera.matrixWorldInverse.multiplyVector3( tempPosition );
			camera.projectionMatrix.multiplyVector3( tempPosition );

			// setup arrays for gl programs

			screenPosition.copy( tempPosition )

			screenPositionPixels.x = screenPosition.x * halfViewportWidth + halfViewportWidth;
			screenPositionPixels.y = screenPosition.y * halfViewportHeight + halfViewportHeight;

			// screen cull

			if ( _lensFlare.hasVertexTexture || (
				screenPositionPixels.x > 0 &&
				screenPositionPixels.x < viewportWidth &&
				screenPositionPixels.y > 0 &&
				screenPositionPixels.y < viewportHeight ) ) {

				// save current RGB to temp texture

				_gl.activeTexture( _gl.TEXTURE1 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
				_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// render pink quad

				_gl.uniform1i( uniforms.renderType, 0 );
				_gl.uniform2f( uniforms.scale, scale.x, scale.y );
				_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );

				_gl.disable( _gl.BLEND );
				_gl.enable( _gl.DEPTH_TEST );

				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );


				// copy result to occlusionMap

				_gl.activeTexture( _gl.TEXTURE0 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );
				_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// restore graphics

				_gl.uniform1i( uniforms.renderType, 1 );
				_gl.disable( _gl.DEPTH_TEST );

				_gl.activeTexture( _gl.TEXTURE1 );
				_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );
				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );


				// update object positions

				flare.positionScreen.copy( screenPosition )

				if ( flare.customUpdateCallback ) {

					flare.customUpdateCallback( flare );

				} else {

					flare.updateLensFlares();

				}

				// render flares

				_gl.uniform1i( uniforms.renderType, 2 );
				_gl.enable( _gl.BLEND );

				for ( j = 0, jl = flare.lensFlares.length; j < jl; j ++ ) {

					sprite = flare.lensFlares[ j ];

					if ( sprite.opacity > 0.001 && sprite.scale > 0.001 ) {

						screenPosition.x = sprite.x;
						screenPosition.y = sprite.y;
						screenPosition.z = sprite.z;

						size = sprite.size * sprite.scale / viewportHeight;

						scale.x = size * invAspect;
						scale.y = size;

						_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );
						_gl.uniform2f( uniforms.scale, scale.x, scale.y );
						_gl.uniform1f( uniforms.rotation, sprite.rotation );

						_gl.uniform1f( uniforms.opacity, sprite.opacity );
						_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

						_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );
						_renderer.setTexture( sprite.texture, 1 );

						_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

					}

				}

			}

		}

		// restore gl

		_gl.enable( _gl.CULL_FACE );
		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthMask( true );

	};

	function createProgram ( shader ) {

		var program = _gl.createProgram();

		var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
		var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

		_gl.shaderSource( fragmentShader, shader.fragmentShader );
		_gl.shaderSource( vertexShader, shader.vertexShader );

		_gl.compileShader( fragmentShader );
		_gl.compileShader( vertexShader );

		_gl.attachShader( program, fragmentShader );
		_gl.attachShader( program, vertexShader );

		_gl.linkProgram( program );

		return program;

	};

};/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShadowMapPlugin = function ( ) {

	var _gl,
	_renderer,
	_depthMaterial, _depthMaterialMorph,

	_frustum = new THREE.Frustum(),
	_projScreenMatrix = new THREE.Matrix4(),

	_min = new THREE.Vector3(),
	_max = new THREE.Vector3();

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		var depthShader = THREE.ShaderLib[ "depthRGBA" ];
		var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

		_depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );
		_depthMaterialMorph = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true } );

		_depthMaterial._shadowPass = true;
		_depthMaterialMorph._shadowPass = true;

	};

	this.render = function ( scene, camera ) {

		if ( ! ( _renderer.shadowMapEnabled && _renderer.shadowMapAutoUpdate ) ) return;

		this.update( scene, camera );

	};

	this.update = function ( scene, camera ) {

		var i, il, j, jl, n,

		shadowMap, shadowMatrix, shadowCamera,
		program, buffer, material,
		webglObject, object, light,
		renderList,

		lights = [],
		k = 0,

		fog = null;

		// set GL state for depth map

		_gl.clearColor( 1, 1, 1, 1 );
		_gl.disable( _gl.BLEND );
		if ( _renderer.shadowMapCullFrontFaces ) _gl.cullFace( _gl.FRONT );

		_renderer.setDepthTest( true );

		// preprocess lights
		// 	- skip lights that are not casting shadows
		//	- create virtual lights for cascaded shadow maps

		for ( i = 0, il = scene.__lights.length; i < il; i ++ ) {

			light = scene.__lights[ i ];

			if ( ! light.castShadow ) continue;

			if ( ( light instanceof THREE.DirectionalLight ) && light.shadowCascade ) {

				for ( n = 0; n < light.shadowCascadeCount; n ++ ) {

					var virtualLight;

					if ( ! light.shadowCascadeArray[ n ] ) {

						virtualLight = createVirtualLight( light, n );
						virtualLight.originalCamera = camera;

						var gyro = new THREE.Gyroscope();
						gyro.position = light.shadowCascadeOffset;

						gyro.add( virtualLight );
						gyro.add( virtualLight.target );

						camera.add( gyro );

						light.shadowCascadeArray[ n ] = virtualLight;

						console.log( "Created virtualLight", virtualLight );

					} else {

						virtualLight = light.shadowCascadeArray[ n ];

					}

					updateVirtualLight( light, n );

					lights[ k ] = virtualLight;
					k ++;

				}

			} else {

				lights[ k ] = light;
				k ++;

			}

		}

		// render depth map

		for ( i = 0, il = lights.length; i < il; i ++ ) {

			light = lights[ i ];

			if ( ! light.shadowMap ) {

				var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };

				light.shadowMap = new THREE.WebGLRenderTarget( light.shadowMapWidth, light.shadowMapHeight, pars );
				light.shadowMapSize = new THREE.Vector2( light.shadowMapWidth, light.shadowMapHeight );

				light.shadowMatrix = new THREE.Matrix4();

			}

			if ( ! light.shadowCamera ) {

				if ( light instanceof THREE.SpotLight ) {

					light.shadowCamera = new THREE.PerspectiveCamera( light.shadowCameraFov, light.shadowMapWidth / light.shadowMapHeight, light.shadowCameraNear, light.shadowCameraFar );

				} else if ( light instanceof THREE.DirectionalLight ) {

					light.shadowCamera = new THREE.OrthographicCamera( light.shadowCameraLeft, light.shadowCameraRight, light.shadowCameraTop, light.shadowCameraBottom, light.shadowCameraNear, light.shadowCameraFar );

				} else {

					console.error( "Unsupported light type for shadow" );
					continue;

				}

				scene.add( light.shadowCamera );

				if ( _renderer.autoUpdateScene ) scene.updateMatrixWorld();

			}

			if ( light.shadowCameraVisible && ! light.cameraHelper ) {

				light.cameraHelper = new THREE.CameraHelper( light.shadowCamera );
				light.shadowCamera.add( light.cameraHelper );

			}

			if ( light.isVirtual && virtualLight.originalCamera == camera ) {

				updateShadowCamera( camera, light );

			}

			shadowMap = light.shadowMap;
			shadowMatrix = light.shadowMatrix;
			shadowCamera = light.shadowCamera;

			shadowCamera.position.copy( light.matrixWorld.getPosition() );
			shadowCamera.lookAt( light.target.matrixWorld.getPosition() );
			shadowCamera.updateMatrixWorld();

			shadowCamera.matrixWorldInverse.getInverse( shadowCamera.matrixWorld );

			if ( light.cameraHelper ) light.cameraHelper.lines.visible = light.shadowCameraVisible;
			if ( light.shadowCameraVisible ) light.cameraHelper.update();

			// compute shadow matrix

			shadowMatrix.set( 0.5, 0.0, 0.0, 0.5,
							  0.0, 0.5, 0.0, 0.5,
							  0.0, 0.0, 0.5, 0.5,
							  0.0, 0.0, 0.0, 1.0 );

			shadowMatrix.multiplySelf( shadowCamera.projectionMatrix );
			shadowMatrix.multiplySelf( shadowCamera.matrixWorldInverse );

			// update camera matrices and frustum

			if ( ! shadowCamera._viewMatrixArray ) shadowCamera._viewMatrixArray = new Float32Array( 16 );
			if ( ! shadowCamera._projectionMatrixArray ) shadowCamera._projectionMatrixArray = new Float32Array( 16 );

			shadowCamera.matrixWorldInverse.flattenToArray( shadowCamera._viewMatrixArray );
			shadowCamera.projectionMatrix.flattenToArray( shadowCamera._projectionMatrixArray );

			_projScreenMatrix.multiply( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
			_frustum.setFromMatrix( _projScreenMatrix );

			// render shadow map

			_renderer.setRenderTarget( shadowMap );
			_renderer.clear();

			// set object matrices & frustum culling

			renderList = scene.__webglObjects;

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];
				object = webglObject.object;

				webglObject.render = false;

				if ( object.visible && object.castShadow ) {

					if ( ! ( object instanceof THREE.Mesh ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {

						//object.matrixWorld.flattenToArray( object._objectMatrixArray );
						object._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld);

						webglObject.render = true;

					}

				}

			}

			// render regular objects

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];

				if ( webglObject.render ) {

					object = webglObject.object;
					buffer = webglObject.buffer;

					_renderer.setObjectFaces( object );

					if ( object.customDepthMaterial ) {

						material = object.customDepthMaterial;

					} else if ( object.geometry.morphTargets.length ) {

						material = _depthMaterialMorph;

					} else {

						material = _depthMaterial;

					}

					if ( buffer instanceof THREE.BufferGeometry ) {

						_renderer.renderBufferDirect( shadowCamera, scene.__lights, fog, material, buffer, object );

					} else {

						_renderer.renderBuffer( shadowCamera, scene.__lights, fog, material, buffer, object );

					}

				}

			}

			// set matrices and render immediate objects

			renderList = scene.__webglObjectsImmediate;

			for ( j = 0, jl = renderList.length; j < jl; j ++ ) {

				webglObject = renderList[ j ];
				object = webglObject.object;

				if ( object.visible && object.castShadow ) {

					if( object.matrixAutoUpdate ) {

						//object.matrixWorld.flattenToArray( object._objectMatrixArray );

					}

					object._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld);

					_renderer.renderImmediateObject( shadowCamera, scene.__lights, fog, _depthMaterial, object );

				}

			}

		}

		// restore GL state

		var clearColor = _renderer.getClearColor(),
		clearAlpha = _renderer.getClearAlpha();

		_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );
		_gl.enable( _gl.BLEND );
		if ( _renderer.shadowMapCullFrontFaces ) _gl.cullFace( _gl.BACK );

	};

	function createVirtualLight( light, cascade ) {

		var virtualLight = new THREE.DirectionalLight();

		virtualLight.isVirtual = true;

		virtualLight.onlyShadow = true;
		virtualLight.castShadow = true;

		virtualLight.shadowCameraNear = light.shadowCameraNear;
		virtualLight.shadowCameraFar = light.shadowCameraFar;

		virtualLight.shadowCameraLeft = light.shadowCameraLeft;
		virtualLight.shadowCameraRight = light.shadowCameraRight;
		virtualLight.shadowCameraBottom = light.shadowCameraBottom;
		virtualLight.shadowCameraTop = light.shadowCameraTop;

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;

		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];
		virtualLight.shadowMapWidth = light.shadowCascadeWidth[ cascade ];
		virtualLight.shadowMapHeight = light.shadowCascadeHeight[ cascade ];

		virtualLight.pointsWorld = [];
		virtualLight.pointsFrustum = [];

		var pointsWorld = virtualLight.pointsWorld,
			pointsFrustum = virtualLight.pointsFrustum;

		for ( var i = 0; i < 8; i ++ ) {

			pointsWorld[ i ] = new THREE.Vector3();
			pointsFrustum[ i ] = new THREE.Vector3();

		}

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		pointsFrustum[ 0 ].set( -1, -1, nearZ );
		pointsFrustum[ 1 ].set(  1, -1, nearZ );
		pointsFrustum[ 2 ].set( -1,  1, nearZ );
		pointsFrustum[ 3 ].set(  1,  1, nearZ );

		pointsFrustum[ 4 ].set( -1, -1, farZ );
		pointsFrustum[ 5 ].set(  1, -1, farZ );
		pointsFrustum[ 6 ].set( -1,  1, farZ );
		pointsFrustum[ 7 ].set(  1,  1, farZ );

		return virtualLight;

	}

	// Synchronize virtual light with the original light

	function updateVirtualLight( light, cascade ) {

		var virtualLight = light.shadowCascadeArray[ cascade ];

		virtualLight.position.copy( light.position );
		virtualLight.target.position.copy( light.target.position );
		virtualLight.lookAt( virtualLight.target );

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;
		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		var pointsFrustum = virtualLight.pointsFrustum;

		pointsFrustum[ 0 ].z = nearZ;
		pointsFrustum[ 1 ].z = nearZ;
		pointsFrustum[ 2 ].z = nearZ;
		pointsFrustum[ 3 ].z = nearZ;

		pointsFrustum[ 4 ].z = farZ;
		pointsFrustum[ 5 ].z = farZ;
		pointsFrustum[ 6 ].z = farZ;
		pointsFrustum[ 7 ].z = farZ;

	}

	// Fit shadow camera's ortho frustum to camera frustum

	function updateShadowCamera( camera, light ) {

		var shadowCamera = light.shadowCamera,
			pointsFrustum = light.pointsFrustum,
			pointsWorld = light.pointsWorld;

		_min.set( Infinity, Infinity, Infinity );
		_max.set( -Infinity, -Infinity, -Infinity );

		for ( var i = 0; i < 8; i ++ ) {

			var p = pointsWorld[ i ];

			p.copy( pointsFrustum[ i ] );
			THREE.ShadowMapPlugin.__projector.unprojectVector( p, camera );

			shadowCamera.matrixWorldInverse.multiplyVector3( p );

			if ( p.x < _min.x ) _min.x = p.x;
			if ( p.x > _max.x ) _max.x = p.x;

			if ( p.y < _min.y ) _min.y = p.y;
			if ( p.y > _max.y ) _max.y = p.y;

			if ( p.z < _min.z ) _min.z = p.z;
			if ( p.z > _max.z ) _max.z = p.z;

		}

		shadowCamera.left = _min.x;
		shadowCamera.right = _max.x;
		shadowCamera.top = _max.y;
		shadowCamera.bottom = _min.y;

		// can't really fit near/far
		//shadowCamera.near = _min.z;
		//shadowCamera.far = _max.z;

		shadowCamera.updateProjectionMatrix();

	}

};

THREE.ShadowMapPlugin.__projector = new THREE.Projector();
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpritePlugin = function ( ) {

	var _gl, _renderer, _sprite = {};

	this.init = function ( renderer ) {

		_gl = renderer.context;
		_renderer = renderer;

		_sprite.vertices = new Float32Array( 8 + 8 );
		_sprite.faces    = new Uint16Array( 6 );

		var i = 0;

		_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = -1;	// vertex 0
		_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 1;	// uv 0

		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = -1;	// vertex 1
		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;	// uv 1

		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;	// vertex 2
		_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 0;	// uv 2

		_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = 1;	// vertex 3
		_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 0;	// uv 3

		i = 0;

		_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 1; _sprite.faces[ i++ ] = 2;
		_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 2; _sprite.faces[ i++ ] = 3;

		_sprite.vertexBuffer  = _gl.createBuffer();
		_sprite.elementBuffer = _gl.createBuffer();

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, _sprite.vertices, _gl.STATIC_DRAW );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _sprite.faces, _gl.STATIC_DRAW );

		_sprite.program = createProgram( THREE.ShaderSprite[ "sprite" ] );

		_sprite.attributes = {};
		_sprite.uniforms = {};

		_sprite.attributes.position           = _gl.getAttribLocation ( _sprite.program, "position" );
		_sprite.attributes.uv                 = _gl.getAttribLocation ( _sprite.program, "uv" );

		_sprite.uniforms.uvOffset             = _gl.getUniformLocation( _sprite.program, "uvOffset" );
		_sprite.uniforms.uvScale              = _gl.getUniformLocation( _sprite.program, "uvScale" );

		_sprite.uniforms.rotation             = _gl.getUniformLocation( _sprite.program, "rotation" );
		_sprite.uniforms.scale                = _gl.getUniformLocation( _sprite.program, "scale" );
		_sprite.uniforms.alignment            = _gl.getUniformLocation( _sprite.program, "alignment" );

		_sprite.uniforms.color                = _gl.getUniformLocation( _sprite.program, "color" );
		_sprite.uniforms.map                  = _gl.getUniformLocation( _sprite.program, "map" );
		_sprite.uniforms.opacity              = _gl.getUniformLocation( _sprite.program, "opacity" );

		_sprite.uniforms.useScreenCoordinates = _gl.getUniformLocation( _sprite.program, "useScreenCoordinates" );
		_sprite.uniforms.affectedByDistance   = _gl.getUniformLocation( _sprite.program, "affectedByDistance" );
		_sprite.uniforms.screenPosition    	  = _gl.getUniformLocation( _sprite.program, "screenPosition" );
		_sprite.uniforms.modelViewMatrix      = _gl.getUniformLocation( _sprite.program, "modelViewMatrix" );
		_sprite.uniforms.projectionMatrix     = _gl.getUniformLocation( _sprite.program, "projectionMatrix" );

		_sprite.attributesEnabled = false;

	};

	this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

		var sprites = scene.__webglSprites,
			nSprites = sprites.length;

		if ( ! nSprites ) return;

		var attributes = _sprite.attributes,
			uniforms = _sprite.uniforms;

		var invAspect = viewportHeight / viewportWidth;

		var halfViewportWidth = viewportWidth * 0.5,
			halfViewportHeight = viewportHeight * 0.5;

		var mergeWith3D = true;

		// setup gl

		_gl.useProgram( _sprite.program );

		if ( ! _sprite.attributesEnabled ) {

			_gl.enableVertexAttribArray( attributes.position );
			_gl.enableVertexAttribArray( attributes.uv );

			_sprite.attributesEnabled = true;

		}

		_gl.disable( _gl.CULL_FACE );
		_gl.enable( _gl.BLEND );
		_gl.depthMask( true );

		_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );
		_gl.vertexAttribPointer( attributes.position, 2, _gl.FLOAT, false, 2 * 8, 0 );
		_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );

		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );

		_gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera._projectionMatrixArray );

		_gl.activeTexture( _gl.TEXTURE0 );
		_gl.uniform1i( uniforms.map, 0 );

		// update positions and sort

		var i, sprite, screenPosition, size, scale = [];

		for( i = 0; i < nSprites; i ++ ) {

			sprite = sprites[ i ];

			if ( ! sprite.visible || sprite.opacity === 0 ) continue;

			if( ! sprite.useScreenCoordinates ) {

				sprite._modelViewMatrix.multiply( camera.matrixWorldInverse, sprite.matrixWorld);
				sprite.z = - sprite._modelViewMatrix.elements[14];

			} else {

				sprite.z = - sprite.position.z;

			}

		}

		sprites.sort( painterSort );

		// render all sprites

		for( i = 0; i < nSprites; i ++ ) {

			sprite = sprites[ i ];

			if ( ! sprite.visible || sprite.opacity === 0 ) continue;

			if ( sprite.map && sprite.map.image && sprite.map.image.width ) {

				if ( sprite.useScreenCoordinates ) {

					_gl.uniform1i( uniforms.useScreenCoordinates, 1 );
					_gl.uniform3f( uniforms.screenPosition, ( sprite.position.x - halfViewportWidth  ) / halfViewportWidth,
															( halfViewportHeight - sprite.position.y ) / halfViewportHeight,
															  Math.max( 0, Math.min( 1, sprite.position.z ) ) );

				} else {

					_gl.uniform1i( uniforms.useScreenCoordinates, 0 );
					_gl.uniform1i( uniforms.affectedByDistance, sprite.affectedByDistance ? 1 : 0 );
					_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements);

				}

				size = sprite.map.image.width / ( sprite.scaleByViewport ? viewportHeight : 1 );

				scale[ 0 ] = size * invAspect * sprite.scale.x;
				scale[ 1 ] = size * sprite.scale.y;

				_gl.uniform2f( uniforms.uvScale, sprite.uvScale.x, sprite.uvScale.y );
				_gl.uniform2f( uniforms.uvOffset, sprite.uvOffset.x, sprite.uvOffset.y );
				_gl.uniform2f( uniforms.alignment, sprite.alignment.x, sprite.alignment.y );

				_gl.uniform1f( uniforms.opacity, sprite.opacity );
				_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

				_gl.uniform1f( uniforms.rotation, sprite.rotation );
				_gl.uniform2fv( uniforms.scale, scale );

				if ( sprite.mergeWith3D && !mergeWith3D ) {

					_gl.enable( _gl.DEPTH_TEST );
					mergeWith3D = true;

				} else if ( ! sprite.mergeWith3D && mergeWith3D ) {

					_gl.disable( _gl.DEPTH_TEST );
					mergeWith3D = false;

				}

				_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );
				_renderer.setTexture( sprite.map, 0 );

				_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );

			}

		}

		// restore gl

		_gl.enable( _gl.CULL_FACE );
		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthMask( true );

	};

	function createProgram ( shader ) {

		var program = _gl.createProgram();

		var fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );
		var vertexShader = _gl.createShader( _gl.VERTEX_SHADER );

		_gl.shaderSource( fragmentShader, shader.fragmentShader );
		_gl.shaderSource( vertexShader, shader.vertexShader );

		_gl.compileShader( fragmentShader );
		_gl.compileShader( vertexShader );

		_gl.attachShader( program, fragmentShader );
		_gl.attachShader( program, vertexShader );

		_gl.linkProgram( program );

		return program;

	};

	function painterSort ( a, b ) {

		return b.z - a.z;

	};

};/**
 * @author mikael emtinger / http://gomo.se/
 *
 */

THREE.ShaderFlares = {

	'lensFlareVertexTexture': {

		vertexShader: [

			"uniform vec3 screenPosition;",
			"uniform vec2 scale;",
			"uniform float rotation;",
			"uniform int renderType;",

			"uniform sampler2D occlusionMap;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",
			"varying float vVisibility;",

			"void main() {",

				"vUV = uv;",

				"vec2 pos = position;",

				"if( renderType == 2 ) {",

					"vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +",
									  "texture2D( occlusionMap, vec2( 0.5, 0.5 ) );",

					"vVisibility = (       visibility.r / 9.0 ) *",
								  "( 1.0 - visibility.g / 9.0 ) *",
								  "(       visibility.b / 9.0 ) *",
								  "( 1.0 - visibility.a / 9.0 );",

					"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
					"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

				"}",

				"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform sampler2D map;",
			"uniform float opacity;",
			"uniform int renderType;",
			"uniform vec3 color;",

			"varying vec2 vUV;",
			"varying float vVisibility;",

			"void main() {",

				// pink square

				"if( renderType == 0 ) {",

					"gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );",

				// restore

				"} else if( renderType == 1 ) {",

					"gl_FragColor = texture2D( map, vUV );",

				// flare

				"} else {",

					"vec4 texture = texture2D( map, vUV );",
					"texture.a *= opacity * vVisibility;",
					"gl_FragColor = texture;",
					"gl_FragColor.rgb *= color;",

				"}",

			"}"
		].join( "\n" )

	},


	'lensFlare': {

		vertexShader: [

			"uniform vec3 screenPosition;",
			"uniform vec2 scale;",
			"uniform float rotation;",
			"uniform int renderType;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",

			"void main() {",

				"vUV = uv;",

				"vec2 pos = position;",

				"if( renderType == 2 ) {",

					"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
					"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

				"}",

				"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform sampler2D map;",
			"uniform sampler2D occlusionMap;",
			"uniform float opacity;",
			"uniform int renderType;",
			"uniform vec3 color;",

			"varying vec2 vUV;",

			"void main() {",

				// pink square

				"if( renderType == 0 ) {",

					"gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );",

				// restore

				"} else if( renderType == 1 ) {",

					"gl_FragColor = texture2D( map, vUV );",

				// flare

				"} else {",

					"float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +",
									   "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;",

					"visibility = ( 1.0 - visibility / 4.0 );",

					"vec4 texture = texture2D( map, vUV );",
					"texture.a *= opacity * visibility;",
					"gl_FragColor = texture;",
					"gl_FragColor.rgb *= color;",

				"}",

			"}"

		].join( "\n" )

	}

};
/**
 * @author mikael emtinger / http://gomo.se/
 *
 */

THREE.ShaderSprite = {

	'sprite': {

		vertexShader: [

			"uniform int useScreenCoordinates;",
			"uniform int affectedByDistance;",
			"uniform vec3 screenPosition;",
			"uniform mat4 modelViewMatrix;",
			"uniform mat4 projectionMatrix;",
			"uniform float rotation;",
			"uniform vec2 scale;",
			"uniform vec2 alignment;",
			"uniform vec2 uvOffset;",
			"uniform vec2 uvScale;",

			"attribute vec2 position;",
			"attribute vec2 uv;",

			"varying vec2 vUV;",

			"void main() {",

				"vUV = uvOffset + uv * uvScale;",

				"vec2 alignedPosition = position + alignment;",

				"vec2 rotatedPosition;",
				"rotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;",
				"rotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;",

				"vec4 finalPosition;",

				"if( useScreenCoordinates != 0 ) {",

					"finalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );",

				"} else {",

					"finalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );",
					"finalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );",

				"}",

				"gl_Position = finalPosition;",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"precision mediump float;",

			"uniform vec3 color;",
			"uniform sampler2D map;",
			"uniform float opacity;",

			"varying vec2 vUV;",

			"void main() {",

				"vec4 texture = texture2D( map, vUV );",
				"gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );",

			"}"

		].join( "\n" )

	}

};
=======
// ThreeWebGL.js - http://github.com/mrdoob/three.js
'use strict';var THREE=THREE||{REVISION:"49dev"};self.Int32Array||(self.Int32Array=Array,self.Float32Array=Array);
(function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c){window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(b){var c=Date.now(),g=Math.max(0,16-(c-a)),h=window.setTimeout(function(){b(c+g)},g);a=c+g;return h};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=
function(a){clearTimeout(a)}})();THREE.Color=function(a){a!==void 0&&this.setHex(a);return this};
THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a){this.r=a.r*a.r;this.g=a.g*a.g;this.b=a.b*a.b;return this},copyLinearToGamma:function(a){this.r=Math.sqrt(a.r);this.g=Math.sqrt(a.g);this.b=Math.sqrt(a.b);return this},convertGammaToLinear:function(){var a=this.r,b=this.g,c=this.b;this.r=a*a;this.g=b*b;this.b=c*c;return this},convertLinearToGamma:function(){this.r=Math.sqrt(this.r);this.g=Math.sqrt(this.g);
this.b=Math.sqrt(this.b);return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSV:function(a,b,c){var d,f,g;if(c===0)this.r=this.g=this.b=0;else{d=Math.floor(a*6);f=a*6-d;a=c*(1-b);g=c*(1-b*f);b=c*(1-b*(1-f));switch(d){case 1:this.r=g;this.g=c;this.b=a;break;case 2:this.r=a;this.g=c;this.b=b;break;case 3:this.r=a;this.g=g;this.b=c;break;case 4:this.r=b;this.g=a;this.b=c;break;case 5:this.r=c;this.g=a;this.b=g;break;case 6:case 0:this.r=c;this.g=b;this.b=a}}return this},setHex:function(a){a=
Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},lerpSelf:function(a,b){this.r=this.r+(a.r-this.r)*b;this.g=this.g+(a.g-this.g)*b;this.b=this.b+(a.b-this.b)*b;return this},getHex:function(){return Math.floor(this.r*255)<<16^Math.floor(this.g*255)<<8^Math.floor(this.b*255)},getContextStyle:function(){return"rgb("+Math.floor(this.r*255)+","+Math.floor(this.g*255)+","+Math.floor(this.b*255)+")"},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}};
THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};
THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;this.y=b;return this},copy:function(a){this.x=a.x;this.y=a.y;return this},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addSelf:function(a){this.x=this.x+a.x;this.y=this.y+a.y;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},subSelf:function(a){this.x=this.x-a.x;this.y=this.y-a.y;return this},multiplyScalar:function(a){this.x=this.x*a;this.y=this.y*a;return this},divideScalar:function(a){if(a){this.x=
this.x/a;this.y=this.y/a}else this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,a=this.y-a.y;return b*b+a*a},setLength:function(a){return this.normalize().multiplyScalar(a)},
lerpSelf:function(a,b){this.x=this.x+(a.x-this.x)*b;this.y=this.y+(a.y-this.y)*b;return this},equals:function(a){return a.x===this.x&&a.y===this.y},isZero:function(){return this.lengthSq()<1.0E-4},clone:function(){return new THREE.Vector2(this.x,this.y)}};THREE.Vector3=function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0};
THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},addSelf:function(a){this.x=this.x+a.x;this.y=this.y+a.y;this.z=this.z+a.z;return this},addScalar:function(a){this.x=this.x+a;this.y=this.y+
a;this.z=this.z+a;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},subSelf:function(a){this.x=this.x-a.x;this.y=this.y-a.y;this.z=this.z-a.z;return this},multiply:function(a,b){this.x=a.x*b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},multiplySelf:function(a){this.x=this.x*a.x;this.y=this.y*a.y;this.z=this.z*a.z;return this},multiplyScalar:function(a){this.x=this.x*a;this.y=this.y*a;this.z=this.z*a;return this},divideSelf:function(a){this.x=this.x/a.x;this.y=
this.y/a.y;this.z=this.z/a.z;return this},divideScalar:function(a){if(a){this.x=this.x/a;this.y=this.y/a;this.z=this.z/a}else this.z=this.y=this.x=0;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length())},
setLength:function(a){return this.normalize().multiplyScalar(a)},lerpSelf:function(a,b){this.x=this.x+(a.x-this.x)*b;this.y=this.y+(a.y-this.y)*b;this.z=this.z+(a.z-this.z)*b;return this},cross:function(a,b){this.x=a.y*b.z-a.z*b.y;this.y=a.z*b.x-a.x*b.z;this.z=a.x*b.y-a.y*b.x;return this},crossSelf:function(a){var b=this.x,c=this.y,d=this.z;this.x=c*a.z-d*a.y;this.y=d*a.x-b*a.z;this.z=b*a.y-c*a.x;return this},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){return(new THREE.Vector3).sub(this,
a).lengthSq()},getPositionFromMatrix:function(a){this.x=a.n14;this.y=a.n24;this.z=a.n34;return this},getRotationFromMatrix:function(a,b){var c=b?b.x:1,d=b?b.y:1,f=b?b.z:1,g=a.n11/c,h=a.n12/d,c=a.n21/c,d=a.n22/d,i=a.n23/f,k=a.n33/f;this.y=Math.asin(a.n13/f);f=Math.cos(this.y);if(Math.abs(f)>1.0E-5){this.x=Math.atan2(-i/f,k/f);this.z=Math.atan2(-h/f,g/f)}else{this.x=0;this.z=Math.atan2(c,d)}return this},getScaleFromMatrix:function(a){var b=this.set(a.n11,a.n21,a.n31).length(),c=this.set(a.n12,a.n22,
a.n32).length(),a=this.set(a.n13,a.n23,a.n33).length();this.x=b;this.y=c;this.z=a},equals:function(a){return a.x===this.x&&a.y===this.y&&a.z===this.z},isZero:function(){return this.lengthSq()<1.0E-4},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)}};THREE.Vector4=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=d!==void 0?d:1};
THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w!==void 0?a.w:1;return this},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},addSelf:function(a){this.x=this.x+a.x;this.y=this.y+a.y;this.z=this.z+a.z;this.w=this.w+a.w;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;this.w=a.w-b.w;return this},subSelf:function(a){this.x=
this.x-a.x;this.y=this.y-a.y;this.z=this.z-a.z;this.w=this.w-a.w;return this},multiplyScalar:function(a){this.x=this.x*a;this.y=this.y*a;this.z=this.z*a;this.w=this.w*a;return this},divideScalar:function(a){if(a){this.x=this.x/a;this.y=this.y/a;this.z=this.z/a;this.w=this.w/a}else{this.z=this.y=this.x=0;this.w=1}return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},
normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.normalize().multiplyScalar(a)},lerpSelf:function(a,b){this.x=this.x+(a.x-this.x)*b;this.y=this.y+(a.y-this.y)*b;this.z=this.z+(a.z-this.z)*b;this.w=this.w+(a.w-this.w)*b;return this},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)}};THREE.Frustum=function(){this.planes=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4]};
THREE.Frustum.prototype.setFromMatrix=function(a){var b,c=this.planes;c[0].set(a.n41-a.n11,a.n42-a.n12,a.n43-a.n13,a.n44-a.n14);c[1].set(a.n41+a.n11,a.n42+a.n12,a.n43+a.n13,a.n44+a.n14);c[2].set(a.n41+a.n21,a.n42+a.n22,a.n43+a.n23,a.n44+a.n24);c[3].set(a.n41-a.n21,a.n42-a.n22,a.n43-a.n23,a.n44-a.n24);c[4].set(a.n41-a.n31,a.n42-a.n32,a.n43-a.n33,a.n44-a.n34);c[5].set(a.n41+a.n31,a.n42+a.n32,a.n43+a.n33,a.n44+a.n34);for(a=0;a<6;a++){b=c[a];b.divideScalar(Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z))}};
THREE.Frustum.prototype.contains=function(a){for(var b=this.planes,c=a.matrixWorld,d=THREE.Frustum.__v1.set(c.getColumnX().length(),c.getColumnY().length(),c.getColumnZ().length()),d=-a.geometry.boundingSphere.radius*Math.max(d.x,Math.max(d.y,d.z)),f=0;f<6;f++){a=b[f].x*c.n14+b[f].y*c.n24+b[f].z*c.n34+b[f].w;if(a<=d)return false}return true};THREE.Frustum.__v1=new THREE.Vector3;
THREE.Ray=function(a,b){function c(a,b,c){r.sub(c,a);z=r.dot(b);w=n.add(a,t.copy(b).multiplyScalar(z));return P=c.distanceTo(w)}function d(a,b,c,d){r.sub(d,b);n.sub(c,b);t.sub(a,b);A=r.dot(r);q=r.dot(n);G=r.dot(t);H=n.dot(n);M=n.dot(t);I=1/(A*H-q*q);K=(H*G-q*M)*I;N=(A*M-q*G)*I;return K>=0&&N>=0&&K+N<1}this.origin=a||new THREE.Vector3;this.direction=b||new THREE.Vector3;var f=1.0E-4;this.setPrecision=function(a){f=a};var g=new THREE.Vector3,h=new THREE.Vector3,i=new THREE.Vector3,k=new THREE.Vector3,
j=new THREE.Vector3,m=new THREE.Vector3,o=new THREE.Vector3,l=new THREE.Vector3,u=new THREE.Vector3;this.intersectObject=function(a){var b,r=[];if(a instanceof THREE.Particle){var n=c(this.origin,this.direction,a.matrixWorld.getPosition());if(n>a.scale.x)return[];b={distance:n,point:a.position,face:null,object:a};r.push(b)}else if(a instanceof THREE.Mesh){var n=c(this.origin,this.direction,a.matrixWorld.getPosition()),t=THREE.Frustum.__v1.set(a.matrixWorld.getColumnX().length(),a.matrixWorld.getColumnY().length(),
a.matrixWorld.getColumnZ().length());if(n>a.geometry.boundingSphere.radius*Math.max(t.x,Math.max(t.y,t.z)))return r;var q,e,w=a.geometry,z=w.vertices,A;a.matrixRotationWorld.extractRotation(a.matrixWorld);n=0;for(t=w.faces.length;n<t;n++){b=w.faces[n];j.copy(this.origin);m.copy(this.direction);A=a.matrixWorld;o=A.multiplyVector3(o.copy(b.centroid)).subSelf(j);l=a.matrixRotationWorld.multiplyVector3(l.copy(b.normal));q=m.dot(l);if(!(Math.abs(q)<f)){e=l.dot(o)/q;if(!(e<0)&&(a.doubleSided||(a.flipSided?
q>0:q<0))){u.add(j,m.multiplyScalar(e));if(b instanceof THREE.Face3){g=A.multiplyVector3(g.copy(z[b.a]));h=A.multiplyVector3(h.copy(z[b.b]));i=A.multiplyVector3(i.copy(z[b.c]));if(d(u,g,h,i)){b={distance:j.distanceTo(u),point:u.clone(),face:b,object:a};r.push(b)}}else if(b instanceof THREE.Face4){g=A.multiplyVector3(g.copy(z[b.a]));h=A.multiplyVector3(h.copy(z[b.b]));i=A.multiplyVector3(i.copy(z[b.c]));k=A.multiplyVector3(k.copy(z[b.d]));if(d(u,g,h,k)||d(u,h,i,k)){b={distance:j.distanceTo(u),point:u.clone(),
face:b,object:a};r.push(b)}}}}}}return r};this.intersectObjects=function(a){for(var b=[],c=0,d=a.length;c<d;c++)Array.prototype.push.apply(b,this.intersectObject(a[c]));b.sort(function(a,b){return a.distance-b.distance});return b};var r=new THREE.Vector3,n=new THREE.Vector3,t=new THREE.Vector3,z,w,P,A,q,G,H,M,I,K,N};
THREE.Rectangle=function(){function a(){g=d-b;h=f-c}var b,c,d,f,g,h,i=true;this.getX=function(){return b};this.getY=function(){return c};this.getWidth=function(){return g};this.getHeight=function(){return h};this.getLeft=function(){return b};this.getTop=function(){return c};this.getRight=function(){return d};this.getBottom=function(){return f};this.set=function(g,j,h,o){i=false;b=g;c=j;d=h;f=o;a()};this.addPoint=function(g,j){if(i){i=false;b=g;c=j;d=g;f=j}else{b=b<g?b:g;c=c<j?c:j;d=d>g?d:g;f=f>j?
f:j}a()};this.add3Points=function(g,j,h,o,l,u){if(i){i=false;b=g<h?g<l?g:l:h<l?h:l;c=j<o?j<u?j:u:o<u?o:u;d=g>h?g>l?g:l:h>l?h:l;f=j>o?j>u?j:u:o>u?o:u}else{b=g<h?g<l?g<b?g:b:l<b?l:b:h<l?h<b?h:b:l<b?l:b;c=j<o?j<u?j<c?j:c:u<c?u:c:o<u?o<c?o:c:u<c?u:c;d=g>h?g>l?g>d?g:d:l>d?l:d:h>l?h>d?h:d:l>d?l:d;f=j>o?j>u?j>f?j:f:u>f?u:f:o>u?o>f?o:f:u>f?u:f}a()};this.addRectangle=function(g){if(i){i=false;b=g.getLeft();c=g.getTop();d=g.getRight();f=g.getBottom()}else{b=b<g.getLeft()?b:g.getLeft();c=c<g.getTop()?c:g.getTop();
d=d>g.getRight()?d:g.getRight();f=f>g.getBottom()?f:g.getBottom()}a()};this.inflate=function(g){b=b-g;c=c-g;d=d+g;f=f+g;a()};this.minSelf=function(g){b=b>g.getLeft()?b:g.getLeft();c=c>g.getTop()?c:g.getTop();d=d<g.getRight()?d:g.getRight();f=f<g.getBottom()?f:g.getBottom();a()};this.intersects=function(a){return d<a.getLeft()||b>a.getRight()||f<a.getTop()||c>a.getBottom()?false:true};this.empty=function(){i=true;f=d=c=b=0;a()};this.isEmpty=function(){return i}};
THREE.Math={clamp:function(a,b,c){return a<b?b:a>c?c:a},clampBottom:function(a,b){return a<b?b:a},mapLinear:function(a,b,c,d,f){return d+(a-b)*(f-d)/(c-b)},random16:function(){return(65280*Math.random()+255*Math.random())/65535},randInt:function(a,b){return a+Math.floor(Math.random()*(b-a+1))},randFloat:function(a,b){return a+Math.random()*(b-a)},randFloatSpread:function(a){return a*(0.5-Math.random())},sign:function(a){return a<0?-1:a>0?1:0}};THREE.Matrix3=function(){this.m=[]};
THREE.Matrix3.prototype={constructor:THREE.Matrix3,getInverse:function(a){var b=a.n33*a.n22-a.n32*a.n23,c=-a.n33*a.n21+a.n31*a.n23,d=a.n32*a.n21-a.n31*a.n22,f=-a.n33*a.n12+a.n32*a.n13,g=a.n33*a.n11-a.n31*a.n13,h=-a.n32*a.n11+a.n31*a.n12,i=a.n23*a.n12-a.n22*a.n13,k=-a.n23*a.n11+a.n21*a.n13,j=a.n22*a.n11-a.n21*a.n12,a=a.n11*b+a.n21*f+a.n31*i;a===0&&console.warn("Matrix3.getInverse(): determinant == 0");var a=1/a,m=this.m;m[0]=a*b;m[1]=a*c;m[2]=a*d;m[3]=a*f;m[4]=a*g;m[5]=a*h;m[6]=a*i;m[7]=a*k;m[8]=a*
j;return this},transposeIntoArray:function(a){var b=this.m;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this}};THREE.Matrix4=function(a,b,c,d,f,g,h,i,k,j,m,o,l,u,r,n){this.set(a!==void 0?a:1,b||0,c||0,d||0,f||0,g!==void 0?g:1,h||0,i||0,k||0,j||0,m!==void 0?m:1,o||0,l||0,u||0,r||0,n!==void 0?n:1)};
THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,f,g,h,i,k,j,m,o,l,u,r,n){this.n11=a;this.n12=b;this.n13=c;this.n14=d;this.n21=f;this.n22=g;this.n23=h;this.n24=i;this.n31=k;this.n32=j;this.n33=m;this.n34=o;this.n41=l;this.n42=u;this.n43=r;this.n44=n;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(a){this.set(a.n11,a.n12,a.n13,a.n14,a.n21,a.n22,a.n23,a.n24,a.n31,a.n32,a.n33,a.n34,a.n41,a.n42,a.n43,a.n44);return this},lookAt:function(a,
b,c){var d=THREE.Matrix4.__v1,f=THREE.Matrix4.__v2,g=THREE.Matrix4.__v3;g.sub(a,b).normalize();if(g.length()===0)g.z=1;d.cross(c,g).normalize();if(d.length()===0){g.x=g.x+1.0E-4;d.cross(c,g).normalize()}f.cross(g,d);this.n11=d.x;this.n12=f.x;this.n13=g.x;this.n21=d.y;this.n22=f.y;this.n23=g.y;this.n31=d.z;this.n32=f.z;this.n33=g.z;return this},multiply:function(a,b){var c=a.n11,d=a.n12,f=a.n13,g=a.n14,h=a.n21,i=a.n22,k=a.n23,j=a.n24,m=a.n31,o=a.n32,l=a.n33,u=a.n34,r=a.n41,n=a.n42,t=a.n43,z=a.n44,
w=b.n11,P=b.n12,A=b.n13,q=b.n14,G=b.n21,H=b.n22,M=b.n23,I=b.n24,K=b.n31,N=b.n32,ja=b.n33,oa=b.n34,ka=b.n41,Y=b.n42,S=b.n43,C=b.n44;this.n11=c*w+d*G+f*K+g*ka;this.n12=c*P+d*H+f*N+g*Y;this.n13=c*A+d*M+f*ja+g*S;this.n14=c*q+d*I+f*oa+g*C;this.n21=h*w+i*G+k*K+j*ka;this.n22=h*P+i*H+k*N+j*Y;this.n23=h*A+i*M+k*ja+j*S;this.n24=h*q+i*I+k*oa+j*C;this.n31=m*w+o*G+l*K+u*ka;this.n32=m*P+o*H+l*N+u*Y;this.n33=m*A+o*M+l*ja+u*S;this.n34=m*q+o*I+l*oa+u*C;this.n41=r*w+n*G+t*K+z*ka;this.n42=r*P+n*H+t*N+z*Y;this.n43=r*
A+n*M+t*ja+z*S;this.n44=r*q+n*I+t*oa+z*C;return this},multiplySelf:function(a){return this.multiply(this,a)},multiplyToArray:function(a,b,c){this.multiply(a,b);c[0]=this.n11;c[1]=this.n21;c[2]=this.n31;c[3]=this.n41;c[4]=this.n12;c[5]=this.n22;c[6]=this.n32;c[7]=this.n42;c[8]=this.n13;c[9]=this.n23;c[10]=this.n33;c[11]=this.n43;c[12]=this.n14;c[13]=this.n24;c[14]=this.n34;c[15]=this.n44;return this},multiplyScalar:function(a){this.n11=this.n11*a;this.n12=this.n12*a;this.n13=this.n13*a;this.n14=this.n14*
a;this.n21=this.n21*a;this.n22=this.n22*a;this.n23=this.n23*a;this.n24=this.n24*a;this.n31=this.n31*a;this.n32=this.n32*a;this.n33=this.n33*a;this.n34=this.n34*a;this.n41=this.n41*a;this.n42=this.n42*a;this.n43=this.n43*a;this.n44=this.n44*a;return this},multiplyVector3:function(a){var b=a.x,c=a.y,d=a.z,f=1/(this.n41*b+this.n42*c+this.n43*d+this.n44);a.x=(this.n11*b+this.n12*c+this.n13*d+this.n14)*f;a.y=(this.n21*b+this.n22*c+this.n23*d+this.n24)*f;a.z=(this.n31*b+this.n32*c+this.n33*d+this.n34)*
f;return a},multiplyVector4:function(a){var b=a.x,c=a.y,d=a.z,f=a.w;a.x=this.n11*b+this.n12*c+this.n13*d+this.n14*f;a.y=this.n21*b+this.n22*c+this.n23*d+this.n24*f;a.z=this.n31*b+this.n32*c+this.n33*d+this.n34*f;a.w=this.n41*b+this.n42*c+this.n43*d+this.n44*f;return a},rotateAxis:function(a){var b=a.x,c=a.y,d=a.z;a.x=b*this.n11+c*this.n12+d*this.n13;a.y=b*this.n21+c*this.n22+d*this.n23;a.z=b*this.n31+c*this.n32+d*this.n33;a.normalize();return a},crossVector:function(a){var b=new THREE.Vector4;b.x=
this.n11*a.x+this.n12*a.y+this.n13*a.z+this.n14*a.w;b.y=this.n21*a.x+this.n22*a.y+this.n23*a.z+this.n24*a.w;b.z=this.n31*a.x+this.n32*a.y+this.n33*a.z+this.n34*a.w;b.w=a.w?this.n41*a.x+this.n42*a.y+this.n43*a.z+this.n44*a.w:1;return b},determinant:function(){var a=this.n11,b=this.n12,c=this.n13,d=this.n14,f=this.n21,g=this.n22,h=this.n23,i=this.n24,k=this.n31,j=this.n32,m=this.n33,o=this.n34,l=this.n41,u=this.n42,r=this.n43,n=this.n44;return d*h*j*l-c*i*j*l-d*g*m*l+b*i*m*l+c*g*o*l-b*h*o*l-d*h*k*u+
c*i*k*u+d*f*m*u-a*i*m*u-c*f*o*u+a*h*o*u+d*g*k*r-b*i*k*r-d*f*j*r+a*i*j*r+b*f*o*r-a*g*o*r-c*g*k*n+b*h*k*n+c*f*j*n-a*h*j*n-b*f*m*n+a*g*m*n},transpose:function(){var a;a=this.n21;this.n21=this.n12;this.n12=a;a=this.n31;this.n31=this.n13;this.n13=a;a=this.n32;this.n32=this.n23;this.n23=a;a=this.n41;this.n41=this.n14;this.n14=a;a=this.n42;this.n42=this.n24;this.n24=a;a=this.n43;this.n43=this.n34;this.n34=a;return this},flattenToArray:function(a){a[0]=this.n11;a[1]=this.n21;a[2]=this.n31;a[3]=this.n41;a[4]=
this.n12;a[5]=this.n22;a[6]=this.n32;a[7]=this.n42;a[8]=this.n13;a[9]=this.n23;a[10]=this.n33;a[11]=this.n43;a[12]=this.n14;a[13]=this.n24;a[14]=this.n34;a[15]=this.n44;return a},flattenToArrayOffset:function(a,b){a[b]=this.n11;a[b+1]=this.n21;a[b+2]=this.n31;a[b+3]=this.n41;a[b+4]=this.n12;a[b+5]=this.n22;a[b+6]=this.n32;a[b+7]=this.n42;a[b+8]=this.n13;a[b+9]=this.n23;a[b+10]=this.n33;a[b+11]=this.n43;a[b+12]=this.n14;a[b+13]=this.n24;a[b+14]=this.n34;a[b+15]=this.n44;return a},getPosition:function(){return THREE.Matrix4.__v1.set(this.n14,
this.n24,this.n34)},setPosition:function(a){this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},getColumnX:function(){return THREE.Matrix4.__v1.set(this.n11,this.n21,this.n31)},getColumnY:function(){return THREE.Matrix4.__v1.set(this.n12,this.n22,this.n32)},getColumnZ:function(){return THREE.Matrix4.__v1.set(this.n13,this.n23,this.n33)},getInverse:function(a){var b=a.n11,c=a.n12,d=a.n13,f=a.n14,g=a.n21,h=a.n22,i=a.n23,k=a.n24,j=a.n31,m=a.n32,o=a.n33,l=a.n34,u=a.n41,r=a.n42,n=a.n43,t=a.n44;this.n11=
i*l*r-k*o*r+k*m*n-h*l*n-i*m*t+h*o*t;this.n12=f*o*r-d*l*r-f*m*n+c*l*n+d*m*t-c*o*t;this.n13=d*k*r-f*i*r+f*h*n-c*k*n-d*h*t+c*i*t;this.n14=f*i*m-d*k*m-f*h*o+c*k*o+d*h*l-c*i*l;this.n21=k*o*u-i*l*u-k*j*n+g*l*n+i*j*t-g*o*t;this.n22=d*l*u-f*o*u+f*j*n-b*l*n-d*j*t+b*o*t;this.n23=f*i*u-d*k*u-f*g*n+b*k*n+d*g*t-b*i*t;this.n24=d*k*j-f*i*j+f*g*o-b*k*o-d*g*l+b*i*l;this.n31=h*l*u-k*m*u+k*j*r-g*l*r-h*j*t+g*m*t;this.n32=f*m*u-c*l*u-f*j*r+b*l*r+c*j*t-b*m*t;this.n33=c*k*u-f*h*u+f*g*r-b*k*r-c*g*t+b*h*t;this.n34=f*h*j-
c*k*j-f*g*m+b*k*m+c*g*l-b*h*l;this.n41=i*m*u-h*o*u-i*j*r+g*o*r+h*j*n-g*m*n;this.n42=c*o*u-d*m*u+d*j*r-b*o*r-c*j*n+b*m*n;this.n43=d*h*u-c*i*u-d*g*r+b*i*r+c*g*n-b*h*n;this.n44=c*i*j-d*h*j+d*g*m-b*i*m-c*g*o+b*h*o;this.multiplyScalar(1/a.determinant());return this},setRotationFromEuler:function(a,b){var c=a.x,d=a.y,f=a.z,g=Math.cos(c),c=Math.sin(c),h=Math.cos(d),d=Math.sin(d),i=Math.cos(f),f=Math.sin(f);switch(b){case "YXZ":var k=h*i,j=h*f,m=d*i,o=d*f;this.n11=k+o*c;this.n12=m*c-j;this.n13=g*d;this.n21=
g*f;this.n22=g*i;this.n23=-c;this.n31=j*c-m;this.n32=o+k*c;this.n33=g*h;break;case "ZXY":k=h*i;j=h*f;m=d*i;o=d*f;this.n11=k-o*c;this.n12=-g*f;this.n13=m+j*c;this.n21=j+m*c;this.n22=g*i;this.n23=o-k*c;this.n31=-g*d;this.n32=c;this.n33=g*h;break;case "ZYX":k=g*i;j=g*f;m=c*i;o=c*f;this.n11=h*i;this.n12=m*d-j;this.n13=k*d+o;this.n21=h*f;this.n22=o*d+k;this.n23=j*d-m;this.n31=-d;this.n32=c*h;this.n33=g*h;break;case "YZX":k=g*h;j=g*d;m=c*h;o=c*d;this.n11=h*i;this.n12=o-k*f;this.n13=m*f+j;this.n21=f;this.n22=
g*i;this.n23=-c*i;this.n31=-d*i;this.n32=j*f+m;this.n33=k-o*f;break;case "XZY":k=g*h;j=g*d;m=c*h;o=c*d;this.n11=h*i;this.n12=-f;this.n13=d*i;this.n21=k*f+o;this.n22=g*i;this.n23=j*f-m;this.n31=m*f-j;this.n32=c*i;this.n33=o*f+k;break;default:k=g*i;j=g*f;m=c*i;o=c*f;this.n11=h*i;this.n12=-h*f;this.n13=d;this.n21=j+m*d;this.n22=k-o*d;this.n23=-c*h;this.n31=o-k*d;this.n32=m+j*d;this.n33=g*h}return this},setRotationFromQuaternion:function(a){var b=a.x,c=a.y,d=a.z,f=a.w,g=b+b,h=c+c,i=d+d,a=b*g,k=b*h,b=
b*i,j=c*h,c=c*i,d=d*i,g=f*g,h=f*h,f=f*i;this.n11=1-(j+d);this.n12=k-f;this.n13=b+h;this.n21=k+f;this.n22=1-(a+d);this.n23=c-g;this.n31=b-h;this.n32=c+g;this.n33=1-(a+j);return this},compose:function(a,b,c){var d=THREE.Matrix4.__m1,f=THREE.Matrix4.__m2;d.identity();d.setRotationFromQuaternion(b);f.makeScale(c.x,c.y,c.z);this.multiply(d,f);this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},decompose:function(a,b,c){var d=THREE.Matrix4.__v1,f=THREE.Matrix4.__v2,g=THREE.Matrix4.__v3;d.set(this.n11,this.n21,
this.n31);f.set(this.n12,this.n22,this.n32);g.set(this.n13,this.n23,this.n33);a=a instanceof THREE.Vector3?a:new THREE.Vector3;b=b instanceof THREE.Quaternion?b:new THREE.Quaternion;c=c instanceof THREE.Vector3?c:new THREE.Vector3;c.x=d.length();c.y=f.length();c.z=g.length();a.x=this.n14;a.y=this.n24;a.z=this.n34;d=THREE.Matrix4.__m1;d.copy(this);d.n11=d.n11/c.x;d.n21=d.n21/c.x;d.n31=d.n31/c.x;d.n12=d.n12/c.y;d.n22=d.n22/c.y;d.n32=d.n32/c.y;d.n13=d.n13/c.z;d.n23=d.n23/c.z;d.n33=d.n33/c.z;b.setFromRotationMatrix(d);
return[a,b,c]},extractPosition:function(a){this.n14=a.n14;this.n24=a.n24;this.n34=a.n34;return this},extractRotation:function(a){var b=THREE.Matrix4.__v1,c=1/b.set(a.n11,a.n21,a.n31).length(),d=1/b.set(a.n12,a.n22,a.n32).length(),b=1/b.set(a.n13,a.n23,a.n33).length();this.n11=a.n11*c;this.n21=a.n21*c;this.n31=a.n31*c;this.n12=a.n12*d;this.n22=a.n22*d;this.n32=a.n32*d;this.n13=a.n13*b;this.n23=a.n23*b;this.n33=a.n33*b;return this},translate:function(a){var b=a.x,c=a.y,a=a.z;this.n14=this.n11*b+this.n12*
c+this.n13*a+this.n14;this.n24=this.n21*b+this.n22*c+this.n23*a+this.n24;this.n34=this.n31*b+this.n32*c+this.n33*a+this.n34;this.n44=this.n41*b+this.n42*c+this.n43*a+this.n44;return this},rotateX:function(a){var b=this.n12,c=this.n22,d=this.n32,f=this.n42,g=this.n13,h=this.n23,i=this.n33,k=this.n43,j=Math.cos(a),a=Math.sin(a);this.n12=j*b+a*g;this.n22=j*c+a*h;this.n32=j*d+a*i;this.n42=j*f+a*k;this.n13=j*g-a*b;this.n23=j*h-a*c;this.n33=j*i-a*d;this.n43=j*k-a*f;return this},rotateY:function(a){var b=
this.n11,c=this.n21,d=this.n31,f=this.n41,g=this.n13,h=this.n23,i=this.n33,k=this.n43,j=Math.cos(a),a=Math.sin(a);this.n11=j*b-a*g;this.n21=j*c-a*h;this.n31=j*d-a*i;this.n41=j*f-a*k;this.n13=j*g+a*b;this.n23=j*h+a*c;this.n33=j*i+a*d;this.n43=j*k+a*f;return this},rotateZ:function(a){var b=this.n11,c=this.n21,d=this.n31,f=this.n41,g=this.n12,h=this.n22,i=this.n32,k=this.n42,j=Math.cos(a),a=Math.sin(a);this.n11=j*b+a*g;this.n21=j*c+a*h;this.n31=j*d+a*i;this.n41=j*f+a*k;this.n12=j*g-a*b;this.n22=j*h-
a*c;this.n32=j*i-a*d;this.n42=j*k-a*f;return this},rotateByAxis:function(a,b){if(a.x===1&&a.y===0&&a.z===0)return this.rotateX(b);if(a.x===0&&a.y===1&&a.z===0)return this.rotateY(b);if(a.x===0&&a.y===0&&a.z===1)return this.rotateZ(b);var c=a.x,d=a.y,f=a.z,g=Math.sqrt(c*c+d*d+f*f),c=c/g,d=d/g,f=f/g,g=c*c,h=d*d,i=f*f,k=Math.cos(b),j=Math.sin(b),m=1-k,o=c*d*m,l=c*f*m,m=d*f*m,c=c*j,u=d*j,j=f*j,f=g+(1-g)*k,g=o+j,d=l-u,o=o-j,h=h+(1-h)*k,j=m+c,l=l+u,m=m-c,i=i+(1-i)*k,k=this.n11,c=this.n21,u=this.n31,r=this.n41,
n=this.n12,t=this.n22,z=this.n32,w=this.n42,P=this.n13,A=this.n23,q=this.n33,G=this.n43;this.n11=f*k+g*n+d*P;this.n21=f*c+g*t+d*A;this.n31=f*u+g*z+d*q;this.n41=f*r+g*w+d*G;this.n12=o*k+h*n+j*P;this.n22=o*c+h*t+j*A;this.n32=o*u+h*z+j*q;this.n42=o*r+h*w+j*G;this.n13=l*k+m*n+i*P;this.n23=l*c+m*t+i*A;this.n33=l*u+m*z+i*q;this.n43=l*r+m*w+i*G;return this},scale:function(a){var b=a.x,c=a.y,a=a.z;this.n11=this.n11*b;this.n12=this.n12*c;this.n13=this.n13*a;this.n21=this.n21*b;this.n22=this.n22*c;this.n23=
this.n23*a;this.n31=this.n31*b;this.n32=this.n32*c;this.n33=this.n33*a;this.n41=this.n41*b;this.n42=this.n42*c;this.n43=this.n43*a;return this},makeTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},makeRotationX:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},makeRotationY:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},makeRotationZ:function(a){var b=Math.cos(a),
a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},makeRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),f=1-c,g=a.x,h=a.y,i=a.z,k=f*g,j=f*h;this.set(k*g+c,k*h-d*i,k*i+d*h,0,k*h+d*i,j*h+c,j*i-d*g,0,k*i-d*h,j*i+d*g,f*i*i+c,0,0,0,0,1);return this},makeScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},makeFrustum:function(a,b,c,d,f,g){this.n11=2*f/(b-a);this.n12=0;this.n13=(b+a)/(b-a);this.n21=this.n14=0;this.n22=2*f/(d-c);this.n23=(d+c)/(d-c);this.n32=
this.n31=this.n24=0;this.n33=-(g+f)/(g-f);this.n34=-2*g*f/(g-f);this.n42=this.n41=0;this.n43=-1;this.n44=0;return this},makePerspective:function(a,b,c,d){var a=c*Math.tan(a*Math.PI/360),f=-a;return this.makeFrustum(f*b,a*b,f,a,c,d)},makeOrthographic:function(a,b,c,d,f,g){var h=b-a,i=c-d,k=g-f;this.n11=2/h;this.n13=this.n12=0;this.n14=-((b+a)/h);this.n21=0;this.n22=2/i;this.n23=0;this.n24=-((c+d)/i);this.n32=this.n31=0;this.n33=-2/k;this.n34=-((g+f)/k);this.n43=this.n42=this.n41=0;this.n44=1;return this},
clone:function(){return new THREE.Matrix4(this.n11,this.n12,this.n13,this.n14,this.n21,this.n22,this.n23,this.n24,this.n31,this.n32,this.n33,this.n34,this.n41,this.n42,this.n43,this.n44)}};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;THREE.Matrix4.__m1=new THREE.Matrix4;THREE.Matrix4.__m2=new THREE.Matrix4;
THREE.Object3D=function(){this.id=THREE.Object3DCount++;this.name="";this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.eulerOrder="XYZ";this.scale=new THREE.Vector3(1,1,1);this.flipSided=this.doubleSided=false;this.renderDepth=null;this.rotationAutoUpdate=true;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=
true;this.quaternion=new THREE.Quaternion;this.useQuaternion=false;this.boundRadius=0;this.boundRadiusScale=1;this.visible=true;this.receiveShadow=this.castShadow=false;this.frustumCulled=true;this._vector=new THREE.Vector3};
THREE.Object3D.prototype={constructor:THREE.Object3D,applyMatrix:function(a){this.matrix.multiply(a,this.matrix);this.scale.getScaleFromMatrix(this.matrix);this.rotation.getRotationFromMatrix(this.matrix,this.scale);this.position.getPositionFromMatrix(this.matrix)},translate:function(a,b){this.matrix.rotateAxis(b);this.position.addSelf(b.multiplyScalar(a))},translateX:function(a){this.translate(a,this._vector.set(1,0,0))},translateY:function(a){this.translate(a,this._vector.set(0,1,0))},translateZ:function(a){this.translate(a,
this._vector.set(0,0,1))},lookAt:function(a){this.matrix.lookAt(a,this.position,this.up);this.rotationAutoUpdate&&this.rotation.getRotationFromMatrix(this.matrix)},add:function(a){if(a===this)console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");else if(a instanceof THREE.Object3D){a.parent!==void 0&&a.parent.remove(a);a.parent=this;this.children.push(a);for(var b=this;b.parent!==void 0;)b=b.parent;b!==void 0&&b instanceof THREE.Scene&&b.__addObject(a)}},remove:function(a){var b=
this.children.indexOf(a);if(b!==-1){a.parent=void 0;this.children.splice(b,1);for(b=this;b.parent!==void 0;)b=b.parent;b!==void 0&&b instanceof THREE.Scene&&b.__removeObject(a)}},getChildByName:function(a,b){var c,d,f;c=0;for(d=this.children.length;c<d;c++){f=this.children[c];if(f.name===a)return f;if(b){f=f.getChildByName(a,b);if(f!==void 0)return f}}},updateMatrix:function(){this.matrix.setPosition(this.position);this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation,
this.eulerOrder);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1){this.matrix.scale(this.scale);this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z))}this.matrixWorldNeedsUpdate=true},updateMatrixWorld:function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a){this.parent?this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=false;a=true}for(var b=0,c=this.children.length;b<
c;b++)this.children[b].updateMatrixWorld(a)}};THREE.Object3DCount=0;
THREE.Projector=function(){function a(){var a=h[g]=h[g]||new THREE.RenderableObject;g++;return a}function b(){var a=j[k]=j[k]||new THREE.RenderableVertex;k++;return a}function c(a,b){return b.z-a.z}function d(a,b){var c=0,d=1,f=a.z+a.w,e=b.z+b.w,g=-a.z+a.w,h=-b.z+b.w;if(f>=0&&e>=0&&g>=0&&h>=0)return true;if(f<0&&e<0||g<0&&h<0)return false;f<0?c=Math.max(c,f/(f-e)):e<0&&(d=Math.min(d,f/(f-e)));g<0?c=Math.max(c,g/(g-h)):h<0&&(d=Math.min(d,g/(g-h)));if(d<c)return false;a.lerpSelf(b,c);b.lerpSelf(a,1-
d);return true}var f,g,h=[],i,k,j=[],m,o,l=[],u,r=[],n,t,z=[],w,P,A=[],q={objects:[],sprites:[],lights:[],elements:[]},G=new THREE.Vector3,H=new THREE.Vector4,M=new THREE.Matrix4,I=new THREE.Matrix4,K=new THREE.Frustum,N=new THREE.Vector4,ja=new THREE.Vector4;this.projectVector=function(a,b){b.matrixWorldInverse.getInverse(b.matrixWorld);M.multiply(b.projectionMatrix,b.matrixWorldInverse);M.multiplyVector3(a);return a};this.unprojectVector=function(a,b){b.projectionMatrixInverse.getInverse(b.projectionMatrix);
M.multiply(b.matrixWorld,b.projectionMatrixInverse);M.multiplyVector3(a);return a};this.pickingRay=function(a,b){var c;a.z=-1;c=new THREE.Vector3(a.x,a.y,1);this.unprojectVector(a,b);this.unprojectVector(c,b);c.subSelf(a).normalize();return new THREE.Ray(a,c)};this.projectGraph=function(b,d){g=0;q.objects.length=0;q.sprites.length=0;q.lights.length=0;var h=function(b){if(b.visible!==false){if((b instanceof THREE.Mesh||b instanceof THREE.Line)&&(b.frustumCulled===false||K.contains(b))){G.copy(b.matrixWorld.getPosition());
M.multiplyVector3(G);f=a();f.object=b;f.z=G.z;q.objects.push(f)}else if(b instanceof THREE.Sprite||b instanceof THREE.Particle){G.copy(b.matrixWorld.getPosition());M.multiplyVector3(G);f=a();f.object=b;f.z=G.z;q.sprites.push(f)}else b instanceof THREE.Light&&q.lights.push(b);for(var c=0,e=b.children.length;c<e;c++)h(b.children[c])}};h(b);d&&q.objects.sort(c);return q};this.projectScene=function(a,f,g){var h=f.near,C=f.far,e=false,G,Aa,T,sa,J,aa,ta,xa,U,Ba,Ma,Ra,Sa,Ka,Ca;P=t=u=o=0;q.elements.length=
0;if(f.parent===void 0){console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it...");a.add(f)}a.updateMatrixWorld();f.matrixWorldInverse.getInverse(f.matrixWorld);M.multiply(f.projectionMatrix,f.matrixWorldInverse);K.setFromMatrix(M);q=this.projectGraph(a,false);a=0;for(G=q.objects.length;a<G;a++){U=q.objects[a].object;Ba=U.matrixWorld;k=0;if(U instanceof THREE.Mesh){Ma=U.geometry;Ra=U.geometry.materials;sa=Ma.vertices;Sa=Ma.faces;Ka=Ma.faceVertexUvs;Ma=U.matrixRotationWorld.extractRotation(Ba);
Aa=0;for(T=sa.length;Aa<T;Aa++){i=b();i.positionWorld.copy(sa[Aa]);Ba.multiplyVector3(i.positionWorld);i.positionScreen.copy(i.positionWorld);M.multiplyVector4(i.positionScreen);i.positionScreen.x=i.positionScreen.x/i.positionScreen.w;i.positionScreen.y=i.positionScreen.y/i.positionScreen.w;i.visible=i.positionScreen.z>h&&i.positionScreen.z<C}sa=0;for(Aa=Sa.length;sa<Aa;sa++){T=Sa[sa];if(T instanceof THREE.Face3){J=j[T.a];aa=j[T.b];ta=j[T.c];if(J.visible&&aa.visible&&ta.visible){e=(ta.positionScreen.x-
J.positionScreen.x)*(aa.positionScreen.y-J.positionScreen.y)-(ta.positionScreen.y-J.positionScreen.y)*(aa.positionScreen.x-J.positionScreen.x)<0;if(U.doubleSided||e!=U.flipSided){xa=l[o]=l[o]||new THREE.RenderableFace3;o++;m=xa;m.v1.copy(J);m.v2.copy(aa);m.v3.copy(ta)}else continue}else continue}else if(T instanceof THREE.Face4){J=j[T.a];aa=j[T.b];ta=j[T.c];xa=j[T.d];if(J.visible&&aa.visible&&ta.visible&&xa.visible){e=(xa.positionScreen.x-J.positionScreen.x)*(aa.positionScreen.y-J.positionScreen.y)-
(xa.positionScreen.y-J.positionScreen.y)*(aa.positionScreen.x-J.positionScreen.x)<0||(aa.positionScreen.x-ta.positionScreen.x)*(xa.positionScreen.y-ta.positionScreen.y)-(aa.positionScreen.y-ta.positionScreen.y)*(xa.positionScreen.x-ta.positionScreen.x)<0;if(U.doubleSided||e!=U.flipSided){Ca=r[u]=r[u]||new THREE.RenderableFace4;u++;m=Ca;m.v1.copy(J);m.v2.copy(aa);m.v3.copy(ta);m.v4.copy(xa)}else continue}else continue}m.normalWorld.copy(T.normal);!e&&(U.flipSided||U.doubleSided)&&m.normalWorld.negate();
Ma.multiplyVector3(m.normalWorld);m.centroidWorld.copy(T.centroid);Ba.multiplyVector3(m.centroidWorld);m.centroidScreen.copy(m.centroidWorld);M.multiplyVector3(m.centroidScreen);ta=T.vertexNormals;J=0;for(aa=ta.length;J<aa;J++){xa=m.vertexNormalsWorld[J];xa.copy(ta[J]);!e&&(U.flipSided||U.doubleSided)&&xa.negate();Ma.multiplyVector3(xa)}J=0;for(aa=Ka.length;J<aa;J++)if(Ca=Ka[J][sa]){ta=0;for(xa=Ca.length;ta<xa;ta++)m.uvs[J][ta]=Ca[ta]}m.material=U.material;m.faceMaterial=T.materialIndex!==null?Ra[T.materialIndex]:
null;m.z=m.centroidScreen.z;q.elements.push(m)}}else if(U instanceof THREE.Line){I.multiply(M,Ba);sa=U.geometry.vertices;J=b();J.positionScreen.copy(sa[0]);I.multiplyVector4(J.positionScreen);Ba=U.type===THREE.LinePieces?2:1;Aa=1;for(T=sa.length;Aa<T;Aa++){J=b();J.positionScreen.copy(sa[Aa]);I.multiplyVector4(J.positionScreen);if(!((Aa+1)%Ba>0)){aa=j[k-2];N.copy(J.positionScreen);ja.copy(aa.positionScreen);if(d(N,ja)){N.multiplyScalar(1/N.w);ja.multiplyScalar(1/ja.w);Ra=z[t]=z[t]||new THREE.RenderableLine;
t++;n=Ra;n.v1.positionScreen.copy(N);n.v2.positionScreen.copy(ja);n.z=Math.max(N.z,ja.z);n.material=U.material;q.elements.push(n)}}}}}a=0;for(G=q.sprites.length;a<G;a++){U=q.sprites[a].object;Ba=U.matrixWorld;if(U instanceof THREE.Particle){H.set(Ba.n14,Ba.n24,Ba.n34,1);M.multiplyVector4(H);H.z=H.z/H.w;if(H.z>0&&H.z<1){h=A[P]=A[P]||new THREE.RenderableParticle;P++;w=h;w.x=H.x/H.w;w.y=H.y/H.w;w.z=H.z;w.rotation=U.rotation.z;w.scale.x=U.scale.x*Math.abs(w.x-(H.x+f.projectionMatrix.n11)/(H.w+f.projectionMatrix.n14));
w.scale.y=U.scale.y*Math.abs(w.y-(H.y+f.projectionMatrix.n22)/(H.w+f.projectionMatrix.n24));w.material=U.material;q.elements.push(w)}}}g&&q.elements.sort(c);return q}};THREE.Quaternion=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=d!==void 0?d:1};
THREE.Quaternion.prototype={constructor:THREE.Quaternion,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this},setFromEuler:function(a){var b=Math.PI/360,c=a.x*b,d=a.y*b,f=a.z*b,a=Math.cos(d),d=Math.sin(d),b=Math.cos(-f),f=Math.sin(-f),g=Math.cos(c),c=Math.sin(c),h=a*b,i=d*f;this.w=h*g-i*c;this.x=h*c+i*g;this.y=d*b*g+a*f*c;this.z=a*f*g-d*b*c;return this},setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);
this.x=a.x*d;this.y=a.y*d;this.z=a.z*d;this.w=Math.cos(c);return this},setFromRotationMatrix:function(a){var b=Math.pow(a.determinant(),1/3);this.w=Math.sqrt(Math.max(0,b+a.n11+a.n22+a.n33))/2;this.x=Math.sqrt(Math.max(0,b+a.n11-a.n22-a.n33))/2;this.y=Math.sqrt(Math.max(0,b-a.n11+a.n22-a.n33))/2;this.z=Math.sqrt(Math.max(0,b-a.n11-a.n22+a.n33))/2;this.x=a.n32-a.n23<0?-Math.abs(this.x):Math.abs(this.x);this.y=a.n13-a.n31<0?-Math.abs(this.y):Math.abs(this.y);this.z=a.n21-a.n12<0?-Math.abs(this.z):Math.abs(this.z);
this.normalize();return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x=this.x*-1;this.y=this.y*-1;this.z=this.z*-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var a=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);if(a===0)this.w=this.z=this.y=this.x=0;else{a=1/a;this.x=this.x*a;this.y=this.y*a;this.z=this.z*
a;this.w=this.w*a}return this},multiply:function(a,b){this.x=a.x*b.w+a.y*b.z-a.z*b.y+a.w*b.x;this.y=-a.x*b.z+a.y*b.w+a.z*b.x+a.w*b.y;this.z=a.x*b.y-a.y*b.x+a.z*b.w+a.w*b.z;this.w=-a.x*b.x-a.y*b.y-a.z*b.z+a.w*b.w;return this},multiplySelf:function(a){var b=this.x,c=this.y,d=this.z,f=this.w,g=a.x,h=a.y,i=a.z,a=a.w;this.x=b*a+f*g+c*i-d*h;this.y=c*a+f*h+d*g-b*i;this.z=d*a+f*i+b*h-c*g;this.w=f*a-b*g-c*h-d*i;return this},multiplyVector3:function(a,b){b||(b=a);var c=a.x,d=a.y,f=a.z,g=this.x,h=this.y,i=this.z,
k=this.w,j=k*c+h*f-i*d,m=k*d+i*c-g*f,o=k*f+g*d-h*c,c=-g*c-h*d-i*f;b.x=j*k+c*-g+m*-i-o*-h;b.y=m*k+c*-h+o*-g-j*-i;b.z=o*k+c*-i+j*-h-m*-g;return b},clone:function(){return new THREE.Quaternion(this.x,this.y,this.z,this.w)}};
THREE.Quaternion.slerp=function(a,b,c,d){var f=a.w*b.w+a.x*b.x+a.y*b.y+a.z*b.z;if(f<0){c.w=-b.w;c.x=-b.x;c.y=-b.y;c.z=-b.z;f=-f}else c.copy(b);if(Math.abs(f)>=1){c.w=a.w;c.x=a.x;c.y=a.y;c.z=a.z;return c}var g=Math.acos(f),f=Math.sqrt(1-f*f);if(Math.abs(f)<0.001){c.w=0.5*(a.w+b.w);c.x=0.5*(a.x+b.x);c.y=0.5*(a.y+b.y);c.z=0.5*(a.z+b.z);return c}b=Math.sin((1-d)*g)/f;d=Math.sin(d*g)/f;c.w=a.w*b+c.w*d;c.x=a.x*b+c.x*d;c.y=a.y*b+c.y*d;c.z=a.z*b+c.z*d;return c};THREE.Vertex=THREE.Vector3;
THREE.Face3=function(a,b,c,d,f,g){this.a=a;this.b=b;this.c=c;this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3;this.vertexNormals=d instanceof Array?d:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materialIndex=g;this.centroid=new THREE.Vector3};
THREE.Face3.prototype={constructor:THREE.Face3,clone:function(){var a=new THREE.Face3(this.a,this.b,this.c);a.normal.copy(this.normal);a.color.copy(this.color);a.centroid.copy(this.centroid);a.materialIndex=this.materialIndex;var b,c;b=0;for(c=this.vertexNormals.length;b<c;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();b=0;for(c=this.vertexColors.length;b<c;b++)a.vertexColors[b]=this.vertexColors[b].clone();b=0;for(c=this.vertexTangents.length;b<c;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();
return a}};THREE.Face4=function(a,b,c,d,f,g,h){this.a=a;this.b=b;this.c=c;this.d=d;this.normal=f instanceof THREE.Vector3?f:new THREE.Vector3;this.vertexNormals=f instanceof Array?f:[];this.color=g instanceof THREE.Color?g:new THREE.Color;this.vertexColors=g instanceof Array?g:[];this.vertexTangents=[];this.materialIndex=h;this.centroid=new THREE.Vector3};
THREE.Face4.prototype={constructor:THREE.Face4,clone:function(){var a=new THREE.Face4(this.a,this.b,this.c,this.d);a.normal.copy(this.normal);a.color.copy(this.color);a.centroid.copy(this.centroid);a.materialIndex=this.materialIndex;var b,c;b=0;for(c=this.vertexNormals.length;b<c;b++)a.vertexNormals[b]=this.vertexNormals[b].clone();b=0;for(c=this.vertexColors.length;b<c;b++)a.vertexColors[b]=this.vertexColors[b].clone();b=0;for(c=this.vertexTangents.length;b<c;b++)a.vertexTangents[b]=this.vertexTangents[b].clone();
return a}};THREE.UV=function(a,b){this.u=a||0;this.v=b||0};THREE.UV.prototype={constructor:THREE.UV,set:function(a,b){this.u=a;this.v=b;return this},copy:function(a){this.u=a.u;this.v=a.v;return this},lerpSelf:function(a,b){this.u=this.u+(a.u-this.u)*b;this.v=this.v+(a.v-this.v)*b;return this},clone:function(){return new THREE.UV(this.u,this.v)}};
THREE.Geometry=function(){this.id=THREE.GeometryCount++;this.vertices=[];this.colors=[];this.materials=[];this.faces=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.dynamic=this.hasTangents=false};
THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(a){var b=new THREE.Matrix4;b.extractRotation(a);for(var c=0,d=this.vertices.length;c<d;c++)a.multiplyVector3(this.vertices[c]);c=0;for(d=this.faces.length;c<d;c++){var f=this.faces[c];b.multiplyVector3(f.normal);for(var g=0,h=f.vertexNormals.length;g<h;g++)b.multiplyVector3(f.vertexNormals[g]);a.multiplyVector3(f.centroid)}},computeCentroids:function(){var a,b,c;a=0;for(b=this.faces.length;a<b;a++){c=this.faces[a];c.centroid.set(0,
0,0);if(c instanceof THREE.Face3){c.centroid.addSelf(this.vertices[c.a]);c.centroid.addSelf(this.vertices[c.b]);c.centroid.addSelf(this.vertices[c.c]);c.centroid.divideScalar(3)}else if(c instanceof THREE.Face4){c.centroid.addSelf(this.vertices[c.a]);c.centroid.addSelf(this.vertices[c.b]);c.centroid.addSelf(this.vertices[c.c]);c.centroid.addSelf(this.vertices[c.d]);c.centroid.divideScalar(4)}}},computeFaceNormals:function(){var a,b,c,d,f,g,h=new THREE.Vector3,i=new THREE.Vector3;a=0;for(b=this.faces.length;a<
b;a++){c=this.faces[a];d=this.vertices[c.a];f=this.vertices[c.b];g=this.vertices[c.c];h.sub(g,f);i.sub(d,f);h.crossSelf(i);h.isZero()||h.normalize();c.normal.copy(h)}},computeVertexNormals:function(){var a,b,c,d;if(this.__tmpVertices===void 0){d=this.__tmpVertices=Array(this.vertices.length);a=0;for(b=this.vertices.length;a<b;a++)d[a]=new THREE.Vector3;a=0;for(b=this.faces.length;a<b;a++){c=this.faces[a];if(c instanceof THREE.Face3)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];
else if(c instanceof THREE.Face4)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}}else{d=this.__tmpVertices;a=0;for(b=this.vertices.length;a<b;a++)d[a].set(0,0,0)}a=0;for(b=this.faces.length;a<b;a++){c=this.faces[a];if(c instanceof THREE.Face3){d[c.a].addSelf(c.normal);d[c.b].addSelf(c.normal);d[c.c].addSelf(c.normal)}else if(c instanceof THREE.Face4){d[c.a].addSelf(c.normal);d[c.b].addSelf(c.normal);d[c.c].addSelf(c.normal);d[c.d].addSelf(c.normal)}}a=0;
for(b=this.vertices.length;a<b;a++)d[a].normalize();a=0;for(b=this.faces.length;a<b;a++){c=this.faces[a];if(c instanceof THREE.Face3){c.vertexNormals[0].copy(d[c.a]);c.vertexNormals[1].copy(d[c.b]);c.vertexNormals[2].copy(d[c.c])}else if(c instanceof THREE.Face4){c.vertexNormals[0].copy(d[c.a]);c.vertexNormals[1].copy(d[c.b]);c.vertexNormals[2].copy(d[c.c]);c.vertexNormals[3].copy(d[c.d])}}},computeMorphNormals:function(){var a,b,c,d,f;c=0;for(d=this.faces.length;c<d;c++){f=this.faces[c];f.__originalFaceNormal?
f.__originalFaceNormal.copy(f.normal):f.__originalFaceNormal=f.normal.clone();if(!f.__originalVertexNormals)f.__originalVertexNormals=[];a=0;for(b=f.vertexNormals.length;a<b;a++)f.__originalVertexNormals[a]?f.__originalVertexNormals[a].copy(f.vertexNormals[a]):f.__originalVertexNormals[a]=f.vertexNormals[a].clone()}var g=new THREE.Geometry;g.faces=this.faces;a=0;for(b=this.morphTargets.length;a<b;a++){if(!this.morphNormals[a]){this.morphNormals[a]={};this.morphNormals[a].faceNormals=[];this.morphNormals[a].vertexNormals=
[];var h=this.morphNormals[a].faceNormals,i=this.morphNormals[a].vertexNormals,k,j;c=0;for(d=this.faces.length;c<d;c++){f=this.faces[c];k=new THREE.Vector3;j=f instanceof THREE.Face3?{a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3}:{a:new THREE.Vector3,b:new THREE.Vector3,c:new THREE.Vector3,d:new THREE.Vector3};h.push(k);i.push(j)}}h=this.morphNormals[a];g.vertices=this.morphTargets[a].vertices;g.computeFaceNormals();g.computeVertexNormals();c=0;for(d=this.faces.length;c<d;c++){f=this.faces[c];
k=h.faceNormals[c];j=h.vertexNormals[c];k.copy(f.normal);if(f instanceof THREE.Face3){j.a.copy(f.vertexNormals[0]);j.b.copy(f.vertexNormals[1]);j.c.copy(f.vertexNormals[2])}else{j.a.copy(f.vertexNormals[0]);j.b.copy(f.vertexNormals[1]);j.c.copy(f.vertexNormals[2]);j.d.copy(f.vertexNormals[3])}}}c=0;for(d=this.faces.length;c<d;c++){f=this.faces[c];f.normal=f.__originalFaceNormal;f.vertexNormals=f.__originalVertexNormals}},computeTangents:function(){function a(a,b,c,d,f,g,J){i=a.vertices[b];k=a.vertices[c];
j=a.vertices[d];m=h[f];o=h[g];l=h[J];u=k.x-i.x;r=j.x-i.x;n=k.y-i.y;t=j.y-i.y;z=k.z-i.z;w=j.z-i.z;P=o.u-m.u;A=l.u-m.u;q=o.v-m.v;G=l.v-m.v;H=1/(P*G-A*q);N.set((G*u-q*r)*H,(G*n-q*t)*H,(G*z-q*w)*H);ja.set((P*r-A*u)*H,(P*t-A*n)*H,(P*w-A*z)*H);I[b].addSelf(N);I[c].addSelf(N);I[d].addSelf(N);K[b].addSelf(ja);K[c].addSelf(ja);K[d].addSelf(ja)}var b,c,d,f,g,h,i,k,j,m,o,l,u,r,n,t,z,w,P,A,q,G,H,M,I=[],K=[],N=new THREE.Vector3,ja=new THREE.Vector3,oa=new THREE.Vector3,ka=new THREE.Vector3,Y=new THREE.Vector3;
b=0;for(c=this.vertices.length;b<c;b++){I[b]=new THREE.Vector3;K[b]=new THREE.Vector3}b=0;for(c=this.faces.length;b<c;b++){g=this.faces[b];h=this.faceVertexUvs[0][b];if(g instanceof THREE.Face3)a(this,g.a,g.b,g.c,0,1,2);else if(g instanceof THREE.Face4){a(this,g.a,g.b,g.d,0,1,3);a(this,g.b,g.c,g.d,1,2,3)}}var S=["a","b","c","d"];b=0;for(c=this.faces.length;b<c;b++){g=this.faces[b];for(d=0;d<g.vertexNormals.length;d++){Y.copy(g.vertexNormals[d]);f=g[S[d]];M=I[f];oa.copy(M);oa.subSelf(Y.multiplyScalar(Y.dot(M))).normalize();
ka.cross(g.vertexNormals[d],M);f=ka.dot(K[f]);f=f<0?-1:1;g.vertexTangents[d]=new THREE.Vector4(oa.x,oa.y,oa.z,f)}}this.hasTangents=true},computeBoundingBox:function(){if(!this.boundingBox)this.boundingBox={min:new THREE.Vector3,max:new THREE.Vector3};if(this.vertices.length>0){var a;a=this.vertices[0];this.boundingBox.min.copy(a);this.boundingBox.max.copy(a);for(var b=this.boundingBox.min,c=this.boundingBox.max,d=1,f=this.vertices.length;d<f;d++){a=this.vertices[d];if(a.x<b.x)b.x=a.x;else if(a.x>
c.x)c.x=a.x;if(a.y<b.y)b.y=a.y;else if(a.y>c.y)c.y=a.y;if(a.z<b.z)b.z=a.z;else if(a.z>c.z)c.z=a.z}}else{this.boundingBox.min.set(0,0,0);this.boundingBox.max.set(0,0,0)}},computeBoundingSphere:function(){if(!this.boundingSphere)this.boundingSphere={radius:0};for(var a,b=0,c=0,d=this.vertices.length;c<d;c++){a=this.vertices[c].length();a>b&&(b=a)}this.boundingSphere.radius=b},mergeVertices:function(){var a={},b=[],c=[],d,f=Math.pow(10,4),g,h;g=0;for(h=this.vertices.length;g<h;g++){d=this.vertices[g];
d=[Math.round(d.x*f),Math.round(d.y*f),Math.round(d.z*f)].join("_");if(a[d]===void 0){a[d]=g;b.push(this.vertices[g]);c[g]=b.length-1}else c[g]=c[a[d]]}g=0;for(h=this.faces.length;g<h;g++){a=this.faces[g];if(a instanceof THREE.Face3){a.a=c[a.a];a.b=c[a.b];a.c=c[a.c]}else if(a instanceof THREE.Face4){a.a=c[a.a];a.b=c[a.b];a.c=c[a.c];a.d=c[a.d]}}this.vertices=b}};THREE.GeometryCount=0;
THREE.Spline=function(a){function b(a,b,c,d,f,g,h){a=(c-a)*0.5;d=(d-b)*0.5;return(2*(b-c)+a+d)*h+(-3*(b-c)-2*a-d)*g+a*f+b}this.points=a;var c=[],d={x:0,y:0,z:0},f,g,h,i,k,j,m,o,l;this.initFromArray=function(a){this.points=[];for(var b=0;b<a.length;b++)this.points[b]={x:a[b][0],y:a[b][1],z:a[b][2]}};this.getPoint=function(a){f=(this.points.length-1)*a;g=Math.floor(f);h=f-g;c[0]=g===0?g:g-1;c[1]=g;c[2]=g>this.points.length-2?this.points.length-1:g+1;c[3]=g>this.points.length-3?this.points.length-1:
g+2;j=this.points[c[0]];m=this.points[c[1]];o=this.points[c[2]];l=this.points[c[3]];i=h*h;k=h*i;d.x=b(j.x,m.x,o.x,l.x,h,i,k);d.y=b(j.y,m.y,o.y,l.y,h,i,k);d.z=b(j.z,m.z,o.z,l.z,h,i,k);return d};this.getControlPointsArray=function(){var a,b,c=this.points.length,d=[];for(a=0;a<c;a++){b=this.points[a];d[a]=[b.x,b.y,b.z]}return d};this.getLength=function(a){var b,c,d,f=b=b=0,g=new THREE.Vector3,h=new THREE.Vector3,i=[],j=0;i[0]=0;a||(a=100);c=this.points.length*a;g.copy(this.points[0]);for(a=1;a<c;a++){b=
a/c;d=this.getPoint(b);h.copy(d);j=j+h.distanceTo(g);g.copy(d);b=(this.points.length-1)*b;b=Math.floor(b);if(b!=f){i[b]=j;f=b}}i[i.length]=j;return{chunks:i,total:j}};this.reparametrizeByArcLength=function(a){var b,c,d,f,g,h,i=[],j=new THREE.Vector3,l=this.getLength();i.push(j.copy(this.points[0]).clone());for(b=1;b<this.points.length;b++){c=l.chunks[b]-l.chunks[b-1];h=Math.ceil(a*c/l.total);f=(b-1)/(this.points.length-1);g=b/(this.points.length-1);for(c=1;c<h-1;c++){d=f+c*(1/h)*(g-f);d=this.getPoint(d);
i.push(j.copy(d).clone())}i.push(j.copy(this.points[b]).clone())}this.points=i}};THREE.Camera=function(){THREE.Object3D.call(this);this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=new THREE.Matrix4;this.projectionMatrixInverse=new THREE.Matrix4};THREE.Camera.prototype=new THREE.Object3D;THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.lookAt=function(a){this.matrix.lookAt(this.position,a,this.up);this.rotationAutoUpdate&&this.rotation.getRotationFromMatrix(this.matrix)};
THREE.OrthographicCamera=function(a,b,c,d,f,g){THREE.Camera.call(this);this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=f!==void 0?f:0.1;this.far=g!==void 0?g:2E3;this.updateProjectionMatrix()};THREE.OrthographicCamera.prototype=new THREE.Camera;THREE.OrthographicCamera.prototype.constructor=THREE.OrthographicCamera;THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix.makeOrthographic(this.left,this.right,this.top,this.bottom,this.near,this.far)};
THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this);this.fov=a!==void 0?a:50;this.aspect=b!==void 0?b:1;this.near=c!==void 0?c:0.1;this.far=d!==void 0?d:2E3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=new THREE.Camera;THREE.PerspectiveCamera.prototype.constructor=THREE.PerspectiveCamera;THREE.PerspectiveCamera.prototype.setLens=function(a,b){this.fov=2*Math.atan((b!==void 0?b:24)/(a*2))*(180/Math.PI);this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,f,g){this.fullWidth=a;this.fullHeight=b;this.x=c;this.y=d;this.width=f;this.height=g;this.updateProjectionMatrix()};
THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(this.fov*Math.PI/360)*this.near,c=-b,d=a*c,a=Math.abs(a*b-d),c=Math.abs(b-c);this.projectionMatrix.makeFrustum(d+this.x*a/this.fullWidth,d+(this.x+this.width)*a/this.fullWidth,b-(this.y+this.height)*c/this.fullHeight,b-this.y*c/this.fullHeight,this.near,this.far)}else this.projectionMatrix.makePerspective(this.fov,this.aspect,this.near,this.far)};
THREE.Light=function(a){THREE.Object3D.call(this);this.color=new THREE.Color(a)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=new THREE.Light;THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;
THREE.DirectionalLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,1,0);this.target=new THREE.Object3D;this.intensity=b!==void 0?b:1;this.distance=c!==void 0?c:0;this.onlyShadow=this.castShadow=false;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraLeft=-500;this.shadowCameraTop=this.shadowCameraRight=500;this.shadowCameraBottom=-500;this.shadowCameraVisible=false;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;
this.shadowCascade=false;this.shadowCascadeOffset=new THREE.Vector3(0,0,-1E3);this.shadowCascadeCount=2;this.shadowCascadeBias=[0,0,0];this.shadowCascadeWidth=[512,512,512];this.shadowCascadeHeight=[512,512,512];this.shadowCascadeNearZ=[-1,0.99,0.998];this.shadowCascadeFarZ=[0.99,0.998,1];this.shadowCascadeArray=[];this.shadowMatrix=this.shadowCamera=this.shadowMapSize=this.shadowMap=null};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;
THREE.PointLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,0,0);this.intensity=b!==void 0?b:1;this.distance=c!==void 0?c:0};THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;
THREE.SpotLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,1,0);this.target=new THREE.Object3D;this.intensity=b!==void 0?b:1;this.distance=c!==void 0?c:0;this.onlyShadow=this.castShadow=false;this.shadowCameraNear=50;this.shadowCameraFar=5E3;this.shadowCameraFov=50;this.shadowCameraVisible=false;this.shadowBias=0;this.shadowDarkness=0.5;this.shadowMapHeight=this.shadowMapWidth=512;this.shadowMatrix=this.shadowCamera=this.shadowMapSize=this.shadowMap=null};
THREE.SpotLight.prototype=new THREE.Light;THREE.SpotLight.prototype.constructor=THREE.SpotLight;
THREE.Material=function(a){a=a||{};this.id=THREE.MaterialCount++;this.name="";this.opacity=a.opacity!==void 0?a.opacity:1;this.transparent=a.transparent!==void 0?a.transparent:false;this.blending=a.blending!==void 0?a.blending:THREE.NormalBlending;this.blendSrc=a.blendSrc!==void 0?a.blendSrc:THREE.SrcAlphaFactor;this.blendDst=a.blendDst!==void 0?a.blendDst:THREE.OneMinusSrcAlphaFactor;this.blendEquation=a.blendEquation!==void 0?a.blendEquation:THREE.AddEquation;this.depthTest=a.depthTest!==void 0?
a.depthTest:true;this.depthWrite=a.depthWrite!==void 0?a.depthWrite:true;this.polygonOffset=a.polygonOffset!==void 0?a.polygonOffset:false;this.polygonOffsetFactor=a.polygonOffsetFactor!==void 0?a.polygonOffsetFactor:0;this.polygonOffsetUnits=a.polygonOffsetUnits!==void 0?a.polygonOffsetUnits:0;this.alphaTest=a.alphaTest!==void 0?a.alphaTest:0;this.overdraw=a.overdraw!==void 0?a.overdraw:false;this.needsUpdate=true};THREE.MaterialCount=0;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;
THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NoBlending=0;THREE.NormalBlending=1;THREE.AdditiveBlending=2;THREE.SubtractiveBlending=3;THREE.MultiplyBlending=4;THREE.AdditiveAlphaBlending=5;THREE.CustomBlending=6;THREE.AddEquation=100;THREE.SubtractEquation=101;THREE.ReverseSubtractEquation=102;THREE.ZeroFactor=200;THREE.OneFactor=201;THREE.SrcColorFactor=202;THREE.OneMinusSrcColorFactor=203;THREE.SrcAlphaFactor=204;THREE.OneMinusSrcAlphaFactor=205;THREE.DstAlphaFactor=206;
THREE.OneMinusDstAlphaFactor=207;THREE.DstColorFactor=208;THREE.OneMinusDstColorFactor=209;THREE.SrcAlphaSaturateFactor=210;
THREE.LineBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.linewidth=a.linewidth!==void 0?a.linewidth:1;this.linecap=a.linecap!==void 0?a.linecap:"round";this.linejoin=a.linejoin!==void 0?a.linejoin:"round";this.vertexColors=a.vertexColors?a.vertexColors:false;this.fog=a.fog!==void 0?a.fog:true};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;
THREE.MeshBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:
true;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:THREE.NoColors;this.skinning=a.skinning!==void 0?a.skinning:false;this.morphTargets=a.morphTargets!==
void 0?a.morphTargets:false};THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=a.ambient!==void 0?new THREE.Color(a.ambient):new THREE.Color(16777215);this.emissive=a.emissive!==void 0?new THREE.Color(a.emissive):new THREE.Color(0);this.wrapAround=a.wrapAround!==void 0?a.wrapAround:false;this.wrapRGB=new THREE.Vector3(1,1,1);this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=
a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:true;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?
a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:THREE.NoColors;this.skinning=a.skinning!==void 0?a.skinning:false;this.morphTargets=a.morphTargets!==void 0?a.morphTargets:false;this.morphNormals=a.morphNormals!==void 0?a.morphNormals:false};THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=a.ambient!==void 0?new THREE.Color(a.ambient):new THREE.Color(16777215);this.emissive=a.emissive!==void 0?new THREE.Color(a.emissive):new THREE.Color(0);this.specular=a.specular!==void 0?new THREE.Color(a.specular):new THREE.Color(1118481);this.shininess=a.shininess!==void 0?a.shininess:30;this.metal=a.metal!==void 0?a.metal:false;this.perPixel=
a.perPixel!==void 0?a.perPixel:false;this.wrapAround=a.wrapAround!==void 0?a.wrapAround:false;this.wrapRGB=new THREE.Vector3(1,1,1);this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:true;this.shading=
a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:THREE.NoColors;this.skinning=a.skinning!==void 0?a.skinning:false;this.morphTargets=a.morphTargets!==void 0?
a.morphTargets:false;this.morphNormals=a.morphNormals!==void 0?a.morphNormals:false};THREE.MeshPhongMaterial.prototype=new THREE.Material;THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;THREE.MeshDepthMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1};
THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=a.shading?a.shading:THREE.FlatShading;this.wireframe=a.wireframe?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth?a.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial=function(){};THREE.ParticleBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map!==void 0?a.map:null;this.size=a.size!==void 0?a.size:1;this.sizeAttenuation=a.sizeAttenuation!==void 0?a.sizeAttenuation:true;this.vertexColors=a.vertexColors!==void 0?a.vertexColors:false;this.fog=a.fog!==void 0?a.fog:true};THREE.ParticleBasicMaterial.prototype=new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial;
THREE.ShaderMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.fragmentShader=a.fragmentShader!==void 0?a.fragmentShader:"void main() {}";this.vertexShader=a.vertexShader!==void 0?a.vertexShader:"void main() {}";this.uniforms=a.uniforms!==void 0?a.uniforms:{};this.attributes=a.attributes;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:false;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.fog=
a.fog!==void 0?a.fog:false;this.lights=a.lights!==void 0?a.lights:false;this.vertexColors=a.vertexColors!==void 0?a.vertexColors:THREE.NoColors;this.skinning=a.skinning!==void 0?a.skinning:false;this.morphTargets=a.morphTargets!==void 0?a.morphTargets:false;this.morphNormals=a.morphNormals!==void 0?a.morphNormals:false};THREE.ShaderMaterial.prototype=new THREE.Material;THREE.ShaderMaterial.prototype.constructor=THREE.ShaderMaterial;
THREE.Texture=function(a,b,c,d,f,g,h,i){this.id=THREE.TextureCount++;this.image=a;this.mapping=b!==void 0?b:new THREE.UVMapping;this.wrapS=c!==void 0?c:THREE.ClampToEdgeWrapping;this.wrapT=d!==void 0?d:THREE.ClampToEdgeWrapping;this.magFilter=f!==void 0?f:THREE.LinearFilter;this.minFilter=g!==void 0?g:THREE.LinearMipMapLinearFilter;this.format=h!==void 0?h:THREE.RGBAFormat;this.type=i!==void 0?i:THREE.UnsignedByteType;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.generateMipmaps=
true;this.needsUpdate=this.premultiplyAlpha=false;this.onUpdate=null};THREE.Texture.prototype={constructor:THREE.Texture,clone:function(){var a=new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter,this.format,this.type);a.offset.copy(this.offset);a.repeat.copy(this.repeat);return a}};THREE.TextureCount=0;THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.UVMapping=function(){};THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};
THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;
THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.DataTexture=function(a,b,c,d,f,g,h,i,k,j){THREE.Texture.call(this,null,g,h,i,k,j,d,f);this.image={data:a,width:b,height:c}};THREE.DataTexture.prototype=new THREE.Texture;THREE.DataTexture.prototype.constructor=THREE.DataTexture;
THREE.DataTexture.prototype.clone=function(){var a=new THREE.DataTexture(this.image.data,this.image.width,this.image.height,this.format,this.type,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter);a.offset.copy(this.offset);a.repeat.copy(this.repeat);return a};THREE.Particle=function(a){THREE.Object3D.call(this);this.material=a};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;
THREE.ParticleSystem=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b!==void 0?b:new THREE.ParticleBasicMaterial({color:Math.random()*16777215});this.sortParticles=false;if(this.geometry){this.geometry.boundingSphere||this.geometry.computeBoundingSphere();this.boundRadius=a.boundingSphere.radius}this.frustumCulled=false};THREE.ParticleSystem.prototype=new THREE.Object3D;THREE.ParticleSystem.prototype.constructor=THREE.ParticleSystem;
THREE.Line=function(a,b,c){THREE.Object3D.call(this);this.geometry=a;this.material=b!==void 0?b:new THREE.LineBasicMaterial({color:Math.random()*16777215});this.type=c!==void 0?c:THREE.LineStrip;this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere())};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;THREE.Line.prototype.constructor=THREE.Line;
THREE.Mesh=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b!==void 0?b:new THREE.MeshBasicMaterial({color:Math.random()*16777215,wireframe:true});if(this.geometry){this.geometry.boundingSphere||this.geometry.computeBoundingSphere();this.boundRadius=a.boundingSphere.radius;if(this.geometry.morphTargets.length){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var c=0;c<this.geometry.morphTargets.length;c++){this.morphTargetInfluences.push(0);
this.morphTargetDictionary[this.geometry.morphTargets[c].name]=c}}}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(this.morphTargetDictionary[a]!==void 0)return this.morphTargetDictionary[a];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");return 0};
THREE.Bone=function(a){THREE.Object3D.call(this);this.skin=a;this.skinMatrix=new THREE.Matrix4};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;
THREE.Bone.prototype.update=function(a,b){this.matrixAutoUpdate&&(b=b|this.updateMatrix());if(b||this.matrixWorldNeedsUpdate){a?this.skinMatrix.multiply(a,this.matrix):this.skinMatrix.copy(this.matrix);this.matrixWorldNeedsUpdate=false;b=true}var c,d=this.children.length;for(c=0;c<d;c++)this.children[c].update(this.skinMatrix,b)};
THREE.SkinnedMesh=function(a,b){THREE.Mesh.call(this,a,b);this.identityMatrix=new THREE.Matrix4;this.bones=[];this.boneMatrices=[];var c,d,f,g,h,i;if(this.geometry.bones!==void 0){for(c=0;c<this.geometry.bones.length;c++){f=this.geometry.bones[c];g=f.pos;h=f.rotq;i=f.scl;d=this.addBone();d.name=f.name;d.position.set(g[0],g[1],g[2]);d.quaternion.set(h[0],h[1],h[2],h[3]);d.useQuaternion=true;i!==void 0?d.scale.set(i[0],i[1],i[2]):d.scale.set(1,1,1)}for(c=0;c<this.bones.length;c++){f=this.geometry.bones[c];
d=this.bones[c];f.parent===-1?this.add(d):this.bones[f.parent].add(d)}this.boneMatrices=new Float32Array(16*this.bones.length);this.pose()}};THREE.SkinnedMesh.prototype=new THREE.Mesh;THREE.SkinnedMesh.prototype.constructor=THREE.SkinnedMesh;THREE.SkinnedMesh.prototype.addBone=function(a){a===void 0&&(a=new THREE.Bone(this));this.bones.push(a);return a};
THREE.SkinnedMesh.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a){this.parent?this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix);this.matrixWorldNeedsUpdate=false}for(var a=0,b=this.children.length;a<b;a++){var c=this.children[a];c instanceof THREE.Bone?c.update(this.identityMatrix,false):c.updateMatrixWorld(true)}for(var b=this.bones.length,c=this.bones,d=this.boneMatrices,a=0;a<b;a++)c[a].skinMatrix.flattenToArrayOffset(d,
a*16)};
THREE.SkinnedMesh.prototype.pose=function(){this.updateMatrixWorld(true);for(var a,b=[],c=0;c<this.bones.length;c++){a=this.bones[c];var d=new THREE.Matrix4;d.getInverse(a.skinMatrix);b.push(d);a.skinMatrix.flattenToArrayOffset(this.boneMatrices,c*16)}if(this.geometry.skinVerticesA===void 0){this.geometry.skinVerticesA=[];this.geometry.skinVerticesB=[];for(a=0;a<this.geometry.skinIndices.length;a++){var c=this.geometry.vertices[a],f=this.geometry.skinIndices[a].x,g=this.geometry.skinIndices[a].y,d=
new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesA.push(b[f].multiplyVector3(d));d=new THREE.Vector3(c.x,c.y,c.z);this.geometry.skinVerticesB.push(b[g].multiplyVector3(d));if(this.geometry.skinWeights[a].x+this.geometry.skinWeights[a].y!==1){c=(1-(this.geometry.skinWeights[a].x+this.geometry.skinWeights[a].y))*0.5;this.geometry.skinWeights[a].x=this.geometry.skinWeights[a].x+c;this.geometry.skinWeights[a].y=this.geometry.skinWeights[a].y+c}}}};
THREE.Ribbon=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b};THREE.Ribbon.prototype=new THREE.Object3D;THREE.Ribbon.prototype.constructor=THREE.Ribbon;THREE.LOD=function(){THREE.Object3D.call(this);this.LODs=[]};THREE.LOD.prototype=new THREE.Object3D;THREE.LOD.prototype.constructor=THREE.LOD;THREE.LOD.prototype.supr=THREE.Object3D.prototype;
THREE.LOD.prototype.addLevel=function(a,b){b===void 0&&(b=0);for(var b=Math.abs(b),c=0;c<this.LODs.length;c++)if(b<this.LODs[c].visibleAtDistance)break;this.LODs.splice(c,0,{visibleAtDistance:b,object3D:a});this.add(a)};
THREE.LOD.prototype.update=function(a){if(this.LODs.length>1){a.matrixWorldInverse.getInverse(a.matrixWorld);a=a.matrixWorldInverse;a=-(a.n31*this.matrixWorld.n14+a.n32*this.matrixWorld.n24+a.n33*this.matrixWorld.n34+a.n34);this.LODs[0].object3D.visible=true;for(var b=1;b<this.LODs.length;b++)if(a>=this.LODs[b].visibleAtDistance){this.LODs[b-1].object3D.visible=false;this.LODs[b].object3D.visible=true}else break;for(;b<this.LODs.length;b++)this.LODs[b].object3D.visible=false}};
THREE.Sprite=function(a){THREE.Object3D.call(this);this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map!==void 0?a.map:new THREE.Texture;this.blending=a.blending!==void 0?a.blending:THREE.NormalBlending;this.blendSrc=a.blendSrc!==void 0?a.blendSrc:THREE.SrcAlphaFactor;this.blendDst=a.blendDst!==void 0?a.blendDst:THREE.OneMinusSrcAlphaFactor;this.blendEquation=a.blendEquation!==void 0?a.blendEquation:THREE.AddEquation;this.useScreenCoordinates=a.useScreenCoordinates!==
void 0?a.useScreenCoordinates:true;this.mergeWith3D=a.mergeWith3D!==void 0?a.mergeWith3D:!this.useScreenCoordinates;this.affectedByDistance=a.affectedByDistance!==void 0?a.affectedByDistance:!this.useScreenCoordinates;this.scaleByViewport=a.scaleByViewport!==void 0?a.scaleByViewport:!this.affectedByDistance;this.alignment=a.alignment instanceof THREE.Vector2?a.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=
new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1){this.matrix.scale(this.scale);this.boundRadiusScale=Math.max(this.scale.x,this.scale.y)}this.matrixWorldNeedsUpdate=true};THREE.SpriteAlignment={};
THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);
THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);THREE.Scene=function(){THREE.Object3D.call(this);this.overrideMaterial=this.fog=null;this.matrixAutoUpdate=false;this.__objects=[];this.__lights=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;
THREE.Scene.prototype.__addObject=function(a){if(a instanceof THREE.Light)this.__lights.indexOf(a)===-1&&this.__lights.push(a);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)&&this.__objects.indexOf(a)===-1){this.__objects.push(a);this.__objectsAdded.push(a);var b=this.__objectsRemoved.indexOf(a);b!==-1&&this.__objectsRemoved.splice(b,1)}for(b=0;b<a.children.length;b++)this.__addObject(a.children[b])};
THREE.Scene.prototype.__removeObject=function(a){if(a instanceof THREE.Light){var b=this.__lights.indexOf(a);b!==-1&&this.__lights.splice(b,1)}else if(!(a instanceof THREE.Camera)){b=this.__objects.indexOf(a);if(b!==-1){this.__objects.splice(b,1);this.__objectsRemoved.push(a);b=this.__objectsAdded.indexOf(a);b!==-1&&this.__objectsAdded.splice(b,1)}}for(b=0;b<a.children.length;b++)this.__removeObject(a.children[b])};
THREE.Fog=function(a,b,c){this.color=new THREE.Color(a);this.near=b!==void 0?b:1;this.far=c!==void 0?c:1E3};THREE.FogExp2=function(a,b){this.color=new THREE.Color(a);this.density=b!==void 0?b:2.5E-4};
THREE.ShaderChunk={fog_pars_fragment:"#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",fog_fragment:"#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",envmap_pars_fragment:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
envmap_fragment:"#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
envmap_pars_vertex:"#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",envmap_vertex:"#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
map_particle_pars_fragment:"#ifdef USE_MAP\nuniform sampler2D map;\n#endif",map_particle_fragment:"#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",map_pars_vertex:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",map_pars_fragment:"#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",map_vertex:"#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",map_fragment:"#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",lightmap_pars_vertex:"#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",lightmap_fragment:"#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",lightmap_vertex:"#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",lights_lambert_pars_vertex:"uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
lights_lambert_vertex:"vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
lights_phong_pars_vertex:"#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",lights_phong_vertex:"#if MAX_POINT_LIGHTS > 0\n#ifndef PHONG_PER_PIXEL\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif",
lights_phong_pars_fragment:"uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
lights_phong_fragment:"vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
color_pars_fragment:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_fragment:"#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",color_pars_vertex:"#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",skinning_vertex:"#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * gl_Position;\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
default_vertex:"#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\nvec3 transformedNormal = normalMatrix * morphedNormal;\n#else\nvec3 transformedNormal = normalMatrix * normal;\n#endif",
shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",shadowmap_fragment:"#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",shadowmap_vertex:"#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n#ifdef USE_MORPHTARGETS\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( morphed, 1.0 );\n#else\nvShadowCoord[ i ] = shadowMatrix[ i ] * objectMatrix * vec4( position, 1.0 );\n#endif\n}\n#endif",alphatest_fragment:"#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
linear_to_gamma_fragment:"#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"};
THREE.UniformsUtils={merge:function(a){var b,c,d,f={};for(b=0;b<a.length;b++){d=this.clone(a[b]);for(c in d)f[c]=d[c]}return f},clone:function(a){var b,c,d,f={};for(b in a){f[b]={};for(c in a[b]){d=a[b][c];f[b][c]=d instanceof THREE.Color||d instanceof THREE.Vector2||d instanceof THREE.Vector3||d instanceof THREE.Vector4||d instanceof THREE.Matrix4||d instanceof THREE.Texture?d.clone():d instanceof Array?d.slice():d}}return f}};
THREE.UniformsLib={common:{diffuse:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},map:{type:"t",value:0,texture:null},offsetRepeat:{type:"v4",value:new THREE.Vector4(0,0,1,1)},lightMap:{type:"t",value:2,texture:null},envMap:{type:"t",value:1,texture:null},flipEnvMap:{type:"f",value:-1},useRefract:{type:"i",value:0},reflectivity:{type:"f",value:1},refractionRatio:{type:"f",value:0.98},combine:{type:"i",value:0},morphTargetInfluences:{type:"f",value:0}},fog:{fogDensity:{type:"f",
value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},lights:{ambientLightColor:{type:"fv",value:[]},directionalLightDirection:{type:"fv",value:[]},directionalLightColor:{type:"fv",value:[]},pointLightColor:{type:"fv",value:[]},pointLightPosition:{type:"fv",value:[]},pointLightDistance:{type:"fv1",value:[]}},particle:{psColor:{type:"c",value:new THREE.Color(15658734)},opacity:{type:"f",value:1},size:{type:"f",value:1},scale:{type:"f",
value:1},map:{type:"t",value:0,texture:null},fogDensity:{type:"f",value:2.5E-4},fogNear:{type:"f",value:1},fogFar:{type:"f",value:2E3},fogColor:{type:"c",value:new THREE.Color(16777215)}},shadowmap:{shadowMap:{type:"tv",value:6,texture:[]},shadowMapSize:{type:"v2v",value:[]},shadowBias:{type:"fv1",value:[]},shadowDarkness:{type:"fv1",value:[]},shadowMatrix:{type:"m4v",value:[]}}};
THREE.ShaderLib={depth:{uniforms:{mNear:{type:"f",value:1},mFar:{type:"f",value:2E3},opacity:{type:"f",value:1}},vertexShader:"void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"},normal:{uniforms:{opacity:{type:"f",
value:1}},vertexShader:"varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",fragmentShader:"uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"},basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.shadowmap]),vertexShader:[THREE.ShaderChunk.map_pars_vertex,
THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,
THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( diffuse, opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,
THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},lambert:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},wrapRGB:{type:"v3",value:new THREE.Vector3(1,
1,1)}}]),vertexShader:["varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_lambert_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,
THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,THREE.ShaderChunk.morphnormal_vertex,THREE.ShaderChunk.lights_lambert_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,
THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,"#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,
THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},phong:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.fog,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ambient:{type:"c",value:new THREE.Color(16777215)},emissive:{type:"c",value:new THREE.Color(0)},specular:{type:"c",value:new THREE.Color(1118481)},shininess:{type:"f",value:30},wrapRGB:{type:"v3",
value:new THREE.Vector3(1,1,1)}}]),vertexShader:["varying vec3 vViewPosition;\nvarying vec3 vNormal;",THREE.ShaderChunk.map_pars_vertex,THREE.ShaderChunk.lightmap_pars_vertex,THREE.ShaderChunk.envmap_pars_vertex,THREE.ShaderChunk.lights_phong_pars_vertex,THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.skinning_pars_vertex,THREE.ShaderChunk.morphtarget_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.map_vertex,
THREE.ShaderChunk.lightmap_vertex,THREE.ShaderChunk.envmap_vertex,THREE.ShaderChunk.color_vertex,"#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;",THREE.ShaderChunk.morphnormal_vertex,"vNormal = transformedNormal;",THREE.ShaderChunk.lights_phong_vertex,THREE.ShaderChunk.skinning_vertex,THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_pars_fragment,THREE.ShaderChunk.lightmap_pars_fragment,THREE.ShaderChunk.envmap_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.lights_phong_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",THREE.ShaderChunk.map_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.lights_phong_fragment,THREE.ShaderChunk.lightmap_fragment,THREE.ShaderChunk.color_fragment,
THREE.ShaderChunk.envmap_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.linear_to_gamma_fragment,THREE.ShaderChunk.fog_fragment,"}"].join("\n")},particle_basic:{uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.particle,THREE.UniformsLib.shadowmap]),vertexShader:["uniform float size;\nuniform float scale;",THREE.ShaderChunk.color_pars_vertex,THREE.ShaderChunk.shadowmap_pars_vertex,"void main() {",THREE.ShaderChunk.color_vertex,"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
THREE.ShaderChunk.shadowmap_vertex,"}"].join("\n"),fragmentShader:["uniform vec3 psColor;\nuniform float opacity;",THREE.ShaderChunk.color_pars_fragment,THREE.ShaderChunk.map_particle_pars_fragment,THREE.ShaderChunk.fog_pars_fragment,THREE.ShaderChunk.shadowmap_pars_fragment,"void main() {\ngl_FragColor = vec4( psColor, opacity );",THREE.ShaderChunk.map_particle_fragment,THREE.ShaderChunk.alphatest_fragment,THREE.ShaderChunk.color_fragment,THREE.ShaderChunk.shadowmap_fragment,THREE.ShaderChunk.fog_fragment,
"}"].join("\n")},depthRGBA:{uniforms:{},vertexShader:[THREE.ShaderChunk.morphtarget_pars_vertex,"void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",THREE.ShaderChunk.morphtarget_vertex,THREE.ShaderChunk.default_vertex,"}"].join("\n"),fragmentShader:"vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"}};
THREE.WebGLRenderer=function(a){function b(a,b){var c=a.vertices.length,d=b.material;if(d.attributes){if(a.__webglCustomAttributesList===void 0)a.__webglCustomAttributesList=[];for(var f in d.attributes){var g=d.attributes[f];if(!g.__webglInitialized||g.createUniqueBuffers){g.__webglInitialized=true;var h=1;g.type==="v2"?h=2:g.type==="v3"?h=3:g.type==="v4"?h=4:g.type==="c"&&(h=3);g.size=h;g.array=new Float32Array(c*h);g.buffer=e.createBuffer();g.buffer.belongsToAttribute=f;g.needsUpdate=true}a.__webglCustomAttributesList.push(g)}}}
function c(a,b){if(a.material&&!(a.material instanceof THREE.MeshFaceMaterial))return a.material;if(b.materialIndex>=0)return a.geometry.materials[b.materialIndex]}function d(a){return a instanceof THREE.MeshBasicMaterial&&!a.envMap||a instanceof THREE.MeshDepthMaterial?false:a&&a.shading!==void 0&&a.shading===THREE.SmoothShading?THREE.SmoothShading:THREE.FlatShading}function f(a){return a.map||a.lightMap||a instanceof THREE.ShaderMaterial?true:false}function g(a,b,c){var d,f,g,h,i=a.vertices;h=i.length;
var j=a.colors,l=j.length,o=a.__vertexArray,k=a.__colorArray,m=a.__sortArray,r=a.__dirtyVertices,n=a.__dirtyColors,u=a.__webglCustomAttributesList;if(c.sortParticles){Ob.copy(mb);Ob.multiplySelf(c.matrixWorld);for(d=0;d<h;d++){f=i[d];Na.copy(f);Ob.multiplyVector3(Na);m[d]=[Na.z,d]}m.sort(function(a,b){return b[0]-a[0]});for(d=0;d<h;d++){f=i[m[d][1]];g=d*3;o[g]=f.x;o[g+1]=f.y;o[g+2]=f.z}for(d=0;d<l;d++){g=d*3;f=j[m[d][1]];k[g]=f.r;k[g+1]=f.g;k[g+2]=f.b}if(u){j=0;for(l=u.length;j<l;j++){i=u[j];if(i.boundTo===
void 0||i.boundTo==="vertices"){g=0;f=i.value.length;if(i.size===1)for(d=0;d<f;d++){h=m[d][1];i.array[d]=i.value[h]}else if(i.size===2)for(d=0;d<f;d++){h=m[d][1];h=i.value[h];i.array[g]=h.x;i.array[g+1]=h.y;g=g+2}else if(i.size===3)if(i.type==="c")for(d=0;d<f;d++){h=m[d][1];h=i.value[h];i.array[g]=h.r;i.array[g+1]=h.g;i.array[g+2]=h.b;g=g+3}else for(d=0;d<f;d++){h=m[d][1];h=i.value[h];i.array[g]=h.x;i.array[g+1]=h.y;i.array[g+2]=h.z;g=g+3}else if(i.size===4)for(d=0;d<f;d++){h=m[d][1];h=i.value[h];
i.array[g]=h.x;i.array[g+1]=h.y;i.array[g+2]=h.z;i.array[g+3]=h.w;g=g+4}}}}}else{if(r)for(d=0;d<h;d++){f=i[d];g=d*3;o[g]=f.x;o[g+1]=f.y;o[g+2]=f.z}if(n)for(d=0;d<l;d++){f=j[d];g=d*3;k[g]=f.r;k[g+1]=f.g;k[g+2]=f.b}if(u){j=0;for(l=u.length;j<l;j++){i=u[j];if(i.needsUpdate&&(i.boundTo===void 0||i.boundTo==="vertices")){f=i.value.length;g=0;if(i.size===1)for(d=0;d<f;d++)i.array[d]=i.value[d];else if(i.size===2)for(d=0;d<f;d++){h=i.value[d];i.array[g]=h.x;i.array[g+1]=h.y;g=g+2}else if(i.size===3)if(i.type===
"c")for(d=0;d<f;d++){h=i.value[d];i.array[g]=h.r;i.array[g+1]=h.g;i.array[g+2]=h.b;g=g+3}else for(d=0;d<f;d++){h=i.value[d];i.array[g]=h.x;i.array[g+1]=h.y;i.array[g+2]=h.z;g=g+3}else if(i.size===4)for(d=0;d<f;d++){h=i.value[d];i.array[g]=h.x;i.array[g+1]=h.y;i.array[g+2]=h.z;i.array[g+3]=h.w;g=g+4}}}}}if(r||c.sortParticles){e.bindBuffer(e.ARRAY_BUFFER,a.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,o,b)}if(n||c.sortParticles){e.bindBuffer(e.ARRAY_BUFFER,a.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,
k,b)}if(u){j=0;for(l=u.length;j<l;j++){i=u[j];if(i.needsUpdate||c.sortParticles){e.bindBuffer(e.ARRAY_BUFFER,i.buffer);e.bufferData(e.ARRAY_BUFFER,i.array,b)}}}}function h(a,b){return b.z-a.z}function i(a,b,c){if(a.length)for(var e=0,d=a.length;e<d;e++){aa=Aa=null;sa=J=Ca=Ka=Ba=-1;a[e].render(b,c,pc,qc);aa=Aa=null;sa=J=Ca=Ka=Ba=-1}}function k(a,b,c,e,d,f,g,h){var i,j,l,m;if(b){j=a.length-1;m=b=-1}else{j=0;b=a.length;m=1}for(var o=j;o!==b;o=o+m){i=a[o];if(i.render){j=i.object;l=i.buffer;if(h)i=h;else{i=
i[c];if(!i)continue;g&&C.setBlending(i.blending,i.blendEquation,i.blendSrc,i.blendDst);C.setDepthTest(i.depthTest);C.setDepthWrite(i.depthWrite);z(i.polygonOffset,i.polygonOffsetFactor,i.polygonOffsetUnits)}C.setObjectFaces(j);l instanceof THREE.BufferGeometry?C.renderBufferDirect(e,d,f,i,l,j):C.renderBuffer(e,d,f,i,l,j)}}}function j(a,b,c,e,d,f,g){for(var i,h,j=0,l=a.length;j<l;j++){i=a[j];h=i.object;if(h.visible){if(g)i=g;else{i=i[b];if(!i)continue;f&&C.setBlending(i.blending,i.blendEquation,i.blendSrc,
i.blendDst);C.setDepthTest(i.depthTest);C.setDepthWrite(i.depthWrite);z(i.polygonOffset,i.polygonOffsetFactor,i.polygonOffsetUnits)}C.renderImmediateObject(c,e,d,i,h)}}}function m(a,b,c){a.push({buffer:b,object:c,opaque:null,transparent:null})}function o(a){for(var b in a.attributes)if(a.attributes[b].needsUpdate)return true;return false}function l(a){for(var b in a.attributes)a.attributes[b].needsUpdate=false}function u(a,b){for(var c=a.length-1;c>=0;c--)a[c].object===b&&a.splice(c,1)}function r(a,
b){for(var c=a.length-1;c>=0;c--)a[c]===b&&a.splice(c,1)}function n(a,b,c,d,f){if(!d.program||d.needsUpdate){C.initMaterial(d,b,c,f);d.needsUpdate=false}if(d.morphTargets&&!f.__webglMorphTargetInfluences){f.__webglMorphTargetInfluences=new Float32Array(C.maxMorphTargets);for(var g=0,i=C.maxMorphTargets;g<i;g++)f.__webglMorphTargetInfluences[g]=0}var h=false,g=d.program,i=g.uniforms,j=d.uniforms;if(g!==Aa){e.useProgram(g);Aa=g;h=true}if(d.id!==sa){sa=d.id;h=true}if(h||a!==aa){e.uniformMatrix4fv(i.projectionMatrix,
false,a._projectionMatrixArray);a!==aa&&(aa=a)}if(h){if(c&&d.fog){j.fogColor.value=c.color;if(c instanceof THREE.Fog){j.fogNear.value=c.near;j.fogFar.value=c.far}else if(c instanceof THREE.FogExp2)j.fogDensity.value=c.density}if(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d.lights){for(var l,o=0,m=0,k=0,r,n,u,t=rc,q=t.directional.colors,z=t.directional.positions,w=t.point.colors,A=t.point.positions,J=t.point.distances,M=0,N=0,I=u=0,c=0,h=b.length;c<h;c++){l=b[c];
if(!l.onlyShadow){r=l.color;n=l.intensity;u=l.distance;if(l instanceof THREE.AmbientLight)if(C.gammaInput){o=o+r.r*r.r;m=m+r.g*r.g;k=k+r.b*r.b}else{o=o+r.r;m=m+r.g;k=k+r.b}else if(l instanceof THREE.DirectionalLight){u=M*3;if(C.gammaInput){q[u]=r.r*r.r*n*n;q[u+1]=r.g*r.g*n*n;q[u+2]=r.b*r.b*n*n}else{q[u]=r.r*n;q[u+1]=r.g*n;q[u+2]=r.b*n}nb.copy(l.matrixWorld.getPosition());nb.subSelf(l.target.matrixWorld.getPosition());nb.normalize();z[u]=nb.x;z[u+1]=nb.y;z[u+2]=nb.z;M=M+1}else if(l instanceof THREE.PointLight||
l instanceof THREE.SpotLight){I=N*3;if(C.gammaInput){w[I]=r.r*r.r*n*n;w[I+1]=r.g*r.g*n*n;w[I+2]=r.b*r.b*n*n}else{w[I]=r.r*n;w[I+1]=r.g*n;w[I+2]=r.b*n}l=l.matrixWorld.getPosition();A[I]=l.x;A[I+1]=l.y;A[I+2]=l.z;J[N]=u;N=N+1}}}c=M*3;for(h=q.length;c<h;c++)q[c]=0;c=N*3;for(h=w.length;c<h;c++)w[c]=0;t.point.length=N;t.directional.length=M;t.ambient[0]=o;t.ambient[1]=m;t.ambient[2]=k;c=rc;j.ambientLightColor.value=c.ambient;j.directionalLightColor.value=c.directional.colors;j.directionalLightDirection.value=
c.directional.positions;j.pointLightColor.value=c.point.colors;j.pointLightPosition.value=c.point.positions;j.pointLightDistance.value=c.point.distances}if(d instanceof THREE.MeshBasicMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.MeshPhongMaterial){j.opacity.value=d.opacity;C.gammaInput?j.diffuse.value.copyGammaToLinear(d.color):j.diffuse.value=d.color;(j.map.texture=d.map)&&j.offsetRepeat.value.set(d.map.offset.x,d.map.offset.y,d.map.repeat.x,d.map.repeat.y);j.lightMap.texture=
d.lightMap;j.envMap.texture=d.envMap;j.flipEnvMap.value=d.envMap instanceof THREE.WebGLRenderTargetCube?1:-1;j.reflectivity.value=d.reflectivity;j.refractionRatio.value=d.refractionRatio;j.combine.value=d.combine;j.useRefract.value=d.envMap&&d.envMap.mapping instanceof THREE.CubeRefractionMapping}if(d instanceof THREE.LineBasicMaterial){j.diffuse.value=d.color;j.opacity.value=d.opacity}else if(d instanceof THREE.ParticleBasicMaterial){j.psColor.value=d.color;j.opacity.value=d.opacity;j.size.value=
d.size;j.scale.value=H.height/2;j.map.texture=d.map}else if(d instanceof THREE.MeshPhongMaterial){j.shininess.value=d.shininess;if(C.gammaInput){j.ambient.value.copyGammaToLinear(d.ambient);j.emissive.value.copyGammaToLinear(d.emissive);j.specular.value.copyGammaToLinear(d.specular)}else{j.ambient.value=d.ambient;j.emissive.value=d.emissive;j.specular.value=d.specular}d.wrapAround&&j.wrapRGB.value.copy(d.wrapRGB)}else if(d instanceof THREE.MeshLambertMaterial){if(C.gammaInput){j.ambient.value.copyGammaToLinear(d.ambient);
j.emissive.value.copyGammaToLinear(d.emissive)}else{j.ambient.value=d.ambient;j.emissive.value=d.emissive}d.wrapAround&&j.wrapRGB.value.copy(d.wrapRGB)}else if(d instanceof THREE.MeshDepthMaterial){j.mNear.value=a.near;j.mFar.value=a.far;j.opacity.value=d.opacity}else if(d instanceof THREE.MeshNormalMaterial)j.opacity.value=d.opacity;if(f.receiveShadow&&!d._shadowPass&&j.shadowMatrix){h=c=0;for(o=b.length;h<o;h++){m=b[h];if(m.castShadow&&(m instanceof THREE.SpotLight||m instanceof THREE.DirectionalLight&&
!m.shadowCascade)){j.shadowMap.texture[c]=m.shadowMap;j.shadowMapSize.value[c]=m.shadowMapSize;j.shadowMatrix.value[c]=m.shadowMatrix;j.shadowDarkness.value[c]=m.shadowDarkness;j.shadowBias.value[c]=m.shadowBias;c++}}}b=d.uniformsList;j=0;for(c=b.length;j<c;j++)if(m=g.uniforms[b[j][1]]){h=b[j][0];k=h.type;o=h.value;if(k==="i")e.uniform1i(m,o);else if(k==="f")e.uniform1f(m,o);else if(k==="v2")e.uniform2f(m,o.x,o.y);else if(k==="v3")e.uniform3f(m,o.x,o.y,o.z);else if(k==="v4")e.uniform4f(m,o.x,o.y,
o.z,o.w);else if(k==="c")e.uniform3f(m,o.r,o.g,o.b);else if(k==="fv1")e.uniform1fv(m,o);else if(k==="fv")e.uniform3fv(m,o);else if(k==="v2v"){if(!h._array)h._array=new Float32Array(2*o.length);k=0;for(t=o.length;k<t;k++){q=k*2;h._array[q]=o[k].x;h._array[q+1]=o[k].y}e.uniform2fv(m,h._array)}else if(k==="v3v"){if(!h._array)h._array=new Float32Array(3*o.length);k=0;for(t=o.length;k<t;k++){q=k*3;h._array[q]=o[k].x;h._array[q+1]=o[k].y;h._array[q+2]=o[k].z}e.uniform3fv(m,h._array)}else if(k=="v4v"){if(!h._array)h._array=
new Float32Array(4*o.length);k=0;for(t=o.length;k<t;k++){q=k*4;h._array[q]=o[k].x;h._array[q+1]=o[k].y;h._array[q+2]=o[k].z;h._array[q+3]=o[k].w}e.uniform4fv(m,h._array)}else if(k==="m4"){if(!h._array)h._array=new Float32Array(16);o.flattenToArray(h._array);e.uniformMatrix4fv(m,false,h._array)}else if(k==="m4v"){if(!h._array)h._array=new Float32Array(16*o.length);k=0;for(t=o.length;k<t;k++)o[k].flattenToArrayOffset(h._array,k*16);e.uniformMatrix4fv(m,false,h._array)}else if(k==="t"){e.uniform1i(m,
o);if(m=h.texture)if(m.image instanceof Array&&m.image.length===6){h=m;if(h.image.length===6)if(h.needsUpdate){if(!h.image.__webglTextureCube)h.image.__webglTextureCube=e.createTexture();e.activeTexture(e.TEXTURE0+o);e.bindTexture(e.TEXTURE_CUBE_MAP,h.image.__webglTextureCube);o=[];for(m=0;m<6;m++){k=o;t=m;if(C.autoScaleCubemaps){q=h.image[m];w=Ic;if(!(q.width<=w&&q.height<=w)){A=Math.max(q.width,q.height);z=Math.floor(q.width*w/A);w=Math.floor(q.height*w/A);A=document.createElement("canvas");A.width=
z;A.height=w;A.getContext("2d").drawImage(q,0,0,q.width,q.height,0,0,z,w);q=A}}else q=h.image[m];k[t]=q}m=o[0];k=(m.width&m.width-1)===0&&(m.height&m.height-1)===0;t=G(h.format);q=G(h.type);P(e.TEXTURE_CUBE_MAP,h,k);for(m=0;m<6;m++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+m,0,t,t,q,o[m]);h.generateMipmaps&&k&&e.generateMipmap(e.TEXTURE_CUBE_MAP);h.needsUpdate=false;if(h.onUpdate)h.onUpdate()}else{e.activeTexture(e.TEXTURE0+o);e.bindTexture(e.TEXTURE_CUBE_MAP,h.image.__webglTextureCube)}}else if(m instanceof
THREE.WebGLRenderTargetCube){h=m;e.activeTexture(e.TEXTURE0+o);e.bindTexture(e.TEXTURE_CUBE_MAP,h.__webglTexture)}else C.setTexture(m,o)}else if(k==="tv"){if(!h._array){h._array=[];k=0;for(t=h.texture.length;k<t;k++)h._array[k]=o+k}e.uniform1iv(m,h._array);k=0;for(t=h.texture.length;k<t;k++)(m=h.texture[k])&&C.setTexture(m,h._array[k])}}if((d instanceof THREE.ShaderMaterial||d instanceof THREE.MeshPhongMaterial||d.envMap)&&i.cameraPosition!==null){b=a.matrixWorld.getPosition();e.uniform3f(i.cameraPosition,
b.x,b.y,b.z)}(d instanceof THREE.MeshPhongMaterial||d instanceof THREE.MeshLambertMaterial||d instanceof THREE.ShaderMaterial||d.skinning)&&i.viewMatrix!==null&&e.uniformMatrix4fv(i.viewMatrix,false,a._viewMatrixArray);d.skinning&&e.uniformMatrix4fv(i.boneGlobalMatrices,false,f.boneMatrices)}e.uniformMatrix4fv(i.modelViewMatrix,false,f._modelViewMatrixArray);i.normalMatrix&&e.uniformMatrix3fv(i.normalMatrix,false,f._normalMatrixArray);(d instanceof THREE.ShaderMaterial||d.envMap||d.skinning||f.receiveShadow)&&
i.objectMatrix!==null&&e.uniformMatrix4fv(i.objectMatrix,false,f._objectMatrixArray);return g}function t(a,b){a._modelViewMatrix.multiplyToArray(b.matrixWorldInverse,a.matrixWorld,a._modelViewMatrixArray);a._normalMatrix.getInverse(a._modelViewMatrix);a._normalMatrix.transposeIntoArray(a._normalMatrixArray)}function z(a,b,c){if(sc!==a){a?e.enable(e.POLYGON_OFFSET_FILL):e.disable(e.POLYGON_OFFSET_FILL);sc=a}if(a&&(Yb!==b||Zb!==c)){e.polygonOffset(b,c);Yb=b;Zb=c}}function w(a,b){var c;a==="fragment"?
c=e.createShader(e.FRAGMENT_SHADER):a==="vertex"&&(c=e.createShader(e.VERTEX_SHADER));e.shaderSource(c,b);e.compileShader(c);if(!e.getShaderParameter(c,e.COMPILE_STATUS)){console.error(e.getShaderInfoLog(c));console.error(b);return null}return c}function P(a,b,c){if(c){e.texParameteri(a,e.TEXTURE_WRAP_S,G(b.wrapS));e.texParameteri(a,e.TEXTURE_WRAP_T,G(b.wrapT));e.texParameteri(a,e.TEXTURE_MAG_FILTER,G(b.magFilter));e.texParameteri(a,e.TEXTURE_MIN_FILTER,G(b.minFilter))}else{e.texParameteri(a,e.TEXTURE_WRAP_S,
e.CLAMP_TO_EDGE);e.texParameteri(a,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);e.texParameteri(a,e.TEXTURE_MAG_FILTER,q(b.magFilter));e.texParameteri(a,e.TEXTURE_MIN_FILTER,q(b.minFilter))}}function A(a,b){e.bindRenderbuffer(e.RENDERBUFFER,a);if(b.depthBuffer&&!b.stencilBuffer){e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT16,b.width,b.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,a)}else if(b.depthBuffer&&b.stencilBuffer){e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_STENCIL,
b.width,b.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,a)}else e.renderbufferStorage(e.RENDERBUFFER,e.RGBA4,b.width,b.height)}function q(a){switch(a){case THREE.NearestFilter:case THREE.NearestMipMapNearestFilter:case THREE.NearestMipMapLinearFilter:return e.NEAREST;default:return e.LINEAR}}function G(a){switch(a){case THREE.RepeatWrapping:return e.REPEAT;case THREE.ClampToEdgeWrapping:return e.CLAMP_TO_EDGE;case THREE.MirroredRepeatWrapping:return e.MIRRORED_REPEAT;
case THREE.NearestFilter:return e.NEAREST;case THREE.NearestMipMapNearestFilter:return e.NEAREST_MIPMAP_NEAREST;case THREE.NearestMipMapLinearFilter:return e.NEAREST_MIPMAP_LINEAR;case THREE.LinearFilter:return e.LINEAR;case THREE.LinearMipMapNearestFilter:return e.LINEAR_MIPMAP_NEAREST;case THREE.LinearMipMapLinearFilter:return e.LINEAR_MIPMAP_LINEAR;case THREE.ByteType:return e.BYTE;case THREE.UnsignedByteType:return e.UNSIGNED_BYTE;case THREE.ShortType:return e.SHORT;case THREE.UnsignedShortType:return e.UNSIGNED_SHORT;
case THREE.IntType:return e.INT;case THREE.UnsignedIntType:return e.UNSIGNED_INT;case THREE.FloatType:return e.FLOAT;case THREE.AlphaFormat:return e.ALPHA;case THREE.RGBFormat:return e.RGB;case THREE.RGBAFormat:return e.RGBA;case THREE.LuminanceFormat:return e.LUMINANCE;case THREE.LuminanceAlphaFormat:return e.LUMINANCE_ALPHA;case THREE.AddEquation:return e.FUNC_ADD;case THREE.SubtractEquation:return e.FUNC_SUBTRACT;case THREE.ReverseSubtractEquation:return e.FUNC_REVERSE_SUBTRACT;case THREE.ZeroFactor:return e.ZERO;
case THREE.OneFactor:return e.ONE;case THREE.SrcColorFactor:return e.SRC_COLOR;case THREE.OneMinusSrcColorFactor:return e.ONE_MINUS_SRC_COLOR;case THREE.SrcAlphaFactor:return e.SRC_ALPHA;case THREE.OneMinusSrcAlphaFactor:return e.ONE_MINUS_SRC_ALPHA;case THREE.DstAlphaFactor:return e.DST_ALPHA;case THREE.OneMinusDstAlphaFactor:return e.ONE_MINUS_DST_ALPHA;case THREE.DstColorFactor:return e.DST_COLOR;case THREE.OneMinusDstColorFactor:return e.ONE_MINUS_DST_COLOR;case THREE.SrcAlphaSaturateFactor:return e.SRC_ALPHA_SATURATE}return 0}
console.log("THREE.WebGLRenderer",THREE.REVISION);var a=a||{},H=a.canvas!==void 0?a.canvas:document.createElement("canvas"),M=a.precision!==void 0?a.precision:"highp",I=a.alpha!==void 0?a.alpha:true,K=a.premultipliedAlpha!==void 0?a.premultipliedAlpha:true,N=a.antialias!==void 0?a.antialias:false,ja=a.stencil!==void 0?a.stencil:true,oa=a.preserveDrawingBuffer!==void 0?a.preserveDrawingBuffer:false,ka=a.clearColor!==void 0?new THREE.Color(a.clearColor):new THREE.Color(0),Y=a.clearAlpha!==void 0?a.clearAlpha:
0,S=a.maxLights!==void 0?a.maxLights:4;this.domElement=H;this.context=null;this.autoUpdateScene=this.autoUpdateObjects=this.sortObjects=this.autoClearStencil=this.autoClearDepth=this.autoClearColor=this.autoClear=true;this.shadowMapEnabled=this.physicallyBasedShading=this.gammaOutput=this.gammaInput=false;this.shadowMapCullFrontFaces=this.shadowMapSoft=this.shadowMapAutoUpdate=true;this.shadowMapCascade=this.shadowMapDebug=false;this.maxMorphTargets=8;this.maxMorphNormals=4;this.autoScaleCubemaps=
true;this.renderPluginsPre=[];this.renderPluginsPost=[];this.info={memory:{programs:0,geometries:0,textures:0},render:{calls:0,vertices:0,faces:0,points:0}};var C=this,e,Wa=[],Aa=null,T=null,sa=-1,J=null,aa=null,ta=0,xa=null,U=null,Ba=null,Ma=null,Ra=null,Sa=null,Ka=null,Ca=null,sc=null,Yb=null,Zb=null,tb=null,$b=0,Hb=0,Pb=0,ac=0,pc=0,qc=0,Ib=new THREE.Frustum,mb=new THREE.Matrix4,Ob=new THREE.Matrix4,Na=new THREE.Vector4,nb=new THREE.Vector3,rc={ambient:[0,0,0],directional:{length:0,colors:[],positions:[]},
point:{length:0,colors:[],positions:[],distances:[]}};e=function(){var a;try{if(!(a=H.getContext("experimental-webgl",{alpha:I,premultipliedAlpha:K,antialias:N,stencil:ja,preserveDrawingBuffer:oa})))throw"Error creating WebGL context.";}catch(b){console.error(b)}return a}();e.clearColor(0,0,0,1);e.clearDepth(1);e.clearStencil(0);e.enable(e.DEPTH_TEST);e.depthFunc(e.LEQUAL);e.frontFace(e.CCW);e.cullFace(e.BACK);e.enable(e.CULL_FACE);e.enable(e.BLEND);e.blendEquation(e.FUNC_ADD);e.blendFunc(e.SRC_ALPHA,
e.ONE_MINUS_SRC_ALPHA);e.clearColor(ka.r,ka.g,ka.b,Y);this.context=e;var bc=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS);e.getParameter(e.MAX_TEXTURE_SIZE);var Ic=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE);this.getContext=function(){return e};this.supportsVertexTextures=function(){return bc>0};this.setSize=function(a,b){H.width=a;H.height=b;this.setViewport(0,0,H.width,H.height)};this.setViewport=function(a,b,c,d){$b=a;Hb=b;Pb=c;ac=d;e.viewport($b,Hb,Pb,ac)};this.setScissor=function(a,b,c,d){e.scissor(a,
b,c,d)};this.enableScissorTest=function(a){a?e.enable(e.SCISSOR_TEST):e.disable(e.SCISSOR_TEST)};this.setClearColorHex=function(a,b){ka.setHex(a);Y=b;e.clearColor(ka.r,ka.g,ka.b,Y)};this.setClearColor=function(a,b){ka.copy(a);Y=b;e.clearColor(ka.r,ka.g,ka.b,Y)};this.getClearColor=function(){return ka};this.getClearAlpha=function(){return Y};this.clear=function(a,b,c){var d=0;if(a===void 0||a)d=d|e.COLOR_BUFFER_BIT;if(b===void 0||b)d=d|e.DEPTH_BUFFER_BIT;if(c===void 0||c)d=d|e.STENCIL_BUFFER_BIT;e.clear(d)};
this.clearTarget=function(a,b,c,d){this.setRenderTarget(a);this.clear(b,c,d)};this.addPostPlugin=function(a){a.init(this);this.renderPluginsPost.push(a)};this.addPrePlugin=function(a){a.init(this);this.renderPluginsPre.push(a)};this.deallocateObject=function(a){if(a.__webglInit){a.__webglInit=false;delete a._modelViewMatrix;delete a._normalMatrix;delete a._normalMatrixArray;delete a._modelViewMatrixArray;delete a._objectMatrixArray;if(a instanceof THREE.Mesh)for(var b in a.geometry.geometryGroups){var c=
a.geometry.geometryGroups[b];e.deleteBuffer(c.__webglVertexBuffer);e.deleteBuffer(c.__webglNormalBuffer);e.deleteBuffer(c.__webglTangentBuffer);e.deleteBuffer(c.__webglColorBuffer);e.deleteBuffer(c.__webglUVBuffer);e.deleteBuffer(c.__webglUV2Buffer);e.deleteBuffer(c.__webglSkinVertexABuffer);e.deleteBuffer(c.__webglSkinVertexBBuffer);e.deleteBuffer(c.__webglSkinIndicesBuffer);e.deleteBuffer(c.__webglSkinWeightsBuffer);e.deleteBuffer(c.__webglFaceBuffer);e.deleteBuffer(c.__webglLineBuffer);var d=void 0,
f=void 0;if(c.numMorphTargets){d=0;for(f=c.numMorphTargets;d<f;d++)e.deleteBuffer(c.__webglMorphTargetsBuffers[d])}if(c.numMorphNormals){d=0;for(f=c.numMorphNormals;d<f;d++)e.deleteBuffer(c.__webglMorphNormalsBuffers[d])}if(c.__webglCustomAttributesList){d=void 0;for(d in c.__webglCustomAttributesList)e.deleteBuffer(c.__webglCustomAttributesList[d].buffer)}C.info.memory.geometries--}else if(a instanceof THREE.Ribbon){a=a.geometry;e.deleteBuffer(a.__webglVertexBuffer);e.deleteBuffer(a.__webglColorBuffer);
C.info.memory.geometries--}else if(a instanceof THREE.Line){a=a.geometry;e.deleteBuffer(a.__webglVertexBuffer);e.deleteBuffer(a.__webglColorBuffer);C.info.memory.geometries--}else if(a instanceof THREE.ParticleSystem){a=a.geometry;e.deleteBuffer(a.__webglVertexBuffer);e.deleteBuffer(a.__webglColorBuffer);C.info.memory.geometries--}}};this.deallocateTexture=function(a){if(a.__webglInit){a.__webglInit=false;e.deleteTexture(a.__webglTexture);C.info.memory.textures--}};this.deallocateRenderTarget=function(a){if(a&&
a.__webglTexture){e.deleteTexture(a.__webglTexture);if(a instanceof THREE.WebGLRenderTargetCube)for(var b=0;b<6;b++){e.deleteFramebuffer(a.__webglFramebuffer[b]);e.deleteRenderbuffer(a.__webglRenderbuffer[b])}else{e.deleteFramebuffer(a.__webglFramebuffer);e.deleteRenderbuffer(a.__webglRenderbuffer)}}};this.updateShadowMap=function(a,b){Aa=null;sa=J=Ca=Ka=Ba=-1;this.shadowMapPlugin.update(a,b)};this.renderBufferImmediate=function(a,b,c){if(!a.__webglVertexBuffer)a.__webglVertexBuffer=e.createBuffer();
if(!a.__webglNormalBuffer)a.__webglNormalBuffer=e.createBuffer();if(a.hasPos){e.bindBuffer(e.ARRAY_BUFFER,a.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,a.positionArray,e.DYNAMIC_DRAW);e.enableVertexAttribArray(b.attributes.position);e.vertexAttribPointer(b.attributes.position,3,e.FLOAT,false,0,0)}if(a.hasNormal){e.bindBuffer(e.ARRAY_BUFFER,a.__webglNormalBuffer);if(c===THREE.FlatShading){var d,f,g,h,i,j,k,m,o,l,r=a.count*3;for(l=0;l<r;l=l+9){c=a.normalArray;d=c[l];f=c[l+1];g=c[l+2];h=c[l+3];
j=c[l+4];m=c[l+5];i=c[l+6];k=c[l+7];o=c[l+8];d=(d+h+i)/3;f=(f+j+k)/3;g=(g+m+o)/3;c[l]=d;c[l+1]=f;c[l+2]=g;c[l+3]=d;c[l+4]=f;c[l+5]=g;c[l+6]=d;c[l+7]=f;c[l+8]=g}}e.bufferData(e.ARRAY_BUFFER,a.normalArray,e.DYNAMIC_DRAW);e.enableVertexAttribArray(b.attributes.normal);e.vertexAttribPointer(b.attributes.normal,3,e.FLOAT,false,0,0)}e.drawArrays(e.TRIANGLES,0,a.count);a.count=0};this.renderBufferDirect=function(a,b,c,d,f,g){if(d.opacity!==0){c=n(a,b,c,d,g);a=c.attributes;b=false;d=f.id*16777215+c.id*2+
(d.wireframe?1:0);if(d!==J){J=d;b=true}if(g instanceof THREE.Mesh){g=f.offsets;d=0;for(c=g.length;d<c;++d){if(b){e.bindBuffer(e.ARRAY_BUFFER,f.vertexPositionBuffer);e.vertexAttribPointer(a.position,f.vertexPositionBuffer.itemSize,e.FLOAT,false,0,g[d].index*12);if(a.normal>=0&&f.vertexNormalBuffer){e.bindBuffer(e.ARRAY_BUFFER,f.vertexNormalBuffer);e.vertexAttribPointer(a.normal,f.vertexNormalBuffer.itemSize,e.FLOAT,false,0,g[d].index*12)}if(a.uv>=0&&f.vertexUvBuffer)if(f.vertexUvBuffer){e.bindBuffer(e.ARRAY_BUFFER,
f.vertexUvBuffer);e.vertexAttribPointer(a.uv,f.vertexUvBuffer.itemSize,e.FLOAT,false,0,g[d].index*8);e.enableVertexAttribArray(a.uv)}else e.disableVertexAttribArray(a.uv);if(a.color>=0&&f.vertexColorBuffer){e.bindBuffer(e.ARRAY_BUFFER,f.vertexColorBuffer);e.vertexAttribPointer(a.color,f.vertexColorBuffer.itemSize,e.FLOAT,false,0,g[d].index*16)}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,f.vertexIndexBuffer)}e.drawElements(e.TRIANGLES,g[d].count,e.UNSIGNED_SHORT,g[d].start*2);C.info.render.calls++;C.info.render.vertices=
C.info.render.vertices+g[d].count;C.info.render.faces=C.info.render.faces+g[d].count/3}}}};this.renderBuffer=function(a,b,c,d,f,g){if(d.opacity!==0){var h,i,c=n(a,b,c,d,g),b=c.attributes,a=false,c=f.id*16777215+c.id*2+(d.wireframe?1:0);if(c!==J){J=c;a=true}if(!d.morphTargets&&b.position>=0){if(a){e.bindBuffer(e.ARRAY_BUFFER,f.__webglVertexBuffer);e.vertexAttribPointer(b.position,3,e.FLOAT,false,0,0)}}else if(g.morphTargetBase){c=d.program.attributes;if(g.morphTargetBase!==-1){e.bindBuffer(e.ARRAY_BUFFER,
f.__webglMorphTargetsBuffers[g.morphTargetBase]);e.vertexAttribPointer(c.position,3,e.FLOAT,false,0,0)}else if(c.position>=0){e.bindBuffer(e.ARRAY_BUFFER,f.__webglVertexBuffer);e.vertexAttribPointer(c.position,3,e.FLOAT,false,0,0)}if(g.morphTargetForcedOrder.length){h=0;var j=g.morphTargetForcedOrder;for(i=g.morphTargetInfluences;h<d.numSupportedMorphTargets&&h<j.length;){e.bindBuffer(e.ARRAY_BUFFER,f.__webglMorphTargetsBuffers[j[h]]);e.vertexAttribPointer(c["morphTarget"+h],3,e.FLOAT,false,0,0);
if(d.morphNormals){e.bindBuffer(e.ARRAY_BUFFER,f.__webglMorphNormalsBuffers[j[h]]);e.vertexAttribPointer(c["morphNormal"+h],3,e.FLOAT,false,0,0)}g.__webglMorphTargetInfluences[h]=i[j[h]];h++}}else{var j=[],l=-1,k=0;i=g.morphTargetInfluences;var m,o=i.length;h=0;for(g.morphTargetBase!==-1&&(j[g.morphTargetBase]=true);h<d.numSupportedMorphTargets;){for(m=0;m<o;m++)if(!j[m]&&i[m]>l){k=m;l=i[k]}e.bindBuffer(e.ARRAY_BUFFER,f.__webglMorphTargetsBuffers[k]);e.vertexAttribPointer(c["morphTarget"+h],3,e.FLOAT,
false,0,0);if(d.morphNormals){e.bindBuffer(e.ARRAY_BUFFER,f.__webglMorphNormalsBuffers[k]);e.vertexAttribPointer(c["morphNormal"+h],3,e.FLOAT,false,0,0)}g.__webglMorphTargetInfluences[h]=l;j[k]=1;l=-1;h++}}d.program.uniforms.morphTargetInfluences!==null&&e.uniform1fv(d.program.uniforms.morphTargetInfluences,g.__webglMorphTargetInfluences)}if(a){if(f.__webglCustomAttributesList){h=0;for(i=f.__webglCustomAttributesList.length;h<i;h++){c=f.__webglCustomAttributesList[h];if(b[c.buffer.belongsToAttribute]>=
0){e.bindBuffer(e.ARRAY_BUFFER,c.buffer);e.vertexAttribPointer(b[c.buffer.belongsToAttribute],c.size,e.FLOAT,false,0,0)}}}if(b.color>=0){e.bindBuffer(e.ARRAY_BUFFER,f.__webglColorBuffer);e.vertexAttribPointer(b.color,3,e.FLOAT,false,0,0)}if(b.normal>=0){e.bindBuffer(e.ARRAY_BUFFER,f.__webglNormalBuffer);e.vertexAttribPointer(b.normal,3,e.FLOAT,false,0,0)}if(b.tangent>=0){e.bindBuffer(e.ARRAY_BUFFER,f.__webglTangentBuffer);e.vertexAttribPointer(b.tangent,4,e.FLOAT,false,0,0)}if(b.uv>=0)if(f.__webglUVBuffer){e.bindBuffer(e.ARRAY_BUFFER,
f.__webglUVBuffer);e.vertexAttribPointer(b.uv,2,e.FLOAT,false,0,0);e.enableVertexAttribArray(b.uv)}else e.disableVertexAttribArray(b.uv);if(b.uv2>=0)if(f.__webglUV2Buffer){e.bindBuffer(e.ARRAY_BUFFER,f.__webglUV2Buffer);e.vertexAttribPointer(b.uv2,2,e.FLOAT,false,0,0);e.enableVertexAttribArray(b.uv2)}else e.disableVertexAttribArray(b.uv2);if(d.skinning&&b.skinVertexA>=0&&b.skinVertexB>=0&&b.skinIndex>=0&&b.skinWeight>=0){e.bindBuffer(e.ARRAY_BUFFER,f.__webglSkinVertexABuffer);e.vertexAttribPointer(b.skinVertexA,
4,e.FLOAT,false,0,0);e.bindBuffer(e.ARRAY_BUFFER,f.__webglSkinVertexBBuffer);e.vertexAttribPointer(b.skinVertexB,4,e.FLOAT,false,0,0);e.bindBuffer(e.ARRAY_BUFFER,f.__webglSkinIndicesBuffer);e.vertexAttribPointer(b.skinIndex,4,e.FLOAT,false,0,0);e.bindBuffer(e.ARRAY_BUFFER,f.__webglSkinWeightsBuffer);e.vertexAttribPointer(b.skinWeight,4,e.FLOAT,false,0,0)}}if(g instanceof THREE.Mesh){if(d.wireframe){d=d.wireframeLinewidth;if(d!==tb){e.lineWidth(d);tb=d}a&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,f.__webglLineBuffer);
e.drawElements(e.LINES,f.__webglLineCount,e.UNSIGNED_SHORT,0)}else{a&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,f.__webglFaceBuffer);e.drawElements(e.TRIANGLES,f.__webglFaceCount,e.UNSIGNED_SHORT,0)}C.info.render.calls++;C.info.render.vertices=C.info.render.vertices+f.__webglFaceCount;C.info.render.faces=C.info.render.faces+f.__webglFaceCount/3}else if(g instanceof THREE.Line){g=g.type===THREE.LineStrip?e.LINE_STRIP:e.LINES;d=d.linewidth;if(d!==tb){e.lineWidth(d);tb=d}e.drawArrays(g,0,f.__webglLineCount);
C.info.render.calls++}else if(g instanceof THREE.ParticleSystem){e.drawArrays(e.POINTS,0,f.__webglParticleCount);C.info.render.calls++;C.info.render.points=C.info.render.points+f.__webglParticleCount}else if(g instanceof THREE.Ribbon){e.drawArrays(e.TRIANGLE_STRIP,0,f.__webglVertexCount);C.info.render.calls++}}};this.render=function(a,b,c,d){var f,g,l,m,o=a.__lights,r=a.fog;sa=-1;if(b.parent===void 0){console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it...");a.add(b)}this.autoUpdateScene&&
a.updateMatrixWorld();if(!b._viewMatrixArray)b._viewMatrixArray=new Float32Array(16);if(!b._projectionMatrixArray)b._projectionMatrixArray=new Float32Array(16);b.matrixWorldInverse.getInverse(b.matrixWorld);b.matrixWorldInverse.flattenToArray(b._viewMatrixArray);b.projectionMatrix.flattenToArray(b._projectionMatrixArray);mb.multiply(b.projectionMatrix,b.matrixWorldInverse);Ib.setFromMatrix(mb);this.autoUpdateObjects&&this.initWebGLObjects(a);i(this.renderPluginsPre,a,b);C.info.render.calls=0;C.info.render.vertices=
0;C.info.render.faces=0;C.info.render.points=0;this.setRenderTarget(c);(this.autoClear||d)&&this.clear(this.autoClearColor,this.autoClearDepth,this.autoClearStencil);m=a.__webglObjects;d=0;for(f=m.length;d<f;d++){g=m[d];l=g.object;g.render=false;if(l.visible&&(!(l instanceof THREE.Mesh||l instanceof THREE.ParticleSystem)||!l.frustumCulled||Ib.contains(l))){l.matrixWorld.flattenToArray(l._objectMatrixArray);t(l,b);var n=g,u=n.object,q=n.buffer,w=void 0,w=w=void 0,w=u.material;if(w instanceof THREE.MeshFaceMaterial){w=
q.materialIndex;if(w>=0){w=u.geometry.materials[w];if(w.transparent){n.transparent=w;n.opaque=null}else{n.opaque=w;n.transparent=null}}}else if(w)if(w.transparent){n.transparent=w;n.opaque=null}else{n.opaque=w;n.transparent=null}g.render=true;if(this.sortObjects)if(l.renderDepth)g.z=l.renderDepth;else{Na.copy(l.matrixWorld.getPosition());mb.multiplyVector3(Na);g.z=Na.z}}}this.sortObjects&&m.sort(h);m=a.__webglObjectsImmediate;d=0;for(f=m.length;d<f;d++){g=m[d];l=g.object;if(l.visible){l.matrixAutoUpdate&&
l.matrixWorld.flattenToArray(l._objectMatrixArray);t(l,b);l=g.object.material;if(l.transparent){g.transparent=l;g.opaque=null}else{g.opaque=l;g.transparent=null}}}if(a.overrideMaterial){d=a.overrideMaterial;this.setBlending(d.blending,d.blendEquation,d.blendSrc,d.blendDst);this.setDepthTest(d.depthTest);this.setDepthWrite(d.depthWrite);z(d.polygonOffset,d.polygonOffsetFactor,d.polygonOffsetUnits);k(a.__webglObjects,false,"",b,o,r,true,d);j(a.__webglObjectsImmediate,"",b,o,r,false,d)}else{this.setBlending(THREE.NormalBlending);
k(a.__webglObjects,true,"opaque",b,o,r,false);j(a.__webglObjectsImmediate,"opaque",b,o,r,false);k(a.__webglObjects,false,"transparent",b,o,r,true);j(a.__webglObjectsImmediate,"transparent",b,o,r,true)}i(this.renderPluginsPost,a,b);if(c&&c.generateMipmaps&&c.minFilter!==THREE.NearestFilter&&c.minFilter!==THREE.LinearFilter)if(c instanceof THREE.WebGLRenderTargetCube){e.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture);e.generateMipmap(e.TEXTURE_CUBE_MAP);e.bindTexture(e.TEXTURE_CUBE_MAP,null)}else{e.bindTexture(e.TEXTURE_2D,
c.__webglTexture);e.generateMipmap(e.TEXTURE_2D);e.bindTexture(e.TEXTURE_2D,null)}this.setDepthTest(true);this.setDepthWrite(true)};this.renderImmediateObject=function(a,b,c,d,f){var g=n(a,b,c,d,f);J=-1;C.setObjectFaces(f);f.immediateRenderCallback?f.immediateRenderCallback(g,e,Ib):f.render(function(a){C.renderBufferImmediate(a,g,d.shading)})};this.initWebGLObjects=function(a){if(!a.__webglObjects){a.__webglObjects=[];a.__webglObjectsImmediate=[];a.__webglSprites=[];a.__webglFlares=[]}for(;a.__objectsAdded.length;){var h=
a.__objectsAdded[0],i=a,j=void 0,k=void 0,n=void 0;if(!h.__webglInit){h.__webglInit=true;h._modelViewMatrix=new THREE.Matrix4;h._normalMatrix=new THREE.Matrix3;h._normalMatrixArray=new Float32Array(9);h._modelViewMatrixArray=new Float32Array(16);h._objectMatrixArray=new Float32Array(16);h.matrixWorld.flattenToArray(h._objectMatrixArray);if(h instanceof THREE.Mesh){k=h.geometry;if(k instanceof THREE.Geometry){if(k.geometryGroups===void 0){var q=k,t=void 0,w=void 0,z=void 0,A=void 0,H=void 0,G=void 0,
I=void 0,J={},M=q.morphTargets.length,N=q.morphNormals.length;q.geometryGroups={};t=0;for(w=q.faces.length;t<w;t++){z=q.faces[t];A=z.materialIndex;G=A!==void 0?A:-1;J[G]===void 0&&(J[G]={hash:G,counter:0});I=J[G].hash+"_"+J[G].counter;q.geometryGroups[I]===void 0&&(q.geometryGroups[I]={faces3:[],faces4:[],materialIndex:A,vertices:0,numMorphTargets:M,numMorphNormals:N});H=z instanceof THREE.Face3?3:4;if(q.geometryGroups[I].vertices+H>65535){J[G].counter=J[G].counter+1;I=J[G].hash+"_"+J[G].counter;
q.geometryGroups[I]===void 0&&(q.geometryGroups[I]={faces3:[],faces4:[],materialIndex:A,vertices:0,numMorphTargets:M,numMorphNormals:N})}z instanceof THREE.Face3?q.geometryGroups[I].faces3.push(t):q.geometryGroups[I].faces4.push(t);q.geometryGroups[I].vertices=q.geometryGroups[I].vertices+H}q.geometryGroupsList=[];var P=void 0;for(P in q.geometryGroups){q.geometryGroups[P].id=ta++;q.geometryGroupsList.push(q.geometryGroups[P])}}for(j in k.geometryGroups){n=k.geometryGroups[j];if(!n.__webglVertexBuffer){var K=
n;K.__webglVertexBuffer=e.createBuffer();K.__webglNormalBuffer=e.createBuffer();K.__webglTangentBuffer=e.createBuffer();K.__webglColorBuffer=e.createBuffer();K.__webglUVBuffer=e.createBuffer();K.__webglUV2Buffer=e.createBuffer();K.__webglSkinVertexABuffer=e.createBuffer();K.__webglSkinVertexBBuffer=e.createBuffer();K.__webglSkinIndicesBuffer=e.createBuffer();K.__webglSkinWeightsBuffer=e.createBuffer();K.__webglFaceBuffer=e.createBuffer();K.__webglLineBuffer=e.createBuffer();var S=void 0,U=void 0;
if(K.numMorphTargets){K.__webglMorphTargetsBuffers=[];S=0;for(U=K.numMorphTargets;S<U;S++)K.__webglMorphTargetsBuffers.push(e.createBuffer())}if(K.numMorphNormals){K.__webglMorphNormalsBuffers=[];S=0;for(U=K.numMorphNormals;S<U;S++)K.__webglMorphNormalsBuffers.push(e.createBuffer())}C.info.memory.geometries++;var ca=n,Y=h,aa=Y.geometry,ja=ca.faces3,ka=ca.faces4,T=ja.length*3+ka.length*4,sa=ja.length*1+ka.length*2,xa=ja.length*3+ka.length*4,oa=c(Y,ca),Aa=f(oa),Ba=d(oa),Ma=oa.vertexColors?oa.vertexColors:
false;ca.__vertexArray=new Float32Array(T*3);if(Ba)ca.__normalArray=new Float32Array(T*3);if(aa.hasTangents)ca.__tangentArray=new Float32Array(T*4);if(Ma)ca.__colorArray=new Float32Array(T*3);if(Aa){if(aa.faceUvs.length>0||aa.faceVertexUvs.length>0)ca.__uvArray=new Float32Array(T*2);if(aa.faceUvs.length>1||aa.faceVertexUvs.length>1)ca.__uv2Array=new Float32Array(T*2)}if(Y.geometry.skinWeights.length&&Y.geometry.skinIndices.length){ca.__skinVertexAArray=new Float32Array(T*4);ca.__skinVertexBArray=
new Float32Array(T*4);ca.__skinIndexArray=new Float32Array(T*4);ca.__skinWeightArray=new Float32Array(T*4)}ca.__faceArray=new Uint16Array(sa*3);ca.__lineArray=new Uint16Array(xa*2);var Ca=void 0,Ka=void 0;if(ca.numMorphTargets){ca.__morphTargetsArrays=[];Ca=0;for(Ka=ca.numMorphTargets;Ca<Ka;Ca++)ca.__morphTargetsArrays.push(new Float32Array(T*3))}if(ca.numMorphNormals){ca.__morphNormalsArrays=[];Ca=0;for(Ka=ca.numMorphNormals;Ca<Ka;Ca++)ca.__morphNormalsArrays.push(new Float32Array(T*3))}ca.__webglFaceCount=
sa*3;ca.__webglLineCount=xa*2;if(oa.attributes){if(ca.__webglCustomAttributesList===void 0)ca.__webglCustomAttributesList=[];var Ra=void 0;for(Ra in oa.attributes){var Sa=oa.attributes[Ra],La={},Wa;for(Wa in Sa)La[Wa]=Sa[Wa];if(!La.__webglInitialized||La.createUniqueBuffers){La.__webglInitialized=true;var Na=1;La.type==="v2"?Na=2:La.type==="v3"?Na=3:La.type==="v4"?Na=4:La.type==="c"&&(Na=3);La.size=Na;La.array=new Float32Array(T*Na);La.buffer=e.createBuffer();La.buffer.belongsToAttribute=Ra;Sa.needsUpdate=
true;La.__original=Sa}ca.__webglCustomAttributesList.push(La)}}ca.__inittedArrays=true;k.__dirtyVertices=true;k.__dirtyMorphTargets=true;k.__dirtyElements=true;k.__dirtyUvs=true;k.__dirtyNormals=true;k.__dirtyTangents=true;k.__dirtyColors=true}}}}else if(h instanceof THREE.Ribbon){k=h.geometry;if(!k.__webglVertexBuffer){var nb=k;nb.__webglVertexBuffer=e.createBuffer();nb.__webglColorBuffer=e.createBuffer();C.info.memory.geometries++;var mb=k,tb=mb.vertices.length;mb.__vertexArray=new Float32Array(tb*
3);mb.__colorArray=new Float32Array(tb*3);mb.__webglVertexCount=tb;k.__dirtyVertices=true;k.__dirtyColors=true}}else if(h instanceof THREE.Line){k=h.geometry;if(!k.__webglVertexBuffer){var Ob=k;Ob.__webglVertexBuffer=e.createBuffer();Ob.__webglColorBuffer=e.createBuffer();C.info.memory.geometries++;var cc=k,$b=h,Hb=cc.vertices.length;cc.__vertexArray=new Float32Array(Hb*3);cc.__colorArray=new Float32Array(Hb*3);cc.__webglLineCount=Hb;b(cc,$b);k.__dirtyVertices=true;k.__dirtyColors=true}}else if(h instanceof
THREE.ParticleSystem){k=h.geometry;if(!k.__webglVertexBuffer){var Pb=k;Pb.__webglVertexBuffer=e.createBuffer();Pb.__webglColorBuffer=e.createBuffer();C.info.geometries++;var Qb=k,ac=h,Ib=Qb.vertices.length;Qb.__vertexArray=new Float32Array(Ib*3);Qb.__colorArray=new Float32Array(Ib*3);Qb.__sortArray=[];Qb.__webglParticleCount=Ib;b(Qb,ac);k.__dirtyVertices=true;k.__dirtyColors=true}}}if(!h.__webglActive){if(h instanceof THREE.Mesh){k=h.geometry;if(k instanceof THREE.BufferGeometry)m(i.__webglObjects,
k,h);else for(j in k.geometryGroups){n=k.geometryGroups[j];m(i.__webglObjects,n,h)}}else if(h instanceof THREE.Ribbon||h instanceof THREE.Line||h instanceof THREE.ParticleSystem){k=h.geometry;m(i.__webglObjects,k,h)}else h instanceof THREE.ImmediateRenderObject||h.immediateRenderCallback?i.__webglObjectsImmediate.push({object:h,opaque:null,transparent:null}):h instanceof THREE.Sprite?i.__webglSprites.push(h):h instanceof THREE.LensFlare&&i.__webglFlares.push(h);h.__webglActive=true}a.__objectsAdded.splice(0,
1)}for(;a.__objectsRemoved.length;){var Oa=a.__objectsRemoved[0],tc=a;Oa instanceof THREE.Mesh||Oa instanceof THREE.ParticleSystem||Oa instanceof THREE.Ribbon||Oa instanceof THREE.Line?u(tc.__webglObjects,Oa):Oa instanceof THREE.Sprite?r(tc.__webglSprites,Oa):Oa instanceof THREE.LensFlare?r(tc.__webglFlares,Oa):(Oa instanceof THREE.ImmediateRenderObject||Oa.immediateRenderCallback)&&u(tc.__webglObjectsImmediate,Oa);Oa.__webglActive=false;a.__objectsRemoved.splice(0,1)}for(var Jc=0,pc=a.__webglObjects.length;Jc<
pc;Jc++){var Ua=a.__webglObjects[Jc].object,R=Ua.geometry,dc=void 0,Rb=void 0,Fa=void 0;if(Ua instanceof THREE.Mesh)if(R instanceof THREE.BufferGeometry){R.__dirtyVertices=false;R.__dirtyElements=false;R.__dirtyUvs=false;R.__dirtyNormals=false;R.__dirtyColors=false}else{for(var Kc=0,qc=R.geometryGroupsList.length;Kc<qc;Kc++){dc=R.geometryGroupsList[Kc];Fa=c(Ua,dc);Rb=Fa.attributes&&o(Fa);if(R.__dirtyVertices||R.__dirtyMorphTargets||R.__dirtyElements||R.__dirtyUvs||R.__dirtyNormals||R.__dirtyColors||
R.__dirtyTangents||Rb){var O=dc,rc=Ua,Ha=e.DYNAMIC_DRAW,sc=!R.dynamic,Jb=Fa;if(O.__inittedArrays){var Yb=d(Jb),Lc=Jb.vertexColors?Jb.vertexColors:false,Zb=f(Jb),uc=Yb===THREE.SmoothShading,v=void 0,B=void 0,Ta=void 0,y=void 0,Sb=void 0,ub=void 0,Va=void 0,vc=void 0,ob=void 0,Tb=void 0,Ub=void 0,D=void 0,E=void 0,F=void 0,Z=void 0,Xa=void 0,Ya=void 0,Za=void 0,ec=void 0,$a=void 0,ab=void 0,bb=void 0,fc=void 0,cb=void 0,db=void 0,eb=void 0,gc=void 0,fb=void 0,gb=void 0,hb=void 0,hc=void 0,ib=void 0,
jb=void 0,kb=void 0,ic=void 0,vb=void 0,wb=void 0,xb=void 0,wc=void 0,yb=void 0,zb=void 0,Ab=void 0,xc=void 0,V=void 0,bc=void 0,Bb=void 0,Vb=void 0,Wb=void 0,ua=void 0,Tc=void 0,qa=void 0,ra=void 0,Cb=void 0,pb=void 0,la=0,pa=0,qb=0,rb=0,Pa=0,za=0,$=0,Da=0,ma=0,x=0,L=0,s=0,Ia=void 0,va=O.__vertexArray,jc=O.__uvArray,kc=O.__uv2Array,Qa=O.__normalArray,da=O.__tangentArray,wa=O.__colorArray,ea=O.__skinVertexAArray,fa=O.__skinVertexBArray,ga=O.__skinIndexArray,ha=O.__skinWeightArray,Mc=O.__morphTargetsArrays,
Nc=O.__morphNormalsArrays,Oc=O.__webglCustomAttributesList,p=void 0,lb=O.__faceArray,Ja=O.__lineArray,Ea=rc.geometry,Ic=Ea.__dirtyElements,Uc=Ea.__dirtyUvs,ad=Ea.__dirtyNormals,bd=Ea.__dirtyTangents,cd=Ea.__dirtyColors,dd=Ea.__dirtyMorphTargets,Kb=Ea.vertices,W=O.faces3,X=O.faces4,na=Ea.faces,Pc=Ea.faceVertexUvs[0],Qc=Ea.faceVertexUvs[1],Lb=Ea.skinVerticesA,Mb=Ea.skinVerticesB,Nb=Ea.skinIndices,Db=Ea.skinWeights,Eb=Ea.morphTargets,yc=Ea.morphNormals;if(Ea.__dirtyVertices){v=0;for(B=W.length;v<B;v++){y=
na[W[v]];D=Kb[y.a];E=Kb[y.b];F=Kb[y.c];va[pa]=D.x;va[pa+1]=D.y;va[pa+2]=D.z;va[pa+3]=E.x;va[pa+4]=E.y;va[pa+5]=E.z;va[pa+6]=F.x;va[pa+7]=F.y;va[pa+8]=F.z;pa=pa+9}v=0;for(B=X.length;v<B;v++){y=na[X[v]];D=Kb[y.a];E=Kb[y.b];F=Kb[y.c];Z=Kb[y.d];va[pa]=D.x;va[pa+1]=D.y;va[pa+2]=D.z;va[pa+3]=E.x;va[pa+4]=E.y;va[pa+5]=E.z;va[pa+6]=F.x;va[pa+7]=F.y;va[pa+8]=F.z;va[pa+9]=Z.x;va[pa+10]=Z.y;va[pa+11]=Z.z;pa=pa+12}e.bindBuffer(e.ARRAY_BUFFER,O.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,va,Ha)}if(dd){ua=
0;for(Tc=Eb.length;ua<Tc;ua++){v=L=0;for(B=W.length;v<B;v++){Cb=W[v];y=na[Cb];D=Eb[ua].vertices[y.a];E=Eb[ua].vertices[y.b];F=Eb[ua].vertices[y.c];qa=Mc[ua];qa[L]=D.x;qa[L+1]=D.y;qa[L+2]=D.z;qa[L+3]=E.x;qa[L+4]=E.y;qa[L+5]=E.z;qa[L+6]=F.x;qa[L+7]=F.y;qa[L+8]=F.z;if(Jb.morphNormals){if(uc){pb=yc[ua].vertexNormals[Cb];$a=pb.a;ab=pb.b;bb=pb.c}else bb=ab=$a=yc[ua].faceNormals[Cb];ra=Nc[ua];ra[L]=$a.x;ra[L+1]=$a.y;ra[L+2]=$a.z;ra[L+3]=ab.x;ra[L+4]=ab.y;ra[L+5]=ab.z;ra[L+6]=bb.x;ra[L+7]=bb.y;ra[L+8]=bb.z}L=
L+9}v=0;for(B=X.length;v<B;v++){Cb=X[v];y=na[Cb];D=Eb[ua].vertices[y.a];E=Eb[ua].vertices[y.b];F=Eb[ua].vertices[y.c];Z=Eb[ua].vertices[y.d];qa=Mc[ua];qa[L]=D.x;qa[L+1]=D.y;qa[L+2]=D.z;qa[L+3]=E.x;qa[L+4]=E.y;qa[L+5]=E.z;qa[L+6]=F.x;qa[L+7]=F.y;qa[L+8]=F.z;qa[L+9]=Z.x;qa[L+10]=Z.y;qa[L+11]=Z.z;if(Jb.morphNormals){if(uc){pb=yc[ua].vertexNormals[Cb];$a=pb.a;ab=pb.b;bb=pb.c;fc=pb.d}else fc=bb=ab=$a=yc[ua].faceNormals[Cb];ra=Nc[ua];ra[L]=$a.x;ra[L+1]=$a.y;ra[L+2]=$a.z;ra[L+3]=ab.x;ra[L+4]=ab.y;ra[L+5]=
ab.z;ra[L+6]=bb.x;ra[L+7]=bb.y;ra[L+8]=bb.z;ra[L+9]=fc.x;ra[L+10]=fc.y;ra[L+11]=fc.z}L=L+12}e.bindBuffer(e.ARRAY_BUFFER,O.__webglMorphTargetsBuffers[ua]);e.bufferData(e.ARRAY_BUFFER,Mc[ua],Ha);if(Jb.morphNormals){e.bindBuffer(e.ARRAY_BUFFER,O.__webglMorphNormalsBuffers[ua]);e.bufferData(e.ARRAY_BUFFER,Nc[ua],Ha)}}}if(Db.length){v=0;for(B=W.length;v<B;v++){y=na[W[v]];fb=Db[y.a];gb=Db[y.b];hb=Db[y.c];ha[x]=fb.x;ha[x+1]=fb.y;ha[x+2]=fb.z;ha[x+3]=fb.w;ha[x+4]=gb.x;ha[x+5]=gb.y;ha[x+6]=gb.z;ha[x+7]=gb.w;
ha[x+8]=hb.x;ha[x+9]=hb.y;ha[x+10]=hb.z;ha[x+11]=hb.w;ib=Nb[y.a];jb=Nb[y.b];kb=Nb[y.c];ga[x]=ib.x;ga[x+1]=ib.y;ga[x+2]=ib.z;ga[x+3]=ib.w;ga[x+4]=jb.x;ga[x+5]=jb.y;ga[x+6]=jb.z;ga[x+7]=jb.w;ga[x+8]=kb.x;ga[x+9]=kb.y;ga[x+10]=kb.z;ga[x+11]=kb.w;vb=Lb[y.a];wb=Lb[y.b];xb=Lb[y.c];ea[x]=vb.x;ea[x+1]=vb.y;ea[x+2]=vb.z;ea[x+3]=1;ea[x+4]=wb.x;ea[x+5]=wb.y;ea[x+6]=wb.z;ea[x+7]=1;ea[x+8]=xb.x;ea[x+9]=xb.y;ea[x+10]=xb.z;ea[x+11]=1;yb=Mb[y.a];zb=Mb[y.b];Ab=Mb[y.c];fa[x]=yb.x;fa[x+1]=yb.y;fa[x+2]=yb.z;fa[x+3]=
1;fa[x+4]=zb.x;fa[x+5]=zb.y;fa[x+6]=zb.z;fa[x+7]=1;fa[x+8]=Ab.x;fa[x+9]=Ab.y;fa[x+10]=Ab.z;fa[x+11]=1;x=x+12}v=0;for(B=X.length;v<B;v++){y=na[X[v]];fb=Db[y.a];gb=Db[y.b];hb=Db[y.c];hc=Db[y.d];ha[x]=fb.x;ha[x+1]=fb.y;ha[x+2]=fb.z;ha[x+3]=fb.w;ha[x+4]=gb.x;ha[x+5]=gb.y;ha[x+6]=gb.z;ha[x+7]=gb.w;ha[x+8]=hb.x;ha[x+9]=hb.y;ha[x+10]=hb.z;ha[x+11]=hb.w;ha[x+12]=hc.x;ha[x+13]=hc.y;ha[x+14]=hc.z;ha[x+15]=hc.w;ib=Nb[y.a];jb=Nb[y.b];kb=Nb[y.c];ic=Nb[y.d];ga[x]=ib.x;ga[x+1]=ib.y;ga[x+2]=ib.z;ga[x+3]=ib.w;ga[x+
4]=jb.x;ga[x+5]=jb.y;ga[x+6]=jb.z;ga[x+7]=jb.w;ga[x+8]=kb.x;ga[x+9]=kb.y;ga[x+10]=kb.z;ga[x+11]=kb.w;ga[x+12]=ic.x;ga[x+13]=ic.y;ga[x+14]=ic.z;ga[x+15]=ic.w;vb=Lb[y.a];wb=Lb[y.b];xb=Lb[y.c];wc=Lb[y.d];ea[x]=vb.x;ea[x+1]=vb.y;ea[x+2]=vb.z;ea[x+3]=1;ea[x+4]=wb.x;ea[x+5]=wb.y;ea[x+6]=wb.z;ea[x+7]=1;ea[x+8]=xb.x;ea[x+9]=xb.y;ea[x+10]=xb.z;ea[x+11]=1;ea[x+12]=wc.x;ea[x+13]=wc.y;ea[x+14]=wc.z;ea[x+15]=1;yb=Mb[y.a];zb=Mb[y.b];Ab=Mb[y.c];xc=Mb[y.d];fa[x]=yb.x;fa[x+1]=yb.y;fa[x+2]=yb.z;fa[x+3]=1;fa[x+4]=zb.x;
fa[x+5]=zb.y;fa[x+6]=zb.z;fa[x+7]=1;fa[x+8]=Ab.x;fa[x+9]=Ab.y;fa[x+10]=Ab.z;fa[x+11]=1;fa[x+12]=xc.x;fa[x+13]=xc.y;fa[x+14]=xc.z;fa[x+15]=1;x=x+16}if(x>0){e.bindBuffer(e.ARRAY_BUFFER,O.__webglSkinVertexABuffer);e.bufferData(e.ARRAY_BUFFER,ea,Ha);e.bindBuffer(e.ARRAY_BUFFER,O.__webglSkinVertexBBuffer);e.bufferData(e.ARRAY_BUFFER,fa,Ha);e.bindBuffer(e.ARRAY_BUFFER,O.__webglSkinIndicesBuffer);e.bufferData(e.ARRAY_BUFFER,ga,Ha);e.bindBuffer(e.ARRAY_BUFFER,O.__webglSkinWeightsBuffer);e.bufferData(e.ARRAY_BUFFER,
ha,Ha)}}if(cd&&Lc){v=0;for(B=W.length;v<B;v++){y=na[W[v]];Va=y.vertexColors;vc=y.color;if(Va.length===3&&Lc===THREE.VertexColors){cb=Va[0];db=Va[1];eb=Va[2]}else eb=db=cb=vc;wa[ma]=cb.r;wa[ma+1]=cb.g;wa[ma+2]=cb.b;wa[ma+3]=db.r;wa[ma+4]=db.g;wa[ma+5]=db.b;wa[ma+6]=eb.r;wa[ma+7]=eb.g;wa[ma+8]=eb.b;ma=ma+9}v=0;for(B=X.length;v<B;v++){y=na[X[v]];Va=y.vertexColors;vc=y.color;if(Va.length===4&&Lc===THREE.VertexColors){cb=Va[0];db=Va[1];eb=Va[2];gc=Va[3]}else gc=eb=db=cb=vc;wa[ma]=cb.r;wa[ma+1]=cb.g;wa[ma+
2]=cb.b;wa[ma+3]=db.r;wa[ma+4]=db.g;wa[ma+5]=db.b;wa[ma+6]=eb.r;wa[ma+7]=eb.g;wa[ma+8]=eb.b;wa[ma+9]=gc.r;wa[ma+10]=gc.g;wa[ma+11]=gc.b;ma=ma+12}if(ma>0){e.bindBuffer(e.ARRAY_BUFFER,O.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,wa,Ha)}}if(bd&&Ea.hasTangents){v=0;for(B=W.length;v<B;v++){y=na[W[v]];ob=y.vertexTangents;Xa=ob[0];Ya=ob[1];Za=ob[2];da[$]=Xa.x;da[$+1]=Xa.y;da[$+2]=Xa.z;da[$+3]=Xa.w;da[$+4]=Ya.x;da[$+5]=Ya.y;da[$+6]=Ya.z;da[$+7]=Ya.w;da[$+8]=Za.x;da[$+9]=Za.y;da[$+10]=Za.z;da[$+11]=Za.w;
$=$+12}v=0;for(B=X.length;v<B;v++){y=na[X[v]];ob=y.vertexTangents;Xa=ob[0];Ya=ob[1];Za=ob[2];ec=ob[3];da[$]=Xa.x;da[$+1]=Xa.y;da[$+2]=Xa.z;da[$+3]=Xa.w;da[$+4]=Ya.x;da[$+5]=Ya.y;da[$+6]=Ya.z;da[$+7]=Ya.w;da[$+8]=Za.x;da[$+9]=Za.y;da[$+10]=Za.z;da[$+11]=Za.w;da[$+12]=ec.x;da[$+13]=ec.y;da[$+14]=ec.z;da[$+15]=ec.w;$=$+16}e.bindBuffer(e.ARRAY_BUFFER,O.__webglTangentBuffer);e.bufferData(e.ARRAY_BUFFER,da,Ha)}if(ad&&Yb){v=0;for(B=W.length;v<B;v++){y=na[W[v]];Sb=y.vertexNormals;ub=y.normal;if(Sb.length===
3&&uc)for(V=0;V<3;V++){Bb=Sb[V];Qa[za]=Bb.x;Qa[za+1]=Bb.y;Qa[za+2]=Bb.z;za=za+3}else for(V=0;V<3;V++){Qa[za]=ub.x;Qa[za+1]=ub.y;Qa[za+2]=ub.z;za=za+3}}v=0;for(B=X.length;v<B;v++){y=na[X[v]];Sb=y.vertexNormals;ub=y.normal;if(Sb.length===4&&uc)for(V=0;V<4;V++){Bb=Sb[V];Qa[za]=Bb.x;Qa[za+1]=Bb.y;Qa[za+2]=Bb.z;za=za+3}else for(V=0;V<4;V++){Qa[za]=ub.x;Qa[za+1]=ub.y;Qa[za+2]=ub.z;za=za+3}}e.bindBuffer(e.ARRAY_BUFFER,O.__webglNormalBuffer);e.bufferData(e.ARRAY_BUFFER,Qa,Ha)}if(Uc&&Pc&&Zb){v=0;for(B=W.length;v<
B;v++){Ta=W[v];y=na[Ta];Tb=Pc[Ta];if(Tb!==void 0)for(V=0;V<3;V++){Vb=Tb[V];jc[qb]=Vb.u;jc[qb+1]=Vb.v;qb=qb+2}}v=0;for(B=X.length;v<B;v++){Ta=X[v];y=na[Ta];Tb=Pc[Ta];if(Tb!==void 0)for(V=0;V<4;V++){Vb=Tb[V];jc[qb]=Vb.u;jc[qb+1]=Vb.v;qb=qb+2}}if(qb>0){e.bindBuffer(e.ARRAY_BUFFER,O.__webglUVBuffer);e.bufferData(e.ARRAY_BUFFER,jc,Ha)}}if(Uc&&Qc&&Zb){v=0;for(B=W.length;v<B;v++){Ta=W[v];y=na[Ta];Ub=Qc[Ta];if(Ub!==void 0)for(V=0;V<3;V++){Wb=Ub[V];kc[rb]=Wb.u;kc[rb+1]=Wb.v;rb=rb+2}}v=0;for(B=X.length;v<B;v++){Ta=
X[v];y=na[Ta];Ub=Qc[Ta];if(Ub!==void 0)for(V=0;V<4;V++){Wb=Ub[V];kc[rb]=Wb.u;kc[rb+1]=Wb.v;rb=rb+2}}if(rb>0){e.bindBuffer(e.ARRAY_BUFFER,O.__webglUV2Buffer);e.bufferData(e.ARRAY_BUFFER,kc,Ha)}}if(Ic){v=0;for(B=W.length;v<B;v++){y=na[W[v]];lb[Pa]=la;lb[Pa+1]=la+1;lb[Pa+2]=la+2;Pa=Pa+3;Ja[Da]=la;Ja[Da+1]=la+1;Ja[Da+2]=la;Ja[Da+3]=la+2;Ja[Da+4]=la+1;Ja[Da+5]=la+2;Da=Da+6;la=la+3}v=0;for(B=X.length;v<B;v++){y=na[X[v]];lb[Pa]=la;lb[Pa+1]=la+1;lb[Pa+2]=la+3;lb[Pa+3]=la+1;lb[Pa+4]=la+2;lb[Pa+5]=la+3;Pa=
Pa+6;Ja[Da]=la;Ja[Da+1]=la+1;Ja[Da+2]=la;Ja[Da+3]=la+3;Ja[Da+4]=la+1;Ja[Da+5]=la+2;Ja[Da+6]=la+2;Ja[Da+7]=la+3;Da=Da+8;la=la+4}e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,O.__webglFaceBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,lb,Ha);e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,O.__webglLineBuffer);e.bufferData(e.ELEMENT_ARRAY_BUFFER,Ja,Ha)}if(Oc){V=0;for(bc=Oc.length;V<bc;V++){p=Oc[V];if(p.__original.needsUpdate){s=0;if(p.size===1)if(p.boundTo===void 0||p.boundTo==="vertices"){v=0;for(B=W.length;v<B;v++){y=na[W[v]];
p.array[s]=p.value[y.a];p.array[s+1]=p.value[y.b];p.array[s+2]=p.value[y.c];s=s+3}v=0;for(B=X.length;v<B;v++){y=na[X[v]];p.array[s]=p.value[y.a];p.array[s+1]=p.value[y.b];p.array[s+2]=p.value[y.c];p.array[s+3]=p.value[y.d];s=s+4}}else{if(p.boundTo==="faces"){v=0;for(B=W.length;v<B;v++){Ia=p.value[W[v]];p.array[s]=Ia;p.array[s+1]=Ia;p.array[s+2]=Ia;s=s+3}v=0;for(B=X.length;v<B;v++){Ia=p.value[X[v]];p.array[s]=Ia;p.array[s+1]=Ia;p.array[s+2]=Ia;p.array[s+3]=Ia;s=s+4}}}else if(p.size===2)if(p.boundTo===
void 0||p.boundTo==="vertices"){v=0;for(B=W.length;v<B;v++){y=na[W[v]];D=p.value[y.a];E=p.value[y.b];F=p.value[y.c];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=E.x;p.array[s+3]=E.y;p.array[s+4]=F.x;p.array[s+5]=F.y;s=s+6}v=0;for(B=X.length;v<B;v++){y=na[X[v]];D=p.value[y.a];E=p.value[y.b];F=p.value[y.c];Z=p.value[y.d];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=E.x;p.array[s+3]=E.y;p.array[s+4]=F.x;p.array[s+5]=F.y;p.array[s+6]=Z.x;p.array[s+7]=Z.y;s=s+8}}else{if(p.boundTo==="faces"){v=0;for(B=
W.length;v<B;v++){F=E=D=Ia=p.value[W[v]];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=E.x;p.array[s+3]=E.y;p.array[s+4]=F.x;p.array[s+5]=F.y;s=s+6}v=0;for(B=X.length;v<B;v++){Z=F=E=D=Ia=p.value[X[v]];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=E.x;p.array[s+3]=E.y;p.array[s+4]=F.x;p.array[s+5]=F.y;p.array[s+6]=Z.x;p.array[s+7]=Z.y;s=s+8}}}else if(p.size===3){var Q;Q=p.type==="c"?["r","g","b"]:["x","y","z"];if(p.boundTo===void 0||p.boundTo==="vertices"){v=0;for(B=W.length;v<B;v++){y=na[W[v]];D=p.value[y.a];
E=p.value[y.b];F=p.value[y.c];p.array[s]=D[Q[0]];p.array[s+1]=D[Q[1]];p.array[s+2]=D[Q[2]];p.array[s+3]=E[Q[0]];p.array[s+4]=E[Q[1]];p.array[s+5]=E[Q[2]];p.array[s+6]=F[Q[0]];p.array[s+7]=F[Q[1]];p.array[s+8]=F[Q[2]];s=s+9}v=0;for(B=X.length;v<B;v++){y=na[X[v]];D=p.value[y.a];E=p.value[y.b];F=p.value[y.c];Z=p.value[y.d];p.array[s]=D[Q[0]];p.array[s+1]=D[Q[1]];p.array[s+2]=D[Q[2]];p.array[s+3]=E[Q[0]];p.array[s+4]=E[Q[1]];p.array[s+5]=E[Q[2]];p.array[s+6]=F[Q[0]];p.array[s+7]=F[Q[1]];p.array[s+8]=
F[Q[2]];p.array[s+9]=Z[Q[0]];p.array[s+10]=Z[Q[1]];p.array[s+11]=Z[Q[2]];s=s+12}}else if(p.boundTo==="faces"){v=0;for(B=W.length;v<B;v++){F=E=D=Ia=p.value[W[v]];p.array[s]=D[Q[0]];p.array[s+1]=D[Q[1]];p.array[s+2]=D[Q[2]];p.array[s+3]=E[Q[0]];p.array[s+4]=E[Q[1]];p.array[s+5]=E[Q[2]];p.array[s+6]=F[Q[0]];p.array[s+7]=F[Q[1]];p.array[s+8]=F[Q[2]];s=s+9}v=0;for(B=X.length;v<B;v++){Z=F=E=D=Ia=p.value[X[v]];p.array[s]=D[Q[0]];p.array[s+1]=D[Q[1]];p.array[s+2]=D[Q[2]];p.array[s+3]=E[Q[0]];p.array[s+4]=
E[Q[1]];p.array[s+5]=E[Q[2]];p.array[s+6]=F[Q[0]];p.array[s+7]=F[Q[1]];p.array[s+8]=F[Q[2]];p.array[s+9]=Z[Q[0]];p.array[s+10]=Z[Q[1]];p.array[s+11]=Z[Q[2]];s=s+12}}}else if(p.size===4)if(p.boundTo===void 0||p.boundTo==="vertices"){v=0;for(B=W.length;v<B;v++){y=na[W[v]];D=p.value[y.a];E=p.value[y.b];F=p.value[y.c];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=D.z;p.array[s+3]=D.w;p.array[s+4]=E.x;p.array[s+5]=E.y;p.array[s+6]=E.z;p.array[s+7]=E.w;p.array[s+8]=F.x;p.array[s+9]=F.y;p.array[s+10]=F.z;
p.array[s+11]=F.w;s=s+12}v=0;for(B=X.length;v<B;v++){y=na[X[v]];D=p.value[y.a];E=p.value[y.b];F=p.value[y.c];Z=p.value[y.d];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=D.z;p.array[s+3]=D.w;p.array[s+4]=E.x;p.array[s+5]=E.y;p.array[s+6]=E.z;p.array[s+7]=E.w;p.array[s+8]=F.x;p.array[s+9]=F.y;p.array[s+10]=F.z;p.array[s+11]=F.w;p.array[s+12]=Z.x;p.array[s+13]=Z.y;p.array[s+14]=Z.z;p.array[s+15]=Z.w;s=s+16}}else if(p.boundTo==="faces"){v=0;for(B=W.length;v<B;v++){F=E=D=Ia=p.value[W[v]];p.array[s]=D.x;
p.array[s+1]=D.y;p.array[s+2]=D.z;p.array[s+3]=D.w;p.array[s+4]=E.x;p.array[s+5]=E.y;p.array[s+6]=E.z;p.array[s+7]=E.w;p.array[s+8]=F.x;p.array[s+9]=F.y;p.array[s+10]=F.z;p.array[s+11]=F.w;s=s+12}v=0;for(B=X.length;v<B;v++){Z=F=E=D=Ia=p.value[X[v]];p.array[s]=D.x;p.array[s+1]=D.y;p.array[s+2]=D.z;p.array[s+3]=D.w;p.array[s+4]=E.x;p.array[s+5]=E.y;p.array[s+6]=E.z;p.array[s+7]=E.w;p.array[s+8]=F.x;p.array[s+9]=F.y;p.array[s+10]=F.z;p.array[s+11]=F.w;p.array[s+12]=Z.x;p.array[s+13]=Z.y;p.array[s+14]=
Z.z;p.array[s+15]=Z.w;s=s+16}}e.bindBuffer(e.ARRAY_BUFFER,p.buffer);e.bufferData(e.ARRAY_BUFFER,p.array,Ha)}}}if(sc){delete O.__inittedArrays;delete O.__colorArray;delete O.__normalArray;delete O.__tangentArray;delete O.__uvArray;delete O.__uv2Array;delete O.__faceArray;delete O.__vertexArray;delete O.__lineArray;delete O.__skinVertexAArray;delete O.__skinVertexBArray;delete O.__skinIndexArray;delete O.__skinWeightArray}}}}R.__dirtyVertices=false;R.__dirtyMorphTargets=false;R.__dirtyElements=false;
R.__dirtyUvs=false;R.__dirtyNormals=false;R.__dirtyColors=false;R.__dirtyTangents=false;Fa.attributes&&l(Fa)}else if(Ua instanceof THREE.Ribbon){if(R.__dirtyVertices||R.__dirtyColors){var Fb=R,Vc=e.DYNAMIC_DRAW,lc=void 0,mc=void 0,zc=void 0,Gb=void 0,Ac=void 0,Wc=Fb.vertices,Xc=Fb.colors,ed=Wc.length,fd=Xc.length,Bc=Fb.__vertexArray,Cc=Fb.__colorArray,gd=Fb.__dirtyColors;if(Fb.__dirtyVertices){for(lc=0;lc<ed;lc++){zc=Wc[lc];Gb=lc*3;Bc[Gb]=zc.x;Bc[Gb+1]=zc.y;Bc[Gb+2]=zc.z}e.bindBuffer(e.ARRAY_BUFFER,
Fb.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,Bc,Vc)}if(gd){for(mc=0;mc<fd;mc++){Ac=Xc[mc];Gb=mc*3;Cc[Gb]=Ac.r;Cc[Gb+1]=Ac.g;Cc[Gb+2]=Ac.b}e.bindBuffer(e.ARRAY_BUFFER,Fb.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,Cc,Vc)}}R.__dirtyVertices=false;R.__dirtyColors=false}else if(Ua instanceof THREE.Line){Fa=c(Ua,dc);Rb=Fa.attributes&&o(Fa);if(R.__dirtyVertices||R.__dirtyColors||Rb){var sb=R,Rc=e.DYNAMIC_DRAW,nc=void 0,oc=void 0,Dc=void 0,ia=void 0,Ec=void 0,Yc=sb.vertices,Zc=sb.colors,hd=Yc.length,
id=Zc.length,Fc=sb.__vertexArray,Gc=sb.__colorArray,jd=sb.__dirtyColors,Sc=sb.__webglCustomAttributesList,Hc=void 0,$c=void 0,ya=void 0,Xb=void 0,Ga=void 0,ba=void 0;if(sb.__dirtyVertices){for(nc=0;nc<hd;nc++){Dc=Yc[nc];ia=nc*3;Fc[ia]=Dc.x;Fc[ia+1]=Dc.y;Fc[ia+2]=Dc.z}e.bindBuffer(e.ARRAY_BUFFER,sb.__webglVertexBuffer);e.bufferData(e.ARRAY_BUFFER,Fc,Rc)}if(jd){for(oc=0;oc<id;oc++){Ec=Zc[oc];ia=oc*3;Gc[ia]=Ec.r;Gc[ia+1]=Ec.g;Gc[ia+2]=Ec.b}e.bindBuffer(e.ARRAY_BUFFER,sb.__webglColorBuffer);e.bufferData(e.ARRAY_BUFFER,
Gc,Rc)}if(Sc){Hc=0;for($c=Sc.length;Hc<$c;Hc++){ba=Sc[Hc];if(ba.needsUpdate&&(ba.boundTo===void 0||ba.boundTo==="vertices")){ia=0;Xb=ba.value.length;if(ba.size===1)for(ya=0;ya<Xb;ya++)ba.array[ya]=ba.value[ya];else if(ba.size===2)for(ya=0;ya<Xb;ya++){Ga=ba.value[ya];ba.array[ia]=Ga.x;ba.array[ia+1]=Ga.y;ia=ia+2}else if(ba.size===3)if(ba.type==="c")for(ya=0;ya<Xb;ya++){Ga=ba.value[ya];ba.array[ia]=Ga.r;ba.array[ia+1]=Ga.g;ba.array[ia+2]=Ga.b;ia=ia+3}else for(ya=0;ya<Xb;ya++){Ga=ba.value[ya];ba.array[ia]=
Ga.x;ba.array[ia+1]=Ga.y;ba.array[ia+2]=Ga.z;ia=ia+3}else if(ba.size===4)for(ya=0;ya<Xb;ya++){Ga=ba.value[ya];ba.array[ia]=Ga.x;ba.array[ia+1]=Ga.y;ba.array[ia+2]=Ga.z;ba.array[ia+3]=Ga.w;ia=ia+4}e.bindBuffer(e.ARRAY_BUFFER,ba.buffer);e.bufferData(e.ARRAY_BUFFER,ba.array,Rc)}}}}R.__dirtyVertices=false;R.__dirtyColors=false;Fa.attributes&&l(Fa)}else if(Ua instanceof THREE.ParticleSystem){Fa=c(Ua,dc);Rb=Fa.attributes&&o(Fa);(R.__dirtyVertices||R.__dirtyColors||Ua.sortParticles||Rb)&&g(R,e.DYNAMIC_DRAW,
Ua);R.__dirtyVertices=false;R.__dirtyColors=false;Fa.attributes&&l(Fa)}}};this.initMaterial=function(a,b,c,d){var f,g,h;a instanceof THREE.MeshDepthMaterial?h="depth":a instanceof THREE.MeshNormalMaterial?h="normal":a instanceof THREE.MeshBasicMaterial?h="basic":a instanceof THREE.MeshLambertMaterial?h="lambert":a instanceof THREE.MeshPhongMaterial?h="phong":a instanceof THREE.LineBasicMaterial?h="basic":a instanceof THREE.ParticleBasicMaterial&&(h="particle_basic");if(h){var i=THREE.ShaderLib[h];
a.uniforms=THREE.UniformsUtils.clone(i.uniforms);a.vertexShader=i.vertexShader;a.fragmentShader=i.fragmentShader}var j,k,l,m;j=m=i=0;for(k=b.length;j<k;j++){l=b[j];if(!l.onlyShadow){l instanceof THREE.DirectionalLight&&m++;l instanceof THREE.PointLight&&i++;l instanceof THREE.SpotLight&&i++}}if(i+m<=S){l=m;m=i}else{l=Math.ceil(S*m/(i+m));m=S-l}var o=0,i=0;for(j=b.length;i<j;i++){k=b[i];if(k.castShadow){k instanceof THREE.SpotLight&&o++;k instanceof THREE.DirectionalLight&&!k.shadowCascade&&o++}}var r=
50;if(d!==void 0&&d instanceof THREE.SkinnedMesh)r=d.bones.length;var n;a:{j=a.fragmentShader;k=a.vertexShader;var i=a.uniforms,b=a.attributes,c={map:!!a.map,envMap:!!a.envMap,lightMap:!!a.lightMap,vertexColors:a.vertexColors,fog:c,useFog:a.fog,sizeAttenuation:a.sizeAttenuation,skinning:a.skinning,morphTargets:a.morphTargets,morphNormals:a.morphNormals,maxMorphTargets:this.maxMorphTargets,maxMorphNormals:this.maxMorphNormals,maxDirLights:l,maxPointLights:m,maxBones:r,shadowMapEnabled:this.shadowMapEnabled&&
d.receiveShadow,shadowMapSoft:this.shadowMapSoft,shadowMapDebug:this.shadowMapDebug,shadowMapCascade:this.shadowMapCascade,maxShadows:o,alphaTest:a.alphaTest,metal:a.metal,perPixel:a.perPixel,wrapAround:a.wrapAround,doubleSided:d&&d.doubleSided},q,d=[];if(h)d.push(h);else{d.push(j);d.push(k)}for(q in c){d.push(q);d.push(c[q])}h=d.join();q=0;for(d=Wa.length;q<d;q++)if(Wa[q].code===h){n=Wa[q].program;break a}q=e.createProgram();d=["precision "+M+" float;",bc>0?"#define VERTEX_TEXTURES":"",C.gammaInput?
"#define GAMMA_INPUT":"",C.gammaOutput?"#define GAMMA_OUTPUT":"",C.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SHADOWS "+c.maxShadows,"#define MAX_BONES "+c.maxBones,c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.skinning?"#define USE_SKINNING":"",c.morphTargets?"#define USE_MORPHTARGETS":"",c.morphNormals?
"#define USE_MORPHNORMALS":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":"",c.doubleSided?"#define DOUBLE_SIDED":"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapSoft?"#define SHADOWMAP_SOFT":"",c.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",c.shadowMapCascade?"#define SHADOWMAP_CASCADE":"",c.sizeAttenuation?"#define USE_SIZEATTENUATION":"","uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
l=["precision "+M+" float;","#define MAX_DIR_LIGHTS "+c.maxDirLights,"#define MAX_POINT_LIGHTS "+c.maxPointLights,"#define MAX_SHADOWS "+c.maxShadows,c.alphaTest?"#define ALPHATEST "+c.alphaTest:"",C.gammaInput?"#define GAMMA_INPUT":"",C.gammaOutput?"#define GAMMA_OUTPUT":"",C.physicallyBasedShading?"#define PHYSICALLY_BASED_SHADING":"",c.useFog&&c.fog?"#define USE_FOG":"",c.useFog&&c.fog instanceof THREE.FogExp2?"#define FOG_EXP2":"",c.map?"#define USE_MAP":"",c.envMap?"#define USE_ENVMAP":"",c.lightMap?
"#define USE_LIGHTMAP":"",c.vertexColors?"#define USE_COLOR":"",c.metal?"#define METAL":"",c.perPixel?"#define PHONG_PER_PIXEL":"",c.wrapAround?"#define WRAP_AROUND":"",c.doubleSided?"#define DOUBLE_SIDED":"",c.shadowMapEnabled?"#define USE_SHADOWMAP":"",c.shadowMapSoft?"#define SHADOWMAP_SOFT":"",c.shadowMapDebug?"#define SHADOWMAP_DEBUG":"",c.shadowMapCascade?"#define SHADOWMAP_CASCADE":"","uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");e.attachShader(q,w("fragment",l+j));
e.attachShader(q,w("vertex",d+k));e.linkProgram(q);e.getProgramParameter(q,e.LINK_STATUS)||console.error("Could not initialise shader\nVALIDATE_STATUS: "+e.getProgramParameter(q,e.VALIDATE_STATUS)+", gl error ["+e.getError()+"]");q.uniforms={};q.attributes={};var t,d=["viewMatrix","modelViewMatrix","projectionMatrix","normalMatrix","objectMatrix","cameraPosition","boneGlobalMatrices","morphTargetInfluences"];for(t in i)d.push(t);t=d;d=0;for(i=t.length;d<i;d++){j=t[d];q.uniforms[j]=e.getUniformLocation(q,
j)}d=["position","normal","uv","uv2","tangent","color","skinVertexA","skinVertexB","skinIndex","skinWeight"];for(t=0;t<c.maxMorphTargets;t++)d.push("morphTarget"+t);for(t=0;t<c.maxMorphNormals;t++)d.push("morphNormal"+t);for(n in b)d.push(n);n=d;t=0;for(b=n.length;t<b;t++){c=n[t];q.attributes[c]=e.getAttribLocation(q,c)}q.id=Wa.length;Wa.push({program:q,code:h});C.info.memory.programs=Wa.length;n=q}a.program=n;n=a.program.attributes;n.position>=0&&e.enableVertexAttribArray(n.position);n.color>=0&&
e.enableVertexAttribArray(n.color);n.normal>=0&&e.enableVertexAttribArray(n.normal);n.tangent>=0&&e.enableVertexAttribArray(n.tangent);if(a.skinning&&n.skinVertexA>=0&&n.skinVertexB>=0&&n.skinIndex>=0&&n.skinWeight>=0){e.enableVertexAttribArray(n.skinVertexA);e.enableVertexAttribArray(n.skinVertexB);e.enableVertexAttribArray(n.skinIndex);e.enableVertexAttribArray(n.skinWeight)}if(a.attributes)for(g in a.attributes)n[g]!==void 0&&n[g]>=0&&e.enableVertexAttribArray(n[g]);if(a.morphTargets){a.numSupportedMorphTargets=
0;q="morphTarget";for(g=0;g<this.maxMorphTargets;g++){t=q+g;if(n[t]>=0){e.enableVertexAttribArray(n[t]);a.numSupportedMorphTargets++}}}if(a.morphNormals){a.numSupportedMorphNormals=0;q="morphNormal";for(g=0;g<this.maxMorphNormals;g++){t=q+g;if(n[t]>=0){e.enableVertexAttribArray(n[t]);a.numSupportedMorphNormals++}}}a.uniformsList=[];for(f in a.uniforms)a.uniformsList.push([a.uniforms[f],f])};this.setFaceCulling=function(a,b){if(a){!b||b==="ccw"?e.frontFace(e.CCW):e.frontFace(e.CW);a==="back"?e.cullFace(e.BACK):
a==="front"?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK);e.enable(e.CULL_FACE)}else e.disable(e.CULL_FACE)};this.setObjectFaces=function(a){if(xa!==a.doubleSided){a.doubleSided?e.disable(e.CULL_FACE):e.enable(e.CULL_FACE);xa=a.doubleSided}if(U!==a.flipSided){a.flipSided?e.frontFace(e.CW):e.frontFace(e.CCW);U=a.flipSided}};this.setDepthTest=function(a){if(Ka!==a){a?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST);Ka=a}};this.setDepthWrite=function(a){if(Ca!==a){e.depthMask(a);Ca=a}};this.setBlending=
function(a,b,c,d){if(a!==Ba){switch(a){case THREE.NoBlending:e.disable(e.BLEND);break;case THREE.AdditiveBlending:e.enable(e.BLEND);e.blendEquation(e.FUNC_ADD);e.blendFunc(e.SRC_ALPHA,e.ONE);break;case THREE.SubtractiveBlending:e.enable(e.BLEND);e.blendEquation(e.FUNC_ADD);e.blendFunc(e.ZERO,e.ONE_MINUS_SRC_COLOR);break;case THREE.MultiplyBlending:e.enable(e.BLEND);e.blendEquation(e.FUNC_ADD);e.blendFunc(e.ZERO,e.SRC_COLOR);break;case THREE.CustomBlending:e.enable(e.BLEND);break;default:e.enable(e.BLEND);
e.blendEquationSeparate(e.FUNC_ADD,e.FUNC_ADD);e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA)}Ba=a}if(a===THREE.CustomBlending){if(b!==Ma){e.blendEquation(G(b));Ma=b}if(c!==Ra||d!==Sa){e.blendFunc(G(c),G(d));Ra=c;Sa=d}}else Sa=Ra=Ma=null};this.setTexture=function(a,b){if(a.needsUpdate){if(!a.__webglInit){a.__webglInit=true;a.__webglTexture=e.createTexture();C.info.memory.textures++}e.activeTexture(e.TEXTURE0+b);e.bindTexture(e.TEXTURE_2D,a.__webglTexture);e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
a.premultiplyAlpha);var c=a.image,d=(c.width&c.width-1)===0&&(c.height&c.height-1)===0,f=G(a.format),g=G(a.type);P(e.TEXTURE_2D,a,d);a instanceof THREE.DataTexture?e.texImage2D(e.TEXTURE_2D,0,f,c.width,c.height,0,f,g,c.data):e.texImage2D(e.TEXTURE_2D,0,f,f,g,a.image);a.generateMipmaps&&d&&e.generateMipmap(e.TEXTURE_2D);a.needsUpdate=false;if(a.onUpdate)a.onUpdate()}else{e.activeTexture(e.TEXTURE0+b);e.bindTexture(e.TEXTURE_2D,a.__webglTexture)}};this.setRenderTarget=function(a){var b=a instanceof
THREE.WebGLRenderTargetCube;if(a&&!a.__webglFramebuffer){if(a.depthBuffer===void 0)a.depthBuffer=true;if(a.stencilBuffer===void 0)a.stencilBuffer=true;a.__webglTexture=e.createTexture();var c=(a.width&a.width-1)===0&&(a.height&a.height-1)===0,d=G(a.format),f=G(a.type);if(b){a.__webglFramebuffer=[];a.__webglRenderbuffer=[];e.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture);P(e.TEXTURE_CUBE_MAP,a,c);for(var g=0;g<6;g++){a.__webglFramebuffer[g]=e.createFramebuffer();a.__webglRenderbuffer[g]=e.createRenderbuffer();
e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,d,a.width,a.height,0,d,f,null);var h=a,i=e.TEXTURE_CUBE_MAP_POSITIVE_X+g;e.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[g]);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,i,h.__webglTexture,0);A(a.__webglRenderbuffer[g],a)}c&&e.generateMipmap(e.TEXTURE_CUBE_MAP)}else{a.__webglFramebuffer=e.createFramebuffer();a.__webglRenderbuffer=e.createRenderbuffer();e.bindTexture(e.TEXTURE_2D,a.__webglTexture);P(e.TEXTURE_2D,a,c);e.texImage2D(e.TEXTURE_2D,
0,d,a.width,a.height,0,d,f,null);d=e.TEXTURE_2D;e.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,d,a.__webglTexture,0);A(a.__webglRenderbuffer,a);c&&e.generateMipmap(e.TEXTURE_2D)}b?e.bindTexture(e.TEXTURE_CUBE_MAP,null):e.bindTexture(e.TEXTURE_2D,null);e.bindRenderbuffer(e.RENDERBUFFER,null);e.bindFramebuffer(e.FRAMEBUFFER,null)}if(a){b=b?a.__webglFramebuffer[a.activeCubeFace]:a.__webglFramebuffer;c=a.width;a=a.height;f=d=0}else{b=null;
c=Pb;a=ac;d=$b;f=Hb}if(b!==T){e.bindFramebuffer(e.FRAMEBUFFER,b);e.viewport(d,f,c,a);T=b}pc=c;qc=a};this.shadowMapPlugin=new THREE.ShadowMapPlugin;this.addPrePlugin(this.shadowMapPlugin);this.addPostPlugin(new THREE.SpritePlugin);this.addPostPlugin(new THREE.LensFlarePlugin)};
THREE.WebGLRenderTarget=function(a,b,c){this.width=a;this.height=b;c=c||{};this.wrapS=c.wrapS!==void 0?c.wrapS:THREE.ClampToEdgeWrapping;this.wrapT=c.wrapT!==void 0?c.wrapT:THREE.ClampToEdgeWrapping;this.magFilter=c.magFilter!==void 0?c.magFilter:THREE.LinearFilter;this.minFilter=c.minFilter!==void 0?c.minFilter:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.format=c.format!==void 0?c.format:THREE.RGBAFormat;this.type=c.type!==void 0?c.type:
THREE.UnsignedByteType;this.depthBuffer=c.depthBuffer!==void 0?c.depthBuffer:true;this.stencilBuffer=c.stencilBuffer!==void 0?c.stencilBuffer:true;this.generateMipmaps=true};
THREE.WebGLRenderTarget.prototype.clone=function(){var a=new THREE.WebGLRenderTarget(this.width,this.height);a.wrapS=this.wrapS;a.wrapT=this.wrapT;a.magFilter=this.magFilter;a.minFilter=this.minFilter;a.offset.copy(this.offset);a.repeat.copy(this.repeat);a.format=this.format;a.type=this.type;a.depthBuffer=this.depthBuffer;a.stencilBuffer=this.stencilBuffer;return a};THREE.WebGLRenderTargetCube=function(a,b,c){THREE.WebGLRenderTarget.call(this,a,b,c);this.activeCubeFace=0};
THREE.WebGLRenderTargetCube.prototype=new THREE.WebGLRenderTarget;THREE.WebGLRenderTargetCube.prototype.constructor=THREE.WebGLRenderTargetCube;THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=true};THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld);this.positionScreen.copy(a.positionScreen)};
THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};
THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};THREE.RenderableObject=function(){this.z=this.object=null};
THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.material=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.material=null};
THREE.BufferGeometry=function(){this.id=THREE.GeometryCount++;this.vertexColorArray=this.vertexUvArray=this.vertexNormalArray=this.vertexPositionArray=this.vertexIndexArray=this.vertexColorBuffer=this.vertexUvBuffer=this.vertexNormalBuffer=this.vertexPositionBuffer=this.vertexIndexBuffer=null;this.dynamic=false;this.boundingSphere=this.boundingBox=null;this.morphTargets=[]};THREE.BufferGeometry.prototype={constructor:THREE.BufferGeometry,computeBoundingBox:function(){},computeBoundingSphere:function(){}};
THREE.Gyroscope=function(){THREE.Object3D.call(this)};THREE.Gyroscope.prototype=new THREE.Object3D;THREE.Gyroscope.prototype.constructor=THREE.Gyroscope;
THREE.Gyroscope.prototype.updateMatrixWorld=function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a){if(this.parent){this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix);this.matrixWorld.decompose(this.translationWorld,this.rotationWorld,this.scaleWorld);this.matrix.decompose(this.translationObject,this.rotationObject,this.scaleObject);this.matrixWorld.compose(this.translationWorld,this.rotationObject,this.scaleWorld)}else this.matrixWorld.copy(this.matrix);
this.matrixWorldNeedsUpdate=false;a=true}for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)};THREE.Gyroscope.prototype.translationWorld=new THREE.Vector3;THREE.Gyroscope.prototype.translationObject=new THREE.Vector3;THREE.Gyroscope.prototype.rotationWorld=new THREE.Quaternion;THREE.Gyroscope.prototype.rotationObject=new THREE.Quaternion;THREE.Gyroscope.prototype.scaleWorld=new THREE.Vector3;THREE.Gyroscope.prototype.scaleObject=new THREE.Vector3;
THREE.CameraHelper=function(a){function b(a,b,d){c(a,d);c(b,d)}function c(a,b){d.lineGeometry.vertices.push(new THREE.Vertex);d.lineGeometry.colors.push(new THREE.Color(b));d.pointMap[a]===void 0&&(d.pointMap[a]=[]);d.pointMap[a].push(d.lineGeometry.vertices.length-1)}THREE.Object3D.call(this);var d=this;this.lineGeometry=new THREE.Geometry;this.lineMaterial=new THREE.LineBasicMaterial({color:16777215,vertexColors:THREE.FaceColors});this.pointMap={};b("n1","n2",16755200);b("n2","n4",16755200);b("n4",
"n3",16755200);b("n3","n1",16755200);b("f1","f2",16755200);b("f2","f4",16755200);b("f4","f3",16755200);b("f3","f1",16755200);b("n1","f1",16755200);b("n2","f2",16755200);b("n3","f3",16755200);b("n4","f4",16755200);b("p","n1",16711680);b("p","n2",16711680);b("p","n3",16711680);b("p","n4",16711680);b("u1","u2",43775);b("u2","u3",43775);b("u3","u1",43775);b("c","t",16777215);b("p","c",3355443);b("cn1","cn2",3355443);b("cn3","cn4",3355443);b("cf1","cf2",3355443);b("cf3","cf4",3355443);this.camera=a;this.update(a);
this.lines=new THREE.Line(this.lineGeometry,this.lineMaterial,THREE.LinePieces);this.add(this.lines)};THREE.CameraHelper.prototype=new THREE.Object3D;THREE.CameraHelper.prototype.constructor=THREE.CameraHelper;
THREE.CameraHelper.prototype.update=function(){function a(a,d,f,g){THREE.CameraHelper.__v.set(d,f,g);THREE.CameraHelper.__projector.unprojectVector(THREE.CameraHelper.__v,THREE.CameraHelper.__c);a=b.pointMap[a];if(a!==void 0){d=0;for(f=a.length;d<f;d++)b.lineGeometry.vertices[a[d]].copy(THREE.CameraHelper.__v)}}var b=this;THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix);a("c",0,0,-1);a("t",0,0,1);a("n1",-1,-1,-1);a("n2",1,-1,-1);a("n3",-1,1,-1);a("n4",1,1,-1);a("f1",-1,-1,
1);a("f2",1,-1,1);a("f3",-1,1,1);a("f4",1,1,1);a("u1",0.7,1.1,-1);a("u2",-0.7,1.1,-1);a("u3",0,2,-1);a("cf1",-1,0,1);a("cf2",1,0,1);a("cf3",0,-1,1);a("cf4",0,1,1);a("cn1",-1,0,-1);a("cn2",1,0,-1);a("cn3",0,-1,-1);a("cn4",0,1,-1);this.lineGeometry.__dirtyVertices=true};THREE.CameraHelper.__projector=new THREE.Projector;THREE.CameraHelper.__v=new THREE.Vector3;THREE.CameraHelper.__c=new THREE.Camera;
THREE.LensFlare=function(a,b,c,d,f){THREE.Object3D.call(this);this.lensFlares=[];this.positionScreen=new THREE.Vector3;this.customUpdateCallback=void 0;a!==void 0&&this.add(a,b,c,d,f)};THREE.LensFlare.prototype=new THREE.Object3D;THREE.LensFlare.prototype.constructor=THREE.LensFlare;THREE.LensFlare.prototype.supr=THREE.Object3D.prototype;
THREE.LensFlare.prototype.add=function(a,b,c,d,f,g){b===void 0&&(b=-1);c===void 0&&(c=0);g===void 0&&(g=1);f===void 0&&(f=new THREE.Color(16777215));if(d===void 0)d=THREE.NormalBlending;c=Math.min(c,Math.max(0,c));this.lensFlares.push({texture:a,size:b,distance:c,x:0,y:0,z:0,scale:1,rotation:1,opacity:g,color:f,blending:d})};
THREE.LensFlare.prototype.updateLensFlares=function(){var a,b=this.lensFlares.length,c,d=-this.positionScreen.x*2,f=-this.positionScreen.y*2;for(a=0;a<b;a++){c=this.lensFlares[a];c.x=this.positionScreen.x+d*c.distance;c.y=this.positionScreen.y+f*c.distance;c.wantedRotation=c.x*Math.PI*0.25;c.rotation=c.rotation+(c.wantedRotation-c.rotation)*0.25}};THREE.ImmediateRenderObject=function(){THREE.Object3D.call(this);this.render=function(){}};THREE.ImmediateRenderObject.prototype=new THREE.Object3D;
THREE.ImmediateRenderObject.prototype.constructor=THREE.ImmediateRenderObject;
THREE.LensFlarePlugin=function(){function a(a){var c=b.createProgram(),d=b.createShader(b.FRAGMENT_SHADER),f=b.createShader(b.VERTEX_SHADER);b.shaderSource(d,a.fragmentShader);b.shaderSource(f,a.vertexShader);b.compileShader(d);b.compileShader(f);b.attachShader(c,d);b.attachShader(c,f);b.linkProgram(c);return c}var b,c,d,f,g,h,i,k,j,m,o,l,u;this.init=function(r){b=r.context;c=r;d=new Float32Array(16);f=new Uint16Array(6);r=0;d[r++]=-1;d[r++]=-1;d[r++]=0;d[r++]=0;d[r++]=1;d[r++]=-1;d[r++]=1;d[r++]=
0;d[r++]=1;d[r++]=1;d[r++]=1;d[r++]=1;d[r++]=-1;d[r++]=1;d[r++]=0;d[r++]=1;r=0;f[r++]=0;f[r++]=1;f[r++]=2;f[r++]=0;f[r++]=2;f[r++]=3;g=b.createBuffer();h=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,g);b.bufferData(b.ARRAY_BUFFER,d,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,h);b.bufferData(b.ELEMENT_ARRAY_BUFFER,f,b.STATIC_DRAW);i=b.createTexture();k=b.createTexture();b.bindTexture(b.TEXTURE_2D,i);b.texImage2D(b.TEXTURE_2D,0,b.RGB,16,16,0,b.RGB,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,
b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.bindTexture(b.TEXTURE_2D,k);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,16,16,0,b.RGBA,b.UNSIGNED_BYTE,null);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);
b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);if(b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS)<=0){j=false;m=a(THREE.ShaderFlares.lensFlare)}else{j=true;m=a(THREE.ShaderFlares.lensFlareVertexTexture)}o={};l={};o.vertex=b.getAttribLocation(m,"position");o.uv=b.getAttribLocation(m,"uv");l.renderType=b.getUniformLocation(m,"renderType");l.map=b.getUniformLocation(m,"map");l.occlusionMap=b.getUniformLocation(m,"occlusionMap");l.opacity=b.getUniformLocation(m,"opacity");l.color=b.getUniformLocation(m,
"color");l.scale=b.getUniformLocation(m,"scale");l.rotation=b.getUniformLocation(m,"rotation");l.screenPosition=b.getUniformLocation(m,"screenPosition");u=false};this.render=function(a,d,f,z){var a=a.__webglFlares,w=a.length;if(w){var P=new THREE.Vector3,A=z/f,q=f*0.5,G=z*0.5,H=16/z,M=new THREE.Vector2(H*A,H),I=new THREE.Vector3(1,1,0),K=new THREE.Vector2(1,1),N=l,H=o;b.useProgram(m);if(!u){b.enableVertexAttribArray(o.vertex);b.enableVertexAttribArray(o.uv);u=true}b.uniform1i(N.occlusionMap,0);b.uniform1i(N.map,
1);b.bindBuffer(b.ARRAY_BUFFER,g);b.vertexAttribPointer(H.vertex,2,b.FLOAT,false,16,0);b.vertexAttribPointer(H.uv,2,b.FLOAT,false,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,h);b.disable(b.CULL_FACE);b.depthMask(false);var ja,oa,ka,Y,S;for(ja=0;ja<w;ja++){H=16/z;M.set(H*A,H);Y=a[ja];P.set(Y.matrixWorld.n14,Y.matrixWorld.n24,Y.matrixWorld.n34);d.matrixWorldInverse.multiplyVector3(P);d.projectionMatrix.multiplyVector3(P);I.copy(P);K.x=I.x*q+q;K.y=I.y*G+G;if(j||K.x>0&&K.x<f&&K.y>0&&K.y<z){b.activeTexture(b.TEXTURE1);
b.bindTexture(b.TEXTURE_2D,i);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGB,K.x-8,K.y-8,16,16,0);b.uniform1i(N.renderType,0);b.uniform2f(N.scale,M.x,M.y);b.uniform3f(N.screenPosition,I.x,I.y,I.z);b.disable(b.BLEND);b.enable(b.DEPTH_TEST);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0);b.activeTexture(b.TEXTURE0);b.bindTexture(b.TEXTURE_2D,k);b.copyTexImage2D(b.TEXTURE_2D,0,b.RGBA,K.x-8,K.y-8,16,16,0);b.uniform1i(N.renderType,1);b.disable(b.DEPTH_TEST);b.activeTexture(b.TEXTURE1);b.bindTexture(b.TEXTURE_2D,
i);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0);Y.positionScreen.copy(I);Y.customUpdateCallback?Y.customUpdateCallback(Y):Y.updateLensFlares();b.uniform1i(N.renderType,2);b.enable(b.BLEND);oa=0;for(ka=Y.lensFlares.length;oa<ka;oa++){S=Y.lensFlares[oa];if(S.opacity>0.001&&S.scale>0.001){I.x=S.x;I.y=S.y;I.z=S.z;H=S.size*S.scale/z;M.x=H*A;M.y=H;b.uniform3f(N.screenPosition,I.x,I.y,I.z);b.uniform2f(N.scale,M.x,M.y);b.uniform1f(N.rotation,S.rotation);b.uniform1f(N.opacity,S.opacity);b.uniform3f(N.color,
S.color.r,S.color.g,S.color.b);c.setBlending(S.blending,S.blendEquation,S.blendSrc,S.blendDst);c.setTexture(S.texture,1);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0)}}}}b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(true)}}};
THREE.ShadowMapPlugin=function(){var a,b,c,d,f=new THREE.Frustum,g=new THREE.Matrix4,h=new THREE.Vector3,i=new THREE.Vector3;this.init=function(f){a=f.context;b=f;var f=THREE.ShaderLib.depthRGBA,g=THREE.UniformsUtils.clone(f.uniforms);c=new THREE.ShaderMaterial({fragmentShader:f.fragmentShader,vertexShader:f.vertexShader,uniforms:g});d=new THREE.ShaderMaterial({fragmentShader:f.fragmentShader,vertexShader:f.vertexShader,uniforms:g,morphTargets:true});c._shadowPass=true;d._shadowPass=true};this.render=
function(a,c){b.shadowMapEnabled&&b.shadowMapAutoUpdate&&this.update(a,c)};this.update=function(k,j){var m,o,l,u,r,n,t,z,w,P=[];u=0;a.clearColor(1,1,1,1);a.disable(a.BLEND);b.shadowMapCullFrontFaces&&a.cullFace(a.FRONT);b.setDepthTest(true);m=0;for(o=k.__lights.length;m<o;m++){l=k.__lights[m];if(l.castShadow)if(l instanceof THREE.DirectionalLight&&l.shadowCascade)for(r=0;r<l.shadowCascadeCount;r++){var A;if(l.shadowCascadeArray[r])A=l.shadowCascadeArray[r];else{w=l;t=r;A=new THREE.DirectionalLight;
A.isVirtual=true;A.onlyShadow=true;A.castShadow=true;A.shadowCameraNear=w.shadowCameraNear;A.shadowCameraFar=w.shadowCameraFar;A.shadowCameraLeft=w.shadowCameraLeft;A.shadowCameraRight=w.shadowCameraRight;A.shadowCameraBottom=w.shadowCameraBottom;A.shadowCameraTop=w.shadowCameraTop;A.shadowCameraVisible=w.shadowCameraVisible;A.shadowDarkness=w.shadowDarkness;A.shadowBias=w.shadowCascadeBias[t];A.shadowMapWidth=w.shadowCascadeWidth[t];A.shadowMapHeight=w.shadowCascadeHeight[t];A.pointsWorld=[];A.pointsFrustum=
[];z=A.pointsWorld;n=A.pointsFrustum;for(var q=0;q<8;q++){z[q]=new THREE.Vector3;n[q]=new THREE.Vector3}z=w.shadowCascadeNearZ[t];w=w.shadowCascadeFarZ[t];n[0].set(-1,-1,z);n[1].set(1,-1,z);n[2].set(-1,1,z);n[3].set(1,1,z);n[4].set(-1,-1,w);n[5].set(1,-1,w);n[6].set(-1,1,w);n[7].set(1,1,w);A.originalCamera=j;n=new THREE.Gyroscope;n.position=l.shadowCascadeOffset;n.add(A);n.add(A.target);j.add(n);l.shadowCascadeArray[r]=A;console.log("Created virtualLight",A)}t=l;z=r;w=t.shadowCascadeArray[z];w.position.copy(t.position);
w.target.position.copy(t.target.position);w.lookAt(w.target);w.shadowCameraVisible=t.shadowCameraVisible;w.shadowDarkness=t.shadowDarkness;w.shadowBias=t.shadowCascadeBias[z];n=t.shadowCascadeNearZ[z];t=t.shadowCascadeFarZ[z];w=w.pointsFrustum;w[0].z=n;w[1].z=n;w[2].z=n;w[3].z=n;w[4].z=t;w[5].z=t;w[6].z=t;w[7].z=t;P[u]=A;u++}else{P[u]=l;u++}}m=0;for(o=P.length;m<o;m++){l=P[m];if(!l.shadowMap){l.shadowMap=new THREE.WebGLRenderTarget(l.shadowMapWidth,l.shadowMapHeight,{minFilter:THREE.LinearFilter,
magFilter:THREE.LinearFilter,format:THREE.RGBAFormat});l.shadowMapSize=new THREE.Vector2(l.shadowMapWidth,l.shadowMapHeight);l.shadowMatrix=new THREE.Matrix4}if(!l.shadowCamera){if(l instanceof THREE.SpotLight)l.shadowCamera=new THREE.PerspectiveCamera(l.shadowCameraFov,l.shadowMapWidth/l.shadowMapHeight,l.shadowCameraNear,l.shadowCameraFar);else if(l instanceof THREE.DirectionalLight)l.shadowCamera=new THREE.OrthographicCamera(l.shadowCameraLeft,l.shadowCameraRight,l.shadowCameraTop,l.shadowCameraBottom,
l.shadowCameraNear,l.shadowCameraFar);else{console.error("Unsupported light type for shadow");continue}k.add(l.shadowCamera);b.autoUpdateScene&&k.updateMatrixWorld()}if(l.shadowCameraVisible&&!l.cameraHelper){l.cameraHelper=new THREE.CameraHelper(l.shadowCamera);l.shadowCamera.add(l.cameraHelper)}if(l.isVirtual&&A.originalCamera==j){r=j;u=l.shadowCamera;n=l.pointsFrustum;w=l.pointsWorld;h.set(Infinity,Infinity,Infinity);i.set(-Infinity,-Infinity,-Infinity);for(t=0;t<8;t++){z=w[t];z.copy(n[t]);THREE.ShadowMapPlugin.__projector.unprojectVector(z,
r);u.matrixWorldInverse.multiplyVector3(z);if(z.x<h.x)h.x=z.x;if(z.x>i.x)i.x=z.x;if(z.y<h.y)h.y=z.y;if(z.y>i.y)i.y=z.y;if(z.z<h.z)h.z=z.z;if(z.z>i.z)i.z=z.z}u.left=h.x;u.right=i.x;u.top=i.y;u.bottom=h.y;u.updateProjectionMatrix()}u=l.shadowMap;n=l.shadowMatrix;r=l.shadowCamera;r.position.copy(l.matrixWorld.getPosition());r.lookAt(l.target.matrixWorld.getPosition());r.updateMatrixWorld();r.matrixWorldInverse.getInverse(r.matrixWorld);if(l.cameraHelper)l.cameraHelper.lines.visible=l.shadowCameraVisible;
l.shadowCameraVisible&&l.cameraHelper.update();n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);n.multiplySelf(r.projectionMatrix);n.multiplySelf(r.matrixWorldInverse);if(!r._viewMatrixArray)r._viewMatrixArray=new Float32Array(16);if(!r._projectionMatrixArray)r._projectionMatrixArray=new Float32Array(16);r.matrixWorldInverse.flattenToArray(r._viewMatrixArray);r.projectionMatrix.flattenToArray(r._projectionMatrixArray);g.multiply(r.projectionMatrix,r.matrixWorldInverse);f.setFromMatrix(g);b.setRenderTarget(u);
b.clear();w=k.__webglObjects;l=0;for(u=w.length;l<u;l++){t=w[l];n=t.object;t.render=false;if(n.visible&&n.castShadow&&(!(n instanceof THREE.Mesh)||!n.frustumCulled||f.contains(n))){n.matrixWorld.flattenToArray(n._objectMatrixArray);n._modelViewMatrix.multiplyToArray(r.matrixWorldInverse,n.matrixWorld,n._modelViewMatrixArray);t.render=true}}l=0;for(u=w.length;l<u;l++){t=w[l];if(t.render){n=t.object;t=t.buffer;b.setObjectFaces(n);z=n.customDepthMaterial?n.customDepthMaterial:n.geometry.morphTargets.length?
d:c;t instanceof THREE.BufferGeometry?b.renderBufferDirect(r,k.__lights,null,z,t,n):b.renderBuffer(r,k.__lights,null,z,t,n)}}w=k.__webglObjectsImmediate;l=0;for(u=w.length;l<u;l++){t=w[l];n=t.object;if(n.visible&&n.castShadow){n.matrixAutoUpdate&&n.matrixWorld.flattenToArray(n._objectMatrixArray);n._modelViewMatrix.multiplyToArray(r.matrixWorldInverse,n.matrixWorld,n._modelViewMatrixArray);b.renderImmediateObject(r,k.__lights,null,c,n)}}}m=b.getClearColor();o=b.getClearAlpha();a.clearColor(m.r,m.g,
m.b,o);a.enable(a.BLEND);b.shadowMapCullFrontFaces&&a.cullFace(a.BACK)}};THREE.ShadowMapPlugin.__projector=new THREE.Projector;
THREE.SpritePlugin=function(){function a(a,b){return b.z-a.z}var b,c,d,f,g,h,i,k,j,m;this.init=function(a){b=a.context;c=a;d=new Float32Array(16);f=new Uint16Array(6);a=0;d[a++]=-1;d[a++]=-1;d[a++]=0;d[a++]=1;d[a++]=1;d[a++]=-1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=1;d[a++]=0;d[a++]=-1;d[a++]=1;d[a++]=0;a=d[a++]=0;f[a++]=0;f[a++]=1;f[a++]=2;f[a++]=0;f[a++]=2;f[a++]=3;g=b.createBuffer();h=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,g);b.bufferData(b.ARRAY_BUFFER,d,b.STATIC_DRAW);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
h);b.bufferData(b.ELEMENT_ARRAY_BUFFER,f,b.STATIC_DRAW);var a=THREE.ShaderSprite.sprite,l=b.createProgram(),u=b.createShader(b.FRAGMENT_SHADER),r=b.createShader(b.VERTEX_SHADER);b.shaderSource(u,a.fragmentShader);b.shaderSource(r,a.vertexShader);b.compileShader(u);b.compileShader(r);b.attachShader(l,u);b.attachShader(l,r);b.linkProgram(l);i=l;k={};j={};k.position=b.getAttribLocation(i,"position");k.uv=b.getAttribLocation(i,"uv");j.uvOffset=b.getUniformLocation(i,"uvOffset");j.uvScale=b.getUniformLocation(i,
"uvScale");j.rotation=b.getUniformLocation(i,"rotation");j.scale=b.getUniformLocation(i,"scale");j.alignment=b.getUniformLocation(i,"alignment");j.color=b.getUniformLocation(i,"color");j.map=b.getUniformLocation(i,"map");j.opacity=b.getUniformLocation(i,"opacity");j.useScreenCoordinates=b.getUniformLocation(i,"useScreenCoordinates");j.affectedByDistance=b.getUniformLocation(i,"affectedByDistance");j.screenPosition=b.getUniformLocation(i,"screenPosition");j.modelViewMatrix=b.getUniformLocation(i,"modelViewMatrix");
j.projectionMatrix=b.getUniformLocation(i,"projectionMatrix");m=false};this.render=function(d,f,u,r){var d=d.__webglSprites,n=d.length;if(n){var t=k,z=j,w=r/u,u=u*0.5,P=r*0.5,A=true;b.useProgram(i);if(!m){b.enableVertexAttribArray(t.position);b.enableVertexAttribArray(t.uv);m=true}b.disable(b.CULL_FACE);b.enable(b.BLEND);b.depthMask(true);b.bindBuffer(b.ARRAY_BUFFER,g);b.vertexAttribPointer(t.position,2,b.FLOAT,false,16,0);b.vertexAttribPointer(t.uv,2,b.FLOAT,false,16,8);b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,
h);b.uniformMatrix4fv(z.projectionMatrix,false,f._projectionMatrixArray);b.activeTexture(b.TEXTURE0);b.uniform1i(z.map,0);for(var q,G=[],t=0;t<n;t++){q=d[t];if(q.visible&&q.opacity!==0)if(q.useScreenCoordinates)q.z=-q.position.z;else{q._modelViewMatrix.multiplyToArray(f.matrixWorldInverse,q.matrixWorld,q._modelViewMatrixArray);q.z=-q._modelViewMatrix.n34}}d.sort(a);for(t=0;t<n;t++){q=d[t];if(q.visible&&q.opacity!==0&&q.map&&q.map.image&&q.map.image.width){if(q.useScreenCoordinates){b.uniform1i(z.useScreenCoordinates,
1);b.uniform3f(z.screenPosition,(q.position.x-u)/u,(P-q.position.y)/P,Math.max(0,Math.min(1,q.position.z)))}else{b.uniform1i(z.useScreenCoordinates,0);b.uniform1i(z.affectedByDistance,q.affectedByDistance?1:0);b.uniformMatrix4fv(z.modelViewMatrix,false,q._modelViewMatrixArray)}f=q.map.image.width/(q.scaleByViewport?r:1);G[0]=f*w*q.scale.x;G[1]=f*q.scale.y;b.uniform2f(z.uvScale,q.uvScale.x,q.uvScale.y);b.uniform2f(z.uvOffset,q.uvOffset.x,q.uvOffset.y);b.uniform2f(z.alignment,q.alignment.x,q.alignment.y);
b.uniform1f(z.opacity,q.opacity);b.uniform3f(z.color,q.color.r,q.color.g,q.color.b);b.uniform1f(z.rotation,q.rotation);b.uniform2fv(z.scale,G);if(q.mergeWith3D&&!A){b.enable(b.DEPTH_TEST);A=true}else if(!q.mergeWith3D&&A){b.disable(b.DEPTH_TEST);A=false}c.setBlending(q.blending,q.blendEquation,q.blendSrc,q.blendDst);c.setTexture(q.map,0);b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0)}}b.enable(b.CULL_FACE);b.enable(b.DEPTH_TEST);b.depthMask(true)}}};
THREE.ShaderFlares={lensFlareVertexTexture:{vertexShader:"uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"},
lensFlare:{vertexShader:"uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",fragmentShader:"precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"}};
THREE.ShaderSprite={sprite:{vertexShader:"uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
fragmentShader:"precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}"}};
>>>>>>> mrdoob/dev
