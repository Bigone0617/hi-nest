import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    console.log(1111);
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.movieService.createMovie(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData,
    };
  }
}
