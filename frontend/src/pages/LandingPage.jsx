import React, { useState, useEffect } from "react";
import {
  Package,
  TrendingUp,
  Warehouse,
  Shield,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Users,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

// A friendly, simple mascot SVG and a small building illustration to give the page a "human-built" vibe.
function HumanMascot({ className = "w-40 h-40" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="100" cy="60" r="36" fill="#0ea5e9" />
        <path
          d="M64 120c0-20 36-28 36-28s36 8 36 28v18H64v-18z"
          fill="#134E4A"
          opacity=".06"
        />
        <rect
          x="70"
          y="110"
          width="60"
          height="50"
          rx="8"
          fill="#083344"
          opacity=".06"
        />
        <circle cx="86" cy="58" r="4" fill="#fff" />
        <circle cx="114" cy="58" r="4" fill="#fff" />
        <path
          d="M90 74c3 3 10 3 13 0"
          stroke="#053F3F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function BuildingIcon({ className = "w-14 h-14" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 7h3M7 11h3M7 15h3M14 7h2M14 11h2M14 15h2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LandingPage() {
  // single unique accent color (electric cyan) used consistently across the page
  const ACCENT = "cyan-500";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg bg-${ACCENT} flex items-center justify-center`}
              >
                <img src="https://imgs.search.brave.com/utT25WVux7fu6UdlgoinfQQGZOjbmgUOAfG958an2SE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NDc5MzcxMy92ZWN0/b3IvZ3JhcGgtbW92/aW5nLXVwd29yZHMt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9S0lCdHZI/OFNBZHdyQmJDRXQ0/T1lKempmclR5U21L/d3BMb0FxRGNtODB5/WT0" alt="" className="h-10 w-10 rounded-md"/>
              </div>
              <span className="text-2xl font-bold">StockMaster</span>
              
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {/* <a
                href="#features"
                className="text-slate-300 hover:text-white transition"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-slate-300 hover:text-white transition"
              >
                Benefits
              </a>
              <a
                href="#pricing"
                className="text-slate-300 hover:text-white transition"
              >
                Pricing
              </a> */}
              <Link
                to={"/register"}
                className={`px-4 py-2 border text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition hover:text-white hover:bg-blue-900`}
              >
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/90 backdrop-blur-sm">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a
                href="#features"
                className="block text-slate-300 hover:text-white py-2"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-slate-300 hover:text-white py-2"
              >
                Benefits
              </a>
              <a
                href="#pricing"
                className="block text-slate-300 hover:text-white py-2"
              >
                Pricing
              </a>
              <Link
                to={"/register"}
                className={`w-full px-6 py-2 bg-${ACCENT} text-slate-900 rounded-lg font-semibold`}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                A friendlier way to manage
                <span className={`text-${ACCENT} ml-2`}>Stock Data</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed">
                StockMaster brings clear, human-centered workflows and a single,
                confident accent color so your users focus on the data that
                matters.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`group px-8 py-4 bg-${ACCENT} text-slate-900 rounded-lg font-semibold hover:shadow-2xl transform hover:scale-105 flex items-center justify-center`}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 bg-white/6 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/10 hover:bg-white/10 transition">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full bg-${ACCENT} border-2 border-slate-900`}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-semibold">500+ Businesses</div>
                  <div className="text-slate-400 text-sm">
                    Trust StockMaster
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Card with clean single-color accents and human mascot */}
              <div className="relative bg-slate-800/80 p-8 rounded-2xl shadow-lg border border-white/8 w-full max-w-md">
                <div className="bg-slate-700/60 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BuildingIcon className={`w-8 h-8 text-${ACCENT}`} />
                      <span className="text-slate-300 text-sm">
                        Market Overview
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Stocks", value: "1,234", icon: Package },
                      { label: "Gainers", value: "23", icon: TrendingUp },
                      { label: "Exchanges", value: "5", icon: Warehouse },
                      { label: "Active", value: "89", icon: BarChart3 },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-700/40 p-4 rounded-lg">
                        <div
                          className={`w-10 h-10 bg-slate-900/30 rounded-lg flex items-center justify-center mb-2 text-${ACCENT}`}
                        >
                          <item.icon className={`w-5 h-5 text-${ACCENT}`} />
                        </div>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <div className="text-slate-400 text-sm">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Data Confidence</span>
                      <span className="text-green-400 font-semibold">
                        98.5%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`bg-${ACCENT} h-2 rounded-full`}
                        style={{ width: "98.5%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Human mascot floating slightly to the right to add a "built by humans" feel */}
              {/* <div className="absolute -right-10 -top-10 transform translate-x-2">
                <HumanMascot className="w-36 h-36" />
              </div> */}

              {/* Small accent bubble */}
              {/* <div
                className={`absolute -bottom-6 -left-6 p-3 rounded-xl shadow-lg bg-${ACCENT}`}
              >
                <CheckCircle className="w-5 h-5 text-white" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - single color accents and friendlier copy */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful, human-centered tools
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Clear dashboards, approachable workflows, and a single accent
              color so users feel grounded.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Product Management",
                description:
                  "SKU tracking, categories, and honest stock levels",
              },
              {
                icon: TrendingUp,
                title: "Receipt Processing",
                description: "Automated updates and simple supplier tracking",
              },
              {
                icon: Warehouse,
                title: "Multi-Exchange",
                description: "Support multiple exchanges and locations",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Fast insights built for humans",
              },
              {
                icon: Shield,
                title: "Adjustments",
                description: "Reconcile with ease",
              },
              {
                icon: Users,
                title: "Role-Based Access",
                description: "Control who sees what",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/50 p-6 rounded-xl border border-white/8 hover:transform hover:scale-105 transition"
              >
                <div
                  className={`w-14 h-14 bg-slate-900/30 rounded-lg flex items-center justify-center mb-4 text-${ACCENT}`}
                >
                  <feature.icon className={`w-7 h-7 text-${ACCENT}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`p-12 rounded-2xl border border-white/6 bg-slate-800/60`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to try a human-centered approach?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join hundreds of traders who prefer clarity and a single trusted
              accent
            </p>
            <button
              className={`px-10 py-4 bg-${ACCENT} text-slate-900 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105`}
            >
              Start Your Free Trial
            </button>
            <p className="text-slate-400 text-sm mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className={`p-2 rounded-lg bg-${ACCENT}`}>
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">StockMaster</span>
          </div>
          <p className="text-slate-400 mb-4">
            © 2025 StockMaster. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
