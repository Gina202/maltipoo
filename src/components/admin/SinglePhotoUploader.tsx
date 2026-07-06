"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SinglePhotoUploader({
  value,
  onChange,
  pathPrefix,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  pathPrefix: string;
  label: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setError(null);
    setIsUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    setIsUploading(false);

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      setError("Upload failed. Please try again.");
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(path);
    onChange(data.publicUrl);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  if (value) {
    return (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
          {label}
        </p>
        <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-(--color-cream)">
          <Image src={value} alt="" fill className="object-cover" sizes="96px" />
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-(--color-ink-soft)">
        {label}
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed text-center transition-colors ${
          isDragging
            ? "border-(--color-rose) bg-(--color-blush)/20"
            : "border-(--color-ink)/15 hover:border-(--color-rose)/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
        />
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-(--color-rose)" />
        ) : (
          <Upload className="h-4 w-4 text-(--color-ink-soft)" />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-(--color-rose-dark)">{error}</p>}
    </div>
  );
}