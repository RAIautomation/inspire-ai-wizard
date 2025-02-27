
import { CircleCheckBig, HistoryIcon, Share2 } from "lucide-react";

export const Features = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in-50 [--animation-delay:300ms]">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Our Prompt Generator?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers everything you need to create, manage, and share AI prompts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 animate-in fade-in-50 [--animation-delay:400ms]">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl border border-violet-100 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-14 w-14 rounded-full bg-violet-100 flex items-center justify-center mb-6">
              <CircleCheckBig className="h-7 w-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold text-violet-900 mb-3">Smart Generation</h3>
            <p className="text-gray-600">Advanced AI algorithms create optimized prompts tailored to your specific needs and requirements</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl border border-violet-100 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-14 w-14 rounded-full bg-violet-100 flex items-center justify-center mb-6">
              <HistoryIcon className="h-7 w-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold text-violet-900 mb-3">History Tracking</h3>
            <p className="text-gray-600">Keep track of all your generated prompts and reuse them anytime you need them</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-xl border border-violet-100 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">
            <div className="h-14 w-14 rounded-full bg-violet-100 flex items-center justify-center mb-6">
              <Share2 className="h-7 w-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold text-violet-900 mb-3">Easy Sharing</h3>
            <p className="text-gray-600">Copy and share your prompts with one click for seamless collaboration</p>
          </div>
        </div>
      </div>
    </div>
  );
};
