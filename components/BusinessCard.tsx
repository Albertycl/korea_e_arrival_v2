
import React from 'react';

const BusinessCard: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto">
      {/* Friendly Introduction Message */}
      <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-orange-600 text-xs font-bold mb-3">
          ✨ 專屬貼心服務
        </div>
        <p className="text-gray-600 font-medium leading-relaxed">
          本教學網頁由 <span className="text-orange-600 font-bold">百威旅遊 林宜樺 (Yvonne)</span> 為您貼心製作。<br />
          希望能幫助您順利完成韓國入境申報！如有任何行程規劃或訂購需求，歡迎隨時聯繫。
        </p>
      </div>

      {/* Digital Business Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-8 text-left transition-all hover:shadow-2xl hover:-translate-y-1 relative group">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:bg-orange-100 opacity-50"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Direct Sales Dept. Sales
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                直售部 業務
              </span>
            </div>
            <h4 className="text-3xl font-black text-gray-800 tracking-tight">林宜樺 <span className="text-lg font-medium text-gray-400 ml-1">Yvonne</span></h4>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <div className="text-orange-500 font-black text-3xl leading-none tracking-tighter">BWT</div>
              <div className="h-8 w-px bg-gray-200 mx-1"></div>
              <div className="text-right">
                <div className="text-orange-500 font-bold text-xl leading-none tracking-tight">百威旅遊</div>
                <div className="text-[8px] text-orange-400 font-bold tracking-[0.2em] uppercase mt-0.5">Best Way Travel</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-8 relative z-10">
          <div className="flex items-center gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-orange-50 group-hover/item:text-orange-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Mobile</p>
              <p className="text-base font-bold text-gray-700">0960-757415</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-orange-50 group-hover/item:text-orange-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Email</p>
              <p className="text-base font-bold text-gray-700">yvonne@bwt.com.tw</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-green-50 group-hover/item:text-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.691-5.383-10.304-12-10.304s-12 4.613-12 10.304c0 5.09 4.274 9.319 10.069 10.142l-1.181 3.543 4.14-2.304c.321.015.645.022.972.022 6.617 0 12-4.613 12-10.304z"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Line ID</p>
              <p className="text-base font-bold text-gray-700">yvonne0105</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Website</p>
              <p className="text-base font-bold text-orange-500">www.bwt.com.tw</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-4 text-[10px]">
          <div className="text-gray-400 leading-relaxed font-medium">
            <p className="text-gray-600 font-bold mb-1">百威旅行社股份有限公司 <span className="text-gray-200 mx-2">|</span> 統編 70398284</p>
            <p>10595台北市松山區復興北路57號7樓</p>
            <p className="mt-1">TEL: 02-2772-3388 <span className="text-gray-200 mx-2">|</span> FAX: 02-2752-9900</p>
          </div>
          <div className="flex items-end">
            <a 
              href="https://line.me/ti/p/yvonne0105" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-xs shadow-lg shadow-green-200 transition-all flex items-center gap-2 active:scale-95"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10.304c0-5.691-5.383-10.304-12-10.304s-12 4.613-12 10.304c0 5.09 4.274 9.319 10.069 10.142l-1.181 3.543 4.14-2.304c.321.015.645.022.972.022 6.617 0 12-4.613 12-10.304z"/></svg>
              立即加 LINE 諮詢
            </a>
          </div>
        </div>
      </div>
      
      {/* Visual Badge */}
      <div className="mt-8 flex justify-center opacity-30">
        <div className="px-4 py-1 border-y border-gray-300 text-[10px] uppercase tracking-[0.5em] text-gray-500 font-black">
          Best Way Travel Service
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
