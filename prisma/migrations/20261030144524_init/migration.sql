/*
  Warnings:

  - Added the required column `court` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "court" TEXT NOT NULL;
