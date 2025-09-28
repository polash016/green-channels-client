"use client";
import { motion } from "framer-motion";
import AutoCarousel from "@/components/ui/auto-carousel";
import { ContactNowSection } from "@/components/ContactNowSection";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/80 via-neutral-900 to-neutral-950 flex flex-col items-center">
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
            {/* <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Green Channels offers specialized technical expertise to make your
              quality control processes secure, transparent, and efficient.
            </p>
            <p className="text-lg text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              With a strong presence in both the industrial and institutional
              sectors across European markets, we are equipped to operate under
              any international quality standards.
            </p> */}
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
                  // {
                  //   stage: "Machinery Evaluation",
                  //   icon: "⚙️",
                  //   color: "from-emerald-500 to-emerald-600",
                  // },
                  // {
                  //   stage: "Pattern Review",
                  //   icon: "✂️",
                  //   color: "from-orange-500 to-orange-600",
                  // },
                  // {
                  //   stage: "Yarn and Fabric Inspection",
                  //   icon: "🧵",
                  //   color: "from-pink-500 to-pink-600",
                  // },
                  // {
                  //   stage: "Cut & Make (CM) Operations",
                  //   icon: "👕",
                  //   color: "from-indigo-500 to-indigo-600",
                  // },
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

      {/* Inquiry Process Workflow */}
    </div>
  );
}

{
  /* Consultancy Services */
}
{
  /* <section className="w-full py-20 bg-gradient-to-br from-zinc-900 via-neutral-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Consultancy Services
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              With decades of on-the-ground experience, Green Channels is your
              most efficient and reliable partner for business development and
              consultancy in Bangladesh.
            </p>
            <p className="text-lg text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Our deep industry knowledge, built over 35+ years, allows us to
              help transform your ideas into successful ventures—whether you're
              exploring new investments, strategic partnerships, or factory
              improvements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  On-Site Expertise
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Already partnering with multiple factories across Bangladesh,
                  we provide the missing management expertise needed to boost
                  operational efficiency and long-term growth.
                </p>
                <div className="flex items-center gap-3 text-purple-300">
                  <span className="text-2xl">🚀</span>
                  <span className="font-semibold">
                    Business Development & Consultancy Services
                  </span>
                </div>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  service: "Organization & Operational Structure",
                  icon: "🏗️",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  service: "Production Optimization",
                  icon: "⚡",
                  color: "from-emerald-500 to-emerald-600",
                },
                {
                  service: "Marketing & Brand Positioning",
                  icon: "🎯",
                  color: "from-orange-500 to-orange-600",
                },
                {
                  service: "Research & Development (R&D)",
                  icon: "🔬",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  service: "Social & Technical Compliance",
                  icon: "✅",
                  color: "from-green-500 to-green-600",
                },
                {
                  service: "Joint Venture Strategy & Setup",
                  icon: "🤝",
                  color: "from-pink-500 to-pink-600",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-white font-medium text-sm leading-tight">
                      {item.service}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

         
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <AutoCarousel
              items={[
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 flex items-center justify-center">
                    <div className="text-6xl">🏭</div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Factory Optimization
                    </h3>
                    <p className="text-purple-100 text-lg leading-relaxed">
                      Transform your existing operations with our proven
                      strategies for production efficiency, quality improvement,
                      and cost optimization.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Process streamlining",
                        "Quality management systems",
                        "Cost reduction strategies",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-purple-200"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>,
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center">
                    <div className="text-6xl">🚀</div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      New Venture Development
                    </h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Launch successful ventures with our comprehensive guidance
                      from concept to execution, including market analysis and
                      strategic planning.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Market research & analysis",
                        "Strategic planning",
                        "Investment guidance",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-blue-200"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>,
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <div className="text-6xl">🤝</div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Strategic Partnerships
                    </h3>
                    <p className="text-emerald-100 text-lg leading-relaxed">
                      Build lasting partnerships with our expertise in joint
                      venture setup, compliance management, and long-term growth
                      strategies.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Joint venture strategy",
                        "Compliance management",
                        "Growth planning",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-emerald-200"
                        >
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>,
              ]}
              panelClassName="rounded-3xl border border-white/10 bg-white/10 p-8 md:p-10 backdrop-blur-sm"
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm max-w-4xl mx-auto">
              <p className="text-lg text-neutral-300 leading-relaxed">
                Whether you're launching a new venture, improving an existing
                operation, or building long-term partnerships, Green Channels is
                your on-site expert — delivering strategic insight and hands-on
                support.
              </p>
            </div>
          </motion.div>
        </div>
      </section> */
}

{
  /* Sourcing Solutions */
}
{
  /* <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sourcing Solutions
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              With over 35 years of experience in Bangladesh, Green Channels
              offers professional, reliable sourcing solutions tailored to your
              specific requirements. Our well-established presence allows us to
              provide the support, transparency, and efficiency needed to ensure
              on-time delivery and consistent quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "DISCOVERY",
                description:
                  "For exploring new opportunities and testing suppliers",
                icon: "🔍",
                color: "from-blue-500 to-indigo-600",
                features: [
                  "Supplier evaluation",
                  "Market research",
                  "Sample testing",
                  "Initial negotiations",
                ],
              },
              {
                title: "FOLLOW",
                description:
                  "For ongoing order follow-up and supply chain monitoring",
                icon: "📋",
                color: "from-emerald-500 to-teal-600",
                features: [
                  "Order tracking",
                  "Quality monitoring",
                  "Progress reports",
                  "Issue resolution",
                ],
              },
              {
                title: "ONE SHOT",
                description:
                  "For one-time or seasonal orders with complete execution support",
                icon: "🎯",
                color: "from-purple-500 to-pink-600",
                features: [
                  "End-to-end execution",
                  "Full quality control",
                  "Delivery management",
                  "Post-delivery support",
                ],
              },
            ].map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm h-full hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:scale-[1.02]">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center text-2xl mb-6 mx-auto`}
                  >
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-3">
                    {pkg.title}
                  </h3>
                  <p className="text-neutral-300 text-center mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + featureIndex * 0.1,
                          duration: 0.5,
                        }}
                        className="flex items-center space-x-3 text-sm"
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 my-auto"
            >
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-emerald-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  What We Offer
                </h3>

                <div className="space-y-4">
                  {[
                    "Full order management",
                    "Comprehensive quality control",
                    "Detailed reporting at each stage of the production process",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-300 leading-relaxed">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl p-6 border border-blue-500/20 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">
                  Organic & Fair Trade
                </h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Certified sourcing options available for environmentally
                  conscious and ethically responsible procurement.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
                Trusted Partner Network
              </h3>

              <div className="space-y-4">
                {[
                  "Composite units",
                  "Specialized units in spinning, weaving, knitting, dyeing, cutting, and making",
                ].map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                          index === 0
                            ? "from-orange-500 to-red-600"
                            : "from-indigo-500 to-purple-600"
                        } flex items-center justify-center text-lg flex-shrink-0`}
                      >
                        {index === 0 ? "🏭" : "🧵"}
                      </div>
                      <span className="text-white font-medium leading-relaxed">
                        {partner}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 backdrop-blur-sm mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Quality Assurance
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Whether you're sourcing fashion garments or home textiles,
                  Green Channels ensures responsible sourcing, factory
                  reliability, and full alignment with your quality and delivery
                  expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */
}

{
  /* CTA */
}
{
  /* <section className="w-full">
        <ContactNowSection />
      </section> */
}
