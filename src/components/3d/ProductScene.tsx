'use client';

import { Suspense, useRef, useState, useEffect, useMemo, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Html,
  useProgress
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { PMREMGenerator, Scene, Color, MeshBasicMaterial, Mesh, SphereGeometry } from 'three';

// 加载进度显示组件 - CUDIS 风格
function Loader() {
  const { progress, active } = useProgress();
  
  if (!active) return null;
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        {/* 圆形进度指示器 */}
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* 背景圆 */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* 进度圆 */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/80 text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
        </div>
        <p className="text-white/50 text-xs mt-3 tracking-wider">LOADING</p>
      </div>
    </Html>
  );
}

// 生成程序化环境贴图（避免远程加载 CORS 问题）
function useProceduralEnvMap() {
  const { gl } = useThree();
  
  const envMap = useMemo(() => {
    const pmremGenerator = new PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    
    // 创建一个简单的渐变环境场景
    const envScene = new Scene();
    
    // 创建一个渐变天空球
    const geometry = new SphereGeometry(50, 32, 32);
    const material = new MeshBasicMaterial({
      side: THREE.BackSide,
    });
    
    // 使用顶点颜色创建渐变
    const colors = [];
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const normalizedY = (y + 50) / 100; // 0 到 1
      // 从深灰到浅灰的渐变
      const gray = 0.15 + normalizedY * 0.25;
      colors.push(gray, gray, gray);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    material.vertexColors = true;
    
    const skyMesh = new Mesh(geometry, material);
    envScene.add(skyMesh);
    
    // 添加一些亮点模拟光源
    const lightGeom = new SphereGeometry(2, 16, 16);
    const lightMat = new MeshBasicMaterial({ color: 0xffffff });
    const light1 = new Mesh(lightGeom, lightMat);
    light1.position.set(20, 30, 20);
    envScene.add(light1);
    
    const light2 = new Mesh(lightGeom.clone(), new MeshBasicMaterial({ color: 0xcccccc }));
    light2.position.set(-20, 15, 10);
    envScene.add(light2);
    
    // 生成环境贴图
    const envMapTexture = pmremGenerator.fromScene(envScene, 0.04).texture;
    pmremGenerator.dispose();
    
    return envMapTexture;
  }, [gl]);
  
  return envMap;
}

// 3D产品模型组件
interface ProductModelProps {
  url: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  setIsDragging: (dragging: boolean) => void;
}

const ProductModel = memo(function ProductModel({ 
  url, 
  autoRotate = true,
  rotateSpeed = 0.3,
  setIsDragging
}: ProductModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const [localDragging, setLocalDragging] = useState(false);
  const envMap = useProceduralEnvMap();
  
  // 使用 useMemo 来克隆场景
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
        
        // 设置材质使用程序化环境贴图
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            mat.envMap = envMap;
            mat.envMapIntensity = 0.8;
            mat.needsUpdate = true;
          }
        }
      }
    });
    return cloned;
  }, [scene, envMap]);
  
  // 计算模型边界框并居中 - 确保模型中心对准原点
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // 缩放模型以完整显示
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const targetSize = 2.0;
        const autoScale = targetSize / maxDim;
        groupRef.current.scale.setScalar(autoScale);
        
        // 重新计算缩放后的中心点
        const scaledBox = new THREE.Box3().setFromObject(groupRef.current);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        
        // 将模型精确居中到原点 (0, 0, 0)
        groupRef.current.position.set(-scaledCenter.x, -scaledCenter.y, -scaledCenter.z);
      }
    }
  }, [clonedScene]);
  
  // 自动旋转动画
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate && !localDragging) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }
  });
  
  const handlePointerDown = () => {
    setLocalDragging(true);
    setIsDragging(true);
  };
  
  const handlePointerUp = () => {
    setLocalDragging(false);
    setIsDragging(false);
  };
  
  return (
    <group 
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <primitive object={clonedScene} />
    </group>
  );
});

// 简洁灯光配置 - 无阴影，避免色块
function StudioLights() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.8} />
      
      {/* 半球光 - 模拟天空环境 */}
      <hemisphereLight 
        intensity={0.6} 
        color="#ffffff" 
        groundColor="#333333" 
      />
      
      {/* 主光源 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
      />
      
      {/* 补光 */}
      <directionalLight 
        position={[-5, 3, 2]} 
        intensity={0.5} 
      />
      
      {/* 背光 */}
      <directionalLight 
        position={[0, 2, -5]} 
        intensity={0.3} 
      />
    </>
  );
}

// 性能优化器
function PerformanceOptimizer() {
  const { gl } = useThree();
  
  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(pixelRatio);
    gl.shadowMap.enabled = false; // 禁用阴影
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [gl]);
  
  return null;
}

// 主3D场景组件
interface ProductSceneProps {
  modelUrl?: string;
  className?: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  enableZoom?: boolean;
  showEllipse?: boolean;
  cameraPosition?: [number, number, number];
}

export default function ProductScene({
  modelUrl = '/cube.glb',
  className = '',
  autoRotate = true,
  rotateSpeed = 0.3,
  enableZoom = true,
  showEllipse = true,
  cameraPosition = [0, 0, 6],
}: ProductSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  // 预加载模型
  useEffect(() => {
    useGLTF.preload(modelUrl);
  }, [modelUrl]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-white/50 text-sm">加载失败</p>
          <button 
            onClick={() => setHasError(false)}
            className="mt-2 text-[#06B6D4] text-sm hover:underline"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 椭圆形装饰 - CSS实现 */}
      {showEllipse && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* 外椭圆 */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[90%] border border-white/[0.03] rounded-[50%]"
            style={{ animation: 'pulse-subtle 8s ease-in-out infinite' }}
          />
          {/* 内椭圆 */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[75%] border border-[#06B6D4]/[0.08] rounded-[50%]"
            style={{ animation: 'pulse-subtle 10s ease-in-out infinite reverse' }}
          />
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov: 35,
          near: 0.1,
          far: 100
        }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        style={{ 
          background: 'transparent',
          touchAction: 'pan-y',
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        onCreated={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        frameloop={autoRotate ? 'always' : 'demand'}
        onWheel={(e) => e.stopPropagation()}
      >
        <PerformanceOptimizer />
        <StudioLights />
        
        <Suspense fallback={<Loader />}>
          {/* 模型居中放置在原点 */}
          <ProductModel 
            url={modelUrl} 
            autoRotate={autoRotate && !isDragging}
            rotateSpeed={rotateSpeed}
            setIsDragging={setIsDragging}
          />
        </Suspense>
        
        {/* 轨道控制器 - 固定目标点在原点，只允许绕中轴旋转 */}
        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}  // 固定目标点在原点（中轴）
          enableZoom={false}   // 禁用缩放
          enablePan={false}    // 禁用平移，防止移动中轴
          enableRotate={true}  // 允许旋转
          enableDamping={true}
          minPolarAngle={Math.PI * 0.1}   // 限制上下旋转角度
          maxPolarAngle={Math.PI * 0.9}   // 限制上下旋转角度
          minAzimuthAngle={-Infinity}     // 允许无限水平旋转
          maxAzimuthAngle={Infinity}
          autoRotate={false}
          makeDefault
          dampingFactor={0.08}
          rotateSpeed={0.6}
          touches={{ ONE: 1, TWO: 0 }}  // 只允许单指旋转，禁用双指操作
        />
      </Canvas>
      
      {/* 交互提示 */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-xs pointer-events-none"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            <span>拖动旋转</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 预加载函数
export function preloadProductModel(url: string) {
  useGLTF.preload(url);
}
