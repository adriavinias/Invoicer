/*
  Warnings:

  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
