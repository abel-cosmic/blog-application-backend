-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "NotificationType";
