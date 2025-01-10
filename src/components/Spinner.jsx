function Spinner() {
  return (
    <div className="flex justify-center spinner">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
