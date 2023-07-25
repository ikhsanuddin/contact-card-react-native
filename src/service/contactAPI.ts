import {
  ContactRequest,
  ContactResponse,
  GetContacts,
} from "@/types/contactAPI";

export class ContactAPI {
  constructor(
    private readonly baseUrl: string = "https://contact.herokuapp.com"
  ) {}

  public async getAllContact(): Promise<ContactResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/contact`);
      const contactRespJson: GetContacts = await response.json();
      return contactRespJson.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async getContact(id: string): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/contact/${id}`);
      const contactRespJson = await response.json();
      return contactRespJson.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async addContact(data: ContactRequest): Promise<{ ok: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/contact`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status > 399) {
        throw new Error(`Error when adding a new card, response status ${response.status}`);
      }
      return { ok: response.ok };
    } catch (error) {
      this.handleError(error);
    }
  }

  public async editContact(data: ContactResponse): Promise<{ ok: boolean }> {
    try {
      const { id, ...newData } = data;
      const response = await fetch(`${this.baseUrl}/contact/${id}`, {
        method: "PUt",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status > 399) {
        throw new Error(`Error when updating card, response status ${response.status}`);
      }
      return { ok: response.ok };
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteContact(id: string): Promise<{ ok: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/contact/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status > 399) {
        throw new Error(`Error when deleteing a card, response status ${response.status}`);
      }
      return { ok: response.ok };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    throw error;
  }
}

export default new ContactAPI();
