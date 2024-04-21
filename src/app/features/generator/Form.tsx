"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import useRunOnce from "@/app/shared/hooks/use_run_once";
import FormSchema, { type FormSchemaPayload } from "@/lib/schema";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

interface GeneratorFormProps {
  children: (
    form: UseFormReturn<
      {
        length: number;
        password: string;
        letters: boolean;
        mixedCase: boolean;
        numbers: boolean;
        punctuation: boolean;
      },
      any,
      undefined
    >
  ) => React.ReactNode;
}

const GeneratorForm = (props: GeneratorFormProps) => {
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
    const newPassword = await import("@/lib/generate-password").then((mod) =>
      mod.default(data)
    );
    form.setValue("password", newPassword);
  }

  useRunOnce(() => {
    onSubmit(form.getValues());
  });

  return (
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => onSubmit(form.getValues())}
        >
          {props.children(form)}
        </form>
      </Form>
    </CardContent>
  );
};

export { GeneratorForm };
