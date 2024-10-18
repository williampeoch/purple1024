import { db } from "@/drizzle/db";
import { openingPosts, replies } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";


export default async function Home() {
  const openingPostsRes = await db
    .select({
      id: openingPosts.id,
      content: openingPosts.content,
      replyCount: sql<number>`count(${replies.id})`,
    })
    .from(openingPosts)
    .leftJoin(replies, sql`${openingPosts.id} = ${replies.openingPostId}`)
    .groupBy(openingPosts.id)
    .orderBy(sql`${openingPosts.lastReplyCreatedAt} desc`);

  return (
    <main>
      <p>hello</p>
      <div>
        {openingPostsRes.map((openingPost) => {
          return (
            <Link key={openingPost.id} href={"/"}>
            <p>{openingPost.content}</p>
          </Link>
          );
        })}
      </div>
    </main>
  );
}
