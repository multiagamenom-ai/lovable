import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Coins,
  Users,
  Zap,
  DollarSign,
  Copy,
  Trophy,
  Target,
  Check,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reseller")({
  head: () => ({
    meta: [{ title: "Painel de Revenda — Roteiro Infinito" }],
  }),
  component: Reseller,
});

// Mock — substituir por API/MySQL
const mockReseller = {
  name: "Rafael Souza",
  credits: 128,
  clients: 47,
  testsToday: 9,
  revenueMonth: 3480.5,
  refLink: "https://roteiroinfinito.tv/r/rafael-souza",
  rank: { current: "Prata", next: "Ouro", progress: 62, salesToNext: 15 },
  missions: [
    { title: "Gere 5 testes hoje", done: 3, total: 5, reward: "+10 créditos" },
    { title: "Converta 3 clientes semanais", done: 2, total: 3, reward: "+25 créditos" },
    { title: "Alcance R$ 5.000 de faturamento", done: 3480, total: 5000, reward: "+100 créditos" },
    { title: "Indique um novo revendedor", done: 1, total: 1, reward: "🏆 Badge Embaixador" },
  ],
};

const ranks = ["Bronze", "Prata", "Ouro", "Embaixador"];

function Reseller() {
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(mockReseller.refLink);
    setCopied(true);
    toast.success("Link de indicação copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const genTest = () => toast.success("Novo teste de 12h gerado! Enviado ao WhatsApp do cliente.");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Painel de Revenda</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Olá, {mockReseller.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas métricas e missões em tempo real.</p>
        </div>
        <Button onClick={genTest} className="h-11 rounded-xl bg-gradient-red font-bold text-white shadow-red hover:shadow-glow">
          <Zap className="mr-2 h-4 w-4" /> Gerar Teste Grátis
        </Button>
      </header>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Coins} label="Créditos" value={mockReseller.credits.toString()} sub="disponíveis" accent />
        <Metric icon={Users} label="Clientes Ativos" value={mockReseller.clients.toString()} sub="+3 esta semana" />
        <Metric icon={Zap} label="Testes Hoje" value={mockReseller.testsToday.toString()} sub="4 conversões" />
        <Metric
          icon={DollarSign}
          label="Faturamento Mês"
          value={`R$ ${mockReseller.revenueMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          sub="+18% vs. mês anterior"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Referral */}
        <Card className="border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Gerador de Link de Indicação
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Compartilhe seu link exclusivo. Você ganha créditos a cada conversão.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Input value={mockReseller.refLink} readOnly className="h-12 font-mono text-xs" />
            <Button
              onClick={copyLink}
              className={`h-12 rounded-xl px-6 font-bold transition-all ${
                copied
                  ? "bg-success text-success-foreground"
                  : "bg-gradient-red text-white shadow-red hover:shadow-glow"
              }`}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copiar Link
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Rank */}
        <Card className="relative overflow-hidden border-primary/40 bg-gradient-to-br from-primary/10 to-card p-6 shadow-red">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Trophy className="h-4 w-4" /> Sua Patente
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black">{mockReseller.rank.current}</span>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">Próxima: {mockReseller.rank.next}</span>
                <span className="font-bold text-primary">{mockReseller.rank.progress}%</span>
              </div>
              <Progress value={mockReseller.rank.progress} className="h-2" />
              <p className="mt-2 text-[11px] text-muted-foreground">
                Faltam {mockReseller.rank.salesToNext} ativações
              </p>
            </div>
            <div className="mt-5 flex gap-1">
              {ranks.map((r) => {
                const isActive = r === mockReseller.rank.current;
                const passed = ranks.indexOf(r) < ranks.indexOf(mockReseller.rank.current);
                return (
                  <Badge
                    key={r}
                    className={`flex-1 justify-center rounded-md py-1 text-[10px] ${
                      isActive
                        ? "bg-gradient-red text-white"
                        : passed
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r}
                  </Badge>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Missions */}
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-black uppercase tracking-wider">Missões Ativas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {mockReseller.missions.map((m) => {
            const pct = Math.min(100, (m.done / m.total) * 100);
            const complete = pct >= 100;
            return (
              <Card
                key={m.title}
                className={`border-border bg-card p-5 transition-all hover:-translate-y-0.5 ${
                  complete ? "border-success/50 shadow-[0_0_30px_-10px_oklch(0.68_0.19_145_/_0.5)]" : "hover:border-primary/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        complete ? "bg-success text-success-foreground" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {complete ? <Check className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-bold">{m.title}</p>
                      <p className="text-xs text-muted-foreground">Recompensa: {m.reward}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-black text-primary">
                    {m.done}/{m.total}
                  </span>
                </div>
                <Progress value={pct} className="mt-4 h-1.5" />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <Card
      className={`p-5 transition-all hover:-translate-y-0.5 ${
        accent
          ? "border-primary/50 bg-gradient-to-br from-primary/15 to-card shadow-red"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${accent ? "bg-gradient-red text-white" : "bg-muted text-primary"}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-black">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>
    </Card>
  );
}
