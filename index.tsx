import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Check,
  Star,
  Zap,
  Wifi,
  Headphones,
  MonitorSmartphone,
  ShieldCheck,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roteiro Infinito — Streaming Premium sem Travamentos" },
      {
        name: "description",
        content:
          "Assista milhares de canais, filmes e séries em 4K/FHD sem travamentos. Teste grátis por 12h.",
      },
    ],
  }),
  component: Landing,
});

const perks = [
  { icon: MonitorSmartphone, title: "4K / FHD Real", desc: "Qualidade cinematográfica em todos os dispositivos." },
  { icon: Wifi, title: "Zero Travamentos", desc: "Servidores dedicados com uptime de 99,9%." },
  { icon: Headphones, title: "Suporte 24/7", desc: "Atendimento humano a qualquer hora do dia." },
  { icon: ShieldCheck, title: "Compatível Total", desc: "Android, iOS, Smart TV, Fire TV e mais." },
];

const plans = [
  {
    name: "Mensal",
    price: "29,90",
    period: "/mês",
    highlight: false,
    features: ["1 tela simultânea", "Catálogo completo", "Qualidade FHD", "Suporte por chat"],
  },
  {
    name: "Trimestral",
    price: "79,90",
    period: "/trim",
    highlight: true,
    badge: "Mais Vendido",
    features: [
      "2 telas simultâneas",
      "Catálogo completo + adultos",
      "Qualidade 4K UHD",
      "Suporte prioritário 24/7",
      "Bônus: filmes VOD",
    ],
  },
  {
    name: "Anual",
    price: "249,90",
    period: "/ano",
    highlight: false,
    features: ["3 telas simultâneas", "Todos os pacotes", "Qualidade 4K UHD", "Suporte VIP", "2 meses grátis"],
  },
];

const testimonials = [
  { name: "Carlos M.", city: "São Paulo", stars: 5, text: "Melhor investimento. Zero travamentos assistindo Champions League em 4K." },
  { name: "Amanda R.", city: "Rio de Janeiro", stars: 5, text: "Instalei na Smart TV em 2 minutos. Suporte respondeu em menos de 1 min." },
  { name: "Pedro L.", city: "Belo Horizonte", stars: 5, text: "Já sou cliente há 8 meses, nunca caiu. Vale cada centavo." },
  { name: "Juliana F.", city: "Curitiba", stars: 5, text: "Interface linda e catálogo enorme. Substituiu minhas 3 assinaturas." },
];

function Landing() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-32 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <Badge className="mb-5 border-primary/40 bg-primary/10 text-primary hover:bg-primary/15">
              <Sparkles className="mr-1 h-3 w-3" /> Novo servidor 4K disponível
            </Badge>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Entretenimento{" "}
              <span className="text-gradient-red">ilimitado.</span>
              <br />
              Estabilidade absoluta.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Mais de 20 mil canais, filmes e séries em 4K. Servidores dedicados, zero travamentos e suporte humano 24 horas.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() => toast.success("Teste grátis solicitado! Verifique seu WhatsApp em instantes.")}
                className="h-14 rounded-xl bg-gradient-red px-8 text-base font-bold text-white shadow-red transition-transform hover:scale-105 hover:shadow-glow"
              >
                <Play className="mr-2 h-5 w-5" fill="white" />
                Solicitar Teste Grátis de 12 Horas
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-xl border-border bg-transparent px-6 text-base"
              >
                <Link to="/downloads">
                  Ver Downloads <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" /> Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Ativação em 60s
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-red opacity-30 blur-3xl" />
            <div className="rounded-3xl border border-border bg-card/80 p-2 shadow-red backdrop-blur">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#050505]">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2 opacity-70">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded bg-gradient-to-br from-primary/40 via-primary/10 to-transparent"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-red shadow-glow">
                    <Play className="h-7 w-7 text-white" fill="white" />
                  </div>
                  <p className="text-lg font-bold">4K UHD • 20.000+ canais</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Filmes · Séries · Esportes · Kids
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3 text-center">
                {[
                  { k: "20k+", v: "Canais" },
                  { k: "99.9%", v: "Uptime" },
                  { k: "24/7", v: "Suporte" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl bg-muted/40 p-3">
                    <p className="text-lg font-black text-primary">{s.k}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="border-y border-border/60 bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Diferenciais</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Por que escolher o Roteiro Infinito</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <Card
                key={p.title}
                className="group border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-red"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Planos</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Escolha o plano ideal para você
            </h2>
            <p className="mt-3 text-muted-foreground">Sem fidelidade. Cancele quando quiser.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`relative flex flex-col p-8 transition-all ${
                  p.highlight
                    ? "scale-[1.03] border-primary/60 bg-gradient-to-b from-primary/10 to-card shadow-red"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-red px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-red">
                    {p.badge}
                  </div>
                )}
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {p.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-black">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => toast.success(`Plano ${p.name} selecionado! Redirecionando...`)}
                  className={`mt-8 h-12 rounded-xl font-bold ${
                    p.highlight
                      ? "bg-gradient-red text-white shadow-red hover:shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Assinar Agora
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border/60 bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Depoimentos</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              +50.000 clientes satisfeitos
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <Card
                key={t.name}
                className="flex flex-col border-border bg-card p-6 transition-all hover:border-primary/40"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">"{t.text}"</p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black sm:text-5xl">
            Pronto para <span className="text-gradient-red">nunca mais travar?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ative seu teste grátis agora. Leva menos de 60 segundos.
          </p>
          <Button
            size="lg"
            onClick={() => toast.success("Teste grátis solicitado!")}
            className="mt-8 h-14 rounded-xl bg-gradient-red px-10 text-base font-bold text-white shadow-red hover:shadow-glow"
          >
            Começar Teste Grátis
          </Button>
        </div>
      </section>
    </div>
  );
}
