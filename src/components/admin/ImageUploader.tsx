"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({
  value,
  onChange,
  pathPrefix,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  /** Folder prefix inside the "images" bucket, e.g. "puppies" */
  pathPrefix: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList | File[]) {
    setError(null);
    const supabase = createClient();
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));

    if (fileArray.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      const ext = file.name.split(".").pop();
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("Upload failed:", uploadError);
        setError("One or more images failed to upload. Please try again.");
        continue;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(path);
      uploadedUrls.push(data.publicUrl);
    }

    setIsUploading(false);
    onChange([...value, ...uploadedUrls]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function moveTo(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-(--color-rose) bg-(--color-blush)/20"
            : "border-(--color-ink)/15 hover:border-(--color-rose)/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        {isUploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-(--color-rose)" />
        ) : (
          <Upload className="h-6 w-6 text-(--color-ink-soft)" />
        )}
        <p className="mt-3 text-sm text-(--color-ink-soft)">
          Drag photos here, or click to browse
        </p>
      </div>

      {error && <p className="mt-2 text-xs text-(--color-rose-dark)">{error}</p>}

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-xl bg-(--color-cream)"
            >
              <Image src={url} alt="" fill className="object-cover" sizes="150px" />
              {index === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-(--color-ink)">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveTo(index, -1)}
                    disabled={index === 0}
                    aria-label="Move earlier"
                    className="rounded p-1 text-white disabled:opacity-30"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTo(index, 1)}
                    disabled={index === value.length - 1}
                    aria-label="Move later"
                    className="rounded p-1 text-white disabled:opacity-30"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  aria-label="Remove photo"
                  className="rounded p-1 text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}