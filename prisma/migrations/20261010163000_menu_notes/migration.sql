-- CreateTable
CREATE TABLE "MenuNote" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MenuNote_categoryId_idx" ON "MenuNote"("categoryId");

-- AddForeignKey
ALTER TABLE "MenuNote" ADD CONSTRAINT "MenuNote_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
