

export class CreateVideoDto {
    readonly description: string
    readonly title: string
    readonly isPublic?: boolean
    readonly user: string

    readonly video: Express.Multer.File
    readonly preview: Express.Multer.File
}


export class CreateVideoBodyDto {
    readonly description: string
    readonly title: string
    readonly isPublic: boolean
}