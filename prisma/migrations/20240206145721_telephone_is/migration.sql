-- DropIndex
DROP INDEX "User_telephone_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telephone" DROP NOT NULL;
