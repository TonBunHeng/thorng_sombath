/**
 * Canvas particle and ripple effects
 */

export function initEmbers(canvas, { count = 36, intensity = 1 } = {}) {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticle = (p = {}, randomY = false) => {
    p.x = Math.random() * width;
    p.y = randomY ? Math.random() * height : height + 10;
    p.r = 0.6 + Math.random() * 1.8;
    p.vy = 0.15 + Math.random() * 0.5;
    p.vx = (Math.random() - 0.5) * 0.2;
    p.ph = Math.random() * Math.PI * 2;
    p.life = 0.4 + Math.random() * 0.6;
    return p;
  };

  resize();
  for (let i = 0; i < count; i++) {
    particles.push(createParticle({}, true));
  }

  let animId = null;
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.vy;
      p.x += p.vx + Math.sin(p.ph) * 0.3;
      p.ph += 0.02;
      p.life -= 0.002;

      if (p.y < -10 || p.life <= 0) {
        createParticle(p, false);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 182, 92, ${Math.max(0, p.life * intensity)})`;
      ctx.shadowColor = "#ffb65c";
      ctx.shadowBlur = 6;
      ctx.fill();
    }
    animId = requestAnimationFrame(render);
  };

  animId = requestAnimationFrame(render);
  window.addEventListener("resize", resize);

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    },
    setIntensity: (val) => {
      intensity = val;
    }
  };
}

export function initPondWater(canvas, imgElement, { onTap } = {}) {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  const ripples = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
  };
  resize();

  const handlePointerDown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripples.push({ x, y, r: 0, maxR: 90 + Math.random() * 40, opacity: 0.8 });
    if (onTap) {
      onTap(e.clientX, e.clientY);
    }
  };

  canvas.addEventListener("pointerdown", handlePointerDown);

  let animId = null;
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rip = ripples[i];
      rip.r += 1.8;
      rip.opacity *= 0.965;

      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(251, 239, 192, ${rip.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (rip.opacity <= 0.01 || rip.r >= rip.maxR) {
        ripples.splice(i, 1);
      }
    }
    animId = requestAnimationFrame(render);
  };
  animId = requestAnimationFrame(render);
  window.addEventListener("resize", resize);

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", resize);
    }
  };
}
