/*
  Warnings:

  - You are about to drop the column `store_id` on the `stores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_store_id_fkey";

-- DropIndex
DROP INDEX "stores_store_id_key";

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "store_id";

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
