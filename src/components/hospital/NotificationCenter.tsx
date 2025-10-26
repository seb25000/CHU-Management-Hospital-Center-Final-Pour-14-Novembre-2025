import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bell, X, Clock, AlertCircle, Calendar, FileText } from "lucide-react";

interface Notification {
  id: string;
  type: 'appointment' | 'result' | 'alert' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Rendez-vous confirmé',
    message: 'Votre rendez-vous avec Dr. Dubois le 15/10 à 14h30 est confirmé',
    time: '2h',
    read: false,
    priority: 'medium'
  },
  {
    id: '2',
    type: 'result',
    title: 'Résultats d\'analyse disponibles',
    message: 'Vos résultats de prise de sang sont maintenant disponibles',
    time: '1j',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Rappel de vaccination',
    message: 'N\'oubliez pas votre rappel de vaccination prévu ce mois-ci',
    time: '3j',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'alert',
    title: 'Modification d\'horaire',
    message: 'Votre rendez-vous du 20/10 a été reporté à 16h00',
    time: '5j',
    read: false,
    priority: 'high'
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function NotificationCenter({ isOpen, onClose, onNavigate }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return Calendar;
      case 'result':
        return FileText;
      case 'alert':
        return AlertCircle;
      case 'reminder':
        return Clock;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return 'text-blue-600';
      case 'result':
        return 'text-green-600';
      case 'alert':
        return 'text-red-600';
      case 'reminder':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className="absolute right-4 top-20 w-96 max-h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <Icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              Il y a {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                              {notification.priority === 'high' ? 'Priorité haute' : 
                               notification.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                            </Badge>
                            <div className="flex space-x-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Marquer comme lu
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-6 px-2 text-red-600 hover:text-red-700"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
              }}
            >
              Tout marquer comme lu
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => {
                onNavigate('patients');
                onClose();
              }}
            >
              Voir tout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}