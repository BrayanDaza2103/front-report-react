"use client";

import Editor from "@monaco-editor/react";

type CodeViewerProps = {
  code: string;
  language?: string;
};

export default function CodeViewer({
  code,
  language = "javascript",
}: CodeViewerProps) {
  return (
    <div className="rounded-lg w-full overflow-hidden border shadow">
      <Editor
        defaultLanguage={language}
        height={"100px"}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
        }}
      />
    </div>
  );
}
