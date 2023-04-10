import type { CategoryType, Prisma } from "@prisma/client";

import { db } from "~/db.server";
import { AppError } from "~/utils";

import type { ToolCreatePayload } from "./types";

export async function getTools(category?: CategoryType, searchTerm?: string) {
  try {
    const where: Prisma.ToolWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const tools = await db.tool.findMany({
      where,
      orderBy: { id: "asc" },
    });
    return tools;
  } catch (cause) {
    throw new AppError({
      cause,
      message: `Unable to get tools`,
      status: 404,
      metadata: { category },
    });
  }
}

export async function getToolById(id: string) {
  try {
    const tool = await db.tool.findUniqueOrThrow({
      where: { id },
      include: { favoritesTools: { where: { toolId: id } } },
    });

    return { ...tool, isFavorite: Boolean(tool.favoritesTools.length) };
  } catch (cause) {
    throw new AppError({
      cause,
      message: `Unable to get tool details`,
      status: 404,
      metadata: { id },
    });
  }
}

export async function getFavoritesTool() {
  try {
    const favorites = await db.favoritesTools.findMany({
      include: {
        tool: { select: { id: true, title: true, url: true, category: true } },
      },
    });

    const details = favorites.map((fav) => {
      const { id, title, url, category } = fav.tool;
      return { id, title, url, category };
    });

    return details;
  } catch (cause) {
    throw new AppError({
      cause,
      message: `Unable to get favorite tools`,
      status: 404,
    });
  }
}

export function addToFavorite(toolId: string) {
  try {
    return db.favoritesTools.create({
      data: {
        toolId,
      },
    });
  } catch (cause) {
    throw new AppError({
      cause,
      message: "Failed to create one favorite tool",
      metadata: { toolId },
    });
  }
}

export function removeToFavorite(toolId: string) {
  try {
    return db.favoritesTools.delete({
      where: { toolId },
    });
  } catch (cause) {
    throw new AppError({
      cause,
      message: "Failed to remove one favorite tool",
      metadata: { toolId },
    });
  }
}

export function createTool(payload: ToolCreatePayload) {
  try {
    const newTool = db.tool.create({ data: payload });
    return newTool;
  } catch (cause) {
    throw new AppError({
      cause,
      message: "Failed to create new tool",
      metadata: { ...payload },
    });
  }
}

export function removeTool(id: string) {
  try {
    return db.tool.delete({
      where: { id },
      select: { id: true },
    });
  } catch (cause) {
    throw new AppError({
      cause,
      message: "Failed to delete tool",
      metadata: { id },
    });
  }
}
