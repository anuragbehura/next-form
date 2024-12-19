import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  // If user is logged in then redrirect to dashboard
  if (user) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br flex flex-col items-center justify-center px-4 py-16">
      {/* Hero Section */}
      <main className="flex flex-col gap-10 md:flex-row items-center justify-center w-full max-w-6xl mx-auto space-y-12 md:space-y-0">
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Build Beautiful{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-700 text-transparent bg-clip-text">
              Forms
            </span>{" "}
            Effortlessly
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed">
            Next Form empowers you to create custom forms in seconds with a
            user-friendly interface and modern design options.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <SignInButton>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center transition-all duration-300">
                Start Building
                <ArrowRight size={18} className="ml-2" />
              </button>
            </SignInButton>
            <button className="px-6 py-3 rounded-full text-cyan-700 hover:bg-slate-300 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mt-16 w-full max-w-6xl text-center mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8">Why Choose Next Form?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy to Use",
              description:
                "Drag-and-drop form builder with intuitive controls.",
            },
            {
              title: "Customizable",
              description:
                "Personalize your forms with themes, fonts, and styles.",
            },
            {
              title: "Analytics",
              description:
                "Gain insights into form responses and user behavior.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
