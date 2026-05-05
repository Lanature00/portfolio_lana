/**
 * appareil.js — Script pour la page Appareil Photo 3D
 * Scopé à cette page uniquement, n'impacte pas les autres pages.
 *
 * Fonctionnalités :
 *  - Chargement GLB via Three.js (OrbitControls pour rotation/zoom souris & tactile)
 *  - Bouton upload pour charger un .glb depuis le disque
 *  - Tentative de chargement automatique depuis img/appareil.glb
 *  - Carousel de rendus
 *  - Bouton play vidéo
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

/* ============================================================
   3D VIEWER
   ============================================================ */

(function initViewer() {
    const container   = document.getElementById('viewer3d');
    const loadingEl   = document.getElementById('viewer-loading');
    const hintEl      = document.getElementById('viewer-hint');
    const uploadInput = document.getElementById('glb-upload');

    if (!container) return;

    /*
     * Le wrapper est le parent avec hauteur calculée (hero plein écran).
     * On cherche d'abord .p-appareil__viewer-hero-section puis le wrapper
     * standard en fallback.
     */
    const wrapper =
        container.closest('.p-appareil__viewer-wrapper') ||
        container.closest('.p-appareil__viewer-hero-section') ||
        container;

    /* ---- Scène Three.js ---- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    renderer.domElement.style.display = 'block';
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161616);

    /* ---- Caméra ---- */
    const camera = new THREE.PerspectiveCamera(
        40,
        wrapper.clientWidth / wrapper.clientHeight,
        0.01,
        100
    );
    camera.position.set(0, 0.5, 4);

    /* ---- Lumières ---- */
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(-3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(4, 1, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1);
    rimLight.position.set(0, -2, -4);
    scene.add(rimLight);

    /* ---- OrbitControls ---- */
    /*
     * On attache les controls au wrapper .p-appareil__viewer-wrapper
     * pour que toute la zone soit interactive, y compris sur mobile.
     */
    const controlsTarget =
        container.closest('.p-appareil__viewer-wrapper') || wrapper;

    const controls = new OrbitControls(camera, controlsTarget);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.06;
    controls.minDistance     = 0.5;
    controls.maxDistance     = 12;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.8;
    controls.enablePan       = false;

    /* Le canvas ne doit pas capturer les events (le wrapper le fait) */
    renderer.domElement.style.pointerEvents = 'none';

    /* Masquer le hint après la première interaction */
    let hintHidden = false;
    controls.addEventListener('start', () => {
        if (!hintHidden) {
            hintEl?.classList.add('hidden');
            hintHidden = true;
        }
    });

    /* ---- Loaders ---- */
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/libs/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let currentModel = null;

    /* ---- Chargement GLB ---- */
    function loadGLB(url) {
        if (loadingEl) {
            loadingEl.style.opacity = '1';
            loadingEl.style.pointerEvents = 'auto';
            loadingEl.classList.remove('hidden');
            loadingEl.style.display = '';
        }

        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }

        loader.load(
            url,
            (gltf) => {
                const model = gltf.scene;

                /* Centrer et scaler automatiquement */
                const box    = new THREE.Box3().setFromObject(model);
                const size   = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale  = 2.5 / maxDim;

                model.scale.setScalar(scale);
                model.position.sub(center.multiplyScalar(scale));

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow    = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(model);
                currentModel = model;

                /* Adapter la caméra à la taille du modèle */
                camera.position.set(0, 0.5, maxDim * scale * 2.2);
                controls.target.set(0, 0, 0);
                controls.update();

                /* Masquer le loader */
                if (loadingEl) {
                    loadingEl.classList.add('hidden');
                    loadingEl.style.display = 'none';
                }

                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
            },
            (xhr) => {
                if (xhr.total) {
                    const pct  = Math.round((xhr.loaded / xhr.total) * 100);
                    const span = loadingEl?.querySelector('span');
                    if (span) span.textContent = `Chargement… ${pct}%`;
                }
            },
            (err) => {
                console.warn('GLB non trouvé ou erreur de chargement :', err);
                if (loadingEl) {
                    const span = loadingEl.querySelector('span');
                    if (span) span.textContent = 'Chargez votre fichier .glb ci-dessous';
                    const loaderEl = loadingEl.querySelector('.p-appareil__loader');
                    if (loaderEl) loaderEl.style.display = 'none';
                }
            }
        );
    }

    /* Chargement automatique — fichier placé dans img/appareil.glb */
    loadGLB('img/appareil.glb');

    /* ---- Upload manuel ---- */
    if (uploadInput) {
        uploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            loadGLB(URL.createObjectURL(file));
        });
    }

    /* ---- Resize ---- */
    const ro = new ResizeObserver(() => {
        const w = wrapper.clientWidth;
        const h = wrapper.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
    ro.observe(wrapper);

    /* ---- Boucle de rendu ---- */
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

})();

/* ============================================================
   VIDÉO — Overlay play/pause
   ============================================================ */

(function initVideo() {
    const video   = document.getElementById('projet-video');
    const overlay = document.getElementById('video-overlay');
    const playBtn = document.getElementById('play-btn');

    if (!video || !overlay || !playBtn) return;

    function togglePlay() {
        if (video.paused) {
            video.play();
            overlay.classList.add('hidden');
        } else {
            video.pause();
            overlay.classList.remove('hidden');
        }
    }

    playBtn.addEventListener('click', togglePlay);
    overlay.addEventListener('click', togglePlay);

    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
    });
})();

/* ============================================================
   CAROUSEL
   ============================================================ */

(function initCarousel() {
    const track    = document.getElementById('track');
    const prevBtn  = document.getElementById('prev');
    const nextBtn  = document.getElementById('next');
    const dotsWrap = document.getElementById('dots');

    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const items = Array.from(track.querySelectorAll('.p-appareil__carousel-item'));
    if (items.length === 0) return;

    function getVisible() {
        const w = window.innerWidth;
        if (w <= 600)  return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    let current  = 0;
    let visible  = getVisible();
    let maxIndex = Math.max(0, items.length - visible);

    function buildDots() {
        dotsWrap.innerHTML = '';
        const count = maxIndex + 1;
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.className = 'p-appareil__carousel-dot' + (i === current ? ' actif' : '');
            btn.setAttribute('aria-label', `Page ${i + 1}`);
            btn.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(btn);
        }
    }

    function updateDots() {
        const dots = dotsWrap.querySelectorAll('.p-appareil__carousel-dot');
        dots.forEach((d, i) => d.classList.toggle('actif', i === current));
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex));
        const itemWidth = items[0].offsetWidth + 24; /* gap = 24px */
        track.style.transform = `translateX(-${current * itemWidth}px)`;
        updateDots();
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === maxIndex;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    window.addEventListener('resize', () => {
        visible  = getVisible();
        maxIndex = Math.max(0, items.length - visible);
        current  = Math.min(current, maxIndex);
        buildDots();
        goTo(current);
    });

    buildDots();
    goTo(0);
})();