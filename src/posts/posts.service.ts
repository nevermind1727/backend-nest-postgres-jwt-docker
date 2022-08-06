import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostModel)
    private postsRepository: Repository<PostModel>,
    private filesService: FilesService) {}

    async createPost(dto: CreatePostDto, image: string): Promise<PostModel> {
        const fileName = await this.filesService.createFile(image)
        const post = await this.postsRepository.save({...dto, image: fileName})
        return post
    }
}
