"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, string>) => void;
        };
      };
    };
  }
}

type Etat = "idle" | "envoi" | "succes" | "erreur";

/** Formulaire d'abonnement à la lettre : e-mail ou compte Google (Google
 * Identity Services). Le bouton Google ne s'affiche que si
 * `NEXT_PUBLIC_GOOGLE_CLIENT_ID` est renseigné. */
export function AbonnementForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<Etat>("idle");
  const [message, setMessage] = useState("");
  const googleBoutonRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  async function envoyer(payload: { email?: string; credential?: string }) {
    setEtat("envoi");
    try {
      const res = await fetch("/api/abonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Une erreur est survenue.");
      setEtat("succes");
      setMessage(data.message ?? "Merci pour votre inscription.");
    } catch (err) {
      setEtat("erreur");
      setMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  useEffect(() => {
    if (!clientId || !googleBoutonRef.current) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      if (!window.google || !googleBoutonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => envoyer({ credential: response.credential }),
      });
      window.google.accounts.id.renderButton(googleBoutonRef.current, {
        theme: variant === "dark" ? "filled_black" : "outline",
        size: "large",
        text: "signup_with",
        shape: "pill",
      });
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, variant]);

  if (etat === "succes") {
    return (
      <p className={`font-body text-[15px] ${variant === "dark" ? "text-gold" : "text-gold-deep"}`}>
        {message}
      </p>
    );
  }

  const inputCls =
    variant === "dark"
      ? "border-paper/35 bg-transparent text-paper placeholder:text-paper/55"
      : "border-ink/25 bg-transparent text-ink placeholder:text-ink/45";

  return (
    <div className="flex flex-col items-center gap-3.5 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          envoyer({ email });
        }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-start max-w-[420px] sm:max-w-none mx-auto w-full"
      >
        <label htmlFor="nl-email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          id="nl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className={`font-body text-[15px] px-4 py-3.5 border-[1.5px] rounded-sm w-full sm:w-[320px] ${inputCls}`}
        />
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="font-ui font-bold text-[13px] tracking-[0.04em] uppercase px-6 py-3.5 rounded-sm bg-gold text-ink cursor-pointer hover:bg-gold-deep transition-colors disabled:opacity-60"
        >
          {etat === "envoi" ? "Envoi…" : "S'abonner"}
        </button>
      </form>

      {etat === "erreur" ? (
        <p className="font-body text-[13.5px] text-red-400">{message}</p>
      ) : null}

      {clientId ? (
        <>
          <div className={`font-ui text-[11px] uppercase tracking-[0.1em] ${variant === "dark" ? "text-paper/40" : "text-ink/40"}`}>
            ou
          </div>
          <div ref={googleBoutonRef} />
        </>
      ) : null}
    </div>
  );
}
