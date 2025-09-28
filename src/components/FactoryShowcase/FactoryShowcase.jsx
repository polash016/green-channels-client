"use client";
import { motion } from "motion/react";
import {
  IconBuildingFactory2,
  IconUsers,
  IconAward,
  IconGlobe,
} from "@tabler/icons-react";

export default function FactoryShowcase() {
  return (
    <section className="relative mhin-h-screen bg-neutral-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 my-auto">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562158073-7dea7a50c8d8?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto my-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Factories
            </h2>
            {/* <h3 className="text-3xl md:text-4xl font-semibold text-green-400 mb-4">
              Milanti Apparels
            </h3> */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Where quality meets innovation in every stitch. Our
              state-of-the-art manufacturing facility ensures premium quality
              garments that meet international standards.
            </p>
          </motion.div>

          {/* Factory Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <IconBuildingFactory2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">
                Modern Facility
              </h4>
              <p className="text-gray-300 text-sm">
                State-of-the-art equipment and technology for precision
                manufacturing
              </p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <IconUsers className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">
                Skilled Workforce
              </h4>
              <p className="text-gray-300 text-sm">
                Experienced craftsmen and quality control specialists
              </p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <IconAward className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">
                Quality Certified
              </h4>
              <p className="text-gray-300 text-sm">
                International quality standards and certifications
              </p>
            </div>

            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <IconGlobe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">
                Global Reach
              </h4>
              <p className="text-gray-300 text-sm">
                Serving international markets with reliable production capacity
              </p>
            </div>
          </motion.div>

          {/* Detailed Factory Information */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold text-white mb-4">
                Why Choose Milanti Apparels?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Production Capacity:
                    </span>
                    Large-scale manufacturing with quick turnaround times
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Quality Control:
                    </span>
                    Rigorous testing and inspection at every stage
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Sustainability:
                    </span>
                    Eco-friendly practices and responsible manufacturing
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">
                      Custom Solutions:
                    </span>
                    Tailored manufacturing to meet specific client requirements
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h5 className="text-xl font-semibold text-white mb-4 text-center">
                  Factory Specifications
                </h5>
                <div className="space-y-3 text-center">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Production Lines</span>
                    <span className="text-white font-semibold">15+</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Workforce</span>
                    <span className="text-white font-semibold">500+</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Daily Capacity</span>
                    <span className="text-white font-semibold">10,000+</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Quality Rating</span>
                    <span className="text-white font-semibold">A+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Call to Action */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <a
              href="https://milanty-apparels.com"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 hover:scale-105 transform"
            >
              Visit Our Factory
            </a>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
