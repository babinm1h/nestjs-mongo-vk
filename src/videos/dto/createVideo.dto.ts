

export class CreateVideoDto {
    readonly description: string
    readonly title: string
    readonly isPublic: string
    readonly user: string

    readonly video: Express.Multer.File
    readonly preview: Express.Multer.File
}


export class CreateVideoBodyDto {
    readonly description: string
    readonly title: string
    readonly isPublic: string
}