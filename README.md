# Vanilla JS Social Media Caption Formatter

This repository contains the core, dependency-free JavaScript text processing logic for formatting social media captions. 

Built for developers building social media schedulers or content tools. It automatically fixes the infamous Instagram line-break issue by intelligently injecting Zero-Width Spaces (`\u200B`), extracts hashtag counts using Regex, and performs basic opening hook analysis.

For the full, interactive enterprise tool with real-time UI previews, safe-zone overlays, and readability scoring, visit the [NovusTools Caption Formatter](https://novustools.com/caption-formatter/).

## Platform-Specific Formatters
You can also optimize text for specific algorithm limits using our dedicated modules:
* [Instagram Caption Formatter](https://novustools.com/instagram-caption-formatter/)
* [LinkedIn Caption Formatter](https://novustools.com/linkedin-caption-formatter/)
* [TikTok Caption Tool](https://novustools.com/tiktok-caption-tool/)

## Usage
Simply integrate the logic and pass your raw string and target platform. The function returns the cleanly formatted string safe for API publishing, along with metadata (character count, tag count, and hook analysis).
