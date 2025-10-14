import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
        About VoteSmart Africa
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
        VoteSmart Africa is an AI-powered civic platform that promotes
        transparency, voter education, and data-driven governance across the
        continent. We leverage technology to provide citizens, observers, and
        policymakers with credible, real-time election insights.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            Empower Voters
          </h4>
          <p className="text-gray-700">
            Help citizens make informed decisions by providing verified
            information about candidates, manifestos, and election procedures.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            Strengthen Democracy
          </h4>
          <p className="text-gray-700">
            Enable transparent election monitoring and reporting powered by AI
            and crowdsourced data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            Build Trust
          </h4>
          <p className="text-gray-700">
            Rebuild public confidence in elections by ensuring data accuracy,
            transparency, and inclusivity in democratic processes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
