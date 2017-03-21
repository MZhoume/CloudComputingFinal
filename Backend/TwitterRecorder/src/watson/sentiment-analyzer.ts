import {NaturalLanguageUnderstandingV1} from 'watson-developer-cloud';

export class SentimentAnalyzer {
    private analyzer: NaturalLanguageUnderstandingV1;
    private readonly config: any[];
    private currConfigNum: number = 0;

    constructor(config: any[]) {
        this.config = config;
        this.switchConfig();
    }

    private switchConfig(): void {
        this.analyzer = new NaturalLanguageUnderstandingV1(this.config[this.currConfigNum]);
        console.log(`Switching to key: ${this.currConfigNum}.`);
        this.currConfigNum = this.currConfigNum < this.config.length - 1 ? this.currConfigNum + 1 : 0;
    }

    analyze(text: string): Promise<number> {
        let param = {
            text: text,
            features: {
                sentiment: {
                    document: true
                }
            }
        };

        return new Promise((resolve, reject) => {
            this.analyzer.analyze(param, (err, res) => {
                if (err) {
                    if (err.message === 'limit exceeded for free plan') {
                        this.switchConfig();
                    }

                    reject(err);
                }
                else resolve(res.sentiment.document.score);
            });
        });
    }
}
