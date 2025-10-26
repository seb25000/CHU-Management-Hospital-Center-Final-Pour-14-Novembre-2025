import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Alert, AlertDescription } from "../components/ui/alert";
import { User, Mail, Phone, Eye, EyeOff, ArrowLeft, Shield, Heart } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setAlert({type: 'error', message: 'Veuillez remplir tous les champs'});
      return;
    }

    // Simulation de connexion
    setAlert({type: 'success', message: 'Connexion réussie ! Redirection en cours...'});
    
    setTimeout(() => {
      onNavigate('patients');
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      setAlert({type: 'error', message: 'Veuillez remplir tous les champs obligatoires'});
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setAlert({type: 'error', message: 'Les mots de passe ne correspondent pas'});
      return;
    }

    if (registerData.password.length < 6) {
      setAlert({type: 'error', message: 'Le mot de passe doit contenir au moins 6 caractères'});
      return;
    }

    // Simulation d'inscription
    setAlert({type: 'success', message: 'Inscription réussie ! Redirection en cours...'});
    
    setTimeout(() => {
      onNavigate('patients');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Retour */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        {/* En-tête */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">+</span>
            </div>
          </div>
          <h2 className="text-3xl text-gray-900">
            Espace Patient
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre dossier médical et gérez vos rendez-vous
          </p>
        </div>

        {alert && (
          <Alert className={alert.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <AlertDescription className={alert.type === 'error' ? 'text-red-800' : 'text-green-800'}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Connexion Patient
                </CardTitle>
                <CardDescription>
                  Connectez-vous pour accéder à votre espace patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        className="pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="link" className="px-0 text-sm text-blue-600">
                      Mot de passe oublié ?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  Créer un compte
                </CardTitle>
                <CardDescription>
                  Inscrivez-vous pour accéder à nos services en ligne
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        placeholder="Prénom"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        placeholder="Nom"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Adresse e-mail *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="votre@email.com"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="pl-10"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Mot de passe *</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="Au moins 6 caractères"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Répétez votre mot de passe"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Créer mon compte
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Informations de sécurité */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-sm text-gray-900">Sécurité et confidentialité</h3>
          </div>
          <p className="text-xs text-gray-600">
            Vos données médicales sont protégées selon les normes RGPD et hébergées en France. 
            Accès sécurisé par authentification forte.
          </p>
        </div>

        {/* Assistance */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ?{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-600"
              onClick={() => onNavigate('contact')}
            >
              Contactez notre support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}