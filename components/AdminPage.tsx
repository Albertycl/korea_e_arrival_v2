
import React, { useState } from 'react';
import { AdminConfig } from '../types';

const AdminPage: React.FC = () => {
  // Authentication State (In-memory only as requested: "don't store my session")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Config State
  const [config, setConfig] = useState<AdminConfig>({
    arrivalFlight: 'LJ764',
    arrivalDate: '2024-01-02',
    departureFlight: 'LJ763',
    departureDate: '2024-01-06',
    hotelName: 'Hotel The One',
    hotelAddressKr: '제주특별자치도 제주시 연동 사장3길 33',
    hotelAddressEn: '33, Sajang 3-gil, Jeju-si, Jeju-do',
    hotelPhone: '82-64-798-0001'
  });

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Correct credentials as requested
    if (username === 'yvonne' && password === 'yvonne.neihu') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('帳號或密碼錯誤');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleChange = (field: keyof AdminConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const generateLink = () => {
    const jsonString = JSON.stringify(config);
    // Base64 encoding for URL payload
    const encoded = btoa(encodeURIComponent(jsonString));
    
    // Target deployment URL
    const baseUrl = "https://krearrival.netlify.app/";
    // Slug format as requested: [arrive_date_with_hotel_name]
    const slug = `${config.arrivalDate}-${config.hotelName.replace(/\s+/g, '_')}`;
    
    // Final URL with data parameter and pretty slug
    const url = `${baseUrl}?c=${encoded}&p=${slug}`;
    
    setGeneratedUrl(url);
    setCopySuccess(false);
  };

  const copyToClipboard = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-pop-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-korea-blue rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-white shadow-lg">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800">管理員登入</h2>
          <p className="text-gray-500 text-sm">請輸入您的管理權限帳號</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-korea-blue outline-none transition-all bg-gray-50"
              placeholder="請輸入帳號"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-korea-blue outline-none transition-all bg-gray-50"
              placeholder="請輸入密碼"
              autoComplete="current-password"
            />
          </div>
          {loginError && (
            <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-lg border border-red-100">
              ❌ {loginError}
            </div>
          )}
          <button type="submit" className="w-full bg-korea-blue text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-all shadow-lg active:scale-95">
            確認進入
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-pop-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-800 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">⚙️</span> 管理後台面板
            </h2>
            <p className="text-gray-400 text-sm mt-1">建立專屬客戶連結，自動填入航班與飯店</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-xs bg-red-500/20 text-red-200 px-4 py-2 rounded-lg hover:bg-red-500/40 transition-colors font-bold border border-red-500/30"
          >
            安全登出
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-blue-600 border-l-4 border-blue-600 pl-3 text-lg">抵達資訊 (Arrival)</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl space-y-3 border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">抵達航班</label>
                  <input type="text" value={config.arrivalFlight} onChange={e => handleChange('arrivalFlight', e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">抵達日期</label>
                  <input type="date" value={config.arrivalDate} onChange={e => handleChange('arrivalDate', e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-red-600 border-l-4 border-red-600 pl-3 text-lg">離開資訊 (Departure)</h3>
              <div className="bg-red-50/50 p-4 rounded-xl space-y-3 border border-red-100">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">離開航班</label>
                  <input type="text" value={config.departureFlight} onChange={e => handleChange('departureFlight', e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">離開日期</label>
                  <input type="date" value={config.departureDate} onChange={e => handleChange('departureDate', e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="font-bold text-green-600 border-l-4 border-green-600 pl-3 text-lg">飯店資訊 (Hotel)</h3>
            <div className="bg-green-50/30 p-6 rounded-xl border border-green-100 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">飯店名稱 (Name)</label>
                <input type="text" value={config.hotelName} onChange={e => handleChange('hotelName', e.target.value)} className="w-full border bg-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">韓文地址 (Address KR)</label>
                  <input type="text" value={config.hotelAddressKr} onChange={e => handleChange('hotelAddressKr', e.target.value)} className="w-full border bg-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">英文地址 (Address EN)</label>
                  <input type="text" value={config.hotelAddressEn} onChange={e => handleChange('hotelAddressEn', e.target.value)} className="w-full border bg-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">飯店電話 (Phone)</label>
                <input type="text" value={config.hotelPhone} onChange={e => handleChange('hotelPhone', e.target.value)} className="w-full border bg-white rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={generateLink} 
              className="w-full bg-korea-blue text-white font-bold py-5 rounded-2xl hover:bg-blue-900 shadow-xl transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-2"
            >
              🚀 生成專屬加密網址
            </button>
          </div>

          {generatedUrl && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl animate-pop-in">
              <label className="block text-[10px] font-black text-blue-400 mb-2 uppercase tracking-[0.2em]">生成的教學分享網址：</label>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 font-mono break-all leading-relaxed shadow-inner">
                  {generatedUrl}
                </div>
                <button 
                  onClick={copyToClipboard} 
                  className={`md:w-32 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${copySuccess ? 'bg-green-500 text-white' : 'bg-korea-blue text-white hover:bg-blue-900'}`}
                >
                  {copySuccess ? '✅ 已複製' : '📋 複製網址'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
