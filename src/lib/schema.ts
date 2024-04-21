import { z } from "zod";

const FormSchema = z.object({
  password: z.string().min(4).max(64),
  letters: z.boolean().default(true),
  numbers: z.boolean().default(true),
  punctuation: z.boolean().default(true),
  length: z.number().default(20),
  mixedCase: z.boolean().default(true),
});

export type FormSchemaPayload = z.infer<typeof FormSchema>;

export default FormSchema;
