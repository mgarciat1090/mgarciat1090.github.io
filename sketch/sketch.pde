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
