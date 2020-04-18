import moment from 'moment';
import { TasksArray } from '@/typings/tasks';

export const formatDate = (date, format = 'MMMM D, YYYY') =>
  date ? moment(date).format(format) : date;

export const formatDateTime = (date, format = 'MMMM D, YYYY, h:mm A') =>
  date ? moment(date).format(format) : date;

export const formatDateTimeForAPI = date =>
  date
    ? moment(date)
        .utc()
        .format()
    : date;

export const formatDateTimeConversational = date =>  (date ? moment(date).fromNow() : date);


export const isOverdue = (dueDate) => {
  const today = moment(new Date())
  const date = moment(dueDate)
  return !date.isAfter(today, 'day');
}

export const isSoonDue = (dueDate, days) => {
  const today = moment(new Date())
  const date = moment(dueDate)

  return !(date).subtract(days, 'days').isAfter(today, 'day')
}

export const dueness = (tasks: TasksArray) => {
  const overdueTasks = tasks.filter(o => o.dueDate && isOverdue(o.dueDate.toDate()))
  const overduePercent = parseInt(((overdueTasks.length/tasks.length)*100).toFixed(0))
  const soondueTasks = tasks.filter(o => o.dueDate && isSoonDue(o.dueDate.toDate(), 2))
  const soonduePercent = parseInt((((soondueTasks.length - overdueTasks.length)/tasks.length)*100).toFixed(0))
  const nodueTasks = tasks.filter(o => !o.dueDate)
  const noduePercent = parseInt((((nodueTasks.length)/tasks.length)*100).toFixed(0))
  const futureDuePercent = (100-overduePercent-soonduePercent-noduePercent)
  return {
    overduePercent,
    soonduePercent,
    noduePercent,
    futureDuePercent
  }
}