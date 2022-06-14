export class UpdateUserDto {
    constructor(userId: string, accessToken: string) {
        this.userId = userId;
        this.accessToken = accessToken;
    }

    userId: string;
    accessToken: string;
}