const Step3 = ({ formData, prevStep, handleFinalSubmit }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="bg-gray-50 rounded-[2.5rem] p-6 sm:p-12 w-full max-w-2xl flex flex-col items-center">

        <div className="w-full sm:max-w-md mb-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">Review Profile</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Double check before finalizing</p>
        </div>

        <div className="w-full sm:max-w-md bg-white py-8 px-6 shadow-xl border border-gray-100 rounded-2xl">
          <div className="space-y-6">

            {/* Personal Section */}
            <section>
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Personal</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="font-semibold text-gray-900">{formData.name}</span>
                <span className="text-gray-500">Gender:</span>
                <span className="font-semibold text-gray-900 capitalize">{formData.gender}</span>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Academic Section */}
            <section>
              <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Academic</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">LRN:</span>
                <span className="font-semibold text-gray-900">{formData.lrn}</span>
                <span className="text-gray-500">Course:</span>
                <span className="font-semibold text-gray-900">{formData.course}</span>
              </div>
            </section>

            <div className="pt-6 flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3