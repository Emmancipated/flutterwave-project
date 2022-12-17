import React from "react";
import Header from "./Header";
import Posts from './Posts';
import Footer from "./Footer";


class Home extends React.Component {

    render() {
        return <div className="container">
        <Header />
        <main className="main-body">      
        <Posts />
        </main>
        <Footer />
        
    </div>
    }
    
}

export default Home;

