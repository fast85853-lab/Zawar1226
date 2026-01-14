
import React, { useState, useEffect, useRef } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Globe,
  Coins,
  Image as ImageIcon,
  Trash2,
  Upload,
  Layout as CategoryIcon,
  Bed,
  Bath,
  Zap,
  Flame,
  FileText,
  MessageCircle
} from 'lucide-react';
import { Property, PropertyType, HouseStyle, PropertyCategory } from '../types.ts';
import { COUNTRIES, COUNTRY_MAP } from '../constants.ts';
import { generatePropertyDescription } from '../services/geminiService.ts';

interface PostFormProps {
  onSave: (property: Property) => void;
  onCancel: () => void;
  editingProperty?: Property;
}

const PostForm: React.FC<PostFormProps> = ({ onSave, onCancel, editingProperty }) => {
  const [loading, setLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState(editingProperty?.country || '');
  const [showCountryList, setShowCountryList] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Property, 'id' | 'createdAt'>>({
    title: editingProperty?.title || '',
    type: editingProperty?.type || PropertyType.RENT,
    category: editingProperty?.category || PropertyCategory.HOUSE,
    country: editingProperty?.country || '',
    city: editingProperty?.city || '',
    area: editingProperty?.area || '',
    style: editingProperty?.style || HouseStyle.SINGLE_STORY,
    bedrooms: Number(editingProperty?.bedrooms) || 1,
    bathrooms: Number(editingProperty?.bathrooms) || 1,
    hasGas: editingProperty?.hasGas ?? true,
    hasElectricity: editingProperty?.hasElectricity ?? true,
    phoneNumber: editingProperty?.phoneNumber || '',
    whatsappNumber: editingProperty?.whatsappNumber || '',
    images: editingProperty?.images || [], 
    price: editingProperty?.price || '',
    currency: editingProperty?.currency || 'USD',
    language: editingProperty?.language || 'English',
    description: editingProperty?.description || '',
  });

  useEffect(() => {
    const trimmedSearch = countrySearch.trim();
    const matchedCountry = COUNTRIES.find(c => c.toLowerCase() === trimmedSearch.toLowerCase());
    
    if (matchedCountry) {
      const countryData = COUNTRY_MAP[matchedCountry];
      setFormData(prev => ({ 
        ...prev, 
        country: matchedCountry,
        currency: countryData?.currency || 'USD',
        language: countryData?.language || 'English'
      }));
    }
  }, [countrySearch]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string].slice(0, 5)
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const toggleUtility = (name: 'hasGas' | 'hasElectricity') => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleAISuggestion = async () => {
    if (!formData.title || !formData.country) {
      alert("Please enter title and country first.");
      return;
    }
    setLoading(true);
    const desc = await generatePropertyDescription(formData);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.city || !formData.area || !countrySearch) {
      alert("Please fill in all mandatory fields: Title, Price, Country, City, and Area.");
      return;
    }

    const finalProperty: Property = {
      ...formData,
      country: countrySearch,
      id: editingProperty?.id || Math.random().toString(36).substr(2, 9),
      createdAt: editingProperty?.createdAt || Date.now()
    };
    
    onSave(finalProperty);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black">{editingProperty ? 'Edit Listing' : 'List New Property'}</h2>
            <p className="text-blue-100 font-medium tracking-wide uppercase text-xs">Premium Property Management</p>
          </div>
          <button type="button" onClick={onCancel} className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          {/* Gallery Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-purple-500" /> Property Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 group">
                  <img src={img} className="w-full h-full object-cover" alt="Home" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.images.length < 5 && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-gray-50">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Photo</span>
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple accept="image/*" className="hidden" />
          </section>

          {/* Primary Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-6 rounded-[2rem]">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Property Category</label>
              <div className="relative">
                <CategoryIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                <select name="category" value={formData.category} onChange={handleChange} className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold appearance-none shadow-sm transition-all">
                  <option value={PropertyCategory.HOUSE}>House</option>
                  <option value={PropertyCategory.SHOP}>Shop</option>
                  <option value={PropertyCategory.VILLA}>Villa</option>
                  <option value={PropertyCategory.APARTMENT}>Apartment</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Listing Purpose</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-5 py-4 bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold shadow-sm transition-all">
                <option value={PropertyType.RENT}>For Rent</option>
                <option value={PropertyType.SALE}>For Sale</option>
              </select>
            </div>
          </section>

          {/* User Requested Layout: Utilities (Left) and City/Area (Right, Big Font) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT SIDE: GAS & BIJLI */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" /> Utilities (Services)
              </h3>
              <div className="space-y-4">
                <button 
                  type="button" 
                  onClick={() => toggleUtility('hasElectricity')}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all font-bold ${formData.hasElectricity ? 'bg-yellow-50 border-yellow-200 text-yellow-700 shadow-lg scale-[1.02]' : 'bg-gray-50 border-transparent text-gray-400 opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${formData.hasElectricity ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-lg">Electricity (Bijli)</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.hasElectricity ? 'bg-yellow-500 border-yellow-500' : 'border-gray-200'}`}>
                    {formData.hasElectricity && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
                
                <button 
                  type="button" 
                  onClick={() => toggleUtility('hasGas')}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all font-bold ${formData.hasGas ? 'bg-orange-50 border-orange-200 text-orange-700 shadow-lg scale-[1.02]' : 'bg-gray-50 border-transparent text-gray-400 opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${formData.hasGas ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-lg">Natural Gas</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.hasGas ? 'bg-orange-500 border-orange-500' : 'border-gray-200'}`}>
                    {formData.hasGas && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              </div>

              {/* Rooms moved here for balance */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bedrooms</label>
                  <div className="relative">
                    <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl outline-none font-bold text-lg border-2 border-transparent focus:border-blue-500 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bathrooms</label>
                  <div className="relative">
                    <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl outline-none font-bold text-lg border-2 border-transparent focus:border-blue-500 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: CITY & AREA (BIG FONT) */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-red-500" /> Location Details
              </h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">City Name</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 opacity-30" />
                    <input 
                      required 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      placeholder="e.g. ISLAMABAD" 
                      className="w-full pl-16 pr-6 py-8 bg-blue-50/50 text-4xl font-black text-blue-900 placeholder:text-blue-100 border-2 border-transparent focus:border-blue-500 rounded-[2.5rem] outline-none transition-all shadow-inner uppercase tracking-tight" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Area / Sector / Street</label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-red-500 opacity-30" />
                    <input 
                      required 
                      name="area" 
                      value={formData.area} 
                      onChange={handleChange} 
                      placeholder="e.g. F-10 SECTOR" 
                      className="w-full pl-16 pr-6 py-8 bg-red-50/50 text-3xl font-black text-red-900 placeholder:text-red-100 border-2 border-transparent focus:border-red-500 rounded-[2.5rem] outline-none transition-all shadow-inner uppercase tracking-tight" 
                    />
                  </div>
                </div>
              </div>

              {/* Country Selection nested under location */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="relative">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Country</label>
                  <input 
                    type="text" required
                    placeholder="Search..."
                    value={countrySearch}
                    onFocus={() => setShowCountryList(true)}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setShowCountryList(true);
                    }}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none font-bold shadow-sm"
                  />
                  {showCountryList && (
                    <div className="absolute z-30 w-full mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl max-h-48 overflow-y-auto">
                      {COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map(c => (
                        <button
                          key={c} type="button"
                          onClick={() => { setCountrySearch(c); setShowCountryList(false); }}
                          className="w-full text-left px-5 py-4 hover:bg-blue-50 text-sm font-bold border-b border-gray-50 last:border-0"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Currency</label>
                  <div className="px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 font-black flex items-center gap-3 border border-gray-100">
                    <Coins className="w-5 h-5 text-blue-500" /> {formData.currency}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing & Title */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Building className="w-6 h-6 text-blue-600" /> Pricing & Heading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Property Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Luxury 3-Bedroom Villa in Heart of City" className="w-full px-5 py-5 bg-gray-50 rounded-2xl outline-none font-bold text-lg border-2 border-transparent focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">{formData.currency}</span>
                  <input required name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full pl-20 pr-5 py-5 bg-gray-50 rounded-2xl outline-none font-black text-xl border-2 border-transparent focus:border-blue-500 transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> Primary Phone
              </label>
              <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+92 ..." className="w-full px-6 py-5 bg-white/10 text-white rounded-2xl outline-none font-bold border border-white/10 focus:border-blue-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp Number
              </label>
              <input required name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="92300..." className="w-full px-6 py-5 bg-white/10 text-white rounded-2xl outline-none font-bold border border-white/10 focus:border-green-400 transition-all" />
              <p className="mt-2 text-[10px] text-gray-400 font-medium">Please include country code without '+' for direct WhatsApp linking.</p>
            </div>
          </section>

          {/* Conditional Description for For Sale */}
          {formData.type === PropertyType.SALE && (
            <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 border-2 border-indigo-50 p-8 rounded-[2.5rem]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-indigo-500" /> Detailed Description
                </h3>
                <button type="button" onClick={handleAISuggestion} disabled={loading} className="text-xs font-black text-blue-600 flex items-center gap-2 bg-blue-50 px-5 py-3 rounded-2xl hover:bg-blue-100 transition-all shadow-sm">
                  <Sparkles className="w-4 h-4" /> {loading ? 'Thinking...' : 'AI Suggest Description'}
                </button>
              </div>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={6} 
                placeholder="Share more details about your property for potential buyers..." 
                className="w-full px-6 py-5 bg-white rounded-2xl outline-none font-medium text-lg resize-none border-2 border-gray-100 focus:border-indigo-400 transition-all shadow-inner" 
              />
            </section>
          )}

          <div className="flex flex-col md:flex-row gap-4 pt-10">
            <button type="button" onClick={onCancel} className="flex-1 px-8 py-6 border-2 border-gray-100 text-gray-500 font-black rounded-[2rem] hover:bg-gray-50 transition-all text-xl">Cancel</button>
            <button type="submit" className="flex-[2] bg-blue-600 text-white font-black py-6 rounded-[2rem] shadow-2xl hover:bg-blue-700 flex items-center justify-center gap-4 active:scale-95 transition-all text-xl group">
              <CheckCircle2 className="w-8 h-8 group-hover:rotate-12 transition-transform" /> 
              {editingProperty ? 'Update Changes' : 'Publish Property Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
