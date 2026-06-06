"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Configure as variaveis do Supabase antes de autenticar.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[1fr_460px]">
      <section className="flex items-center px-6 py-10 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-brand">
            DashGarage
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink md:text-5xl">
            CRM operacional para transformar vendas de concessionaria em dados.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite/75">
            Registre leads, estoque, propostas e vendas em um fluxo preparado
            para Supabase, Power BI, Excel, SQL e Python.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Funil comercial", "Estoque parado", "Performance"].map(
              (item) => (
                <div
                  className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-graphite shadow-soft"
                  key={item}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="flex items-center border-t border-line bg-white px-6 py-10 shadow-soft md:px-10 lg:border-l lg:border-t-0">
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Entrar</h2>
            <p className="mt-2 text-sm leading-6 text-graphite/70">
              Use o usuario criado no Supabase Auth para acessar o ambiente.
            </p>
          </div>

          {!isSupabaseConfigured ? (
            <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Supabase ainda nao configurado. Preencha `.env.local` com a URL e
              a anon key para habilitar login real.
            </div>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-graphite">E-mail</span>
            <input
              className="mt-2 h-11 w-full rounded-md border border-line px-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@dashgarage.com"
              type="email"
              value={email}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-graphite">Senha</span>
            <input
              className="mt-2 h-11 w-full rounded-md border border-line px-3 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              type="password"
              value={password}
            />
          </label>

          {message ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {message}
            </p>
          ) : null}

          <button
            className="h-11 w-full rounded-md bg-brand px-4 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-graphite/40"
            disabled={loading}
            type="submit"
          >
            {loading ? "Entrando..." : "Acessar dashboard"}
          </button>
        </form>
      </section>
    </main>
  );
}
