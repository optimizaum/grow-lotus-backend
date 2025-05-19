const Adminonly = async (req, res, next) => {
  try {
    console.log(req.user.role);
    if (req.user.role != "admin") {
      return res.status(403).json("You are not authorized to access this resource");
    }
    next();
  } catch (error) {
    return res.status(500).json("Enteral error");
  }
};

export default Adminonly;
