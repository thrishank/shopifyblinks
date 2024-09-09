/*
  Warnings:

  - You are about to drop the column `metadata` on the `Blink` table. All the data in the column will be lost.
  - Added the required column `price` to the `Blink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tilte` to the `Blink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blink" DROP COLUMN "metadata",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "tilte" TEXT NOT NULL;
