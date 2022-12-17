import React, { useEffect } from  "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PostCard  from "./PostCard";
import { useState } from "react";
import moment from "moment";


const cache = {};
var relatedPosts = []; //for related posts

//The main function that renders the selected post
const Post = (url) => {
    url = 'https://techcrunch.com/wp-json/wp/v2/posts'
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const [id, setId] = useState(useParams().id);
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        if (!url) return;
        
        const fetchData = async () => {
            setStatus('fetching');
            if (cache[url]) {
                const data = cache[url];
                setData(data);
                setStatus('fetched');
            } else {
                const response = await fetch(url);
                const data = await response.json();
                cache[url] = data; // set response in cache;
                setData(data);
                setStatus('fetched');
                setCategory(relatedPosts);
            }
        };

        fetchData();

    },
    [url]);

    return (
      <><Header />
      
        {data.map((item) => {
            
        if(item.id === Number(id)) {
               relatedPosts.unshift(item.categories)
                // relatedPosts = [...item.categories]
                    return <div className="container" key={id}>  
                    <div key={item.id}>
                        <p className="heading"> By {item.parsely.meta.creator} <span className="post-time">{moment(item.parsely.meta.dateCreated).fromNow()}</span></p>
                        <h2 className="post-head" dangerouslySetInnerHTML={{__html: item.title.rendered}}></h2>
                    </div>
                    <div className="content" >
                        <div className="post-body" dangerouslySetInnerHTML={{__html: item.content.rendered}}>
                        </div>
                    </div>
                </div>
        } 
        
        })}
    
        {data.map((item) => (areEqual(item.categories, relatedPosts[0]) && relatedPostsArray(item.categories, relatedPosts[0]) === true?<div className="more-articles">More Articles</div>:""))}
        
        <div className="asider">
            {data.map((item, index) => {
                    return (areEqual(item.categories, relatedPosts[0]) && relatedPostsArray(item.categories, relatedPosts[0]) === true? 
                        < PostCard 
                            id={item.id}
                            key={index}
                            author={item.parsely.meta.creator}
                            postTime={moment(item.parsely.meta.dateCreated).fromNow()}
                            postTitle={item.title.rendered}
                            postBody={item.content.rendered}
                            postImage={item.jetpack_featured_media_url}
                        /> 
                        : 
                        "")
            }  
          )}
        </div>
        <Footer />

     </>
    )
};

//Function to eliminate the current post from the related post
 const areEqual = (array1, array2) => {
    if(array1.length === array2.length) {
        return array1.every((element, index) => {
            if (element === array2[index]) {
                return false;
                // return true;
            }
            return true;
        });
    }
    return true;
 } 


//Function that searches for the related posts
const relatedPostsArray = (array1, array2) => {    
        return array1.every((element) => {
            if (array2.includes(element)) {
                return true;
            }
            return false;
        });    
} 


export default Post;
