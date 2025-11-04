import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import informImg from "../assets/inform.jpg";
import countryImg from "../assets/countryyy.jpg";
import languageImg from "../assets/language.jpg";
import satisImg from "../assets/satis.jpg";

const stats = [
  {
    value: "500K+",
    label: "Informed Voters",
    image: informImg,
    description: "Citizens empowered with election knowledge",
  },
  {
    value: "12",
    label: "Countries",
    image: countryImg,
    description: "Across Africa serving diverse communities",
  },
  {
    value: "25+",
    label: "Languages",
    image: languageImg,
    description: "Making information accessible to all",
  },
  {
    value: "95%",
    label: "Satisfaction",
    image: satisImg,
    description: "Users report increased voting confidence",
  },
];

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50"
    >
      {/* Soft green ambient glows */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-green-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Our Impact Across Africa
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Strengthening democracy, one informed vote at a time.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-white/80 border border-green-100 rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(22,163,74,0.2)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="mb-6 flex justify-center">
                <img
                  src={stat.image}
                  alt={stat.label}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-green-200 group-hover:ring-green-400 transition-all duration-300"
                />
              </div>

              {/* Value */}
              <div className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to be part of the movement for informed democracy?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-[0_15px_40px_-10px_rgba(22,163,74,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(22,163,74,0.6)] transition-all duration-300">
              Get Started Today
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold transition-all duration-300">
              Partner With Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
