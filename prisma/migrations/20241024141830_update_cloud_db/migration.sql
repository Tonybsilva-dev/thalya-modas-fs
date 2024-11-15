/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_contact_id_fkey";

-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "emailContact" TEXT,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
