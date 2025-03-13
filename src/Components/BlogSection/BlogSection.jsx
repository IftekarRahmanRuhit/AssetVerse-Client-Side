
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
    <section className="py-20 bg-[#212428]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#9538E2] mb-4 text-center">
              Latest Blog Posts
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl text-center">
              Stay updated with the latest insights, trends, and best practices in asset management
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-[#0D0E10] rounded-xl overflow-hidden shadow-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                {post.tag && (
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                    {post.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-[#9f49e6] text-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;