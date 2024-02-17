const Posts = ({postData}) => {
    return (
        <ul className="main-posts">
            {postData.map((post, index) =>
                <li key={index} className="main-listed-post">{post}</li>
            )}
        </ul>
    );
}

export default Posts;