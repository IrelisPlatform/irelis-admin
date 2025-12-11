// src/app/postuler/page.tsx
import { PostulerForm } from '@/components/candidate/PostulerForm';

export default function PostulerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Postuler à cette offre</h1>
          <p className="text-gray-600 mt-2">
            Complétez votre candidature en quelques secondes
          </p>
        </div>
        <PostulerForm />
      </div>
    </div>
  );
}