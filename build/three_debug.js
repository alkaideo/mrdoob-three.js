// three.js r14 - http://github.com/mrdoob/three.js
var THREE=THREE||{};THREE.Color=function(a){this.r;this.g;this.b;this.a;this.hex;this.__styleString="rgba(0, 0, 0, 1)";this.setHex=function(b){this.hex=b;this.updateRGBA();this.updateStyleString()};this.setRGBA=function(f,e,c,d){this.r=f;this.g=e;this.b=c;this.a=d;this.updateHex();this.updateStyleString()};this.updateHex=function(){this.hex=Math.floor(this.a*255)<<24|Math.floor(this.r*255)<<16|Math.floor(this.g*255)<<8|Math.floor(this.b*255)};this.updateRGBA=function(){this.a=(this.hex>>24&255)/255;this.r=(this.hex>>16&255)/255;this.g=(this.hex>>8&255)/255;this.b=(this.hex&255)/255};this.updateStyleString=function(){this.__styleString="rgba("+Math.floor(this.r*255)+","+Math.floor(this.g*255)+","+Math.floor(this.b*255)+","+this.a+")"};this.toString=function(){return"THREE.Color ( r: "+this.r+", g: "+this.g+", b: "+this.b+", a: "+this.a+", hex: "+this.hex+" )"};this.setHex(a)};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};THREE.Vector2.prototype={set:function(a,b){this.x=a;this.y=b},copy:function(a){this.x=a.x;this.y=a.y},addSelf:function(a){this.x+=a.x;this.y+=a.y},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y},subSelf:function(a){this.x-=a.x;this.y-=a.y},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y},multiplyScalar:function(a){this.x*=a;this.y*=a},unit:function(){this.multiplyScalar(1/this.length())},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},lengthSq:function(){return this.x*this.x+this.y*this.y},negate:function(){this.x=-this.x;this.y=-this.y},clone:function(){return new THREE.Vector2(this.x,this.y)},toString:function(){return"THREE.Vector2 ("+this.x+", "+this.y+")"}};THREE.Vector3=function(a,c,b){this.x=a||0;this.y=c||0;this.z=b||0};THREE.Vector3.prototype={set:function(a,c,b){this.x=a;this.y=c;this.z=b},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y;this.z=b.z+a.z},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y;this.z=b.z-a.z},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z},cross:function(b,a){this.x=b.y*a.z-b.z*a.y;this.y=b.z*a.x-b.x*a.z;this.z=b.x*a.y-b.y*a.x},crossSelf:function(c){var b=this.x,a=this.y,d=this.z;this.x=a*c.z-d*c.y;this.y=d*c.x-b*c.z;this.z=b*c.y-a*c.x},multiplySelf:function(a){this.x*=a.x;this.y*=a.y;this.z*=a.z},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(d){var c=this.x-d.x,b=this.y-d.y,a=this.z-d.z;return c*c+b*b+a*a},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},negate:function(){this.x=-this.x;this.y=-this.y;this.z=-this.z},normalize:function(){if(this.length()>0){this.multiplyScalar(1/this.length())}else{this.multiplyScalar(0)}},isZero:function(){var a=0.0001;return(Math.abs(this.x)<a)&&(Math.abs(this.y)<a)&&(Math.abs(this.z)<a)},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},toString:function(){return"THREE.Vector3 ( "+this.x+", "+this.y+", "+this.z+" )"}};THREE.Vector4=function(a,d,c,b){this.x=a||0;this.y=d||0;this.z=c||0;this.w=b||1};THREE.Vector4.prototype={set:function(a,d,c,b){this.x=a;this.y=d;this.z=c;this.w=b},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w},add:function(b,a){this.x=b.x+a.x;this.y=b.y+a.y;this.z=b.z+a.z;this.w=b.w+a.w},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w},sub:function(b,a){this.x=b.x-a.x;this.y=b.y-a.y;this.z=b.z-a.z;this.w=b.w-a.w},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},toString:function(){return"THREE.Vector4 ("+this.x+", "+this.y+", "+this.z+", "+this.w+")"}};THREE.Rectangle=function(b,l,a,j){var k=b,g=l,i=a,f=j,d=i-k,e=f-g,h=false;function c(){d=i-k;e=f-g}this.getX=function(){return k};this.getY=function(){return g};this.getWidth=function(){return d};this.getHeight=function(){return e};this.getX1=function(){return k};this.getY1=function(){return g};this.getX2=function(){return i};this.getY2=function(){return f};this.set=function(n,p,m,o){h=false;k=n;g=p;i=m;f=o;c()};this.addPoint=function(m,n){if(h){h=false;k=m;g=n;i=m;f=n}else{k=Math.min(k,m);g=Math.min(g,n);i=Math.max(i,m);f=Math.max(f,n)}c()};this.addRectangle=function(m){if(h){h=false;k=m.getX1();g=m.getY1();i=m.getX2();f=m.getY2()}else{k=Math.min(k,m.getX1());g=Math.min(g,m.getY1());i=Math.max(i,m.getX2());f=Math.max(f,m.getY2())}c()};this.inflate=function(m){k-=m;g-=m;i+=m;f+=m;c()};this.minSelf=function(m){k=Math.max(k,m.getX1());g=Math.max(g,m.getY1());i=Math.min(i,m.getX2());f=Math.min(f,m.getY2());c()};this.instersects=function(m){return Math.min(i,m.getX2())-Math.max(k,m.getX1())>=0&&Math.min(f,m.getY2())-Math.max(g,m.getY1())>=0};this.empty=function(){h=true;k=0;g=0;i=0;f=0;c()};this.toString=function(){return"THREE.Rectangle (x1: "+k+", y1: "+f+", x2: "+i+", y1: "+g+", width: "+d+", height: "+e+")"}};THREE.Matrix4=function(){this._x=new THREE.Vector3();this._y=new THREE.Vector3();this._z=new THREE.Vector3()};THREE.Matrix4.prototype={n11:1,n12:0,n13:0,n14:0,n21:0,n22:1,n23:0,n24:0,n31:0,n32:0,n33:1,n34:0,n41:0,n42:0,n43:0,n44:1,identity:function(){this.n11=1;this.n12=0;this.n13=0;this.n14=0;this.n21=0;this.n22=1;this.n23=0;this.n24=0;this.n31=0;this.n32=0;this.n33=1;this.n34=0;this.n41=0;this.n42=0;this.n43=0;this.n44=1},lookAt:function(d,c,b){var a=this._x,f=this._y,e=this._z;e.sub(d,c);e.normalize();a.cross(b,e);a.normalize();f.cross(e,a);f.normalize();this.n11=a.x;this.n12=a.y;this.n13=a.z;this.n14=-a.dot(d);this.n21=f.x;this.n22=f.y;this.n23=f.z;this.n24=-f.dot(d);this.n31=e.x;this.n32=e.y;this.n33=e.z;this.n34=-e.dot(d)},transform:function(a){var d=a.x,c=a.y,b=a.z,e=a.w?a.w:1;a.x=this.n11*d+this.n12*c+this.n13*b+this.n14*e;a.y=this.n21*d+this.n22*c+this.n23*b+this.n24*e;a.z=this.n31*d+this.n32*c+this.n33*b+this.n34*e;e=this.n41*d+this.n42*c+this.n43*b+this.n44*e;if(a.w){a.w=e}else{a.x=a.x/e;a.y=a.y/e;a.z=a.z/e}},crossVector:function(b){var c=new THREE.Vector4();c.x=this.n11*b.x+this.n12*b.y+this.n13*b.z+this.n14*b.w;c.y=this.n21*b.x+this.n22*b.y+this.n23*b.z+this.n24*b.w;c.z=this.n31*b.x+this.n32*b.y+this.n33*b.z+this.n34*b.w;c.w=(b.w)?this.n41*b.x+this.n42*b.y+this.n43*b.z+this.n44*b.w:1;return c},multiply:function(d,c){this.n11=d.n11*c.n11+d.n12*c.n21+d.n13*c.n31+d.n14*c.n41;this.n12=d.n11*c.n12+d.n12*c.n22+d.n13*c.n32+d.n14*c.n42;this.n13=d.n11*c.n13+d.n12*c.n23+d.n13*c.n33+d.n14*c.n43;this.n14=d.n11*c.n14+d.n12*c.n24+d.n13*c.n34+d.n14*c.n44;this.n21=d.n21*c.n11+d.n22*c.n21+d.n23*c.n31+d.n24*c.n41;this.n22=d.n21*c.n12+d.n22*c.n22+d.n23*c.n32+d.n24*c.n42;this.n23=d.n21*c.n13+d.n22*c.n23+d.n23*c.n33+d.n24*c.n43;this.n24=d.n21*c.n14+d.n22*c.n24+d.n23*c.n34+d.n24*c.n44;this.n31=d.n31*c.n11+d.n32*c.n21+d.n33*c.n31+d.n34*c.n41;this.n32=d.n31*c.n12+d.n32*c.n22+d.n33*c.n32+d.n34*c.n42;this.n33=d.n31*c.n13+d.n32*c.n23+d.n33*c.n33+d.n34*c.n43;this.n34=d.n31*c.n14+d.n32*c.n24+d.n33*c.n34+d.n34*c.n44;this.n41=d.n41*c.n11+d.n42*c.n21+d.n43*c.n31+d.n44*c.n41;this.n42=d.n41*c.n12+d.n42*c.n22+d.n43*c.n32+d.n44*c.n42;this.n43=d.n41*c.n13+d.n42*c.n23+d.n43*c.n33+d.n44*c.n43;this.n44=d.n41*c.n14+d.n42*c.n24+d.n43*c.n34+d.n44*c.n44},multiplySelf:function(c){var o=this.n11,n=this.n12,k=this.n13,i=this.n14,f=this.n21,e=this.n22,d=this.n23,b=this.n24,a=this.n31,r=this.n32,q=this.n33,p=this.n34,l=this.n41,j=this.n42,h=this.n43,g=this.n44;this.n11=o*c.n11+n*c.n21+k*c.n31+i*c.n41;this.n12=o*c.n12+n*c.n22+k*c.n32+i*c.n42;this.n13=o*c.n13+n*c.n23+k*c.n33+i*c.n43;this.n14=o*c.n14+n*c.n24+k*c.n34+i*c.n44;this.n21=f*c.n11+e*c.n21+d*c.n31+b*c.n41;this.n22=f*c.n12+e*c.n22+d*c.n32+b*c.n42;this.n23=f*c.n13+e*c.n23+d*c.n33+b*c.n43;this.n24=f*c.n14+e*c.n24+d*c.n34+b*c.n44;this.n31=a*c.n11+r*c.n21+q*c.n31+p*c.n41;this.n32=a*c.n12+r*c.n22+q*c.n32+p*c.n42;this.n33=a*c.n13+r*c.n23+q*c.n33+p*c.n43;this.n34=a*c.n14+r*c.n24+q*c.n34+p*c.n44;this.n41=l*c.n11+j*c.n21+h*c.n31+g*c.n41;this.n42=l*c.n12+j*c.n22+h*c.n32+g*c.n42;this.n43=l*c.n13+j*c.n23+h*c.n33+g*c.n43;this.n44=l*c.n14+j*c.n24+h*c.n34+g*c.n44},clone:function(){var a=new THREE.Matrix4();a.n11=this.n11;a.n12=this.n12;a.n13=this.n13;a.n14=this.n14;a.n21=this.n21;a.n22=this.n22;a.n23=this.n23;a.n24=this.n24;a.n31=this.n31;a.n32=this.n32;a.n33=this.n33;a.n34=this.n34;a.n41=this.n41;a.n42=this.n42;a.n43=this.n43;a.n44=this.n44;return a},toString:function(){return"| "+this.n11+" "+this.n12+" "+this.n13+" "+this.n14+" |\n| "+this.n21+" "+this.n22+" "+this.n23+" "+this.n24+" |\n| "+this.n31+" "+this.n32+" "+this.n33+" "+this.n34+" |\n| "+this.n41+" "+this.n42+" "+this.n43+" "+this.n44+" |"}};THREE.Matrix4.translationMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n14=b;a.n24=d;a.n34=c;return a};THREE.Matrix4.scaleMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n11=b;a.n22=d;a.n33=c;return a};THREE.Matrix4.rotationXMatrix=function(b){var a=new THREE.Matrix4();a.n22=a.n33=Math.cos(b);a.n32=Math.sin(b);a.n23=-a.n32;return a};THREE.Matrix4.rotationYMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n33=Math.cos(b);a.n13=Math.sin(b);a.n31=-a.n13;return a};THREE.Matrix4.rotationZMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n22=Math.cos(b);a.n21=Math.sin(b);a.n12=-a.n21;return a};THREE.Matrix4.makeFrustum=function(f,r,e,o,i,h){var g,q,n,p,l,k,j;g=new THREE.Matrix4();q=2*i/(r-f);n=2*i/(o-e);p=(r+f)/(r-f);l=(o+e)/(o-e);k=-(h+i)/(h-i);j=-2*h*i/(h-i);g.n11=q;g.n12=0;g.n13=p;g.n14=0;g.n21=0;g.n22=n;g.n23=l;g.n24=0;g.n31=0;g.n32=0;g.n33=k;g.n34=j;g.n41=0;g.n42=0;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(e,c,g,b){var a,f,h,d;a=g*Math.tan(e*Math.PI/360);f=-a;h=f*c;d=a*c;return THREE.Matrix4.makeFrustum(h,d,f,a,g,b)};THREE.Matrix4.makeOrtho=function(c,o,k,a,g,f){var d,l,j,i,n,e,b;d=new THREE.Matrix4();n=o-c;e=a-k;b=f-g;l=(o+c)/n;j=(a+k)/e;i=(f+g)/b;d.n11=2/n;d.n12=0;d.n13=0;d.n14=-l;d.n21=0;d.n22=2/e;d.n23=0;d.n24=-j;d.n31=0;d.n32=0;d.n33=-2/b;d.n34=-i;d.n41=0;d.n42=0;d.n43=0;d.n44=1;return d};THREE.Vertex=function(a,b){this.position=a||new THREE.Vector3();this.normal=b||new THREE.Vector3();this.screen=new THREE.Vector3();this.__visible=true;this.toString=function(){return"THREE.Vertex ( position: "+this.position+", normal: "+this.normal+" )"}};THREE.Face3=function(e,d,h,g,f){this.a=e;this.b=d;this.c=h;this.normal=g||new THREE.Vector3();this.screen=new THREE.Vector3();this.color=f||new THREE.Color(0);this.toString=function(){return"THREE.Face3 ( "+this.a+", "+this.b+", "+this.c+" )"}};THREE.Face4=function(f,e,j,i,h,g){this.a=f;this.b=e;this.c=j;this.d=i;this.normal=h||new THREE.Vector3();this.screen=new THREE.Vector3();this.color=g||new THREE.Color(0);this.toString=function(){return"THREE.Face4 ( "+this.a+", "+this.b+", "+this.c+" "+this.d+" )"}};THREE.UV=function(b,a){this.u=b||0;this.v=a||0};THREE.UV.prototype={copy:function(a){this.u=a.u;this.v=a.v}};THREE.Geometry=function(){this.vertices=[];this.faces=[];this.uvs=[];this.computeNormals=function(){var b,h,e,d,c,a,g,i;for(b=0;b<this.vertices.length;b++){this.vertices[b].normal.set(0,0,0)}for(h=0;h<this.faces.length;h++){e=this.vertices[this.faces[h].a];d=this.vertices[this.faces[h].b];c=this.vertices[this.faces[h].c];a=new THREE.Vector3();g=new THREE.Vector3();i=new THREE.Vector3();a.sub(c.position,d.position);g.sub(e.position,d.position);a.crossSelf(g);if(!a.isZero()){a.normalize()}this.faces[h].normal=a;e.normal.addSelf(i);d.normal.addSelf(i);c.normal.addSelf(i);if(this.faces[h] instanceof THREE.Face4){this.vertices[this.faces[h].d].normal.addSelf(i)}}}};THREE.Camera=function(c,b,d,a){this.position=new THREE.Vector3(0,0,0);this.target={position:new THREE.Vector3(0,0,0)};this.projectionMatrix=THREE.Matrix4.makePerspective(c,b,d,a);this.up=new THREE.Vector3(0,1,0);this.matrix=new THREE.Matrix4();this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrix.lookAt(this.position,this.target.position,this.up)};this.toString=function(){return"THREE.Camera ( "+this.position+", "+this.target.position+" )"}};THREE.Object3D=function(a){this.position=new THREE.Vector3();this.rotation=new THREE.Vector3();this.scale=new THREE.Vector3(1,1,1);this.matrix=new THREE.Matrix4();this.screen=new THREE.Vector3();this.material=a instanceof Array?a:[a];this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrix.identity();this.matrix.multiplySelf(THREE.Matrix4.translationMatrix(this.position.x,this.position.y,this.position.z));this.matrix.multiplySelf(THREE.Matrix4.rotationXMatrix(this.rotation.x));this.matrix.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y));this.matrix.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z));this.matrix.multiplySelf(THREE.Matrix4.scaleMatrix(this.scale.x,this.scale.y,this.scale.z))}};THREE.Line=function(b,a){THREE.Object3D.call(this,a);this.geometry=b};THREE.Line.prototype=new THREE.Object3D();THREE.Line.prototype.constructor=THREE.Line;THREE.Mesh=function(b,a){THREE.Object3D.call(this,a);this.geometry=b;this.flipSided=false;this.doubleSided=false;this.overdraw=false};THREE.Mesh.prototype=new THREE.Object3D();THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Particle=function(a){THREE.Object3D.call(this,a);this.autoUpdateMatrix=false};THREE.Particle.prototype=new THREE.Object3D();THREE.Particle.prototype.constructor=THREE.Particle;THREE.LineColorMaterial=function(c,b,a){this.lineWidth=a||1;this.color=new THREE.Color((b>=0?(b*255)<<24:4278190080)|c);this.toString=function(){return"THREE.LineColorMaterial ( color: "+this.color+", lineWidth: "+this.lineWidth+" )"}};THREE.MeshBitmapUVMappingMaterial=function(a){this.bitmap=a;this.toString=function(){return"THREE.MeshBitmapUVMappingMaterial ( bitmap: "+this.bitmap+" )"}};THREE.MeshColorFillMaterial=function(b,a){this.color=new THREE.Color((a>=0?(a*255)<<24:4278190080)|b);this.toString=function(){return"THREE.MeshColorFillMaterial ( color: "+this.color+" )"}};THREE.MeshColorStrokeMaterial=function(c,b,a){this.lineWidth=a||1;this.color=new THREE.Color((b>=0?(b*255)<<24:4278190080)|c);this.toString=function(){return"THREE.MeshColorStrokeMaterial ( lineWidth: "+this.lineWidth+", color: "+this.color+" )"}};THREE.MeshFaceColorFillMaterial=function(){this.toString=function(){return"THREE.MeshFaceColorFillMaterial ( )"}};THREE.MeshFaceColorStrokeMaterial=function(a){this.lineWidth=a||1;this.toString=function(){return"THREE.MeshFaceColorStrokeMaterial ( lineWidth: "+this.lineWidth+" )"}};THREE.ParticleBitmapMaterial=function(a){this.bitmap=a;this.toString=function(){return"THREE.ParticleBitmapMaterial ( bitmap: "+this.bitmap+" )"}};THREE.ParticleCircleMaterial=function(b,a){this.color=new THREE.Color((a>=0?(a*255)<<24:4278190080)|b);this.toString=function(){return"THREE.ParticleCircleMaterial ( color: "+this.color+" )"}};THREE.Scene=function(){this.objects=[];this.addObject=function(a){this.objects.push(a)};this.removeObject=function(b){for(var c=0,a=this.objects.length;c<a;c++){if(b==this.objects[c]){this.objects.splice(c,1);return}}};this.add=function(a){this.addObject(a)};this.toString=function(){return"THREE.Scene ( "+this.objects+" )"}};THREE.Renderer=function(){var f=[],c=[],e=[],a=[],b=new THREE.Vector4(),d=new THREE.Matrix4();function g(i,h){return h.z-i.z}this.renderList=null;this.project=function(A,x){var s,q,p,B,z,m,y,n,l,C,k,j,i,h,r=0,w=0,t=0,u=0;this.renderList=[];if(x.autoUpdateMatrix){x.updateMatrix()}for(s=0,q=A.objects.length;s<q;s++){C=A.objects[s];if(C.autoUpdateMatrix){C.updateMatrix()}if(C instanceof THREE.Mesh){d.multiply(x.matrix,C.matrix);for(p=0,B=C.geometry.vertices.length;p<B;p++){y=C.geometry.vertices[p];y.screen.copy(y.position);d.transform(y.screen);x.projectionMatrix.transform(y.screen);y.__visible=y.screen.z>0&&y.screen.z<1}for(z=0,m=C.geometry.faces.length;z<m;z++){l=C.geometry.faces[z];if(l instanceof THREE.Face3){k=C.geometry.vertices[l.a];j=C.geometry.vertices[l.b];i=C.geometry.vertices[l.c];if(k.__visible&&j.__visible&&i.__visible&&(C.doubleSided||(C.flipSided!=(i.screen.x-k.screen.x)*(j.screen.y-k.screen.y)-(i.screen.y-k.screen.y)*(j.screen.x-k.screen.x)<0))){if(!f[r]){f[r]=new THREE.RenderableFace3()}f[r].v1.copy(k.screen);f[r].v2.copy(j.screen);f[r].v3.copy(i.screen);f[r].z=Math.max(k.screen.z,Math.max(j.screen.z,i.screen.z));f[r].material=C.material;f[r].overdraw=C.overdraw;f[r].uvs=C.geometry.uvs[z];f[r].color=l.color;this.renderList.push(f[r]);r++}}else{if(l instanceof THREE.Face4){k=C.geometry.vertices[l.a];j=C.geometry.vertices[l.b];i=C.geometry.vertices[l.c];h=C.geometry.vertices[l.d];if(k.__visible&&j.__visible&&i.__visible&&h.__visible&&(C.doubleSided||(C.flipSided!=((h.screen.x-k.screen.x)*(j.screen.y-k.screen.y)-(h.screen.y-k.screen.y)*(j.screen.x-k.screen.x)<0||(j.screen.x-i.screen.x)*(h.screen.y-i.screen.y)-(j.screen.y-i.screen.y)*(h.screen.x-i.screen.x)<0)))){if(!c[w]){c[w]=new THREE.RenderableFace4()}c[w].v1.copy(k.screen);c[w].v2.copy(j.screen);c[w].v3.copy(i.screen);c[w].v4.copy(h.screen);c[w].z=Math.max(k.screen.z,Math.max(j.screen.z,Math.max(i.screen.z,h.screen.z)));c[w].material=C.material;c[w].overdraw=C.overdraw;c[w].uvs=C.geometry.uvs[z];c[w].color=l.color;this.renderList.push(c[w]);w++}}}}}else{if(C instanceof THREE.Line){d.multiply(x.matrix,C.matrix);for(p=0,B=C.geometry.vertices.length;p<B;p++){y=C.geometry.vertices[p];y.screen.copy(y.position);d.transform(y.screen);x.projectionMatrix.transform(y.screen);y.__visible=y.screen.z>0&&y.screen.z<1;if(p>0){n=C.geometry.vertices[p-1];if(y.__visible&&n.__visible){if(!e[t]){e[t]=new THREE.RenderableLine()}e[t].v1.copy(y.screen);e[t].v2.copy(n.screen);e[t].z=Math.max(y.screen.z,n.screen.z);e[t].material=C.material;this.renderList.push(e[t]);t++}}}}else{if(C instanceof THREE.Particle){b.set(C.position.x,C.position.y,C.position.z,1);x.matrix.transform(b);x.projectionMatrix.transform(b);C.screen.set(b.x/b.w,b.y/b.w,b.z/b.w);if(C.screen.z>0&&C.screen.z<1){if(!a[u]){a[u]=new THREE.RenderableParticle()}a[u].x=C.screen.x;a[u].y=C.screen.y;a[u].z=C.screen.z;a[u].rotation=C.rotation.z;a[u].scale.x=C.scale.x*Math.abs(b.x/b.w-(b.x+x.projectionMatrix.n11)/(b.w+x.projectionMatrix.n14));a[u].scale.y=C.scale.y*Math.abs(b.y/b.w-(b.y+x.projectionMatrix.n22)/(b.w+x.projectionMatrix.n24));a[u].material=C.material;a[u].color=C.color;this.renderList.push(a[u]);u++}}}}}this.renderList.sort(g)}};THREE.CanvasRenderer=function(){THREE.Renderer.call(this);var h=document.createElement("canvas"),a=h.getContext("2d"),c,e,l,i,g=new THREE.Rectangle(),b=new THREE.Rectangle(0,0,0,0),d=new THREE.Rectangle(),f=new THREE.Vector2();this.domElement=h;this.autoClear=true;this.setSize=function(n,m){c=n;e=m;l=c/2;i=e/2;h.width=c;h.height=e;a.setTransform(1,0,0,-1,l,i);g.set(-l,-i,l,i)};this.clear=function(){b.inflate(1);b.minSelf(g);a.clearRect(b.getX(),b.getY(),b.getWidth(),b.getHeight());b.empty()};this.render=function(L,F){var K,p,A,H,q,w,y=Math.PI*2,s,r,D,C,o,n,u,t,z,x,J=new THREE.UV(),I=new THREE.UV(),G=new THREE.UV(),E=new THREE.UV(),M,v,B;if(this.autoClear){this.clear()}a.fillStyle="rgba(0, 255, 255, 0.5)";a.fillRect(g.getX(),g.getY(),g.getWidth(),g.getHeight());this.project(L,F);for(K=0,p=this.renderList.length;K<p;K++){q=this.renderList[K];d.empty();if(q instanceof THREE.RenderableParticle){s=q.x*l;r=q.y*i;for(A=0,H=q.material.length;A<H;A++){w=q.material[A];if(w instanceof THREE.ParticleCircleMaterial){z=q.scale.x*l;x=q.scale.y*i;d.set(s-z,r-x,s+z,r+x);if(!g.instersects(d)){continue}a.save();a.translate(s,r);a.rotate(-q.rotation);a.scale(z,x);a.beginPath();a.arc(0,0,1,0,y,true);a.closePath();a.fillStyle=w.color.__styleString;a.fill();a.restore()}else{if(w instanceof THREE.ParticleBitmapMaterial){M=w.bitmap;v=M.width/2;B=M.height/2;z=q.scale.x*l*v;x=q.scale.y*i*B;d.set(s-z,r-x,s+z,r+x);if(!g.instersects(d)){continue}a.save();a.translate(s-z,r+x);a.rotate(-q.rotation);a.scale(q.scale.x*l,-(q.scale.y*i));a.drawImage(M,0,0);a.restore()}}}}else{if(q instanceof THREE.RenderableLine){s=q.v1.x*l;r=q.v1.y*i;D=q.v2.x*l;C=q.v2.y*i;d.addPoint(s,r);d.addPoint(D,C);if(!g.instersects(d)){continue}a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.closePath();for(A=0,H=q.material.length;A<H;A++){w=q.material[A];if(w instanceof THREE.LineColorMaterial){a.lineWidth=w.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=w.color.__styleString;a.stroke();d.inflate(a.lineWidth)}}}else{if(q instanceof THREE.RenderableFace3){q.v1.x*=l;q.v1.y*=i;q.v2.x*=l;q.v2.y*=i;q.v3.x*=l;q.v3.y*=i;if(q.overdraw){j(q.v1,q.v2);j(q.v2,q.v3);j(q.v3,q.v1)}s=q.v1.x;r=q.v1.y;D=q.v2.x;C=q.v2.y;o=q.v3.x;n=q.v3.y;d.addPoint(s,r);d.addPoint(D,C);d.addPoint(o,n);if(!g.instersects(d)){continue}for(A=0,H=q.material.length;A<H;A++){w=q.material[A];if(w instanceof THREE.MeshColorFillMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(s,r);a.closePath();a.fillStyle=w.color.__styleString;a.fill()}else{if(w instanceof THREE.MeshColorStrokeMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(s,r);a.closePath();a.lineWidth=w.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=w.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(w instanceof THREE.MeshFaceColorFillMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(s,r);a.closePath();a.fillStyle=q.color.__styleString;a.fill()}else{if(w instanceof THREE.MeshFaceColorStrokeMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(s,r);a.closePath();a.lineWidth=w.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=q.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(w instanceof THREE.MeshBitmapUVMappingMaterial){M=w.bitmap;v=M.width-1;B=M.height-1;if(!q.uvs[0]||!q.uvs[1]||!q.uvs[2]){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.fillStyle="rgb(0, 255, 0)";a.fill();continue}J.copy(q.uvs[0]);I.copy(q.uvs[1]);G.copy(q.uvs[2]);J.u*=v;J.v*=B;I.u*=v;I.v*=B;G.u*=v;G.v*=B;k(M,s,r,D,C,o,n,J.u,J.v,I.u,I.v,G.u,G.v)}}}}}}}else{if(q instanceof THREE.RenderableFace4){q.v1.x*=l;q.v1.y*=i;q.v2.x*=l;q.v2.y*=i;q.v3.x*=l;q.v3.y*=i;q.v4.x*=l;q.v4.y*=i;if(q.overdraw){j(q.v1,q.v2);j(q.v2,q.v3);j(q.v3,q.v4);j(q.v4,q.v1)}s=q.v1.x;r=q.v1.y;D=q.v2.x;C=q.v2.y;o=q.v3.x;n=q.v3.y;u=q.v4.x;t=q.v4.y;d.addPoint(s,r);d.addPoint(D,C);d.addPoint(o,n);d.addPoint(u,t);if(!g.instersects(d)){continue}for(A=0,H=q.material.length;A<H;A++){w=q.material[A];if(w instanceof THREE.MeshColorFillMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.fillStyle=w.color.__styleString;a.fill()}else{if(w instanceof THREE.MeshColorStrokeMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.lineWidth=w.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=w.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(w instanceof THREE.MeshFaceColorFillMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.fillStyle=q.color.__styleString;a.fill()}else{if(w instanceof THREE.MeshFaceColorStrokeMaterial){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.lineWidth=w.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=q.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(w instanceof THREE.MeshBitmapUVMappingMaterial){M=w.bitmap;v=M.width-1;B=M.height-1;if(!q.uvs[0]||!q.uvs[1]||!q.uvs[2]||!q.uvs[3]){a.beginPath();a.moveTo(s,r);a.lineTo(D,C);a.lineTo(o,n);a.lineTo(u,t);a.lineTo(s,r);a.closePath();a.fillStyle="rgb(255, 0, 255)";a.fill();continue}J.copy(q.uvs[0]);I.copy(q.uvs[1]);G.copy(q.uvs[2]);E.copy(q.uvs[3]);J.u*=v;J.v*=B;I.u*=v;I.v*=B;G.u*=v;G.v*=B;E.u*=v;E.v*=B;k(M,s,r,D,C,u,t,J.u,J.v,I.u,I.v,E.u,E.v);k(M,D,C,o,n,u,t,I.u,I.v,G.u,G.v,E.u,E.v)}}}}}}}}}}b.addRectangle(d)}a.lineWidth=1;a.strokeStyle="rgba( 255, 0, 0, 0.5 )";a.strokeRect(b.getX(),b.getY(),b.getWidth(),b.getHeight())};function k(F,u,t,A,z,o,m,C,B,q,p,y,x){var n,E,D,s,r,w,v;a.beginPath();a.moveTo(u,t);a.lineTo(A,z);a.lineTo(o,m);a.lineTo(u,t);a.closePath();a.save();a.clip();n=C*(x-p)-q*x+y*p+(q-y)*B;E=-(B*(o-A)-p*o+x*A+(p-x)*u)/n;D=(p*m+B*(z-m)-x*z+(x-p)*t)/n;s=(C*(o-A)-q*o+y*A+(q-y)*u)/n;r=-(q*m+C*(z-m)-y*z+(y-q)*t)/n;w=(C*(x*A-p*o)+B*(q*o-y*A)+(y*p-q*x)*u)/n;v=(C*(x*z-p*m)+B*(q*m-y*z)+(y*p-q*x)*t)/n;a.transform(E,D,s,r,w,v);a.drawImage(F,0,0);a.restore()}function j(n,m){f.sub(m,n);f.unit();m.addSelf(f);n.subSelf(f)}};THREE.CanvasRenderer.prototype=new THREE.Renderer();THREE.CanvasRenderer.prototype.constructor=THREE.CanvasRenderer;THREE.SVGRenderer=function(){THREE.Renderer.call(this);var g=document.createElementNS("http://www.w3.org/2000/svg","svg"),b,d,l,i,f=new THREE.Rectangle(),c=new THREE.Rectangle(),j=[],e=[],h=1;this.domElement=g;this.autoClear=true;this.setQuality=function(m){switch(m){case"high":h=1;break;case"low":h=0;break}};this.setSize=function(n,m){b=n;d=m;l=b/2;i=d/2;g.setAttribute("viewBox",(-l)+" "+(-i)+" "+b+" "+d);g.setAttribute("width",b);g.setAttribute("height",d);f.set(-l,-i,l,i)};this.clear=function(){while(g.childNodes.length>0){g.removeChild(g.childNodes[0])}};this.render=function(G,D){var F,p,A,E,q,w,z=0,r=0,x,u,s,C,B,o,n,v,t,y;if(this.autoClear){this.clear()}this.project(G,D);for(F=0,p=this.renderList.length;F<p;F++){q=this.renderList[F];for(A=0,E=q.material.length;A<E;A++){w=q.material[A];c.empty();if(q instanceof THREE.RenderableParticle){u=q.x*l;s=q.y*-i;y=q.size*l;c.set(u-y,s-y,u+y,s+y);if(!f.instersects(c)){continue}x=k(r++);x.setAttribute("cx",u);x.setAttribute("cy",s);x.setAttribute("r",y)}else{if(q instanceof THREE.RenderableFace3){u=q.v1.x*l;s=q.v1.y*-i;C=q.v2.x*l;B=q.v2.y*-i;o=q.v3.x*l;n=q.v3.y*-i;c.addPoint(u,s);c.addPoint(C,B);c.addPoint(o,n);if(!f.instersects(c)){continue}x=a(z++);x.setAttribute("d","M "+u+" "+s+" L "+C+" "+B+" L "+o+","+n+"z")}else{if(q instanceof THREE.RenderableFace4){u=q.v1.x*l;s=q.v1.y*-i;C=q.v2.x*l;B=q.v2.y*-i;o=q.v3.x*l;n=q.v3.y*-i;v=q.v4.x*l;t=q.v4.y*-i;c.addPoint(u,s);c.addPoint(C,B);c.addPoint(o,n);c.addPoint(v,t);if(!f.instersects(c)){continue}x=a(z++);x.setAttribute("d","M "+u+" "+s+" L "+C+" "+B+" L "+o+","+n+" L "+v+","+t+"z")}}}if(w instanceof THREE.MeshColorFillMaterial){x.setAttribute("style","fill: "+w.color.__styleString)}else{if(w instanceof THREE.MeshFaceColorFillMaterial){x.setAttribute("style","fill: "+q.color.__styleString)}else{if(w instanceof THREE.MeshColorStrokeMaterial){x.setAttribute("style","fill: none; stroke: "+w.color.__styleString+"; stroke-width: "+w.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}else{if(w instanceof THREE.MeshFaceColorStrokeMaterial){x.setAttribute("style","fill: none; stroke: "+q.color.__styleString+"; stroke-width: "+w.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}}}}g.appendChild(x)}}};function a(m){if(j[m]==null){j[m]=document.createElementNS("http://www.w3.org/2000/svg","path");if(h==0){j[m].setAttribute("shape-rendering","crispEdges")}return j[m]}return j[m]}function k(m){if(e[m]==null){e[m]=document.createElementNS("http://www.w3.org/2000/svg","circle");if(h==0){e[m].setAttribute("shape-rendering","crispEdges")}return e[m]}return e[m]}};THREE.SVGRenderer.prototype=new THREE.Renderer();THREE.SVGRenderer.prototype.constructor=THREE.CanvasRenderer;THREE.WebGLRenderer=function(){var e=document.createElement("canvas"),a,h,d=new THREE.Matrix4();this.domElement=e;this.autoClear=true;f();c();this.setSize=function(j,i){e.width=j;e.height=i;a.viewport(0,0,e.width,e.height)};this.clear=function(){a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT)};this.render=function(D,A){var q,E,F,v,u,w,p,s,x,t,C,r,y,B,z,n,l,k,j;if(this.autoClear){this.clear()}for(x=0,t=D.objects.length;x<t;x++){F=D.objects[x];if(F instanceof THREE.Mesh){if(!F.__webGLVertexBuffer){u=[];w=[];p=[];s=0;for(C=0,r=F.geometry.faces.length;C<r;C++){q=F.geometry.faces[C];E=q.color;if(q instanceof THREE.Face3){n=F.geometry.vertices[q.a].position;l=F.geometry.vertices[q.b].position;k=F.geometry.vertices[q.c].position;u.push(n.x,n.y,n.z);u.push(l.x,l.y,l.z);u.push(k.x,k.y,k.z);p.push(E.r,E.g,E.b,E.a);p.push(E.r,E.g,E.b,E.a);p.push(E.r,E.g,E.b,E.a);w.push(s,s+1,s+2);s+=3}else{if(q instanceof THREE.Face4){n=F.geometry.vertices[q.a].position;l=F.geometry.vertices[q.b].position;k=F.geometry.vertices[q.c].position;j=F.geometry.vertices[q.d].position;u.push(n.x,n.y,n.z);u.push(l.x,l.y,l.z);u.push(k.x,k.y,k.z);u.push(j.x,j.y,j.z);p.push(E.r,E.g,E.b,E.a);p.push(E.r,E.g,E.b,E.a);p.push(E.r,E.g,E.b,E.a);p.push(E.r,E.g,E.b,E.a);w.push(s,s+1,s+2);w.push(s,s+2,s+3);s+=4}}}if(!u.length){continue}F.__webGLVertexBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,F.__webGLVertexBuffer);a.bufferData(a.ARRAY_BUFFER,new WebGLFloatArray(u),a.STATIC_DRAW);F.__webGLColorBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,F.__webGLColorBuffer);a.bufferData(a.ARRAY_BUFFER,new WebGLFloatArray(p),a.STATIC_DRAW);F.__webGLFaceBuffer=a.createBuffer();a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,F.__webGLFaceBuffer);a.bufferData(a.ELEMENT_ARRAY_BUFFER,new WebGLUnsignedShortArray(w),a.STATIC_DRAW);F.__webGLFaceCount=w.length}d.multiply(A.matrix,F.matrix);g(d,h.viewMatrixArray);g(A.projectionMatrix,h.projectionMatrixArray);a.uniformMatrix4fv(h.viewMatrix,false,h.viewMatrixArray);a.uniformMatrix4fv(h.projectionMatrix,false,h.projectionMatrixArray);a.bindBuffer(a.ARRAY_BUFFER,F.__webGLVertexBuffer);a.vertexAttribPointer(h.position,3,a.FLOAT,false,0,0);for(y=0,B=F.material.length;y<B;y++){v=F.material[y];if(v instanceof THREE.MeshColorFillMaterial){if(!v.__webGLColorBuffer){p=[];for(z=0;z<F.__webGLFaceCount;z++){p.push(v.color.r,v.color.g,v.color.b,v.color.a)}v.__webGLColorBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,v.__webGLColorBuffer);a.bufferData(a.ARRAY_BUFFER,new WebGLFloatArray(p),a.STATIC_DRAW)}a.bindBuffer(a.ARRAY_BUFFER,v.__webGLColorBuffer);a.vertexAttribPointer(h.color,4,a.FLOAT,false,0,0)}else{if(v instanceof THREE.MeshFaceColorFillMaterial){a.bindBuffer(a.ARRAY_BUFFER,F.__webGLColorBuffer);a.enableVertexAttribArray(h.color);a.vertexAttribPointer(h.color,4,a.FLOAT,false,0,0)}}}a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,F.__webGLFaceBuffer);a.drawElements(a.TRIANGLES,F.__webGLFaceCount,a.UNSIGNED_SHORT,0)}}};function f(){try{a=e.getContext("experimental-webgl")}catch(i){}if(!a){alert("WebGL not supported");throw"cannot create webgl context"}a.clearColor(0,0,0,1);a.clearDepth(1);a.enable(a.DEPTH_TEST);a.depthFunc(a.LEQUAL);a.enable(a.BLEND);a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA);a.clearColor(0,0,0,0)}function c(){h=a.createProgram();a.attachShader(h,b("fragment",["varying vec4 vcolor;","void main(){","gl_FragColor = vcolor;","}"].join("")));a.attachShader(h,b("vertex",["attribute vec3 position;","attribute vec4 color;","uniform mat4 viewMatrix;","uniform mat4 projectionMatrix;","varying vec4 vcolor;","void main(void) {","vcolor = color;","gl_Position = projectionMatrix * viewMatrix * vec4( position, 1 );","}"].join("")));a.linkProgram(h);if(!a.getProgramParameter(h,a.LINK_STATUS)){alert("Could not initialise shaders")}a.useProgram(h);h.viewMatrix=a.getUniformLocation(h,"viewMatrix");h.projectionMatrix=a.getUniformLocation(h,"projectionMatrix");h.color=a.getAttribLocation(h,"color");a.enableVertexAttribArray(h.color);h.position=a.getAttribLocation(h,"position");a.enableVertexAttribArray(h.position);h.viewMatrixArray=new WebGLFloatArray(16);h.projectionMatrixArray=new WebGLFloatArray(16)}function b(j,i){var k;if(j=="fragment"){k=a.createShader(a.FRAGMENT_SHADER)}else{if(j=="vertex"){k=a.createShader(a.VERTEX_SHADER)}}a.shaderSource(k,i);a.compileShader(k);if(!a.getShaderParameter(k,a.COMPILE_STATUS)){alert(a.getShaderInfoLog(k));return null}return k}function g(i,j){j[0]=i.n11;j[1]=i.n21;j[2]=i.n31;j[3]=i.n41;j[4]=i.n12;j[5]=i.n22;j[6]=i.n32;j[7]=i.n42;j[8]=i.n13;j[9]=i.n23;j[10]=i.n33;j[11]=i.n43;j[12]=i.n14;j[13]=i.n24;j[14]=i.n34;j[15]=i.n44}};THREE.RenderableFace3=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.z=null;this.color=null;this.material=null};THREE.RenderableFace4=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.v4=new THREE.Vector2();this.z=null;this.color=null;this.material=null};THREE.RenderableParticle=function(){this.x=null;this.y=null;this.z=null;this.rotation=null;this.scale=new THREE.Vector2();this.color=null;this.material=null};THREE.RenderableLine=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.z=null;this.color=null;this.material=null};