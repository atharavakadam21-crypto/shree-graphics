export interface FinderQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
  }[];
}

export const machineQuestions: FinderQuestion[] = [
  {
    id: "process",
    question: "What process are you looking for?",
    description: "Choose the production process closest to your requirement.",
    options: [
      {
        id: "flexo",
        label: "Flexographic Printing",
        description: "Printing applications for label and packaging production.",
      },
      {
        id: "slitting",
        label: "Slitting",
        description: "Converting rolls into narrower finished widths.",
      },
      {
        id: "die-cutting",
        label: "Rotary Die Cutting",
        description: "Die cutting requirements for labels and converted material.",
      },
      {
        id: "rewinding",
        label: "Inspection / Rewinding",
        description: "Inspection, rewinding and roll handling.",
      },
      {
        id: "core",
        label: "Paper Core Cutting",
        description: "Cutting paper cores to production requirements.",
      },
    ],
  },
  {
    id: "priority",
    question: "What is your main priority?",
    description: "This helps narrow the type of machine you should explore.",
    options: [
      {
        id: "production",
        label: "Production",
        description: "I need a machine focused on continuous production.",
      },
      {
        id: "precision",
        label: "Precision",
        description: "Accuracy and controlled converting are important.",
      },
      {
        id: "flexibility",
        label: "Flexibility",
        description: "I need a solution adaptable to different jobs.",
      },
      {
        id: "replacement",
        label: "Replacement",
        description: "I am replacing or upgrading existing equipment.",
      },
    ],
  },
  {
    id: "stage",
    question: "Where are you in the process?",
    description: "Tell us what you need right now.",
    options: [
      {
        id: "research",
        label: "Researching",
        description: "I'm comparing options before making a decision.",
      },
      {
        id: "quotation",
        label: "Need a Quotation",
        description: "I want to discuss pricing and specifications.",
      },
      {
        id: "ready",
        label: "Ready to Discuss",
        description: "I already know what I need and want to speak to sales.",
      },
    ],
  },
];
