import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, MapPin, CheckCircle, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Candidate Comparison",
    description: "Side-by-side analysis of candidates' policies, track records, manifestos, and voting history. Make informed decisions based on facts, not promises.",
  },
  {
    icon: MapPin,
    title: "Polling Station Guidance",
    description: "Find your nearest polling station, get directions, and receive timely reminders for registration deadlines and election day.",
  },
  {
    icon: CheckCircle,
    title: "Fact-Checking & Verification",
    description: "Combat misinformation with AI-powered fact-checking of election news, candidate claims, and viral social media content.",
  },
  {
    icon: MessageSquare,
    title: "Contextual Q&A Assistant",
    description: "Get instant answers about voting eligibility, procedures, rights, and local election rules in your preferred language.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Everything you need to
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              vote with confidence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to empower every citizen with the knowledge they need to participate in democracy.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_20px_60px_-10px_hsl(142_76%_36%_/_0.2)]">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;