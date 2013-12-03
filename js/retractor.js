THREE.RetractorGeometry =  function(){
    THREE.Geometry.call(this);
    THREE.RetractorGeometry.prototype = Object.create(THREE.Geometry.prototype);
    THREE.RetractorGeometry.prototype.constructor = THREE.RetractorGeometry;
};

THREE.RetractorGeometry.prototype.init =  function(){
    this.transform();
    return this;
};

THREE.RetractorGeometry.prototype.transform = function(){
  this.vertices.push( new THREE.Vector3( 50,  50, 50 ) );
  this.vertices.push( new THREE.Vector3( 50,  50, 0 ) );
  this.vertices.push( new THREE.Vector3(  50, 0, 50 ) );
  this.vertices.push( new THREE.Vector3(  50, 0, 20 ) );
  this.vertices.push( new THREE.Vector3(  10, 0, 10 ) );

  this.faces.push( new THREE.Face3( 0, 1, 2 ) );


  return this;
}