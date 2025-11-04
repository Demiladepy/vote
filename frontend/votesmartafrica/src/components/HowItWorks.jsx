import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Map, MessageCircle, Bell } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up & Personalize",
    description: "Create your account and select your location, preferred language, and notification preferences. The platform adapts to your literacy level and regional context.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Map,
    number: "02",
    title: "Get Election Overview",
    description: "Receive a comprehensive guide to your local elections including candidates, key dates, and polling station information tailored to your constituency.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Ask Questions & Research",
    description: "Use our AI chatbot to ask any election-related questions. Compare candidates, verify claims, and understand policies in your preferred language.",
    gradient: "from-teal-400 to-green-500",
  },
  {
    icon: Bell,
    number: "04",
    title: "Stay Informed",
    description: "Get timely notifications about registration deadlines, election dates, policy updates, and fact-checked news to stay engaged throughout the election cycle.",
    gradient: "from-green-500 to-emerald-600",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-green-50/50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started with VoteSmart Africa is simple and takes just minutes
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-8 h-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 opacity-40 group-hover:opacity-60 transition-opacity" />
                </div>
              )}

              <div className="relative p-8 rounded-3xl bg-white border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50 space-y-6 h-full">
                {/* Icon and Number */}
                <div className="relative w-fit">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-green-200/50 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-300/50 hover:scale-105 transition-all duration-300 cursor-pointer">
            <span>Ready to get started?</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;