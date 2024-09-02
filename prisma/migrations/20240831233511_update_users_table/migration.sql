-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "type" SET DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;
