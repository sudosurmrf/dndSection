/*
  Warnings:

  - Added the required column `attackRoll` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterDescription` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flaws` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ideals` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserCharacter" DROP CONSTRAINT "UserCharacter_userId_fkey";

-- AlterTable
ALTER TABLE "UserCharacter" ADD COLUMN     "attackRoll" INTEGER NOT NULL,
ADD COLUMN     "catchPhrases" TEXT[],
ADD COLUMN     "characterDescription" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "flaws" TEXT NOT NULL,
ADD COLUMN     "ideals" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "savingThrows" TEXT[],
ADD COLUMN     "singleUseSkill" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
