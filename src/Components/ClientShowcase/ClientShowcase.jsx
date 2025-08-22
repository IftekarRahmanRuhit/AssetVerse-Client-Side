import React from 'react';

const ClientShowcase = () => {
  const clients = [
    {
      name: "Google",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      category: "Technology"
    },
    {
      name: "Apple",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#A2AAAD" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      category: "Technology"
    },
    {
      name: "Facebook",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      category: "Technology"
    },
    {
      name: "LinkedIn",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      category: "Professional Network"
    },
    {
      name: "Twitter",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      category: "Social Media"
    },
    {
      name: "Android",
      logo: (
        <svg className="h-12 w-12" viewBox="0 0 24 24">
          <path fill="#3DDC84" d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.5036C15.5902 8.2432 13.8533 7.6587 12 7.6587s-3.5902.5845-5.1367 1.6954L4.8411 5.8515a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676L5.1188 9.3214C2.6883 10.9872 1.5 13.9116 1.5 17.0046v1.0427c0 .5511.4482.9993.9993.9993h19.0014c.5511 0 .9993-.4482.9993-.9993V17.0046c0-3.093-1.1883-6.0174-3.6188-7.6832"/>
        </svg>
      ),
      category: "Mobile"
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block ">
            <h2 className="text-3xl md:text-3xl font-bold text-[#9538E2] mb-4">
              Trusted by Leading Companies Worldwide
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Leading organizations rely on our platform for asset management
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              <div className="w-full h-32 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700 hover:border-purple-600/50 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 p-6 flex items-center justify-center cursor-pointer transition-all duration-500 hover:-translate-y-2 group-hover:scale-105">   
                {client.logo}
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-300">{client.name}</p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{client.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;