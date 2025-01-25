import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import useCompanyInfo from "../../Hooks/useCompanyInfo";
import logo from "../../../public/logo.png";
const Footer = () => {
  const { companyInfo } = useCompanyInfo();


  return (
    <div>
      <div className="max-w-screen-2xl mx-auto">
        <footer className="bg-gradient-to-r from-[#d8c6f2] via-[#e6dbf7] to-[#d8c6f2] text-white py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex space-x-2">
                {/* Display company logo if available, otherwise fallback to default logo */}
                <img
                  className="h-10 w-10 mr-2 object-cover rounded-full"
                  src={companyInfo?.companyLogo || logo}
                  alt={companyInfo?.companyName || "Default Logo"}
                />
                <p className="text-lg font-bold text-[#9538E2] md:text-3xl">
                  {/* Display company name if available, otherwise fallback to default branding */}
                  {companyInfo?.companyName || (
                    <>
                      ASSET<span className="text-gray-800">VERSE</span>
                    </>
                  )}
                </p>
              </div>

              <p className="mt-4 text-gray-900 font-semibold">
                Experience the ease and convenience with us
              </p>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 font-semibold">Stay Connected</h3>
              <p className="mt-2 text-gray-900">Subscribe to the Newsleeters</p>
              <form className="mt-4 flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Your E-mail"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#9538E2] to-[#9538e2d6] text-white hover:bg-gradient-to-l  transition-all duration-300 border-none py-2 px-4 rounded font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg text-gray-900 font-semibold">Contact Us</h3>
              <p className="text-gray-900 font-semibold">
                Have suggestions or feedback? We'd love to hear from you.
              </p>
              <p className="text-xl text-gray-900  font-bold">+1 234 567 890</p>

              <div className="flex space-x-4">
                <a
                  href="http://www.instagram.com/"
                  className="text-gray-900 hover:text-pink-500"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram className="text-2xl" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  className="text-gray-900 hover:text-blue-600"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebookF className="text-2xl" />
                </a>
                <a
                  href="https://www.x.com/"
                  className="text-gray-900 hover:text-blue-600"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-900">
            <p>
              © 2024 . {companyInfo?.companyName || <>ASSETVERSE</>} All Rights
              Reserved.
            </p>
            <p className="mt-2 space-x-2">
              <a href="" className="hover:underline text-gray-900">
                Privacy Policy
              </a>

              <a href="" className="hover:underline text-gray-900">
                Terms and Conditions
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
