import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Zap, Mail, Lock, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Roteiro Infinito" },
      { name: "description", content: "Acesse sua conta Roteiro Infinito." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (kind: "login" | "signup") => (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(kind === "login" ? "Login realizado com sucesso!" : "Conta criada!");
      navigate({ to: "/dashboard" });
    }, 900);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden bg-gradient-hero px-4 py-12">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <Card className="relative w-full max-w-md border-border bg-card/90 p-8 backdrop-blur-xl shadow-red">
        <div className="mb-8 flex flex-col items-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-red shadow-red">
            <Zap className="h-7 w-7 text-white" fill="white" />
          </div>
          <h1 className="mt-4 text-2xl font-black">Bem-vindo de volta</h1>
          <p className="text-sm text-muted-foreground">Acesse sua conta Roteiro Infinito</p>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={submit("login")} className="mt-6 space-y-4">
              <Field id="email" label="E-mail ou usuário" icon={Mail} placeholder="voce@email.com" />
              <Field id="password" label="Senha" icon={Lock} type="password" placeholder="••••••••" />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => toast("Link de recuperação enviado ao seu e-mail.")}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <Button disabled={loading} className="h-12 w-full rounded-xl bg-gradient-red font-bold text-white shadow-red hover:shadow-glow">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={submit("signup")} className="mt-6 space-y-4">
              <Field id="s-email" label="E-mail" icon={Mail} placeholder="voce@email.com" />
              <Field id="s-password" label="Senha" icon={Lock} type="password" placeholder="Mínimo 6 caracteres" />
              <Button disabled={loading} className="h-12 w-full rounded-xl bg-gradient-red font-bold text-white shadow-red hover:shadow-glow">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input id={id} type={type} placeholder={placeholder} required className="h-11 pl-10" />
      </div>
    </div>
  );
}
