"use client";

import { useState } from "react";
import AssistantButton from "./AssistantButton";
import AssistantPanel from "./AssistantPanel";

export type AssistantView = "menu" | "finder";

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AssistantView>("menu");

  const handleOpen = () => {
    setOpen(true);
    setView("menu");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <AssistantButton
          onClick={handleOpen}
          label="Shree AI"
        />
      )}

      {open && (
        <AssistantPanel
          view={view}
          onViewChange={setView}
          onClose={handleClose}
        />
      )}
    </>
  );
}
