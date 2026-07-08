import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Smartphone, Apple, Monitor, Tv, Laptop } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — Roteiro Infinito" },
      { name: "description", content: "Baixe o app Roteiro Infinito para Android, iOS, Windows, macOS, Fire TV e Smart TVs." },
    ],
  }),
  component: Downloads,
});

const apps = [
  { name: "Android", ext: "APK v4.2", icon: Smartphone, instr: "Baixe o APK, habilite 'Fontes desconhecidas' e instale.", color: "from-green-500/20 to-transparent" },
  { name: "iOS", ext: "iPhone / iPad", icon: Apple, instr: "Instale via TestFlight ou perfil MDM configurado.", color: "from-slate-400/20 to-transparent" },
  { name: "Windows", ext: ".exe 64-bit", icon: Monitor, instr: "Baixe o instalador e execute como administrador.", color: "from-blue-500/20 to-transparent" },
  { name: "macOS", ext: ".dmg universal", icon: Laptop, instr: "Arraste o app para a pasta Aplicativos.", color: "from-zinc-400/20 to-transparent" },
  { name: "Fire TV", ext: "Amazon Store", icon: Tv, instr: "Busque 'Roteiro Infinito' na Amazon App Store.", color: "from-orange-500/20 to-transparent" },
  { name: "Smart TV", ext: "Samsung / LG", icon: Tv, instr: "Disponível em Tizen (Samsung) e webOS (LG) via loja.", color: "from-purple-500/20 to-transparent" },
];

function Downloads() {
  const dl = (name: string) => toast.success(`Iniciando download para ${name}...`);
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Central de Downloads</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Instale em qualquer dispositivo</h1>
        <p className="mt-4 text-muted-foreground">Escolha sua plataforma e comece a assistir em minutos.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((a) => (
          <Card
            key={a.name}
            className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-red"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 transition-opacity group-hover:opacity-100`} />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.ext}</p>
                </div>
              </div>
              <p className="mt-5 min-h-[3rem] text-sm text-muted-foreground">{a.instr}</p>
              <Button
                onClick={() => dl(a.name)}
                className="mt-4 h-11 w-full rounded-xl bg-secondary font-bold transition-colors hover:bg-gradient-red hover:text-white hover:shadow-red"
              >
                <Download className="mr-2 h-4 w-4" /> Baixar para {a.name}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
