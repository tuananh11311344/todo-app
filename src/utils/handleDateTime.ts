import {Timestamp} from '@react-native-firebase/firestore';
import {monthNames} from '../constants/appInfos';

export class HandleDateTime {
  static FormatDate(date: Timestamp): string {
    const dateObj = new Date(date.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return dateObj.toLocaleDateString('en-US', options);
  }

  static formatHoursMinutes(date: Timestamp): string {
    const dateObj = new Date(date.seconds * 1000);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }
  static formatHours(date: Timestamp): string {
    const dateObj = new Date(date.seconds * 1000);
    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours} ${ampm}`;
  }

  static GetHour(timestamp: Timestamp): string {
    return HandleDateTime.formatHoursMinutes(timestamp);
  }
}
