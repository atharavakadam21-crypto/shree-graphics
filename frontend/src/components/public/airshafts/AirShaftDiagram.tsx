"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import ScrollReveal from "@/components/public/ScrollReveal";

type ComponentId =
  | "body"
  | "lugs"
  | "bladder"
  | "journal"
  | "bearings"
  | "seals";

interface ComponentInfo {
  id: ComponentId;
  number: string;
  name: string;
  description: string;
}

const components: ComponentInfo[] = [
  {
    id: "body",
    number: "01",
    name: "Shaft Body",
    description:
      "The main cylindrical shaft body that houses the expansion mechanism and provides the structural platform for the roll-gripping elements.",
  },
  {
    id: "lugs",
    number: "02",
    name: "Expansion Lugs",
    description:
      "Longitudinal gripping elements that expand outward from the shaft surface to engage the inside diameter of the roll core.",
  },
  {
    id: "bladder",
    number: "03",
    name: "Air Bladder",
    description:
      "An internal pneumatic element that expands when air is introduced and actuates the external gripping elements.",
  },
  {
    id: "journal",
    number: "04",
    name: "End Journals",
    description:
      "Machined shaft extensions used to locate, support and drive the airshaft within the converting machine.",
  },
  {
    id: "bearings",
    number: "05",
    name: "Bearing Areas",
    description:
      "Support interfaces around the shaft ends that allow controlled rotation within the machine assembly.",
  },
  {
    id: "seals",
    number: "06",
    name: "Seals / O-Rings",
    description:
      "Sealing elements used around pneumatic and rotating interfaces of the shaft assembly.",
  },
];

/* =========================================================
   MATERIALS
========================================================= */

function MetalMaterial({
  color,
  active = false,
}: {
  color: string;
  active?: boolean;
}) {
  return (
    <meshStandardMaterial
      color={active ? "#f5820c" : color}
      metalness={0.88}
      roughness={0.24}
    />
  );
}

/* =========================================================
   MAIN SHAFT BODY
========================================================= */

