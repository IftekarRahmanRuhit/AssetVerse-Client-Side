
import React from 'react';
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi';

const BlogSection = () => {
  const blogPosts = [
    {
      title: "5 Ways to Improve Asset Tracking in 2024",
      excerpt: "Discover the latest technologies and strategies to enhance your organization's asset tracking efficiency and reduce costs.",
      category: "Asset Tracking",
      author: "Sarah Johnson",
      date: "Feb 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
     
    },
    {
      title: "Why Every HR Team Needs an Asset Management System",
      excerpt: "Learn how HR departments can benefit from implementing a robust asset management system for employee equipment tracking.",
      category: "HR Management",
      author: "Michael Chen",
      date: "Feb 12, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      title: "The Future of IoT in Asset Management",
      excerpt: "Explore how Internet of Things (IoT) technology is revolutionizing the way organizations track and manage their assets.",
      category: "Technology",
      author: "David Smith",
      date: "Feb 10, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center mb-12">
          <div className='text-center'>
            <div className="inline-block text-center ">
              <h2 className="text-3xl md:text-4xl font-bold text-[#9538E2] mb-4 text-center">
                Latest Blog Posts
              </h2>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl text-center leading-relaxed">
            Stay informed with the latest asset management insights and trends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="group bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-600/50 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.tag && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 text-sm font-medium rounded-full shadow-lg">
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-gradient-to-r from-[#9538E2] to-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg shadow-purple-900/25">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center text-sm text-gray-400">
                    <FiUser className="mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <FiClock className="mr-2" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] transition-all duration-300 shadow-lg shadow-purple-900/25 hover:scale-105">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;