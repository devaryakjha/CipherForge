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
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import useRunOnce from "@/app/shared/hooks/use_run_once";
import Header from "@/app/shared/components/header";
import { switchFields } from "@/lib/switch_fields";
import { CopyButton } from "./CopyButton";
import { useReducer } from "react";
import type { FormSchemaPayload } from "@/lib/schema";
import generatePassword from "@/lib/generate-password";

const initialState: FormSchemaPayload = {
  password: "",
  letters: true,
  numbers: true,
  punctuation: true,
  length: 20,
  mixedCase: true,
};

type Action =
  | {
      type: "letters" | "numbers" | "punctuation" | "mixedCase";
      payload: {
        data: boolean;
      };
    }
  | {
      type: "length";
      payload: {
        data: number;
      };
    }
  | {
      type: "submit";
      payload: {
        data: string;
      };
    };

const reducer = (state: FormSchemaPayload, action: Action) => {
  switch (action.type) {
    case "letters":
      return { ...state, letters: action.payload.data };
    case "numbers":
      return { ...state, numbers: action.payload.data };
    case "punctuation":
      return { ...state, punctuation: action.payload.data };
    case "length":
      return { ...state, length: action.payload.data };
    case "mixedCase":
      return { ...state, mixedCase: action.payload.data };
    case "submit":
      return { ...state, password: action.payload.data };
    default:
      return state;
  }
};

const PasswordGenerator = () => {
  const [form, dispatch] = useReducer(reducer, initialState);

  async function onSubmit() {
    const newPassword = generatePassword(form);
    dispatch({
      type: "submit",
      payload: { data: newPassword },
    });
  }

  function copyPassword() {
    navigator.clipboard.writeText(form.password);
    toast.success("Password copied to clipboard");
  }

  useRunOnce(() => {
    onSubmit();
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            onChange={onSubmit}
          >
            <div className="grid w-full items-center gap-4">
              <FormItem>
                <FormLabel
                  className="flex items-center gap-2"
                  htmlFor="password"
                >
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
                  <Input
                    type="text"
                    value={form.password}
                    id="password"
                    placeholder="Password"
                    readOnly
                  />
                  <CopyButton copyPassword={copyPassword} />
                </div>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="length">Length</FormLabel>
                <Slider
                  id="length"
                  value={[form.length]}
                  max={64}
                  min={4}
                  step={1}
                  onValueChange={(value) => {
                    dispatch({
                      type: "length",
                      payload: { data: value[0] },
                    });
                  }}
                  aria-label="Password length"
                />
                <FormDescription>{form.length} characters</FormDescription>
                <FormMessage />
              </FormItem>
              {switchFields.map((data) => (
                <FormItem
                  key={data.name}
                  className="flex flex-row items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <FormLabel htmlFor={data.name}>{data.label}</FormLabel>
                    <FormDescription>{data.description}</FormDescription>
                  </div>
                  <Switch
                    id={data.name}
                    checked={form[data.name]}
                    onCheckedChange={(value) => {
                      dispatch({
                        type: data.name,
                        payload: { data: value },
                      });
                    }}
                    aria-label={data["aria-label"]}
                  />
                </FormItem>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default PasswordGenerator;
