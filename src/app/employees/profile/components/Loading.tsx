export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-700">
          Loading your profile...
        </p>
        <p className="text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
}
