
import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Bed, 
  Bath, 
  Pencil, 
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Map as MapIcon,
  Tag,
  Zap,
  Flame
} from 'lucide-react';
import { Property, ViewType } from '../types.ts';

interface PropertyCardProps {
  property: Property;
  viewMode: ViewType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode, onEdit, onDelete }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const isProfileView = viewMode === 'profile';

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % property.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.area}, ${property.city}, ${property.country}`)}`;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col h-full animate-in fade-in zoom-in duration-300">
      {/* Visual Header / Image Gallery */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <>
            <img 
              src={property.images[currentImg]} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              alt={property.title} 
              loading="lazy"
            />
            {property.images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={prevImg} className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white"><ChevronLeft className="w-5 h-5 text-gray-800" /></button>
                <button onClick={nextImg} className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white"><ChevronRight className="w-5 h-5 text-gray-800" /></button>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md font-bold tracking-widest z-10">
              {currentImg + 1} / {property.images.length}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <Building2 className="w-16 h-16 text-blue-200" />
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-xl">
            {property.type}
          </div>
          <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-xl flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> {property.category}
          </div>
        </div>
        
        {/* Maps Shortcut */}
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-4 right-4 bg-white/90 p-3 rounded-2xl shadow-xl text-red-500 hover:bg-white hover:scale-110 transition-all z-10"
        >
          <MapIcon className="w-5 h-5" />
        </a>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors truncate">
          {property.title}
        </h3>
        
        {/* User Requested: Gas/Bijli (Left) & City/Area (Right, Big Font) */}
        <div className="flex justify-between items-start mb-6">
          {/* Left: Utilities */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Utilities</div>
            <div className="flex gap-2">
              {property.hasElectricity ? (
                <div className="bg-yellow-100 p-2 rounded-xl" title="Electricity (Bijli) Available">
                  <Zap className="w-6 h-6 text-yellow-600 fill-yellow-500" />
                </div>
              ) : (
                <div className="bg-gray-100 p-2 rounded-xl opacity-30" title="No Electricity">
                  <Zap className="w-6 h-6 text-gray-400" />
                </div>
              )}
              {property.hasGas ? (
                <div className="bg-orange-100 p-2 rounded-xl" title="Natural Gas Available">
                  <Flame className="w-6 h-6 text-orange-600 fill-orange-500" />
                </div>
              ) : (
                <div className="bg-gray-100 p-2 rounded-xl opacity-30" title="No Gas">
                  <Flame className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Right: City & Area (Big Font) */}
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</div>
            <div className="text-3xl font-black text-gray-900 uppercase leading-none mt-1">
              {property.city}
            </div>
            <div className="text-lg font-black text-red-600 uppercase mt-0.5 tracking-tight">
              {property.area}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-black text-blue-600 tracking-tighter">
            {property.currency} {property.price}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 text-gray-700 text-sm font-black bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <Bed className="w-5 h-5 text-blue-500" /> {property.bedrooms} Bedrooms
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-sm font-black bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <Bath className="w-5 h-5 text-blue-500" /> {property.bathrooms} Baths
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          {isProfileView ? (
            <div className="flex gap-3">
              <button onClick={() => onEdit?.(property.id)} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 hover:text-blue-600 transition-all border-2 border-transparent active:scale-95">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button onClick={() => onDelete?.(property.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm hover:bg-red-100 transition-all border-2 border-transparent active:scale-95">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${property.phoneNumber}`} className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-blue-700 hover:shadow-blue-200 transition-all active:scale-95">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={`https://wa.me/${property.whatsappNumber}`} target="_blank" className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-green-600 hover:shadow-green-200 transition-all active:scale-95">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
