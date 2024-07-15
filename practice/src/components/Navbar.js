// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../redux/AuthSlice';

// const Navbar = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();
//   const navigate =useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <div>
//       <nav>
//         <ul>
//           {isAuthenticated ? (
//             <>
//               <li><Link to='/home'>Home</Link></li>
//               <li><Link to='/dashboard'>Dashboard</Link></li>
//               <li><button onClick={handleLogout}>LOGOUT</button></li>
//             </>
//           ) : (
//             <li><Link to='/login'>LOGIN</Link></li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;




import React from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';

const NavBar = () => {
  const cartItemCount = useSelector(state => state.cart.cartItems.length); 

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Your Logo</Link>
      </div>
      <div className="navbar-cart">
        <Link to="/cart">
          Cart <span>({cartItemCount})</span> 
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
