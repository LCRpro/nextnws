import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const revalidate = 60;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ArticlePage({ params }: any) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, id));

  if (!article) return notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{article.content}</p>
    </div>
  );
}
