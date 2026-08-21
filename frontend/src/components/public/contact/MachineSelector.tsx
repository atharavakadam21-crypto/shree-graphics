"use client";

interface MachineOption {
  id: string;
  name: string;
}

interface MachineSelectorProps {
  machines: MachineOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function MachineSelector({
  machines,
  value,
  onChange,
}: MachineSelectorProps) {
  return (
    <div>
      <label
        htmlFor="machine_id"
        className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600"
      >
        Machine / system
      </label>

      <select
        id="machine_id"
        name="machine_id"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full border border-zinc-800 bg-[#080808] px-4 font-mono text-xs uppercase tracking-[0.08em] text-zinc-300 outline-none transition-colors focus:border-cyan-500"
      >
        <option value="">General enquiry</option>

        {machines.map((machine) => (
          <option key={machine.id} value={machine.id}>
            {machine.name}
          </option>
        ))}
      </select>
    </div>
  );
}