import style from "./Posts.module.scss";
//import PostComponent from "../../components/PostComponent/PostComponent";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../utils/api";
/*import PostForm from "../../components/PostForm/PostForm";
import CustomButton from "../../components/CustomButton/CustomButton";
import ScrollTopButton from "../../components//ScrollTopButton/ScrollTopButton";*/

export default function Post() {
	const params = useParams();
	const [postData, setPostData] = useState([]);
	const [repliesData, setReplies] = useState([]);
	const [updatePostContent, setUpdatePostContent] = useState(false);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const parentPost = await api.getPostParent(params.id, 2);
				const replies = await api.getPostReplies(params.id, 7);

				if (parentPost.status === 200) setPostData(parentPost.data);
				if (replies.status === 200) setReplies(replies.data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchServices();
	}, [params, updatePostContent]);

	if (postData.length === 0) return null;

	return (
		<div>
			<h1 className={style["title"]}>Post</h1>
			<main className={style["main-content"]}>
				<div className={style["post-links"]}>
					{/*postData.at(-1).replyParentId && (
						<CustomButton purpose="action" to={"/post/" + postData.at(-1).replyParentId}>
							{"< Back"}
						</CustomButton>
					)*/}
					{/*postData.at(-1).originalPostParentId && (
						<CustomButton purpose="action" to={"/post/" + postData.at(-1).originalPostParentId}>
							{"To start"}
						</CustomButton>
					)*/}
				</div>
				{/*<ParentLoop posts={postData} index={0} />
				<PostForm updateInterface={setUpdatePostContent}
						   disabled={postData.at(-1).removed} type="reply"
						   title="New Reply"/>*/}
				<div className={style["main-replies"]}>
					{/*<CommentPosts replies={repliesData} loadMore={2}/>*/}
				</div>
			</main>
			{/*<ScrollTopButton/>*/}
		</div>
	);

	/*function ParentLoop({ posts, index }) {
		const post = posts[index];
		if (!post?._id) return null;
		return <PostComponent key={post._id} post={post} onUpdate={setPostData} children={<ParentLoop posts={posts} index={index + 1} />} />;
	}*/

	/*function CommentPosts({ replies, more, startNestingLevel, loadMore }) {
		if (!replies.length) return null;
		if (!replies?.[0]?._id) return more;

		return (
			<>
				{replies.map((reply) => (
					<PostComponent
						post={reply}
						key={reply._id}
						onUpdate={setReplies}
						children={
							<CommentPosts
								key={reply._id}
								replies={reply?.comments}
								startNestingLevel={startNestingLevel ?? reply.nestingLevel}
								loadMore={loadMore}
								more={reply.nestingLevel - startNestingLevel < loadMore ? <LoadMoreComments link={reply._id} /> : more}
							/>
						}
					/>
				))}
			</>
		);
	}*/
}

/*function LoadMoreComments(props) {
	return (
		<CustomButton to={"/post/" + props.link} className={style["load-more-button"]} purpose="action">
			Load more
		</CustomButton>
	);
}*/
