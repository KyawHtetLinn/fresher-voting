import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

function StatsModal({ candidates, onClose }) {
  // 1. Sort Data: Highest votes at the top
  const sortedData = [...candidates].sort((a, b) => b.vote_count - a.vote_count);

  // 2. Calculate Dynamic Height: 60px per candidate (prevents squishing)
  const dynamicHeight = Math.max(sortedData.length * 60, 400); 

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      
      {/* Container Box */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold font-display text-gray-800">📊 Live Results</h2>
            <p className="text-xs text-gray-500 font-body">Real-time vote counting</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Scrollable Chart Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div style={{ height: `${dynamicHeight}px`, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={sortedData} 
                layout="vertical" 
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                
                {/* X-Axis (Vote Numbers) - Hidden but controls scale */}
                <XAxis type="number" hide />
                
                {/* Y-Axis (Names) - Increased width for Burmese names */}
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={140} 
                  tick={{ fontSize: 13, fontFamily: 'Poppins, sans-serif', fill: '#374151' }} 
                  interval={0} // Force show ALL names
                />
                
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                
                {/* The Bars */}
                <Bar dataKey="vote_count" barSize={30} radius={[0, 6, 6, 0]}>
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : index === 2 ? '#fbbf24' : '#3b82f6'} 
                    />
                  ))}
                  {/* Show Vote Count Number at the end of the bar */}
                </Bar>
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-400">
           Top candidate is highlighted in Red
        </div>

      </div>
    </div>
  )
}

export default StatsModal