const canvas = document.getElementById(`myid`);
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
}

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

function createSphere(radius, numSegments) {
    const vertexData = [];
    const colorData = [];

    for (let lat = 0; lat <= numSegments; lat++) {
        const theta = (lat * Math.PI) / numSegments;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let lon = 0; lon <= numSegments; lon++) {
            const phi = (lon * 2 * Math.PI) / numSegments;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;

            vertexData.push(radius * x, radius * y, radius * z);

            const color = [Math.random(),Math.random(),Math.random()];
            colorData.push(...color);
        }
    }

    const indices = [];
    for (let lat = 0; lat < numSegments; lat++) {
        for (let lon = 0; lon < numSegments; lon++) {
            const first = lat * (numSegments + 1) + lon;
            const second = first + numSegments + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }

    return { vertexData, colorData, indices };
}

const sphere = createSphere(0.9, 20);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere.vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere.colorData), gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere.indices), gl.STATIC_DRAW);

const vertexShaderSource = `
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
`;

const fragmentShaderSource = `
precision mediump float;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1);
}
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

gl.enable(gl.DEPTH_TEST);

const uniformLocation1 = gl.getUniformLocation(program, `angleX`);
const uniformLocation2 = gl.getUniformLocation(program, `angleY`);
let rotateX = 0;
let rotateRateX = 0.01;
let rotateY = 0;
let rotateRateY = 0.01;

draw();

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    rotateX += rotateRateX;
    rotateY += rotateRateY;

    gl.uniform1f(uniformLocation1, rotateX);
    gl.uniform1f(uniformLocation2, rotateY);

    gl.drawElements(gl.LINE_LOOP, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(draw);
}

