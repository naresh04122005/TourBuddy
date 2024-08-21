const saveRedirectUrl = (req, res, next) => {
  // console.log(req);y
  
  res.locals.redirectUrl = req.session.returnTo;
  // console.log(res.locals.redirectUrl);
  next();
};

module.exports = saveRedirectUrl;
