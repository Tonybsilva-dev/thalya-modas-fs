/*
  Warnings:

  - You are about to drop the column `type` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "AccountType" NOT NULL DEFAULT 'CUSTOMER';
