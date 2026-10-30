import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { codeSnippets } from '@/data/codeSnippets';

function syntaxColor(text: string, language: string): string {
  const keywords: Record<string, string[]> = {
    TypeScript: ['import', 'export', 'const', 'function', 'return', 'if', 'useState', 'useCallback', 'from'],
    'C#': ['public', 'class', 'private', 'readonly', 'async', 'Task', 'await', 'void', 'int', 'new'],
    React: ['export', 'const', 'function', 'return'],
    '.NET': ['public', 'void', 'services', 'Add', 'opt', 'b'],
  };

  const kws = keywords[language] || [];
  for (const kw of kws) {
    const regex = new RegExp(`\\b${kw}\\b`);
    if (regex.test(text)) return '#4F8CFF';
  }

  if (/(async|Task|await)/.test(text)) return '#8B5CF6';
  if (text.includes('useState') || text.includes('useCallback')) return '#A57CFF';
  if (text.includes('"') || text.includes("'")) return '#4ADE80';
  if (text.includes('//')) return '#64748B';
  if (/^[{}()[\];,]+$/.test(text.trim())) return '#94A3B8';
  return '#E2E8F0';
}

function MonitorScreen() {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [snippetIndex, setSnippetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const snippet = codeSnippets[snippetIndex];

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createLinearGradient(0, 0, 0, 640);
    grad.addColorStop(0, '#0D1117');
    grad.addColorStop(1, '#161B22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    // Sidebar
    ctx.fillStyle = '#0D1117';
    ctx.fillRect(0, 0, 48, 640);

    // Activity bar icons
    ctx.fillStyle = '#1F2937';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(14, 40 + i * 44, 20, 20);
    }

    // Tab bar
    ctx.fillStyle = '#161B22';
    ctx.fillRect(48, 0, 300, 36);
    ctx.fillStyle = '#0D1117';
    ctx.fillRect(48, 0, 150, 36);
    ctx.fillStyle = '#4F8CFF';
    ctx.fillRect(48, 34, 150, 2);

    // Filename
    ctx.font = '14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText(snippet.filename, 60, 23);

    // Line numbers
    ctx.font = '13px "JetBrains Mono", monospace';
    snippet.lines.forEach((line, i) => {
      const y = 64 + i * 26;
      if (y > 620) return;
      ctx.fillStyle = '#3B4252';
      ctx.fillText(String(i + 1), 60, y);
      ctx.fillStyle = syntaxColor(line.text, snippet.language);
      const indented = ' '.repeat(line.indent * 2);
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText(indented + line.text, 90, y);
    });

    // Top bar
    ctx.fillStyle = '#22D3EE';
    ctx.fillRect(350, 23, 6, 6);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(snippet.language, 364, 29);

    // Cursor blink
    const lastLine = snippet.lines.length;
    const cursorY = 64 + (lastLine - 1) * 26;
    ctx.fillStyle = '#4F8CFF';
    ctx.fillRect(100, cursorY - 12, 2, 16);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [snippetIndex]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const t = clock.getElapsedTime();
      materialRef.current.opacity = 0.88 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <mesh position={[0, 0.35, 0.04]}>
      <planeGeometry args={[3.4, 1.9]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

function Monitor() {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Stand neck */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.45, 0.05, 32]} />
        <meshStandardMaterial color="#151a26" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Curved monitor frame */}
      <mesh castShadow>
        <cylinderGeometry args={[3.5, 3.5, 2.1, 32, 1, false, -Math.PI / 6, Math.PI / 3]} />
        <meshStandardMaterial color="#0d1117" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0, -0.01]}>
        <cylinderGeometry args={[3.45, 3.45, 2.05, 32, 1, false, -Math.PI / 6, Math.PI / 3]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Screen */}
      <MonitorScreen />
      {/* Bottom bezel logo */}
      <mesh position={[0, -0.85, 0.15]}>
        <boxGeometry args={[0.3, 0.02, 0.08]} />
        <meshStandardMaterial color="#4F8CFF" emissive="#4F8CFF" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const arr: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    const rows = 4;
    const cols = 14;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 0.13;
        const z = -1.8 + r * 0.13;
        arr.push({ pos: [x, -1.1, z], size: [0.1, 0.04, 0.1] });
      }
    }
    return arr;
  }, []);

  return (
    <group position={[0, -0.3, 0]}>
      <mesh position={[0, -1.15, -1.55]} castShadow>
        <boxGeometry args={[2.1, 0.06, 0.65]} />
        <meshStandardMaterial color="#11151f" metalness={0.4} roughness={0.6} />
      </mesh>
      {keys.map((key, i) => (
        <mesh key={i} position={key.pos} castShadow>
          <boxGeometry args={key.size} />
          <meshStandardMaterial color="#1c2333" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[1.4, -1.25, -1.6]}>
      <mesh castShadow rotation={[0.2, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
        <meshStandardMaterial color="#11151f" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 0.05]}>
        <boxGeometry args={[0.03, 0.01, 0.1]} />
        <meshStandardMaterial color="#4F8CFF" emissive="#4F8CFF" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Speaker({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.4, 0.25]} />
        <meshStandardMaterial color="#11151f" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0.13]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.05, 0.13]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0.135]}>
        <ringGeometry args={[0.06, 0.08, 16]} />
        <meshStandardMaterial color="#4F8CFF" emissive="#4F8CFF" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function DeskLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.05, 16]} />
        <meshStandardMaterial color="#151a26" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh castShadow position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.04, 0.15]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.1, 0.55, 0.05]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#FFFAE0" emissive="#FFFAE0" emissiveIntensity={1.5} />
      </mesh>
      <pointLight position={[0.1, 0.55, 0.05]} color="#FFFAE0" intensity={0.3} distance={3} />
    </group>
  );
}

