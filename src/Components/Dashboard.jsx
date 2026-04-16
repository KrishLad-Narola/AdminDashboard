import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, LogOut, LayoutDashboard, BarChart3, 
  Briefcase, Settings, User, ChevronLeft 
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  const tabs = [
    { name: 'Overview', icon: <LayoutDashboard size={18} /> },
    { name: 'Analytics', icon: <BarChart3 size={18} /> },
    { name: 'Projects', icon: <Briefcase size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics': return <AnalyticsView />;
      case 'Projects': return <ProjectsView />;
      case 'Settings': return <SettingsView />;
      case 'Profile': return <ProfileView />;
      default: return <OverviewView onSeeAll={() => setActiveTab('Projects')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <span className="text-2xl font-black text-indigo-600 tracking-tight">MyAnalyses</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {tabs.map((tab) => (
            <SidebarLink
              key={tab.name}
              label={tab.name}
              active={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-3 p-3 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-white p-6 shadow-xl animate-in slide-in-from-left duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-black text-indigo-600">MyAnalyses</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 space-y-2">
              {tabs.map((tab) => (
                <SidebarLink
                  key={tab.name}
                  label={tab.name}
                  active={activeTab === tab.name}
                  onClick={() => { setActiveTab(tab.name); setIsMobileMenuOpen(false); }}
                />
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100">
              <Link 
                to="/" 
                className="flex items-center gap-3 p-3 text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogOut size={18} /> Logout
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {activeTab === 'Profile' ? (
              <button 
                onClick={() => setActiveTab('Overview')}
                className="flex items-center gap-1 p-2 hover:bg-slate-100 rounded-lg text-indigo-600 transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Back</span>
              </button>
            ) : (
              <>
                <button 
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest truncate">{activeTab}</h2>
              </>
            )}
          </div>
          
          <button 
            onClick={() => setActiveTab('Profile')}
            className={`flex items-center gap-2 md:gap-3 p-1 md:pr-3 rounded-full transition-colors ${activeTab === 'Profile' ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
          >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">KL</div>
              <span className="hidden sm:inline text-sm font-bold text-slate-700">Krish Lad</span>
          </button>
        </header>

        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};


const OverviewView = ({ onSeeAll }) => (
  <div className="animate-in fade-in duration-500">
    <header className="mb-8">
      <h1 className="text-2xl md:text-3xl font-black text-slate-800">Welcome back, Krish!</h1>
      <p className="text-slate-500 mt-1">Here is what's happening today.</p>
    </header>
    
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
      <StatCard title="Active Tasks" value="12" change="+2" trend="up" />
      <StatCard title="Completed" value="48" change="+12%" trend="up" />
      <StatCard title="Avg. Time" value="4.2h" change="-10%" trend="down" />
      <StatCard title="Efficiency" value="94%" />
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Recent Projects</h3>
        <button onClick={onSeeAll} className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
      </div>
      <ProjectTable limit={3} />
    </div>
  </div>
);

const AnalyticsView = () => (
  <div className="animate-in slide-in-from-bottom-2 duration-400">
    <h1 className="text-2xl md:text-3xl font-black mb-6">Analytics Report</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <div className="h-48 md:h-64 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 text-center p-4">Chart: Weekly Growth</div>
      <div className="h-48 md:h-64 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 text-center p-4">Chart: User Engagement</div>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="animate-in slide-in-from-bottom-2 duration-400">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black">All Projects</h1>
        <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-700 w-full sm:w-auto shadow-lg shadow-indigo-100">+ Create Project</button>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <ProjectTable />
    </div>
  </div>
);

const SettingsView = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-2 duration-400">
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-800 mb-6">Public Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Display Name</label>
            <input type="text" defaultValue="Krish Lad" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
            <input type="text" defaultValue="Senior Product Designer" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Bio</label>
            <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-800 mb-6">Preferences</h3>
        <div className="space-y-4">
          <PreferenceToggle 
            label="Email Notifications" 
            desc="Weekly activity reports" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
          />
          <PreferenceToggle 
            label="Dark Mode (Beta)" 
            desc="Switch to dark interface" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
        </div>
      </section>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4">
        <button className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-500">Reset</button>
        <button className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">Save Changes</button>
      </div>
    </div>
  );
};

const ProfileView = () => (
  <div className="max-w-2xl mx-auto text-center py-4 md:py-10 animate-in zoom-in-95 duration-300">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl md:text-3xl font-black text-indigo-600">KL</div>
    <h1 className="text-2xl md:text-3xl font-black">Krish Lad</h1>
    <p className="text-slate-500">Senior Product Designer</p>
    <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
            <span className="block font-bold text-lg md:text-xl text-indigo-600">1.2k</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Followers</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
            <span className="block font-bold text-lg md:text-xl text-indigo-600">85</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Projects</span>
        </div>
    </div>
  </div>
);


const SidebarLink = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${
    active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
  }`}>
    {label}
  </button>
);

const StatCard = ({ title, value, change, trend }) => (
  <div className="p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
    <h3 className="text-slate-400 text-[10px] uppercase font-black mb-2 truncate">{title}</h3>
    <div className="flex items-baseline justify-between gap-2">
      <p className="text-2xl md:text-3xl font-bold text-slate-800">{value}</p>
      {change && <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{change}</span>}
    </div>
  </div>
);

const PreferenceToggle = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl gap-4">
    <div className="min-w-0">
      <p className="text-sm font-bold text-slate-700 truncate">{label}</p>
      <p className="text-xs text-slate-500 truncate">{desc}</p>
    </div>
    <input type="checkbox" checked={checked} onChange={onChange} className="w-5 h-5 accent-indigo-600 shrink-0 cursor-pointer" />
  </div>
);

const ProjectTable = ({ limit }) => {
    const data = [
        { name: "Landing Page Redesign", status: "In Progress", date: "Oct 24", value: "$2.4k" },
        { name: "Mobile App Icons", status: "Completed", date: "Oct 22", value: "$800" },
        { name: "SEO Audit", status: "Pending", date: "Oct 21", value: "$1.2k" },
        { name: "Database Migration", status: "In Progress", date: "Oct 19", value: "$5k" },
    ];
    const displayData = limit ? data.slice(0, limit) : data;

    return (
        <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[500px]">
                <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="px-6 py-4">Project</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                      <th className="px-6 py-4">Value</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {displayData.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-800">{row.name}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{row.status}</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{row.date}</td>
                            <td className="px-6 py-4 font-bold">{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;