"use client";

import Image from "next/image";

export function AuthHeader() {
  return (
    <header className="w-full flex flex-col items-center pt-12 pb-6">
      <p className="text-lg font-medium text-muted-foreground mb-2">
        Bienvenue sur
      </p>

      <Image
        src="/icons/logo.png"
        alt="Irelis"
        width={150}
        height={50}
        priority
      />
    </header>
  );
}

