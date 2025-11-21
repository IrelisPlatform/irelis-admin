import { Suspense } from "react";
import ClientPage from "./page.client";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ClientPage />
    </Suspense>
  );
}