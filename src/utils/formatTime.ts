import { format, differenceInMilliseconds } from 'date-fns';
import _ from 'lodash';

export const formatTime = (timeString: string | Date): string => {
  if (typeof timeString === 'string') {
    return format(new Date(timeString), 'yy.MM.dd');
  } else if (timeString instanceof Date) {
    return format(timeString, 'yy.MM.dd');
  } else {
    return '-';
  }
};

export const formatTimeUntilSecond = (timeString: string | Date): string => {
  if (typeof timeString === 'string') {
    return format(new Date(timeString), 'yyyy-MM-dd HH:mm:ss');
  } else if (timeString instanceof Date) {
    return format(timeString, 'yyyy-MM-dd HH:mm:ss');
  } else {
    return '-';
  }
};

export const formatDate = (timeString: string | Date): string => {
  if (typeof timeString === 'string') {
    return format(new Date(timeString), 'yyyy.MM.dd');
  } else if (timeString instanceof Date) {
    return format(timeString, 'yyyy.MM.dd');
  } else {
    return '-';
  }
};

export const subFormatTime = (
  entireTime: string | Date | undefined,
  startTime: string | Date | undefined,
) => {
  if (_.isUndefined(entireTime) || _.isUndefined(startTime)) {
    return '-';
  } else {
    const entireDate = _.isString(entireTime) ? new Date(entireTime) : entireTime;
    const startDate = _.isString(startTime) ? new Date(startTime) : startTime;

    const durationInMilliseconds = differenceInMilliseconds(entireDate, startDate);

    const durationHours = Math.floor(durationInMilliseconds / 3600000);
    const durationMinutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
    const durationSeconds = Math.floor((durationInMilliseconds % 60000) / 1000);

    return `${durationHours ? durationHours + 'h ' : ''}${
      durationMinutes ? durationMinutes + 'm ' : ''
    }${durationSeconds ? durationSeconds + 's' : ''}`;
  }
};

export const formatDashedDate = (timeString: string | Date): string => {
  if (typeof timeString === 'string') {
    return format(new Date(timeString), 'yyyy-MM-dd');
  } else if (timeString instanceof Date) {
    return format(timeString, 'yyyy-MM-dd');
  } else {
    return '-';
  }
};
