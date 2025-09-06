"use client";

import { lazy, Suspense } from "react";

const MonacoEditor = lazy(() =>
  import("@monaco-editor/react").then((mod) => ({ default: mod.default }))
);

interface CodeEditorProps {
  language?: string;
  value?: string;
  theme?: string;
  options?: Record<string, any>;
  height?: string | number;
}

export default function CodeEditor({
  language = "javascript",
  value = "// ...",
  theme = "vs-dark",
  options = { minimap: { enabled: false } },
  height = "100%",
}: CodeEditorProps) {
  return (
    <div className="h-full w-full border rounded-xl shadow">
      <Suspense fallback={<div>Cargando editor...</div>}>
        <MonacoEditor
          height={height}
          defaultLanguage={language}
          defaultValue={value}
          theme={theme}
          options={options}
        />
      </Suspense>
    </div>
  );
}
