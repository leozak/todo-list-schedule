const Debug = ({ info }) => {
  return (
    <div
      id="debug"
      className="absolute bottom-6 right-6 p-6 min-w-xs text-gray-200 bg-stone-600 rounded-2xl shadow-stone-900 shadow-xl"
    >
      <h1 className="font-bold mb-2">Debug</h1>
      {info}
    </div>
  );
};

export default Debug;
