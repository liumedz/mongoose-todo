module.exports = function (req, res, next) {

   // res.cookie('locale', "lt", { maxAge: 900000, httpOnly: true });
  //  res.setLocale(req.cookies.locale);
    next();
};
