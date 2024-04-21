import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "@/app/shared/components/header";
import { Generator } from "./Generator";

const PasswordGenerator = () => {
  return (
    <main className="flex flex-col items-center justify-center h-svh">
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Generate a password</CardTitle>
          <CardDescription>
            Generate a new password with the following options
          </CardDescription>
        </CardHeader>
        <Generator />
      </Card>
    </main>
  );
};

export default PasswordGenerator;
