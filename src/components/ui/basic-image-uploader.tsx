"use client";

import { CircleUserRoundIcon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { getFileName } from "@/lib/file";

type BasicImageUploaderProps = {
  accept?: string;
  maxSize?: number;
  onFileChange?: (file: File | null) => void;
  defaultPreview?: string;
  value?: string | File | null;
  uploadButtonLabel?: string;
  changeButtonLabel?: string;
  removeButtonLabel?: string;
  className?: string;
};

export function BasicImageUploader(props: BasicImageUploaderProps) {
  const {
    accept = "image/*",
    maxSize = 2 * 1024 * 1024, // 2MB par défaut
    onFileChange,
    defaultPreview,
    value,
    uploadButtonLabel = "Ajouter un logo",
    changeButtonLabel = "Changer le logo",
    removeButtonLabel = "Supprimer",
    className,
  } = props;

  // Store the latest callback in a ref to avoid triggering useEffect on every render
  const onFileChangeRef = useRef(onFileChange);
  useEffect(() => {
    onFileChangeRef.current = onFileChange;
  }, [onFileChange]);

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept,
      maxSize,
    });

  // Use useEffect to call onFileChange asynchronously to avoid
  // "Cannot update a component while rendering a different component" error
  useEffect(() => {
    const file = files[0]?.file;
    if (file instanceof File) {
      onFileChangeRef.current?.(file);
    }
  }, [files]);

  // Derived state for display
  const effectiveFile = files[0];

  const previewUrl = useMemo(() => {
    if (effectiveFile?.preview) return effectiveFile.preview;
    if (typeof value === "string") return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return defaultPreview || null;
  }, [effectiveFile, value, defaultPreview]);

  const fileName = useMemo(() => {
    if (effectiveFile?.file.name) return effectiveFile.file.name;
    if (value instanceof File) return value.name;
    if (typeof value === "string") {
      // Try to get filename from URL or return a default
      try {
        /*   return getFileName(value) || "Fichier"; */
        const url = new URL(value);
        const name = url.pathname.split("/").pop();
        return name || "Image actuelle";
      } catch {
        return "Image actuelle";
      }
    }
    return null;
  }, [effectiveFile, value]);

  // Cleanup object URLs if we created them for `value`
  useEffect(() => {
    return () => {
      if (value instanceof File) {
      }
    };
  }, [value]);

  // Cleanup internal preview URLs on unmount is handled by useFileUpload or manual effect loop:
  useEffect(() => {
    return () => {
      // Cleanup preview URLs on unmount
      files.forEach((file) => {
        if (
          file.preview &&
          file.file instanceof File &&
          file.file.type.startsWith("image/")
        ) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const handleRemove = () => {
    if (files.length > 0) {
      removeFile(files[0].id);
    }
    onFileChange?.(null);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 align-top">
          <div
            aria-label={previewUrl ? "Upload preview" : "Default image"}
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
          >
            {previewUrl ? (
              <img
                alt="Upload preview"
                className="size-full object-cover"
                height={32}
                src={previewUrl}
                width={32}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRoundIcon className="opacity-60" size={16} />
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <Button
              aria-haspopup="dialog"
              onClick={openFileDialog}
              type="button"
            >
              {fileName ? changeButtonLabel : uploadButtonLabel}
            </Button>
            <input
              {...getInputProps()}
              aria-label="Upload image file"
              className="sr-only"
              tabIndex={-1}
            />
          </div>
        </div>
        {(fileName || previewUrl) && (
          <div className="inline-flex gap-2 text-xs">
            <p
              aria-live="polite"
              className="truncate text-muted-foreground max-w-[200px]"
            >
              {fileName || "Image"}
            </p>
            <button
              aria-label={`${removeButtonLabel} ${fileName}`}
              className="font-medium text-destructive hover:underline"
              onClick={handleRemove}
              type="button"
            >
              {removeButtonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
