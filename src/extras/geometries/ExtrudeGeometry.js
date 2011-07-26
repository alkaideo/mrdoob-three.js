/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates extruded geometry from a path shape.
 **/

THREE.ExtrudeGeometry = function( shapes, options ) {
	
	THREE.Geometry.call( this );
	
	shapes = shapes instanceof Array ? shapes : [ shapes ];
	
	var s=0, sl = shapes.length, shape;
	
	for (;s<sl;s++) {
		shape = shapes[s];
		console.log(shape);
		this.addShape( shape, options );
		
	}
	
};
	
THREE.ExtrudeGeometry.prototype = new THREE.Geometry();

THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry;
	
	
THREE.ExtrudeGeometry.prototype.addShape = function( shape, options ) {

	var amount = options.amount !== undefined ? options.amount : 100;

	var bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 8; // 10
	var bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness; // 8 
	var bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true; // false
	var bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;
	// We should set bevel segments to 0 if bevel is not enabled.
	if (!bevelEnabled) bevelSegments = 0 ;
	

	var steps = options.steps !== undefined ? options.steps : 1;
	
	var extrudePath = options.path !== undefined ? options.path : null;
	var extrudePts, extrudeByPath = false;

	if ( extrudePath ) {

		extrudePts = extrudePath.getPoints();
		steps = extrudePts.length;
		extrudeByPath = true;

	}
	

	// TODO, extrude by path's tangents? also via 3d path?
	
	// Variables initalization
	var ahole, h, hl; // looping of holes
	var scope = this;
	var bevelPoints = [];
	
	var shapesOffset = this.vertices.length;
	

	// getPoints
	var shapePoints = shape.extractAllPoints(false, 8);
	// false for getPoints | true for getSpacedPoints() for points with equal divisions
	
    var vertices = shapePoints.shape; 
	var holes =  shapePoints.holes;
	
	var reverse = !THREE.Shape.Utils.isClockWise( vertices ) ;

	if (reverse) {

		vertices = vertices.reverse();
		
		// Maybe we should also check if holes are in the opposite direction, just to be safe...
		
		for (h = 0, hl = holes.length;  h < hl; h++ ) {
			
			ahole = holes[h];
			if (THREE.Shape.Utils.isClockWise(ahole)) {
				
				holes[h] = ahole.reverse();
				
			}
		}
		
		reverse = false; // If vertices are in order now, we shouldn't need to worry about them again (hopefully)!
	}
	
	
	
	var faces = THREE.Shape.Utils.triangulateShape(vertices, holes);
	//var faces = THREE.Shape.Utils.triangulate2(vertices, holes);

	//console.log(faces);
	
	////
	///   Handle Vertices
	////
	
	var contour = vertices; // vertices has all points but contour has only points of circumference
	
	for (h = 0, hl = holes.length;  h < hl; h++ ) {

		ahole = holes[h];

		vertices = vertices.concat(ahole);

	}
	
	// Find all centroids of shapes and holes
	
	var b;	
	var sum = new THREE.Vector2();
	var contourCentroid, holesCentroids;
	
	for (i=0, il = contour.length; i<il; i++) {
		sum.addSelf(contour[i]);
	}
	
	contourCentroid = sum.divideScalar( contour.length ) ;
	
	holesCentroids = [];
	
	
	for (h=0, hl = holes.length; h<hl; h++) {
		sum = new THREE.Vector2();
		ahole = holes[h];
		
		for (i=0, il = ahole.length; i<il; i++) {
			sum.addSelf(ahole[i]);
		}
		
		holesCentroids[h] = sum.divideScalar( ahole.length ) ;
		
	}
	
	function scalePt (pt, centroid, size, expandOutwards /* Boolean */ ) {
		vectorFromCentroid = pt.clone().subSelf( centroid );
		adj = size / vectorFromCentroid.length();

		if ( expandOutwards ) {

			adj += 1;

		}  else {

			adj = 1 - adj;

		}

		return vectorFromCentroid.multiplyScalar( adj ).addSelf( centroid );
	}
	
	function scalePt2 (pt, vec, size ) {
		return vec.clone().multiplyScalar( size ).addSelf( pt );
	}
	

	var i,
		vert, vlen = vertices.length,
		face, flen = faces.length,
		cont, clen = contour.length,
		hol, hlen;
		

	var bs;
	
	//------
	// Find directions for point movement
	//
	
	var RAD_TO_DEGREES = 180 / Math.PI;

	
	function getBevelVec(u, v /*Vector2*/) {
		console.log(u,v);
		//u = u.normalize();
		//v = v.normalize();
		var scalar = u.dot(v);
		var product = u.length() * v.length();
		// scalar = product * cos (theta)
		
		var theta = Math.acos( scalar / product );
		
		console.log('theta', theta * RAD_TO_DEGREES);
		
		var angle = Math.PI *2 - theta / 2;
		angle /= 2;
		
		var uw = u.length() * bevelSize * Math.cos(angle);
		var wv = bevelSize * v.length() * Math.cos(angle);
		// ax + by = c
		// dx + ey = d
		
			console.log('uw', uw, 'wv', wv);
		
		var a = u.x, b = u.y, c = uw,
			d = v.x, e = v.y, f = wv;
			
		var y = (f - c) / (e - b);
		var x = (f - c) / (d - a);
		
		
		var vec3 = new THREE.Vector2(x, y).normalize();
		console.log('xy', x, y, vec3);
		return vec3;
	}
	
	var contourMovements = [];
	
	for ( i = 0, il = contour.length, j = il-1, k = i + 1; i < il; i++,j++,k++ ) {
		if (j==il) j = 0;
		if (k==il) k = 0;
		
		//  (j)---(i)---(k)
		console.log('i,j,k', i, j , k)
		var v1 = contour[ j ].clone().subSelf(contour[ i ]); //.normalize();
		var v2 = contour[ k ].clone().subSelf(contour[ i ]); //.normalize();
		
		//var v1 = contour[ i ].clone().subSelf(contour[ j ]);
		//var v2 = contour[ k ].clone().subSelf(contour[ i ]);
		
		var pt_i = contour[ i ];
		var pt_j = contour[ j ];
		var pt_k = contour[ k ];
		
		console.log(pt_i, pt_j, pt_k);
		
		var anglea = Math.atan2(pt_i.y - pt_j.y, pt_i.x - pt_j.x);
		//var angleb = Math.atan2(pt_k.y - pt_i.y, pt_k.x - pt_i.x);
		var angleb = Math.atan2(pt_i.y - pt_k.y, pt_i.x - pt_k.x);
		
		var anglec = (angleb - anglea ) / 2 + anglea;
		
		console.log('angle1', anglea * RAD_TO_DEGREES,'angle2', angleb * RAD_TO_DEGREES, 'anglec', anglec *RAD_TO_DEGREES);
		
		x = -bevelSize * Math.cos(anglec);
		y = -bevelSize * Math.sin(anglec);
		
		contourMovements[i]= new THREE.Vector2(x,y).normalize();
		console.log('xy', x, y, contourMovements[i], pt_i.x +x , pt_i.y + y);
		
		//contourMovements[i]= getBevelVec(v1, v2);
		
		
	}
	
	var holesMovements = [], oneHoleMovements;
	// expand holes
	for ( h = 0, hl = holes.length; h < hl; h++ ) {

		ahole = holes[h];
		
		oneHoleMovements = [];
		
		for ( i = 0, il = ahole.length, j = il-1, k = i + 1; i < il; i++,j++,k++ ) {
			if (j==il) j = 0;
			if (k==il) k = 0;

			//  (j)---(i)---(k)

			var v1 = ahole[ i ].clone().subSelf(ahole[ j ]);
			var v2 = ahole[ k ].clone().subSelf(ahole[ i ]);

			oneHoleMovements[i]= getBevelVec(v1, v2);


		}
		
		holesMovements.push(oneHoleMovements);

	}
	
	
	
	// Loop bevelSegments, 1 for the front, 1 for the back
	
	for (b=bevelSegments; b > 0; b--) {
		t =  b / bevelSegments;
		z = bevelThickness * t;
		// Formula could probably be simplified
		//bs = bevelSize * (1-Math.sin ((1-t) * Math.PI/2 )) ; //bevelSize * t ;
		bs = bevelSize * t ;
		
		// contract shape
		for ( i = 0, il = contour.length; i < il; i++ ) {

			vert = scalePt2(contour[i], contourMovements[i], bs);
			v( vert.x, vert.y,  - z);

		}

		// expand holes
		for ( h = 0, hl = holes.length; h < hl; h++ ) {

			ahole = holes[h];
			oneHoleMovements = holesMovements[h];
			
			for ( i = 0, il = ahole.length; i < il; i++ ) {

				vert = scalePt2(ahole[i], oneHoleMovements[i], bs);
				v( vert.x, vert.y,  -z );

			}

		}
		
		
		
	}
	
	
	// Back facing vertices

	for ( i = 0; i < vlen; i++ ) {

		vert = vertices[ i ];
		//v( vert.x, vert.y, 0 );
		
		
		if ( !extrudeByPath ) {

			v( vert.x, vert.y, 0 );

		} else {

			v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );

		}

	}

	// Add steped vertices...
	// Including front facing vertices

	var s = 1;
	for ( ; s <= steps; s++ ) {

		for ( i = 0; i < vlen; i ++ ) {

			vert = vertices[ i ];

			if ( !extrudeByPath ) {

				v( vert.x, vert.y, amount/steps * s );

			} else {

				v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );

			}

		}

	}
	
	
	// Add Bevel Segments planes

	for (b=1; b <= bevelSegments; b++) {
		
			t =  b / bevelSegments;
			z = bevelThickness * t;
			bs = bevelSize * (1-Math.sin ((1-t) * Math.PI/2 )); 
			
			// contract shape
			for ( i = 0, il = contour.length; i < il; i++ ) {

				vert = scalePt(contour[i], contourCentroid, bs , false);
				v( vert.x, vert.y,  amount + z);

			}

			// expand holes
			for ( h = 0, hl = holes.length; h < hl; h++ ) {

				ahole = holes[h];
				for ( i = 0, il = ahole.length; i < il; i++ ) {
					vert = scalePt(ahole[i], holesCentroids[h] , bs , true);
					
					if ( !extrudeByPath ) {

						v( vert.x, vert.y,  amount + z);

					} else {

						v( vert.x, vert.y + extrudePts[ steps - 1 ].y, extrudePts[ steps - 1 ].x +z);

					}
					
				}

			}
		
	}
	



	
	////
	///   Handle Faces
	////
	

	// Bottom faces
	if (bevelEnabled ) {
		
		
		var layer = 0 ; //steps + 1
		var offset = vlen * layer;
		
		for ( i = 0; i < flen; i++ ) {

			face = faces[ i ];
			f3( face[ 2 ]+ offset, face[ 1 ]+ offset, face[ 0 ] + offset);

		}

		layer = steps + bevelSegments* 2;
		offset = vlen * layer;
		
		// Top faces
		var layers = (steps + bevelSegments * 2)  * vlen; 
		for ( i = 0; i < flen; i++ ) {

			face = faces[ i ];
			f3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset );

		}

	} else {

		for ( i = 0; i < flen; i++ ) {

			face = faces[ i ];
			f3( face[ 2 ], face[ 1 ], face[ 0 ] );

		}

		// Top faces
		var layers = (steps + bevelSegments * 2)  * vlen; 
		for ( i = 0; i < flen; i++ ) {

			face = faces[ i ];
			f3( face[ 0 ] + vlen* steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps );

		}
	}

	var tmpPt;
	var j, k, l, m;

	var layeroffset = 0;
	
	// Sides faces
	
	sidewalls(contour);
	layeroffset += contour.length;
	
	for (h = 0, hl = holes.length;  h < hl; h++ ) {
		ahole = holes[h];
		sidewalls(ahole); 
		//, true
		layeroffset += ahole.length;
	}

	// Create faces for the z-sides of the shape	
	function sidewalls(contour) {
	
		i = contour.length;

		while ( --i >= 0 ) {

			tmpPt = contour[ i ];

			j = i;
		
			k = i - 1;

			if ( k < 0 ) k = contour.length - 1;

			//console.log('b', i,j, i-1, k,vertices.length);

			var s = 0;

			for ( ; s < (steps  + bevelSegments * 2) ; s++ ) {

				var slen1 = vlen * s;
				var slen2 = vlen * ( s + 1 );
		
			
				f4( layeroffset + j + slen1, layeroffset + k + slen1, layeroffset + k + slen2, layeroffset + j + slen2 );
				

			}

		}
	}
	
	// UVs to be added

	this.computeCentroids();
	this.computeFaceNormals();
	//this.computeVertexNormals();

	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );

	}

	function f3( a, b, c ) {
		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;

		scope.faces.push( new THREE.Face3( a, b, c ) );

	}

	function f4( a, b, c, d ) {
		
		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;
		d += shapesOffset;

 		scope.faces.push( new THREE.Face4( a, b, c, d ) );

	}

};


