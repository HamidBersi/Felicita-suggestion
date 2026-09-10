import { NextResponse } from "next/server";
import QRCode from "qrcode";

/**
 * QR code pointant vers l'URL publique du menu.
 * Query optionnelle : ?url=https://...
 * Par défaut : origine de la requête + /menu
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customUrl = searchParams.get("url")?.trim();

  const requestUrl = new URL(request.url);
  const menuUrl = customUrl || `${requestUrl.origin}/menu`;

  try {
    const png = await QRCode.toBuffer(menuUrl, {
      type: "png",
      width: 512,
      margin: 2,
      color: {
        dark: "#1E3A2F",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
        "X-Menu-Url": menuUrl,
      },
    });
  } catch (error) {
    console.error("QR generation failed:", error);
    return NextResponse.json(
      { error: "Impossible de générer le QR code." },
      { status: 500 },
    );
  }
}
