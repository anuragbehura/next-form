import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  // If user is logged in then redirect to dashboard
  if (user) {
    redirect("/dashboard")
  }
  return (
    // Updated: Subtle background gradient and cleaner padding
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Subtle Background Effect - inspired by the FormWise image */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
        <div className="w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob absolute top-0 left-0"></div>
        <div className="w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob absolute top-0 right-0 animation-delay-2000"></div>
        <div className="w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob absolute bottom-0 left-1/3 animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <main className="flex flex-col gap-10 items-center justify-center w-full max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-6 max-w-4xl">
          <p className="text-sm font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400">
            The smartest form builder for modern teams
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none dark:text-white">
            Forms that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-600">think ahead.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed pt-4">
            Next Form helps SaaS teams build smarter onboarding, qualification, and workflow forms with AI-powered logic, real-time analytics, and enterprise-grade integrations.
          </p>
          <div className="flex space-x-4 justify-center pt-4">
            <SignInButton>
              {/* Updated: Button style to match inspiration - rounded, prominent blue, with a subtle hover effect */}
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 flex items-center transition-all duration-300 transform hover:scale-[1.02]">
                Build your first form
                <ArrowRight size={20} className="ml-2" />
              </button>
            </SignInButton>
            {/* Learn More button updated to be a cleaner link style */}
            <button className="px-8 py-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 font-semibold">
              Watch a demo
            </button>
          </div>
        </div>

        {/* Feature Mockup (Simulated with a placeholder image, assuming you'll replace this with a FormWise-like UI screenshot later) */}
        <div className="mt-20 w-full max-w-6xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mt-32 w-full max-w-6xl text-center mx-auto relative z-10"
      >
        <h2 className="text-4xl font-bold mb-16 dark:text-white">Why Choose Next Form?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            {
              title: "Easy to Use",
              description:
                "Drag-and-drop form builder with intuitive controls. Create complex forms in minutes, not hours.",
            },
            {
              title: "Customizable",
              description:
                "Personalize your forms with themes, fonts, styles, and advanced branding options to match your look.",
            },
            {
              title: "Analytics",
              description:
                "Gain deep insights into form responses, submission rates, and user behavior with real-time reporting.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              // Updated: Feature card style for a cleaner look
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl dark:hover:shadow-2xl hover:border-indigo-400 dark:bg-gray-900"
            >
              <h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}