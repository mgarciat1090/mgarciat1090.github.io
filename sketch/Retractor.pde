class Retractor{
  Draggers[] ds;
  int draggersQty = 40;
  float immersionFactor = 10;
  
  Retractor(){
    ds = new Draggers[draggersQty];
  
    for(int i = 0; i< draggersQty; i++){
      ds[i] = new Draggers(abs(random(width*.98)),abs(random(height*.98)),abs(random(ambientDepth*.5)));  
    }
  }
  void drawConnection(PVector p1, PVector p2){
    strokeWeight(.3);
    line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
  }
  
  void update(){
    for(int i = 0; i< draggersQty; i++){
      ds[i].update();
    }
  }
  boolean isClose(PVector p, Draggers d){
    return dist(p.x,p.y,d.location.x,d.location.y) < d.dragWidth*immersionFactor ? true : false;
  }
  
  boolean collision(float x1, float y1, float d1, float x2, float y2, float d2) {
  
    // find distance between the two objects
    float xDist = x1-x2;                                   // distance horiz
    float yDist = y1-y2;                                   // distance vert
    float distance = sqrt((xDist*xDist) + (yDist*yDist));  // diagonal distance
  
    // test for collision
    if (d1/2 + d2/2 > distance) {
      return true;    // if a hit, return true
    }
    else {            // if not, return false
      return false;
    }
  }
  
  void drawRadius(Draggers d){
   stroke(255,255,255,120);
   noFill();
   pushMatrix();
   translate(0,0,d.location.z);
   ellipse(d.location.x,d.location.y,d.dragWidth*immersionFactor,d.dragWidth*immersionFactor);
   popMatrix();
    
  }
  
  void draw(){
   for(int i = 0; i< draggersQty; i++){
      ds[i].draw();
      //if mouse is close to node draw
      if(isClose(new PVector(mouseX,mouseY),ds[i]))
        drawConnection(ds[i].location,new PVector(mouseX,mouseY,0));
      
        for(int j = 0; j< draggersQty; j++){
          if(isClose(ds[i].location,ds[j])){
            drawConnection(ds[i].location,ds[j].location);
            ds[i].velocity.mult(-1);
          }
        }
        
      drawRadius(ds[i]);  
    }
  }  
  
}
