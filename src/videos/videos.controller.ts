import { Controller } from "@nestjs/common";
import { VideosService } from "./video.service";

@Controller("/videos")
export class VideosController {

    constructor(private videosService: VideosService) { }

}