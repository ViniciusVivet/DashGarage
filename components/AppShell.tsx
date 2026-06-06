"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appModules } from "@/lib/modules";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setCheckingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setCheckingSession(false);
    });
  }, [router]);

  async function handleLogout() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.replace("/login");
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="rounded-lg border border-line bg-white px-5 py-4 text-sm text-graphite shadow-soft">
          Validando sessao...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-line bg-white/95 px-5 py-5 shadow-soft lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 lg:block">
          <Link href="/dashboard">
            <span className="block text-xl font-semibold tracking-normal text-ink">
              DashGarage
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-normal text-graphite/60">
              CRM + BI Comercial
            </span>
          </Link>
          <button
            className="rounded-md border border-line px-3 py-2 text-sm font-medium text-graphite transition hover:border-graphite hover:text-ink lg:hidden"
            onClick={handleLogout}
            type="button"
          >
            Sair
          </button>
        </div>

        <nav className="mt-6 grid gap-2">
          <Link
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              pathname === "/dashboard"
                ? "bg-brand text-white"
                : "text-graphite hover:bg-panel"
            }`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          {appModules.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-brand text-white" : "text-graphite hover:bg-panel"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="mt-8 hidden w-full rounded-md border border-line px-3 py-2 text-sm font-medium text-graphite transition hover:border-graphite hover:text-ink lg:block"
          onClick={handleLogout}
          type="button"
        >
          Sair
        </button>
      </aside>

      <main className="px-5 py-6 md:px-8 lg:px-10">{children}</main>
    </div>
  );
}
