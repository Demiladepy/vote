import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "500K+",
    label: "Informed Voters",
    description: "Citizens empowered with election knowledge",
  },
  {
    value: "12",
    label: "Countries",
    description: "Across Africa serving diverse communities",
  },
  {
    value: "25+",
    label: "Languages",
    description: "Making information accessible to all",
  },
  {
    value: "95%",
    label: "Satisfaction",
    description: "Users report increased voting confidence",
  },
];

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" ref={ref} className="relative py-32 overflow-hidden bg-secondary/50">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our impact
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              across Africa
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strengthening democracy one informed vote at a time
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
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
          <p className="text-lg text-muted-foreground mb-6">
            Ready to be part of the movement for informed democracy?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all">
              Get Started Today
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-border hover:border-primary/50 text-foreground font-semibold transition-all">
              Partner With Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
