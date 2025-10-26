import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertCircle, MapPin, Phone, Clock, Car, X } from "lucide-react";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl border border-gray-200 overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-xl text-gray-900">Accès aux Urgences</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Adresse et accès */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Localisation Service d'Urgences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-700">
                    <strong>CHU Management Center - Service d'Urgences</strong><br />
                    123 Avenue de la Santé<br />
                    75015 Paris, France
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open('https://maps.google.com?q=123+Avenue+de+la+Santé,+75015+Paris,+France', '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Ouvrir dans Maps
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://www.google.com/maps/dir//123+Avenue+de+la+Santé,+75015+Paris,+France', '_blank')}
                  >
                    Itinéraire
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Parking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    🅿️ <strong>Parking Urgences :</strong> Gratuit pendant 2h
                  </p>
                  <p className="text-sm text-gray-700">
                    📍 <strong>Accès :</strong> Entrée principale, fléchage rouge
                  </p>
                  <p className="text-sm text-gray-700">
                    🚪 <strong>Entrée :</strong> Ouverte 24h/24
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horaires & Attente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    🕐 <strong>Ouverture :</strong> 24h/24 - 7j/7
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Urgences vitales</span>
                      <Badge className="bg-red-600">Immédiat</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Urgences importantes</span>
                      <Badge className="bg-orange-600">15 min</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Urgences moins graves</span>
                      <Badge className="bg-yellow-600">45 min</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transports en commun */}
          <Card>
            <CardHeader>
              <CardTitle>Transports en commun</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>🚇 Métro</strong>
                  <p className="text-gray-600">
                    Ligne 8 : Commerce (5 min à pied)<br />
                    Ligne 12 : Vaugirard (7 min à pied)
                  </p>
                </div>
                <div>
                  <strong>🚌 Bus</strong>
                  <p className="text-gray-600">
                    Lignes 39, 70, 89<br />
                    Arrêt "Hôpital Necker"
                  </p>
                </div>
                <div>
                  <strong>🚊 Tramway</strong>
                  <p className="text-gray-600">
                    T3a : Balard (10 min à pied)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions d'urgence */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">En cas d'urgence vitale</CardTitle>
              <CardDescription className="text-red-700">
                Ne vous déplacez pas, appelez immédiatement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => window.open('tel:15', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler le 15 (SAMU)
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => window.open('tel:112', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler le 112 (UE)
                </Button>
                <Button 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-100"
                  onClick={() => window.open('tel:0123456789', '_self')}
                >
                  Standard Urgences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Cette fenêtre se fermera automatiquement. Vous pouvez également cliquer en dehors pour la fermer.
            </p>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}