// import { useState, useEffect } from 'react'
// import Confetti from 'react-confetti'
// import CandidateCard from './components/CandidateCard'
// import StatsModal from './components/StatsModal'
// import { useVisitorData } from './hooks/useVisitorData';
// import Modal from './components/Modal';

// // AUTOMATIC SWITCHING LOGIC
// const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
//   ? 'http://127.0.0.1:8000' // Development URL
//   : 'https://fresher-voting-backend.onrender.com'; // Production URL

// function App() {
//   const [activeCategory, setActiveCategory] = useState(null); 
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { visitorId } = useVisitorData();
  
//   const [modal, setModal] = useState({ message: '', type: '' });
//   const [isVoting, setIsVoting] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [votedIds, setVotedIds] = useState([]);
//   const [showStats, setShowStats] = useState(false);

//   const categories = ['KING', 'QUEEN', 'MISTER', 'MISS'];

//   const totalVotes = candidates.reduce((sum, c) => sum + c.vote_count, 0);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/api/candidates/`)
//       .then(res => res.json())
//       .then(data => {
//         setCandidates(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       });
//   }, []);

//   const toggleCategory = (cat) => {
//     if (activeCategory === cat) setActiveCategory(null);
//     else setActiveCategory(cat);
//   };

//   const handleVoteClick = async (candidateId) => {
//     if (!visitorId) {
//       setModal({ type: 'error', message: "Security check failed. Please refresh." });
//       return;
//     }
//     if (isVoting) return;

//     setIsVoting(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/vote/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ candidate_id: candidateId, device_id: visitorId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setModal({ type: 'success', message: "Vote Counted Successfully!" });
//         setCandidates(prev => prev.map(c => 
//           c.id === candidateId ? {...c, vote_count: c.vote_count + 1} : c
//         ));
//         setVotedIds(prev => [...prev, candidateId]);
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 5000);

//         const currentIndex = categories.indexOf(activeCategory);
        
//         // AUTO-ADVANCE LOGIC
//         if (currentIndex !== -1 && currentIndex < categories.length - 1) {
//            const nextCategory = categories[currentIndex + 1];
           
//            setTimeout(() => {
//              setActiveCategory(nextCategory);
//              setModal({ message: '', type: '' });
             
//              // ▼▼▼ THE FIX IS HERE ▼▼▼
//              // Scroll to the very top of the page smoothly
//              window.scrollTo({ top: 0, behavior: 'smooth' });
             
//            }, 800); // Keep your 800ms delay (or 1500ms if you prefer)
//         } 
//         else if (currentIndex === categories.length - 1) {
//            setTimeout(() => {
//              setActiveCategory(null);
//              setModal({ message: '', type: '' });
//              window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top even when finishing
//            }, 800);
//         }

//       } else {
//         setModal({ type: 'error', message: data.message || "Something went wrong." });
//       }

//     } catch (error) {
//       setModal({ type: 'error', message: "Network error. Server might be down." });
//     } finally {
//       setIsVoting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pb-10 bg-cyan-100 relative">
      
//       {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

//       {showStats && <StatsModal candidates={candidates} onClose={() => setShowStats(false)} />}

//       <nav className="bg-cyan-200 text-white p-4 shadow-lg sticky top-0 z-50">
//         <h1 className="text-2xl font-display font-extrabold text-cyan-900 text-center my-3 text-shadow-lg">MECHATRONICS ENGINEERING</h1>
//         <h1 className="text-xl font-display font-extrabold text-cyan-900 text-center my-3 text-shadow-md">2025-2026 FRESHER WELCOME</h1>
//         <div className="container mx-auto flex justify-between items-center mt-5">
//           <div>
//              <p className="text-xs font-display text-cyan-800 mt-1">
//                {loading ? '...' : `${totalVotes} total votes`}
//              </p>
//           </div>
//           <div className='text-s font-display text-cyan-900'>
//             12.1.2026
//           </div>
//           <div className="text-xs font-display bg-green-500 text-white px-2 py-1 rounded-full font-bold uppercase animate-pulse">
//             Live
//           </div>

//         </div>
//       </nav>

//       <div className="container mx-auto mt-6 px-4 max-w-lg space-y-4">
//            {categories.map((cat) => {
//              const isOpen = activeCategory === cat;
//              const catCandidates = candidates.filter(c => c.category.startsWith(cat));

//              return (
//                <div key={cat} className=" rounded-xl shadow-md overflow-hidden border border-gray-200">
//                  <button 
//                    onClick={() => toggleCategory(cat)}
//                    className={`w-full p-5 flex justify-between items-center transition-colors
//                      ${isOpen ? 'bg-cyan-300 rounded' : 'bg-white hover:bg-gray-50'}`}
//                  >
//                    <div className="flex items-center gap-3">
//                     <img 
//                       src={`/icons/${cat.toLowerCase()}.png`} 
//                       alt={cat} 
//                       className="w-10 h-10 object-contain" 
//                     />
//                      <span className={`font-display font-extrabold text-lg ${isOpen ? 'text-blue-800' : 'text-gray-700'}`}>
//                        {cat}
//                      </span>
//                    </div>
//                    <span className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
//                  </button>

//                  {isOpen && (
//                    <div className="p-4 bg-gray-50 border-t border-gray-100">
//                      {loading ? (
//                        <div className="text-center py-4 text-gray-400">Loading...</div>
//                      ) : (
//                        <div className="grid grid-cols-1 gap-4">
//                          {catCandidates.map(person => (
//                            <CandidateCard 
//                              key={person.id} 
//                              candidate={person} 
//                              onVote={handleVoteClick} 
//                              hasVoted={votedIds.includes(person.id)}
//                            />
//                          ))}
//                        </div>
//                      )}
//                    </div>
//                  )}
//                </div>
//              )
//            })}
//         <div className="mt-4 text-center">
//               <button onClick={() => setShowStats(true)} className="p-2 font-display rounded bg-cyan-300 text-cyan-700 hover:text-blue-500 shadow-lg">
//                   View Results
//               </button>
//         </div>
//       </div>

