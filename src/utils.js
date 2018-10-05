import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

const Utils = {
  getResetAction(routeName, params = null) {
    return NavigationActions.reset({
      index: 0,
      params,
      actions: [NavigationActions.navigate({ routeName })],
    });
  },
  
  getFileNameFromUri(uri) {
    if (Platform.OS === 'ios') {
      return uri.fileName;
    }
    return uri.path.replace(/^.*[\\\/]/, '');
  },

  getFileNameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1);
  },

  getKeywordList(keyword, keywordList, hintList) {
    const findMatch = (term1, term2) => term1.name.toLowerCase().indexOf(term2.toLowerCase()) > -1;
    let results = keywordList.filter((eachTerm) => {
      if (findMatch(eachTerm, keyword)) return eachTerm;
    });
    results = results.filter(x => hintList.map(e => e._id).indexOf(x._id) === -1);
    const inputIsEmpty = !!(keyword.length <= 0);
    return inputIsEmpty ? [] : results;
  },

  getStringFromArray(array) {
    let ret = '[';
    if (array.length > 0) {
      array.forEach(item => {
        ret += '"';
        ret += item;
        ret += '", ';
      });
      ret = ret.slice(0, -2);
    }
    ret += ']';
    return ret;
  },

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  clone(obj) {
    if (obj == null || typeof obj !== 'object') return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  },

  getStringFromDate(date, type = 'short') {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = (date.getMonth());
    const day = date.getDate();
    const year = date.getFullYear();
    if (type === 'short') {
      return monthNames[month] + ' ' + year;
    }
    return day + ' ' + monthNames[month] + ' ' + year + ' ' + this.getAMPM(date);
  },

  getAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  },

  getRankString(rank) {
    const tRank = rank + 1;
    if (tRank === 1) {
      return `${tRank}st`;
    } else if (tRank === 2) {
      return `${tRank}nd`;
    } else if (tRank === 3) {
      return `${tRank}rd`;
    }
    return `${tRank}th`;
  },

  truncateString(str, len, isFileName = true) {
    const lastStr = isFileName ? str.substring(str.lastIndexOf('.') + 1, str.length).toLowerCase() : str.substr(str.length - 3);
    let firstStr = isFileName ? str.replace(`.${lastStr}`, '') : str.replace(lastStr, '');
    if (firstStr.length <= len) return str;
    firstStr = firstStr.substr(0, len) + (str.length > len ? '...' : '');
    return isFileName ? `${firstStr}.${lastStr}` : `${firstStr}${lastStr}`;
  },

  todayOrYesterday(date) {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
    if (isToday) return 0;
    if (isYesterday) return 1;
    return 2;
  },

  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  },
};

export default Utils;
