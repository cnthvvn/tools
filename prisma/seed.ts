import fs from "node:fs";

import type { Tool } from "@prisma/client";
import { PrismaClient, CategoryType } from "@prisma/client";
import { parse } from "csv-parse";
import { z } from "zod";

const prisma = new PrismaClient();

async function seed() {
  const CSVSchema = z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    url: z.string(),
    category: z.nativeEnum(CategoryType),
    createdAt: z.preprocess((v) => {
      if (!v || !(typeof v === "string")) return new Date();
      return new Date(v);
    }, z.date()),
    updatedAt: z.preprocess((v) => {
      if (!v || !(typeof v === "string")) return new Date();
      return new Date(v);
    }, z.date()),
  });

  const tools = await new Promise<Tool[]>(async (resolve) => {
    const tools: Tool[] = [];

    const records = fs.createReadStream(`${__dirname}/tools.csv`).pipe(
      parse({
        columns: true,
        delimiter: ",",
        from: 1, // skip csv header,
        autoParse: true,
      })
    );

    for await (const record of records) {
      // Work with each record
      tools.push(CSVSchema.parse(record));
    }

    return resolve(tools);
  });

  await prisma.tool.createMany({ data: tools });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
