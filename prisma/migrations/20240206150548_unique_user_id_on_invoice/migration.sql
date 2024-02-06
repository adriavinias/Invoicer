/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_vatnif_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "vatnif" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "postal_code" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_userId_key" ON "Invoice"("userId");
