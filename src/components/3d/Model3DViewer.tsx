'use client';

import { Suspense, useRef, useState, useEffect, useMemo, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows,
  Html,
  useProgress,
  Center,
  Bounds,
  useBounds
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 加载进度显示组件
function Loader() {
  const { progress, active } = useProgress();
  
  if (!active) return null;
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#667eea] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-white/70 text-sm mt-2 font-medium">
          加载中 {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

// 3D模型组件
interface ModelProps {
  url: string;
  scale?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
}

const Model = memo(function Model({ 
  url, 
  scale = 1, 
  autoRotate = true,
  rotateSpeed = 0.5 
}: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const [isDragging, setIsDragging] = useState(false);
  
  // 使用 useMemo 来克隆场景，只在 scene 变化时重新克隆
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    // 优化材质以提高性能
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // 启用视锥体剔除
        mesh.frustumCulled = true;
      }
    });
    return cloned;
  }, [scene]);
  
  // 计算模型边界框并居中
  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // 居中模型
      groupRef.current.position.sub(center);
      
      // 根据尺寸自动调整缩放
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const targetSize = 2.5;
        const autoScale = targetSize / maxDim;
        groupRef.current.scale.setScalar(autoScale * scale);
      }
    }
  }, [clonedScene, scale]);
  
  // 自动旋转动画
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate && !isDragging) {
      groupRef.current.rotation.y += delta * rotateSpeed;
    }
  });
  
  return (
    <group 
      ref={groupRef}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <primitive object={clonedScene} />
    </group>
  );
});

// 场景灯光配置
function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
      <pointLight position={[10, -5, 5]} intensity={0.3} color="#667eea" />
    </>
  );
}

// 自适应像素比和性能优化
function PerformanceOptimizer() {
  const { gl, size } = useThree();
  
  useEffect(() => {
    // 根据设备性能和屏幕尺寸调整像素比
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(pixelRatio);
    
    // 优化渲染器设置
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1;
  }, [gl, size]);
  
  return null;
}

// 主3D查看器组件
interface Model3DViewerProps {
  modelUrl?: string;
  className?: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  showControls?: boolean;
  backgroundColor?: string;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  cameraPosition?: [number, number, number];
}

export default function Model3DViewer({
  modelUrl = '/cube.glb',
  className = '',
  autoRotate = true,
  rotateSpeed = 0.5,
  showControls = true,
  backgroundColor = 'transparent',
  enableZoom = true,
  enablePan = false,
  minDistance = 2,
  maxDistance = 10,
  cameraPosition = [0, 0, 5],
}: Model3DViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 预加载模型
  useEffect(() => {
    useGLTF.preload(modelUrl);
  }, [modelUrl]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center text-white/70">
          <p>模型加载失败</p>
          <button 
            onClick={() => setHasError(false)}
            className="mt-2 text-[#06B6D4] hover:underline"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: backgroundColor === 'transparent',
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ 
          background: backgroundColor,
          touchAction: 'none'
        }}
        onCreated={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        frameloop={autoRotate ? 'always' : 'demand'}
        performance={{ min: 0.5 }}
      >
        <PerformanceOptimizer />
        <Lights />
        
        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model 
                url={modelUrl} 
                autoRotate={autoRotate}
                rotateSpeed={rotateSpeed}
              />
            </Center>
          </Bounds>
          
          {/* 环境光照 - 使用较轻量级的preset */}
          <Environment preset="apartment" />
          
          {/* 接触阴影 */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>
        
        {/* 轨道控制器 */}
        {showControls && (
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableRotate={true}
            minDistance={minDistance}
            maxDistance={maxDistance}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            autoRotate={false}
            makeDefault
          />
        )}
      </Canvas>
      
      {/* 交互提示 */}
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none"
        >
          拖动旋转 · 滚轮缩放
        </motion.div>
      )}
    </div>
  );
}

// 预加载模型以优化性能
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
