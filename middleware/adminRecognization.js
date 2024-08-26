
export const isAdmin = (req, res, next) => {
   
    if (req.user && req.user.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' }); 
    }
  };
  
  
  export const isManager = (req, res, next) => {
    
    if (req.user && req.user.role === 'manager') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. Managers only.' }); 
    }
  };

  export const isAdminOrManager = (req, res, next) => {
    //console.log(req.user,'uuuu');
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. Admins and Managers only allowed.' }); 
    }
  };