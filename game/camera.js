const center = new GLOW.Vector3(0, 0, -10);
const cameraDistance = 370;
const cameraAzimuth = -0.5 * Math.PI;
const cameraAltitude = 0.29 * Math.PI;

const camera = new GLOW.Camera({
	useTarget: true,
	near: 0.1,
	far: 2000
});

camera.up = new GLOW.Vector3(0, 0, 1);
camera.target = center;
camera.localMatrix.setPosition(
	center.value[0] + cameraDistance * Math.cos(cameraAltitude) * Math.cos(cameraAzimuth),
	center.value[1] + cameraDistance * Math.cos(cameraAltitude) * Math.sin(cameraAzimuth),
	center.value[2] + cameraDistance * Math.sin(cameraAltitude)
);
camera.update();