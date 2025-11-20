import { useState } from "react";

function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        className="md:hidden bg-black text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Open Menu
      </button>

      {/* SIDEBAR OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden "
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-200 p-6 transform transition-transform duration-300 md:hidden 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* CLOSE BUTTON */}
        <button
          className="text-white mb-6"
          onClick={() => setOpen(false)}
        >
          Close
        </button>

        {/* MENU ITEMS */}
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Services</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>

        {/* MOBILE FOOTER INSIDE SIDEBAR */}
        <footer className="absolute bottom-4 left-0 w-full px-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Your Website
          </p>
        </footer>
      </aside>

      {/* DESKTOP FOOTER */}
      <footer className="hidden md:block bg-gray-900 text-gray-300 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Website. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer
