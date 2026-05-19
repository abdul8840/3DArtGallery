export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }
};

export const adminOrArtist = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'artist')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin or Artist only.',
    });
  }
};