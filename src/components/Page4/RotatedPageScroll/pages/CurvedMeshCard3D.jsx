import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CurvedMeshCard3D({
  type = 'orange-pass',
  imageSrc,
  testimonialData = null,
  width = 300,
  height = 440,
  curvature = 0.32,
  rotationZ = 0,
  className = '',
  style = {},
}) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);

    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const cw = 768;
    const ch = Math.round(cw * (height / width));
    canvas.width = cw;
    canvas.height = ch;

    function renderCardTexture(loadedImg = null, avatarImg = null) {
      ctx.clearRect(0, 0, cw, ch);

      if (type === 'orange-pass') {

        ctx.fillStyle = '#ff5d22';
        ctx.fillRect(8, 8, cw - 16, ch - 16);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, cw - 16, ch - 16);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 32px "Space Grotesk", sans-serif';
        ctx.fillText('SIMON.ARCHIVE', 44, 68);
        ctx.textAlign = 'right';
        ctx.fillText('✦ 120MM', cw - 44, 68);
        ctx.textAlign = 'left';

        const avX = 44;
        const avY = 108;
        const avS = 88;
        ctx.fillStyle = '#000000';
        ctx.fillRect(avX, avY, avS, avS);
        if (avatarImg && avatarImg.complete) {
          ctx.drawImage(avatarImg, avX, avY, avS, avS);
        }

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 36px "Space Grotesk", sans-serif';
        ctx.fillText('Venus Nwaokoro', 154, 150);
        ctx.font = '500 24px "Space Grotesk", sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillText('Medium Format Emulsion', 154, 186);
        ctx.fillText('artist@simon.archive', 154, 218);

        const qrSize = 210;
        const qrX = (cw - qrSize) / 2;
        const qrY = ch - qrSize - 44;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX, qrY, qrSize, qrSize);

        ctx.fillStyle = '#000000';
        const blk = 18;
        ctx.fillRect(qrX + 20, qrY + 20, blk * 3.5, blk * 3.5);
        ctx.fillRect(qrX + qrSize - 20 - blk * 3.5, qrY + 20, blk * 3.5, blk * 3.5);
        ctx.fillRect(qrX + 20, qrY + qrSize - 20 - blk * 3.5, blk * 3.5, blk * 3.5);
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if ((i + j) % 2 === 0) {
              ctx.fillRect(qrX + 54 + i * 20, qrY + 54 + j * 20, 14, 14);
            }
          }
        }
      } else if (type === 'mobile-card') {

        ctx.fillStyle = '#0d0d11';
        ctx.fillRect(8, 8, cw - 16, ch - 16);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 3;
        ctx.strokeRect(8, 8, cw - 16, ch - 16);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = '600 22px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('SIMON.ARCHIVE', cw - 44, 58);
        ctx.textAlign = 'left';

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 38px "Space Grotesk", sans-serif';
        ctx.fillText('Venus Nwaokoro', 44, 108);
        ctx.font = '500 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#a1a1aa';
        ctx.fillText('Editorial & Fine Art • Hasselblad 500C/M', 44, 144);

        const imgX = 44;
        const imgY = 168;
        const imgW = cw - 88;
        const imgH = ch - 350;
        ctx.fillStyle = '#1c1c22';
        ctx.fillRect(imgX, imgY, imgW, imgH);
        if (loadedImg && loadedImg.complete) {
          ctx.drawImage(loadedImg, imgX, imgY, imgW, imgH);
        }

        const btnY1 = ch - 150;
        ctx.fillStyle = '#ff5d22';
        ctx.fillRect(44, btnY1, cw - 88, 56);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Commission Series', cw / 2, btnY1 + 37);

        const btnY2 = ch - 82;
        ctx.fillStyle = '#000000';
        ctx.fillRect(44, btnY2, cw - 88, 54);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.strokeRect(44, btnY2, cw - 88, 54);
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 22px "Space Grotesk", sans-serif';
        ctx.fillText(' Add to Apple Wallet', cw / 2, btnY2 + 35);
        ctx.textAlign = 'left';
      } else if (type === 'photo-frame') {

        ctx.fillStyle = '#000000';
        ctx.fillRect(6, 6, cw - 12, ch - 12);
        if (loadedImg && loadedImg.complete) {
          ctx.drawImage(loadedImg, 6, 6, cw - 12, ch - 12);
        }

        const grad = ctx.createLinearGradient(0, ch * 0.45, 0, ch);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = grad;
        ctx.fillRect(6, 6, cw - 12, ch - 12);

        const pSize = 64;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect((cw - pSize) / 2, (ch - pSize) / 2, pSize, pSize);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('▶', cw / 2 + 2, ch / 2 + 12);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 30px "Space Grotesk", sans-serif';
        ctx.fillText('How', 44, ch - 96);
        ctx.font = '600 24px "Space Grotesk", sans-serif';
        ctx.fillText('SIMON.ARCHIVE', 44, ch - 64);
        ctx.font = '400 24px "Space Grotesk", sans-serif';
        ctx.fillText('works?', 44, ch - 34);
      } else if (type === 'testimonial') {

        const data = testimonialData || {
          quote: 'Creating my Photographic Card has been transformative. Curators immediately access 120mm emulsion scans and master print archives.',
          name: 'Venus Nwaokoro',
          role: 'Editorial Photographer',
          location: 'Canada',
          flag: '🇨🇦',
        };

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, 8, cw - 16, ch - 16);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, cw - 16, ch - 16);

        ctx.fillStyle = '#000000';
        ctx.font = '500 28px "Space Grotesk", sans-serif';
        const words = (`"${data.quote}"`).split(' ');
        let line = '';
        let qY = 70;
        const maxW = cw - 88;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxW && n > 0) {
            ctx.fillText(line, 44, qY);
            line = words[n] + ' ';
            qY += 40;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 44, qY);

        const rowY = ch - 90;
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(44, rowY - 24);
        ctx.lineTo(cw - 44, rowY - 24);
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 30px "Space Grotesk", sans-serif';
        ctx.fillText(data.name, 44, rowY + 10);
        ctx.font = '500 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#555555';
        ctx.fillText(`${data.role} • ${data.location}`, 44, rowY + 38);

        ctx.font = '40px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(data.flag || '🇨🇦', cw - 44, rowY + 24);
        ctx.textAlign = 'left';
      } else if (type === 'connectory') {

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, 8, cw - 16, ch - 16);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(8, 8, cw - 16, ch - 16);

        ctx.fillStyle = '#000000';
        ctx.fillRect(24, 24, 120, 44);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Artists', 84, 54);

        ctx.fillStyle = '#000000';
        ctx.fillRect(156, 24, 120, 44);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Curators', 216, 54);
        ctx.textAlign = 'left';

        ctx.fillStyle = '#444444';
        ctx.font = '600 22px "Space Grotesk", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('🔍 Search by name', cw - 44, 54);
        ctx.textAlign = 'left';

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 32px "Space Grotesk", sans-serif';
        ctx.fillText('The Connectory', 44, 120);
        ctx.font = '500 22px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#666666';
        ctx.fillText('1,321 Artists in Registry', 280, 120);

        const gridY = 150;
        const tileW = (cw - 110) / 2;
        const tileH = (ch - gridY - 50) / 2;

        const tileData = [
          { name: 'Teona Toderei', col: '#111111' },
          { name: 'Erin J Coholan', col: '#18181b' },
          { name: 'Danny Van der Elst', col: '#222226' },
          { name: 'Alberto Balocca', col: '#0a0a0c' },
        ];

        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < 2; c++) {
            const idx = r * 2 + c;
            const tx = 44 + c * (tileW + 22);
            const ty = gridY + r * (tileH + 18);
            ctx.fillStyle = tileData[idx].col;
            ctx.fillRect(tx, ty, tileW, tileH);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px "Space Grotesk", sans-serif';
            ctx.fillText(tileData[idx].name, tx + 16, ty + 36);
          }
        }
      }
    }

    renderCardTexture();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const meshW = 2.0;
    const meshH = meshW * (height / width);
    const segX = 48;
    const segY = 16;
    const geometry = new THREE.PlaneGeometry(meshW, meshH, segX, segY);

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);

      const normX = px / (meshW * 0.5);
      const curveZ = -Math.cos((normX * Math.PI) / 2) * curvature;
      pos.setZ(i, curveZ);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = rotationZ;
    scene.add(mesh);

    if (type === 'orange-pass') {
      const avImg = new Image();
      avImg.src = '/images/section4/pexels-krista-glizdeniece-2150567376-31603972.webp';
      avImg.onload = () => {
        renderCardTexture(null, avImg);
        texture.needsUpdate = true;
      };
    } else if (type === 'mobile-card') {
      const mImg = new Image();
      mImg.src = '/images/section4/pexels-aloevera-17612352.webp';
      mImg.onload = () => {
        renderCardTexture(mImg, null);
        texture.needsUpdate = true;
      };
    } else if (type === 'photo-frame') {
      const pImg = new Image();
      pImg.src = imageSrc || '/images/section4/pexels-gin-311039220-34175280.webp';
      pImg.onload = () => {
        renderCardTexture(pImg, null);
        texture.needsUpdate = true;
      };
    }

    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.28;
      targetRotX = -ny * 0.18;
    };

    const handleMouseLeave = () => {
      targetRotY = 0;
      targetRotX = 0;
    };

    mount.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseleave', handleMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.08;
      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      mount.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [type, imageSrc, testimonialData, width, height, curvature, rotationZ]);

  return (
    <div
      ref={mountRef}
      className={`curved-mesh-card-3d-wrapper ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        boxShadow: 'none',
        filter: 'none',
        borderRadius: '0px',
        overflow: 'visible',
        ...style,
      }}
    />
  );
}
