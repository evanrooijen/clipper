import { RegisterForm } from "@/components/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
