import { z } from "zod";

import { AppError } from "./error";

type Implements<Model> = {
  [key in keyof Model]-?: undefined extends Model[key]
    ? null extends Model[key]
      ? z.ZodNullableType<z.ZodOptionalType<z.ZodType<Model[key]>>>
      : z.ZodOptionalType<z.ZodType<Model[key]>>
    : null extends Model[key]
    ? z.ZodNullableType<z.ZodType<Model[key]>>
    : z.ZodType<Model[key]>;
};

export function implement<Model = never>() {
  return {
    with: <
      Schema extends Implements<Model> & {
        [unknownKey in Exclude<keyof Schema, keyof Model>]: never;
      }
    >(
      schema: Schema
    ) => z.object(schema),
  };
}

export function nullOr<T extends z.ZodSchema>(schema: T) {
  return schema.or(z.any().transform(() => null)) as z.ZodType<
    z.infer<T | z.ZodNull>
  >;
}

function sanitizeSensitiveData(data: unknown) {
  if (!data || typeof data !== "object") return data;

  let sanitizedData = data;
  if ("password" in data) {
    sanitizedData = { ...sanitizedData, password: "🤫" };
  }

  if ("confirmPassword" in data) {
    sanitizedData = { ...sanitizedData, confirmPassword: "🤫" };
  }

  return sanitizedData;
}

export async function parseData<T extends z.ZodTypeAny>(
  data: unknown,
  schema: T,
  message: string
) {
  const result = await schema.safeParseAsync(data);

  if (!result.success) {
    const issues = result.error.issues;

    throw new AppError({
      message,
      status: 400,
      metadata: { issues, data: sanitizeSensitiveData(data) },
      tag: "Payload validation 👾",
    });
  }

  return result.data as z.infer<T>;
}
