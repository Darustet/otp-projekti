// import React from "react";
// import { WithContext as ReactTags } from "react-tag-input";

// // Specifies which characters should terminate tags input. An array of character codes.
// const KeyCodes = {
// 	comma: 188,
// 	enter: 13,
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

// const InputTag = () => {
// 	const [tags, setTags] = React.useState([]);

// 	// Method to delete tag from Array
// 	const handleDelete = (i) => {
// 		setTags(tags.filter((tag, index) => index !== i));
// 	};

// 	// Method to Add tag into Array
// 	const handleAddition = (tag) => {
// 		setTags([...tags, tag]);
// 	};
// 	return (
// 		<div id="tags">
// 			<ReactTags
// 				tags={tags}
// 				delimiters={delimiters}
// 				handleDelete={handleDelete}
// 				handleAddition={handleAddition}
// 				inputFieldPosition="bottom"
// 				autocomplete
// 				allowDragDrop={false}
// 			/>
// 		</div>
// 	);
// };

// export default InputTag;
