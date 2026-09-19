import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLandoTextReveal } from '../../../utils/useLandoTextReveal';
import './ScrollMindmap.css';

gsap.registerPlugin(ScrollTrigger);

const NODES_DATA = [
  { id: 1, index: '01', label: 'APERTURE', className: 'node-1', img: '/assets/section6/pexels-98931356-13221344.jpg' },
  { id: 2, index: '02', label: 'LATENT IMAGE', className: 'node-2', img: '/assets/section6/pexels-almightyshilref-8353924.jpg' },
  { id: 3, index: '03', label: 'FOCAL LENGTH', className: 'node-3', img: '/assets/section6/pexels-andrew-rekand-76108357-8626813.jpg' },
  { id: 4, index: '04', label: 'SILVER HALIDE', className: 'node-4', img: '/assets/section6/pexels-farhadirani-32069109.jpg' },
  { id: 5, index: '05', label: 'MEDIUM FORMAT', className: 'node-5', img: '/assets/section6/pexels-gurkirat-singh-2150346078-31670075.jpg' },
  { id: 6, index: '06', label: 'CHROMOGENIC', className: 'node-6', img: '/assets/section6/pexels-imvitordiniz-20193148.jpg' },
  { id: 7, index: '07', label: 'CONTACT SHEET', className: 'node-7', img: '/assets/section6/pexels-kassiamelox-14634319.jpg' },
  { id: 8, index: '08', label: 'GELATIN PRINT', className: 'node-8', img: '/assets/section6/pexels-magaly-taboada-1529426891-28892408.jpg' },
  { id: 9, index: '09', label: 'DARKROOM ARCHIVE', className: 'node-9', img: '/assets/section6/pexels-magapls-2149937712-31890029.jpg' },
  { id: 10, index: '10', label: 'ANALOG ATELIER', className: 'node-10', img: '/assets/section6/pexels-margarita-141441249-11116484.jpg' },
];

const ORIGINAL_WRINKLE_PATH = "M1004.09 124.672C973.592 175.672 1187.97 67.3425 1230.09 165.172C1230.21 121.772 1362.25 139.399 1438.09 195.672C1513.93 251.944 1321.59 270.422 1321.59 270.422C1325.85 347.422 1347.5 343.794 1400.09 303.422C1400.09 303.422 1455.59 322.172 1438.09 269.172C1420.59 216.172 1628.59 269.172 1628.59 269.172C1726.1 252.636 1889.82 356.988 1915.59 421.172C1949.02 504.427 1908.3 755.907 1864.59 715.172C1752.39 776.714 1689.58 766.932 1577.59 733.172C1574.43 762.838 1358.42 651.933 1362.09 677.672C1376.59 779.262 1684.65 954.814 1709.09 984.672C1765.39 1053.43 1800.84 1039.02 1744.59 910.672C1827.97 1007.79 1852.51 1012.93 1864.59 951.672C1850.79 852.369 1819.08 816.68 1676.59 824.672C1676.88 786.547 1613.07 759.693 1588.09 832.172C1574.73 870.928 1628.59 926.095 1577.59 938.672C1526.59 951.248 1433.09 816.672 1433.09 860.172C1433.09 903.672 1379.04 835.141 1384.59 870.172C1399.35 963.199 1419.22 929.051 1476.09 918.672C1595.36 896.905 1553.2 944.541 1506.09 1088.67C1480.64 1166.54 1425.83 1105.54 1384.59 1159.67C1317.73 1247.45 1203.87 1163.61 1247.59 1055.67C1252.1 1044.55 1154.09 1030.67 1230.09 984.672C1306.09 938.672 1241.31 957.042 1230.09 938.672C1181.2 858.61 1106.88 951.863 1133.59 1022.67C1168.31 1114.7 1119.31 991.873 1057.59 1068.67C987.225 1156.24 959.32 1070.72 968.592 984.672C978.597 891.824 894.046 960.465 885.092 1022.67C881.634 1046.7 820.673 1055.08 803.592 1068.67C793.696 1076.55 714.424 1032.2 689.592 1022.67C660.017 1011.32 615.592 1108.01 585.092 1126.67C564.092 1118.34 517.992 1099.07 501.592 1088.67C481.092 1075.67 422.592 1055.67 379.592 1055.67C336.592 1055.67 278.592 1066.17 220.092 1068.67C161.592 1071.17 -79.4077 959.172 182.092 898.172C522.092 837.172 544.592 830.172 600.592 850.172C656.592 870.172 682.592 870.172 710.092 870.172C737.592 870.172 784.577 879.901 803.592 870.172C866.345 838.064 913.922 859.997 803.592 824.672C688.084 787.688 694.764 809.761 682.092 824.672C660.905 849.603 684.092 779.172 600.592 756.172C517.092 733.172 434.981 729.085 405.092 796.672C296.223 1042.86 239.318 971.837 245.592 824.672C246.366 806.515 258.092 733.172 245.592 733.172C235.592 733.172 221.092 696.172 215.092 677.672C169.63 724.882 142.901 732.815 90.5924 677.672C88.0924 696.172 80.5924 733.172 70.5924 733.172C58.0924 733.172 43.0924 788.672 30.0924 733.172C9.59235 611.672 -15.9076 589.172 14.5924 576.172C45.0924 563.172 22.0924 558.172 90.5924 558.172C159.092 558.172 175.092 558.172 195.092 558.172C215.092 558.172 228.092 578.172 245.592 558.172C263.092 538.172 301.592 535.172 281.092 494.672C260.592 454.172 251.092 431.172 233.092 418.672C215.092 406.172 207.092 362.672 220.092 350.172C233.092 337.672 296.592 347.672 342.092 373.172C387.592 398.672 411.092 401.172 438.592 403.672C463.592 373.172 469.092 339.672 476.592 322.172C484.092 304.672 526.592 378.172 501.592 304.672C476.592 231.172 476.592 200.172 476.592 182.672C476.592 165.172 423.592 134.172 476.592 114.172C529.592 94.1718 504.592 66.1718 552.592 96.6718C590.992 121.072 624.259 152.505 636.092 165.172C635.426 172.672 636.092 193.772 644.092 218.172C654.092 248.672 595.592 269.172 661.592 269.172C768.092 220.672 780.592 208.672 768.092 195.672C758.092 185.272 755.592 160.672 755.592 149.672C762.426 141.172 710.092 38.1718 783.592 114.172C857.092 190.172 813.092 60.1718 824.092 38.1718C827.592 32.3384 819.092 79.1718 905.092 18.1718C991.092 -42.8282 925.092 73.6718 958.092 73.6718C998.892 92.0718 1034.59 73.6718 1004.09 124.672Z";

