import React from 'react';
import { Text, StyleSheet } from 'react-native';

const parseMarkdown = (markdown: string) => {
	const regex = /(\*\*(.*?)\*\*)|(\*(.*?)\*)/g;
	const parts = [];
	let currentIndex = 0;

	let match;
	while ((match = regex.exec(markdown)) !== null) {
		// Text before the match
		if (match.index > currentIndex) {
			parts.push(markdown.substring(currentIndex, match.index));
		}

		if (match[1]) {
			// matched bold text with **
			parts.push(
				<Text key={match.index} style={styles.bold}>
					{match[2]}
				</Text>,
			);
		} else if (match[3]) {
			// matched italic text with *
			parts.push(
				<Text key={match.index} style={styles.italic}>
					{match[4]}
				</Text>,
			);
		}

		currentIndex = regex.lastIndex;
	}

	// Text after the last match
	if (currentIndex < markdown.length) {
		parts.push(markdown.substring(currentIndex));
	}

	return parts;
};

const MarkdownText: React.FC<{ content: string; fontSize: number }> = ({
	content,
	fontSize,
}) => {
	return (
		<Text
			style={{
				fontSize: fontSize,
			}}
		>
			{parseMarkdown(content)}
		</Text>
	);
};

const styles = StyleSheet.create({
	bold: {
		fontWeight: 'bold',
	},
	italic: {
		fontStyle: 'italic',
	},
});

export default MarkdownText;
