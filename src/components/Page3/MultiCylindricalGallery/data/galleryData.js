import manifest from './imagesManifest.json';

const getImg = (id) => {
  const found = manifest.find(item => item.id === id);
  return found ? found.path : `/images/gallery_01.jpg`;
};

export const LAYERS_DATA = [
  {
    id: 0,
    name: "01 / ARCHITECTURAL MONOLITHS",
    baseRadius: 4.8,
    baseY: 9.6,
    rotationSpeed: 0.04,
    cards: [
      {
        id: "card-1",
        title: "BRUTALIST VOID",
        category: "Architectural 3D",
        year: "2026",
        client: "VAPOR ARCHITECTURE",
        image: getImg(1),
        description: "Monolithic concrete structural exploration utilizing spatial audio reactive lighting and ray-marched volumetrics.",
        tags: ["3D Architecture", "Shader Art", "Octane"]
      },
      {
        id: "card-2",
        title: "ECHOES OF STONE",
        category: "Spatial Design",
        year: "2025",
        client: "STUDIO NINE",
        image: getImg(2),
        description: "Atmospheric study of shadow patterns across raw textured surfaces in high-contrast greyscale environments.",
        tags: ["CGI", "Environment", "Lighting"]
      },
      {
        id: "card-3",
        title: "SILENT FACADE",
        category: "Generative Geometry",
        year: "2026",
        client: "HELSINKI DESIGN MUSEUM",
        image: getImg(3),
        description: "Parametric modular facade system designed for acoustic resonance and solar shadow dispersion.",
        tags: ["Houdini", "Parametric", "Design"]
      },
      {
        id: "card-4",
        title: "CHRONO MONOLITH",
        category: "Exhibition",
        year: "2025",
        client: "BERLIN LAB",
        image: getImg(4),
        description: "Minimalist sculpture installation capturing temporal decay and physical refraction under studio spotlights.",
        tags: ["Installation", "Spatial", "Sculpture"]
      },
      {
        id: "card-5",
        title: "TOWER OF GRAVITY",
        category: "Conceptual Design",
        year: "2026",
        client: "ASHFALL CORE",
        image: getImg(5),
        description: "Vertical cantilever structure balancing heavy stone blocks on micro-pneumatic levitation dampeners.",
        tags: ["Physics", "3D Motion", "Experimental"]
      },
      {
        id: "card-6",
        title: "KINETIC CANOPY",
        category: "Architectural Motion",
        year: "2026",
        client: "LUMEN STRUCTURES",
        image: getImg(6),
        description: "Dynamic kinetic roof structure adapting to daylight shifts and wind vectors in real time.",
        tags: ["Kinetic", "Parametric", "Facade"]
      }
    ]
  },
  {
    id: 1,
    name: "02 / SUBWAY NOCTURNES",
    baseRadius: 4.2,
    baseY: 6.4,
    rotationSpeed: -0.06,
    cards: [
      {
        id: "card-7",
        title: "UNDERGROUND VELOCITY",
        category: "Film Photography",
        year: "2025",
        client: "TOKYO CHRONICLES",
        image: getImg(7),
        description: "Long-exposure motion blur study captured on 35mm monochrome stock in Yamanote subway lines.",
        tags: ["35mm Film", "Street", "Motion Blur"]
      },
      {
        id: "card-8",
        title: "STATION FLUIDITY",
        category: "Editorial",
        year: "2026",
        client: "MONO MAG",
        image: getImg(8),
        description: "Subtle emotional stillness within crowded urban transit centers. Silver Gelatin printing.",
        tags: ["Analog", "B&W", "Editorial"]
      },
      {
        id: "card-9",
        title: "LONDON TUBE ECHO",
        category: "Documentary",
        year: "2025",
        client: "METRO CULT",
        image: getImg(9),
        description: "Grainy vintage textures of night commuters navigating subterranean ceramic passageways.",
        tags: ["Documentary", "Street", "Vintage"]
      },
      {
        id: "card-10",
        title: "MIDNIGHT TRANSIENT",
        category: "Cinematography",
        year: "2026",
        client: "KINETIC FILM CO.",
        image: getImg(10),
        description: "Atmospheric frame stills exploring urban solitude, flickering fluorescent overhead lights, and motion blur.",
        tags: ["Cinema", "16mm", "Moody"]
      },
      {
        id: "card-11",
        title: "SHADOW PLATFORM",
        category: "Visual Essay",
        year: "2025",
        client: "GHOST PRESS",
        image: getImg(11),
        description: "Deep black densities and crisp edge highlights defining geometry of modern mass transit.",
        tags: ["Visual Art", "Noir", "Photography"]
      }
    ]
  },
  {
    id: 2,
    name: "03 / KINETIC SYMBOLISM",
    baseRadius: 5.0,
    baseY: 3.2,
    rotationSpeed: 0.03,
    cards: [
      {
        id: "card-12",
        title: "NEURAL RIBBON",
        category: "Generative Motion",
        year: "2026",
        client: "SYNAPSE LABS",
        image: getImg(12),
        description: "Fluid dynamic particle ribbon system computing realtime mathematical noise fields in 3D space.",
        tags: ["WebGL", "GLSL", "Particles"]
      },
      {
        id: "card-13",
        title: "CYBERNETIC HARMONICS",
        category: "Sound Visualization",
        year: "2025",
        client: "AUDIO KINETIC",
        image: getImg(13),
        description: "Spectral waveform displacement bending optical glass surfaces in response to sub-bass signals.",
        tags: ["Audio Visual", "R3F", "Shader"]
      },
      {
        id: "card-14",
        title: "VECTOR SILHOUETTE",
        category: "Brand Identity",
        year: "2026",
        client: "NEXUS PROTOCOL",
        image: getImg(14),
        description: "Deconstructed logo geometry transformed into volumetric glass refracting studio illumination.",
        tags: ["Branding", "3D Logo", "Identity"]
      },
      {
        id: "card-15",
        title: "OPTICAL DISPERSION",
        category: "Light Art",
        year: "2025",
        client: "LUMEN INSTITUTE",
        image: getImg(15),
        description: "Refractive index calculations breaking white laser light into chromatic spectrum arrays.",
        tags: ["Light", "Optics", "Generative"]
      },
      {
        id: "card-16",
        title: "VOID RESONANCE",
        category: "Interactive 3D",
        year: "2026",
        client: "ASHFALL LABS",
        image: getImg(16),
        description: "Interactive sphere grid reacting to user cursor velocity with elastic spring dampening dynamics.",
        tags: ["Physics", "Interactive", "Three.js"]
      },
      {
        id: "card-17",
        title: "MATRIX REFLECTION",
        category: "Code Art",
        year: "2025",
        client: "BINARY STUDIO",
        image: getImg(17),
        description: "Grid array of raytraced glass cubes echoing user scroll velocity.",
        tags: ["Code", "Raytracing", "Minimal"]
      },
      {
        id: "card-18",
        title: "SPECTRAL WAVE",
        category: "Data Motion",
        year: "2026",
        client: "QUANTUM VISUALS",
        image: getImg(18),
        description: "High-frequency sine wave ribbons warping translucent acrylic sheets.",
        tags: ["Data", "Waves", "Generative"]
      }
    ]
  },
  {
    id: 3,
    name: "04 / HUMAN CONDITION",
    baseRadius: 4.0,
    baseY: 0.0,
    rotationSpeed: -0.07,
    cards: [
      {
        id: "card-19",
        title: "DUALITY OF SELF",
        category: "Portraiture",
        year: "2026",
        client: "AVANT GARDE PORTRAITS",
        image: getImg(19),
        description: "Split exposure portraiture capturing internal psychological tension through soft optical diffusers.",
        tags: ["Portrait", "Analog", "Studio"]
      },
      {
        id: "card-20",
        title: "SILENT CONTEMPLATION",
        category: "Fashion Editorial",
        year: "2025",
        client: "VOUS MAGAZINE",
        image: getImg(20),
        description: "Minimalist fashion study emphasizing posture, drape, and harsh directional key lighting.",
        tags: ["Fashion", "High Contrast", "Noir"]
      },
      {
        id: "card-21",
        title: "EPHEMERAL SMEAR",
        category: "Motion Blur",
        year: "2026",
        client: "GHOST COLLECTIVE",
        image: getImg(21),
        description: "Controlled camera pan during slow shutter sync generating painterly streak textures across subject.",
        tags: ["Experimental", "Photography", "Motion"]
      },
      {
        id: "card-22",
        title: "CALM IN CHAOS",
        category: "Street Life",
        year: "2025",
        client: "URBAN PRESS",
        image: getImg(22),
        description: "Sharp motionless subject surrounded by heavily blurred pedestrian crowd flow.",
        tags: ["Street", "Contrast", "Long Exposure"]
      },
      {
        id: "card-23",
        title: "MIRROR ILLUSION",
        category: "Fine Art",
        year: "2026",
        client: "GALLERY X",
        image: getImg(23),
        description: "Reflection optics utilizing mirrored glass panels to fracture space and human silhouette.",
        tags: ["Fine Art", "Reflections", "Spatial"]
      }
    ]
  },
  {
    id: 4,
    name: "05 / ANALOG GRAIN & FOG",
    baseRadius: 4.9,
    baseY: -3.2,
    rotationSpeed: 0.05,
    cards: [
      {
        id: "card-24",
        title: "FOG HORIZON",
        category: "Landscape",
        year: "2025",
        client: "NORDIC LIGHT",
        image: getImg(24),
        description: "Subtle gradient horizon smothered in dense coastal sea mist. Scanned from medium format film.",
        tags: ["Medium Format", "Landscape", "Atmospheric"]
      },
      {
        id: "card-25",
        title: "SILVER HALIDE",
        category: "Texture Exploration",
        year: "2026",
        client: "FILM LAB CO.",
        image: getImg(25),
        description: "Microscopic scan of metallic silver grains suspended in gelatin photographic emulsion.",
        tags: ["Macro", "Texture", "Film"]
      },
      {
        id: "card-26",
        title: "GRAIN & GRADIENT",
        category: "Minimalism",
        year: "2025",
        client: "ZENITH DESIGN",
        image: getImg(26),
        description: "Pristine dark grey tonal transitions designed for high-end exhibition prints.",
        tags: ["Minimalism", "Tonal", "Print"]
      },
      {
        id: "card-27",
        title: "NOCTURNE SEA",
        category: "Seascape",
        year: "2026",
        client: "OCEANIC TRUST",
        image: getImg(27),
        description: "Moonlit ocean waves recorded with 10-stop neutral density filtration.",
        tags: ["Seascape", "Long Exposure", "Noir"]
      },
      {
        id: "card-28",
        title: "FIELD REFRACTION",
        category: "Nature CGI",
        year: "2025",
        client: "TERRA STUDIO",
        image: getImg(28),
        description: "Soft glowing grass blades swaying under artificial fog wind simulation.",
        tags: ["3D Nature", "Volumetrics", "Atmosphere"]
      },
      {
        id: "card-29",
        title: "CELESTIAL EMBRACE",
        category: "Astrophotography",
        year: "2026",
        client: "STELLAR LABS",
        image: getImg(29),
        description: "Deep space nebulosity long exposure rendered in stark monochrome silver gradients.",
        tags: ["Space", "Deep Sky", "Stars"]
      },
      {
        id: "card-30",
        title: "DUNE SHADOWS",
        category: "Aerial",
        year: "2025",
        client: "DESERT RESEARCH",
        image: getImg(30),
        description: "High-altitude shadows casting sharp geometric ridges across wind-swept sand fields.",
        tags: ["Aerial", "Patterns", "Dunes"]
      }
    ]
  },
  {
    id: 5,
    name: "06 / DIGITAL ARTIFACTS",
    baseRadius: 4.3,
    baseY: -6.4,
    rotationSpeed: -0.04,
    cards: [
      {
        id: "card-31",
        title: "GLITCH RECONSTRUCTION",
        category: "Datamoshing",
        year: "2026",
        client: "CYBER LABS",
        image: getImg(31),
        description: "Algorithmically distorted I-frame video corruption reassembled as static 3D textures.",
        tags: ["Glitch", "Digital Art", "Data"]
      },
      {
        id: "card-32",
        title: "CHROMATIC FRACTURE",
        category: "Optics",
        year: "2025",
        client: "PRISM CORP",
        image: getImg(32),
        description: "RGB pixel offset matrix creating intense chromatic fringing along high-contrast vectors.",
        tags: ["RGB Split", "Shader", "Vector"]
      },
      {
        id: "card-33",
        title: "SCANLINE ARCHIVE",
        category: "Retro Tech",
        year: "2026",
        client: "CRT SOCIETY",
        image: getImg(33),
        description: "High-resolution phosphor tube macro captures showing RGB triad subpixels.",
        tags: ["CRT", "Phosphor", "Retro"]
      },
      {
        id: "card-34",
        title: "SPECTRAL NOISE",
        category: "Audio/Visual",
        year: "2025",
        client: "SIGNAL PRESS",
        image: getImg(34),
        description: "Perlin noise modulation driving volumetric displacement grids in real-time frame buffers.",
        tags: ["Generative", "Noise", "Displacement"]
      },
      {
        id: "card-35",
        title: "BITMAP EROSION",
        category: "Experimental",
        year: "2026",
        client: "RAW DATA",
        image: getImg(35),
        description: "Morphological erosion and dilation algorithms applied iteratively to monochrome assets.",
        tags: ["Algorithm", "Process", "B&W"]
      },
      {
        id: "card-36",
        title: "QUANTUM DECAY",
        category: "Generative",
        year: "2025",
        client: "ENTROPY LAB",
        image: getImg(36),
        description: "Simulated particle decay channels dissolving bitmap pixel structures into digital dust.",
        tags: ["Entropy", "Generative", "Particles"]
      }
    ]
  },
  {
    id: 6,
    name: "07 / FUTURISTIC TYPOGRAPHY",
    baseRadius: 4.7,
    baseY: -9.6,
    rotationSpeed: 0.06,
    cards: [
      {
        id: "card-37",
        title: "KINETIC GLYPH",
        category: "Typography",
        year: "2026",
        client: "FONT FOUNDRY",
        image: getImg(37),
        description: "Variable font weight interpolation animated along a 3D cylindrical spine mesh.",
        tags: ["Typography", "3D Font", "Kinetic"]
      },
      {
        id: "card-38",
        title: "MONOSPACE STRUCTURE",
        category: "UI Architecture",
        year: "2025",
        client: "SYSTEMS INC",
        image: getImg(38),
        description: "Technical grid alignment, HUD target bounding boxes, and precision mechanical typography.",
        tags: ["HUD", "UI", "Technical"]
      },
      {
        id: "card-39",
        title: "TYPE IN MOTION",
        category: "Motion Graphics",
        year: "2026",
        client: "ASHFALL STUDIO",
        image: getImg(39),
        description: "Cascading character matrix scrolling vertically with inertia friction dampening.",
        tags: ["Motion", "Graphics", "Type"]
      },
      {
        id: "card-40",
        title: "ABSTRACT LETTERFORMS",
        category: "Vector Sculpture",
        year: "2025",
        client: "ALPHABET GALLERY",
        image: getImg(40),
        description: "Deconstructed typographic ligatures extruded into physical metallic 3D geometries.",
        tags: ["Type Design", "Sculpture", "3D"]
      },
      {
        id: "card-41",
        title: "DEEP SPACE LABELS",
        category: "Exhibition HUD",
        year: "2026",
        client: "SPACE LAB",
        image: getImg(41),
        description: "Sleek floating telemetry displays overlaying high-speed photographic captures.",
        tags: ["Space", "Telemetry", "Minimal"]
      }
    ]
  }
];
