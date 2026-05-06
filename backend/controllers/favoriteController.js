import Favorite from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id });
  res.json(favorites);
};

export const addFavorite = async (req, res) => {
  const newFav = new Favorite({ ...req.body, userId: req.user._id });
  await newFav.save();
  res.json({ message: 'Added to favorites', newFav });
};

export const removeFavorite = async (req, res) => {
  await Favorite.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: 'Removed from favorites' });
};
