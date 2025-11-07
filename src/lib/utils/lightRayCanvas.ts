import vertexShaderSource from '$lib/shaders/vertex.glsl?raw';
import fragmentShaderSource from '$lib/shaders/fragment.glsl?raw';

export function initLightRayCanvas(canvas: HTMLCanvasElement, getColorUniform: () => [number, number, number, number]) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('WebGL is not supported by your browser.');
        throw new Error('WebGL not supported');
    }

    function createShader(gl: WebGLRenderingContext, source: string, type: number) {
        const shader = gl.createShader(type);
        if (!shader) return null;

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
        throw new Error('Failed to create shaders');
    }

    const program = gl.createProgram();
    if (!program) {
        throw new Error('Failed to create program');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        throw new Error('Program linking failed');
    }

    gl.useProgram(program);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const colorLoc = gl.getUniformLocation(program, 'uColor');

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();

    const color = getColorUniform();
    gl.uniform4f(colorLoc, ...color);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function resizeCanvas() {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationId: number;
    function render() {
        const time = performance.now() * 0.001;
        gl.uniform1f(timeLocation, time);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationId = requestAnimationFrame(render);
    }

    render();

    // Return cleanup function and update color function
    return {
        updateColor: (color: [number, number, number, number]) => {
            gl.uniform4f(colorLoc, ...color);
        },
        destroy: () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        }
    };
}
