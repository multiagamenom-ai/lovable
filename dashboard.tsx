import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Calendar,
  Clock,
  RefreshCw,
  Headphones,
  Eye,
  EyeOff,
  Copy,
  Link as LinkIcon,
  User,
  KeyRound,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Área do Cliente — Roteiro Infinito" }],
  }),
  component: Dashboard,
});

// Mock — substituir por dados reais do MySQL
const mockUser = {
  name: "Lucas Andrade",
  email: "lucas@email.com",
  status: "active" as "active" | "expired",
  plan: "Trimestral 4K",
  expiresAt: "2026-10-05",
  daysLeft: 89,
  credentials: {
    user: "lucas.andrade",
    pass: "R0t31r0!2026",
    m3u: "http://stream.roteiroinfinito.tv/get.php?username=lucas.andrade&password=***&type=m3u_plus",
  },
};

function Dashboard() {
  const [showPass, setShowPass] = useState(false);
  const active = mockUser.status === "active";
  const totalDays = 90;
  const progress = Math.min(100, (mockUser.daysLeft / totalDays) * 100);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} copiado!`));
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Área do Cliente</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Olá, {mockUser.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-muted-foreground">{mockUser.email}</p>
        </div>
        <Badge
          className={active ? "border-success/40 bg-success/10 text-success" : "border-primary/40 bg-primary/10 text-primary"}
        >
          <span className="mr-1.5 h-2 w-2 rounded-full" style={{ background: active ? "oklch(0.68 0.19 145)" : "oklch(0.58 0.245 27.5)" }} />
          Assinatura {active ? "Ativa" : "Expirada"}
        </Badge>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Status */}
        <Card className="border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Status da Assinatura</p>
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2 className={`h-6 w-6 ${active ? "text-success" : "text-primary"}`} />
                <span className="text-2xl font-black">{active ? "Ativa" : "Expirada"}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Plano {mockUser.plan}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Vencimento</p>
              <p className="mt-1 flex items-center justify-end gap-1 text-lg font-bold">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(mockUser.expiresAt).toLocaleDateString("pt-BR")}
              </p>
              <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {mockUser.daysLeft} dias restantes
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Progress value={progress} className="h-2" />
            <div className="mt-2 flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>Início</span>
              <span>{Math.round(progress)}% restante</span>
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <Card className="flex flex-col gap-3 border-border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Atalhos rápidos</p>
          <Button
            onClick={() => toast.success("Redirecionando para renovação...")}
            className="h-12 justify-start rounded-xl bg-gradient-red font-bold text-white shadow-red hover:shadow-glow"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Renovar Plano
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Abrindo canal de suporte...")}
            className="h-12 justify-start rounded-xl border-border"
          >
            <Headphones className="mr-2 h-4 w-4" /> Abrir Suporte
          </Button>
        </Card>

        {/* Credentials */}
        <Card className="border-border bg-card p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Credenciais de Acesso ao Streaming
            </p>
            <Button variant="ghost" size="sm" onClick={() => setShowPass((v) => !v)}>
              {showPass ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
              {showPass ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <CredField
              icon={User}
              label="Usuário"
              value={mockUser.credentials.user}
              onCopy={() => copy(mockUser.credentials.user, "Usuário")}
            />
            <CredField
              icon={KeyRound}
              label="Senha"
              value={showPass ? mockUser.credentials.pass : "••••••••••"}
              onCopy={() => copy(mockUser.credentials.pass, "Senha")}
            />
            <CredField
              icon={LinkIcon}
              label="URL M3U"
              value={mockUser.credentials.m3u}
              mono
              onCopy={() => copy(mockUser.credentials.m3u, "URL M3U")}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function CredField({
  icon: Icon,
  label,
  value,
  onCopy,
  mono,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onCopy: () => void;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <p className={`flex-1 truncate text-sm ${mono ? "font-mono text-xs" : "font-semibold"}`}>{value}</p>
        <Button size="icon" variant="ghost" onClick={onCopy} className="h-8 w-8 shrink-0 hover:bg-primary hover:text-primary-foreground">
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