function ShaftBody({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {/* Main outer tube */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.92, 0.92, 7.2, 96]} />
        <MetalMaterial color="#777982" active={active} />
      </mesh>

      {/* Inner recessed core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.76, 0.76, 7.24, 96]} />

        <meshStandardMaterial
          color="#17181d"
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>

      {/* End collars */}
      {[-3.15, 3.15].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.99, 0.99, 0.18, 96]} />
          <MetalMaterial color="#5f626b" active={active} />
        </mesh>
      ))}

      {/* Technical rings */}
      {[-2.4, -1.2, 0, 1.2, 2.4].map((x) => (
        <mesh
          key={x}
          position={[x, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.925, 0.018, 12, 80]} />

          <meshStandardMaterial
            color={active ? "#f5820c" : "#a1a1aa"}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   EXPANSION LUGS
========================================================= */

function ExpansionLugs({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  const lugs = useMemo(() => {
    const result: Array<{
      angle: number;
      x: number;
    }> = [];

    /*
     * Four visible longitudinal lug rows.
     * The actual arrangement can later be changed
     * when Shree Graphics' real shaft drawing is available.
     */

    const angles = [
      0,
      Math.PI / 2,
      Math.PI,
      (Math.PI * 3) / 2,
    ];

    for (const angle of angles) {
      for (let x = -2.65; x <= 2.65; x += 0.53) {
        result.push({ angle, x });
      }
    }

    return result;
  }, []);

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {lugs.map((lug, index) => {
        const radius = 0.98;

        const y = Math.cos(lug.angle) * radius;
        const z = Math.sin(lug.angle) * radius;

        return (
          <mesh
            key={index}
            position={[lug.x, y, z]}
            rotation={[lug.angle, 0, 0]}
          >
            <boxGeometry args={[0.38, 0.16, 0.3]} />

            <meshStandardMaterial
              color={active ? "#f5820c" : "#44464d"}
              metalness={0.78}
              roughness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================
   INTERNAL AIR BLADDER
========================================================= */

function AirBladder({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 5.8, 48]} />

        <meshStandardMaterial
          color={active ? "#f5820c" : "#2e1a6b"}
          transparent
          opacity={active ? 0.7 : 0.3}
          metalness={0.05}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   END JOURNALS
========================================================= */

function EndJournals({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {[-4.25, 4.25].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* Large end flange */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[1.08, 1.08, 0.32, 64]} />
            <MetalMaterial color="#5b5d64" active={active} />
          </mesh>

          {/* Journal */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.36, 0.36, 1.35, 48]} />
            <MetalMaterial color="#85878e" active={active} />
          </mesh>

          {/* Drive section */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.23, 0.23, 1.6, 32]} />

            <meshStandardMaterial
              color="#22232a"
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   BEARING AREAS
========================================================= */

function Bearings({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {[-3.75, 3.75].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.47, 0.14, 20, 64]} />

            <meshStandardMaterial
              color={active ? "#2e1a6b" : "#50525b"}
              metalness={0.95}
              roughness={0.18}
            />
          </mesh>

          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.58, 0.58, 0.14, 64]} />

            <meshStandardMaterial
              color="#18191e"
              metalness={0.8}
              roughness={0.26}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   SEALS
========================================================= */

function Seals({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {[-3.35, 3.35].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.52, 0.055, 16, 64]} />

            <meshStandardMaterial
              color={active ? "#f5820c" : "#6c451e"}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   AIR VALVE
========================================================= */

function AirValve() {
  return (
    <group position={[2.4, 0.92, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.32, 32]} />

        <meshStandardMaterial
          color="#17171b"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 24]} />

        <meshStandardMaterial
          color="#f5820c"
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   COMPLETE AIRSHAFT
========================================================= */

function AirShaftModel({
  activeId,
  setActiveId,
}: {
  activeId: ComponentId;
  setActiveId: (id: ComponentId) => void;
}) {
  return (
    <group rotation={[0.18, -0.25, 0]}>
      <ShaftBody
        active={activeId === "body"}
        onSelect={() => setActiveId("body")}
      />

      <AirBladder
        active={activeId === "bladder"}
        onSelect={() => setActiveId("bladder")}
      />

      <ExpansionLugs
        active={activeId === "lugs"}
        onSelect={() => setActiveId("lugs")}
      />

      <EndJournals
        active={activeId === "journal"}
        onSelect={() => setActiveId("journal")}
      />

      <Bearings
        active={activeId === "bearings"}
        onSelect={() => setActiveId("bearings")}
      />

      <Seals
        active={activeId === "seals"}
        onSelect={() => setActiveId("seals")}
      />

      <AirValve />
    </group>
  );
}

/* =========================================================
   THREE.JS SCENE
========================================================= */

function TechnicalScene({
  activeId,
  setActiveId,
}: {
  activeId: ComponentId;
  setActiveId: (id: ComponentId) => void;
}) {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[8.8, 4.8, 8.8]}
        fov={38}
      />

      <ambientLight intensity={0.65} />

      <directionalLight
        position={[5, 8, 7]}
        intensity={2.5}
      />

      <directionalLight
        position={[-7, 3, -5]}
        intensity={1.3}
        color="#2e1a6b"
      />

      <pointLight
        position={[0, 2, 5]}
        intensity={1.4}
        color="#f5820c"
      />

      <pointLight
        position={[-4, -2, -3]}
        intensity={0.8}
        color="#2e1a6b"
      />

      <AirShaftModel
        activeId={activeId}
        setActiveId={setActiveId}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.075}
        minDistance={6}
        maxDistance={15}
        rotateSpeed={0.5}
      />

      <Environment preset="warehouse" />

      <gridHelper
        args={[
          20,
          20,
          "#2e1a6b",
          "#17171c",
        ]}
        position={[0, -2, 0]}
      />
    </>
  );
}

/* =========================================================
   AIRSHAFT DIAGRAM SECTION
========================================================= */

export default function AirShaftDiagram() {
  const [activeId, setActiveId] =
    useState<ComponentId>("lugs");

  const active =
    components.find(
      (component) => component.id === activeId
    ) ?? components[0];

  return (
    <section
      id="airshaft-anatomy"
      className="relative overflow-hidden border-b border-zinc-800/80 bg-[#07070a] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#f5820c]">
                <span className="h-px w-8 bg-[#f5820c]" />
                03 / AIRSHAFT ANATOMY
              </div>

              <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
                INSIDE THE
                <br />

                <span className="text-zinc-600">
                  AIR EXPANDING
                </span>

                <br />

                <span className="text-[#f5820c]">
                  SHAFT.
                </span>
              </h2>
            </div>

            <div className="border-l border-[#2e1a6b] pl-5 lg:col-span-5">
              <p className="text-sm leading-7 text-zinc-400">
                Explore the construction of a typical
                lug-type pneumatic airshaft. Rotate the
                assembly and select components to inspect
                their function.
              </p>

              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                Interactive engineering visualization
              </p>
            </div>
          </div>
        </ScrollReveal>   

        {/* MAIN CONTENT */}

        <div className="mt-14 grid gap-6 lg:grid-cols-12">

          {/* 3D VIEWER */}

          <ScrollReveal
            delay={100}
            className="lg:col-span-8"
          >
            <div className="relative h-[480px] overflow-hidden border border-zinc-800 bg-[#030305] sm:h-[600px]">

              {/* CAD GRID */}

              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      to right,
                      rgba(255,255,255,0.035) 1px,
                      transparent 1px
                    ),
                    linear-gradient(
                      to bottom,
                      rgba(255,255,255,0.035) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "48px 48px",
                }}
              />

              {/* TOP LABEL */}

              <div className="absolute left-5 top-5 z-20">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#f5820c]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                    3D AIRSHAFT VIEWER
                  </span>
                </div>

                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600">
                  Rotate / Zoom / Select
                </p>
              </div>

              {/* MODEL LABEL */}

              <div className="absolute right-5 top-5 z-20 text-right">
                <p className="font-mono text-[8px] text-zinc-600">
                  SG / AIRSHAFT
                </p>

                <p className="mt-1 font-mono text-[8px] text-[#2e1a6b]">
                  LUG TYPE / PNEUMATIC
                </p>
              </div>

              {/* THREE JS */}

              <Canvas
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  alpha: true,
                }}
              >
                <Suspense fallback={null}>
                  <TechnicalScene
                    activeId={activeId}
                    setActiveId={setActiveId}
                  />
                </Suspense>
              </Canvas>

              {/* BOTTOM STATUS */}

              <div className="absolute bottom-4 left-5 right-5 z-20 flex flex-wrap justify-between gap-3 border-t border-zinc-800 pt-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-700">
                  Conceptual Technical Model
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#f5820c]">
                  Drag To Rotate
                </span>
              </div>
            </div>
          </ScrollReveal>   

          {/* COMPONENT PANEL */}

          <ScrollReveal
            delay={180}
            className="lg:col-span-4"
          >
            <div className="flex h-full min-h-[480px] flex-col border border-zinc-800 bg-[#09090d]">

              {/* PANEL HEADER */}

              <div className="border-b border-zinc-800 p-6 sm:p-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  Selected Component
                </span>

                <h3 className="mt-3 text-2xl font-bold uppercase text-white">
                  {active.name}
                </h3>

                <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#f5820c]">
                  COMPONENT / {active.number}
                </div>
              </div>

              {/* COMPONENT LIST */}

              <div className="flex-1 divide-y divide-zinc-800">
                {components.map((component) => {
                  const selected =
                    component.id === activeId;

                  return (
                    <button
                      key={component.id}
                      type="button"
                      onClick={() =>
                        setActiveId(component.id)
                      }
                      className={`flex min-h-14 w-full items-center gap-4 px-6 text-left transition-all duration-200 ${
                        selected
                          ? "bg-[#f5820c]/5"
                          : "hover:bg-zinc-900"
                      }`}
                    >
                      <span
                        className={`font-mono text-[9px] ${
                          selected
                            ? "text-[#f5820c]"
                            : "text-zinc-700"
                        }`}
                      >
                        {component.number}
                      </span>

                      <span
                        className={`text-xs font-semibold uppercase ${
                          selected
                            ? "text-white"
                            : "text-zinc-500"
                        }`}
                      >
                        {component.name}
                      </span>

                      <span
                        className={`ml-auto h-1.5 w-1.5 ${
                          selected
                            ? "bg-[#f5820c]"
                            : "bg-zinc-800"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* DESCRIPTION */}

              <div className="border-t border-zinc-800 p-6 sm:p-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                  Engineering Description
                </span>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {active.description}
                </p>

                <a
                  href="/contact"
                  className="group mt-6 flex min-h-12 w-full items-center justify-between border border-[#f5820c] bg-[#f5820c] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:border-[#2e1a6b] hover:bg-[#2e1a6b] hover:text-white"
                >
                  <span>
                    Discuss This Component
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>   

        </div>
      </div>
    </section>
  );
}