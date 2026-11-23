import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

const MAX_BYTES = 4_200_000;

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Stockage photo non configuré (BLOB_READ_WRITE_TOKEN)." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Fichier invalide." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Aucune image." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Le fichier doit être une image." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image trop lourde (max ~4 Mo après compression)." },
      { status: 413 },
    );
  }

  try {
    const blob = await put(`suggestions/${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("POST /api/suggestions/image failed:", error);
    return NextResponse.json(
      { error: "Impossible d’enregistrer la photo." },
      { status: 500 },
    );
  }
}