//       <footer className="mt-12 text-center text-gray-400 text-xs pb-8">
//         <p class='mb-5 mx-10 text-red-500 font-display text-md'>This is a demo voting, and all votes will be removed once the event start.</p>
//         <p className='my-2 font-display'>Technological University Mandalay(TUM)</p>
//         <p className='my-2 font-display'>© 2026 Mechatronics Engineering Department</p>

//       </footer>

//       {modal.message && (
//         <Modal message={modal.message} type={modal.type} onClose={() => setModal({ message: '', type: '' })} />
//       )}
//     </div>
//   )
// }


// export default App


import { useState } from 'react'
import Confetti from 'react-confetti'

function App() {
    const MANUAL_RESULTS = [

    {
      title: "KING",
      burmeseTitle: "King",
      icon: "/icons/king.png",
      winnerName: "?", 
      candidateNo: "?",         
      subtext: "? votes",
      color: "from-yellow-300 to-yellow-600", 
      textColor: "text-yellow-400"
    },
    // 2. QUEEN (Gold)
    {
      title: "QUEEN",
      burmeseTitle: "Queen",
      icon: "/icons/queen.png",
      winnerName: "?", 
      candidateNo: "?",   
      subtext: "? Votes",
      color: "from-yellow-300 to-yellow-600", 
      textColor: "text-yellow-400"
    },
    {
      title: "MISTER",
      burmeseTitle: "Mister",
      icon: "/icons/mister.png",
      winnerName: "?", 
      candidateNo: "?",      
      subtext: "? Votes",
      color: "from-yellow-300 to-yellow-600", 
      textColor: "text-yellow-400"
    },
    {
      title: "MISS",
      burmeseTitle: "Miss",
      icon: "/icons/miss.png",
      winnerName: "?", 
      candidateNo: "?", 
      subtext: "? Votes",
      color: "from-yellow-300 to-yellow-600",
      textColor: "text-yellow-400"
    },
    {
      title: "PRINCE",
      burmeseTitle: "Prince",
      icon: "/icons/king.png",       
      winnerName: "?", 
      candidateNo: "?",             
      subtext: "? Votes",
      color: "from-gray-300 to-gray-500", 
      textColor: "text-gray-300"
    },
    {
      title: "PRINCESS",
      burmeseTitle: "Princess",
      icon: "/icons/queen.png",  
      winnerName: "?", 
      candidateNo: "?",  
      subtext: "? Votes",
      color: "from-gray-300 to-gray-500", 
      textColor: "text-gray-300"
    },
    {
      title: "POPULAR MISTER",
      burmeseTitle: "Popular Mister",
      icon: "/icons/mister.png",
      winnerName: "?", 
      candidateNo: "?",
      subtext: "? Votes",
      color: "from-purple-400 to-pink-600",
      textColor: "text-purple-400"
    },
    // 8. POPULAR MISS (Purple)
    {
      title: "POPULAR MISS",
      burmeseTitle: "Popular Vote",
      icon: "/icons/miss.png",
      winnerName: "?", 
      candidateNo: "?",
      subtext: "? Votes",
      color: "from-purple-400 to-pink-600", 
      textColor: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 pb-20 relative overflow-x-hidden font-sans">
      
      {/* Celebration Effect */}
      <Confetti numberOfPieces={200} gravity={0.04} />

      {/* Header */}
      <header className="text-center pt-16 pb-12 px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 tracking-wider drop-shadow-2xl mb-4 font-display">
          Voting Results
        </h1>
        <p className="text-slate-300 text-lg tracking-widest uppercase font-light">
          Fresher Welcome 2025-2026
        </p>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
      </header>

      {/* Winners Grid */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {MANUAL_RESULTS.map((person, index) => (
            <div 
              key={index}
              className="relative group perspective-1000"
            >
              {/* Glowing Background Animation */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${person.color} rounded-2xl blur opacity-30 group-hover:opacity-80 transition duration-500`}></div>
              
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 flex items-center gap-5 shadow-2xl">
                
                {/* Left: Icon Circle */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${person.color} p-1 shadow-lg`}>
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center border-4 border-transparent">
                     <img 
                       src={person.icon} 
                       alt={person.title} 
                       className="w-12 h-12 object-contain" 
                     />
                  </div>
                </div>

                {/* Right: Text Info */}
                <div className="flex-1 min-w-0">
                  {/* Title (King, Queen, etc) */}
                  <div className={`text-xl font-black font-display uppercase tracking-widest mb-1 ${person.textColor}`}>
                    {person.title}
                  </div>
                  
                  {/* Name */}
                  <h2 className="text-md md:text-3xl font-bold text-white mb-2 truncate font-display">
                    {person.winnerName}
                  </h2>
                  
                  {/* Badge Info */}
                  <div className="flex items-center gap-3 text-slate-400 text-xs md:text-sm">
                    <span className="px-2 py-1 bg-slate-700 rounded text-slate-200 font-mono border border-slate-600">
                      No.{person.candidateNo}
                    </span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="uppercase tracking-wide opacity-75">{person.subtext}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      <footer className="mt-24 text-center text-slate-500 text-sm pb-10">
        <p className="mt-2 text-xs ">Department of Mechatronics Engineering</p>
      </footer>

    </div>
  )
}

export default App