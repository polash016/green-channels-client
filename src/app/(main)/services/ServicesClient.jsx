"use client";
import { motion } from "framer-motion";
import AutoCarousel from "@/components/ui/auto-carousel";
import { ContactNowSection } from "@/components/ContactNowSection";

export default function ServicesClient() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Compact Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-center py-48 md:py-56 lg:py-64 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/service.jpeg')" }}
      ></motion.section>

      <section className="w-full py-20 bg-gradient-to-br from-neutral-900 via-slate-900 to-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Inquiry Process
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              From initial inquiry to final delivery, we follow a structured
              4-step process that ensures quality, transparency, and on-time
              delivery.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "1",
                title: "Following Inquiry Details",
                icon: "📋",
                color: "from-blue-500 to-indigo-600",
                details: [
                  "Style",
                  "Quantity",
                  "Certifications",
                  "Delivery date",
                ],
                description:
                  "We select the best factory matching your requirements",
              },
              {
                step: "2",
                title: "Price Negotiation",
                icon: "💰",
                color: "from-emerald-500 to-teal-600",
                details: [
                  "Competitive pricing",
                  "Volume discounts",
                  "Payment terms",
                  "Cost optimization",
                ],
                description:
                  "Transparent pricing with competitive market rates",
              },
              {
                step: "3",
                title: "Samples Program",
                icon: "🧪",
                color: "from-purple-500 to-pink-600",
                details: [
                  "Prototype development",
                  "Quality validation",
                  "Material testing",
                  "Approval process",
                ],
                description:
                  "Comprehensive sampling to ensure quality standards",
              },
              {
                step: "4",
                title: "After Order Confirmation",
                icon: "✅",
                color: "from-orange-500 to-red-600",
                details: [
                  "Retro Planning",
                  "In-line inspection",
                  "Final Inspection (AQL 1.5, 2.5)",
                  "Third party inspection (if required)",
                  "Documentation Review",
                ],
                description: "Complete quality control and delivery management",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 backdrop-blur-sm h-full hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {item.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-6`}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {item.details.map((detail, detailIndex) => (
                      <motion.li
                        key={detailIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + detailIndex * 0.1,
                          duration: 0.4,
                        }}
                        className="flex items-center space-x-2 text-xs"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-300">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Flow Visualization */}
        </div>
      </section>

      {/* Quality Control Expertise */}
      <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 mb-6"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Quality Control Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Production Cycle Stages */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
                Production Cycle Coverage
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    stage: "Retro Planning",
                    icon: "📋",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    stage: "In-Line Inspections",
                    icon: "🔍",
                    color: "from-cyan-500 to-cyan-600",
                  },
                  {
                    stage: "Final Inspections (AQL 1.5, 2.5)",
                    icon: "✅",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    stage: "Third Party Inspection",
                    icon: "🔬",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    stage: "Documentation Review",
                    icon: "📄",
                    color: "from-violet-500 to-violet-600",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.stage}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg flex-shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-white font-medium">
                        {item.stage}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Quality Assurance Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 my-auto"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  Quality Assurance Benifits
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  We ensure that each step of your supply chain meets the
                  highest standards — giving you confidence, consistency, and
                  full traceability throughout the production process.
                </p>

                <div className="space-y-4">
                  {[
                    "International Standards Compliance",
                    "Real-time Quality Monitoring",
                    "Comprehensive Documentation",
                    "Risk Mitigation Strategies",
                    "Continuous Process Improvement",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                      <span className="text-neutral-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ContactNowSection />
    </div>
  );
}
