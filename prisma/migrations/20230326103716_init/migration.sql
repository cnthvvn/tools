-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('development', 'design', 'business', 'marketing');

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" "CategoryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoritesTools" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,

    CONSTRAINT "FavoritesTools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoritesTools_toolId_key" ON "FavoritesTools"("toolId");

-- AddForeignKey
ALTER TABLE "FavoritesTools" ADD CONSTRAINT "FavoritesTools_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
