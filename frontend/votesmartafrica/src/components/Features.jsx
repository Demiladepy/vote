import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, MapPin, CheckCircle, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Candidate Comparison",
    description: "Side-by-side analysis of candidates' policies, track records, manifestos, and voting history. Make informed decisions based on facts, not promises.",
    gradient: "from-green-500 to-emerald-600",
    darkGradient: "from-gray-900 to-gray-800",
  },
  {
    icon: MapPin,
    title: "Polling Station Guidance",
    description: "Find your nearest polling station, get directions, and receive timely reminders for registration deadlines and election day.",
    gradient: "from-emerald-500 to-teal-600",
    darkGradient: "from-gray-800 to-slate-900",
  },
  {
    icon: CheckCircle,
    title: "Fact-Checking & Verification",
    description: "Combat misinformation with AI-powered fact-checking of election news, candidate claims, and viral social media content.",
    gradient: "from-teal-500 to-green-600",
    darkGradient: "from-slate-900 to-gray-900",
  },
  {
    icon: MessageSquare,
    title: "Contextual Q&A Assistant",
    description: "Get instant answers about voting eligibility, procedures, rights, and local election rules in your preferred language.",
    gradient: "from-green-600 to-emerald-700",
    darkGradient: "from-gray-900 to-black",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-green-50/30">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-400/20 to-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-900/5 to-green-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-sm font-semibold text-green-700">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Everything you need to
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              vote with confidence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                {/* Dark accent bar on left */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${feature.darkGradient} group-hover:w-2 transition-all duration-500`} />
                
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon with dual-tone background */}
                <div className="relative mb-6 inline-flex">
                  {/* Black background layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Icon container */}
                  <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom right corner accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-3xl`} />
              </div>

              {/* External glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
            <span>Explore All Features</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;