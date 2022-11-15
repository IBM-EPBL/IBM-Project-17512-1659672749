export declare const HackerrankScrapper: (url: string) => Promise<{
    badges: any[];
    certificates: any[];
}>;
export declare const LeetcodeScrapper: (url: string) => Promise<{
    total_badges: string | number;
    total_pints: string;
    total_problems_solved: string;
} | {
    total_badges: number;
    total_pints: number;
    total_problems_solved: number;
}>;
export declare const hackathonScrapper: () => Promise<any>;
export declare const devPostScrapper: () => Promise<any>;
