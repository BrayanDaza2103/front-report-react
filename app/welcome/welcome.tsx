"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import CodeEditor from "./edito";
import ChatGptCustom from "./ChatGptCustom";

export function Welcome() {
  const CodeEditorProps = {
    language: "javascript",
    value: "Hola, mundo!",
    theme: "vs-dark",
    options: { minimap: { enabled: false } },
    height: "100%",
  };

  return (
    <main className="flex items-center justify-center p-8 h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25} minSize={10} maxSize={50}>
          <div className="flex h-full w-full min-w-2xl items-center justify-center p-6">
            <ChatGptCustom />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full w-full items-center justify-center p-6">
            <CodeEditor {...CodeEditorProps} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
