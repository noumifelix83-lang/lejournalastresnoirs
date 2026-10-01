// Visuel de partage commun (bandeau de marque + photo), utilisé par
// article/[slug]/opengraph-image.tsx et rubrique/[slug]/opengraph-image.tsx.
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const CRESCENT_PATH = "M60,190 A140,140 0 0 1 340,190 A197.9,197.9 0 0 0 60,190 Z";
const SUN_PATH =
  "M200.0,152.0 L209.8,211.0 L241.3,160.2 L227.8,218.4 L276.4,183.6 L241.6,232.2 L299.8,218.7 L249.0,250.2 L308.0,260.0 L249.0,269.8 L299.8,301.3 L241.6,287.8 L276.4,336.4 L227.8,301.6 L241.3,359.8 L209.8,309.0 L200.0,368.0 L190.2,309.0 L158.7,359.8 L172.2,301.6 L123.6,336.4 L158.4,287.8 L100.2,301.3 L151.0,269.8 L92.0,260.0 L151.0,250.2 L100.2,218.7 L158.4,232.2 L123.6,183.6 L172.2,218.4 L158.7,160.2 L190.2,211.0 Z";

export function brandedOgImage(photoUrl?: string) {
  const headerHeight = photoUrl ? 210 : 630;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: headerHeight,
          background: "#F5F3EF",
        }}
      >
        <svg width={photoUrl ? 46 : 100} height={photoUrl ? 52 : 114} viewBox="0 0 400 400">
          <path d={CRESCENT_PATH} fill="#14100D" />
          <path d={SUN_PATH} fill="#F2A123" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 5,
            color: "#8C6425",
            marginTop: 8,
            textTransform: "uppercase",
          }}
        >
          Le Journal
        </div>
        <div
          style={{
            display: "flex",
            fontSize: photoUrl ? 38 : 72,
            fontWeight: 900,
            color: "#15120F",
            marginTop: 4,
            letterSpacing: -1,
          }}
        >
          ASTRES NOIRS ACTU
        </div>
        {!photoUrl ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22 }}>
            <div style={{ display: "flex", width: 48, height: 3, background: "#B8863B" }} />
            <div
              style={{
                display: "flex",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 4,
                color: "#B8863B",
                textTransform: "uppercase",
              }}
            >
              Qui lira vivra
            </div>
            <div style={{ display: "flex", width: 48, height: 3, background: "#B8863B" }} />
          </div>
        ) : null}
      </div>
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} width={1200} height={420} style={{ objectFit: "cover" }} />
      ) : null}
    </div>
  );
}
