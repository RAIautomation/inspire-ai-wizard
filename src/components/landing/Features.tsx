
export const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-in fade-in-50 [--animation-delay:400ms]">
      <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
        <h3 className="text-lg font-semibold text-violet-900 mb-2">Smart Generation</h3>
        <p className="text-gray-600">Advanced AI algorithms create optimized prompts tailored to your needs</p>
      </div>
      <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
        <h3 className="text-lg font-semibold text-violet-900 mb-2">History Tracking</h3>
        <p className="text-gray-600">Keep track of all your generated prompts and reuse them anytime</p>
      </div>
      <div className="p-6 rounded-xl bg-white shadow-sm border border-violet-100">
        <h3 className="text-lg font-semibold text-violet-900 mb-2">Easy Sharing</h3>
        <p className="text-gray-600">Copy and share your prompts with one click</p>
      </div>
    </div>
  );
};
