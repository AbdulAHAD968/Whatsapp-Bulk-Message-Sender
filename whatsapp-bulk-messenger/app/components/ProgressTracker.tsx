interface ProgressTrackerProps {
  total: number;
  progress: number;
  isSending: boolean;
}

export default function ProgressTracker({ total, progress, isSending }: ProgressTrackerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sending Progress</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Status:</span>
          <span className={isSending ? 'text-yellow-600 font-medium' : 'text-green-600 font-medium'}>
            {isSending ? 'Sending Messages...' : 'Ready'}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Numbers:</span>
          <span className="font-medium">{total}</span>
        </div>

        {isSending && (
          <>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress:</span>
              <span className="font-medium">{progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}