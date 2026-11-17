import Image from "next/image";

type BrandLogoProps = {
  /** Hauteur affichée ; la largeur suit le ratio du wordmark. */
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

/**
 * Wordmark script Félicità (comme sur la couverture imprimée).
 * Pas de crop circulaire : le logo est large et calligraphique.
 */
export function BrandLogo({
  height = 44,
  className = "",
  alt = "La Félicità",
  priority = false,
}: BrandLogoProps) {
  const width = Math.round(height * (622 / 456));
  return (
    <Image
      src="/felicita-logo.jpg"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain [print-color-adjust:exact] [-webkit-print-color-adjust:exact] ${className}`}
    />
  );
}
