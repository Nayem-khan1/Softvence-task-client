const Footer = () => {
  return (
    <footer className="bg-white shadow-inner text-gray-500 text-sm py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-indigo-600">TaskMaster</span>. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://example.com/privacy" className="hover:text-indigo-600 transition">
            Privacy
          </a>
          <a href="https://example.com/terms" className="hover:text-indigo-600 transition">
            Terms
          </a>
          <a href="https://example.com/contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
