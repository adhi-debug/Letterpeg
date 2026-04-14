import { useState, useRef, useCallback, useEffect } from "react";

// Poster-worthy fonts (Google Fonts) - cinematic selections
const FONTS = [
  { name: "System (Default)", family: "ui-sans-serif, system-ui, -apple-system, sans-serif" },
  { name: "Bebas Neue", family: "'Bebas Neue', sans-serif" },
  { name: "Anton", family: "'Anton', sans-serif" },
  { name: "Oswald", family: "'Oswald', sans-serif" },
  { name: "Playfair Display", family: "'Playfair Display', serif" },
  { name: "Poppins", family: "'Poppins', sans-serif" },
  { name: "Abril Fatface", family: "'Abril Fatface', serif" },
  { name: "Bangers", family: "'Bangers', cursive" },
  { name: "Permanent Marker", family: "'Permanent Marker', cursive" },
  { name: "Lobster", family: "'Lobster', cursive" },
  { name: "Pacifico", family: "'Pacifico', cursive" },
  { name: "Dancing Script", family: "'Dancing Script', cursive" },
  { name: "Satisfy", family: "'Satisfy', cursive" },
  { name: "Righteous", family: "'Righteous', cursive" },
  { name: "Cinzel", family: "'Cinzel', serif" },
  { name: "Josefin Sans", family: "'Josefin Sans', sans-serif" },
  { name: "Fredoka", family: "'Fredoka', sans-serif" },
  { name: "Teko", family: "'Teko', sans-serif" },
  { name: "Black Ops One", family: "'Black Ops One', cursive" },
  { name: "Russo One", family: "'Russo One', sans-serif" },
  { name: "Alfa Slab One", family: "'Alfa Slab One', serif" },
  { name: "Archivo Black", family: "'Archivo Black', sans-serif" },
  { name: "Bungee", family: "'Bungee', cursive" },
  { name: "Concert One", family: "'Concert One', cursive" },
  { name: "Lilita One", family: "'Lilita One', cursive" },
  { name: "Kanit", family: "'Kanit', sans-serif" },
  { name: "Monoton", family: "'Monoton', cursive" },
  { name: "Ultra", family: "'Ultra', serif" },
  { name: "Orbitron", family: "'Orbitron', sans-serif" },
  { name: "Space Mono", family: "'Space Mono', monospace" },
  { name: "IBM Plex Mono", family: "'IBM Plex Mono', monospace" },
  { name: "Courier Prime", family: "'Courier Prime', monospace" },
  { name: "Great Vibes", family: "'Great Vibes', cursive" },
  { name: "Parisienne", family: "'Parisienne', cursive" },
  { name: "Caveat", family: "'Caveat', cursive" },
  { name: "VT323", family: "'VT323', monospace" },
  { name: "Raleway", family: "'Raleway', sans-serif" },
  { name: "Montserrat", family: "'Montserrat', sans-serif" },
  { name: "Quicksand", family: "'Quicksand', sans-serif" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace" },
];

// Mesh gradient presets - organic, flowing colors like the reference images
const GRADIENTS = [
  {
    id: "believe",
    name: "Believe",
    colors: [
      { color: "#f5a623", x: 20, y: 30 },
      { color: "#9013fe", x: 80, y: 20 },
      { color: "#d063e0", x: 60, y: 80 },
      { color: "#1a0a2e", x: 10, y: 90 },
    ],
    bg: "#2d1b4e",
  },
  {
    id: "confidence",
    name: "Confidence",
    colors: [
      { color: "#00d4ff", x: 10, y: 30 },
      { color: "#00f0ff", x: 40, y: 50 },
      { color: "#ff0080", x: 95, y: 50 },
      { color: "#00b4d8", x: 30, y: 80 },
    ],
    bg: "#0891b2",
  },
  {
    id: "simplify",
    name: "Simplify",
    colors: [
      { color: "#8b5cf6", x: 50, y: 40 },
      { color: "#7c3aed", x: 30, y: 30 },
      { color: "#0f0520", x: 0, y: 100 },
      { color: "#1a0a2e", x: 100, y: 100 },
    ],
    bg: "#4c1d95",
  },
  {
    id: "steady",
    name: "Steady",
    colors: [
      { color: "#0ea5e9", x: 80, y: 70 },
      { color: "#06b6d4", x: 100, y: 100 },
      { color: "#1e3a5f", x: 40, y: 40 },
      { color: "#0c1929", x: 0, y: 0 },
    ],
    bg: "#0c4a6e",
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: [
      { color: "#f97316", x: 30, y: 20 },
      { color: "#ec4899", x: 70, y: 40 },
      { color: "#8b5cf6", x: 90, y: 80 },
      { color: "#1e1b4b", x: 10, y: 90 },
    ],
    bg: "#7c2d12",
  },
  {
    id: "aurora",
    name: "Aurora",
    colors: [
      { color: "#10b981", x: 20, y: 50 },
      { color: "#06b6d4", x: 50, y: 30 },
      { color: "#8b5cf6", x: 80, y: 60 },
      { color: "#0f172a", x: 50, y: 100 },
    ],
    bg: "#064e3b",
  },
  {
    id: "fire",
    name: "Fire",
    colors: [
      { color: "#ef4444", x: 40, y: 30 },
      { color: "#f97316", x: 70, y: 50 },
      { color: "#fbbf24", x: 90, y: 20 },
      { color: "#1c1917", x: 10, y: 90 },
    ],
    bg: "#7f1d1d",
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: [
      { color: "#0284c7", x: 50, y: 40 },
      { color: "#0891b2", x: 80, y: 60 },
      { color: "#06b6d4", x: 30, y: 70 },
      { color: "#0c1929", x: 0, y: 10 },
    ],
    bg: "#0c4a6e",
  },
  {
    id: "lavender",
    name: "Lavender",
    colors: [
      { color: "#c084fc", x: 30, y: 30 },
      { color: "#e879f9", x: 70, y: 50 },
      { color: "#f0abfc", x: 90, y: 20 },
      { color: "#1e1b4b", x: 20, y: 90 },
    ],
    bg: "#581c87",
  },
  {
    id: "mint",
    name: "Mint",
    colors: [
      { color: "#34d399", x: 60, y: 40 },
      { color: "#2dd4bf", x: 30, y: 60 },
      { color: "#a7f3d0", x: 80, y: 20 },
      { color: "#022c22", x: 10, y: 90 },
    ],
    bg: "#065f46",
  },
  {
    id: "rose",
    name: "Rose",
    colors: [
      { color: "#fb7185", x: 40, y: 30 },
      { color: "#f472b6", x: 70, y: 50 },
      { color: "#fda4af", x: 20, y: 60 },
      { color: "#1f1218", x: 80, y: 95 },
    ],
    bg: "#9f1239",
  },
  {
    id: "noir",
    name: "Noir",
    colors: [
      { color: "#404040", x: 50, y: 40 },
      { color: "#525252", x: 80, y: 30 },
      { color: "#262626", x: 20, y: 70 },
      { color: "#0a0a0a", x: 90, y: 90 },
    ],
    bg: "#171717",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    colors: [
      { color: "#6366f1", x: 20, y: 20 },
      { color: "#ec4899", x: 80, y: 30 },
      { color: "#06b6d4", x: 60, y: 70 },
      { color: "#0f172a", x: 10, y: 90 },
    ],
    bg: "#1e1b4b",
  },
  {
    id: "emerald",
    name: "Emerald",
    colors: [
      { color: "#10b981", x: 30, y: 40 },
      { color: "#14b8a6", x: 70, y: 50 },
      { color: "#059669", x: 50, y: 20 },
      { color: "#064e3b", x: 20, y: 80 },
    ],
    bg: "#022c22",
  },
  {
    id: "crimson",
    name: "Crimson",
    colors: [
      { color: "#dc2626", x: 40, y: 20 },
      { color: "#7c2d12", x: 70, y: 60 },
      { color: "#b91c1c", x: 20, y: 70 },
      { color: "#450a0a", x: 80, y: 40 },
    ],
    bg: "#7f1d1d",
  },
  {
    id: "nebula",
    name: "Nebula",
    colors: [
      { color: "#a78bfa", x: 30, y: 30 },
      { color: "#f472b6", x: 70, y: 40 },
      { color: "#60a5fa", x: 50, y: 70 },
      { color: "#1e1b4b", x: 20, y: 90 },
    ],
    bg: "#581c87",
  },
  {
    id: "golden",
    name: "Golden",
    colors: [
      { color: "#fbbf24", x: 30, y: 40 },
      { color: "#f59e0b", x: 70, y: 30 },
      { color: "#d97706", x: 50, y: 70 },
      { color: "#78350f", x: 20, y: 90 },
    ],
    bg: "#92400e",
  },
  {
    id: "glacier",
    name: "Glacier",
    colors: [
      { color: "#67e8f9", x: 20, y: 30 },
      { color: "#0ea5e9", x: 70, y: 50 },
      { color: "#0284c7", x: 50, y: 20 },
      { color: "#0c2d48", x: 80, y: 90 },
    ],
    bg: "#082f49",
  },
];

// Default text
const DEFAULT_TEXT = "Let It Happen";

const ASPECT_RATIOS = [
  { id: "4-5", label: "Instagram Post (4:5)", width: 1080, height: 1350 },
  { id: "1-1", label: "Square (1:1)", width: 1080, height: 1080 },
  { id: "16-9", label: "Landscape (16:9)", width: 1920, height: 1080 },
  { id: "9-16", label: "Story (9:16)", width: 1080, height: 1920 },
  { id: "3-4", label: "Portrait (3:4)", width: 1080, height: 1440 },
];

// Content moderation - offensive words filter
const OFFENSIVE_KEYWORDS = [
  // Slurs and hate speech
  "nigger", "nigga", "faggot", "fag", "dyke", "tranny", "retard",
  "kike", "terrorist", "nazi", "pedophile", "rapist",
  // Common profanity
  "fuck", "fucking", "fucked", "shit", "shitty", "asshole", "bastard",
  "bitch", "bitches", "bitching", "damn", "dammit", "crap", "crappy",
  "piss", "pissed", "hell", "ass", "dick", "cock", "pussy",
  // Extreme violence and self-harm
  "kill yourself", "kys", "go commit", "eat a bullet", "hang yourself",
  "neck yourself", "rope", "slit wrist",
  // Extreme profanity combinations
  "fuck off", "fuck you", "fuck this", "shit off", "bullshit", "horseshit",
  "ass clown", "asshat", "butthole", "dipshit", "dumbass", "fuckface",
  "fuckwad", "dickhead", "shithead", "asshole", "whore", "slut",
  // Discriminatory language
  "hate", "stupid", "idiot", "moron", "lowlife", "scum", "trash",
  // Additional offensive phrases
  "go fuck yourself", "shut the fuck up", "eat shit", "drop dead",
  "die in a fire", "kms", "ctb", "suicide", "overdose",
];

const checkContentSafety = (content) => {
  const normalized = content.toLowerCase().trim();
  return !OFFENSIVE_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );
};

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [fontSize, setFontSize] = useState(72);
  const [font, setFont] = useState(FONTS[0]);
  const [textColor, setTextColor] = useState("#fbbf24");
  const [grain, setGrain] = useState(true);
  const [grainIntensity, setGrainIntensity] = useState(0.15);
  const [vignette, setVignette] = useState(true);
  const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[0]);
  const [contentSafe, setContentSafe] = useState(true);
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineSpacing, setLineSpacing] = useState(1.2);

  const canvasRef = useRef(null);
  const previewRef = useRef(null);

  // Build CSS for mesh gradient preview
  const buildMeshGradientCSS = (g) => {
    const gradients = g.colors.map((c) =>
      `radial-gradient(ellipse at ${c.x}% ${c.y}%, ${c.color} 0%, transparent 60%)`
    ).join(", ");
    return gradients;
  };

  // Generate grain SVG
  const grainSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  // Export to PNG using the selected aspect ratio
  const exportImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = selectedRatio.width;
    const H = selectedRatio.height;
    const scale = W / 1080;

    canvas.width = W;
    canvas.height = H;

    // Draw base color
    ctx.fillStyle = gradient.bg;
    ctx.fillRect(0, 0, W, H);

    // Draw mesh gradient (multiple radial gradients)
    gradient.colors.forEach((c) => {
      const grd = ctx.createRadialGradient(
        (c.x / 100) * W,
        (c.y / 100) * H,
        0,
        (c.x / 100) * W,
        (c.y / 100) * H,
        W * 0.7
      );
      grd.addColorStop(0, c.color);
      grd.addColorStop(0.5, c.color + "88");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });

    // Add vignette
    if (vignette) {
      const vignetteGrd = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
      vignetteGrd.addColorStop(0, "transparent");
      vignetteGrd.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = vignetteGrd;
      ctx.fillRect(0, 0, W, H);
    }

    // Add grain texture
    if (grain) {
      const grainCanvas = document.createElement("canvas");
      grainCanvas.width = W;
      grainCanvas.height = H;
      const grainCtx = grainCanvas.getContext("2d");

      const imageData = grainCtx.createImageData(W, H);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = grainIntensity * 255;
      }

      grainCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(grainCanvas, 0, 0);
    }

    // Text settings
    ctx.fillStyle = textColor;
    const fontWeight = bold ? "800" : "400";
    const fontStyle = italic ? "italic " : "";
    ctx.font = `${fontStyle}${fontWeight} ${fontSize * 2.5 * scale}px ${font.family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text with subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    // Draw multiline text
    const lines = text.split("\n");
    const lineHeight = fontSize * 2.5 * scale * lineSpacing;
    const totalHeight = lines.length * lineHeight;
    const startY = (H - totalHeight) / 2 + lineHeight / 2;

    lines.forEach((line, i) => {
      const letters = line.toUpperCase().split("");
      const charWidth = ctx.measureText("A").width;
      const totalWidth = letters.length * (charWidth + letterSpacing * scale);
      let startX = (W - totalWidth) / 2;
      const textY = startY + i * lineHeight;
      
      letters.forEach((letter) => {
        ctx.fillText(letter, startX, textY);
        startX += ctx.measureText(letter).width + letterSpacing * scale;
      });
    });

    // Export
    const link = document.createElement("a");
    link.download = `${text.split("\n")[0].toLowerCase().replace(/\s+/g, "-") || "text-image"}-${selectedRatio.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [text, gradient, fontSize, font, textColor, grain, grainIntensity, vignette, selectedRatio, bold, italic, letterSpacing, lineSpacing]);

  return (
    <div className="page">
      <div className="shell">
        <div className="topbar">
          <div className="brand">
            <h1 className="title">Letterpeg</h1>
            <p className="subtitle">Create beautiful quote images for any Ratio you desire</p>
          </div>
          <div className="actions">
            <button
              className="btn btnPrimary btnPill"
              onClick={exportImage}
              disabled={!text.trim() || !contentSafe}
            >
              Download PNG ({selectedRatio.id.replace("-", ":")})
            </button>
          </div>
        </div>

        <div className="grid">
          {/* Left: Controls */}
          <div className="card">
            {/* Text Input */}
            <div className="row">
              <label className="sectionTitle">Your Text</label>
              <textarea
                className="textInput"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setContentSafe(checkContentSafety(e.target.value));
                }}
                placeholder="Enter your quote..."
                rows={3}
              />
              {!contentSafe && (
                <div style={{
                  color: "#ef4444",
                  fontSize: "12px",
                  marginTop: "6px",
                  padding: "8px 10px",
                  background: "rgba(239, 68, 68, 0.1)",
                  borderRadius: "8px",
                  border: "1px solid rgba(239, 68, 68, 0.3)"
                }}>
                  ⚠️ This content contains offensive language. Please keep it respectful.
                </div>
              )}
            </div>

            {/* Gradient Selection */}
            <div className="row">
              <label className="sectionTitle">Background</label>
              <div className="gradientGrid">
                {GRADIENTS.map((g) => (
                  <div
                    key={g.id}
                    className={`gradientSwatch ${gradient.id === g.id ? "active" : ""}`}
                    style={{
                      background: g.bg,
                      backgroundImage: buildMeshGradientCSS(g),
                    }}
                    onClick={() => setGradient(g)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${g.name} gradient`}
                  />
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div className="row">
              <label className="sectionTitle">Font</label>
              <select
                className="fontSelect"
                value={font.name}
                onChange={(e) => {
                  const selected = FONTS.find((f) => f.name === e.target.value);
                  if (selected) setFont(selected);
                }}
                style={{ fontFamily: font.family }}
              >
                {FONTS.map((f) => (
                  <option key={f.name} value={f.name} style={{ fontFamily: f.family }}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div className="row">
              <label className="sectionTitle">Aspect Ratio</label>
              <select
                className="fontSelect"
                value={selectedRatio.id}
                onChange={(e) => {
                  const selected = ASPECT_RATIOS.find((ratio) => ratio.id === e.target.value);
                  if (selected) setSelectedRatio(selected);
                }}
              >
                {ASPECT_RATIOS.map((ratio) => (
                  <option key={ratio.id} value={ratio.id}>
                    {ratio.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div className="row">
              <label className="rowLabel">
                <span>Font Size</span>
                <span>{fontSize}px</span>
              </label>
              <input
                type="range"
                className="range"
                min={32}
                max={120}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>

            {/* Text Color */}
            <div className="row">
              <label className="sectionTitle">Text Color</label>
              <div className="colorSwatches">
                {["#ffffff", "#000000", "#f472b6", "#06b6d4", "#fbbf24", "#a78bfa"].map((c) => (
                  <button
                    key={c}
                    className={`colorSwatch ${textColor === c ? "active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setTextColor(c)}
                    aria-label={`Select color ${c}`}
                  />
                ))}
                <input
                  type="color"
                  className="colorPicker"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </div>
            </div>

            {/* Text Styling */}
            <div className="row">
              <label className="sectionTitle">Text Styling</label>
              <div className="effectsGrid">
                <label className="toggleRow">
                  <input
                    type="checkbox"
                    checked={bold}
                    onChange={(e) => setBold(e.target.checked)}
                  />
                  <span>Bold</span>
                </label>
                <label className="toggleRow">
                  <input
                    type="checkbox"
                    checked={italic}
                    onChange={(e) => setItalic(e.target.checked)}
                  />
                  <span>Italic</span>
                </label>
              </div>
              <div className="row" style={{ marginTop: 8 }}>
                <label className="rowLabel">
                  <span>Letter Spacing</span>
                  <span>{letterSpacing.toFixed(1)}px</span>
                </label>
                <input
                  type="range"
                  className="range"
                  min={-10}
                  max={30}
                  step={0.5}
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                />
              </div>
              <div className="row" style={{ marginTop: 8 }}>
                <label className="rowLabel">
                  <span>Line Spacing</span>
                  <span>{lineSpacing.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  className="range"
                  min={0.8}
                  max={2.5}
                  step={0.05}
                  value={lineSpacing}
                  onChange={(e) => setLineSpacing(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Effects */}
            <div className="row">
              <label className="sectionTitle">Effects</label>
              <div className="effectsGrid">
                <label className="toggleRow">
                  <input
                    type="checkbox"
                    checked={grain}
                    onChange={(e) => setGrain(e.target.checked)}
                  />
                  <span>Grain texture</span>
                </label>
                <label className="toggleRow">
                  <input
                    type="checkbox"
                    checked={vignette}
                    onChange={(e) => setVignette(e.target.checked)}
                  />
                  <span>Vignette</span>
                </label>
              </div>
              {grain && (
                <div className="row" style={{ marginTop: 8 }}>
                  <label className="rowLabel">
                    <span>Grain intensity</span>
                    <span>{Math.round(grainIntensity * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    className="range"
                    min={0.05}
                    max={0.8}
                    step={0.01}
                    value={grainIntensity}
                    onChange={(e) => setGrainIntensity(Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right: Preview */}
          <div className="card cardPreview" style={{ aspectRatio: `${selectedRatio.width}/${selectedRatio.height}` }}>
            <div className="previewFrame" ref={previewRef}>
              <div
                className="previewCanvas"
                style={{
                  background: gradient.bg,
                  backgroundImage: buildMeshGradientCSS(gradient),
                }}
              >
                {/* Grain overlay */}
                {grain && (
                  <div
                    className="grainOverlay"
                    style={{
                      backgroundImage: grainSVG,
                      opacity: grainIntensity,
                    }}
                  />
                )}
                {/* Vignette overlay */}
                {vignette && <div className="vignetteOverlay" />}
                {/* Text */}
                <div
                  className="previewText"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: font.family,
                    color: textColor,
                    fontWeight: bold ? "800" : "400",
                    fontStyle: italic ? "italic" : "normal",
                    letterSpacing: `${letterSpacing}px`,
                    lineHeight: lineSpacing,
                  }}
                >
                  {(text || "YOUR TEXT").toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={canvasRef} className="hiddenCanvas" />
      </div>

      <div className="credit">
        Coded by <a className="creditLink" href="https://instagram.com/adhinowhere" target="_blank" rel="noopener noreferrer">adhi-debug</a>
      </div>
    </div>
  );
}
