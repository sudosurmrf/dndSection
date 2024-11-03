/*
  Warnings:

  - You are about to drop the column `attackRoll` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `catchPhrases` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `characterDescription` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `flaws` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `ideals` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `savingThrows` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `singleUseSkill` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `UserCharacter` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserCharacter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCharacter" DROP CONSTRAINT "UserCharacter_userId_fkey";

-- AlterTable
ALTER TABLE "UserCharacter" DROP COLUMN "attackRoll",
DROP COLUMN "catchPhrases",
DROP COLUMN "characterDescription",
DROP COLUMN "createdAt",
DROP COLUMN "flaws",
DROP COLUMN "ideals",
DROP COLUMN "notes",
DROP COLUMN "savingThrows",
DROP COLUMN "singleUseSkill",
DROP COLUMN "skills",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "UserCharacter" ADD CONSTRAINT "UserCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
