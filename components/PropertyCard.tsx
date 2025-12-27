
import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Bed, 
  Bath, 
  Zap, 
  Flame, 
  Pencil, 
  Trash2,
  ExternalLink,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { Property, ViewType } from '../types';

interface PropertyCardProps {
  property: Property;
  viewMode: ViewType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode, onEdit, onDelete }) => {
  const isProfileView = viewMode === 'profile';

  const openGoogleMaps = () => {
    const query = `${property.area}, ${property.city}, ${property.country}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group border-b-4 border-b-blue-500">
      {/* Visual Header (Icon based since images removed) */}
      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <Building2 className="w-10 h-10 text-blue-600" />
        </div>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {property.type}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-[10px] font-bold">
          {property.style}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">{property.title}</h3>
        </div>
        
        <div className="mb-4">
            <span className="text-2xl font-black text-blue-600">
              {property.currency} {property.price}
            </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-red-500" />
          <span className="truncate font-medium">{property.area}, {property.city}</span>
          <button onClick={openGoogleMaps} className="ml-2 text-blue-500 hover:text-blue-700">
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-2 text-gray-600">
            <Bed className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold">{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Bath className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Flame className={`w-4 h-4 ${property.hasGas ? 'text-orange-500' : 'text-gray-300'}`} />
            <span className="text-xs font-bold">Gas: {property.hasGas ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Zap className={`w-4 h-4 ${property.hasElectricity ? 'text-yellow-500' : 'text-gray-300'}`} />
            <span className="text-xs font-bold">Bijli: {property.hasElectricity ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {isProfileView ? (
            <>
              <button onClick={() => onEdit?.(property.id)} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-2.5 rounded-xl transition-all font-bold text-sm">
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button onClick={() => onDelete?.(property.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-all font-bold text-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </>
          ) : (
            <>
              <a href={`tel:${property.phoneNumber}`} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition-all font-bold text-sm shadow-md">
                <Phone className="w-4 h-4" /> Call
              </a>
              <a href={`https://wa.me/${property.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl transition-all font-bold text-sm shadow-md">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
