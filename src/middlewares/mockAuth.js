module.exports = (req, res, next) => {
  req.user = {
    id: "69d33e10652dfa21aac72949",
    role: "admin"
  };
  next();
};