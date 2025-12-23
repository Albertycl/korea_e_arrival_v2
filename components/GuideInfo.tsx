import React from 'react';
import { GUIDE_SECTIONS } from '../constants';

const GuideInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      
      {/* Flight Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-2 h-full bg-korea-blue"></div>
         <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
           <span className="text-2xl">✈️</span> 您的行程資訊 (請填寫於表格中)
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                 <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">ARRIVAL FLIGHT (入境航班)</span>
                 <div className="text-2xl font-black text-blue-900 mt-1">LJ 764</div>
                 <div className="text-sm font-medium text-blue-700">2024/01/02</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DEPARTURE FLIGHT (出境航班)</span>
                 <div className="text-2xl font-black text-gray-800 mt-1">LJ 763</div>
                 <div className="text-sm font-medium text-gray-500">2024/01/06</div>
              </div>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 flex flex-col justify-center">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ADDRESS IN KOREA (韓國地址)</span>
               <div className="text-xl font-bold text-gray-800 mt-2">Hotel The One</div>
               <div className="text-[12px] font-medium text-gray-600 mt-3 space-y-2">
                  <p className="border-l-2 border-korea-blue pl-2 leading-relaxed">
                    <span className="block text-gray-400 text-[10px] uppercase">韓文地址</span>
                    제주특별자치도 제주시 연동 사장3길 33
                  </p>
                  <p className="border-l-2 border-gray-300 pl-2 leading-relaxed">
                    <span className="block text-gray-400 text-[10px] uppercase">英文地址</span>
                    33, Sajang 3-gil, Jeju-si, Jeju-do
                  </p>
                  <p className="border-l-2 border-red-300 pl-2 leading-relaxed">
                    <span className="block text-gray-400 text-[10px] uppercase">電話 (Phone)</span>
                    +82 64-798-0001
                  </p>
               </div>
            </div>
         </div>
         <div className="mt-4 text-[11px] text-gray-400 italic">
           * 填寫時，請先點擊「地址查詢」並輸入以上韓文地址。
         </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-korea-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">i</span>
        申報流程與說明
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {GUIDE_SECTIONS.map((section, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-lg border shadow-sm transition-all hover:shadow-md ${section.highlight ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
          >
            <h3 className={`text-lg font-bold mb-3 ${section.highlight ? 'text-korea-blue' : 'text-gray-800'}`}>
              {section.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg flex gap-4 shadow-sm">
        <div className="text-3xl animate-pulse">⚠️</div>
        <div>
           <h3 className="font-bold text-yellow-800 mb-1">重要提醒</h3>
           <p className="text-sm text-yellow-700 leading-relaxed">
             完成線上填寫後，請務必將<strong>「申報完成畫面」截圖</strong>或是將 Email 收到的確認信存於手機中。
             入境通關時，請主動出示該畫面給移民官查看，即可免填紙本入境卡。
           </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
         <a 
           href="https://www.e-arrivalcard.go.kr/portal/apply/agreementPolicy.do?applyType=P" 
           target="_blank" 
           rel="noreferrer"
           className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-korea-blue hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
         >
           前往官方網站填寫 (Official Site) &rarr;
         </a>
         <p className="mt-4 text-xs text-gray-400">點擊將開啟外部官方連結，請使用電腦或手機瀏覽器開啟</p>
      </div>

    </div>
  );
};

export default GuideInfo;