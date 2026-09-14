-- AlterTable
ALTER TABLE "MenuCategory" ADD COLUMN     "menuType" TEXT NOT NULL DEFAULT 'salle';

-- CreateIndex
CREATE INDEX "MenuCategory_menuType_idx" ON "MenuCategory"("menuType");
