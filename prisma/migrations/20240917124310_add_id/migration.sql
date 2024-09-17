/*
  Warnings:

  - Added the required column `varient_id` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" ADD COLUMN     "varient_id" INTEGER NOT NULL;
