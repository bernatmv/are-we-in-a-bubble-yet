// A monochrome halftone bubble: a lit sphere with a dark soap-film rim, rendered as ink dots on paper.
// Shared by the hero plate (via Astro) and the social-card generator.

const normalize = ([x, y, z]) => {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
};

export function halftoneDots({ size = 480, step = 16, radius = 0.44 } = {}) {
  const center = size / 2;
  const sphere = size * radius;
  const light = normalize([-0.45, -0.55, 0.7]);
  const half = normalize([light[0], light[1], light[2] + 1]);
  const dots = [];
  for (let row = 0, y = step / 2; y < size; y += step, row++) {
    const offset = row % 2 ? step / 2 : 0;
    for (let x = step / 2 + offset; x < size; x += step) {
      const dx = (x - center) / sphere;
      const dy = (y - center) / sphere;
      const distance = dx * dx + dy * dy;
      if (distance > 1) continue;
      const z = Math.sqrt(1 - distance);
      const lambert = Math.max(0, dx * light[0] + dy * light[1] + z * light[2]);
      const specular = Math.pow(Math.max(0, dx * half[0] + dy * half[1] + z * half[2]), 60);
      const rim = Math.pow(1 - z, 2.5);
      const darkness = Math.min(1, Math.max(0, 0.12 + 0.5 * (1 - lambert) + 0.8 * rim - 1.3 * specular));
      const r = darkness * step * 0.5;
      if (r < 0.4) continue;
      dots.push({ x, y, r });
    }
  }
  return dots;
}

export function halftonePath(dots) {
  return dots
    .map(({ x, y, r }) => {
      const radius = r.toFixed(1);
      return `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${radius} ${radius} 0 1 0 ${(r * 2).toFixed(1)} 0a${radius} ${radius} 0 1 0 -${(r * 2).toFixed(1)} 0`;
    })
    .join('');
}
