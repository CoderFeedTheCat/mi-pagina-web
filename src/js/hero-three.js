import * as THREE from 'three';
import isologoUrl from '@/assets/images/isologo_imagen.png';

export function initHeroThreeJS() {
  const container = document.getElementById('hero-threejs');
  if (!container) return;

  const scene = new THREE.Scene();
  const width = container.clientWidth;
  const height = container.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  const group = new THREE.Group();
  scene.add(group);

  const textureLoader = new THREE.TextureLoader();
  const logoTexture = textureLoader.load(isologoUrl, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const logoMaterial = new THREE.MeshStandardMaterial({
    map: logoTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const logoGeo = new THREE.PlaneGeometry(14.5, 13.2);
  const logo = new THREE.Mesh(logoGeo, logoMaterial);
  group.add(logo);

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;
  });

  function animate() {
    requestAnimationFrame(animate);

    group.rotation.y += (mouseX * 0.15 - group.rotation.y) * 0.05;
    group.rotation.x += (mouseY * 0.15 - group.rotation.x) * 0.05;

    logo.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  animate();

  const heroSection = container.closest('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      logoMaterial.emissive = new THREE.Color(0x10B981);
      logoMaterial.emissiveIntensity = 0.2;
    });

    heroSection.addEventListener('mouseleave', () => {
      logoMaterial.emissive = new THREE.Color(0x000000);
      logoMaterial.emissiveIntensity = 0;
    });
  }
}
