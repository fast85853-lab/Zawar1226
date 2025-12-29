
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PropertyCard from './components/PropertyCard';
import PostForm from './components/PostForm';
import { Property, ViewType, PropertyType, HouseStyle } from '../types';
import { Search, Plus, Building2, ShieldCheck, Info, SlidersHorizontal, Settings, XCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('global_properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      // Mock initial data if empty
      const mock: Property[] = [
        {
          id: '1',
          title: 'Modern Apartment near Blue Area',
          type: PropertyType.RENT,
          country: 'Pakistan',
          city: 'Islamabad',
          area: 'Sector F-6',
          style: HouseStyle.DOUBLE_STORY,
          bedrooms: 3,
          bathrooms: 3,
          hasGas: true,
          hasElectricity: true,
          phoneNumber: '03001234567',
          whatsappNumber: '923001234567',
          images: [],
          price: '85,000',
          currency: 'PKR',
          language: 'Urdu/English',
          description: 'Luxurious double story apartment located in the prime sector of Islamabad.',
          createdAt: Date.now()
        }
      ];
      setProperties(mock);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('global_properties', JSON.stringify(properties));
  }, [properties]);

  const handleSaveProperty = (prop: Property) => {
    if (editingProperty) {
      setProperties(prev => prev.map(p => p.id === prop.id ? prop : p));
    } else {
      setProperties(prev => [prop, ...prev]);
    }
    setEditingProperty(undefined);
    setCurrentView('home');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this listing permanently?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    const prop = properties.find(p => p.id === id);
    if (prop) {
      setEditingProperty(prop);
      setCurrentView('post');
    }
  };

  const navigateToPost = () => {
    setEditingProperty(undefined);
    setCurrentView('post');
  };

  const filteredProperties = properties.filter(p => 
    p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Global Real Estate Market</span>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Your Dream Home <br/><span className="text-blue-300">Awaits You.</span></h1>
                <p className="text-blue-100 mb-10 text-lg opacity-90">Find, Buy, Sell or Rent properties across 300+ countries with one tap.</p>
                
                <div className="flex flex-col md:flex-row gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-3xl border border-white/20">
                  <div className="flex-1 flex items-center bg-white rounded-2xl px-5 py-4 shadow-inner">
                    <Search className="text-blue-600 w-6 h-6 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Search city, area or title..." 
                      className="bg-transparent text-gray-800 outline-none w-full font-medium placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-red-500">
                            <XCircle className="w-5 h-5" />
                        </button>
                    )}
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95">
                    Search Now
                  </button>
                </div>
              </div>
              <Building2 className="absolute right-[-40px] bottom-[-40px] w-96 h-96 text-white/5 rotate-12" />
            </div>

            {/* List Header */}
            <div className="flex justify-between items-end px-2">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                <p className="text-gray-500 font-medium">Verified listings for your consideration</p>
              </div>
              <button className="flex items-center gap-2 text-gray-600 font-bold px-5 py-3 border-2 border-gray-100 rounded-2xl hover:bg-white hover:border-blue-100 transition-all shadow-sm">
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </button>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map(p => (
                <PropertyCard key={p.id} property={p} viewMode="home" />
              ))}
              {filteredProperties.length === 0 && (
                <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                  <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">No properties found</h3>
                  <p className="text-gray-500 mb-8">Try adjusting your search terms or area.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Floating Action Button */}
            <button 
              onClick={navigateToPost}
              className="fixed bottom-8 right-8 md:hidden bg-blue-600 text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all z-50 flex items-center gap-2"
            >
              <Plus className="w-6 h-6" /> <span className="font-bold">Post</span>
            </button>
          </div>
        );

      case 'profile':
        return (
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-gray-900">My Listings</h1>
                <p className="text-gray-500 font-medium text-lg">Manage and edit your property portfolio</p>
              </div>
              <button 
                onClick={navigateToPost}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1"
              >
                <Plus className="w-6 h-6" /> Add New Listing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(p => (
                <PropertyCard 
                  key={p.id} 
                  property={p} 
                  viewMode="profile" 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              {properties.length === 0 && (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-400 mb-4">You have zero listings</h3>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto">Start listing your properties for rent or sale and reach a global audience.</p>
                  <button 
                    onClick={navigateToPost}
                    className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                  >
                    Post Your First Ad
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'post':
        return (
          <PostForm 
            onSave={handleSaveProperty} 
            onCancel={() => {
              setEditingProperty(undefined);
              setCurrentView('home');
            }} 
            editingProperty={editingProperty}
          />
        );

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto p-8 text-center mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50">
              <Settings className="w-20 h-20 text-blue-600 mx-auto mb-6" />
              <h1 className="text-4xl font-black mb-4">Settings</h1>
              <p className="text-gray-500 mb-10">Manage your preferences and privacy</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-blue-50 transition-colors">
                  <span className="font-bold text-gray-700">Push Notifications</span>
                  <div className="w-14 h-8 bg-green-500 rounded-full relative shadow-inner">
                    <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group hover:bg-blue-50 transition-colors">
                  <span className="font-bold text-gray-700">Profile Visibility</span>
                  <div className="w-14 h-8 bg-blue-600 rounded-full relative shadow-inner">
                    <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-3xl mx-auto p-8 mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50">
              <ShieldCheck className="w-20 h-20 text-green-500 mb-6" />
              <h1 className="text-4xl font-black mb-8 text-gray-900">Privacy & Security</h1>
              <div className="prose prose-lg text-gray-600 space-y-6">
                <p className="font-medium leading-relaxed">Your privacy is our number one priority. We use advanced encryption to protect your data and contact numbers.</p>
                <div className="bg-blue-50 p-6 rounded-3xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Key Terms:</h3>
                  <ul className="list-disc ml-5 space-y-2 text-blue-800">
                    <li>Contact details only visible to potential leads.</li>
                    <li>Listing location is approximate for security.</li>
                    <li>End-to-end encryption for AI descriptions.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="max-w-4xl mx-auto p-8 mt-12">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
              <Info className="w-20 h-20 text-blue-500 mx-auto mb-6" />
              <h1 className="text-4xl font-black mb-6">About GlobalHome</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
                We are building the future of real estate. A truly borderless marketplace where anyone can buy, sell, or rent property anywhere in the world with absolute confidence and speed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-gray-50 rounded-[2.5rem] hover:scale-105 transition-transform">
                  <h4 className="font-black text-3xl text-blue-600 mb-1">300+</h4>
                  <p className="font-bold text-gray-500 uppercase tracking-tighter">Countries</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-[2.5rem] hover:scale-105 transition-transform">
                  <h4 className="font-black text-3xl text-blue-600 mb-1">Instant</h4>
                  <p className="font-bold text-gray-500 uppercase tracking-tighter">Connectivity</p>
                </div>
                <div className="p-8 bg-gray-50 rounded-[2.5rem] hover:scale-105 transition-transform">
                  <h4 className="font-black text-3xl text-blue-600 mb-1">Zero</h4>
                  <p className="font-bold text-gray-500 uppercase tracking-tighter">Hidden Fees</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-20 text-center text-gray-400">View Not Found</div>;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      <div className="pb-24">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
