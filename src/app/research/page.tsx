import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function ResearchPage() {
  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Research & Insights</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Latest developments in robotic skin technology and tactile sensing
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/research/${post.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-600 transition-colors"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
