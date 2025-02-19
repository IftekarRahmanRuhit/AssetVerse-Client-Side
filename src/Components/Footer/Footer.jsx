
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import useCompanyInfo from "../../Hooks/useCompanyInfo";
import logo from "../../../public/logo.png";

const Footer = () => {
  const { companyInfo } = useCompanyInfo();

  return (
    <footer className="bg-gradient-to-r from-[#d8c6f2] via-[#e6dbf7] to-[#d8c6f2] text-gray-800 py-8 max-w-screen-2xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 object-cover rounded-full"
                src={companyInfo?.companyLogo || logo}
                alt={companyInfo?.companyName || "Company Logo"}
              />
              <h1 className="ml-3 text-2xl font-bold text-[#9538E2]">
                {companyInfo?.companyName || "ASSETVERSE"}
              </h1>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Experience the ease and convenience with us.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-[#9538E2] mb-2">Stay Connected</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your E-mail"
                className="w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9538E2]"
              />
              <button
                type="submit"
                className="bg-[#9538E2] hover:bg-[#9538e2d6] text-white font-semibold py-2 rounded transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-[#9538E2] mb-2">Contact Us</h3>
            <p className="text-sm mb-2">Have suggestions or feedback? We'd love to hear from you.</p>
            <p className="text-lg font-bold text-[#9538E2]">+1 234 567 890</p>
            <div className="flex space-x-4 mt-4">
              <a href="http://www.instagram.com/" className="text-gray-800 hover:text-[#9538E2]" aria-label="Follow us on Instagram">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="https://www.facebook.com/" className="text-gray-800 hover:text-[#9538E2]" aria-label="Follow us on Facebook">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="https://www.twitter.com/" className="text-gray-800 hover:text-[#9538E2]" aria-label="Follow us on Twitter">
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#9538E2] pt-4 text-center text-sm text-gray-800">
          <p>
            © {new Date().getFullYear()} {companyInfo?.companyName || "ASSETVERSE"}. All Rights Reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;