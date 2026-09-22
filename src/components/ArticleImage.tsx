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
}

/**
 * Photo réelle d'un article (uploadée dans le Studio) quand elle existe,
 * sinon le rectangle « Illustration » qui tient sa place. `className` doit
 * fixer largeur et hauteur (ex. "w-full h-[220px]") : l'image la remplit en
 * `object-cover`, exactement comme le placeholder qu'elle remplace.
 */
export function ArticleImage({ image, fallbackLegende, className, dark = false, sizes = "100vw" }: ArticleImageProps) {
  if (image?.url) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={image.url}
          alt={image.legende || fallbackLegende || ""}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }
  return <PlaceholderMedia legende={image?.legende ?? fallbackLegende} className={className} dark={dark} />;
}
