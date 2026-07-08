import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { from: "bot" | "me"; text: string };

const initial: Msg[] = [
  { from: "bot", text: "Olá! 👋 Sou o assistente Roteiro Infinito. Como posso ajudar?" },
  { from: "bot", text: "Digite: 1 - Teste grátis · 2 - Planos · 3 - Suporte técnico" },
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    const mine = text.trim();
    setMsgs((m) => [...m, { from: "me", text: mine }]);
    setText("");
    setTimeout(() => {
      let reply = "Um atendente humano continuará em instantes. ⏱️";
      if (mine.startsWith("1")) reply = "Perfeito! Seu teste grátis de 12h já pode ser gerado no painel. 🎬";
      else if (mine.startsWith("2")) reply = "Temos planos Mensal (R$29,90), Trimestral (R$79,90) e Anual (R$249,90).";
      else if (mine.startsWith("3")) reply = "Descreva rapidamente o problema e o dispositivo usado.";
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
    }, 700);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-fade-up">
          <div className="flex items-center justify-between bg-[#0b3d2e] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#25d366]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Suporte Roteiro</p>
                <p className="text-[11px] opacity-80">online agora</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="opacity-80 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-[#0d0d0d] p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "me"
                    ? "ml-auto bg-[#005c4b] text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-card p-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Escreva uma mensagem"
              className="h-9"
            />
            <Button size="icon" onClick={send} className="h-9 w-9 bg-[#25d366] hover:bg-[#20bd5b]">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir suporte"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-2xl pulse-ring transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" fill="white" />
      </button>
    </>
  );
}
