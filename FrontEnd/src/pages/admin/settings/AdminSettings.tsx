import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "@/components/main-layout";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  const handleIntegrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    // Show success message
  };

  return (
    <MainLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings for the Internship Management System
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card className="">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="general-form"
                  onSubmit={handleGeneralSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">System Name</Label>
                      <Input
                        id="system-name"
                        defaultValue="Internship Management System"
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="institution-name">Institution Name</Label>
                      <Input
                        id="institution-name"
                        defaultValue="University Name"
                        
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        defaultValue="admin@university.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="america-new_york">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-new_york">
                            America/New York (UTC-05:00)
                          </SelectItem>
                          <SelectItem value="america-chicago">
                            America/Chicago (UTC-06:00)
                          </SelectItem>
                          <SelectItem value="america-denver">
                            America/Denver (UTC-07:00)
                          </SelectItem>
                          <SelectItem value="america-los_angeles">
                            America/Los Angeles (UTC-08:00)
                          </SelectItem>
                          <SelectItem value="europe-london">
                            Europe/London (UTC+00:00)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mm-dd-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">
                          Maintenance Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          When enabled, only administrators can access the
                          system
                        </p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="general-form">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="mt-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email notifications and templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="email-form"
                  onSubmit={handleEmailSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input
                        id="smtp-server"
                        defaultValue="smtp.university.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" defaultValue="587" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input
                        id="smtp-username"
                        defaultValue="noreply@university.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        defaultValue="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from-email">From Email</Label>
                      <Input
                        id="from-email"
                        type="email"
                        defaultValue="noreply@university.edu"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from-name">From Name</Label>
                      <Input
                        id="from-name"
                        defaultValue="Internship Management System"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable email notifications for system events
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="email-form">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security settings for the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="security-form"
                  onSubmit={handleSecuritySubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-policy">Password Policy</Label>
                      <Select defaultValue="strong">
                        <SelectTrigger id="password-policy">
                          <SelectValue placeholder="Select password policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">
                            Basic (8+ characters)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium (8+ characters, 1 uppercase, 1 number)
                          </SelectItem>
                          <SelectItem value="strong">
                            Strong (8+ characters, 1 uppercase, 1 number, 1
                            special character)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue="30"
                        min="5"
                        max="120"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-attempts">Max Login Attempts</Label>
                      <Input
                        id="login-attempts"
                        type="number"
                        defaultValue="5"
                        min="3"
                        max="10"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all users
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="force-password-change">
                          Force Password Change
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Force users to change password on first login
                        </p>
                      </div>
                      <Switch id="force-password-change" defaultChecked />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="security-form">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Configure third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="integration-form"
                  onSubmit={handleIntegrationSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="google-api-key">Google API Key</Label>
                      <Input
                        id="google-api-key"
                        placeholder="Enter Google API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="microsoft-api-key">
                        Microsoft API Key
                      </Label>
                      <Input
                        id="microsoft-api-key"
                        placeholder="Enter Microsoft API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="Enter webhook URL" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="google-calendar">
                          Google Calendar Integration
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable Google Calendar integration for events
                        </p>
                      </div>
                      <Switch id="google-calendar" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="microsoft-teams">
                          Microsoft Teams Integration
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable Microsoft Teams integration for notifications
                        </p>
                      </div>
                      <Switch id="microsoft-teams" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="integration-form">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
