import React, { useEffect } from  "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PostCard  from "./PostCard";
import { useState } from "react";
import moment from "moment";


const cache = {};

//The main function that renders the selected post
const Post = (url) => {
    url = 'https://techcrunch.com/wp-json/wp/v2/posts';
    // const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const [id] = useState(useParams().id);
    const [showMore, setShowMore] = useState(false);
    
    useEffect(() => {
        if (!url) return;
        
        const fetchData = async (url) => {
            if (cache[url]) {
                const data = cache[url];
                setData(data);
            } else {
                const response = await fetch(url);
                const data = await response.json();
                cache[url] = data; // set response in cache;
                setData(data);
            }
        };

        fetchData(url);

    },
    [url]);

    useEffect(() => {
        setTimeout(() => {
            setShowMore(true);
        }, 1000);
    }, []);

    let openedPost = data && data.filter((post => post.id === Number(id)));

    let relatedPostCategory = openedPost.map(({categories}) => {

        let relArticles = data.filter(product => {
            let comparedCategory = product.categories.some(cat => categories.includes(cat));
            
            return comparedCategory;
        })
         return relArticles;
    });

    let [filterdPostCategory] = relatedPostCategory.map((post) => {
        return post.filter((post => post.id !== Number(id)));
    })
    console.log(filterdPostCategory);
    return (
      <><Header />

        {data && openedPost.map((post) => {
            let author = post["yoast_head_json"].author;
            return <div className="container" key={id}>  
            <div key={post.id}>
                <p className="heading"> By {author} <span className="post-time">{moment(post.date).fromNow()}</span></p>
                <h2 className="post-head" dangerouslySetInnerHTML={{__html: post.title.rendered}}></h2>
            </div>
            <div className="content" >
                <div className="post-body" dangerouslySetInnerHTML={{__html: post.content.rendered}}>
                </div>
            </div>
        </div>
        })}
    
            { showMore && filterdPostCategory.length > 0 ? 
            <div className="more-articles">
            More Articles
            </div> : 
            ""
        }

        <div className="asider">
            {showMore && filterdPostCategory.map((post) => {
                let author = post["yoast_head_json"].author;
                return < PostCard 
                id={post.id}
                key={post.id}
                author={author}
                postTime={moment(post.date).fromNow()}
                postTitle={post.title.rendered}
                postBody={post.content.rendered}
                postImage={post.jetpack_featured_media_url}
            />  
            })}
        </div> 

        <Footer />

     </>
    )
};

export default Post;
