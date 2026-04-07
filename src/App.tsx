import React from "react";

import { Button } from "@/components/ui/button";
// Ба ҷои @/components/ui/card
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const App = () => {
  return (
    <div className="p-10 space-y-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Shadcn/UI Showcase</h1>

  
      <Alert>
        <AlertTitle>Diqqat!</AlertTitle>
        <AlertDescription>
          In 10 component-i shadcn/ui dar yak sahifa meboshad.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>Malumoti korbarro vorid kuned.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="example@mail.com" />
            </div>

    
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <Badge variant="outline">Active</Badge> {/* 5. Badge */}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button> {/* 6. Button */}
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 7. Switch */}
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            {/* 9. Progress */}
            <div className="space-y-2">
              <Label>Storage Usage</Label>
              <Progress value={65} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>


      <div className="flex flex-wrap gap-4 justify-center p-6 border rounded-lg">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
      </div>
    </div>
  );
};

export default App;