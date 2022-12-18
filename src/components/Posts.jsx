import React from "react";
import moment from "moment";
import PostCard from "./PostCard"

const url = 'https://techcrunch.com/wp-json/wp/v2/posts'
const cache = {};

class Posts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            status: 'idle',
            data: []        
        })
    }

    componentDidMount() {
       
       if (!url) return;
        this.setState({status: 'fetching'});

       if(cache[url]) {
        this.setState({
            data: cache[url],
            status: 'fetched'
        })
       
       } else {       
         fetch(url) // {headers:{'Content-Type': 'application/json', 'Accept': 'application/json'}}
        .then((response) => response.json())
        .then((json) => {
           this.setState({
              data: json,
              status: 'fetched'            
           });
        })  
       }         
    }

    render() {
    const {data} = this.state;
    return (<>
  

    {data.map((item) => {
        let timeAgo = moment(item.parsely.meta.dateCreated).fromNow();
       return <article className="main-banner" key={item.id}>
           < PostCard 
           id={item.id}
           author={item.parsely.meta.creator}
           postTime={timeAgo}
           postTitle={item.title.rendered}
           postBody={item.content.rendered}
           postImage={item.jetpack_featured_media_url}
           />
        </article>
      
    })}
    </>)
}
}

export default Posts;
