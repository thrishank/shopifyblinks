-- CreateTable
CREATE TABLE "Blink" (
    "id" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "email" TEXT[],
    "walletAddres" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blink_pkey" PRIMARY KEY ("id")
);
