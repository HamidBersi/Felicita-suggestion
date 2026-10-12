-- AlterTable
ALTER TABLE "MenuNote" ALTER COLUMN "body" SET DEFAULT '';

-- AlterTable
ALTER TABLE "MenuNote" ADD COLUMN "color" TEXT NOT NULL DEFAULT 'gold';

-- AlterTable
ALTER TABLE "MenuNote" ADD COLUMN "lines" JSONB NOT NULL DEFAULT '[]';

-- Place existing frames after the dishes of their category.
UPDATE "MenuNote" AS note
SET "position" = COALESCE(
  (SELECT MAX(item.position) FROM "MenuItem" AS item WHERE item."categoryId" = note."categoryId"),
  -1
) + 1 + note.position;

UPDATE "MenuNote"
SET
  "lines" = '[{"name":"Burrata","price":"7.50"},{"name":"Anchois","price":"2.00"}]'::jsonb,
  "body" = ''
WHERE "title" = 'Suppléments' AND "body" ILIKE '%burrata%';
