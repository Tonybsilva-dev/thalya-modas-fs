/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "address_store_id_key" ON "address"("store_id");
