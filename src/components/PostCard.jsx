import React from  "react";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

class PostCard extends React.Component {
    
    readTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words/wpm);
        return time;
    }
   
    render() {
                
        return <article className="card" key={this.props.id}>
                    <div>
                        <a href={`/posts/${this.props.id}`}><img src={this.props.postImage} alt="topic" /></a>
                    </div>
                    <div className="content">
                        <div>
                            <p className="heading"> By {this.props.author} <span className="post-time">{this.props.postTime}</span></p>
                            <a href={`/posts/${this.props.id}`} style={{textDecoration: "none"}} ><h2 className="post-head" dangerouslySetInnerHTML={{__html: this.props.postTitle }}></h2></a>
                        </div>
                        <p className="post-body" dangerouslySetInnerHTML={{__html: this.props.postBody.substring(0, 300)}}>
                        </p>
                        <div className="post-footer">
                            <p className="read-time">{this.readTime(this.props.postBody)} Min Read</p>
                            <a href={`/posts/${this.props.id}`} className="read-more">Read more <TrendingFlatIcon /></a>
                        </div>
                    </div>
                </article>
    }
}


export default PostCard;