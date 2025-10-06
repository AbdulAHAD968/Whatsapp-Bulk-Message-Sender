interface NumberListProps {
  numbers: string[];
  setNumbers: (numbers: string[]) => void;
}

export default function NumberList({ numbers, setNumbers }: NumberListProps) {
  const removeNumber = (index: number) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
  };

  const clearAll = () => {
    setNumbers([]);
  };

  if (numbers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Phone Numbers</h2>
        <p className="text-gray-500 text-center py-4">No numbers added yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Phone Numbers</h2>
        <button
          onClick={clearAll}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {numbers.map((number, index) => (
          <div
            key={`${number}-${index}`}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span className="font-mono text-sm">{number}</span>
            <button
              onClick={() => removeNumber(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}