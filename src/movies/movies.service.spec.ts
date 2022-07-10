import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("shoud return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe("getOne", () => {
    it("should return a moive", () => {
      service.createMovie({
        title: "Test Movie",
        genres: ["test",],
        year: 2000
      });
      const result = {id: 1, title: "Test Movie", genres: ["test"], year: 2000};

      const movie = service.getOne(1);
      expect(movie).toEqual(result);
      });

      it("should throw 404 error", () => {
        try{
          service.getOne(9999);
        } catch(err){
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Movie with ID 9999 Not found.`);
        }
      });
  });

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.createMovie({
        title: "Test Movie",
        genres: ["test",],
        year: 2000
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it("should return a 404", () => {
      try{
        service.deleteOne(111);
      }catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe("createMovie", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: "Test Movie",
        genres: ["test",],
        year: 2000
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("updateMovie", () => {
    it("shoould update a movie", () => {
      service.createMovie({
        title: "Test Movie",
        genres: ["test",],
        year: 2000
      });
      service.updateMovie(1, {year: 2002});
      const updateMovie = service.getOne(1);
      
      expect(updateMovie.year).toEqual(2002);    
    });
  });
});
