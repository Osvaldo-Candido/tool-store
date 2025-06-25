/*
  Warnings:

  - You are about to drop the column `itemId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmout` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalAmonut` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitiPrice` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_itemId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "itemId",
DROP COLUMN "totalAmout",
ADD COLUMN     "orderItemsId" TEXT,
ADD COLUMN     "totalAmonut" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "unitiPrice" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
