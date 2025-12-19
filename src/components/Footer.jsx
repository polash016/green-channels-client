"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconHeart,
  IconMapPin,
  IconMail,
  IconPhone,
  IconArrowRight,
} from "@tabler/icons-react";

export function Footer() {
  const whatsappUrl = "https://wa.me/+8801713031742";
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/greenchannelsdhaka",
      icon: IconBrandFacebook,
    },
    {
      name: "Twitter",
      href: "#",
      icon: IconBrandTwitter,
    },
    {
      name: "Instagram",
      href: "#",
      icon: IconBrandInstagram,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: IconBrandLinkedin,
    },
  ];

  return (
    <footer className="bg-neutral-950/50 backdrop-blur-md border-t border-white/5 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Green Channels Logo"
                width={160}
                height={200}
                className="h-auto w-auto"
              />
              {/* <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Green Channels
              </span> */}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Leading the way in sustainable textile sourcing and ethical
              manufacturing practices across Bangladesh.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <IconMapPin className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium text-white">Office Address</p>
                  <a
                    href="https://maps.app.goo.gl/w2nLbvpqnKuP8RkPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors cursor-pointer"
                  >
                    <p>Road 102, House 4, apartment H3,</p>
                    <p>Gulshan 2, Dhaka 1212, Bangladesh</p>
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <IconMail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a
                  href="mailto:alain@greenchannels.com"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  alain@greenchannels.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <IconPhone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a
                  href="tel:+8801713031742"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  +8801713031742
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Link
                  href="/about"
                  className="group flex items-center text-gray-300 hover:text-green-400 transition-colors"
                >
                  <IconArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
                <Link
                  href="/products"
                  className="group flex items-center text-gray-300 hover:text-green-400 transition-colors"
                >
                  <IconArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Products
                </Link>
                <Link
                  href="/services"
                  className="group flex items-center text-gray-300 hover:text-green-400 transition-colors"
                >
                  <IconArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Services
                </Link>
              </div>

              <div className="space-y-4">
                <Link
                  href="/csr"
                  className="group flex items-center text-gray-300 hover:text-green-400 transition-colors"
                >
                  <IconArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  CSR
                </Link>
                <Link
                  href="/#contact"
                  className="group flex items-center text-gray-300 hover:text-green-400 transition-colors"
                >
                  <IconArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Social & Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              Connect With Us
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-gray-300 mb-4">Follow us on social media</p>
                <div className="flex space-x-4">
                  {socialLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group p-3 bg-neutral-800 hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-110"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-neutral-700"
        >
          <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Green Channels. All rights
              reserved.
            </p>
            <div className="flex items-center gap-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <IconHeart
                className="h-4 w-4 text-red-500 animate-pulse"
                fill="currentColor"
              />
              <span>for a sustainable future</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
