// src/components/InteractiveMap.jsx
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, AlertCircle } from 'lucide-react';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon function
const createCustomIcon = (status, category) => {
  const statusMapping = {
    1: 'reported',    // Open
    2: 'in-progress', // In Progress  
    3: 'acknowledged', // Under Review
    4: 'resolved'     // Resolved
  };

  const colors = {
    reported: '#ef4444',
    acknowledged: '#eab308',
    'in-progress': '#3b82f6',
    resolved: '#22c55e',
    default: '#6b7280'
  };

  const mappedStatus = statusMapping[status] || 'default';
  const color = colors[mappedStatus] || colors.default;
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
      ">
        ${category === 'road' ? '🛣️' : category === 'electricity' ? '💡' : category === 'waste' ? '🗑️' : '📍'}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Component to handle map events
const MapEventHandler = ({ onMapClick }) => {
  const map = useMap();
  
  useEffect(() => {
    if (onMapClick) {
      map.on('click', onMapClick);
      return () => map.off('click', onMapClick);
    }
  }, [map, onMapClick]);
  
  return null;
};

const InteractiveMap = ({ 
  issues = [], 
  center = [22.5726, 88.3639], // Kolkata coordinates
  zoom = 13,
  onIssueClick,
  onMapClick,
  height = '400px',
  showControls = true 
}) => {
  const mapRef = useRef();

  const getStatusBadgeVariant = (status) => {
    const statusMapping = {
      1: 'reported',    // Open
      2: 'in-progress', // In Progress  
      3: 'acknowledged', // Under Review
      4: 'resolved'     // Resolved
    };

    const mappedStatus = statusMapping[status] || 'default';
    
    switch (mappedStatus) {
      case 'reported': return 'destructive';
      case 'acknowledged': return 'secondary';
      case 'in-progress': return 'default';
      case 'resolved': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status) => {
    const statusMapping = {
      1: 'Open',
      2: 'In Progress',
      3: 'Under Review',
      4: 'Resolved'
    };
    return statusMapping[status] || 'Unknown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleMarkerClick = (issue) => {
    if (onIssueClick) {
      onIssueClick(issue);
    }
  };

  return (
    <div style={{ height, width: '100%' }} className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEventHandler onMapClick={onMapClick} />
        
        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.latitude || issue.lat, issue.longitude || issue.lng]}
            icon={createCustomIcon(issue.status, issue.category)}
            eventHandlers={{
              click: () => handleMarkerClick(issue)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-2 text-gray-900">
                      {issue.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-gray-500" />
                        <Badge variant={getStatusBadgeVariant(issue.status)} className="text-xs">
                          {getStatusLabel(issue.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600 capitalize">
                          {issue.category}
                        </span>
                      </div>
                      
                      {issue.reportedBy && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            By: {issue.reportedBy}
                          </span>
                        </div>
                      )}
                      
                      {issue.reportedDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            {formatDate(issue.reportedDate)}
                          </span>
                        </div>
                      )}
                      
                      {issue.description && (
                        <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                          {issue.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleMarkerClick(issue)}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;