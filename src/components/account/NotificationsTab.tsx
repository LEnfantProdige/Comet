
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

interface NotificationsTabProps {
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
  pushNotifications: boolean;
  setPushNotifications: (enabled: boolean) => void;
}

const NotificationsTab = ({ 
  emailNotifications, setEmailNotifications, 
  pushNotifications, setPushNotifications 
}: NotificationsTabProps) => {
  return (
    <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Préférences de notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <Label className="text-base font-semibold">📧 Notifications par email</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir les nouveautés par email</p>
          </div>
          <Switch 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <Label className="text-base font-semibold">🔔 Notifications push</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Notifications en temps réel</p>
          </div>
          <Switch 
            checked={pushNotifications} 
            onCheckedChange={setPushNotifications}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
