const ManageCourses = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gradient-to-b from-amber-50/40 to-transparent rounded-2xl">
      <div className="w-full max-w-2xl rounded-2xl border border-amber-200 bg-white p-6 md:p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 text-amber-900 text-xl md:text-2xl">
          🚀
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900">Coming Soon</h1>
        <p className="mt-3 text-sm md:text-base text-amber-800/80">
          Course management features are currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
};

export default ManageCourses;