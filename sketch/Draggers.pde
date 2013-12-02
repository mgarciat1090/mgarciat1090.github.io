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
