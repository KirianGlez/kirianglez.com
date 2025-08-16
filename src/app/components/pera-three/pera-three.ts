import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-pera-three',
  imports: [],
  templateUrl: './pera-three.html',
  styleUrl: './pera-three.scss'
})
export class PeraThree implements OnInit, OnDestroy{
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Object3D;
  private controls!: OrbitControls;
  private animationId!: number;

  ngOnInit(): void {
    this.initThreeJS();
    this.createScene();
    this.setupControls();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xADEBB3); // Tu color de fondo

    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;
    
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private setupControls(): void {
  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  
  this.controls.enableDamping = true;
  this.controls.dampingFactor = 0.05;
  this.controls.enableZoom = true;
  this.controls.enablePan = false;
  this.controls.autoRotate = true;
  this.controls.autoRotateSpeed = 2.0; 
  
  this.controls.minPolarAngle = Math.PI / 6;
  this.controls.maxPolarAngle = Math.PI - Math.PI / 6;
  this.controls.minDistance = 3;
  this.controls.maxDistance = 10;
  this.controls.target.set(0, 0, 0);

  this.controls.addEventListener('start', () => {
    this.controls.autoRotate = false;
  });

  this.controls.addEventListener('end', () => {
    setTimeout(() => {
      this.controls.autoRotate = true;
    }, 3000);
  });
}

  private createScene(): void {
    const points = [
      new THREE.Vector2(0, -1.5),
      new THREE.Vector2(0.8, -1.2),
      new THREE.Vector2(1.0, -0.5),
      new THREE.Vector2(0.9, 0),
      new THREE.Vector2(0.6, 0.8),
      new THREE.Vector2(0.3, 1.2), 
      new THREE.Vector2(0.1, 1.5), 
      new THREE.Vector2(0, 1.5)
    ];

    const geometry = new THREE.LatheGeometry(points, 32);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xFFFF99,
      shininess: 100
    });
    
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 1.6;
    this.scene.add(stem);

const ambientLight = new THREE.AmbientLight(0x666666, 1.0); // Color más claro e intensidad alta
  this.scene.add(ambientLight);

  // Luz principal más suave
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  this.scene.add(directionalLight);

  // Agregar luces de relleno desde múltiples ángulos
  const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight1.position.set(-10, 10, 5);
  this.scene.add(fillLight1);

  const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight2.position.set(0, -10, 5);
  this.scene.add(fillLight2);

  const fillLight3 = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight3.position.set(0, 10, -5);
  this.scene.add(fillLight3);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    this.controls.update();

    if (!this.controls.enableDamping || !this.controls.autoRotate) {
      this.cube.rotation.y += 0.005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.controls.update();
  }
}
