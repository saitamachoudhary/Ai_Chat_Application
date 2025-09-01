import { json } from "express";
import OpenAI from "openai";
import type { AssistantStream } from "openai/lib/AssistantStream";
import type { Channel, Event, MessageResponse, StreamChat } from "stream-chat";

export class OpenAIResponseHandler {
    private message_text = "";
    private chunk_counter = 0;
    private run_id = "";
    private is_done = false;
    private last_update_time = 0;

    constructor(
        private readonly openai: OpenAI,
        private readonly openAiThread: OpenAI.Beta.Threads.Thread,
        private readonly assistantStream: AssistantStream,
        private readonly chatClient: StreamChat,
        private readonly channel: Channel,
        private readonly message: MessageResponse,
        private readonly onDispose: () => void
    ) {
        this.chatClient.on("ai_indicator.stop", this.handleStopGenerating);
    }

    run = async () => { }

    dispose = () => {

    }

    private handleStopGenerating = async (event: Event) => { }

    private handleStreamEvent = async () => { }

    private handleError = async () => { }

    private performWebSearch = async (query: string): Promise<string> => {

        const TAVILYT_API_KEY = process.env.TAVILYT_API_KEY;
        if (!TAVILYT_API_KEY) {
            throw new Error("Web search is not available. API key not configured.");
        }

        console.log(`Performing web search for: "${query}"`);

        try {
            const response = await fetch(`https://api.tavily.com/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TAVILYT_API_KEY}`
                },
                body: JSON.stringify({
                    query: query,
                    search_depth: "advanced",
                    max_results: 5,
                    include_answer: true,
                    include_raw_content: false,
                })
            })

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Tavily search failed for query "${query}":`, errorText);

                return JSON.stringify(
                    {
                        error: `Search failed with status ${response.status}`,
                        details: errorText
                    }
                )
            }

            const data = await response.json();
            console.log(`Tavily search successful for query "${query}"`)
            return JSON.stringify(data);
        } catch (error) {
            console.error(
                `An exception occurred during web search for "${query}":`,
                error
            );

            return JSON.stringify({
                error: "An exception occurred during the search.",
                message: error instanceof Error ? error.message : "Unknown error",
            })
        }
    }
}
