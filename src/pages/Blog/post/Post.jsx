import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, writing, hour }) {
    return (
        <div className="post">
            <div className="postImg1">
          
                <img className="postImg" src={img} alt="" />
            </div>
            <div className="postInfo">
                <span className="postTitle">
                    <Link to="/post/abc" className="link">
                        Lorem ipsum dolor sit amet
                    </Link>
                </span>
                <hr />
                <span className="postDate">{hour} hour ago</span>
            </div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda officia architecto deserunt
                deleniti? Labore ipsum aspernatur magnam fugiat, reprehenderit praesentium blanditiis quos cupiditate
                ratione atque, exercitationem quibusdam, reiciendis odio laboriosam?
                {writing}
            </p>
        </div>
    );
}
