/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Video" DROP CONSTRAINT "Video_moduleId_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "description" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "videoUrl" TEXT;

-- DropTable
DROP TABLE "public"."Video";
