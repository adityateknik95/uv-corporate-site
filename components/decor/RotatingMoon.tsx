"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

type RotatingMoonProps = {
  className?: string;
  modelSrc?: string;
  colorMapSrc?: string;
  normalMapSrc?: string;
  roughnessMapSrc?: string;
};

export function RotatingMoon({
  className = "",
  modelSrc = "/models/moon/moon.fbx",
  colorMapSrc = "/models/moon/textures/moon_color.png",
  normalMapSrc = "/models/moon/textures/moon_normal.png",
  roughnessMapSrc = "/models/moon/textures/moon_rough.png",
}: RotatingMoonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(-3, 2, 3);
    scene.add(keyLight);

    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    const textureLoader = new THREE.TextureLoader();
    const colorMap = textureLoader.load(colorMapSrc);
    colorMap.colorSpace = THREE.SRGBColorSpace;
    const normalMap = textureLoader.load(normalMapSrc);
    const roughnessMap = textureLoader.load(roughnessMapSrc);

    const material = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      metalness: 0,
    });

    const disposables: Array<{ dispose: () => void }> = [
      colorMap,
      normalMap,
      roughnessMap,
      material,
    ];

    const fbxLoader = new FBXLoader();
    fbxLoader.setResourcePath("/models/moon/textures/");
    fbxLoader.load(
      modelSrc,
      (object) => {
        if (cancelled) return;

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
            disposables.push(child.geometry);
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        object.position.sub(center);

        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.2 / maxDimension;
        object.scale.setScalar(scale);

        moonGroup.add(object);
      },
      undefined,
      (error) => {
        console.error("Failed to load moon model", error);
      }
    );

    let frameId: number;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;

      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const render = () => {
      if (cancelled) return;

      if (!prefersReducedMotion) {
        moonGroup.rotation.y += 0.0035;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeChild(renderer.domElement);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [modelSrc, colorMapSrc, normalMapSrc, roughnessMapSrc]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
    />
  );
}
