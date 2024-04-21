"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import useRunOnce from "@/app/shared/hooks/use_run_once";
import Header from "@/app/shared/components/header";
import FormSchema, { type FormSchemaPayload } from "@/lib/schema";
import { switchFields } from "@/lib/switch_fields";
import { CopyButton } from "./CopyButton";
import generatePassword from "@/lib/generate-password";

const PasswordGenerator = () => {
  const form = useForm<FormSchemaPayload>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      letters: true,
      numbers: true,
      punctuation: true,
      length: 20,
      mixedCase: true,
    },
  });

  async function onSubmit(data: FormSchemaPayload) {
    const newPassword = generatePassword(data);
    form.setValue("password", newPassword);
  }

  function copyPassword() {
    navigator.clipboard.writeText(form.getValues().password);
    toast.success("Password copied to clipboard");
  }

  useRunOnce(() => {
    onSubmit(form.getValues());
  });

  return (
    <main className={"flex flex-col items-center justify-center h-svh"}>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Generate a password</CardTitle>
          <CardDescription>
            Generate a new password with the following options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={() => onSubmit(form.getValues())}
            >
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  key="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Password
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onSubmit(form.getValues())}
                          aria-label="Generate new password"
                        >
                          <ReloadIcon />
                        </Button>
                      </FormLabel>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <FormControl>
                          <Input {...field} placeholder="Password" readOnly />
                        </FormControl>
                        <CopyButton copyPassword={copyPassword} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="length"
                  key="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={64}
                          min={4}
                          step={1}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                          }}
                          aria-label="Password length"
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value} characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {switchFields.map((data) => (
                  <FormField
                    control={form.control}
                    name={data.name}
                    key={data.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>{data.label}</FormLabel>
                          <FormDescription>{data.description}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label={data["aria-label"]}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default PasswordGenerator;
