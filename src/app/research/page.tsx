import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function ResearchPage() {
  const publications = blogPosts.map(post => ({
    ...post,
    citations: Math.floor(Math.random() * 150) + 50,
    impactFactor: (Math.random() * 10 + 5).toFixed(1),
    doi: "10.1000/" + post.id,
    pdfLink: "/papers/" + post.id + ".pdf",
    journal: "Nature Robotics",
  }));

  return (
    <>
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Research & Technical Insights</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">Explore our latest publications and breakthroughs.</p>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div><div className="text-4xl font-bold">50+</div><div className="text-blue-200 text-sm">Peer-Reviewed Papers</div></div>
            <div><div className="text-4xl font-bold">2,500+</div><div className="text-blue-200 text-sm">Total Citations</div></div>
            <div><div className="text-4xl font-bold">h-index 32</div><div className="text-blue-200 text-sm">Impact Metric</div></div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">All Publications</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Peer-Reviewed Research</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Materials Science</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">AI & ML</span>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            {publications.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-600 shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-[280px_1fr]">
                  <div className="bg-blue-50 p-6 border-r">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">{post.category}</span>
                    <h3 className="text-sm font-bold text-gray-800 mt-3">{post.journal}</h3>
                    <p className="text-xs text-gray-600 mt-1">{post.date}</p>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between"><span className="text-xs text-gray-600">Citations</span><span className="font-bold text-blue-600">{post.citations}</span></div>
                      <div className="flex justify-between"><span className="text-xs text-gray-600">Impact Factor</span><span className="font-bold text-purple-600">{post.impactFactor}</span></div>
                      <div className="flex justify-between"><span className="text-xs text-gray-600">DOI</span><a href={"https://doi.org/" + post.doi} className="text-xs text-blue-600 underline">{post.doi}</a></div>
                    </div>
                  </div>
                  <div className="p-8">
                    <Link href={"/research/" + post.id}><h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">{post.title}</h2></Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center mb-6">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-cyan-400 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600"><span className="font-semibold">{post.author}</span> and collaborators</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href={post.pdfLink} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg">Download PDF</a>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg">Copy BibTeX</button>
                      <Link href={"/research/" + post.id} className="px-4 py-2 text-blue-600 text-sm font-semibold rounded-lg ml-auto">Read More &rarr;</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Open Source Contributions</h2>
            <p className="text-gray-300 mb-6">Our research code, datasets, and pre-trained models are available for the community.</p>
            <a href="https://github.com/roboskin-ai" className="flex items-center p-4 bg-slate-800 rounded-lg">
              <div className="font-semibold">github.com/roboskin-ai</div>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-6 rounded-lg text-center"><div className="text-3xl font-bold text-cyan-400">5,000+</div><div className="text-sm text-gray-400">GitHub Stars</div></div>
            <div className="bg-slate-800 p-6 rounded-lg text-center"><div className="text-3xl font-bold text-purple-400">12</div><div className="text-sm text-gray-400">Open Repos</div></div>
            <div className="bg-slate-800 p-6 rounded-lg text-center"><div className="text-3xl font-bold text-blue-400">500+</div><div className="text-sm text-gray-400">Datasets (GB)</div></div>
            <div className="bg-slate-800 p-6 rounded-lg text-center"><div className="text-3xl font-bold text-pink-400">50+</div><div className="text-sm text-gray-400">Contributors</div></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Interested in Research Collaboration?</h2>
        <Link href="/contact" className="inline-flex items-center px-10 py-4 bg-white text-blue-700 font-bold rounded-lg">Discuss Collaboration</Link>
      </section>
    </>
  );
}
