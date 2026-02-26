/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,folderId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_userId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "File_userId_name_folderId_key" ON "File"("userId", "name", "folderId");
