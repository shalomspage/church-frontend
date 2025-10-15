import { newsPosts } from '@/data/news'

export async function generateStaticParams() {
  return newsPosts.map((post) => ({
    id: post.id,
  }))
}

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}