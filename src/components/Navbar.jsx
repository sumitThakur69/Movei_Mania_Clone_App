import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="relative w-full h-16 flex justify-between items-center px-3 bg-black text-white top-0 z-10">
        <p className="text-2xl font-bold ml-8">Movie 🎬 Mania</p>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-white">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </nav>

      {/* DARK OVERLAY (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 md:hidden"
        />
      )}

      {/* MOBILE SLIDE-DOWN MENU */}
      <div
        className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-30
          transform transition-transform duration-300 md:hidden
          ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="text-3xl"
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col items-center gap-6 py-6 text-black text-lg">
          <li onClick={() => setOpen(false)}>Home</li>
          <li onClick={() => setOpen(false)}>About</li>
          <li onClick={() => setOpen(false)}>Services</li>
          <li onClick={() => setOpen(false)}>Contact</li>
        </ul>
      </div>
    </>
  );
}
