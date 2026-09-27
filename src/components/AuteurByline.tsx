import Image from "next/image";
import type { ArticleImage } from "@/lib/types";

/** Encart auteur·e affiché en fin d'article : photo, nom et qualité. */
export function AuteurByline({ nom, role, photo }: { nom: string; role?: string; photo?: ArticleImage }) {
  const initiales = nom
    .split(" ")
    .map((mot) => mot[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 py-6 border-t border-b border-rule">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden bg-paper-alt">
        {photo?.url ? (
          <Image src={photo.url} alt={nom} fill sizes="64px" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-ui font-bold text-[15px] text-gold-deep">
            {initiales}
          </div>
        )}
      </div>
      <div>
        <div className="font-ui font-bold text-[10px] tracking-[0.12em] uppercase text-taupe mb-0.5">
          Écrit par
        </div>
        <div className="font-display font-semibold text-[17px] text-ink">{nom}</div>
        {role ? <div className="font-ui text-[13px] text-ink/60">{role}</div> : null}
      </div>
    </div>
  );
}
