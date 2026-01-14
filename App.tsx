
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import PropertyCard from './components/PropertyCard.tsx';
import PostForm from './components/PostForm.tsx';
import { Property, ViewType, PropertyType, HouseStyle, PropertyCategory } from './types.ts';
import { Search, Plus, Building2, ShieldCheck, Info, SlidersHorizontal, Settings as SettingsIcon, XCircle, Mail, MapPin, Globe, Bell, Fingerprint, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: true,
    autoCurrency: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('global_properties');
      if (saved) {
        setProperties(JSON.parse(saved));
      } else {
        const mock: Property[] = [
          {
            id: '1',
            title: 'Executive Villa in Prime Location',
            type: PropertyType.RENT,
            category: PropertyCategory.VILLA,
            country: 'Pakistan',
            city: 'Islamabad',
            area: 'Sector F-6',
            style: HouseStyle.DOUBLE_STORY,
            bedrooms: 4,
            bathrooms: 4,
            hasGas: true,
            hasElectricity: true,
            phoneNumber: '03001234567',
            whatsappNumber: '923001234567',
            images: [],
            price: '150,000',
            currency: 'PKR',
            language: 'Urdu/English',
            description: 'A beautiful modern villa with scenic views and top-tier security.',
            createdAt: Date.now()
          }
        ];
        setProperties(mock);
      }
    } catch (e) {
      console.error("Storage Load Error:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('global_properties', JSON.stringify(properties));
      } catch (e) {
        console.error("Storage Save Error (Quota full?):", e);
      }
    }
  }, [properties, isLoaded]);

  const handleSaveProperty = (prop: Property) => {
    console.log("Saving property to main state:", prop);
    setProperties(prev => {
      const exists = prev.some(p => p.id === prop.id);
      if (exists) {
        return prev.map(p => p.id === prop.id ? prop : p);
      }
      return [prop, ...prev];
    });
    setEditingProperty(undefined);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    if (!isLoaded) return <div className="flex h-screen items-center justify-center font-black text-blue-600 animate-pulse text-2xl uppercase tracking-widest">Find home</div>;

    switch (currentView) {
      case 'home':
        return (
          <div className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto scroll-smooth">
            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <span className="bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block">Real Estate Platform</span>
                
                {/* Updated Hero Heading */}
                <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tighter">
                  FIND YOUR <br/><span className="text-blue-300">NEXT HOME</span>
                </h1>
                <p className="text-lg md:text-xl font-medium text-blue-100/80 mb-10 max-w-xl">
                  Search across thousands of verified listings to find your perfect match today.
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-[2rem] border border-white/20 shadow-2xl">
                  <div className="flex-1 flex items-center bg-white rounded-2xl px-6 py-5 shadow-inner">
                    <Search className="text-blue-600 w-7 h-7 mr-4" />
                    <input 
                      type="text" 
                      placeholder="Search city, area, category or title..." 
                      className="bg-transparent text-gray-800 outline-none w-full font-bold text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="bg-blue-500 text-white px-12 py-5 rounded-2xl font-black shadow-xl hover:bg-blue-400 active:scale-95 transition-all text-lg">Find Now</button>
                </div>
              </div>
              <Building2 className="absolute right-[-60px] bottom-[-60px] w-[500px] h-[500px] text-white/5 rotate-12 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {properties.filter(p => 
                p.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.area.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(p => (
                <PropertyCard key={p.id} property={p} viewMode="home" />
              ))}
              {properties.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-400 text-xl font-bold">No properties listed yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'post':
        return <PostForm onSave={handleSaveProperty} onCancel={() => { setEditingProperty(undefined); setCurrentView('home'); }} editingProperty={editingProperty} />;

      case 'profile':
        return (
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-black text-gray-900">My Listings</h1>
              <button onClick={() => setCurrentView('post')} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"><Plus /> Add Listing</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {properties.map(p => (
                <PropertyCard key={p.id} property={p} viewMode="profile" onEdit={(id) => { setEditingProperty(properties.find(x => x.id === id)); setCurrentView('post'); }} onDelete={(id) => { if(window.confirm('Delete this listing?')) setProperties(prev => prev.filter(x => x.id !== id)) }} />
              ))}
              {properties.length === 0 && (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                  <p className="text-gray-400 font-bold text-xl mb-4">No listings yet.</p>
                  <button onClick={() => setCurrentView('post')} className="text-blue-600 font-black underline">Post your first home</button>
                </div>
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto p-8 mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100">
              <div className="flex items-center gap-4 mb-10">
                <SettingsIcon className="w-10 h-10 text-blue-600" />
                <h1 className="text-4xl font-black">App Settings</h1>
              </div>
              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <Bell className="text-blue-500" />
                    <span className="font-bold text-lg text-gray-800">Push Notifications</span>
                  </div>
                  <button onClick={() => setSettings(s => ({...s, notifications: !s.notifications}))} className={`w-16 h-8 rounded-full relative transition-colors ${settings.notifications ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.notifications ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <Fingerprint className="text-purple-500" />
                    <span className="font-bold text-lg text-gray-800">Privacy Mode</span>
                  </div>
                  <button onClick={() => setSettings(s => ({...s, privacy: !s.privacy}))} className={`w-16 h-8 rounded-full relative transition-colors ${settings.privacy ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.privacy ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem]">
                  <div className="flex items-center gap-4">
                    <Globe className="text-orange-500" />
                    <span className="font-bold text-lg text-gray-800">Auto Currency Sync</span>
                  </div>
                  <button onClick={() => setSettings(s => ({...s, autoCurrency: !s.autoCurrency}))} className={`w-16 h-8 rounded-full relative transition-colors ${settings.autoCurrency ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.autoCurrency ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="max-w-4xl mx-auto p-8 mt-12 animate-in fade-in duration-500">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Globe className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-5xl font-black mb-6">Our Mission</h1>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                Find home is a premium platform designed to make finding homes as easy as a single tap. 
                Whether you're looking for a luxury villa in Islamabad or a modern flat in London, we bridge the gap between dream and reality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 bg-blue-50 rounded-3xl">
                  <h3 className="font-black text-blue-900 mb-2">Verified Ads</h3>
                  <p className="text-sm text-blue-700">Every property on our platform is manually reviewed to ensure trust.</p>
                </div>
                <div className="p-6 bg-green-50 rounded-3xl">
                  <h3 className="font-black text-green-900 mb-2">Smart Sync</h3>
                  <p className="text-sm text-green-700">Currency and language are automatically synced for international buyers.</p>
                </div>
                <div className="p-6 bg-orange-50 rounded-3xl">
                  <h3 className="font-black text-orange-900 mb-2">WhatsApp Ready</h3>
                  <p className="text-sm text-orange-700">Directly contact sellers via WhatsApp for lightning-fast deals.</p>
                </div>
              </div>
              <p className="mt-12 text-gray-400 font-bold uppercase tracking-widest text-xs">ESTABLISHED 2024 • ISLAMABAD, PAKISTAN</p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-3xl mx-auto p-8 mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100">
              <ShieldCheck className="w-20 h-20 text-green-500 mb-6" />
              <h1 className="text-4xl font-black mb-8 text-gray-900">Privacy & Data Security</h1>
              <div className="prose prose-lg text-gray-600 space-y-8 font-medium">
                <div className="flex gap-4">
                  <Eye className="w-10 h-10 text-blue-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Data Visibility</h3>
                    <p className="text-sm">We only show your contact information to verified users. Your phone number is encrypted and protected against scrapers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="w-10 h-10 text-green-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Secure Images</h3>
                    <p className="text-sm">Uploaded images are stored on high-speed servers and optimized for mobile viewing without compromising quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto p-8 mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-4xl font-black mb-4">Support Center</h1>
              <p className="text-gray-500 mb-10 text-lg">We typically respond within 1-2 hours.</p>
              
              <div className="space-y-6">
                <a href="mailto:fast85853@gmail.com" className="p-8 bg-gray-50 rounded-[2.5rem] border-2 border-transparent hover:border-blue-500 flex items-center gap-6 transition-all group">
                  <div className="bg-white p-5 rounded-2xl shadow-sm group-hover:bg-blue-600 transition-colors"><Mail className="w-8 h-8 text-blue-600 group-hover:text-white" /></div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Official Email</p>
                    <p className="text-2xl font-black text-blue-600">fast85853@gmail.com</p>
                  </div>
                </a>
                <div className="p-8 bg-gray-50 rounded-[2.5rem] flex items-center gap-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm"><MapPin className="w-8 h-8 text-red-500" /></div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Office Location</p>
                    <p className="text-xl font-black text-gray-800">Islamabad, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-20 text-center font-black text-red-500">SYSTEM ERROR: VIEW NOT MAPPED</div>;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      <div className="pb-24 overflow-x-hidden">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
