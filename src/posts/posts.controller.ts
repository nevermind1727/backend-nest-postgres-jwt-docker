import { Body, Controller, UploadedFile, UseGuards, UseInterceptors, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @ApiOperation({summary: 'Create post'})
    @ApiResponse({ status: 200, type: PostModel})
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image: string) {
        return this.postsService.createPost(dto, image)
    }
}
