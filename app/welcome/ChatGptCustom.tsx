"use client";

import { useState } from "react";
import { openai } from "~/lib/utils";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import CodeViewer from "./CodeView";

type LocalMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatGptCustom() {
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages: LocalMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content:
            "Eres un asistente que responde preguntas de forma clara y breve.",
        },
        ...newMessages,
      ];

      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: apiMessages,
      });

      const reply =
        res.choices[0].message?.content ?? "No se recibió respuesta.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err: any) {
      console.error("Error al consultar OpenAI:", err.message);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Error al obtener respuesta." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Función que divide texto y bloques de código en partes
  function renderContent(msg: LocalMessage, i: number) {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(msg.content)) !== null) {
      const before = msg.content.slice(lastIndex, match.index).trim();
      if (before) parts.push(<p key={`before-${i}-${lastIndex}`}>{before}</p>);

      const language = match[1] || "plaintext";
      const code = match[2];
      parts.push(
        <CodeViewer
          key={`code-${i}-${lastIndex}`}
          code={code}
          language={language}
        />
      );

      lastIndex = regex.lastIndex;
    }

    const after = msg.content.slice(lastIndex).trim();
    if (after) parts.push(<p key={`after-${i}-${lastIndex}`}>{after}</p>);

    return parts;
  }

  return (
    <div className="flex flex-col w-full h-full border rounded-lg shadow">
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {renderContent(msg, i)}
          </div>
        ))}
        {loading && <div className="italic text-gray-500">Escribiendo...</div>}
      </div>

      {/* Input */}
      <div className="border-t p-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Haz una pregunta..."
          className="flex-1 p-2 border rounded-lg mr-2"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
