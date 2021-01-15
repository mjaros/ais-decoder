export default {
  longitude(lon: number): number {
    lon = lon / 600000;
    if (lon === 181) {
      return null;
    }
    return lon;
  },
  latitude(lat: number): number {
    lat = lat / 600000;
    if (lat === 91) {
      return null;
    }
    return lat;
  },
  courseOverGround(cog: number): number {
    cog = cog / 10;
    if (cog === 360) {
      return null;
    }
    return cog;
  },
  heading(heading: number): number {
    if (heading === 511) {
      return null;
    }
    return heading;
  },
  rateOfTurn(rot: number): number {
    rot = Math.sqrt(rot / 4.733);
    if (rot === -128) {
      return null;
    }
    return rot;
  },
  speedOverGround(sog: number): number {
    sog = sog / 10;
    if (sog === 102.3) {
      return null;
    }
    return sog;
  },
  inlandLengthOrBeam(lengthOrBeam: number): number {
    return Math.round(lengthOrBeam * 0.1 * 100) / 100;
  },
  inlandDraught(draught: number): number {
    return draught * 0.01;
  },
  draught(draught: number): number {
    return draught / 10;
  },
  year(year: number): number {
    if (year === 0) {
      return null;
    }
    return year;
  },
  month(month: number): number {
    if (month === 0 || month > 12) {
      return null;
    }
    return month;
  },
  day(day: number): number {
    if (day === 0 || day > 31) {
      return null;
    }
    return day;
  },
  hour(hour: number): number {
    if (hour >= 24) {
      return null;
    }
    return hour;
  },
  minute(minute: number): number {
    if (minute >= 60) {
      return null;
    }
    return minute;
  },
  second(second: number): number {
    if (second >= 60) {
      return null;
    }
    return second;
  }
};
