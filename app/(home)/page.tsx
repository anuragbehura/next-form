import { ArrowRight } from "lucide-react";
import Image from "next/image";
import task from "@/public/task.png"
// import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <main className="flex flex-col gap-6 md:flex-row items-center justify-center w-full max-w-6xl mt-12 mx-auto">
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Build Beautiful{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-700 text-transparent bg-clip-text">
              Forms
            </span>{" "}
            Effortlessly
          </h1>
          <p className="text-lg text-gray-600">
            Next Form empowers you to create custom forms in seconds with a
            user-friendly interface and modern design options.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <SignInButton>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center">
              Start Building
              <ArrowRight size={18} className="ml-2" />
            </button>
            </SignInButton>
            <button className=" px-6 py-3 rounded-full text-cyan-700 bg-slate-200">
              Learn More
            </button>
          </div>
        </div>
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src={task}
            alt="task"
            priority
            width={600}
            height={600}
            className="rounded-xl"
          />
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mt-16 w-full max-w-6xl text-center mx-auto"
      >
        <h2 className="text-3xl font-bold">
          Why Choose Next Form?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className=" p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Easy to Use</h3>
            <p className="text-gray-600 mt-4">
              Drag-and-drop form builder with intuitive controls.
            </p>
          </div>
          <div className=" p-6 rounded-lg">
            <h3 className="text-xl font-semibold">
              Customizable
            </h3>
            <p className="text-gray-600 mt-4">
              Personalize your forms with themes, fonts, and styles.
            </p>
          </div>
          <div className=" p-6 rounded-lg">
            <h3 className="text-xl font-semibold">Analytics</h3>
            <p className="text-gray-600 mt-4">
              Gain insights into form responses and user behavior.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
