//import React from 'react';
//import { BrowserRouter, Routes, Route,  Navigate } from 'react-router-dom';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import HomePage from './components/HomePage';
// import { useSelector } from 'react-redux';
// import Todo from './components/Todo';
// import { Provider } from 'react-redux';
// import store from './redux/Store';
// import ProductList from './components/ProductList';
// import ProductDetail from './components/ProductDetail';

// import Cart from './components/Cart';

// import NavBar from './components/Navbar';
// // import Admin from './components/Admin';

// const App = () => {
//  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<HomePage />} />
    //     <Route path='/login' element={<Login />} />
    //     {isAuthenticated ? (
    //       <>
    //         <Route path='/home' element={<Home />} />
    //         <Route path='/dashboard' element={<Dashboard />} />
    //       </>
    //     ) : (
    //       <Route path='*' element={<Navigate to="/" replace />} />
    //     )}
    //   </Routes>
    // </BrowserRouter>
    // <>
    // <Todo/>
    // </>



    

//     <Provider store={store}>
//     <BrowserRouter>
//       <NavBar/>
//       <Routes>
//         <Route path="/" element={<ProductList />} />
//         <Route path="/products/:productId" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </BrowserRouter>
    
//   </Provider>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/Store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import NavBar from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
