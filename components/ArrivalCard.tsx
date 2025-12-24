import React, { useState, useEffect } from 'react';
import { ArrivalCardData, PurposeOfVisit } from '../types';
import { PURPOSE_OPTIONS, FIELD_GUIDES } from '../constants';

interface ArrivalCardProps {
   data: ArrivalCardData;
   onChange: (field: keyof ArrivalCardData, value: string) => void;
   initialStep?: number;
}

const ArrivalCard: React.FC<ArrivalCardProps> = ({ data, onChange, initialStep = 0 }) => {
   const [step, setStep] = useState(initialStep);
   const [agreed, setAgreed] = useState(false);
   const [focusedField, setFocusedField] = useState<string | null>(null);
   const [showConfetti, setShowConfetti] = useState(false);
   const [confirmEmail, setConfirmEmail] = useState(data.email || '');
   const [isScanning, setIsScanning] = useState(false);
   const [scanComplete, setScanComplete] = useState(false);

   useEffect(() => {
      if (data.email !== undefined && confirmEmail === '' && data.email !== '') {
         setConfirmEmail(data.email);
      }
   }, [data.email]);

   useEffect(() => {
      if (initialStep > 0) {
         setStep(initialStep);
         setAgreed(true);
      }
   }, [initialStep]);

   useEffect(() => {
      if (step === 4) {
         setShowConfetti(true);
         window.scrollTo({ top: 0, behavior: 'smooth' });
         const timer = setTimeout(() => setShowConfetti(false), 5000);
         return () => clearTimeout(timer);
      }
   }, [step]);

   const handleChange = (field: keyof ArrivalCardData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(field, e.target.value);
   };

   const handleNext = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep(prev => prev + 1);
   };

   const handlePrev = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep(prev => prev - 1);
   };

   const handlePassportScan = () => {
      setIsScanning(true);
      setTimeout(() => {
         setIsScanning(false);
         setScanComplete(true);
      }, 2000);
   };

   const GuidePanel = () => {
      if (!focusedField || step !== 3) return null;
      const guide = FIELD_GUIDES[focusedField];
      if (!guide) return null;

      return (
         <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-8 md:bottom-8 md:w-80 bg-korea-blue text-white p-6 shadow-2xl z-50 md:rounded-2xl rounded-t-2xl animate-slide-in-right border-t-4 border-yellow-400">
            <div className="flex items-start gap-4">
               <div className="text-4xl animate-bounce-gentle">{guide.icon}</div>
               <div>
                  <h4 className="font-bold text-yellow-300 text-lg mb-1">💡 小幫手教您填：</h4>
                  <p className="text-white text-lg font-medium leading-relaxed">{guide.desc}</p>
               </div>
            </div>
            <button onClick={() => setFocusedField(null)} className="absolute top-2 right-2 text-blue-200 hover:text-white">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
      );
   };

   const redInputStyle = "border-2 border-red-500 rounded px-3 py-1.5 text-sm w-full focus:ring-1 focus:ring-blue-500 outline-none font-medium";
   const redSelectStyle = "border-2 border-red-500 rounded px-2 py-1.5 text-sm w-full bg-white font-medium outline-none";

   if (step === 0) {
      return (
         <div className="w-full max-w-4xl mx-auto font-sans animate-pop-in">
            <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-100">
               <div className="p-10 space-y-8">
                  <div className="bg-blue-50 border-l-4 border-[#0047A0] p-4 rounded-r shadow-sm">
                     <p className="text-[#0047A0] font-bold text-lg flex items-center gap-2">
                        <span className="text-2xl">💡</span> 填寫教學：請點選下方框內的「全部同意」按鈕。
                     </p>
                  </div>
                  <div className="text-center relative py-4">
                     <h2 className="text-3xl font-bold text-gray-800 tracking-tight">同意電子入境申報單條款</h2>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6 flex items-center gap-6 bg-white shadow-sm hover:border-[#0047A0] transition-colors cursor-pointer" onClick={() => setAgreed(!agreed)}>
                     <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${agreed ? 'bg-[#0047A0] border-[#0047A0]' : 'bg-white border-gray-400'}`}>
                        {agreed && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                     </div>
                     <label className="text-xl font-bold text-gray-700 cursor-pointer">全部同意</label>
                  </div>
                  <div className="pt-8">
                     <button onClick={handleNext} disabled={!agreed} className={`w-full py-4 rounded-sm font-bold text-lg transition-all shadow-md ${agreed ? 'bg-[#0047A0] text-white hover:bg-blue-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                        下一步 (Next)
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (step === 1) {
      const canProceed = data.email === confirmEmail;
      return (
         <div className="w-full max-w-4xl mx-auto font-sans animate-slide-in-right">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
               <div className="bg-korea-blue px-6 py-6 border-b border-blue-800"><h3 className="font-bold text-white text-2xl">第二步：填寫電子信箱</h3></div>
               <div className="p-8">
                  <div className="bg-blue-50 border-l-8 border-[#0047A0] p-6 mb-8 rounded-r-xl">
                     <h4 className="font-bold text-[#0047A0] text-xl mb-2">✨ 請輸入你常用的電子信箱</h4>
                     <p className="text-gray-700 text-lg font-medium">申報結果會寄送到這個信箱。</p>
                  </div>
                  <div className="max-w-2xl mx-auto space-y-8">
                     <div>
                        <label className="block text-xl font-bold text-gray-800 mb-3">您的電子信箱 (E-mail)</label>
                        <input type="email" value={data.email} onChange={handleChange('email')} placeholder="請輸入你常用的電子信箱" className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-xl px-5 py-4 text-xl outline-none focus:border-korea-blue placeholder-gray-400" />
                     </div>
                     <div>
                        <label className="block text-xl font-bold text-gray-800 mb-3">請再填一次 (確認用)</label>
                        <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder="請輸入跟上面一樣的 Email" className={`w-full border-2 rounded-xl px-5 py-4 text-xl outline-none bg-gray-700 text-white border-gray-600 focus:border-korea-blue`} />
                     </div>
                     <div className="pt-6">
                        <button onClick={handleNext} disabled={!canProceed} className={`w-full py-5 rounded-2xl font-bold text-2xl transition-all shadow-lg ${canProceed ? 'bg-korea-blue text-white hover:bg-blue-800 animate-pulse-slow' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>確認，下一步 (Confirm) &rarr;</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (step === 2) {
      return (
         <div className="w-full max-w-4xl mx-auto font-sans animate-slide-in-right">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
               <div className="bg-korea-blue px-6 py-6 border-b border-blue-800"><h3 className="font-bold text-white text-2xl">第三步：上傳護照 (練習)</h3></div>
               <div className="p-10 flex flex-col items-center">
                  {!isScanning && !scanComplete && (
                     <div className="w-full max-w-xl border-4 border-dashed border-gray-400 rounded-3xl p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer" onClick={handlePassportScan}>
                        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg mb-6"><span className="text-6xl">📷</span></div>
                        <h4 className="text-3xl font-bold text-gray-800 mb-3">點這裡模擬拍照</h4>
                     </div>
                  )}
                  {isScanning && <div className="w-full max-w-xl h-72 border-2 border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden"><p className="text-white font-mono text-2xl animate-pulse font-bold">掃描中...</p></div>}
                  {scanComplete && <div className="w-full max-w-xl animate-pop-in"><button onClick={handleNext} className="w-full bg-korea-blue text-white py-5 rounded-2xl font-bold text-2xl hover:bg-blue-800 shadow-xl animate-pulse-slow">下一步：核對資料 &rarr;</button></div>}
               </div>
            </div>
         </div>
      );
   }

   // --- STEP 4: SUCCESS SUMMARY SCREEN (MIMICKING OFFICIAL UI) ---
   if (step === 4) {
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + 3);

      const formatDate = (date: Date) => {
         const y = date.getFullYear();
         const m = String(date.getMonth() + 1).padStart(2, '0');
         const d = String(date.getDate()).padStart(2, '0');
         return `${y}-${m}-${d} 15:34`;
      };

      const submissionTime = formatDate(today);
      const expiryTime = formatDate(expiryDate);

      return (
         <div className="w-full max-w-5xl mx-auto font-sans animate-pop-in bg-white shadow-xl p-8 border border-gray-200 text-gray-800">
            <div className="text-center mb-10">
               <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-blue-400 rotate-45"></div>
                  <h2 className="text-3xl font-medium text-gray-900 tracking-tight">电子入境申报单提交完毕</h2>
               </div>

               <div className="bg-[#f2f7ff] p-6 rounded border border-[#e1ecff] inline-block text-left w-full max-w-4xl">
                  <p className="text-lg mb-2">这是 <span className="text-[#0047A0] underline font-bold">{data.familyName} {data.givenName}</span> 先生/女士电子入境申报单提交现况。</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                     电子入境申报单提交完毕。 <br />
                     已提交的电子入境申报单截止到 <span className="text-red-500 font-bold">{expiryTime.split(' ')[0]} 15:34</span> 有效。请确认内容，如果信息错误，请修改。
                  </p>
               </div>
            </div>

            {/* Basic Info Table */}
            <div className="mb-10">
               <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-black text-lg text-gray-800">基本信息</h3>
               </div>
               <div className="border-t-2 border-[#0047A0] text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                     <div className="flex border-r border-gray-200">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">签发编号</div>
                        <div className="flex-1 p-3 text-gray-500">EAC-2025060601</div>
                     </div>
                     <div className="flex">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">国家/地区</div>
                        <div className="flex-1 p-3">{data.nationality}</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                     <div className="flex border-r border-gray-200">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">姓 (护照上)</div>
                        <div className="flex-1 p-3 font-bold">{data.familyName}</div>
                     </div>
                     <div className="flex">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">名 (护照上)</div>
                        <div className="flex-1 p-3 font-bold">{data.givenName}</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                     <div className="flex border-r border-gray-200">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">出生日期</div>
                        <div className="flex-1 p-3">{data.birthYear}-{data.birthMonth}-{data.birthDay}</div>
                     </div>
                     <div className="flex">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">性别</div>
                        <div className="flex-1 p-3">{data.gender === 'M' ? '男' : '女'}</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                     <div className="flex border-r border-gray-200">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">护照号</div>
                        <div className="flex-1 p-3">{data.passportNumber}</div>
                     </div>
                     <div className="flex">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">护照期满日</div>
                        <div className="flex-1 p-3">{data.passportExpiryYear}-{data.passportExpiryMonth}-{data.passportExpiryDay}</div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
                     <div className="flex border-r border-gray-200">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">提交时间</div>
                        <div className="flex-1 p-3">{submissionTime}</div>
                     </div>
                     <div className="flex">
                        <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-100">期满日</div>
                        <div className="flex-1 p-3 font-bold text-red-500">{expiryTime}</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Detailed Info Table */}
            <div className="mb-12">
               <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-black text-lg text-gray-800">详细信息</h3>
               </div>
               <div className="border-t-2 border-[#0047A0] text-[13px]">
                  <div className="flex border-b border-gray-200">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">入境信息</div>
                     <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100 last:border-0">
                           <div className="p-3"><span className="font-bold text-gray-500 mr-2">预计入境日</span> {data.entryDate}</div>
                           <div className="p-3 border-l border-gray-100"><span className="font-bold text-gray-500 mr-2">航班名称 (船舶名称)</span> {data.flightNumber}</div>
                        </div>
                        <div className="p-3 border-t border-gray-100">
                           <span className="font-bold text-gray-500 mr-2">前一出发地</span> CHINA(TAIWAN) TAIPEI (TPE) → 韩国
                        </div>
                     </div>
                  </div>
                  <div className="flex border-b border-gray-200">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">出境信息</div>
                     <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100 last:border-0">
                           <div className="p-3"><span className="font-bold text-gray-500 mr-2">预计出境日</span> {data.departureDate}</div>
                           <div className="p-3 border-l border-gray-100"><span className="font-bold text-gray-500 mr-2">航班名称 (船舶名称)</span> {data.departureFlightNumber}</div>
                        </div>
                        <div className="p-3 border-t border-gray-100">
                           <span className="font-bold text-gray-500 mr-2">下一目的地</span> 韩国 → TAIWAN TAOYUAN (TPE)
                        </div>
                     </div>
                  </div>
                  <div className="flex border-b border-gray-200">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">入境目的</div>
                     <div className="flex-1 p-3">旅游 (个人)</div>
                  </div>
                  <div className="flex border-b border-gray-200">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">滞留信息</div>
                     <div className="flex-1">
                        <div className="flex flex-col md:flex-row border-b border-gray-100">
                           <div className="p-3 font-bold text-gray-500 md:border-r border-b md:border-b-0 border-gray-100 bg-gray-50 md:bg-transparent">预计滞留地</div>
                           <div className="flex-1 p-3">
                              <div className="flex gap-2 items-center mb-1 flex-wrap">
                                 <span className="text-[10px] bg-[#0047A0] text-white px-1.5 py-0.5 rounded font-bold">KOR</span>
                                 <span className="break-all">{data.koreaAddressKr}</span>
                              </div>
                              <div className="flex gap-2 items-center flex-wrap">
                                 <span className="text-[10px] bg-gray-500 text-white px-1.5 py-0.5 rounded font-bold">ENG</span>
                                 <span className="break-all">{data.koreaAddress}, {data.detailAddress}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                           <div className="p-3 font-bold text-gray-500 md:border-r border-b md:border-b-0 border-gray-100 bg-gray-50 md:bg-transparent">联系电话</div>
                           <div className="flex-1 p-3">{data.koreaPhone}</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex border-b border-gray-200">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">职业</div>
                     <div className="flex-1 p-3">个体户</div>
                  </div>
                  <div className="flex">
                     <div className="w-32 bg-[#f8f9fa] p-3 font-bold text-gray-600 border-r border-gray-200 flex items-center justify-center">代表人邮箱</div>
                     <div className="flex-1 p-3">{data.email || 'helenastanchi@gmail.com'}</div>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-12 px-2 gap-3">
               <button onClick={() => setStep(3)} className="w-full sm:w-auto px-8 py-2.5 bg-[#dcdcdc] text-gray-700 font-bold rounded text-sm hover:bg-gray-300 transition-colors">取消</button>
               <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <button onClick={() => setStep(3)} className="w-full sm:w-auto px-8 py-2.5 border border-[#0047A0] text-[#0047A0] font-bold rounded text-sm hover:bg-blue-50 transition-colors">修改</button>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-2.5 bg-[#2c75e9] text-white font-bold rounded text-sm hover:bg-blue-700 shadow-md transition-all whitespace-nowrap">查看电子入境申报单</button>
               </div>
            </div>

            <div className="mt-16 text-center">
               <button onClick={() => setStep(0)} className="text-gray-400 text-xs underline hover:text-gray-600">重新開始模擬</button>
            </div>
         </div>
      );
   }

   // --- STEP 3: FORM SCREEN ---
   return (
      <div className="w-full max-w-6xl mx-auto font-sans animate-slide-in-right bg-white p-6 shadow-sm border border-gray-200">
         <GuidePanel />

         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded shadow-sm">
            <p className="text-yellow-800 font-bold flex items-center gap-2">
               <span className="text-xl">⚠️</span>
               填寫提醒：請在此表格中輸入您「本人的姓名」、「本人的護照號碼」及「本人的護照期滿日」。
            </p>
         </div>

         {/* Basic Information Section */}
         <div className="mb-8">
            <div className="mb-2">
               <h3 className="font-bold text-lg text-gray-800">基本信息</h3>
            </div>
            <p className="text-xs text-red-500 mb-2 font-bold">※ 標有[*]的項目為必填項目。請您務必填寫。</p>

            <div className="border-t-[1px] border-blue-500 border-b border-gray-200">
               {/* Row 1: Surname / Given Name */}
               <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col md:flex-row md:items-center border-b md:border-b-0 md:border-r border-gray-200">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 姓 (護照上)
                     </div>
                     <div className="flex-1 p-2 flex items-center gap-4">
                        <input type="text" value={data.familyName} onChange={handleChange('familyName')} onFocus={() => setFocusedField('familyName')} placeholder="請填寫您本人的姓" className={redInputStyle} />
                        <label className="flex items-center text-xs text-gray-500 whitespace-nowrap gap-1">
                           <input type="checkbox" className="rounded" /> unknown
                        </label>
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 名 (護照上)
                     </div>
                     <div className="flex-1 p-2 flex items-center gap-4">
                        <input type="text" value={data.givenName} onChange={handleChange('givenName')} onFocus={() => setFocusedField('givenName')} placeholder="請填寫您本人的名" className={redInputStyle} />
                        <label className="flex items-center text-xs text-gray-500 whitespace-nowrap gap-1">
                           <input type="checkbox" className="rounded" /> unknown
                        </label>
                     </div>
                  </div>
               </div>

               {/* Row 2: Birth / Nationality */}
               <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center border-b md:border-b-0 md:border-r border-gray-200">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 出生日期
                     </div>
                     <div className="flex-1 p-2 flex gap-2">
                        <select className={redSelectStyle}><option>{data.birthYear}</option></select>
                        <select className={redSelectStyle}><option>{data.birthMonth}</option></select>
                        <select className={redSelectStyle}><option>{data.birthDay}</option></select>
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 國家/地區
                     </div>
                     <div className="flex-1 p-2">
                        <select className="border border-gray-300 rounded px-2 py-1.5 text-sm w-full bg-white outline-none"><option>{data.nationality}</option></select>
                     </div>
                  </div>
               </div>

               {/* Row 3: Passport / Gender */}
               <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center border-b md:border-b-0 md:border-r border-gray-200">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 護照號
                     </div>
                     <div className="flex-1 p-2">
                        <input
                           type="text"
                           value={data.passportNumber}
                           onChange={handleChange('passportNumber')}
                           onFocus={() => setFocusedField('passportNumber')}
                           placeholder="請填寫您本人的護照號碼"
                           className={redInputStyle}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 性別
                     </div>
                     <div className="flex-1 p-2">
                        <select className={redSelectStyle}><option>{data.gender === 'M' ? '男' : '女'}</option></select>
                     </div>
                  </div>
               </div>

               {/* Row 4: Expiry Date */}
               <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center border-b md:border-b-0 md:border-r border-gray-200">
                     <div className="w-full md:w-32 bg-gray-50 p-3 text-xs font-bold text-gray-600 border-b md:border-b-0 md:border-r border-gray-200 h-full flex items-center">
                        <span className="text-red-500 mr-1">*</span> 護照期滿日
                     </div>
                     <div className="flex-1 p-2 flex gap-2">
                        <select className={redSelectStyle}><option>{data.passportExpiryYear}</option></select>
                        <select className={redSelectStyle}><option>{data.passportExpiryMonth}</option></select>
                        <select className={redSelectStyle}><option>{data.passportExpiryDay}</option></select>
                     </div>
                  </div>
                  <div className="bg-white flex items-center px-4 py-2 md:py-0">
                     <span className="text-xs text-blue-600 font-bold">請務必填寫您護照上的期滿日期</span>
                  </div>
               </div>
            </div>

            {/* IMPORTANT WARNING - UPDATED STYLE */}
            <div className="mt-4 bg-yellow-100 border-2 border-yellow-400 p-5 rounded-lg shadow-sm">
               <p className="text-[16px] md:text-[18px] text-gray-900 font-black leading-relaxed flex items-start gap-2">
                  <span className="text-xl">📢</span>
                  ※ 請務必確認輸入的信息與實際護照信息是否一致。如果輸入的護照信息不同，可能會因重新填寫入境申報等事宜導致入境審查延遲。
               </p>
            </div>
         </div>

         {/* Detailed Information Section */}
         <div className="mb-12">
            <h3 className="font-bold text-lg text-gray-800 mb-4">詳細信息</h3>
            <div className="border-t border-blue-500">
               {/* Entry Info Row */}
               <div className="flex flex-col md:flex-row border-b border-gray-200">
                  <div className="w-full md:w-40 bg-gray-50 p-4 font-bold text-gray-700 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 text-sm">入境信息</div>
                  <div className="flex-1 text-xs">
                     <div className="flex items-center p-3 border-b border-gray-100">
                        <span className="w-24 font-medium text-gray-600"><span className="text-red-500">*</span> 入境手段</span>
                        <div className="flex gap-2">
                           <button className="flex items-center gap-1 px-4 py-1.5 bg-blue-50 border border-blue-500 text-blue-500 rounded text-xs font-bold">AIR ✈️</button>
                           <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 text-gray-400 rounded text-xs">SEA 🚢</button>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100">
                        <div className="flex items-center p-3 md:border-r border-gray-100">
                           <span className="w-24 font-medium text-gray-600 shrink-0"><span className="text-red-500">*</span> 預計入境日</span>
                           <div className="flex-1 flex border border-gray-300 rounded items-center bg-white px-2 py-1.5">
                              <input type="text" value={data.entryDate} readOnly className="w-full text-xs outline-none" />
                              <span>📅</span>
                           </div>
                        </div>
                        <div className="flex items-center p-3">
                           <span className="w-24 font-medium text-gray-600 shrink-0"><span className="text-red-500">*</span> 航班名稱</span>
                           <div className="flex gap-2 flex-1">
                              <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white w-28"><option>航空公司</option></select>
                              <input type="text" value={data.flightNumber} readOnly className="border border-gray-300 rounded px-2 py-1 text-xs flex-1" />
                              <button className="bg-gray-700 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap">查詢運行信息</button>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center p-3">
                        <span className="w-24 font-medium text-gray-600 shrink-0 self-center">前一出發地</span>
                        <div className="flex gap-2 flex-1 items-center flex-wrap">
                           <select className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white min-w-[120px]"><option>TAIWAN</option></select>
                           <select className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white min-w-[140px]"><option>TAIPEI (TPE)</option></select>
                           <span className="text-gray-400 mx-1">→</span>
                           <span className="bg-gray-100 px-4 py-1.5 rounded text-gray-500 min-w-[80px] text-center">韓國</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Departure Info Row */}
               <div className="flex flex-col md:flex-row border-b border-gray-200">
                  <div className="w-full md:w-40 bg-gray-50 p-4 font-bold text-gray-700 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 text-sm">出境信息</div>
                  <div className="flex-1 text-xs">
                     <div className="flex items-center p-3 border-b border-gray-100">
                        <span className="w-24 font-medium text-gray-600"><span className="text-red-500">*</span> 出境手段</span>
                        <div className="flex gap-2">
                           <button className="flex items-center gap-1 px-4 py-1.5 border border-blue-500 text-blue-500 bg-blue-50 rounded text-xs font-bold">AIR ✈️</button>
                           <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 text-gray-400 rounded text-xs">SEA 🚢</button>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100">
                        <div className="flex items-center p-3 md:border-r border-gray-100">
                           <span className="w-24 font-medium text-gray-600 shrink-0"><span className="text-red-500">*</span> 預計出境日</span>
                           <div className="flex-1 flex border border-gray-300 rounded items-center bg-white px-2 py-1.5">
                              <input type="text" value={data.departureDate} readOnly className="w-full text-xs outline-none" />
                              <span>📅</span>
                           </div>
                        </div>
                        <div className="flex items-center p-3">
                           <span className="w-24 font-medium text-gray-600 shrink-0">航班名稱</span>
                           <div className="flex gap-2 flex-1">
                              <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white w-28"><option>航空公司</option></select>
                              <input type="text" value={data.departureFlightNumber} readOnly className="border border-gray-300 rounded px-2 py-1 text-xs flex-1" />
                              <button className="bg-gray-700 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap">查詢運行信息</button>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center p-3">
                        <span className="w-24 font-medium text-gray-600 shrink-0 self-center">下一目的地</span>
                        <div className="flex gap-2 flex-1 items-center flex-wrap">
                           <span className="bg-gray-100 px-4 py-1.5 rounded text-gray-500 min-w-[80px] text-center">韓國</span>
                           <span className="text-gray-400 mx-1">→</span>
                           <select className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white min-w-[140px] font-bold text-blue-700"><option>台灣 TAIWAN</option></select>
                           <select className="border border-gray-300 rounded px-2 py-1.5 text-xs bg-white min-w-[180px] font-bold text-blue-700"><option>桃園機場 TAOYUAN (TPE)</option></select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Purpose Row */}
               <div className="flex flex-col md:flex-row border-b border-gray-200">
                  <div className="w-full md:w-40 bg-gray-50 p-4 font-bold text-gray-700 flex items-center justify-center md:border-r border-gray-200 text-sm">
                     <span className="text-red-500 mr-1">*</span> 入境目的
                  </div>
                  <div className="flex-1 p-3 flex items-center">
                     <select value={data.purpose} onChange={handleChange('purpose')} onFocus={() => setFocusedField('purpose')} className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2 text-xs bg-white outline-none">
                        <option value="">請選擇入境目的。</option>
                        {PURPOSE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                     </select>
                  </div>
               </div>

               {/* Stay Info Row */}
               <div className="flex flex-col md:flex-row border-b border-gray-200">
                  <div className="w-full md:w-40 bg-gray-50 p-4 font-bold text-gray-700 flex items-center justify-center md:border-r border-gray-200 text-sm">滯留信息</div>
                  <div className="flex-1 p-4 text-xs space-y-4">
                     <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-600 shrink-0 whitespace-nowrap">查詢簽證信息</span>
                        <input type="text" placeholder="請輸入簽證號。" className="border border-gray-300 rounded px-3 py-1.5 text-xs min-w-[200px]" />
                        <button className="bg-gray-700 text-white px-4 py-1.5 rounded text-xs font-bold shrink-0">查詢</button>
                        <span className="text-gray-400 text-xs">ℹ️ 獲取簽證信息中的滯留地、聯繫方式信息。</span>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2"><span className="text-red-500">*</span><span className="font-bold text-gray-700">預計滯留地</span></div>
                        <div className="space-y-1 pl-0 md:pl-6">
                           <div className="flex items-stretch"><span className="bg-[#0047A0] text-white text-[10px] font-bold px-2 py-2 rounded-l w-14 md:w-12 shrink-0 flex items-center justify-center">KOR</span><input type="text" value={data.koreaAddressKr} readOnly className="border border-gray-300 rounded-r px-3 py-2 text-xs flex-1 bg-gray-50" /></div>
                           <div className="flex items-stretch"><span className="bg-[#666] text-white text-[10px] font-bold px-2 py-2 rounded-l w-14 md:w-12 shrink-0 flex items-center justify-center">ENG</span><input type="text" value={data.koreaAddress} readOnly className="border border-gray-300 rounded-r px-3 py-2 text-xs flex-1 bg-gray-50" /></div>
                           <input type="text" value={data.detailAddress} onChange={handleChange('detailAddress')} onFocus={() => setFocusedField('detailAddress')} className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white" placeholder="輸入詳細地址、住宿名稱等 (韓語或英語)" />
                        </div>
                     </div>
                     <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <span className="font-bold text-gray-700 shrink-0"><span className="text-red-500">*</span> 聯繫電話</span>
                        <input type="text" value={data.koreaPhone} onChange={handleChange('koreaPhone')} onFocus={() => setFocusedField('koreaPhone')} className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs bg-white" placeholder="請輸入韓國聯繫電話。" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Footer Buttons */}
         <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 py-8 px-4">
            <button onClick={handlePrev} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-2.5 border border-gray-300 bg-white text-gray-600 rounded text-sm font-bold shadow-sm hover:bg-gray-50">取消 (Prev)</button>
            <button onClick={handleNext} className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-2.5 bg-korea-blue text-white rounded text-sm font-bold shadow-md hover:bg-blue-800">下一步 (Next)</button>
         </div>
      </div>
   );
};

export default ArrivalCard;