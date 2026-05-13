
# API Documentation: Create GC Voice Prompt with Mappings

## Route
`POST /call-flows/gc-voice-prompt`

## Description
Creates a Genesys Cloud voice prompt with mappings, supporting two audio upload methods:
1. **TaskId-based**: Find audio file by taskId from filesystem
2. **Direct upload**: Upload audio directly using base64 encoding

## Request Payload

### Structure
```json
{
  "name": "string",
  "version": "string",
  "envId": "string",
  "ttsVPs": [
    {
	  "audioBase64": "string (optional)",
      "taskId": "integer (optional)",
      "promptId": "string (optional)",
      "language": "string"
    },
	{  
	   "promptId": "cace14fe-06bb-46b2-b512-70ad7b67256e",  
	   "taskId": 12,  
	   "language": "zh-hk"  
	}
  ]
}
```

### Validation Rules
- Exactly one of (`taskId` and `promptId`) or `audioBase64` must be provided for each voice prompt
- `name`, `version`, `envId` are required
- `ttsVPs` must not be empty
- `language` must be one of: `en-us`, `zh-hk`, `zh-cn`, `ja-jp`, `ko-kr`, `fr-fr`, `de-de`, `es-es`

## Response Structure

### Success Response
```json
{
  "gcVoicePromptId": "string",
  "name": "string",
  "version": "string",
  "envId": "string",
  "createdAt": "string",
  "success": [
    {
      "promptId": "string",
      "taskId": "integer (nullable)",
      "language": "string"
    }
  ],
  "failed": [
    {
      "promptId": "string",
      "taskId": "integer (nullable)",
      "language": "string",
      "error": "string"
    }
  ]
}
```

## Examples

### Example 1: TaskId-based Upload
```bash
curl -X POST "http://192.168.0.107:8060/call-flows/gc-voice-prompt" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "WelcomePrompt",
    "version": "1.0",
    "envId": "174bfe04-9af5-4390-9450-33cb3cf5b191",
    "ttsVPs": [
      {
        "taskId": 12345,
        "promptId": "prompt-1",
        "language": "en-us"
      }
    ]
  }'
```

### Example 2: Direct Audio Upload
```bash
curl -X POST "http://192.168.0.107:8060/call-flows/gc-voice-prompt" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "WelcomePrompt",
    "version": "1.0",
    "envId": "174bfe04-9af5-4390-9450-33cb3cf5b191",
    "ttsVPs": [
      {
        "audioBase64": "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA...",
        "promptId": "prompt-1",
        "language": "en-us"
      }
    ]
  }'
```

### TypeScript Example
```typescript
interface VoicePrompt {
  taskId?: number;
  audioBase64?: string;
  promptId: string;
  language: string;
}

interface CreateVoicePromptRequest {
  name: string;
  version: string;
  envId: string;
  ttsVPs: VoicePrompt[];
}

const createVoicePrompt = async (request: CreateVoicePromptRequest) => {
  const response = await fetch("http://192.168.0.107:8060/call-flows/gc-voice-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return response.json();
};
```

### Go Example
```go
package main

import (
  "bytes"
  "encoding/json"
  "net/http"
)

type VoicePrompt struct {
  TaskId      *int    `json:"taskId"`
  AudioBase64 *string `json:"audioBase64"`
  PromptId    string  `json:"promptId"`
  Language    string  `json:"language"`
}

type CreateVoicePromptRequest struct {
  Name    string        `json:"name"`
  Version string        `json:"version"`
  EnvId   string        `json:"envId"`
  TtsVPs  []VoicePrompt `json:"ttsVPs"`
}

func main() {
  request := CreateVoicePromptRequest{
    Name:    "WelcomePrompt",
    Version: "1.0",
    EnvId:   "174bfe04-9af5-4390-9450-33cb3cf5b191",
    TtsVPs: []VoicePrompt{
      {
        TaskId:   new(int),
        PromptId: "prompt-1",
        Language: "en-us",
      },
    },
  }
  *request.TtsVPs[0].TaskId = 12345

  jsonData, _ := json.Marshal(request)
  http.Post("http://192.168.0.107:8060/call-flows/gc-voice-prompt", "application/json", bytes.NewBuffer(jsonData))
}
```