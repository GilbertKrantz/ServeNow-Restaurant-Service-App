import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
// import { readFileSync } from "fs";
import "dotenv/config";

class GenerativeAI {
    private generativeAI: GoogleGenerativeAI;
    private model: GenerativeModel | null;
    
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined");
        }
        this.generativeAI = new GoogleGenerativeAI(apiKey);
        this.model = this.generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    
    async generateText(prompt: string): Promise<string> {
        const result = await this.model?.generateContent(prompt);
        if (!result) {
            throw new Error("Failed to generate content");
        }
        console.log(result.response.text());
        return result.response.text();
    }
    }

export default GenerativeAI;