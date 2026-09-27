import Image from "next/image";
import { PlaceholderMedia } from "./PlaceholderMedia";
import type { ArticleImage as ArticleImageData } from "@/lib/types";

interface ArticleImageProps {
  image?: ArticleImageData;
  /** Légende affichée quand l'article n'a pas encore de photo (mode placeholder). */
  fallbackLegende?: string;
  className?: string;
  dark?: boolean;
  sizes?: string;
  /** "cover" (par défaut) remplit le cadre en rognant ; "contain" montre la
   * photo entière, avec un fond derrière — à utiliser pour la grande photo
   * d'un article, où une image portrait ne doit pas être coupée. */
  fit?: "cover" | "contain";
}

/**
 * Photo réelle d'un article (uploadée dans le Studio) quand elle existe,
 * sinon le rectangle « Illustration » qui tient sa place. `className` doit
 * fixer largeur et hauteur (ex. "w-full h-[220px]") : l'image la remplit en
 * `object-cover`, exactement comme le placeholder qu'elle remplace.
 */
export function ArticleImage({
  image,
  fallbackLegende,
  className,
  dark = false,
  sizes = "100vw",
  fit = "cover",
}: ArticleImageProps) {
  if (image?.url) {
    return (
      <div className={`relative overflow-hidden ${fit === "contain" ? "bg-ink-3" : ""} ${className ?? ""}`}>
        <Image
          src={image.url}
          alt={image.legende || fallbackLegende || ""}
          fill
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    );
  }
  return <PlaceholderMedia legende={image?.legende ?? fallbackLegende} className={className} dark={dark} />;
}
