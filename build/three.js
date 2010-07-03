// three.js r11 - http://github.com/mrdoob/three.js
var THREE=THREE||{};THREE.Color=function(c){var f,e,a,b,d;this.__styleString="rgba(0, 0, 0, 1)";this.setHex=function(g){d=g;this.updateRGBA();this.updateStyleString()};this.setRGBA=function(k,j,h,i){f=k;e=j;a=h;b=i;this.updateHex();this.updateStyleString()};this.updateHex=function(){d=Math.floor(b*255)<<24|f<<16|e<<8|a};this.updateRGBA=function(){f=d>>16&255;e=d>>8&255;a=d&255;b=(d>>24&255)/255};this.updateStyleString=function(){this.__styleString="rgba("+f+","+e+","+a+","+b+")"};this.toString=function(){return"THREE.Color ( r: "+f+", g: "+e+", b: "+a+", a: "+b+", hex: "+d+" )"};this.setHex(c)};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0;this.set=function(c,d){this.x=c;this.y=d};this.copy=function(c){this.x=c.x;this.y=c.y};this.addSelf=function(c){this.x+=c.x;this.y+=c.y};this.add=function(d,c){this.x=d.x+c.x;this.y=d.y+c.y};this.subSelf=function(c){this.x-=c.x;this.y-=c.y};this.sub=function(d,c){this.x=d.x-c.x;this.y=d.y-c.y};this.multiplyScalar=function(c){this.x*=c;this.y*=c};this.unit=function(){this.multiplyScalar(1/this.length())};this.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};this.lengthSq=function(){return this.x*this.x+this.y*this.y};this.negate=function(){this.x=-this.x;this.y=-this.y};this.clone=function(){return new THREE.Vector2(this.x,this.y)};this.toString=function(){return"THREE.Vector2 ("+this.x+", "+this.y+")"}};THREE.Vector3=function(a,c,b){this.x=a||0;this.y=c||0;this.z=b||0;this.set=function(d,f,e){this.x=d;this.y=f;this.z=e};this.copy=function(d){this.x=d.x;this.y=d.y;this.z=d.z};this.add=function(e,d){this.x=e.x+d.x;this.y=e.y+d.y;this.z=e.z+d.z};this.addSelf=function(d){this.x+=d.x;this.y+=d.y;this.z+=d.z};this.addScalar=function(d){this.x+=d;this.y+=d;this.z+=d};this.sub=function(e,d){this.x=e.x-d.x;this.y=e.y-d.y;this.z=e.z-d.z};this.subSelf=function(d){this.x-=d.x;this.y-=d.y;this.z-=d.z};this.cross=function(e,d){this.x=e.y*d.z-e.z*d.y;this.y=e.z*d.x-e.x*d.z;this.z=e.x*d.y-e.y*d.x};this.crossSelf=function(f){var e=this.x,d=this.y,g=this.z;this.x=d*f.z-g*f.y;this.y=g*f.x-e*f.z;this.z=e*f.y-d*f.x};this.multiplySelf=function(d){this.x*=d.x;this.y*=d.y;this.z*=d.z};this.multiplyScalar=function(d){this.x*=d;this.y*=d;this.z*=d};this.dot=function(d){return this.x*d.x+this.y*d.y+this.z*d.z};this.distanceTo=function(d){return Math.sqrt(this.distanceToSquared(d))};this.distanceToSquared=function(g){var f=this.x-g.x,e=this.y-g.y,d=this.z-g.z;return f*f+e*e+d*d};this.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)};this.lengthSq=function(){return this.x*this.x+this.y*this.y+this.z*this.z};this.negate=function(){this.x=-this.x;this.y=-this.y;this.z=-this.z};this.normalize=function(){if(this.length()>0){this.multiplyScalar(1/this.length())}else{this.multiplyScalar(0)}};this.clone=function(){return new THREE.Vector3(this.x,this.y,this.z)};this.toString=function(){return"THREE.Vector3 ( "+this.x+", "+this.y+", "+this.z+" )"}};THREE.Vector4=function(a,d,c,b){this.x=a||0;this.y=d||0;this.z=c||0;this.w=b||1;this.set=function(e,h,g,f){this.x=e;this.y=h;this.z=g;this.w=f};this.copy=function(e){this.x=e.x;this.y=e.y;this.z=e.z;this.w=e.w};this.add=function(f,e){this.x=f.x+e.x;this.y=f.y+e.y;this.z=f.z+e.z;this.w=f.w+e.w};this.addSelf=function(e){this.x+=e.x;this.y+=e.y;this.z+=e.z;this.w+=e.w};this.sub=function(f,e){this.x=f.x-e.x;this.y=f.y-e.y;this.z=f.z-e.z;this.w=f.w-e.w};this.subSelf=function(e){this.x-=e.x;this.y-=e.y;this.z-=e.z;this.w-=e.w};this.clone=function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)};this.toString=function(){return"THREE.Vector4 ("+this.x+", "+this.y+", "+this.z+", "+this.w+")"}};THREE.Rectangle=function(b,l,a,j){var k=b,g=l,i=a,f=j,d=i-k,e=f-g,h=false;function c(){d=i-k;e=f-g}this.getX=function(){return k};this.getY=function(){return g};this.getWidth=function(){return d};this.getHeight=function(){return e};this.getX1=function(){return k};this.getY1=function(){return g};this.getX2=function(){return i};this.getY2=function(){return f};this.set=function(n,p,m,o){h=false;k=n;g=p;i=m;f=o;c()};this.addPoint=function(m,n){if(h){h=false;k=m;g=n;i=m;f=n}else{k=Math.min(k,m);g=Math.min(g,n);i=Math.max(i,m);f=Math.max(f,n)}c()};this.addRectangle=function(m){if(h){h=false;k=m.getX1();g=m.getY1();i=m.getX2();f=m.getY2()}else{k=Math.min(k,m.getX1());g=Math.min(g,m.getY1());i=Math.max(i,m.getX2());f=Math.max(f,m.getY2())}c()};this.inflate=function(m){k-=m;g-=m;i+=m;f+=m;c()};this.minSelf=function(m){k=Math.max(k,m.getX1());g=Math.max(g,m.getY1());i=Math.min(i,m.getX2());f=Math.min(f,m.getY2());c()};this.instersects=function(m){return Math.min(i,m.getX2())-Math.max(k,m.getX1())>0&&Math.min(f,m.getY2())-Math.max(g,m.getY1())>0};this.empty=function(){h=true;k=0;g=0;i=0;f=0;c()};this.toString=function(){return"THREE.Rectangle (x1: "+k+", y1: "+f+", x2: "+i+", y1: "+g+", width: "+d+", height: "+e+")"}};THREE.Matrix4=function(){var a,c,b;a=new THREE.Vector3();c=new THREE.Vector3();b=new THREE.Vector3();this.n11=1;this.n12=0;this.n13=0;this.n14=0;this.n21=0;this.n22=1;this.n23=0;this.n24=0;this.n31=0;this.n32=0;this.n33=1;this.n34=0;this.n41=0;this.n42=0;this.n43=0;this.n44=1;this.identity=function(){this.n11=1;this.n12=0;this.n13=0;this.n14=0;this.n21=0;this.n22=1;this.n23=0;this.n24=0;this.n31=0;this.n32=0;this.n33=1;this.n34=0;this.n41=0;this.n42=0;this.n43=0;this.n44=1};this.lookAt=function(f,e,d){b.sub(f,e);b.normalize();a.cross(d,b);a.normalize();c.cross(b,a);c.normalize();c.negate();this.n11=a.x;this.n12=a.y;this.n13=a.z;this.n14=-a.dot(f);this.n21=c.x;this.n22=c.y;this.n23=c.z;this.n24=-c.dot(f);this.n31=b.x;this.n32=b.y;this.n33=b.z;this.n34=-b.dot(f)};this.transform=function(d){var g=d.x,f=d.y,e=d.z,h=d.w?d.w:1;d.x=this.n11*g+this.n12*f+this.n13*e+this.n14*h;d.y=this.n21*g+this.n22*f+this.n23*e+this.n24*h;d.z=this.n31*g+this.n32*f+this.n33*e+this.n34*h;h=this.n41*g+this.n42*f+this.n43*e+this.n44*h;if(d.w){d.w=h}else{d.x=d.x/h;d.y=d.y/h;d.z=d.z/h}};this.crossVector=function(d){var e=new THREE.Vector4();e.x=this.n11*d.x+this.n12*d.y+this.n13*d.z+this.n14*d.w;e.y=this.n21*d.x+this.n22*d.y+this.n23*d.z+this.n24*d.w;e.z=this.n31*d.x+this.n32*d.y+this.n33*d.z+this.n34*d.w;e.w=(d.w)?this.n41*d.x+this.n42*d.y+this.n43*d.z+this.n44*d.w:1;return e};this.multiply=function(e,d){this.n11=e.n11*d.n11+e.n12*d.n21+e.n13*d.n31+e.n14*d.n41;this.n12=e.n11*d.n12+e.n12*d.n22+e.n13*d.n32+e.n14*d.n42;this.n13=e.n11*d.n13+e.n12*d.n23+e.n13*d.n33+e.n14*d.n43;this.n14=e.n11*d.n14+e.n12*d.n24+e.n13*d.n34+e.n14*d.n44;this.n21=e.n21*d.n11+e.n22*d.n21+e.n23*d.n31+e.n24*d.n41;this.n22=e.n21*d.n12+e.n22*d.n22+e.n23*d.n32+e.n24*d.n42;this.n23=e.n21*d.n13+e.n22*d.n23+e.n23*d.n33+e.n24*d.n43;this.n24=e.n21*d.n14+e.n22*d.n24+e.n23*d.n34+e.n24*d.n44;this.n31=e.n31*d.n11+e.n32*d.n21+e.n33*d.n31+e.n34*d.n41;this.n32=e.n31*d.n12+e.n32*d.n22+e.n33*d.n32+e.n34*d.n42;this.n33=e.n31*d.n13+e.n32*d.n23+e.n33*d.n33+e.n34*d.n43;this.n34=e.n31*d.n14+e.n32*d.n24+e.n33*d.n34+e.n34*d.n44;this.n41=e.n41*d.n11+e.n42*d.n21+e.n43*d.n31+e.n44*d.n41;this.n42=e.n41*d.n12+e.n42*d.n22+e.n43*d.n32+e.n44*d.n42;this.n43=e.n41*d.n13+e.n42*d.n23+e.n43*d.n33+e.n44*d.n43;this.n44=e.n41*d.n14+e.n42*d.n24+e.n43*d.n34+e.n44*d.n44};this.multiplySelf=function(f){var r=this.n11,q=this.n12,o=this.n13,l=this.n14,i=this.n21,h=this.n22,g=this.n23,e=this.n24,d=this.n31,u=this.n32,t=this.n33,s=this.n34,p=this.n41,n=this.n42,k=this.n43,j=this.n44;this.n11=r*f.n11+q*f.n21+o*f.n31+l*f.n41;this.n12=r*f.n12+q*f.n22+o*f.n32+l*f.n42;this.n13=r*f.n13+q*f.n23+o*f.n33+l*f.n43;this.n14=r*f.n14+q*f.n24+o*f.n34+l*f.n44;this.n21=i*f.n11+h*f.n21+g*f.n31+e*f.n41;this.n22=i*f.n12+h*f.n22+g*f.n32+e*f.n42;this.n23=i*f.n13+h*f.n23+g*f.n33+e*f.n43;this.n24=i*f.n14+h*f.n24+g*f.n34+e*f.n44;this.n31=d*f.n11+u*f.n21+t*f.n31+s*f.n41;this.n32=d*f.n12+u*f.n22+t*f.n32+s*f.n42;this.n33=d*f.n13+u*f.n23+t*f.n33+s*f.n43;this.n34=d*f.n14+u*f.n24+t*f.n34+s*f.n44;this.n41=p*f.n11+n*f.n21+k*f.n31+j*f.n41;this.n42=p*f.n12+n*f.n22+k*f.n32+j*f.n42;this.n43=p*f.n13+n*f.n23+k*f.n33+j*f.n43;this.n44=p*f.n14+n*f.n24+k*f.n34+j*f.n44};this.clone=function(){var d=new THREE.Matrix4();d.n11=this.n11;d.n12=this.n12;d.n13=this.n13;d.n14=this.n14;d.n21=this.n21;d.n22=this.n22;d.n23=this.n23;d.n24=this.n24;d.n31=this.n31;d.n32=this.n32;d.n33=this.n33;d.n34=this.n34;d.n41=this.n41;d.n42=this.n42;d.n43=this.n43;d.n44=this.n44;return d};this.toString=function(){return"| "+this.n11+" "+this.n12+" "+this.n13+" "+this.n14+" |\n| "+this.n21+" "+this.n22+" "+this.n23+" "+this.n24+" |\n| "+this.n31+" "+this.n32+" "+this.n33+" "+this.n34+" |\n| "+this.n41+" "+this.n42+" "+this.n43+" "+this.n44+" |"}};THREE.Matrix4.translationMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n14=b;a.n24=d;a.n34=c;return a};THREE.Matrix4.scaleMatrix=function(b,d,c){var a=new THREE.Matrix4();a.n11=b;a.n22=d;a.n33=c;return a};THREE.Matrix4.rotationXMatrix=function(b){var a=new THREE.Matrix4();a.n22=a.n33=Math.cos(b);a.n32=Math.sin(b);a.n23=-a.n32;return a};THREE.Matrix4.rotationYMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n33=Math.cos(b);a.n13=Math.sin(b);a.n31=-a.n13;return a};THREE.Matrix4.rotationZMatrix=function(b){var a=new THREE.Matrix4();a.n11=a.n22=Math.cos(b);a.n21=Math.sin(b);a.n12=-a.n21;return a};THREE.Matrix4.makeFrustum=function(f,r,e,o,i,h){var g,q,n,p,l,k,j;g=new THREE.Matrix4();q=2*i/(r-f);n=2*i/(o-e);p=(r+f)/(r-f);l=(o+e)/(o-e);k=-(h+i)/(h-i);j=-2*h*i/(h-i);g.n11=q;g.n13=p;g.n22=n;g.n23=l;g.n33=k;g.n34=j;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(e,c,g,b){var a,f,h,d;a=g*Math.tan(e*Math.PI/360);f=-a;h=f*c;d=a*c;return THREE.Matrix4.makeFrustum(h,d,f,a,g,b)};THREE.Vertex=function(a,b){this.position=a||new THREE.Vector3();this.normal=b||new THREE.Vector3();this.screen=new THREE.Vector3();this.__visible=true;this.toString=function(){return"THREE.Vertex ( position: "+this.position+", normal: "+this.normal+" )"}};THREE.Face3=function(e,d,h,g,f){this.a=e;this.b=d;this.c=h;this.normal=g||new THREE.Vector3();this.screen=new THREE.Vector3();this.color=f||new THREE.Color(0);this.toString=function(){return"THREE.Face3 ( "+this.a+", "+this.b+", "+this.c+" )"}};THREE.Face4=function(f,e,j,i,h,g){this.a=f;this.b=e;this.c=j;this.d=i;this.normal=h||new THREE.Vector3();this.screen=new THREE.Vector3();this.color=g||new THREE.Color(0);this.toString=function(){return"THREE.Face4 ( "+this.a+", "+this.b+", "+this.c+" "+this.d+" )"}};THREE.Geometry=function(){this.vertices=[];this.faces=[];this.uvs=[]};THREE.Camera=function(c,b,d,a){this.position=new THREE.Vector3(0,0,0);this.target={position:new THREE.Vector3(0,0,0)};this.projectionMatrix=THREE.Matrix4.makePerspective(c,b,d,a);this.up=new THREE.Vector3(0,1,0);this.matrix=new THREE.Matrix4();this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrix.lookAt(this.position,this.target.position,this.up)};this.toString=function(){return"THREE.Camera ( "+this.position+", "+this.target.position+" )"}};THREE.Object3D=function(a){this.position=new THREE.Vector3();this.rotation=new THREE.Vector3();this.scale=new THREE.Vector3(1,1,1);this.matrix=new THREE.Matrix4();this.screen=new THREE.Vector3();this.material=a instanceof Array?a:[a];this.overdraw=false;this.autoUpdateMatrix=true;this.updateMatrix=function(){this.matrix.identity();this.matrix.multiplySelf(THREE.Matrix4.translationMatrix(this.position.x,this.position.y,this.position.z));this.matrix.multiplySelf(THREE.Matrix4.rotationXMatrix(this.rotation.x));this.matrix.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y));this.matrix.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z));this.matrix.multiplySelf(THREE.Matrix4.scaleMatrix(this.scale.x,this.scale.y,this.scale.z))}};THREE.Line=function(b,a){THREE.Object3D.call(this,a);this.geometry=b};THREE.Line.prototype=new THREE.Object3D();THREE.Line.prototype.constructor=THREE.Line;THREE.Mesh=function(b,a){THREE.Object3D.call(this,a);this.geometry=b;this.doubleSided=false};THREE.Mesh.prototype=new THREE.Object3D();THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Particle=function(a){THREE.Object3D.call(this,a);this.size=1;this.autoUpdateMatrix=false};THREE.Particle.prototype=new THREE.Object3D();THREE.Particle.prototype.constructor=THREE.Particle;THREE.BitmapUVMappingMaterial=function(a){this.bitmap=a;this.toString=function(){return"THREE.BitmapUVMappingMaterial ( bitmap: "+this.bitmap+" )"}};THREE.ColorFillMaterial=function(b,a){this.color=new THREE.Color((a>=0?(a*255)<<24:4278190080)|b);this.toString=function(){return"THREE.ColorFillMaterial ( color: "+this.color+" )"}};THREE.ColorStrokeMaterial=function(a,c,b){this.lineWidth=a||1;this.color=new THREE.Color((b>=0?(b*255)<<24:4278190080)|c);this.toString=function(){return"THREE.ColorStrokeMaterial ( lineWidth: "+this.lineWidth+", color: "+this.color+" )"}};THREE.FaceColorFillMaterial=function(){this.toString=function(){return"THREE.FaceColorFillMaterial ( )"}};THREE.FaceColorStrokeMaterial=function(a){this.lineWidth=a||1;this.toString=function(){return"THREE.FaceColorStrokeMaterial ( lineWidth: "+this.lineWidth+" )"}};THREE.Scene=function(){this.objects=[];this.addObject=function(a){this.objects.push(a)};this.removeObject=function(b){for(var c=0,a=this.objects.length;c<a;c++){if(b==this.objects[c]){this.objects.splice(c,1);return}}};this.add=function(a){this.addObject(a)};this.toString=function(){return"THREE.Scene ( "+this.objects+" )"}};THREE.Renderer=function(){var f=[],d=[],e=[],a=[],c=new THREE.Vector4(),b=new THREE.Matrix4();function g(i,h){return h.z-i.z}this.renderList=null;this.project=function(z,x){var v,t,y,q,p,A,n,m,l,k,r=0,w=0,s=0,u=0,o=0,h=0;this.renderList=[];if(x.autoUpdateMatrix){x.updateMatrix()}for(v=0;v<z.objects.length;v++){A=z.objects[v];if(A.autoUpdateMatrix){A.updateMatrix()}if(A instanceof THREE.Mesh){b.multiply(x.matrix,A.matrix);o=A.geometry.vertices.length;for(t=0;t<o;t++){y=A.geometry.vertices[t];y.screen.copy(y.position);b.transform(y.screen);x.projectionMatrix.transform(y.screen);y.__visible=y.screen.z>0&&y.screen.z<1}h=A.geometry.faces.length;for(t=0;t<h;t++){p=A.geometry.faces[t];if(p instanceof THREE.Face3){n=A.geometry.vertices[p.a];m=A.geometry.vertices[p.b];l=A.geometry.vertices[p.c];if(n.__visible&&m.__visible&&l.__visible&&(A.doubleSided||(l.screen.x-n.screen.x)*(m.screen.y-n.screen.y)-(l.screen.y-n.screen.y)*(m.screen.x-n.screen.x)>0)){p.screen.z=Math.max(n.screen.z,Math.max(m.screen.z,l.screen.z));if(!f[r]){f[r]=new THREE.RenderableFace3()}f[r].v1.x=n.screen.x;f[r].v1.y=n.screen.y;f[r].v2.x=m.screen.x;f[r].v2.y=m.screen.y;f[r].v3.x=l.screen.x;f[r].v3.y=l.screen.y;f[r].z=p.screen.z;f[r].material=A.material;f[r].overdraw=A.overdraw;f[r].uvs=A.geometry.uvs[t];f[r].color=p.color;this.renderList.push(f[r]);r++}}else{if(p instanceof THREE.Face4){n=A.geometry.vertices[p.a];m=A.geometry.vertices[p.b];l=A.geometry.vertices[p.c];k=A.geometry.vertices[p.d];if(n.__visible&&m.__visible&&l.__visible&&k.__visible&&(A.doubleSided||((k.screen.x-n.screen.x)*(m.screen.y-n.screen.y)-(k.screen.y-n.screen.y)*(m.screen.x-n.screen.x)>0||(m.screen.x-l.screen.x)*(k.screen.y-l.screen.y)-(m.screen.y-l.screen.y)*(k.screen.x-l.screen.x)>0))){p.screen.z=Math.max(n.screen.z,Math.max(m.screen.z,Math.max(l.screen.z,k.screen.z)));if(!d[w]){d[w]=new THREE.RenderableFace4()}d[w].v1.x=n.screen.x;d[w].v1.y=n.screen.y;d[w].v2.x=m.screen.x;d[w].v2.y=m.screen.y;d[w].v3.x=l.screen.x;d[w].v3.y=l.screen.y;d[w].v4.x=k.screen.x;d[w].v4.y=k.screen.y;d[w].z=p.screen.z;d[w].material=A.material;d[w].overdraw=A.overdraw;d[w].uvs=A.geometry.uvs[t];d[w].color=p.color;this.renderList.push(d[w]);w++}}}}}else{if(A instanceof THREE.Line){b.multiply(x.matrix,A.matrix);o=A.geometry.vertices.length;for(t=0;t<o;t++){y=A.geometry.vertices[t];y.screen.copy(y.position);b.transform(y.screen);x.projectionMatrix.transform(y.screen);y.__visible=y.screen.z>0&&y.screen.z<1;if(t>0){q=A.geometry.vertices[t-1];if(y.__visible&&q.__visible){if(!e[s]){e[s]=new THREE.RenderableLine()}e[s].v1.x=y.screen.x;e[s].v1.y=y.screen.y;e[s].v2.x=q.screen.x;e[s].v2.y=q.screen.y;e[s].z=Math.max(y.screen.z,q.screen.z);e[s].material=A.material;this.renderList.push(e[s]);s++}}}}else{if(A instanceof THREE.Particle){c.set(A.position.x,A.position.y,A.position.z,1);x.matrix.transform(c);x.projectionMatrix.transform(c);A.screen.set(c.x/c.w,c.y/c.w,c.z/c.w);if(A.screen.z>0&&A.screen.z<1){if(!a[u]){a[u]=new THREE.RenderableParticle()}a[u].x=A.screen.x;a[u].y=A.screen.y;a[u].z=A.screen.z;a[u].size=A.size*Math.abs(c.x/c.w-(c.x+x.projectionMatrix.n11)/(c.w+x.projectionMatrix.n14));a[u].material=A.material;a[u].color=A.color;this.renderList.push(a[u]);u++}}}}}this.renderList.sort(g)}};THREE.CanvasRenderer=function(){THREE.Renderer.call(this);var h=document.createElement("canvas"),a=h.getContext("2d"),c,e,k,i,g=new THREE.Rectangle(),b=new THREE.Rectangle(0,0,0,0),d=new THREE.Rectangle(),f=new THREE.Vector2();this.domElement=h;this.autoClear=true;this.setSize=function(m,l){c=m;e=l;k=c/2;i=e/2;h.width=c;h.height=e;a.setTransform(1,0,0,1,k,i);g.set(-k,-i,k,i)};this.clear=function(){b.inflate(1);b.minSelf(g);a.clearRect(b.getX(),b.getY(),b.getWidth(),b.getHeight());b.empty()};this.render=function(G,z){var V,U,v,u=Math.PI*2,F,S,t,n,m,Q,P,E,C,r,p,D=new THREE.Vector2(),B=new THREE.Vector2(),A=new THREE.Vector2(),N=new THREE.Vector2(),L=new THREE.Vector2(),K=new THREE.Vector2(),O,M,x,w,X,W,Y,T,R,I,H,q,o,l,y,J,s;if(this.autoClear){this.clear()}this.project(G,z);F=this.renderList.length;for(V=0;V<F;V++){v=this.renderList[V];t=v.material.length;d.empty();a.beginPath();if(v instanceof THREE.RenderableParticle){n=v.x*k;m=v.y*i;s=v.size*k;d.set(n-s,m-s,n+s,m+s);if(!g.instersects(d)){continue}a.arc(n,m,s,0,u,true)}else{if(v instanceof THREE.RenderableLine){n=v.v1.x*k;m=v.v1.y*i;Q=v.v2.x*k;P=v.v2.y*i;d.addPoint(n,m);d.addPoint(Q,P);if(!g.instersects(d)){continue}a.moveTo(n,m);a.lineTo(Q,P)}else{if(v instanceof THREE.RenderableFace3){v.v1.x*=k;v.v1.y*=i;v.v2.x*=k;v.v2.y*=i;v.v3.x*=k;v.v3.y*=i;if(v.overdraw){j(v.v1,v.v2);j(v.v2,v.v3);j(v.v3,v.v1)}n=v.v1.x;m=v.v1.y;Q=v.v2.x;P=v.v2.y;E=v.v3.x;C=v.v3.y;d.addPoint(n,m);d.addPoint(Q,P);d.addPoint(E,C);if(!g.instersects(d)){continue}a.moveTo(n,m);a.lineTo(Q,P);a.lineTo(E,C);a.lineTo(n,m)}else{if(v instanceof THREE.RenderableFace4){v.v1.x*=k;v.v1.y*=i;v.v2.x*=k;v.v2.y*=i;v.v3.x*=k;v.v3.y*=i;v.v4.x*=k;v.v4.y*=i;if(v.overdraw){j(v.v1,v.v2);j(v.v2,v.v3);j(v.v3,v.v4);j(v.v4,v.v1)}n=v.v1.x;m=v.v1.y;Q=v.v2.x;P=v.v2.y;E=v.v3.x;C=v.v3.y;r=v.v4.x;p=v.v4.y;d.addPoint(n,m);d.addPoint(Q,P);d.addPoint(E,C);d.addPoint(r,p);if(!g.instersects(d)){continue}a.moveTo(n,m);a.lineTo(Q,P);a.lineTo(E,C);a.lineTo(r,p);a.lineTo(n,m)}}}}a.closePath();for(U=0;U<t;U++){S=v.material[U];if(S instanceof THREE.ColorFillMaterial){a.fillStyle=S.color.__styleString;a.fill()}else{if(S instanceof THREE.FaceColorFillMaterial){a.fillStyle=v.color.__styleString;a.fill()}else{if(S instanceof THREE.ColorStrokeMaterial){a.lineWidth=S.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=S.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(S instanceof THREE.FaceColorStrokeMaterial){a.lineWidth=S.lineWidth;a.lineJoin="round";a.lineCap="round";a.strokeStyle=v.color.__styleString;a.stroke();d.inflate(a.lineWidth)}else{if(S instanceof THREE.BitmapUVMappingMaterial){l=S.bitmap;y=l.width;J=l.height;D.copy(v.uvs[0]);B.copy(v.uvs[1]);A.copy(v.uvs[2]);N.copy(D);L.copy(B);K.copy(A);N.x*=y;N.y*=J;L.x*=y;L.y*=J;K.x*=y;K.y*=J;if(v.overdraw){j(N,L);j(L,K);j(K,N);N.x=(D.x===0)?1:(D.x===1)?N.x-1:N.x;N.y=(D.y===0)?1:(D.y===1)?N.y-1:N.y;L.x=(B.x===0)?1:(B.x===1)?L.x-1:L.x;L.y=(B.y===0)?1:(B.y===1)?L.y-1:L.y;K.x=(A.x===0)?1:(A.x===1)?K.x-1:K.x;K.y=(A.y===0)?1:(A.y===1)?K.y-1:K.y}O=N.x;M=N.y;x=L.x;w=L.y;X=K.x;W=K.y;a.save();a.clip();Y=O*(W-w)-x*W+X*w+(x-X)*M;T=-(M*(E-Q)-w*E+W*Q+(w-W)*n)/Y;R=(w*C+M*(P-C)-W*P+(W-w)*m)/Y;I=(O*(E-Q)-x*E+X*Q+(x-X)*n)/Y;H=-(x*C+O*(P-C)-X*P+(X-x)*m)/Y;q=(O*(W*Q-w*E)+M*(x*E-X*Q)+(X*w-x*W)*n)/Y;o=(O*(W*P-w*C)+M*(x*C-X*P)+(X*w-x*W)*m)/Y;a.transform(T,R,I,H,q,o);a.drawImage(l,0,0);a.restore()}}}}}b.addRectangle(d)}}};function j(m,l){f.sub(l,m);f.unit();l.addSelf(f);m.subSelf(f)}};THREE.CanvasRenderer.prototype=new THREE.Renderer();THREE.CanvasRenderer.prototype.constructor=THREE.CanvasRenderer;THREE.SVGRenderer=function(){THREE.Renderer.call(this);var g=document.createElementNS("http://www.w3.org/2000/svg","svg"),b,d,l,i,f=new THREE.Rectangle(),c=new THREE.Rectangle(),j=[],e=[],h=1;this.domElement=g;this.autoClear=true;this.setQuality=function(m){switch(m){case"high":h=1;break;case"low":h=0;break}};this.setSize=function(n,m){b=n;d=m;l=b/2;i=d/2;g.setAttribute("viewBox",(-l)+" "+(-i)+" "+b+" "+d);g.setAttribute("width",b);g.setAttribute("height",d);f.set(-l,-i,l,i)};this.clear=function(){while(g.childNodes.length>0){g.removeChild(g.childNodes[0])}};this.render=function(D,C){var B,z,o,F,u,E,x=0,p=0,v,s,q,A,y,n,m,t,r,w;if(this.autoClear){this.clear()}this.project(D,C);F=this.renderList.length;for(B=0;B<F;B++){o=this.renderList[B];E=o.material.length;for(z=0;z<E;z++){u=o.material[z];c.empty();if(o instanceof THREE.RenderableParticle){s=o.x*l;q=o.y*i;w=o.size*l;c.set(s-w,q-w,s+w,q+w);if(!f.instersects(c)){continue}v=k(p++);v.setAttribute("cx",s);v.setAttribute("cy",q);v.setAttribute("r",w)}else{if(o instanceof THREE.RenderableFace3){s=o.v1.x*l;q=o.v1.y*i;A=o.v2.x*l;y=o.v2.y*i;n=o.v3.x*l;m=o.v3.y*i;c.addPoint(s,q);c.addPoint(A,y);c.addPoint(n,m);if(!f.instersects(c)){continue}v=a(x++);v.setAttribute("d","M "+s+" "+q+" L "+A+" "+y+" L "+n+","+m+"z")}else{if(o instanceof THREE.RenderableFace4){s=o.v1.x*l;q=o.v1.y*i;A=o.v2.x*l;y=o.v2.y*i;n=o.v3.x*l;m=o.v3.y*i;t=o.v4.x*l;r=o.v4.y*i;c.addPoint(s,q);c.addPoint(A,y);c.addPoint(n,m);c.addPoint(t,r);if(!f.instersects(c)){continue}v=a(x++);v.setAttribute("d","M "+s+" "+q+" L "+A+" "+y+" L "+n+","+m+" L "+t+","+r+"z")}}}if(u instanceof THREE.ColorFillMaterial){v.setAttribute("style","fill: "+u.color.__styleString)}else{if(u instanceof THREE.FaceColorFillMaterial){v.setAttribute("style","fill: "+o.color.__styleString)}else{if(u instanceof THREE.ColorStrokeMaterial){v.setAttribute("style","fill: none; stroke: "+u.color.__styleString+"; stroke-width: "+u.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}else{if(u instanceof THREE.FaceColorStrokeMaterial){v.setAttribute("style","fill: none; stroke: "+o.color.__styleString+"; stroke-width: "+u.lineWidth+"; stroke-linecap: round; stroke-linejoin: round")}}}}g.appendChild(v)}}};function a(m){if(j[m]==null){j[m]=document.createElementNS("http://www.w3.org/2000/svg","path");if(h==0){j[m].setAttribute("shape-rendering","crispEdges")}return j[m]}return j[m]}function k(m){if(e[m]==null){e[m]=document.createElementNS("http://www.w3.org/2000/svg","circle");if(h==0){e[m].setAttribute("shape-rendering","crispEdges")}return e[m]}return e[m]}};THREE.SVGRenderer.prototype=new THREE.Renderer();THREE.SVGRenderer.prototype.constructor=THREE.CanvasRenderer;THREE.RenderableFace3=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.z=null;this.color=null;this.material=null};THREE.RenderableFace4=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.v3=new THREE.Vector2();this.v4=new THREE.Vector2();this.z=null;this.color=null;this.material=null};THREE.RenderableParticle=function(){this.x=null;this.y=null;this.z=null;this.color=null;this.material=null};THREE.RenderableLine=function(){this.v1=new THREE.Vector2();this.v2=new THREE.Vector2();this.z=null;this.color=null;this.material=null};