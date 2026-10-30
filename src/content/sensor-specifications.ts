// Values are attributed to the existing dated primary-source records.
// Not published means no value in the reviewed source, not a measured zero.
export const sensorSpecifications: Record<string, { resolution: string; force: string; interface: string }> = {
  'robotiq-tsf-85': { resolution: '28 taxels (4 × 7); spatial pitch not published', force: 'Not published', interface: 'USB; C++ SDK and Python tools' },
  'melexis-tactaxis': { resolution: 'Not published', force: '5 N normal / 2 N shear; extended 15 N range at reduced accuracy (2025 taxel)', interface: 'Not published' },
  'vitai-gf225': { resolution: 'Approximately 100 μm (manufacturer-reported standard model)', force: '30 N maximum normal and tangential force (manufacturer-reported)', interface: 'USB 2.0' },
  digit: { resolution: 'Not published', force: 'Not published', interface: 'USB camera; Python digit-interface' },
  'gelsight-mini': { resolution: 'Not published as one spatial-resolution value', force: 'Not published', interface: 'USB; image acquisition and reconstruction software' },
  reskin: { resolution: '1 mm at 90% accuracy in the reported evaluation', force: 'Not published', interface: 'Magnetometer acquisition; version-specific hardware' },
};

export function getSensorSpecifications(id: string) {
  return sensorSpecifications[id] ?? { resolution: 'Not published', force: 'Not published', interface: 'Not published' };
}