function Desk() {
  return (
    <mesh position={[0, -1.35, -1]} receiveShadow>
      <boxGeometry args={[5, 0.08, 3]} />
      <meshStandardMaterial color="#0e131c" metalness={0.2} roughness={0.8} />
    </mesh>
  );
}

function FloatingSymbol({ position, symbol }: { position: [number, number, number]; symbol: string }) {
  const ref = useRef<THREE.Group>(null);
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.y = t * speed * 0.3;
      ref.current.rotation.x = Math.sin(t * speed) * 0.2;
      ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.15;
    }
  });

  const symbolGeometry = useMemo(() => {
    const shapes: Record<string, () => THREE.BufferGeometry> = {
      '<': () => new THREE.TorusGeometry(0.15, 0.04, 8, 16, Math.PI * 1.5),
      '{': () => new THREE.TorusGeometry(0.15, 0.04, 8, 16, Math.PI),
      '/': () => new THREE.ConeGeometry(0.04, 0.3, 8),
      '>': () => new THREE.OctahedronGeometry(0.12),
      '#': () => new THREE.BoxGeometry(0.18, 0.18, 0.18),
      '*': () => new THREE.IcosahedronGeometry(0.12),
    };
    return (shapes[symbol] || shapes['#'])();
  }, [symbol]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={ref} position={position}>
        <mesh geometry={symbolGeometry}>
          <meshStandardMaterial
            color={Math.random() > 0.5 ? '#4F8CFF' : '#8B5CF6'}
            emissive={Math.random() > 0.5 ? '#4F8CFF' : '#8B5CF6'}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += 0.002;
        if (positions[i * 3 + 1] > 3) positions[i * 3 + 1] = -3;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4F8CFF" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth - 0.5) * 0.3;
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX.current, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY.current, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export interface WorkspaceSceneProps {
  className?: string;
}

export function Workspace3DScene({ className }: WorkspaceSceneProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#080B12']} />
        <fog attach="fog" args={['#080B12', 6, 14]} />

        <ambientLight intensity={0.15} />
        <spotLight position={[3, 4, 3]} angle={0.4} penumbra={1} intensity={0.5} color="#4F8CFF" castShadow />
        <pointLight position={[-3, 2, 2]} intensity={0.4} color="#8B5CF6" distance={8} />
        <pointLight position={[0, 3, -2]} intensity={0.3} color="#4F8CFF" distance={6} />

        <MouseParallax>
          <Desk />
          <Monitor />
          <Keyboard />
          <Mouse />
          <Speaker position={[-1.8, -0.85, -1.7]} />
          <Speaker position={[1.8, -0.85, -1.7]} />
          <DeskLamp position={[-2, -1.2, -1]} />

          <FloatingSymbol position={[-2.5, 1.5, -1]} symbol="<" />
          <FloatingSymbol position={[2.2, 1.8, -0.5]} symbol="{" />
          <FloatingSymbol position={[2.8, 0.5, -1]} symbol="/" />
          <FloatingSymbol position={[-2.8, 0.3, -0.5]} symbol=">" />
          <FloatingSymbol position={[0, 2.2, -1.5]} symbol="#" />
          <FloatingSymbol position={[1.5, 2, -2]} symbol="*" />
        </MouseParallax>

        <Particles />
        <ContactShadows position={[0, -1.35, -1]} opacity={0.4} scale={8} blur={2.5} far={3} color="#4F8CFF" />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
