
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Scale, Shield, Cookie, FileText, ExternalLink } from "lucide-react";

const LegalTab = () => {
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [functionalConsent, setFunctionalConsent] = useState(true);

  const TermsOfServiceContent = () => (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <section>
          <h3 className="font-semibold text-lg mb-2">1. Acceptation des conditions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            En utilisant Comète, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser notre service.
          </p>
        </section>
        
        <section>
          <h3 className="font-semibold text-lg mb-2">2. Description du service</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Comète est une plateforme éducative interactive dédiée à l'apprentissage de l'histoire et des sciences. Notre mission est de rendre l'apprentissage accessible et engageant.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">3. Utilisation du service</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Vous vous engagez à utiliser Comète de manière responsable et conforme aux lois en vigueur. Toute utilisation abusive est interdite.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">4. Propriété intellectuelle</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tous les contenus de Comète sont protégés par les droits d'auteur. Toute reproduction non autorisée est interdite.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">5. Limitation de responsabilité</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Comète ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du service.
          </p>
        </section>
      </div>
    </ScrollArea>
  );

  const PrivacyPolicyContent = () => (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <section>
          <h3 className="font-semibold text-lg mb-2">1. Collecte des données</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Nous collectons uniquement les données nécessaires au fonctionnement de Comète : nom, email, préférences d'apprentissage et progrès pédagogiques.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">2. Utilisation des données</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Vos données sont utilisées pour personnaliser votre expérience d'apprentissage et améliorer nos services. Nous ne vendons jamais vos données personnelles.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">3. Protection des données</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Nous utilisons des mesures de sécurité avancées pour protéger vos données personnelles conformément au RGPD et aux standards internationaux.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">4. Vos droits</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Vous avez le droit d'accéder, modifier, supprimer vos données ou demander leur portabilité. Contactez-nous pour exercer ces droits.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">5. Transferts internationaux</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Vos données peuvent être transférées vers des serveurs sécurisés dans l'Union Européenne ou dans des pays offrant un niveau de protection adéquat.
          </p>
        </section>
      </div>
    </ScrollArea>
  );

  return (
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Mentions légales et confidentialité
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        {/* Documents légaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">Conditions d'utilisation</span>
                <span className="text-xs text-gray-500">Terms of Service</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conditions d'utilisation / Terms of Service
                </DialogTitle>
              </DialogHeader>
              <TermsOfServiceContent />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span className="font-semibold">Politique de confidentialité</span>
                <span className="text-xs text-gray-500">Privacy Policy</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Politique de confidentialité / Privacy Policy
                </DialogTitle>
              </DialogHeader>
              <PrivacyPolicyContent />
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        {/* Gestion des cookies */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Cookie className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Gestion des cookies et témoins</h3>
            <span className="text-sm text-gray-500">(Cookie Management)</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <Label className="text-base font-semibold">🍪 Cookies essentiels</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nécessaires au fonctionnement du site (Essential cookies)
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <Label className="text-base font-semibold">📊 Cookies analytiques</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Amélioration de l'expérience utilisateur (Analytics cookies)
                </p>
              </div>
              <Switch 
                checked={analyticsConsent} 
                onCheckedChange={setAnalyticsConsent}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <Label className="text-base font-semibold">📢 Cookies marketing</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Publicités personnalisées (Marketing cookies)
                </p>
              </div>
              <Switch 
                checked={marketingConsent} 
                onCheckedChange={setMarketingConsent}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <Label className="text-base font-semibold">⚙️ Cookies fonctionnels</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Préférences et personnalisation (Functional cookies)
                </p>
              </div>
              <Switch 
                checked={functionalConsent} 
                onCheckedChange={setFunctionalConsent}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact et support international */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            🌍 Support international
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
            Pour toute question concernant vos données ou nos politiques, contactez-nous :
          </p>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <p>📧 Email: privacy@comete.app</p>
            <p>🇫🇷 France: +33 1 23 45 67 89</p>
            <p>🇺🇸 International: +1 555 0123</p>
            <p>🇪🇺 GDPR: gdpr@comete.app</p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" className="border-purple-500 text-purple-700 hover:bg-purple-50">
            <ExternalLink className="w-4 h-4 mr-2" />
            Télécharger mes données
          </Button>
          <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50">
            <Scale className="w-4 h-4 mr-2" />
            Exercer mes droits RGPD
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalTab;
