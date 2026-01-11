"use client";

import { CircleUserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

type BasicImageUploaderProps = {
  accept?: string;
  maxSize?: number;
  onFileChange?: (file: File | null) => void;
  defaultPreview?: string;
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
    uploadButtonLabel = "Ajouter un logo",
    changeButtonLabel = "Changer le logo",
    removeButtonLabel = "Supprimer",
    className,
  } = props;

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept,
      maxSize,
      onFilesChange: (newFiles) => {
        const file = newFiles[0]?.file;
        if (file instanceof File) {
          onFileChange?.(file);
        } else if (newFiles.length === 0) {
          onFileChange?.(null);
        }
      },
    });

  const previewUrl = files[0]?.preview || defaultPreview || null;
  const fileName = files[0]?.file.name || null;
  const [name, setFileName] = useState(files[0]?.file.name || null);

  useEffect(() => {
    if (files[0]?.file.name) {
      setFileName(files[0].file.name);
    } else if (!files[0] && defaultPreview) {
      // Si on a un defaultPreview mais pas de file, on garde le nom précédent
      // Le nom sera réinitialisé si on supprime le fichier
    } else if (!files[0]) {
      setFileName(null);
    }
  }, [files, defaultPreview]);

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
            <Button aria-haspopup="dialog" onClick={openFileDialog}>
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
            <p aria-live="polite" className="truncate text-muted-foreground">
              {fileName || name}
            </p>
            <button
              aria-label={`${removeButtonLabel} ${fileName}`}
              className="font-medium text-destructive hover:underline"
              onClick={() => {
                removeFile(files[0]?.id);
                onFileChange?.(null);
              }}
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
