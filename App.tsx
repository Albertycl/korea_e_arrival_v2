
import React, { useState, useEffect } from 'react';
import ArrivalCard from './components/ArrivalCard';
import GuideInfo from './components/GuideInfo';
import AdminPage from './components/AdminPage';
import { ArrivalCardData, AdminConfig, PurposeOfVisit } from './types';
import { INITIAL_CARD_DATA, EXAMPLE_CARD_DATA } from './constants';

type AppStep = 'guide' | 'practice' | 'admin';

function App() {
  const [cardData, setCardData] = useState<ArrivalCardData>(INITIAL_CARD_DATA);
  const [activeTab, setActiveTab] = useState<AppStep>('guide');
  const [simulatorStep, setSimulatorStep] = useState(0);

  // Check URL for custom configuration on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configRaw = params.get('c');
    if (configRaw) {
      try {
        const decoded = decodeURIComponent(atob(configRaw));
        const config: AdminConfig = JSON.parse(decoded);
        
        // Update INITIAL_CARD_DATA with these custom values
        setCardData(prev => ({
          ...prev,
          flightNumber: config.arrivalFlight,
          entryDate: config.arrivalDate,
          departureFlightNumber: config.departureFlight,
          departureDate: config.departureDate,
          detailAddress: config.hotelName,
          koreaAddressKr: config.hotelAddressKr,
          koreaAddress: config.hotelAddressEn,
          koreaPhone: config.hotelPhone
        }));
      } catch (e) {
        console.error("Failed to decode URL config", e);
      }
    }
  }, []);

  const handleCardChange = (field: keyof ArrivalCardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const loadExampleData = () => {
    setCardData(prev => ({ ...prev, ...EXAMPLE_CARD_DATA }));
    setSimulatorStep(3);
    setActiveTab('practice');
  };

  const startPractice = () => {
    setSimulatorStep(0);
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div onClick={() => setActiveTab('guide')} className="flex items-center gap-3 cursor-pointer">
              <div className="flex flex-col justify-center h-10 w-10 bg-korea-blue rounded-lg items-center text-white font-bold text-xs shadow-sm">
                 <span className="block">e</span>
                 <span className="block -mt-1">Card</span>
              </div>
              <div className="flex flex-col">
                 <h1 className="font-bold text-lg md:text-xl text-korea-blue tracking-tight leading-tight">
                   Korea e-Arrival Card
                 </h1>
                 <span className="text-[10px] text-gray-500 tracking-wider">電子入境卡填寫教學</span>
              </div>
            </div>
            <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'guide' ? 'bg-korea-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                教學指南
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'practice' ? 'bg-korea-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                填寫教學
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm transition-all ${activeTab === 'admin' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-200'}`}
                title="管理後台"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'guide' && (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-8">
               <div className="bg-gradient-to-r from-korea-blue to-blue-800 p-8 text-center md:text-left md:flex md:justify-between md:items-center">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">韓國電子入境卡教學</h1>
                    <p className="text-blue-100 text-sm md:text-base max-w-2xl">
                      本教學專門為您準備，將引導您完成韓國 e-Arrival Card 的填寫。<br/>
                      請參考下方的航班與飯店資訊進行填寫練習。
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0">
                      <button 
                        onClick={loadExampleData}
                        className="bg-white text-korea-blue px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        查看填寫範本 &rarr;
                      </button>
                  </div>
               </div>
            </div>
            {/* Pass cardData to GuideInfo so it reflects URL changes */}
            <GuideInfo customData={cardData} />
            <div className="text-center mt-12 mb-12">
               <button 
                onClick={startPractice}
                className="bg-korea-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
               >
                 <span>開始模擬填寫</span>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
               </button>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in-up">
            <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-gray-800">電子入境卡 (e-Arrival Card) 填寫模擬</h2>
               <div className="inline-flex items-center gap-2 bg-blue-50 text-korea-blue px-4 py-2 rounded-full mt-3 text-sm font-medium border border-blue-100 shadow-sm">
                  <span>✈️ 航班: {cardData.flightNumber}</span>
                  <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                  <span>🏨 飯店: {cardData.detailAddress}</span>
               </div>
               <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
                 {simulatorStep === 0 && "Step 1: 請點選「全部同意」按鈕。"}
                 {simulatorStep === 1 && "Step 2: 請填寫您的 Email 並點選「確認」。"}
                 {simulatorStep === 2 && "Step 3: 請點選相機圖示模擬拍照。"}
                 {simulatorStep >= 3 && "Step 4: 請依照上方資訊欄核對並填寫資料。"}
               </p>
            </div>
            
            <ArrivalCard 
              key={`sim-${simulatorStep}-${cardData.flightNumber}`} 
              data={cardData} 
              onChange={handleCardChange} 
              initialStep={simulatorStep} 
            />
          </div>
        )}

        {activeTab === 'admin' && <AdminPage />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 text-center">
          <p className="text-gray-400 text-sm">
            本頁面為教學專用，非官方申請頁面。
          </p>
          <p className="text-gray-300 text-xs mt-4">© 2024 Korea Travel Guide Helper.</p>
        </div>
      </footer>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
