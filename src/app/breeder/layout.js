//Update

// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
// import { Children } from 'react'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

const Layout = ({children}) => {

  return (
    <>
     {/* <Header /> */}
      <ToastContainer limit={1}/>
      {children}
      {/* <Footer /> */}
    </>
  )
}

export default Layout