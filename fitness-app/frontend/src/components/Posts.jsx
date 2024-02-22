const Posts = ({postData}) => {
    return (
        <ul className="main-posts">
            {postData.map((post, index) =>
                <li key={index}>{post}</li>
            )}
        </ul>
    );
}

export default Posts;