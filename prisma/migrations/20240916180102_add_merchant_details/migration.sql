/*
  Warnings:

  - Added the required column `accessToken` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_url` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "website_url" TEXT NOT NULL;
