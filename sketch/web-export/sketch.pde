Retractor r;
Ambient a;
float ambientDepth = 100;

void setup(){
 size(920,300, P3D);
 smooth();
  r = new Retractor();
  a = new Ambient();
}


void draw(){
  background(0);
 //a.draw();
 r.update();
 r.draw();

 translate(50, 50, ambientDepth * -1);

}
class Ambient{
  PImage img;
  
   Ambient(){
    img = loadImage("layer1.jpg");
      
   } 
   void draw(){
    image(img,0,0);
   } 
}
class Draggers{
 public PVector location;  
 public float dragWidth = 6;
 float dragRepeatFactor = 1.9;
 float easing = 0.04;
 public PVector velocity;
 PVector acceleration;
 float maxForce;
 float maxSpeed;

  Draggers(float x, float y,float z){
   location = new PVector(x,y,z);
   acceleration = new PVector(0,0);
   velocity = new PVector(random(-.3,.3),random(-.3,.3));
   maxForce = 0.05;
   maxSpeed = 2;
  }
  
  void update(){
    float prevMouseDifX = mouseX - pmouseX;
    float prevMouseDifY = mouseY - pmouseY;
    float mouseHyp = prevMouseDifX/prevMouseDifY;
    
    if(isInRange()){
      location.x += prevMouseDifX*easing;
      location.y += prevMouseDifY*easing;
    }
    
    if((location.x) > width 
    || (location.x - dragWidth/2) < 0
    || (location.y) > height
    || (location.y - dragWidth/2) < 0 
    )
    velocity.mult(-1);
    
    location.add(velocity);
    

    
    /*acceleration.add(new PVector(prevMouseDifX,prevMouseDifY));
    acceleration.mult(velocity,4);
    
    location.mult(mouseHyp);*/
  }
  
  boolean isInRange(){
      return dist(mouseX,mouseY,location.x,location.y) < dragWidth*10 ? true : false;      
  }  
  void draw(){
    
    pushMatrix();
    
    translate(0,0,location.z);
    
    fill(255);
    noStroke();
    ellipse(location.x,location.y,dragWidth,dragWidth);
    
    noFill();
    stroke(255);
    strokeWeight(0.7);
    ellipse(location.x,location.y,dragWidth*dragRepeatFactor,dragWidth*dragRepeatFactor);
    
    popMatrix();
    
        
  }
  
}
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

