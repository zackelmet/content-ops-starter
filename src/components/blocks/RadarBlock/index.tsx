import * as React from 'react';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import classNames from 'classnames';

export default function RadarBlock(props) {
    const { className, styles = {} } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const el = containerRef.current;
        if (!el) return;

        const width = el.clientWidth || 600;
        const height = el.clientHeight || 400;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
        camera.position.z = 10;

        // rings
        const ringMaterial = new THREE.LineBasicMaterial({ color: 0x33ff99, transparent: true, opacity: 0.06 });
        const rings = [80, 140, 200];
        rings.forEach((r) => {
            const points = [];
            const segments = 128;
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
            }
            const geom = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.LineLoop(geom, ringMaterial);
            scene.add(line);
        });

        // sweep (long thin plane)
        const sweepMat = new THREE.MeshBasicMaterial({ color: 0x33ff99, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending });
        const sweepGeom = new THREE.PlaneGeometry(420, 6);
        const sweep = new THREE.Mesh(sweepGeom, sweepMat);
        // pivot at center
        const pivot = new THREE.Object3D();
        sweep.position.set(210, 0, 1);
        pivot.add(sweep);
        scene.add(pivot);

        // blips
        const blipMaterial = new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.9 });
        const blips: { mesh: THREE.Mesh; life: number }[] = [];
        function spawnBlip() {
            const r = 40 + Math.random() * 180;
            const angle = Math.random() * Math.PI * 2;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const geom = new THREE.SphereGeometry(6, 8, 8);
            const mat = blipMaterial.clone();
            const mesh = new THREE.Mesh(geom, mat);
            mesh.position.set(x, y, 2);
            mesh.scale.setScalar(0.01);
            scene.add(mesh);
            blips.push({ mesh, life: 0 });
        }

        let lastSpawn = 0;
        const spawnInterval = 800; // ms

        const clock = new THREE.Clock();
        // sweep speed: full rotation every ~3.5s
        const rotationSpeed = (Math.PI * 2) / 3.5;

        function onResize() {
            const w = el.clientWidth || width;
            const h = el.clientHeight || height;
            renderer.setSize(w, h);
            camera.left = w / -2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = h / -2;
            camera.updateProjectionMatrix();
        }

        function animate() {
            const dt = clock.getDelta();
            pivot.rotation.z += rotationSpeed * dt;

            // spawn blips periodically
            lastSpawn += dt * 1000;
            if (lastSpawn > spawnInterval) {
                lastSpawn = 0;
                spawnBlip();
            }

            // animate blips
            for (let i = blips.length - 1; i >= 0; i--) {
                const b = blips[i];
                b.life += dt * 1000;
                const t = b.life / 1200; // fade over 1.2s
                b.mesh.material.opacity = Math.max(0, 1 - t);
                b.mesh.scale.setScalar(0.5 + t * 1.5);
                if (t >= 1) {
                    scene.remove(b.mesh);
                    blips.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
            rafRef.current = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', onResize);
        animate();

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            // dispose
            renderer.dispose();
            while (el.firstChild) el.removeChild(el.firstChild);
        };
    }, []);

    return (
        <div
            className={classNames('sb-component', 'sb-component-block', 'sb-component-radar-block', className)}
            ref={containerRef}
            style={{ width: '100%', height: '100%', minHeight: 300 }}
        />
    );
}
