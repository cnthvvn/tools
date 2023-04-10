import type { Tool as ToolModel } from "@prisma/client";
import { CategoryType } from "@prisma/client";
import { z } from "zod";

import { implement } from "~/utils/zod";

export type Tool = ToolModel & { isFavorite?: boolean };

export const ToolCreateSchema = implement<
  Omit<Tool, "createdAt" | "id" | "updatedAt">
>().with({
  title: z.string().trim().min(1, "Un titre est requis"),
  image: z.string().url("Une image est requise"),
  description: z.string().trim().min(1, "Une description est requise"),
  url: z.string().trim().min(1, "Une url est requise"),
  category: z.nativeEnum(CategoryType, {
    errorMap: () => ({ message: "Sélectionne une catégorie" }),
  }),
  isFavorite: z.boolean().optional(),
});

export type ToolCreatePayload = z.infer<typeof ToolCreateSchema>;
