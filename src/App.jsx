import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Mail, 
  FileCheck, 
  Wallet, 
  BrainCircuit,
  Eye,
  EyeOff
} from 'lucide-react';

// Organized and slightly typo-corrected data from the image for better readability
const formsData = [
  // ACCOUNTS
  { no: 'ACG 1', desc: 'HO SUMMARY', category: 'Accounts' },
  { no: 'ACG 2', desc: 'TREASURER CASH BOOK', category: 'Accounts' },
  { no: 'ACG 3', desc: 'SO SUMMARY', category: 'Accounts' },
  { no: 'ACG 3 A', desc: 'BO SUMMARY', category: 'Accounts' },
  { no: 'ACG 4', desc: 'HO CASHBOOK', category: 'Accounts' },
  { no: 'ACG 6 B', desc: 'PLI RECEIPTS SCHEDULE', category: 'Accounts' },
  { no: 'ACG 8', desc: 'TREASURY PASS BOOK', category: 'Accounts' },
  { no: 'ACG 14', desc: 'MEMO OF AUTHORIZED BALANCE', category: 'Accounts' },
  { no: 'ACG 17', desc: 'MONEY RECEIPT', category: 'Accounts' },
  { no: 'ACG 19', desc: 'COUNTERSIGNED CONTINGENT BILLS-PO', category: 'Accounts' },
  { no: 'ACG 19 A', desc: 'REGISTER OF SANCTIONED ESTABLISHMENT', category: 'Accounts' },
  { no: 'ACG 19 B', desc: 'COUNTERSIGNED CONTINGENT BILLS-RMS', category: 'Accounts' },
  { no: 'ACG 20', desc: 'DISBURSEMENT OF PAY AND ALLOWANCE FOR ALL', category: 'Accounts' },
  { no: 'ACG 22 A', desc: 'BO DAILY ACCOUNT', category: 'Accounts' },
  { no: 'ACG 24', desc: 'ACQUITTANCE ROLL', category: 'Accounts' },
  { no: 'ACG 25', desc: 'ROAD ESTABLISHMENT', category: 'Accounts' },
  { no: 'ACG 28', desc: 'REGISTER OF CHEQUES RECEIVE AND CLEARED', category: 'Accounts' },
  { no: 'ACG 37', desc: 'OTA BILLS', category: 'Accounts' },
  { no: 'ACG 38', desc: 'OUTSTATION ALLOWANCE', category: 'Accounts' },
  { no: 'ACG 44', desc: 'LETTER POSTAGE ACCOUNT', category: 'Accounts' },
  { no: 'ACG 45', desc: 'UNPAID POSTAGE ACCOUNT', category: 'Accounts' },
  { no: 'ACG 46', desc: 'MEMORANDUM TO PREPAYMENT OF POSTAGE', category: 'Accounts' },
  { no: 'ACG 47', desc: 'RECEIPT OF CASH PAID IN CASH', category: 'Accounts' },
  { no: 'ACG 60', desc: 'ADVANCE REGISTER', category: 'Accounts' },
  { no: 'ACG 67', desc: 'EARNEST MONEY DEPOSIT', category: 'Accounts' },
  { no: 'ACG 69', desc: 'REGISTER OF BUILDINGS AND LANDS', category: 'Accounts' },
  { no: 'ACG 84', desc: 'MEMO OF MONTHLY CASH BALANCE', category: 'Accounts' },
  { no: 'ACG 90', desc: 'CUSTOMS DUTY COLLECTION SCHEDULE', category: 'Accounts' },
  { no: 'ACG 108', desc: 'BILL FOR PROVISIONAL PENSION/FP/GRATUITY', category: 'Accounts' },
  { no: 'ACG 154', desc: 'REMITTANCE ADVICE', category: 'Accounts' },
  { no: 'GAR 42', desc: 'GPF WITHDRAWAL FORM', category: 'Accounts' },
  { no: 'TR 24', desc: 'PERIODICALS INCREMENT CERTIFICATE', category: 'Accounts' },

  // REGISTRATION
  { no: 'RP 1', desc: 'REGISTER RECEIPT', category: 'Registration' },
  { no: 'RP 3', desc: 'PARCEL LIST', category: 'Registration' },
  { no: 'RP 8', desc: 'PARCEL ABSTRACT', category: 'Registration' },
  { no: 'RP 51', desc: 'REGISTER JOURNAL', category: 'Registration' },
  { no: 'RP 52', desc: 'INTIMATION FORM', category: 'Registration' },
  { no: 'RP 53', desc: 'BOOK OF INTIMATIONS DELIVERED', category: 'Registration' },
  { no: 'RP 54', desc: 'ACKNOWLEDGMENT CARD', category: 'Registration' },
  { no: 'RP 54 A', desc: 'ACKNOWLEDGMENT OF RECEIPT', category: 'Registration' },
  { no: 'RP 57', desc: 'SPECIAL DELIVERY SLIP', category: 'Registration' },
  { no: 'RP 58', desc: 'DELIVERY SLIP', category: 'Registration' },
  { no: 'RP 63', desc: 'INTIMATION SLIP ABOUT DAMAGE', category: 'Registration' },

  // MAIL
  { no: 'MS 1', desc: 'POSTMASTER ORDER BOOK', category: 'Mail' },
  { no: 'MS 2', desc: 'ERROR BOOK', category: 'Mail' },
  { no: 'MS 9 A', desc: 'CUSTOMS FEE ASSESMENT BY PM', category: 'Mail' },
  { no: 'MS 12', desc: 'NOMINAL ROLL', category: 'Mail' },
  { no: 'MS 13', desc: 'MONTHLY STATISTICAL REGISTER', category: 'Mail' },
  { no: 'MS 14', desc: 'STATISTICAL REGISTER ABSTRACT', category: 'Mail' },
  { no: 'MS 14 A', desc: 'STATISTICAL MEMORANDUM', category: 'Mail' },
  { no: 'MS 15', desc: 'INDEX TO MO RECEIPTS', category: 'Mail' },
  { no: 'MS 16', desc: 'CONTENT OF ARTICLES LIST FOREIGN', category: 'Mail' },
  { no: 'MS 18', desc: 'BOOK OF POSTMARKS', category: 'Mail' },
  { no: 'MS 27', desc: 'POSTMAN BOOK', category: 'Mail' },
  { no: 'MS 28', desc: 'MAIL ATTENDANCE BOOK', category: 'Mail' },
  { no: 'MS 42', desc: 'NOTICE OF PRESCRIBED FEE FOR PROFESSIONAL LETTER WRITERS', category: 'Mail' },
  { no: 'MS 85', desc: 'REGISTER OF VILLAGE POSTMAN', category: 'Mail' },
  { no: 'MS 86', desc: 'VISIT BOOK OF VILLAGE POSTMAN', category: 'Mail' },
  { no: 'MS 88', desc: 'YEARLY VILLAGE RETURN', category: 'Mail' },
  { no: 'MS 94', desc: 'COMPLAINTS AND SUGGESTION BOOK', category: 'Mail' },
  { no: 'MS 98', desc: 'BILL FOR REGISTERED NEWSPAPER FORTNIGHTLY', category: 'Mail' },
  { no: 'MS 99', desc: 'MONTHLY STATEMENT ON BILL FOR REGISTERED NEWSPAPER', category: 'Mail' },
  { no: 'M1A', desc: 'MAIL LIST', category: 'Mail' },
  { no: 'M3', desc: 'RECEIPT OF DETAILS OF BAG', category: 'Mail' },
  { no: 'M6', desc: 'CONSOLIDATED LIST OF HOURS OF BUSINESS', category: 'Mail' },
  { no: 'M6A', desc: 'HOURS OF TRANSACTIONS', category: 'Mail' },
  { no: 'M9', desc: 'DUE MAIL AND SORTING LIST', category: 'Mail' },
  { no: 'M 12', desc: 'DESPATCH OF MAIL', category: 'Mail' },
  { no: 'M 23', desc: 'REGISTER OF WINDOW DELIVERY TICKETS', category: 'Mail' },
  { no: 'M 24', desc: 'WINDOW DELIVERY TICKET', category: 'Mail' },
  { no: 'M 26 A', desc: 'TRIAL CARD', category: 'Mail' },
  { no: 'M 28', desc: 'INTIMATION FOR RENEWAL OF WINDOW DELIVERY TICKETS', category: 'Mail' },
  { no: 'M 32', desc: 'BOOK OF ADDRESSEE\'S INSTRUCTION', category: 'Mail' },
  { no: 'M 34', desc: 'INSTRUCTION SLIP', category: 'Mail' },
  { no: 'M 36', desc: 'MEMO OF POSTAGE STAMP', category: 'Mail' },
  { no: 'M 37', desc: 'ARTICLES LABEL - RLO', category: 'Mail' },
  { no: 'M 40', desc: 'REGISTER OF LINES AND STAGES', category: 'Mail' },
  { no: 'M 52', desc: 'VILLAGE SORTING LIST', category: 'Mail' },
  { no: 'M 57', desc: 'INLAND AIRMAIL DELIVERY BILL', category: 'Mail' },

  // IPO
  { no: 'MO 59', desc: 'INDENT FOR IPO TO PAO', category: 'IPO' },
  { no: 'MO 60', desc: 'IPO STOCK', category: 'IPO' },
  { no: 'MO 60-A', desc: 'SUBSIDIARY REGISTER', category: 'IPO' },
  { no: 'MO 61', desc: 'REGISTER OF AUTHORIZED STOCK', category: 'IPO' },
  { no: 'MO 62', desc: 'IPO SOLD JOURNAL', category: 'IPO' },
  { no: 'MO 63', desc: 'LIST OF IPO SOLD', category: 'IPO' },
  { no: 'MO 64', desc: 'MEMO OF UNSOLD IPO', category: 'IPO' },
  { no: 'MO 65', desc: 'MEMO OF IPO SOLD', category: 'IPO' },
  { no: 'MO 66', desc: 'HO JOURNAL OF IPO PAID', category: 'IPO' },
  { no: 'MO 67', desc: 'LIST OF IPO PAID THROUGH CLEARING HOUSE', category: 'IPO' },
  { no: 'MO 67', desc: 'SO DAILY LIST', category: 'IPO' }, // Note: Duplicate MO 67 exists in source material
  { no: 'MO 68', desc: 'ABSTRACT OF IPO PAID IN A MONTH', category: 'IPO' },
  { no: 'MO 72', desc: 'LIST OF IPO FOR Book Adjustment', category: 'IPO' },
];

