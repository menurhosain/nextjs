import { BASE_URL } from "@/lib/constant";

export async function upload_file(file: File, jwt: string): Promise<number> {
  const form = new FormData();
  form.append("files", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: form,
  });

  if (!res.ok) throw new Error("File upload failed.");

  const [uploaded] = await res.json();
  return uploaded.id as number;
}

export async function upload_files(files: File[], jwt: string): Promise<number[]> {
  if (files.length === 0) return [];

  const form = new FormData();
  for (const file of files) {
    form.append("files", file);
  }

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: form,
  });

  if (!res.ok) throw new Error("File upload failed.");

  const uploaded = await res.json();
  return (uploaded as { id: number }[]).map((f) => f.id);
}
