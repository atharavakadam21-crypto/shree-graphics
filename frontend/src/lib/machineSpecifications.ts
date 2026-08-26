export type MachineSpecifications = Record<string, string>;

export const STANDARD_MACHINE_SPECIFICATIONS = [
  { key: 'type', label: 'Machine Type' },
  { key: 'application', label: 'Application' },
  { key: 'speed', label: 'Speed' },
  { key: 'power', label: 'Power' },
  { key: 'voltage', label: 'Voltage' },
  { key: 'accuracy', label: 'Accuracy / Precision' }
] as const;

export function normalizeMachineSpecifications(value: unknown): MachineSpecifications {
  const source = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const output: MachineSpecifications = {};

  for (const [key, raw] of Object.entries(source)) {
    const text = raw == null ? '' : String(raw).trim();
    if (!text) continue;
    const compact = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalized = compact === 'machinetype' ? 'type'
      : compact.startsWith('speed') ? 'speed'
      : compact === 'precision' ? 'accuracy'
      : compact === 'accuracy' || compact === 'application' || compact === 'power' || compact === 'voltage' || compact === 'type'
        ? compact
        : key;
    output[normalized] = text;
  }

  return output;
}

export function cleanMachineSpecifications(value: MachineSpecifications): MachineSpecifications {
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key.trim(), item.trim()])
      .filter(([key, item]) => key && item)
  );
}
