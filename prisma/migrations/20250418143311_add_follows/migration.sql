-- CreateTable
CREATE TABLE "Follows" (
    "followedById" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    PRIMARY KEY ("followingId", "followedById"),
    CONSTRAINT "Follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