const categories = [
  { name: 'All', icon: BookOpen, color: 'bg-slate-800 text-white' },
  { name: 'Accounts', icon: Wallet, color: 'bg-emerald-600 text-white', accent: 'border-emerald-500', light: 'bg-emerald-50 text-emerald-700' },
  { name: 'Registration', icon: FileCheck, color: 'bg-rose-600 text-white', accent: 'border-rose-500', light: 'bg-rose-50 text-rose-700' },
  { name: 'Mail', icon: Mail, color: 'bg-blue-600 text-white', accent: 'border-blue-500', light: 'bg-blue-50 text-blue-700' },
  { name: 'IPO', icon: BookOpen, color: 'bg-purple-600 text-white', accent: 'border-purple-500', light: 'bg-purple-50 text-purple-700' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [memorizeMode, setMemorizeMode] = useState(false);

  // Filter forms based on search query and active category
  const filteredForms = useMemo(() => {
    return formsData.filter(form => {
      const matchesSearch = 
        form.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || form.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const getCategoryTheme = (catName) => {
    return categories.find(c => c.name === catName) || categories[0];
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      
      {/* Header Area */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Branding */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                  India Post Forms
                </h1>
                <p className="text-sm text-slate-500 font-medium">Memorization Master</p>
              </div>
            </div>

            {/* Controls: Search & Memorize Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search form number or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-sm transition-all"
                />
              </div>

              <button
                onClick={() => setMemorizeMode(!memorizeMode)}
                className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  memorizeMode 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {memorizeMode ? <EyeOff className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
                {memorizeMode ? 'Memorize Mode ON' : 'Practice Mode'}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mt-6 pb-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    isActive 
                      ? `${cat.color} shadow-md` 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Context Hint for Memorize Mode */}
        {memorizeMode && (
          <div className="mb-6 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <Eye className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              Descriptions are hidden. Hover over or tap a card to reveal the form's purpose.
            </p>
          </div>
        )}

        {/* Results Info */}
        <div className="mb-6 text-sm font-medium text-slate-500">
          Showing {filteredForms.length} forms {activeCategory !== 'All' && `in ${activeCategory}`}
        </div>

        {/* Cards Grid */}
        {filteredForms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredForms.map((form, idx) => {
              const theme = getCategoryTheme(form.category);
              
              return (
                <div 
                  key={`${form.no}-${idx}`}
                  className={`group relative bg-white rounded-2xl p-5 border-l-4 ${theme.accent} shadow-sm border-y border-r border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col h-full cursor-pointer`}
                >
                  {/* Card Header (Form No & Category Pill) */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                      {form.no}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${theme.light}`}>
                      {form.category}
                    </span>
                  </div>

                  {/* Form Description */}
                  <div className="mt-auto relative">
                    <p 
                      className={`text-sm font-medium text-slate-600 leading-snug transition-all duration-300 ${
                        memorizeMode ? 'blur-md group-hover:blur-none select-none group-hover:select-auto' : ''
                      }`}
                    >
                      {form.desc}
                    </p>
                    
                    {/* Overlay text for memorize mode */}
                    {memorizeMode && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                        <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Hover to reveal
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No forms found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm font-medium">
        Designed for India Post Office / DOP Preparation
      </footer>

      {/* Custom styles to hide scrollbar on horizontal scroll but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}