import React from  "react";
import {BrowserRouter as Router, Route, Routes} from  "react-router-dom";
import Home from "./Home";
import Post from "./Post";
import PaymentPage from "./Payment";


class App extends React.Component {

   render() {
      return (
         <>
         <Router basename={process.env.PUBLIC_URL}>
           <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts/:id" element={<Post />} />
            <Route exact path="/payment" element={<PaymentPage />} />
            </Routes>
            
         </Router>
         </>); 
         
   }
   
};


export default App;
