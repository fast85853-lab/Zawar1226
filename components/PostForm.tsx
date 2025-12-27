
import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Plus,
  Globe,
  Coins
} from 'lucide-react';
import { Property, PropertyType, HouseStyle } from '../types';
import { COUNTRIES, COUNTRY_MAP } from '../constants';
import { generatePropertyDescription } from '../services/geminiService';

interface PostFormProps {
  onSave: (property: Property) => void;
  onCancel: () => void;
  editingProperty?: Property;
}

const PostForm: React.FC<PostFormProps> = ({ onSave, onCancel, editingProperty }) => {
  const [loading, setLoading] = useState(false);
  const [countrySearch, setCountrySearch] = useState(editingProperty?.country || '');
  const [showCountryList, setShowCountryList] = useState(false);

  const [formData, setFormData] = useState<Omit<Property, 'id' | 'createdAt'>>({
    title: editingProperty?.title || '',
    type: editingProperty?.type || PropertyType.RENT,
    country: editingProperty?.country || '',
    city: editingProperty?.city || '',
    area: editingProperty?.area || '',
    style: editingProperty?.style || HouseStyle.SINGLE_STORY,
    bedrooms: editingProperty?.bedrooms || 1,
    bathrooms: editingProperty?.bathrooms || 1,
    hasGas: editingProperty?.hasGas ?? true,
    hasElectricity: editingProperty?.hasElectricity ?? true,
    phoneNumber: editingProperty?.phoneNumber || '',
    whatsappNumber: editingProperty?.whatsappNumber || '',
    images: [], // Images removed from system
    price: editingProperty?.price || '',
    currency: editingProperty?.currency || 'USD',
    language: editingProperty?.language || 'English',
    description: editingProperty?.description || '',
  });

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        title: editingProperty.title,
        type: editingProperty.type,
        country: editingProperty.country,
        city: editingProperty.city,
        area: editingProperty.area,
        style: editingProperty.style,
        bedrooms: editingProperty.bedrooms,
        bathrooms: editingProperty.bathrooms,
        hasGas: editingProperty.hasGas,
        hasElectricity: editingProperty.hasElectricity,
        phoneNumber: editingProperty.phoneNumber,
        whatsappNumber: editingProperty.whatsappNumber,
        images: [],
        price: editingProperty.price,
        currency: editingProperty.currency,
        language: editingProperty.language,
        description: editingProperty.description || '',
      });
      setCountrySearch(editingProperty.country);
    }
  }, [editingProperty]);

  const filteredCountries = COUNTRIES.filter(c => 
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (countryName: string) => {
    const data = COUNTRY_MAP[countryName] || { currency: "USD", language: "English" };
    setFormData(prev => ({ 
      ...prev, 
      country: countryName,
      currency: data.currency,
      language: data.language
    }));
    setCountrySearch(countryName);
    setShowCountryList(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleAISuggestion = async () => {
    setLoading(true);
    const desc = await generatePropertyDescription({
      ...formData,
      context: `Write in ${formData.language} style.`
    });
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country) {
        alert("Please select a country");
        return;
    }
    onSave({
      ...formData,
      id: editingProperty?.id || Math.random().toString(36).substr(2, 9),
      createdAt: editingProperty?.createdAt || Date.now()
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{editingProperty ? 'Edit Listing' : 'Post New Property'}</h2>
            <p className="text-blue-100 text-sm">International Real Estate Marketplace</p>
          </div>
          <button onClick={onCancel} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {/* Country Selection First for Auto-detect */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Globe className="w-5 h-5 text-blue-500" /> International Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                <input 
                  type="text"
                  placeholder="Type country name..."
                  value={countrySearch}
                  onFocus={() => setShowCountryList(true)}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setShowCountryList(true);
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {showCountryList && filteredCountries.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border rounded-xl shadow-2xl max-h-60 overflow-y-auto border-gray-200">
                    {filteredCountries.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleCountrySelect(c)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm border-b last:border-0"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Auto Currency</label>
                  <div className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 font-bold flex items-center gap-2">
                    <Coins className="w-4 h-4" /> {formData.currency}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Auto Language</label>
                  <div className="px-4 py-3 bg-gray-100 border rounded-xl text-gray-700 font-medium">
                    {formData.language}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Building className="w-5 h-5 text-blue-600" /> Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Property Title</label>
                <input 
                  required
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="e.g. Modern Villa in Downtown"
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                >
                  <option value={PropertyType.RENT}>For Rent</option>
                  <option value={PropertyType.SALE}>For Sale</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ({formData.currency})</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{formData.currency}</span>
                  <input 
                    required
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full pl-14 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                <input 
                  required
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Area</label>
                <input 
                  required
                  name="area" 
                  value={formData.area} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} min="0" className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} min="0" className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
              <div className="flex flex-col justify-center gap-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="hasGas" checked={formData.hasGas} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                  <span className="text-sm font-bold text-gray-700">Gas (گیس)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="hasElectricity" checked={formData.hasElectricity} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                  <span className="text-sm font-bold text-gray-700">Bijli (بجلی)</span>
                </label>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
                <input required type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none" />
              </div>
          </div>

          <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-gray-700">Property Description</label>
                <button type="button" onClick={handleAISuggestion} disabled={loading} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" /> {loading ? 'Analyzing...' : 'AI localized write'}
                </button>
              </div>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none resize-none" />
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl">Cancel</button>
            <button type="submit" className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all">
              <CheckCircle2 className="w-6 h-6 inline mr-2" /> {editingProperty ? 'Update Post' : 'Post Globally'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
