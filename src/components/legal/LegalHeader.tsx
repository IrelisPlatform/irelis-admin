// src/components/legal/LegalHeader.tsx
import Image from "next/image";

export function LegalHeader() {
  return (
    <header className="w-full flex flex-col items-center pt-8 pb-6">
      <Image
        src="/icons/logo.png"
        alt="Irelis"
        width={150}
        height={50}
        priority
        className="h-auto"
      />
    </header>
  );
}