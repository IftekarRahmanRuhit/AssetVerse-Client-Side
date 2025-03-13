import React from 'react';

const ClientShowcase = () => {
  const clients = [
    {
      name: "Google",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      category: "Technology"
    },
    {
      name: "Apple",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
      category: "Technology"
    },
    {
      name: "Facebook",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
      category: "Technology"
    },
    {
      name: "LinkedIn",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
      category: "Professional Network"
    },
    {
      name: "Twitter",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
      category: "Social Media"
    },
    {
      name: "Android",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
      category: "Mobile"
    }
  ];

  return (
    <section className="py-20 bg-[#212428]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold text-[#9538E2] mb-4">
            Trusted by Leading Companies Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join the industry leaders who have chosen our platform for their asset management needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 cur">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="w-full h-32 bg-white/5 rounded-lg shadow-sm p-6 flex items-center justify-center cursor-pointer hover:shadow-md transition-all duration-300">   
                <img
                  src={client.logoUrl}
                  alt={`${client.name} logo`}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-gray-400">{client.name}</p>
                <p className="text-xs text-gray-400">{client.category}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientShowcase;