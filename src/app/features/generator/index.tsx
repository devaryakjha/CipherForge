"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import styles from "./generator.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import useRunOnce from "@/app/shared/hooks/use_run_once";

const FormSchema = z.object({
  password: z.string().min(4).max(64),
  letters: z.boolean().default(true),
  numbers: z.boolean().default(true),
  punctuation: z.boolean().default(true),
  length: z.number().default(20),
  mixedCase: z.boolean().default(true),
});

const generatePassword = (data: z.infer<typeof FormSchema>) => {
  const { letters, numbers, punctuation, length, mixedCase } = data;
  const charset = [
    { enabled: letters && !mixedCase, chars: "abcdefghijklmnopqrstuvwxyz" },
    {
      enabled: letters && mixedCase,
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    },
    { enabled: numbers, chars: "0123456789" },
    { enabled: punctuation, chars: "!@#$%^&*()-_=+[]{}|;:,.<>?/" },
  ]
    .filter((item) => item.enabled)
    .map((item) => item.chars)
    .join("");

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};

const PasswordGenerator = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <main className={styles.main}>
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
                <FormField
                  control={form.control}
                  name="letters"
                  key="letters"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Letters</FormLabel>
                        <FormDescription>
                          Include letters (only lowercase)
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Include letters"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mixedCase"
                  key="mixedCase"
                  disabled={!form.watch("letters")}
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        "flex flex-row items-center justify-between",
                        {
                          "opacity-50": field.disabled,
                        },
                      )}
                      aria-disabled={field.disabled}
                    >
                      <div className="space-y-0.5">
                        <FormLabel>Mixed case</FormLabel>
                        <FormDescription>
                          Include both lowercase and uppercase letters
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={field.disabled}
                          aria-label="Include mixed case"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numbers"
                  key="numbers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Numbers</FormLabel>
                        <FormDescription>Include numbers</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Include numbers"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="punctuation"
                  key="punctuation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Punctuation</FormLabel>
                        <FormDescription>
                          Include punctuation characters
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Include punctuation characters"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default PasswordGenerator;

const CopyButton = ({ copyPassword }: { copyPassword: VoidFunction }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        copyPassword();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      type="button"
      aria-label="Copy password to clipboard"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
};
