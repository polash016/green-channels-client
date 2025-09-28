"use client";
import { motion } from "framer-motion";
import { Employee } from "@/components/Employee/Employee";

export default function AboutPage() {
  return (
    <div className="bg-neutral-900 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/about_us.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-neutral-900 to-black" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 text-center text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto"
          >
            Green Channels is managed by a French specialist with over 35 years
            of experience in international textile and garment trade,
            particularly between Europe, America and Asia. With a strong
            presence in Dhaka, Bangladesh, we ensure real-time connection
            between buyers and Bangladeshi factories — enabling seamless,
            effective communication and operations.
          </motion.p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-900/20 via-neutral-800/50 to-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            Our mission is to set up a Win-Win relationship with our customers &
            factories to reach a long-term business life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-emerald-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Partnership
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Building strong, lasting relationships with all stakeholders in
                the supply chain
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Mutual Success
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Ensuring all parties benefit from our collaborative business
                approach
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-violet-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Long-term Growth
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                Creating sustainable business relationships that thrive over
                time
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Expertise
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Our expertise spans across several interconnected sectors, with a
              sharp focus on Work wear, corporate wear, uniform, Fashion
              garments and Home Textiles. Whether you're a fashion importer of
              garments, a home textile brand, or a sourcing office, Green
              Channels bridges the gap between your vision and high-quality
              manufacturing partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Key Sectors */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Key Sectors
              </h3>

              {/* Garments Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-md opacity-90"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Garments
                    </h4>
                    <p className="text-neutral-300 leading-relaxed mb-4">
                      Premium apparel manufacturing with focus on quality, fit,
                      and finishing
                    </p>

                    {/* Garment Subcategories */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <h5 className="text-sm font-medium text-emerald-400 mb-1">
                          Workwear
                        </h5>
                        <p className="text-xs text-neutral-400">
                          Durable professional clothing
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <h5 className="text-sm font-medium text-blue-400 mb-1">
                          Corporate Wear
                        </h5>
                        <p className="text-xs text-neutral-400">
                          Business formal attire
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <h5 className="text-sm font-medium text-violet-400 mb-1">
                          Uniform
                        </h5>
                        <p className="text-xs text-neutral-400">
                          Standardized team clothing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fashion Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-md opacity-90"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Fashion
                    </h4>
                    <p className="text-neutral-300 leading-relaxed">
                      Trend-driven designs meeting international fashion
                      standards and aesthetics
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Home Textiles Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-md opacity-90"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Home Textiles
                    </h4>
                    <p className="text-neutral-300 leading-relaxed">
                      Comfort-focused home furnishings, bedding, and decorative
                      textiles
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Partnership Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Partnership Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Direct access to verified Bangladeshi manufacturers",
                  "Real-time quality monitoring and reporting",
                  "Cultural and language bridge for seamless communication",
                  "End-to-end supply chain optimization",
                  "Compliance with international standards and certifications",
                  "Risk mitigation through diversified supplier networks",
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-neutral-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "Years of Experience", v: "35+" },
            { k: "Clients", v: "120+" },
            { k: "On-time rate", v: "98%+" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div className="text-3xl font-extrabold text-blue-400">
                {item.v}
              </div>
              <div className="mt-1 text-neutral-300">{item.k}</div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "Quality",
              "Sustainability",
              "Innovation",
              "Integrity",
              "Partnership",
            ].map((v) => (
              <div
                key={v}
                className="rounded-lg border border-white/10 bg-white/5 px-6 py-4 text-center text-neutral-200"
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Our Team
          </h2>
          <Employee />
        </div>
      </section>
    </div>
  );
}
