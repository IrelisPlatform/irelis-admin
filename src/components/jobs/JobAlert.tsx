import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

export function JobAlert() {
  return (
    <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#2563eb] rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
      <div className="relative flex items-start gap-6">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bell className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-white mb-3">Recevez les offres qui vous correspondent</h3>
          <p className="text-blue-100 mb-6 text-sm leading-relaxed">
            Créez votre alerte emploi et soyez informé en temps réel des nouvelles opportunités correspondant à votre profil
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Votre adresse email"
              className="flex-1 bg-white border-0 text-gray-900 h-12 px-5 shadow-lg"
            />
            <Button className="bg-white text-[#1e3a8a] hover:bg-blue-50 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200">
              Créer mon alerte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
