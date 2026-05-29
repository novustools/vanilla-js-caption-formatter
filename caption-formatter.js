/**
 * NovusTools - Vanilla JS Caption Formatter Logic
 * Fixes line breaks, extracts hashtags, and analyzes social media hooks.
 */

const PLATFORM_LIMITS = {
    instagram: { char: 2200, tags: 30 },
    linkedin: { char: 3000, tags: 10 },
    tiktok: { char: 2200, tags: 5 }
};

function formatAndAnalyzeCaption(rawText, platform = 'instagram') {
    if (!rawText) return null;

    // 1. Line Break Fix (Injecting Zero-Width Spaces for empty lines)
    const lines = rawText.split('\n');
    const processedLines = lines.map(line => {
        if (line.trim() === '') return '\u200B'; // The magic invisible character
        return line;
    });
    
    const formattedText = processedLines.join('\n');

    // 2. Metrics & Limits Extraction
    const charLength = rawText.length;
    // Regex to match hashtags properly across multiple languages
    const tagMatches = rawText.match(/#[\p{L}\p{N}_]+/gu) || [];
    const tagCount = tagMatches.length;
    
    const limits = PLATFORM_LIMITS[platform] || PLATFORM_LIMITS.instagram;
    
    // 3. Opening Hook Analysis (Analyzing the first line)
    const firstLine = lines[0] || '';
    let hookStatus = 'Standard';
    let hookFeedback = 'Standard statement. Consider ending with a question to stop the scroll.';

    if (firstLine.length < 15) {
        hookStatus = 'Weak';
        hookFeedback = 'Too short. Add a question or a bold statement.';
    } else if (firstLine.includes('?')) {
        hookStatus = 'Strong';
        hookFeedback = 'Question detected. Drives engagement.';
    } else if (firstLine.match(/([A-Z]){4,}/)) {
        hookStatus = 'Warning';
        hookFeedback = 'Good visibility, but avoid too much ALL CAPS.';
    }

    return {
        formattedText: formattedText,
        metrics: {
            characterCount: charLength,
            isOverCharLimit: charLength > limits.char,
            hashtagCount: tagCount,
            isOverTagLimit: tagCount > limits.tags,
            tagsArray: tagMatches
        },
        hookAnalysis: {
            status: hookStatus,
            feedback: hookFeedback,
            hookLength: firstLine.length
        }
    };
}

// Example Usage:
// const myDraft = "Are you making this mistake?\n\nRead below to find out.\n\n#marketing #growth";
// const analysis = formatAndAnalyzeCaption(myDraft, 'instagram');
// console.log(analysis.formattedText);
