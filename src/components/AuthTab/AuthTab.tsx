import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface AuthTabProps {
  form: React.ReactNode;
  title: string;
  description: string;
}

const AuthTab: React.FC<AuthTabProps> = ({ form, title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{form}</CardContent>
    </Card>
  );
};

export default AuthTab;
