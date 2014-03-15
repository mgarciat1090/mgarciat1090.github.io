particleVertexShader =
[
"attribute vec3  customColor;",
"attribute float customOpacity;",
"attribute float customSize;",
"attribute float customAngle;",
"attribute float customVisible;",  // float used as boolean (0 = false, 1 = true)
"varying vec4  vColor;",
"varying float vAngle;",
"void main()",
"{",
        "if ( customVisible > 0.5 )",                                 // true
                "vColor = vec4( customColor, customOpacity );", //     set color associated to vertex; use later in fragment shader.
        "else",                                                        // false
                "vColor = vec4(0.0, 0.0, 0.0, 0.0);",                 //     make particle invisible.

        "vAngle = customAngle;",

        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        "gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );",     // scale particles as objects in 3D space
        "gl_Position = projectionMatrix * mvPosition;",
"}"
].join("\n");

particleFragmentShader =
[
"uniform sampler2D texture;",
"varying vec4 vColor;",
"varying float vAngle;",
"void main()",
"{",
        "gl_FragColor = vColor;",

        "float c = cos(vAngle);",
        "float s = sin(vAngle);",
        "vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,",
                              "c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);",  // rotate UV coordinates to rotate texture
            "vec4 rotatedTexture = texture2D( texture,  rotatedUV );",
        "gl_FragColor = gl_FragColor * rotatedTexture;",    // sets an otherwise white particle texture to desired color
"}"
].join("\n");

function Tween(timeArray, valueArray)
{
    this.times = timeArray || [];
    this.values = valueArray || [];
}

Tween.prototype.lerp = function(t)
{
    var i = 0;
    var n = this.times.length;
    while(i < n && t > this.times[i])
        i++;
    if(i == 0) return this.values[0];
    if(1 == n) return this.values[n-1];
    var p = (t - this.times[i-1]) / (this.times[i]-this.times[i-1]);
    if(this.values[0] instanceof THREE.Vector3)
        return this.values[i+1].clone().lerp(this.values[i],p);
    else
        return this.values[i+1] + p * (this.values[i] - this.values[i-1]);
}

function Particle()
{
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();

    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;

    this.size = 16.0;

    this.color = new THREE.Color();
    this.opacity = 1.0;

    this.age = 0;
    this.alivve = 0;
}

Particle.prototype.update = function(dt)
{
    this.position.add(this.velocity.clone().multiplyScalar(dt));
    this.velocity.add(this.acceleration.clone().multiplyScalar(dt));

    this.angle += this.angleVelocity * 0.01745329251 * dt;
    this.angleVelocity += this.angleAcceleration * 0.01745329251 * dt;

    this.age += dt;

    if(this.sizeTween.times.length > 0)
        this.size = this.sizeTween.lerp(this.age);

    if(this.colorTween.times.length > 0)
    {
        var colorHSL = this.colorTween.lerp(this.age);
        this.color = new THREE.Color().setHSL(colorHSL.x, colorHSL.y, colorHSL.z);
    }

    if(this.opacityTween.times.length > 0)
        this.opacity = this.opacityTween.lerp(this.age);
}