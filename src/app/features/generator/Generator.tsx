"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
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
import { CopyButton } from "./CopyButton";
import { GeneratorForm } from "./Form";
import { switchFields } from "@/lib/switch_fields";

export function Generator() {
  return (
    <GeneratorForm>
      {(form) => {
        function copyPassword() {
          navigator.clipboard.writeText(form.getValues().password);
          toast.success("Password copied to clipboard");
        }
        return (
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
                      type="submit"
                      variant="ghost"
                      size="icon"
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
                  <FormDescription>{field.value} characters</FormDescription>
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
        );
      }}
    </GeneratorForm>
  );
}
