class Ambient{
  PImage img;
  
   Ambient(){
    img = loadImage("layer1.jpg");
      
   } 
   void draw(){
    image(img,0,0);
   } 
}
