import { ImageAPIRequest, PhotoResult } from "@/types/imageAPI";

export class ImageAPI {
  constructor(
    private readonly baseUrl: string = "https://api.pexels.com",
    private readonly authorization: string = "4e4yBksolkHTFwDTXoD1rnpkVnF4o2F9h651mtQ9dwjtJQashgJKzOg5"
  ) {}

  public async getNineImages(
    query: string = "profile"
  ): Promise<PhotoResult[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/search?query="${new URL(query)}"&per_page=9`,
        {
          headers: { authorization: this.authorization },
        }
      );
      const contactRespJson: ImageAPIRequest = await response.json();
      return contactRespJson.photos;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    throw error;
  }
}

export default new ImageAPI();
