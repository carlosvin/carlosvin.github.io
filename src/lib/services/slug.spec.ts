import { toHashtags } from './slug';
import { expect, test } from 'vitest';

test('toHashtags should return empty string when given an empty list', () => {
	const result = toHashtags([]);
	expect(result).toBe('');
});

test('toHashtags should return a single hashtag when given a list with one item', () => {
	const result = toHashtags(['programming']);
	expect(result).toBe('#programming');
});

test('toHashtags should return hashtags separated by space when given a list with multiple items', () => {
	const result = toHashtags(['programming', 'javascript', 'typescript']);
	expect(result).toBe('#programming #javascript #typescript');
});

test('toHashtags should return hashtags separated by a custom separator when specified', () => {
	const result = toHashtags(['programming', 'javascript', 'typescript'], ', ');
	expect(result).toBe('#programming, #javascript, #typescript');
});
