import { Bot } from "lucide-react";

export default function AssistantHeader() {
  return (
    <div className="border-b border-white/10 p-5">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D3C09A]/10 border border-[#D3C09A]/20">
          <Bot
            size={30}
            className="text-[#D3C09A]"
          />
        </div>

        <div>

          <h2 className="text-lg font-bold text-white">
            Shree Graphics Assistant
          </h2>

          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

            Engineering Support Online
          </div>

        </div>

      </div>

    </div>
  );
}