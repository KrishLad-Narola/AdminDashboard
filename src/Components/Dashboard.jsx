import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, BarChart3, Briefcase, Settings, Plus } from 'lucide-react';

const Dashboard = () => {
  const [currentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      return savedUser ? JSON.parse(savedUser) : { fullName: "Guest User" };
    } catch {
      return { fullName: "Guest User" };
    }
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const [activeTab, setActiveTab] = useState('Overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [projects, setProjects] = useState([
    { name: "Landing Page Redesign", status: "In Progress", date: "Oct 24", value: "$2.4k" },
    { name: "Mobile App Icons", status: "Completed", date: "Oct 22", value: "$800" },
    { name: "SEO Audit", status: "Pending", date: "Oct 21", value: "$1.2k" },
    { name: "Database Migration", status: "In Progress", date: "Oct 19", value: "$5k" },
  ]);

  const tabs = [
    { name: 'Overview', icon: <LayoutDashboard size={18} /> },
    { name: 'Analytics', icon: <BarChart3 size={18} /> },
    { name: 'Projects', icon: <Briefcase size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics': return <AnalyticsView />;
      case 'Projects': 
        return <ProjectsView projects={projects} setProjects={setProjects} />;
      case 'Settings': return <SettingsView user={currentUser} />;
      case 'Profile': return <ProfileView user={currentUser} getInitials={getInitials} />;
      default: 
        return <OverviewView user={currentUser} projects={projects} onSeeAll={() => setActiveTab('Projects')} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <span className="text-2xl font-black text-indigo-600 tracking-tight"><img src='./myanalyses-logo-1-grid.svg'/></span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {tabs.map((tab) => (
            <SidebarLink
              key={tab.name}
              label={tab.name}
              icon={tab.icon}
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
          <nav className="fixed top-0 left-0 bottom-0 w-72 bg-white p-6 shadow-xl flex flex-col">
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
                  icon={tab.icon}
                  active={activeTab === tab.name}
                  onClick={() => { setActiveTab(tab.name); setIsMobileMenuOpen(false); }}
                />
              ))}
            </div>
          </nav>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{activeTab}</h2>
          </div>
          <button onClick={() => setActiveTab('Profile')} className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-400 cursor-pointer flex items-center justify-center text-white font-bold text-xs">
                {getInitials(currentUser.fullName)}
            </div>
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

const OverviewView = ({ onSeeAll, projects, user }) => (
  <div className="animate-in fade-in duration-500">
    <header className="mb-8">
      <h1 className="text-2xl md:text-3xl font-black text-slate-800">Welcome back, {user.fullName}</h1>
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
        <button onClick={onSeeAll} className="text-indigo-600 hover:text-indigo-400 cursor-pointer text-sm font-bold hover:underline">View All</button>
      </div>
      <ProjectTable projects={projects} limit={3} showAddForm={false} />
    </div>
  </div>
);

const ProjectsView = ({ projects, setProjects }) => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-black">All Projects</h1>
      <p className="text-slate-500">Manage and track your full portfolio.</p>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <ProjectTable projects={projects} setProjects={setProjects} showAddForm={true} />
    </div>
  </div>
);

const ProjectTable = ({ projects, setProjects, limit, showAddForm }) => {
  const [form, setForm] = useState({ name: "", status: "Pending", date: "", value: "" });

  const handleAddProject = () => {
    if (!form.name || !form.date || !form.value) return;
    setProjects([form, ...projects]);
    setForm({ name: "", status: "Pending", date: "", value: "" });
  };

  const displayData = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="flex flex-col">
      {showAddForm && (
        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Project Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2 bg-white border hover:border-indigo-400 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <input
              type="date"
              placeholder="Date (e.g. Oct 25)"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2 bg-white border hover:border-indigo-400 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Value"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="px-4 py-2 bg-white border hover:border-indigo-400 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 bg-white border hover:border-indigo-400 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button
              onClick={handleAddProject}
              className="bg-indigo-600 hover:bg-indigo-500  cursor-pointer text-white px-4 py-2 rounded-xl text-sm font-bold  transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-700">{row.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    row.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                    row.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">{row.date}</td>
                <td className="px-6 py-4 text-right font-black text-slate-700">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SidebarLink = ({ label, icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-bold transition-all ${
      active ? 'bg-indigo-600 hover:bg-indigo-400  text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ title, value, change, trend }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
    <p className="text-slate-400 text-[10px] uppercase font-black mb-2 tracking-widest">{title}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-3xl font-black text-slate-800">{value}</h4>
      {change && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {change}
        </span>
      )}
    </div>
  </div>
);

const AnalyticsView = () => (
  <div className="animate-in fade-in duration-500">
    <h1 className="text-2xl font-black mb-6">Analytics</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="h-64 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-bold italic">Chart: Growth Data</div>
       <div className="h-64 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-bold italic">Chart: User Behavior</div>
    </div>
  </div>
);

const SettingsView = ({ user,email}) => (
  <div className="animate-in fade-in duration-500 max-w-2xl">
    <h1 className="text-2xl font-black mb-6">Settings</h1>
    <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
      <div>
        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Full Name</label>
        <input type="text" defaultValue={user.fullName} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Email</label>
        <input type="text" defaultValue={user.email} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
      </div>
      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-400 text-white rounded-xl font-bold">Save Settings</button>
    </div>
  </div>
);

const ProfileView = ({ user, getInitials }) => (
  <div className="animate-in fade-in duration-500 text-center py-10">
    <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white">
        {getInitials(user.fullName)}
    </div>
    <h1 className="text-3xl font-black text-slate-800">{user.fullName}</h1>
    <p className="text-slate-500">Senior Product Designer</p>
  </div>
);

export default Dashboard;