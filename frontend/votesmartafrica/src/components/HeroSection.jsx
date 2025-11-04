import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Globe, CheckCircle } from "lucide-react";
import votingHero from "@/assets/votingn.jpg";

const Hero = () => {
  const handleGetStarted = () => {
    // Smooth scroll to features or open signup modal
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    // Smooth scroll to how-it-works section
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Enhanced gradient backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(22,163,74,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/10 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-400/20 to-green-500/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-green-600/10 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 shadow-lg shadow-green-200/50 text-sm font-semibold text-green-700 hover:scale-105 transition-transform duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <Shield className="w-4 h-4" />
            <span>Trusted by 500K+ Citizens Across Africa</span>
          </motion.div>

          {/* Enhanced Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            <span className="block text-gray-900 mb-2">Make every vote</span>
            <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              an informed choice
            </span>
          </motion.h1>

          {/* Enhanced Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered election assistant helping African citizens research candidates, understand policies, and participate confidently in democracy.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-[0_20px_60px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_25px_70px_-10px_rgba(22,163,74,0.7)] transition-all duration-300 text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl font-semibold tracking-wide w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleGetStarted}
              aria-label="Get started with free account"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </Button>
     
            <Button
              size="lg"
              variant="outline"
              className="group relative border-2 border-green-600 text-green-700 bg-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white hover:border-transparent text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl font-semibold transition-all duration-300 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              onClick={handleLearnMore}
              aria-label="Learn more about our platform"
            >
              <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              Learn More
            </Button>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-white shadow-md flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <span className="font-semibold text-gray-700">500K+ informed voters</span>
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-400" />
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-gray-700">Available in 12 African countries</span>
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-400" />
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-100 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-gray-700">95% satisfaction rate</span>
            </div>
          </motion.div>

          {/* Enhanced Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative pt-16"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(22,163,74,0.4)] border-2 border-green-200/50 bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm group">
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <img
                src={votingHero}
                alt="VoteSmart Africa Platform Interface"
                className="w-full h-auto relative z-10 rounded-3xl"
              />
              
              {/* Enhanced glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-green-500 rounded-tl-2xl opacity-50" />
              <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-green-500 rounded-br-2xl opacity-50" />
            </div>
            
            {/* Floating accents */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>
      </div>

      {/* Add these animations to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;