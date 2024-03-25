import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import i18n from "../../i18n/i18n";


// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTag = ({tags,setTags}) => {
	const { t } = i18n;

	// Method to delete tag from Array
	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	// Method to Add tag into Array
	const handleAddition = (tag) => {
		setTags([...tags, tag]);
	};
	return (
		<div id="tags">
			<ReactTags
				tags={tags}
				placeholder={t("Press Enter to add tags")}
				delimiters={delimiters}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				inputFieldPosition="bottom"
				autocomplete
				allowDragDrop={false}
			/>
		</div>
	);
};

export default InputTag;
