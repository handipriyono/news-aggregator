const EmptyData = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We apologize, but there are no news articles matching your search
          criteria.
        </p>
        <p className=" text-base leading-7 text-gray-600">
          Please try resetting the filter or adjusting your preferences at the
          <b> top-right corner.</b>
        </p>
      </div>
    </main>
  );
};

export default EmptyData;
