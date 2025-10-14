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
  },
  {
    icon: Map,
    number: "02",
    title: "Get Election Overview",
    description: "Receive a comprehensive guide to your local elections including candidates, key dates, and polling station information tailored to your constituency.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Ask Questions & Research",
    description: "Use our AI chatbot to ask any election-related questions. Compare candidates, verify claims, and understand policies in your preferred language.",
  },
  {
    icon: Bell,
    number: "04",
    title: "Stay Informed",
    description: "Get timely notifications about registration deadlines, election dates, policy updates, and fact-checked news to stay engaged throughout the election cycle.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className="relative"
            >
              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
              )}

              <div className="space-y-4">
                {/* Icon and Number */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;