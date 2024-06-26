const canvas = document.getElementById(`myid`);
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexData = [

  // Front
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, -.5, 0.5,

    // Left
    -.5, 0.5, 0.5,
    -.5, -.5, 0.5,
    -.5, 0.5, -.5,
    -.5, 0.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, -.5,

    // Back
    -.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, 0.5, -.5,
    0.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, -.5, -.5,

    // Right
    0.5, 0.5, -.5,
    0.5, -.5, -.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    0.5, -.5, -.5,

    // Top
    0.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, -.5,

    // Bottom
    0.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, -.5,


    /*
    // Front
    0.3, 0.4, 0.5,
    0.3,-0.3, 0.5,
   -0.2, 0.5, 0.5,
   -0.2, 0.5, 0.5,
    0.3,-0.3, 0.5,
   -0.2,-0.2, 0.5,

    // Left
   -0.2, 0.5, 0.5,
   -0.2,-0.2, 0.5,
    0.2, 0.8, -.5,
    0.2, 0.8, -.5,
   -0.2,-0.2, 0.5,
    0.2, 0.1, -.5,

    // Back
    0.2, 0.8, -.5,
    0.2, 0.1, -.5,
    0.6, 0.6, -.5,
    0.6, 0.6, -.5,
    0.2, 0.1, -.5,
    0.6,-0.1, -.5,

    // Right
    0.6, 0.6, -.5,
    0.6,-0.1, -.5,
    0.3, 0.4, 0.5,
    0.3, 0.4, 0.5,
    0.6,-0.1, -.5,
    0.3,-0.3, 0.5,

    // Top
    0.2, 0.8, -.5,
    0.6, 0.6, -.5,
   -0.2, 0.5, 0.5,
   -0.2, 0.5, 0.5,  // Front
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, -.5, 0.5,

    // Left
    -.5, 0.5, 0.5,
    -.5, -.5, 0.5,
    -.5, 0.5, -.5,
    -.5, 0.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, -.5,

    // Back
    -.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, 0.5, -.5,
    0.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, -.5, -.5,

    // Right
    0.5, 0.5, -.5,
    0.5, -.5, -.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    0.5, -.5, -.5,

    // Top
    0.5, 0.5, 0.5,  // Front
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    -.5, -.5, 0.5,

    // Left
    -.5, 0.5, 0.5,
    -.5, -.5, 0.5,
    -.5, 0.5, -.5,
    -.5, 0.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, -.5,

    // Back
    -.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, 0.5, -.5,
    0.5, 0.5, -.5,
    -.5, -.5, -.5,
    0.5, -.5, -.5,

    // Right
    0.5, 0.5, -.5,
    0.5, -.5, -.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -.5, 0.5,
    0.5, -.5, -.5,

    // Top
    0.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, 0.5,
    -.5, 0.5, 0.5,
    0.5, 0.5, -.5,
    -.5, 0.5, -.5,

    // Bottom
    0.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, -.5,
    0.5, -.5, -.5,
    -.5, -.5, 0.5,
    -.5, -.5, 0.5,
    0.5, -.5, -.5,
    -.5, -.5, -.5,
    0.6, 0.6, -.5,
    0.3, 0.4, 0.5,

    // Bottom
    0.2, 0.1, -.5,
    0.6,-0.1, -.5,
   -0.2, 0.5, 0.5,
   -0.2, 0.5, 0.5,
    0.6,-0.1, -.5,
    0.3,-0.3, 0.5,
 */   
];

function blackBase() {
    return [Math.random(), Math.random(), Math.random()];
}

let colorData = [];
for (let face = 0; face < 6; face++) {
    let faceColor = blackBase();
    for (let vertex = 0; vertex < 6; vertex++) {
        baseColorData.push(...faceColor);
    }
}

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseColorData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(BaseVertexShader, `

precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

uniform float angleX;
uniform float angleY;

void main() {
    vColor = color;

    float sx = sin(angleX);
    float cx = cos(angleX);
    float sy = sin(angleY);
    float cy = cos(angleY);

    // Rotation around X-axis
    vec3 rotatedY = vec3(
        position.x * cy - position.z * sy,
        position.y,
        position.x * sy + position.z * cy
    );

    // Rotation around Y-axis
    vec3 rotatedXY = vec3(
        rotatedY.x,
        rotatedY.y * cx - rotatedY.z * sx,
        rotatedY.z * cx + rotatedY.y * sx
    );

    gl_Position = vec4(rotatedXY, 1.0);
}

/*
precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

uniform float angle;

void main() {
    vColor = color;
    float s = sin(angle);
    float c = cos(angle); 

    // Rotate about the y-axis
    float x = position.x * c + position.z * s;
    float z = -position.x * s + position.z * c;

    gl_Position = vec4(x, position.y, z, 1.0);
}
*/

`);
gl.compileShader(BaseVertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(BasefragmentShader, `
precision mediump float;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(BasefragmentShader);
console.log(gl.getShaderInfoLog(BasefragmentShader));
/*
const button = document.getElementById(`button-switch1`)
console.log(button);
button.addEventListener("click", () => {
    let vsSource = `
        precision mediump float;

        attribute vec3 position;
        attribute vec3 color;
        varying vec3 vColor;

        uniform float angle;

        void main() {
            vColor = color;
            float s = sin(angle);
            float c = cos(angle); 

            gl_Position.x = position.x;
            gl_Position.y = position.y*c - position.z*s;
            gl_Position.z = position.z*c + position.y*s;
            
            gl_Position.w = 1.0;
            
        }`;
    
});
*/
const program = gl.createProgram();
gl.attachShader(program, BaseVertexShader);
gl.attachShader(program, BasefragmentShader);

gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.enable(gl.DEPTH_TEST);


const uniformLocation1 = gl.getUniformLocation(program, `angleX`);
const uniformLocation2 = gl.getUniformLocation(program, `angleY`);
var rotateX =0;
var rotateRateX = 0.01;

var rotateY =0;
var rotateRateY = 0.01;

draw();
    
function draw()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    rotateX += rotateRateX;
    rotateY += rotateRateY;
    
    gl.uniform1f(uniformLocation1,rotateX);
    gl.uniform1f(uniformLocation2,rotateY);
    
    gl.drawArrays(gl.TRIANGLES, 0, baseData.length / 3);
    window.requestAnimationFrame(draw);
}

