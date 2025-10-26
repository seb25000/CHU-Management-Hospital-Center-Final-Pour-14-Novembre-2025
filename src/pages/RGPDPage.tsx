import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Shield, Eye, Download, AlertCircle } from "lucide-react";

interface RGPDPageProps {
  onNavigate: (page: string) => void;
}

export function RGPDPage({ onNavigate }: RGPDPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('patients')}
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'espace patient
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl text-gray-900">Politique RGPD</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Protection et traitement de vos données personnelles au CHU Management Center
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Information importante */}
        <div className="mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Information importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Conformément au Règlement Général sur la Protection des Données (RGPD), 
                nous nous engageons à protéger vos données personnelles et à respecter vos droits.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sections de la politique */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Responsable du traitement</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p><strong>CHU Management Center</strong></p>
              <p>123 Avenue de la Santé<br />75015 Paris, France</p>
              <p>Téléphone: 01 23 45 67 89<br />Email: contact@chu-management.fr</p>
              <p>
                <strong>Délégué à la Protection des Données (DPO):</strong><br />
                Email: dpo@chu-management.fr<br />
                Téléphone: 01 23 45 67 90
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Finalités du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Soins médicaux</h4>
                  <p className="text-gray-600 text-sm">
                    Gestion de votre dossier médical, suivi des traitements, coordination des soins
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Gestion administrative</h4>
                  <p className="text-gray-600 text-sm">
                    Prise de rendez-vous, facturation, remboursements, communication
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Amélioration de nos services</h4>
                  <p className="text-gray-600 text-sm">
                    Études statistiques anonymisées, évaluation de la qualité des soins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Mission d'intérêt public:</strong> Exercice de la médecine et des soins de santé
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Intérêt vital:</strong> Protection de la vie et de la santé du patient
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                  <p className="text-sm text-gray-700">
                    <strong>Obligation légale:</strong> Respect des obligations de santé publique
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Vos droits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Droit d'accès</h4>
                    <p className="text-sm text-gray-600">Consulter vos données personnelles</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Droit de rectification</h4>
                    <p className="text-sm text-gray-600">Corriger des données inexactes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Droit à l'effacement</h4>
                    <p className="text-sm text-gray-600">Supprimer vos données (sous conditions)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Droit d'opposition</h4>
                    <p className="text-sm text-gray-600">S'opposer au traitement (sous conditions)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Droit à la limitation</h4>
                    <p className="text-sm text-gray-600">Limiter le traitement de vos données</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Droit à la portabilité</h4>
                    <p className="text-sm text-gray-600">Récupérer vos données</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Conservation des données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Dossier médical</span>
                  <span className="text-sm font-medium text-gray-900">20 ans après dernière consultation</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Données administratives</span>
                  <span className="text-sm font-medium text-gray-900">10 ans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Données de facturation</span>
                  <span className="text-sm font-medium text-gray-900">10 ans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Données de téléconsultation</span>
                  <span className="text-sm font-medium text-gray-900">5 ans</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mesures techniques</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chiffrement des données</li>
                    <li>• Authentification forte</li>
                    <li>• Pare-feu et antivirus</li>
                    <li>• Sauvegardes sécurisées</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mesures organisationnelles</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Accès limité aux données</li>
                    <li>• Formation du personnel</li>
                    <li>• Politique de confidentialité</li>
                    <li>• Audit de sécurité régulier</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-12 space-y-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Exercer vos droits</CardTitle>
              <CardDescription className="text-green-700">
                Vous souhaitez exercer vos droits RGPD ? Contactez notre DPO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('mailto:dpo@chu-management.fr?subject=Exercice de mes droits RGPD', '_self')}
                >
                  Contacter le DPO
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => onNavigate('contact')}
                >
                  Formulaire de contact
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Dernière mise à jour: Octobre 2024 | Version 2.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}