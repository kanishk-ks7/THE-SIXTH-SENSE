/**
 * Centralized Geolocation & Distance Calculation Utilities
 * Athletex - Events & Competition Discovery
 */

/**
 * Calculates great-circle distance between two coordinate points using the Haversine formula
 * @param {number} lat1 Latitude of point 1
 * @param {number} lon1 Longitude of point 1
 * @param {number} lat2 Latitude of point 2
 * @param {number} lon2 Longitude of point 2
 * @param {'km' | 'mi'} unit Desired output distance unit ('km' default or 'mi')
 * @returns {number} Distance in specified unit
 */
export const calculateDistance = (lat1, lon1, lat2, lon2, unit = 'km') => {
  if (
    lat1 === undefined || lat1 === null ||
    lon1 === undefined || lon1 === null ||
    lat2 === undefined || lat2 === null ||
    lon2 === undefined || lon2 === null
  ) {
    return null;
  }

  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = earthRadiusKm * c;

  if (unit === 'mi') {
    return distanceKm * 0.621371;
  }

  return distanceKm;
};

/**
 * Human-readable distance formatter
 * @param {number} distanceKm Distance in kilometers
 * @returns {string} Formatted string (e.g. "4.5 km", "< 1 km")
 */
export const formatDistance = (distanceKm) => {
  if (distanceKm === null || distanceKm === undefined || isNaN(distanceKm)) {
    return null;
  }

  if (distanceKm < 1) {
    return '< 1 km away';
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km away`;
  } else {
    return `${Math.round(distanceKm)} km away`;
  }
};

/**
 * Promisified browser geolocation helper
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMsg = 'Unable to retrieve location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = 'Location permission was denied. Showing all events.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = 'Location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            errorMsg = 'Location request timed out. Please try again.';
            break;
          default:
            errorMsg = error.message || 'Location error occurred.';
        }
        reject(new Error(errorMsg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Augment event items with distance from user coordinates
 * @param {Array} events List of event objects
 * @param {number} userLat User's latitude
 * @param {number} userLng User's longitude
 * @returns {Array} Events with distanceKm and formattedDistance properties
 */
export const enrichEventsWithDistance = (events, userLat, userLng) => {
  if (!userLat || !userLng || !Array.isArray(events)) {
    return events;
  }

  return events.map((event) => {
    if (event.latitude && event.longitude) {
      const dist = calculateDistance(userLat, userLng, event.latitude, event.longitude);
      return {
        ...event,
        distanceKm: dist,
        formattedDistance: formatDistance(dist)
      };
    }
    return event;
  });
};

/**
 * Sort events by proximity to user location
 */
export const sortEventsByProximity = (events, userLat, userLng) => {
  const enriched = enrichEventsWithDistance(events, userLat, userLng);
  return [...enriched].sort((a, b) => {
    const distA = a.distanceKm !== undefined ? a.distanceKm : Infinity;
    const distB = b.distanceKm !== undefined ? b.distanceKm : Infinity;
    return distA - distB;
  });
};
