import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostById, blogPosts } from '@/lib/blog-data';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <article className="bg-white">
        <header className="bg-gray-50 py-12 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/research"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Research
            </Link>

            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center text-sm text-gray-500">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium text-gray-900">{post.author}</div>
                <div>{post.date} · {post.readTime}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">{paragraph.substring(2)}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-5">{paragraph.substring(3)}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4">{paragraph.substring(4)}</h3>;
              } else if (paragraph.match(/^\d+\.\s/)) {
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-gray-700">
                    <li>{paragraph.replace(/^\d+\.\s/, '')}</li>
                  </ol>
                );
              } else if (paragraph.match(/^[–-]\s/)) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-700">
                    <li>{paragraph.replace(/^[–-]\s/, '')}</li>
                  </ul>
                );
              } else if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={index} className="border-l-4 border-blue-600 pl-4 py-2 my-6 italic text-gray-700 bg-blue-50">
                    {paragraph.substring(2)}
                  </blockquote>
                );
              } else if (paragraph.startsWith('```')) {
                return null;
              } else if (paragraph.trim() === '') {
                return <div key={index} className="h-4" />;
              } else if (paragraph.trim()) {
                return <p key={index} className="text-gray-700 leading-relaxed mb-6">{paragraph}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.id}
                  href={`/research/${relatedPost.id}`}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-600 transition-colors"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
