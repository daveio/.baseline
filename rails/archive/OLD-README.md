# Multipost: Cross-Platform Social Media Publisher

Multipost is a comprehensive web application for intelligent content sharing across multiple social media platforms. It provides AI-powered post optimization, thread creation, and content splitting capabilities to help users create the perfect content for different social platforms.

> **Modern Cross-Platform Publishing Solution**: Multipost bridges the gap between fragmented social networks, allowing content creators to maintain a consistent presence across multiple platforms without the tedious work of manual adaptation.

This document serves as a complete guide to the Multipost application, covering everything from high-level architecture to specific implementation details. Whether you're trying to understand the application's capabilities, looking to deploy it, or planning to extend its functionality, you'll find all the necessary information within this README.

## Table of Contents

### I. Introduction & Overview

1. [Overview](#overview)
2. [Project Philosophy](#project-philosophy)
3. [Features](#features)

### II. Architecture & Technical Design

4. [Architecture](#architecture)
5. [Directory Structure](#directory-structure)
6. [Data Models](#data-models)
7. [Frontend Components](#frontend-components)
8. [Backend Services](#backend-services)
9. [State Management](#state-management)

### III. Key Features Implementation

10. [AI Integration](#ai-integration)
11. [Thread Management](#thread-management)
12. [Theming](#theming)
13. [Design Decisions](#design-decisions)

### IV. Performance & Quality

14. [Performance Considerations](#performance-considerations)
15. [Testing & Quality Assurance](#testing--quality-assurance)
16. [Error Handling](#error-handling)

### V. Setup & Configuration

17. [Installation & Setup](#installation--setup)
18. [Configuration](#configuration)
19. [Workflow States](#workflow-states)
20. [API Reference](#api-reference)

### VI. Operational Guidance

21. [Deployment](#deployment)
22. [Troubleshooting](#troubleshooting)
23. [Contributing](#contributing)

### VII. Appendix

24. [Screenshots & UI Components](#screenshots--ui-components)

## Overview

Multipost enables users to compose and publish content simultaneously to multiple social platforms, including Bluesky, Mastodon, and Threads. The application handles different character limits for each platform, provides real-time previews, and offers AI-powered post splitting using OpenAI GPT-4o to optimize content for each network's requirements.

### Application Structure Overview

```mermaid
graph TD
    User(User) -->|Interacts with| UI[Web Interface]
    UI -->|Composes Content in| PostComposer[Post Composer]
    PostComposer -->|Updates| CharacterStats[Character Stats]
    PostComposer -->|Generates| Previews[Platform Previews]
    PostComposer -->|Manages| MediaUploader[Media Files]

    PostComposer -->|If too long| SplitAI[AI Splitting]
    PostComposer -->|Creates| ThreadManager[Thread Posts]

    SplitAI -->|Suggests| SplitStrategies[Multiple Splitting Strategies]
    SplitStrategies -->|Apply to| ThreadManager

    UI -->|Submits via| API[API Layer]
    API -->|Processes with| OpenAI[OpenAI Service]
    API -->|Stores in| Storage[Memory Storage]

    Storage -->|Manages| Accounts[User Accounts]
    Storage -->|Saves| Drafts[Post Drafts]
    Storage -->|Records| Posts[Published Posts]

    style UI fill:#f9f,stroke:#333,stroke-width:2px
    style OpenAI fill:#bbf,stroke:#333,stroke-width:2px
    style SplitAI fill:#bbf,stroke:#333,stroke-width:2px
```

The application uses a modern stack with React, TypeScript, and Express, emphasizing a clean separation between frontend and backend. The system prioritizes user experience with real-time character counting, platform-specific previews, and AI assistance only when needed.

## Project Philosophy

Multipost was designed with several core principles in mind:

### Why We Built Multipost

The social media landscape has become increasingly fragmented, with users needing to maintain presence across multiple platforms with different technical constraints. Multipost aims to solve this fragmentation problem by providing a unified interface for content creation and publishing.

```mermaid
graph TD
    A[Problem: Content Fragmentation] -->|Solution| B[Unified Publishing Interface]
    B --> C[Multi-Platform Support]
    B --> D[AI-Powered Content Adaptation]
    B --> E[Preview Before Publishing]
    C --> F[Bluesky]
    C --> G[Mastodon]
    C --> H[Threads]
    D --> I[Character Limit Handling]
    D --> J[Content Optimization]
    D --> K[Thread Creation]
```

### Design Principles

1. **User-Centric Experience**: The design prioritizes intuitive workflows that minimize the cognitive load required to manage cross-platform posting.

2. **Platform Awareness**: Rather than forcing a one-size-fits-all approach, the application respects the unique characteristics and limitations of each platform.

3. **Intelligent Assistance**: AI features are designed to augment human creativity, not replace it. The AI assists by suggesting optimizations rather than making decisions.

4. **Visual Clarity**: The UI employs the Catppuccin color palette and clear visual hierarchies to create a pleasant, distraction-free environment for content creation.

5. **Adaptive Design**: The application's theme system and responsive layout ensure a consistent experience across different devices and user preferences.

### Technical Considerations

- **Why React and TypeScript?** These technologies were chosen for their strong type safety, component reusability, and extensive ecosystem, allowing for rapid development while maintaining code quality.

- **Why In-Memory Storage?** For this version, an in-memory storage solution was selected to simplify deployment and focus on the core functionality. This approach eliminates database configuration complexity while still demonstrating the application's capabilities.

- **Why OpenAI GPT-4o?** The latest GPT model was selected for its superior understanding of context and nuance in language, which is critical for intelligent content splitting and optimization.

## Features

- **Multi-Platform Publishing**: Post to Bluesky, Mastodon, and Threads with a single click
- **Real-Time Character Counting**: Visualize character limits for each platform
- **Platform-Specific Previews**: See how posts will appear on each platform
- **AI-Powered Content Splitting**: Uses OpenAI GPT-4o to intelligently split long posts
- **Multiple Splitting Strategies**:
  - Semantic splitting (by meaning/context)
  - Sentence-based splitting
  - Hashtag retention
  - Mention preservation
- **Thread Management**: Create, preview, and navigate multi-post threads
- **Media Support**: Upload and attach media files to posts
- **Draft Saving**: Save posts as drafts for later editing
- **Platform Account Selection**: Choose which accounts to post to on each platform
- **Catppuccin Theming**: Four beautiful theme options (Latte, Frappé, Macchiato, Mocha)
- **Advanced Configuration**: Customize post appearance and behavior
- **Configuration Persistence**: Save and load splitting configurations

## Architecture

Multipost is built using a modern web stack, with a clear separation of concerns and an emphasis on maintainability and scalability.

```mermaid
graph TD
    subgraph "Frontend"
        A[React Components] --> B[React Query]
        B --> C[API Client]
        A --> D[Theme Provider]
        A --> E[Form Hooks]
        E --> F[State Management]
    end

    subgraph "Backend"
        G[Express Server] --> H[Routes]
        H --> I[Storage Interface]
        H --> J[OpenAI Service]
        I --> K[Memory Storage]
    end

    C --> G
    J --> L[OpenAI API]
```

### Why This Architecture?

This architecture was chosen to provide:

1. **Clear Separation of Concerns**: Frontend and backend have distinct responsibilities, making the codebase easier to maintain.

2. **Type Safety**: The shared schema ensures consistent types between frontend and backend.

3. **Scalability**: The modular design allows for easy replacement of components (e.g., switching from in-memory storage to a database).

4. **Developer Experience**: The architecture prioritizes rapid development and simplified debugging.

### Frontend

- **React**: Used for UI components due to its declarative nature and component reusability. React's virtual DOM ensures efficient updates.

- **TypeScript**: Provides static typing to catch errors during development and improve code maintainability. Essential for larger codebases.

- **TailwindCSS**: Chosen for its utility-first approach, which allows for rapid UI development without context switching between CSS files.

- **Catppuccin**: Selected as the color palette framework for its visually pleasing, accessible color schemes that work well in both light and dark modes.

- **shadcn/ui**: Leveraged for its high-quality, customizable components that integrate seamlessly with Tailwind CSS.

- **React Query**: Manages asynchronous state, provides caching, and handles loading/error states consistently across the application.

- **wouter**: A lightweight alternative to React Router, providing routing functionality with minimal overhead.

### Backend

- **Node.js**: Enables JavaScript on the server-side, allowing for code sharing between frontend and backend.

- **Express**: Provides a minimal, flexible web framework for handling HTTP requests with middleware support.

- **OpenAI API**: Integrated for AI-powered content processing, enhancing the application's capabilities with advanced NLP features.

- **Memory Storage**: Used for data persistence in this version, simplifying deployment and configuration while demonstrating application capabilities.

### Development Tools

- **Vite**: Selected for its extremely fast development server and efficient production builds, significantly improving development experience.

- **drizzle-orm**: Provides a lightweight ORM with type safety for database operations, while generating Zod schemas for validation.

- **Zod**: Ensures runtime validation of data structures, complementing TypeScript's static type checking.

### Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant UI as UI Components
    participant Hooks as React Hooks
    participant Query as React Query
    participant API as API Client
    participant Server as Express Server
    participant Storage as Memory Storage
    participant OpenAI as OpenAI API

    User->>UI: Compose Post
    UI->>Hooks: Update Form State
    Hooks->>UI: Reflect UI Changes

    User->>UI: Submit Post
    UI->>Hooks: Call submitPost()
    Hooks->>Query: Create Mutation
    Query->>API: POST /api/posts
    API->>Server: HTTP Request

    alt Content exceeds platform limits
        Server->>OpenAI: Request content splitting
        OpenAI->>Server: Return split content
    end

    Server->>Storage: Save post
    Storage->>Server: Confirm save
    Server->>API: Return response
    API->>Query: Update cache
    Query->>UI: Update UI state
    UI->>User: Show success message
```

This architecture emphasizes unidirectional data flow, clear separation between presentation and business logic, and type safety throughout the stack.

## Directory Structure

```plaintext
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and services
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
├── server/                  # Backend code
│   ├── services/            # Service modules
│   │   └── openaiService.ts # OpenAI integration
│   ├── index.ts             # Main server entry point
│   ├── routes.ts            # API route definitions
│   └── storage.ts           # Data storage implementation
└── shared/                  # Shared code between frontend/backend
    └── schema.ts            # Data models and schemas
```

## Data Models

### Core Models

#### User

```typescript
{
  id: number;
  username: string;
  password: string;
}
```

#### Account

```typescript
{
  id: number;
  userId: number;
  platformId: string; // 'bluesky', 'mastodon', 'threads'
  username: string;
  displayName: string;
  avatarUrl: string;
  instanceUrl: string; // For Mastodon
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  isActive: boolean;
}
```

#### Draft

```typescript
{
  id: number;
  userId: number;
  content: string;
  mediaFiles: MediaFile[];
  platforms: Platform[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### Post

```typescript
{
  id: number;
  userId: number;
  content: string;
  mediaFiles: MediaFile[];
  platforms: Platform[];
  status: string;        // 'pending', 'published', 'failed'
  createdAt: Date;
}
```

#### MediaFile

```typescript
{
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  previewUrl?: string;
}
```

#### Platform

```typescript
{
  id: string;           // 'bluesky', 'mastodon', 'threads'
  isSelected: boolean;
  accounts?: number[];  // Account IDs
}
```

#### ThreadPost

```typescript
{
  id: string;
  content: string;
  index: number;
}
```

#### CharacterStat

```typescript
{
  platform: string;
  current: number;
  limit: number;
  percent: number;
}
```

#### SplittingStrategy

```typescript
enum SplittingStrategy {
  SEMANTIC = "semantic", // Split by meaningful semantic chunks
  SENTENCE = "sentence", // Split by sentences
  RETAIN_HASHTAGS = "retain_hashtags", // Ensure hashtags are preserved
  PRESERVE_MENTIONS = "preserve_mentions", // Make sure @mentions stay intact
}
```

#### SplittingConfig

```typescript
{
  name: string;
  strategies: SplittingStrategy[];
  id?: string;
  timestamp?: number;
}
```

#### AdvancedOptions

```typescript
{
  useThreadNotation: boolean;
  threadNotationFormat: string;
  showRawJson: boolean;
  customMastodonLimit: number;
  showReasoning: boolean;
}
```

## Frontend Components

### Main Components

#### PostComposer

The central component for creating posts. Manages content, platform selection, and posting actions.

```typescript
interface PostComposerProps {
  content: string;
  mediaFiles: MediaFile[];
  characterStats: CharacterStat[];
  selectedPlatforms: { id: string; isSelected: boolean; accounts?: number[] }[];
  advancedOptions: AdvancedOptions;
  isPendingDraft: boolean;
  isPendingPost: boolean;
  isPendingUpload: boolean;
  isFormValid: boolean;
  threadPosts: ThreadPost[];
  isThreadMode: boolean;
  activeThreadIndex: number;
  onContentChange: (content: string) => void;
  onTogglePlatform: (platformId: string) => void;
  onAdvancedOptionsChange: (options: Partial<AdvancedOptions>) => void;
  onUploadFiles: (files: File[]) => void;
  onRemoveMediaFile: (fileId: string) => void;
  onSaveAsDraft: () => void;
  onSubmitPost: () => void;
  onResetForm: () => void;
  onSwitchThreadPost: (index: number) => void;
  onAddThreadPost: (content?: string) => void;
  onRemoveThreadPost: (index: number) => void;
  onExitThreadMode: () => void;
  onApplySplit?: (
    strategy: SplittingStrategy,
    platformId: string,
    splitText: string[],
  ) => void;
  accounts?: Account[];
}
```

#### ThreadPostsManager

Manages thread creation, editing, and navigation.

```typescript
interface ThreadPostsManagerProps {
  threadPosts: ThreadPost[];
  activeIndex: number;
  onSwitchPost: (index: number) => void;
  onAddPost: (content?: string) => void;
  onRemovePost: (index: number) => void;
  onContentChange: (content: string) => void;
  onExit: () => void;
}
```

#### AISplitPreview

Displays AI-generated splitting options for long content.

```typescript
interface AISplitPreviewProps {
  content: string;
  isOpen: boolean;
  accounts: Account[];
  characterStats: CharacterStat[];
  onClose: () => void;
  onApplySplit: (
    strategy: SplittingStrategy,
    platformId: string,
    splitText: string[],
  ) => void;
  advancedOptions?: {
    showRawJson?: boolean;
    [key: string]: any;
  };
}
```

#### PlatformPreview

Shows how content will appear on different platforms.

```typescript
interface PlatformPreviewProps {
  content: string;
  mediaFiles: MediaFile[];
  activeTab: string;
  accounts: Account[];
  onTabChange: (tab: string) => void;
}
```

#### PlatformCard

Displays a platform with toggle functionality.

```typescript
interface PlatformCardProps {
  platform: Platform;
  charCount: number;
  active: boolean;
  onToggle: (platformId: string) => void;
}
```

#### SplitWithAIButton

Button to trigger AI splitting for long content.

```typescript
interface SplitWithAIButtonProps {
  content: string;
  isContentTooLong: boolean;
  accounts: Account[];
  characterStats: CharacterStat[];
  onApplySplit: (
    strategy: SplittingStrategy,
    platformId: string,
    splitText: string[],
  ) => void;
  advancedOptions?: {
    showRawJson?: boolean;
    [key: string]: any;
  };
}
```

#### SavedSplittingConfigs

Manages saved AI splitting configurations.

```typescript
interface SavedSplittingConfigsProps {
  selectedStrategies: SplittingStrategy[];
  savedConfigs: SplittingConfig[];
  onSaveConfig: (name: string) => void;
  onLoadConfig: (config: SplittingConfig) => void;
  onDeleteConfig: (configName: string) => void;
}
```

### Custom Hooks

#### usePostForm

Manages form state for creating and editing posts.

```typescript
interface UsePostFormProps {
  initialContent?: string;
  initialPlatforms?: { id: string; isSelected: boolean }[];
  initialMediaFiles?: MediaFile[];
  initialAdvancedOptions?: Partial<AdvancedOptions>;
}
```

Returns:

```typescript
{
  formState: PostFormState;
  accounts: Account[];
  drafts: Draft[];
  isFormValid: boolean;
  isPendingDraft: boolean;
  isPendingPost: boolean;
  isPendingUpload: boolean;
  updateContent: (content: string) => void;
  updateAdvancedOptions: (options: Partial<AdvancedOptions>) => void;
  togglePlatform: (platformId: string) => void;
  toggleAccount: (platformId: string, accountId: number) => void;
  uploadFiles: (files: File[]) => void;
  removeMediaFile: (fileId: string) => void;
  saveAsDraft: () => void;
  submitPost: () => void;
  loadDraft: (draftId: number) => void;
  deleteDraft: (draftId: number) => void;
  resetForm: () => void;
  setActivePreviewTab: (tab: string) => void;
  setupThread: (posts: string[]) => void;
  switchThreadPost: (index: number) => void;
  addThreadPost: (content?: string) => void;
  removeThreadPost: (index: number) => void;
  exitThreadMode: () => void;
}
```

#### useToast

Manages toast notifications.

## Backend Services

### API Routes

- **GET /api/user**: Get the current user
- **GET /api/accounts**: Get all accounts for the current user
- **GET /api/accounts/:platformId**: Get accounts for a specific platform
- **GET /api/drafts**: Get all drafts for the current user
- **GET /api/drafts/:id**: Get a specific draft
- **POST /api/drafts**: Create a new draft
- **PUT /api/drafts/:id**: Update a draft
- **DELETE /api/drafts/:id**: Delete a draft
- **POST /api/posts**: Create and publish a post
- **GET /api/platforms/character-limits**: Get character limits for each platform
- **POST /api/upload**: Upload media files
- **POST /api/split-post**: Split a post using AI
- **POST /api/optimize-post**: Optimize a post for a specific platform

### OpenAI Service

The `openaiService.ts` handles AI-powered post splitting and optimization.

#### Main Functions

- **splitPost**: Splits a post into multiple posts based on selected strategies
- **generateSplittingOptions**: Generates different splitting options
- **optimizePost**: Optimizes a post for a specific platform

## AI Integration

The application uses OpenAI's GPT-4o model to split and optimize content:

1. When a post exceeds character limits, the user can click "Split with AI"
2. Multiple splitting strategies can be selected simultaneously:
   - Semantic splitting (keeping related content together)
   - Sentence splitting (at natural sentence boundaries)
   - Hashtag retention (keeping hashtags intact)
   - Mention preservation (ensuring @mentions stay together)
3. The AI considers all selected strategies together rather than applying them individually
4. Thread optimization is included in all strategies by default
5. The AI provides reasoning for its splits which can be displayed to the user
6. Multiple splitting options can be saved and loaded

### OpenAI API Integration

The application uses OpenAI's GPT-4o model for several key features:

1. **API Key Management**:

   - The application checks for the presence of the OpenAI API key at server startup
   - Key validation happens before making API requests
   - Detailed error messages for missing or invalid keys

2. **Error Handling**:

   - Comprehensive error handling for OpenAI API responses
   - User-friendly error messages with suggestions for resolution
   - Specific handling for common errors (rate limits, quota exceeded)
   - Detailed error logging for debugging

3. **GPT-4o Prompt Engineering**:

   - Structured system prompts that combine multiple splitting strategies
   - JSON response formatting for consistent parsing
   - Thread optimization instructions built into every prompt
   - Character limit enforcement based on platform requirements

4. **Response Validation**:
   - Safety checks for malformed API responses
   - Thread indicator format validation to ensure two newlines before thread markers
   - Automatic correction of improperly formatted thread indicators
   - Handling for unexpected response formats
   - Fallback mechanisms for failed requests
   - Structured error propagation to client

## State Management

Post form state is managed through the `usePostForm` hook, which handles:

1. Content updates
2. Platform selection
3. Media file uploads
4. Draft saving/loading
5. Post submission
6. Advanced options
7. Thread management

Local storage is used to persist:

- Advanced options
- Custom character limits
- Splitting configurations
- Thread state

## Thread Management

Thread creation and management is handled through:

1. **ThreadPostsManager**: UI component for thread navigation and editing
2. **usePostForm.setupThread**: Converts a single post into a thread
3. **Thread State**: Maintained in both component state and localStorage
4. **Event Handling**: All thread-related buttons use proper event handling to prevent form submission

Thread functionality includes:

- Creating threads from scratch
- Converting long posts into threads using AI
- Adding/removing thread posts
- Navigating between posts
- Previewing complete threads
- Exiting thread mode safely

### Thread Formatting Standard

Thread indicators follow a consistent formatting rule to ensure readability:

- Thread indicators (like "🧵 2 of 3") are always preceded by two newlines
- This ensures clear visual separation between post content and thread indicators
- This formatting is applied automatically whether using manual thread creation or AI-based splitting
- Example of proper thread formatting:

  ```plaintext
  Blake's 7 featured early representation with diverse casting and strong female characters. Its finale is one of TV's most shocking. Available on streaming platforms—give it three episodes. Fair warning: don't get attached to anyone.

  🧵 2 of 3
  ```

## Installation & Setup

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- OpenAI API key (for AI-powered features)

### Installation Steps

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with the following:
     ```bash
     OPENAI_API_KEY=your_openai_api_key
     ```
   - Or use Replit's Secrets management to add the OPENAI_API_KEY
4. Start the development server:
   ```bash
   npm run dev
   ```

### OpenAI API Key

The application requires an OpenAI API key for AI-powered features:

- Post splitting based on character limits
- Content optimization for different platforms

If the OpenAI API key is missing or invalid, the application will:

1. Log an error message on the server
2. Return detailed error responses from API endpoints
3. Display user-friendly error messages in the UI
4. Include suggestions for fixing the issue

To obtain an OpenAI API key:

<!-- trunk-ignore(markdown-link-check/403) -->
1. Create an account at [OpenAI](https://openai.com)
2. Navigate to API key management
3. Generate a new API key
4. Add it to your environment as OPENAI_API_KEY

## Configuration

### Platform Configuration

Platform settings are defined in `client/src/lib/platform-config.ts`:

```typescript
export const DEFAULT_PLATFORMS: Platform[] = [
  {
    id: "bluesky",
    isSelected: true,
  },
  {
    id: "mastodon",
    isSelected: true,
  },
  {
    id: "threads",
    isSelected: true,
  },
];

export const PLATFORM_CHARACTER_LIMITS: Record<string, number> = {
  bluesky: 300,
  mastodon: 500,
  threads: 500,
};
```

### Advanced Options

Advanced options are stored in localStorage:

- Thread notation format: ${index+1}/${total}
- Custom Mastodon character limit
- Show AI reasoning toggle
- Raw JSON display toggle

## Theming

The application features a comprehensive theming system based on the Catppuccin color palette:

### Catppuccin Theme Framework

The Catppuccin theme framework provides a cohesive and visually pleasing appearance with four distinct theme flavors:

1. **Latte** - Light theme with soft, warm colors
2. **Frappé** - Dark theme with medium contrast (default)
3. **Macchiato** - Dark theme with higher contrast
4. **Mocha** - Dark theme with rich, saturated colors

### Theme Implementation Details

- **Default Theme**: The application defaults to the Frappé theme (dark mode)
- **Theme Selection**: Users can switch between themes using the theme selector in the header
- **Theme Categories**: Themes are organized into Light (Latte) and Dark (Frappé, Macchiato, Mocha) categories
- **Persistence**: Selected theme preference is saved to localStorage
- **System Preference**: On first visit, the theme will respect the user's system preference (dark/light)

### Theme Architecture

- **CatppuccinThemeProvider**: Context provider that manages theme state and localStorage persistence
- **useCatppuccinTheme**: Custom hook to access current theme and theme-switching functions
- **Theme Variables**: CSS variables defined in `tailwind.config.ts` connected to Catppuccin color values
- **Theme-Aware Components**: UI components that adapt their appearance based on the active theme

### Color Palette Integration

- **Social Icons**: Platform icons adapt colors based on theme for optimal visibility
- **Platform Cards**: Backgrounds and text colors adjust based on theme
- **UI Elements**: All interface elements use theme-aware color variables
- **Contrast Optimization**: Text and background colors are carefully paired to maintain readability

### Theme Customization

The theme implementation uses Tailwind CSS and CSS variables, allowing for:

1. **Consistent Styling**: All components share the same color definitions
2. **Easy Extensibility**: New components automatically inherit theme colors
3. **Accessibility**: Color contrasts meet WCAG guidelines across all themes
4. **Performance**: Theme switching happens without page reloads

## API Reference

### POST /api/split-post

Split a post using AI.

Request:

```json
{
  "content": "Long post content to split...",
  "strategies": [
    "semantic",
    "sentence",
    "retain_hashtags",
    "preserve_mentions"
  ],
  "customMastodonLimit": 500
}
```

Success Response:

```json
{
  "semantic": {
    "bluesky": {
      "splitText": ["Part 1...", "Part 2..."],
      "strategy": "semantic",
      "reasoning": "Split explanation..."
    },
    "mastodon": {
      "splitText": ["Part 1...", "Part 2..."],
      "strategy": "semantic",
      "reasoning": "Split explanation..."
    }
  },
  "sentence": {
    // Similar structure
  }
}
```

Error Response:

```json
{
  "message": "Failed to split post",
  "error": "Invalid OpenAI API key provided. Please check your API key.",
  "code": "invalid_api_key",
  "suggestion": "Please check that your OpenAI API key is correctly configured."
}
```

Error codes include:

- `invalid_api_key`: The OpenAI API key is invalid
- `missing_api_key`: The OpenAI API key is not configured
- `rate_limit_exceeded`: Too many requests to OpenAI API in a short time
- `insufficient_quota`: OpenAI API usage quota has been exceeded

### POST /api/optimize-post

Optimize a post for a specific platform.

Request:

```json
{
  "content": "Long post content to optimize...",
  "platform": "bluesky",
  "customMastodonLimit": 500
}
```

Success Response:

```json
{
  "optimized": "Optimized content for the specified platform..."
}
```

Error Response:

```json
{
  "message": "Failed to optimize post",
  "error": "OpenAI rate limit exceeded. Please try again after a short wait.",
  "code": "rate_limit_exceeded",
  "suggestion": "Please wait a few moments and try again."
}
```

### POST /api/posts

Publish a post.

Request:

```json
{
  "content": "Post content",
  "mediaFiles": [],
  "platforms": [
    {
      "id": "bluesky",
      "isSelected": true,
      "accounts": [1]
    }
  ]
}
```

Response:

```json
{
  "id": 1,
  "content": "Post content",
  "status": "published",
  "createdAt": "2025-05-11T12:30:45.123Z"
}
```

## Workflow States

The application includes a workflow named 'Start application' that runs `npm run dev`, which starts both the Express server for the backend and the Vite server for the frontend.

## Error Handling

The application provides comprehensive error handling:

1. **API Errors**: Detailed error messages from the backend
2. **OpenAI Errors**: Enhanced error handling for API key issues, rate limits, etc.
   - Missing API key detection
   - Invalid API key handling
   - Rate limit exceeded notifications
   - Quota exceeded warnings
   - Detailed error explanations with suggestions
3. **Validation Errors**: Form validation using Zod schemas
4. **UI Feedback**: Toast notifications for success/error states
5. **Thread Navigation**: Safe handling of thread state to prevent data loss
   - Event propagation control (preventDefault, stopPropagation)

## Design Decisions

### UI Design Philosophy

Multipost's UI design follows several key principles:

1. **Focus on Content Creation**: The main post composer is centrally positioned and takes visual priority, allowing users to focus on their content without distractions.

2. **Progressive Disclosure**: Advanced features are accessible but not overwhelming. For example, AI splitting options appear only when relevant (when content exceeds platform limits).

3. **Platform-Specific Contextual Information**: Character counters and platform previews provide immediate feedback on how content will appear on each platform.

4. **Consistent Visual Language**: The Catppuccin color palette ensures visual consistency throughout the application, with careful attention to contrast and accessibility.

```mermaid
graph TD
    A[UI Design Considerations] --> B[Content Focus]
    A --> C[User Feedback]
    A --> D[Platform Context]
    A --> E[Visual Consistency]

    B --> F[Central Composer]
    B --> G[Minimal Distractions]

    C --> H[Character Counters]
    C --> I[Visual Preview]
    C --> J[Toast Notifications]

    D --> K[Platform Icons]
    D --> L[Platform Cards]
    D --> M[Platform-Specific Previews]

    E --> N[Catppuccin Theme]
    E --> O[Consistent Component Styles]
    E --> P[Responsive Layouts]
```

### Why Theme-Aware Components?

The decision to implement theme-aware components was made to:

1. **Enhance User Experience**: Different users have different preferences for light vs. dark themes. By supporting both and defaulting to the user's system preference, the application feels more native and personalized.

2. **Reduce Eye Strain**: Dark themes (Frappé, Macchiato, Mocha) reduce eye strain in low-light environments, while the light theme (Latte) works better in bright environments.

3. **Brand Consistency**: The Catppuccin palette provides a cohesive look across all aspects of the application while allowing for theme variety.

4. **Technical Implementation**: Using CSS variables and Tailwind's theme extension mechanism allows for theme switching without page reloads, ensuring a smooth user experience.

### Component Design Decisions

Each major component was designed with specific goals in mind:

1. **PostComposer**:

   - **Why a central textarea?** Provides a familiar, distraction-free writing experience.
   - **Why platform toggles?** Allows users to selectively target specific platforms while seeing immediate feedback on character limits.
   - **Why a tabbed preview?** Enables users to see how their post will look on each platform without cluttering the UI.

2. **ThreadPostsManager**:

   - **Why a numbered navigation?** Makes it easy to see the sequence and navigate between posts in a thread.
   - **Why inline addition/removal?** Provides immediate control over thread structure without modal dialogs that would interrupt workflow.

3. **AISplitPreview**:
   - **Why show multiple strategies?** Different content types benefit from different splitting approaches, and user preferences vary.
   - **Why show reasoning?** Transparency in AI decisions builds trust and helps users understand why certain splits were made.
   - **Why allow strategy combination?** Complex posts may benefit from multiple strategies applied simultaneously, providing more nuanced results.

## Performance Considerations

The application was built with performance in mind:

### Frontend Performance

1. **React Query Caching**: API responses are cached to minimize redundant network requests. This improves perceived performance, especially when navigating between views.

   ```mermaid
   graph LR
       A[User Action] --> B{Cached?}
       B -->|Yes| C[Use Cached Data]
       B -->|No| D[Fetch New Data]
       D --> E[Update Cache]
       C --> F[Render UI]
       E --> F
   ```

2. **Lazy Loading**: Components that aren't immediately needed are lazy-loaded to reduce initial bundle size and improve time-to-interactive.

3. **Debouncing**: Content updates are debounced to prevent excessive re-renders and API calls during rapid typing.

   ```mermaid
   graph TD
       A[User Types] --> B[Debounce]
       B --> C{500ms Passed?}
       C -->|No| D[Wait]
       C -->|Yes| E[Process Update]
       D --> C
   ```

4. **Optimized Re-renders**: Components use React.memo and careful state management to prevent unnecessary re-renders.

### Backend Performance

1. **Efficient OpenAI Requests**: The application optimizes OpenAI API usage by:

   - Sending only necessary context in prompts
   - Using the most appropriate model settings
   - Implementing request batching when appropriate
   - Reusing response data when possible

2. **Memory Optimization**: The in-memory storage is designed to minimize memory usage while maintaining quick access patterns.

3. **Response Compression**: The Express server uses compression middleware to reduce network payload sizes.

## Testing & Quality Assurance

The application includes comprehensive testing to ensure reliability:

### Testing Strategy

```mermaid
graph TD
    A[Testing Strategy] --> B[Unit Tests]
    A --> C[Component Tests]
    A --> D[Integration Tests]
    A --> E[Error Handling Tests]

    B --> F[OpenAI Service]
    B --> G[Storage Interface]
    B --> H[Utility Functions]

    C --> I[React Components]
    C --> J[Hooks]
    C --> K[UI Behavior]

    D --> L[End-to-End Flows]
    D --> M[API Interactions]

    E --> N[API Error Scenarios]
    E --> O[UI Error States]
    E --> P[Validation Errors]
```

### Test Coverage

The application includes tests for:

1. **Component Tests**:

   - Platform Card rendering and interaction
   - Thread Posts Manager functionality
   - Character Stats display
   - Form validation

2. **Service Tests**:

   - OpenAI integration
   - Thread indicator formatting
   - Content splitting strategies

3. **Hook Tests**:
   - Post form state management
   - Theme handling
   - Media upload processing

### Testing Utilities

Custom testing utilities include:

1. **renderWithProviders**: A wrapper around React Testing Library's render function that includes the necessary providers (React Query, Theme).

2. **Mock Data**: Comprehensive mock data for platforms, accounts, drafts, and media files.

3. **Mock Implementations**: Services like OpenAI are mocked to allow testing without actual API calls.

## Deployment

The application can be deployed through Replit Deployments:

### Deployment Process

1. Complete development and testing in the Replit environment
2. Ensure all configurations are properly set
3. Add required secrets (OPENAI_API_KEY) to the environment
4. Use the "Deploy" button in Replit interface
5. The application will be available at a `*.replit.app` domain

### Deployment Considerations

1. **Environment Variables**: Ensure OPENAI_API_KEY is set in the production environment
2. **Storage**: The current implementation uses in-memory storage, so data will be reset on service restart
3. **Scaling**: For production use with many users, consider implementing a database storage solution
4. **Monitoring**: Add logging and monitoring for production usage

## Troubleshooting

### Common Issues and Solutions

1. **OpenAI API Issues**:

   - **Error: "API key not found"** - Ensure OPENAI_API_KEY is set in environment variables
   - **Error: "Rate limit exceeded"** - Implement exponential backoff or request throttling
   - **Error: "Invalid API key"** - Verify the API key is correct and hasn't expired

2. **UI Issues**:

   - **Theme not persisting** - Check localStorage access and browser cookie settings
   - **Preview not updating** - Verify React state update logic in form hooks
   - **Character counts incorrect** - Check the character counting logic for emoji and special characters

3. **Performance Issues**:
   - **Slow response times** - Check network request timing and consider optimizing API calls
   - **High memory usage** - Review the in-memory storage implementation for potential memory leaks

### Debugging Tips

1. Use the browser developer tools to:

   - Monitor network requests
   - Check console logs
   - Inspect React component state with React DevTools
   - Analyze performance with Performance tab

2. Server-side logging:
   - Enable detailed logging in development with `NODE_ENV=development`
   - Check API response payloads for errors
   - Monitor OpenAI API usage and response times

## Contributing

### Development Workflow

1. **Setup**: Follow the installation steps to set up the development environment
2. **Feature Branches**: Create a branch for each new feature or bug fix
3. **Testing**: Ensure all tests pass before submitting changes
4. **Documentation**: Update README and code comments as needed
5. **Pull Requests**: Submit PR with clear description of changes

### Code Style

- Follow consistent TypeScript practices
- Use descriptive variable and function names
- Comment complex logic
- Maintain component separation of concerns
- Use React hooks appropriately

## Screenshots & UI Components

The UI is built with a clean, modern design using shadcn/ui components:

1. **Main Composer**: Text area with character counting and platform selection
2. **Platform Cards**: Visual toggles for each platform
3. **AI Split Preview**: Interactive display of splitting options
4. **Platform-Specific Previews**: Visualizations of how content will appear on each platform
5. **Thread Manager**: Thread creation and navigation interface

---

## Conclusion

Multipost represents a comprehensive solution to the challenge of cross-platform social media publishing. Through its integration of AI capabilities, intuitive UI design, and strong architectural foundations, it provides content creators with a powerful tool to maintain their presence across the increasingly fragmented social media landscape.

### Key Takeaways

- **User-Centered Design**: All features are built around optimizing the content creation workflow
- **AI as Augmentation**: AI capabilities enhance user creativity rather than replacing it
- **Technical Excellence**: Modern development practices ensure maintainability and extensibility
- **Theme Adaptability**: The Catppuccin theme system creates a pleasant user experience in both light and dark environments

### Future Directions

While the current implementation uses in-memory storage for simplicity, the application architecture is designed to easily accommodate persistent database storage in future iterations. The separation between the storage interface and implementation makes this transition straightforward.

This documentation has aimed to provide a complete understanding of both the "what" and "why" of Multipost's design and implementation, serving as both a guide for users and a reference for developers.

---

This README provides a comprehensive overview of the Multipost application. For specific implementation details, refer to the codebase.
