export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "No autorizado" });
  next();
};

export const isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher" && req.user.role !== "admin") 
    return res.status(403).json({ msg: "No autorizado" });
  next();
};

export const isStudent = (req, res, next) => {
  if (req.user.role !== "student") return res.status(403).json({ msg: "No autorizado" });
  next();
};
