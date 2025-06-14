
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const PrivacyTab = () => {
  return (
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Confidentialité et sécurité
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">🔐 Sécurité du compte</h3>
          <p className="text-sm text-green-700 dark:text-green-400 mb-4">
            Votre compte est sécurisé et vos données sont protégées.
          </p>
          <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50">
            Changer le mot de passe
          </Button>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📊 Données personnelles</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
            Gérez vos données et votre historique d'apprentissage.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-500 text-blue-700 hover:bg-blue-50">
              Exporter mes données
            </Button>
            <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50">
              Supprimer mon compte
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
