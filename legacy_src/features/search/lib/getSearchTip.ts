import { searchTips } from '../model/constants';

export const getSearchTip = () =>
  searchTips[Math.floor(Math.random() * searchTips.length)];
