/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_store_id_fkey";

-- DropIndex
DROP INDEX "address_store_id_key";

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "address_id" TEXT,
ADD COLUMN     "store_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stores_store_id_key" ON "stores"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_address_id_key" ON "stores"("address_id");

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