export default function Section6ScrollMindmap() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const ballRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useLandoTextReveal(
    containerRef,
    ['.mindmap-subheading', '.mindmap-title'],
    {
      theme: 'dark',
      start: 'top 80%',
    }
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const ball = ballRef.current;
    const section = containerRef.current;
    if (!path || !ball || !section) return;

    const nodes = section.querySelectorAll('.mindmap-node');

    const buildClosedSpline = (pts) => {
      const n = pts.length;
      if (n < 2) return '';
      if (n === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} Z`;
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return d + ' Z';
    };

    if (isMobile && nodes.length >= 5) {
      const wrapper = section.querySelector('.mindmap-wrapper');
      const svg = section.querySelector('#svgCanvas');
      if (wrapper && svg) {
        const wrapperRect = wrapper.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${wrapperRect.width} ${wrapperRect.height}`);
        svg.setAttribute('preserveAspectRatio', 'none');

        const fiveNodes = [nodes[0], nodes[1], nodes[2], nodes[3], nodes[4]];
        const pts = fiveNodes.map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - wrapperRect.left,
            y: r.top + r.height / 2 - wrapperRect.top,
          };
        });

        const d = buildClosedSpline(pts);
        if (d) {
          path.setAttribute('d', d);
        }
      }
    } else {

      const svg = section.querySelector('#svgCanvas');
      if (svg) {
        svg.setAttribute('viewBox', '0 0 1929 1197');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }
      path.setAttribute('d', ORIGINAL_WRINKLE_PATH);
    }

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    function checkProximityAndExpand() {
      const ballRect = ball.getBoundingClientRect();
      const ballX = ballRect.left + ballRect.width / 2;
      const ballY = ballRect.top + ballRect.height / 2;
      const touchRadius = isMobile ? 65 : 90;
      const targetNodes = isMobile ? Array.from(nodes).slice(0, 5) : Array.from(nodes);

      targetNodes.forEach((node) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left + nodeRect.width / 2;
        const nodeY = nodeRect.top + nodeRect.height / 2;
        const dist = Math.hypot(ballX - nodeX, ballY - nodeY);

        if (dist < touchRadius) {
          node.classList.add('expanded');
        } else {
          node.classList.remove('expanded');
        }
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2600',
          scrub: 1,
          pin: true,
          anticipatePin: 0,
          onUpdate: checkProximityAndExpand,
        },
      });

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 10,
          ease: 'none',
          onUpdate: function () {
            const progress = this.progress();
            const point = path.getPointAtLength(progress * pathLength);
            ball.setAttribute('cx', point.x);
            ball.setAttribute('cy', point.y);
          },
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      id="specsheet-section-6"
      ref={containerRef}
      className="section6-root screen-animation"
    >
      <div className="mindmap-wrapper">

        <div className="center-branding">
          <span className="mindmap-subheading">
            PHOTOGRAPHY LAB • 2026
          </span>
          <h2 className="mindmap-title">
            CAPTURED IN RAW LIGHT
          </h2>
        </div>

        <svg id="svgCanvas" viewBox="0 0 1929 1197" preserveAspectRatio="xMidYMid meet">
          <path
            ref={pathRef}
            id="wrinklePath"
            d="M1004.09 124.672C973.592 175.672 1187.97 67.3425 1230.09 165.172C1230.21 121.772 1362.25 139.399 1438.09 195.672C1513.93 251.944 1321.59 270.422 1321.59 270.422C1325.85 347.422 1347.5 343.794 1400.09 303.422C1400.09 303.422 1455.59 322.172 1438.09 269.172C1420.59 216.172 1628.59 269.172 1628.59 269.172C1726.1 252.636 1889.82 356.988 1915.59 421.172C1949.02 504.427 1908.3 755.907 1864.59 715.172C1752.39 776.714 1689.58 766.932 1577.59 733.172C1574.43 762.838 1358.42 651.933 1362.09 677.672C1376.59 779.262 1684.65 954.814 1709.09 984.672C1765.39 1053.43 1800.84 1039.02 1744.59 910.672C1827.97 1007.79 1852.51 1012.93 1864.59 951.672C1850.79 852.369 1819.08 816.68 1676.59 824.672C1676.88 786.547 1613.07 759.693 1588.09 832.172C1574.73 870.928 1628.59 926.095 1577.59 938.672C1526.59 951.248 1433.09 816.672 1433.09 860.172C1433.09 903.672 1379.04 835.141 1384.59 870.172C1399.35 963.199 1419.22 929.051 1476.09 918.672C1595.36 896.905 1553.2 944.541 1506.09 1088.67C1480.64 1166.54 1425.83 1105.54 1384.59 1159.67C1317.73 1247.45 1203.87 1163.61 1247.59 1055.67C1252.1 1044.55 1154.09 1030.67 1230.09 984.672C1306.09 938.672 1241.31 957.042 1230.09 938.672C1181.2 858.61 1106.88 951.863 1133.59 1022.67C1168.31 1114.7 1119.31 991.873 1057.59 1068.67C987.225 1156.24 959.32 1070.72 968.592 984.672C978.597 891.824 894.046 960.465 885.092 1022.67C881.634 1046.7 820.673 1055.08 803.592 1068.67C793.696 1076.55 714.424 1032.2 689.592 1022.67C660.017 1011.32 615.592 1108.01 585.092 1126.67C564.092 1118.34 517.992 1099.07 501.592 1088.67C481.092 1075.67 422.592 1055.67 379.592 1055.67C336.592 1055.67 278.592 1066.17 220.092 1068.67C161.592 1071.17 -79.4077 959.172 182.092 898.172C522.092 837.172 544.592 830.172 600.592 850.172C656.592 870.172 682.592 870.172 710.092 870.172C737.592 870.172 784.577 879.901 803.592 870.172C866.345 838.064 913.922 859.997 803.592 824.672C688.084 787.688 694.764 809.761 682.092 824.672C660.905 849.603 684.092 779.172 600.592 756.172C517.092 733.172 434.981 729.085 405.092 796.672C296.223 1042.86 239.318 971.837 245.592 824.672C246.366 806.515 258.092 733.172 245.592 733.172C235.592 733.172 221.092 696.172 215.092 677.672C169.63 724.882 142.901 732.815 90.5924 677.672C88.0924 696.172 80.5924 733.172 70.5924 733.172C58.0924 733.172 43.0924 788.672 30.0924 733.172C9.59235 611.672 -15.9076 589.172 14.5924 576.172C45.0924 563.172 22.0924 558.172 90.5924 558.172C159.092 558.172 175.092 558.172 195.092 558.172C215.092 558.172 228.092 578.172 245.592 558.172C263.092 538.172 301.592 535.172 281.092 494.672C260.592 454.172 251.092 431.172 233.092 418.672C215.092 406.172 207.092 362.672 220.092 350.172C233.092 337.672 296.592 347.672 342.092 373.172C387.592 398.672 411.092 401.172 438.592 403.672C463.592 373.172 469.092 339.672 476.592 322.172C484.092 304.672 526.592 378.172 501.592 304.672C476.592 231.172 476.592 200.172 476.592 182.672C476.592 165.172 423.592 134.172 476.592 114.172C529.592 94.1718 504.592 66.1718 552.592 96.6718C590.992 121.072 624.259 152.505 636.092 165.172C635.426 172.672 636.092 193.772 644.092 218.172C654.092 248.672 595.592 269.172 661.592 269.172C768.092 220.672 780.592 208.672 768.092 195.672C758.092 185.272 755.592 160.672 755.592 149.672C762.426 141.172 710.092 38.1718 783.592 114.172C857.092 190.172 813.092 60.1718 824.092 38.1718C827.592 32.3384 819.092 79.1718 905.092 18.1718C991.092 -42.8282 925.092 73.6718 958.092 73.6718C998.892 92.0718 1034.59 73.6718 1004.09 124.672Z"
          />
          <circle ref={ballRef} id="theBall" r="5" />
        </svg>

        {NODES_DATA.map((node) => (
          <div key={node.id} className={`mindmap-node ${node.className}`}>
            <img src={node.img} alt={node.label} className="node-thumb" loading="lazy" />
            <span className="node-index">{node.index}</span>
            <span className="node-sep">/</span>
            <span className="node-label">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
